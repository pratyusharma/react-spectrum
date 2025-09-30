# Undo Feature Documentation

## Overview

React Spectrum provides undo/redo functionality through browser-native history management. This feature is primarily implemented in text input components and leverages the browser's built-in undo/redo stack to provide a seamless user experience.

## Core Implementation

### Browser-Native Undo/Redo

The undo feature relies on the browser's native history stack rather than implementing a custom undo/redo system. This approach provides several benefits:

- **Performance**: No need to maintain custom state history
- **Consistency**: Matches user expectations from other web applications
- **Accessibility**: Works with standard keyboard shortcuts (Ctrl+Z/Cmd+Z)
- **Reliability**: Leverages well-tested browser implementations

### Key Components

#### `useFormattedTextField`

The primary implementation is found in `packages/@react-aria/textfield/src/useFormattedTextField.ts`:

```typescript
export function useFormattedTextField(props: AriaTextFieldProps, state: FormattedTextFieldState, inputRef: RefObject<HTMLInputElement | null>): TextFieldAria {
  let onBeforeInputFallback = useEffectEvent((e: InputEvent) => {
    let input = inputRef.current;
    if (!input) {
      return;
    }

    // Compute the next value of the input if the event is allowed to proceed.
    let nextValue: string | null = null;
    switch (e.inputType) {
      case 'historyUndo':
      case 'historyRedo':
        // Explicitly allow undo/redo. e.data is null in this case, but there's no need to validate,
        // because presumably the input would have already been validated previously.
        return;
      // ... other input types
    }

    // If we did not compute a value, or the new value is invalid, prevent the event
    // so that the browser does not update the input text, move the selection, or add to
    // the undo/redo stack.
    if (nextValue == null || !state.validate(nextValue)) {
      e.preventDefault();
    }
  });
}
```

## How It Works

### 1. Browser Event Handling

The implementation uses the `beforeinput` event to intercept and validate input operations:

- **Native Support**: All modern browsers implement the `beforeinput` event natively (except Firefox, which requires a flag)
- **Event Types**: Specifically handles `historyUndo` and `historyRedo` input types
- **Validation**: Allows undo/redo operations without validation since previous states were already validated

### 2. Input Validation Integration

The undo feature integrates seamlessly with input validation:

```typescript
// If we did not compute a value, or the new value is invalid, prevent the event
// so that the browser does not update the input text, move the selection, or add to
// the undo/redo stack.
if (nextValue == null || !state.validate(nextValue)) {
  e.preventDefault();
}
```

This ensures that:
- Invalid input is prevented from being added to the undo stack
- The browser's undo/redo stack remains consistent
- Users can only undo to valid previous states

### 3. Composition Event Handling

For Input Method Editors (IME) and composition events, the implementation includes special handling:

```typescript
onCompositionStart() {
  // Store the current state when composition starts
  let {value, selectionStart, selectionEnd} = inputRef.current!;
  compositionStartState.current = {value, selectionStart, selectionEnd};
},
onCompositionEnd() {
  if (inputRef.current && !state.validate(inputRef.current.value)) {
    // Restore the input value if composition result is invalid
    let {value, selectionStart, selectionEnd} = compositionStartState.current!;
    inputRef.current.value = value;
    inputRef.current.setSelectionRange(selectionStart, selectionEnd);
    state.setInputValue(value);
  }
}
```

**Note**: This approach can affect the undo/redo stack, but it's necessary until browsers implement Input Events Level 2 with `insertFromComposition`/`deleteByComposition` events.

## Supported Components

### Text Input Components

The undo feature is available in all text input components that use `useFormattedTextField`:

- **TextField**: Basic text input
- **NumberField**: Numeric input with formatting
- **SearchField**: Search input
- **TextArea**: Multi-line text input

### Date Input Components

Date input components also support undo/redo through their own `beforeinput` event handling:

```typescript
useEvent(ref, 'beforeinput', e => {
  if (!ref.current) {
    return;
  }
  e.preventDefault();

  switch (e.inputType) {
    case 'deleteContentBackward':
    case 'deleteContentForward':
      if (parser.isValidPartialNumber(segment.text) && !state.isReadOnly) {
        backspace();
      }
      break;
    // ... other cases
  }
});
```

## Keyboard Shortcuts

### Standard Shortcuts

The undo feature supports standard keyboard shortcuts:

