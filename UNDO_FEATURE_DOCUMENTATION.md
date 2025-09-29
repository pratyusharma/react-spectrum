# React Spectrum Undo/Redo Feature Documentation

## Overview

React Spectrum has implemented native browser undo/redo functionality for formatted text fields, particularly in NumberField components. This feature leverages the browser's native `beforeinput` event to allow standard keyboard shortcuts (Ctrl+Z/Cmd+Z for undo, Ctrl+Y/Cmd+Y for redo) to work seamlessly with input validation.

## Technical Implementation

### Core Implementation Location

The undo/redo feature is primarily implemented in:
- **File**: `packages/@react-aria/textfield/src/useFormattedTextField.ts`
- **Hook**: `useFormattedTextField`

### Key Components

#### 1. Browser Support Detection

```typescript
function supportsNativeBeforeInputEvent() {
  return typeof window !== 'undefined' &&
    window.InputEvent &&
    typeof InputEvent.prototype.getTargetRanges === 'function';
}
```

The implementation detects whether the browser supports the native `beforeinput` event. Firefox requires a feature flag as of version 84.

#### 2. History Input Type Handling

```typescript
switch (e.inputType) {
  case 'historyUndo':
  case 'historyRedo':
    // Explicitly allow undo/redo. e.data is null in this case, but there's no need to validate,
    // because presumably the input would have already been validated previously.
    return;
  // ... other input types
}
```

The core feature allows `historyUndo` and `historyRedo` input types to bypass validation since previously validated values are assumed to be valid.

#### 3. Input Validation Prevention

```typescript
// If we did not compute a value, or the new value is invalid, prevent the event
// so that the browser does not update the input text, move the selection, or add to
// the undo/redo stack.
if (nextValue == null || !state.validate(nextValue)) {
  e.preventDefault();
}
```

Invalid inputs are prevented from being added to the undo/redo stack by calling `preventDefault()` on the `beforeinput` event.

#### 4. Composition Event Fallback

For browsers that don't fully support Input Events Level 2 (Chrome, Firefox), there's a fallback mechanism for composition events:

```typescript
onCompositionStart() {
  // Store the current state when composition begins
  let {value, selectionStart, selectionEnd} = inputRef.current!;
  compositionStartState.current = {value, selectionStart, selectionEnd};
},
onCompositionEnd() {
  if (inputRef.current && !state.validate(inputRef.current.value)) {
    // Restore the input value if the composed result is invalid
    let {value, selectionStart, selectionEnd} = compositionStartState.current!;
    inputRef.current.value = value;
    inputRef.current.setSelectionRange(selectionStart, selectionEnd);
    state.setInputValue(value);
  }
}
```

**Note**: This fallback unfortunately disrupts the undo/redo stack, but it's necessary until `insertFromComposition`/`deleteByComposition` are implemented across all browsers.

## Usage

### Automatic Integration

The undo/redo feature is automatically available in all React Spectrum components that use `useFormattedTextField`, including:

- NumberField
- Formatted text inputs
- Any component using input validation

### User Experience

Users can use standard keyboard shortcuts:
- **Undo**: Ctrl+Z (Windows/Linux) or Cmd+Z (macOS)
- **Redo**: Ctrl+Y (Windows/Linux) or Cmd+Y (macOS)

The feature works seamlessly with:
- Input validation
- Number formatting
- Currency formatting
- Percentage formatting
- Custom validation rules

### Example Usage

```jsx
import {NumberField} from '@react-spectrum/numberfield';

function MyComponent() {
  return (
    <NumberField
      label="Price"
      formatOptions={{
        style: 'currency',
        currency: 'USD'
      }}
      // Undo/redo works automatically with validation
    />
  );
}
```

## Testing

### Test Coverage

The feature includes comprehensive test coverage in:
- **File**: `packages/@react-spectrum/numberfield/test/NumberField.test.js`

### Key Test Cases

#### 1. History Undo/Redo Allow Test

```javascript
it.each(['historyUndo', 'historyRedo'])('allows %s', async (inputType) => {
  let {textField} = renderNumberField({
    onChange: onChangeSpy, 
    formatOptions: {style: 'currency', currency: 'USD', currencyDisplay: 'code'}
  });

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

#### 2. Composition Event Undo Test

```javascript
it('handles compositionend events and undoes them if invalid', async () => {
  let {textField} = renderNumberField({onChange: onChangeSpy});

  act(() => {textField.focus();});
  await user.keyboard('123');
  textField.setSelectionRange(1, 1);

  // Fire composition events
  fireEvent.compositionStart(textField);
  let e = new InputEvent('beforeinput', {
    cancelable: false, 
    data: 'ü', 
    inputType: 'insertCompositionText'
  });
  fireEvent(textField, e);
  fireEvent.input(textField, {data: 'ü'});

  // Manually update value to simulate composition
  textField.value = '1ü23';
  textField.setSelectionRange(2, 2);

  // Fire compositionend - should revert invalid composition
  fireEvent.compositionEnd(textField);

  // Value should be reverted to valid state
  expect(textField.value).toBe('123');
  expect(textField.selectionStart).toBe(1);
  expect(textField.selectionEnd).toBe(1);
});
```

### Testing Strategy

1. **Unit Tests**: Test individual input types and validation scenarios
2. **Integration Tests**: Test with real user interactions and keyboard events
3. **Browser Compatibility**: Test fallback mechanisms for different browsers
4. **Edge Cases**: Test composition events, IME input, and invalid input handling

## Browser Compatibility

### Supported Browsers

- **Chrome**: Full support with native `beforeinput` event
- **Safari**: Full support with Input Events Level 2
- **Firefox**: Partial support (requires flag in version 84+)
- **Edge**: Full support with native `beforeinput` event

### Fallback Behavior

For browsers without full `beforeinput` support, the implementation provides:
1. Polyfill for basic input validation
2. Composition event handling for IME input
3. Graceful degradation that maintains core functionality

## Integration with Other Features

### Autocomplete

The undo/redo feature integrates with autocomplete functionality:

```typescript
// Clear virtual focus when undo/redo operations occur
if (lastInputType.current && (
  lastInputType.current.includes('insert') || 
  lastInputType.current.includes('delete') || 
  lastInputType.current.includes('history')
)) {
  clearVirtualFocus(true);
}
```

### Form Validation

The feature works seamlessly with React Spectrum's form validation system, ensuring that:
- Invalid inputs don't enter the undo stack
- Undo operations restore valid states
- Validation errors are handled appropriately

## Known Limitations

1. **Composition Fallback Impact**: The composition event fallback disrupts the undo/redo stack in Chrome and Firefox
2. **Firefox Support**: Requires feature flag in older versions
3. **Complex Unicode**: May have issues with complex Unicode grapheme clusters in some locales

## Future Improvements

1. **Input Events Level 2**: Full support once `insertFromComposition`/`deleteByComposition` are implemented across all browsers
2. **Enhanced Unicode Support**: Better handling of complex grapheme clusters
3. **Custom Undo Stack**: Potential implementation of a custom undo/redo system for more control

## References

- [Input Events Level 2 Specification](https://www.w3.org/TR/input-events-2/)
- [Chrome Bug Report](https://bugs.chromium.org/p/chromium/issues/detail?id=1022204)
- [Mozilla Bug Report](https://bugzilla.mozilla.org/show_bug.cgi?id=605277)