- **Undo**: `Ctrl+Z` (Windows/Linux) or `Cmd+Z` (macOS)
- **Redo**: `Ctrl+Y` or `Ctrl+Shift+Z` (Windows/Linux) or `Cmd+Shift+Z` (macOS)

### Accessibility

- **Screen Readers**: Undo/redo operations are announced by screen readers
- **Keyboard Navigation**: Works with standard keyboard navigation
- **Focus Management**: Maintains focus during undo/redo operations

## Browser Compatibility

### Native Support

- **Chrome**: Full native support
- **Safari**: Full native support
- **Edge**: Full native support
- **Firefox**: Requires `dom.input_events.beforeinput.enabled` flag (Firefox 84+)

### Fallback Implementation

For browsers without native `beforeinput` support, React Spectrum provides a fallback:

```typescript
let onBeforeInput = !supportsNativeBeforeInputEvent()
  ? e => {
    let nextValue =
      e.target.value.slice(0, e.target.selectionStart) +
      e.data +
      e.target.value.slice(e.target.selectionEnd);

    if (!state.validate(nextValue)) {
      e.preventDefault();
    }
  }
  : null;
```

## Testing

### Test Coverage

The undo feature is thoroughly tested in the test suite:

```javascript
it.each(['historyUndo', 'historyRedo'])('allows %s', async (inputType) => {
  let {textField} = renderNumberField({onChange: onChangeSpy, formatOptions: {style: 'currency', currency: 'USD', currencyDisplay: 'code'}});

  act(() => {textField.focus();});
  await user.keyboard('12');
  act(() => {textField.blur();});

  expect(textField).toHaveAttribute('value', 'USD 12.00');

  act(() => {textField.focus();});
  textField.setSelectionRange(2, 2);

  let e = new InputEvent('beforeinput', {cancelable: true, inputType});
  let proceed = fireEvent(textField, e);

  expect(proceed).toBe(true);
});
```

### Test Scenarios

- **Basic Undo/Redo**: Verifies that undo/redo operations are allowed
- **Validation Integration**: Ensures invalid input doesn't break undo/redo
- **Composition Events**: Tests IME and composition event handling
- **Cross-Browser**: Validates behavior across different browsers

## Best Practices

### For Developers

1. **Use Formatted Text Fields**: Always use `useFormattedTextField` for text inputs that need undo/redo
2. **Implement Validation**: Provide proper validation functions to prevent invalid states
3. **Test Across Browsers**: Verify undo/redo functionality in all supported browsers
4. **Handle Composition**: Be aware of IME and composition event implications

### For Users

1. **Standard Shortcuts**: Use `Ctrl+Z`/`Cmd+Z` for undo and `Ctrl+Y`/`Cmd+Shift+Z` for redo
2. **Input Validation**: Invalid input won't be added to the undo stack
3. **Browser Support**: Ensure your browser supports the `beforeinput` event

## Limitations

### Current Limitations

1. **Firefox Support**: Requires manual flag enabling in Firefox
2. **Composition Events**: Can affect undo/redo stack during IME input
3. **Custom History**: No support for custom undo/redo history beyond browser stack

### Future Improvements

1. **Input Events Level 2**: Full support for composition events when browsers implement it
2. **Custom History**: Potential for custom undo/redo history management
3. **Enhanced Validation**: More sophisticated validation integration

## Related Documentation

- [Input Events Level 2 Specification](https://www.w3.org/TR/input-events-2/)
- [React Spectrum TextField Documentation](./packages/@react-spectrum/textfield/README.md)
- [React Aria TextField Documentation](./packages/@react-aria/textfield/README.md)

## Examples

### Basic Usage

```tsx
import {TextField} from '@react-spectrum/textfield';

function MyComponent() {
  return (
    <TextField
      label="Enter text"
      onChange={(value) => console.log(value)}
      // Undo/redo works automatically
    />
  );
}
```

### With Validation

```tsx
import {NumberField} from '@react-spectrum/numberfield';

function MyComponent() {
  return (
    <NumberField
      label="Enter number"
      minValue={0}
      maxValue={100}
      // Undo/redo respects validation constraints
    />
  );
}
```

## Conclusion

React Spectrum's undo feature provides a robust, browser-native solution for text input components. By leveraging the browser's built-in history stack and integrating with input validation, it offers a seamless user experience while maintaining consistency across different browsers and platforms.

The implementation is designed to be transparent to developers while providing powerful functionality to end users, making it an essential feature for any text input component in the React Spectrum library.