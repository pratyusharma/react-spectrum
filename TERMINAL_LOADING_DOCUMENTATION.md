# Terminal Loading Animation - React Spectrum Button

A nostalgic terminal-style loading animation enhancement for React Spectrum's Button component, featuring cycling dots animation that replaces the button text during loading states.

## Overview

The terminal loading feature adds a new loading animation option to React Spectrum buttons, providing a retro terminal-style animation with cycling dots (e.g., `Loading`, `Loading.`, `Loading..`, `Loading...`, `Loading….`). This feature maintains full backward compatibility while offering extensive customization options.

## Features

- 🔄 **Smooth Cycling Animation**: Seamless dot progression with configurable timing
- 🎨 **Full Customization**: Customizable text, speed, and dot count
- ♿ **Accessibility First**: Screen reader support with ARIA live regions
- 🎯 **Backward Compatible**: Existing code continues to work without changes
- 🌙 **Theme Support**: Works with light/dark themes through Spectrum CSS
- 🌍 **Internationalization**: Supports RTL languages and custom loading text

## API Reference

### Button Props

The terminal loading feature extends the existing Button component with new optional props:

```typescript
interface SpectrumButtonProps {
  // Existing props...
  isPending?: boolean;
  
  // New terminal loading props
  loadingStyle?: 'spinner' | 'terminal'; // default: 'spinner'
  loadingText?: string;                   // default: 'Loading'
  loadingSpeed?: number;                  // milliseconds per frame, default: 500
  loadingDots?: number;                   // maximum dots, default: 4
}
```

#### `loadingStyle`
- **Type**: `'spinner' | 'terminal'`
- **Default**: `'spinner'`
- **Description**: Determines the loading animation style. Use `'terminal'` to enable the terminal-style animation.

#### `loadingText`
- **Type**: `string`
- **Default**: `'Loading'`
- **Description**: The base text displayed during terminal loading animation. Dots will be appended to this text.

#### `loadingSpeed`
- **Type**: `number`
- **Default**: `500`
- **Description**: Animation speed in milliseconds per frame. Lower values create faster animations.

#### `loadingDots`
- **Type**: `number`
- **Default**: `4`
- **Description**: Maximum number of dots in the animation cycle (0 to maxDots).

## Usage Examples

### Basic Terminal Loading

```jsx
import { Button } from '@react-spectrum/button';

function SaveButton() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button 
      isPending={isLoading} 
      loadingStyle="terminal"
      onPress={() => setIsLoading(true)}
    >
      Save Document
    </Button>
  );
}
```

### Custom Loading Text

```jsx
<Button 
  isPending={isProcessing} 
  loadingStyle="terminal"
  loadingText="Processing"
>
  Process Data
</Button>
```

### Full Customization

```jsx
<Button 
  isPending={isUploading} 
  loadingStyle="terminal"
  loadingText="Uploading"
  loadingSpeed={300}
  loadingDots={3}
  variant="accent"
>
  Upload Files
</Button>
```

### Maintaining Existing Behavior

```jsx
// This continues to work exactly as before
<Button isPending={isLoading}>
  Save
</Button>

// Equivalent to the above (explicit spinner style)
<Button isPending={isLoading} loadingStyle="spinner">
  Save
</Button>
```

## Animation Behavior

The terminal loading animation follows this pattern:

1. **Initial State**: Shows the base text (e.g., "Loading")
2. **Cycle Progression**: Adds dots progressively:
   - Frame 1: "Loading"
   - Frame 2: "Loading."
   - Frame 3: "Loading.."
   - Frame 4: "Loading..."
   - Frame 5: "Loading...." (if maxDots = 4)
3. **Reset**: Returns to base text and repeats

### Timing Behavior

- **1-Second Delay**: Follows the same 1-second delay as the existing spinner before showing loading state
- **Animation Speed**: Configurable frame duration (default: 500ms per frame)
- **Smooth Transitions**: No jarring changes, smooth text replacement

## Accessibility

The terminal loading animation maintains React Spectrum's high accessibility standards:

### Screen Reader Support

```jsx
// Automatically includes proper ARIA attributes
<Button 
  isPending={isLoading} 
  loadingStyle="terminal"
  loadingText="Saving"
>
  Save
</Button>

// Results in:
// <button aria-live="polite" role="status">
//   Saving...
// </button>
```

### Key Accessibility Features

- **ARIA Live Regions**: `aria-live="polite"` announces text changes to screen readers
- **Role Status**: `role="status"` identifies the loading state
- **Focus Management**: Button remains focusable during loading
- **Keyboard Navigation**: All keyboard interactions preserved
- **Screen Reader Announcements**: Automatic announcements when loading starts/stops

### Accessibility Best Practices

```jsx
// Good: Descriptive loading text
<Button 
  isPending={isLoading} 
  loadingStyle="terminal"
  loadingText="Saving document"
>
  Save
</Button>

// Avoid: Generic text that doesn't describe the action
<Button 
  isPending={isLoading} 
  loadingStyle="terminal"
  loadingText="Please wait"
>
  Save
</Button>
```

## Styling and Theming

### CSS Classes

The terminal loader integrates with Spectrum CSS design system:

```css
.spectrum-TerminalLoader {
  /* Inherits from Spectrum CSS design tokens */
  font-family: var(--spectrum-font-family-base);
  color: var(--spectrum-color-text-primary);
}

.spectrum-TerminalLoader.is-loading {
  /* Animation styles */
}
```

### Theme Compatibility

```jsx
// Works automatically with all Spectrum themes
<Provider theme="dark">
  <Button 
    isPending={isLoading} 
    loadingStyle="terminal"
    loadingText="Processing"
  >
    Process
  </Button>
</Provider>
```

### Custom Styling

```jsx
// Use UNSAFE_className for custom styling
<Button 
  isPending={isLoading} 
  loadingStyle="terminal"
  UNSAFE_className="my-custom-loading-button"
>
  Custom Button
</Button>
```

## Internationalization

### RTL Language Support

```jsx
// Automatically supports RTL languages
<Provider locale="ar-SA">
  <Button 
    isPending={isLoading} 
    loadingStyle="terminal"
    loadingText="جاري التحميل" // Arabic: "Loading"
  >
    حفظ
  </Button>
</Provider>
```

### Localized Loading Text

```jsx
// Use your i18n solution for loading text
const loadingMessages = {
  en: 'Loading',
  es: 'Cargando',
  fr: 'Chargement',
  de: 'Laden',
  ja: '読み込み中'
};

<Button 
  isPending={isLoading} 
  loadingStyle="terminal"
  loadingText={loadingMessages[locale]}
>
  {buttonMessages[locale]}
</Button>
```

## Performance Considerations

### Optimized Animation

- **Efficient Intervals**: Uses `setInterval` with proper cleanup
- **Minimal Re-renders**: Optimized state updates
- **Memory Management**: Automatic cleanup on component unmount

### Performance Tips

```jsx
// Good: Reasonable animation speed
<Button loadingSpeed={500} loadingStyle="terminal">
  Save
</Button>

// Avoid: Very fast animations that may cause accessibility issues
<Button loadingSpeed={50} loadingStyle="terminal">
  Save
</Button>

// Good: Reasonable dot count
<Button loadingDots={4} loadingStyle="terminal">
  Save
</Button>

// Avoid: Excessive dots that may be hard to read
<Button loadingDots={20} loadingStyle="terminal">
  Save
</Button>
```

## Migration Guide

### From Existing Buttons

The terminal loading feature is fully backward compatible:

```jsx
// Before - this continues to work
<Button isPending={isLoading}>Save</Button>

// After - add terminal loading
<Button isPending={isLoading} loadingStyle="terminal">Save</Button>
```

### No Breaking Changes

- All existing Button props remain unchanged
- Default behavior is preserved
- Existing tests continue to pass
- No changes required to existing code

## Advanced Usage

### Conditional Loading Styles

```jsx
function AdaptiveButton({ isPending, useTerminalStyle, children }) {
  return (
    <Button 
      isPending={isPending}
      loadingStyle={useTerminalStyle ? 'terminal' : 'spinner'}
      loadingText={useTerminalStyle ? 'Processing' : undefined}
    >
      {children}
    </Button>
  );
}
```

### Dynamic Configuration

```jsx
function ConfigurableButton() {
  const [config, setConfig] = useState({
    text: 'Loading',
    speed: 500,
    dots: 4
  });

  return (
    <Button 
      isPending={isLoading}
      loadingStyle="terminal"
      loadingText={config.text}
      loadingSpeed={config.speed}
      loadingDots={config.dots}
    >
      Configurable Button
    </Button>
  );
}
```

### Form Integration

```jsx
function FormWithTerminalLoading() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      await submitForm(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* form fields */}
      <Button 
        type="submit"
        isPending={isSubmitting}
        loadingStyle="terminal"
        loadingText="Submitting"
        variant="accent"
      >
        Submit Form
      </Button>
    </Form>
  );
}
```

## Testing

### Unit Testing

```jsx
import { render, screen } from '@testing-library/react';
import { Button } from '@react-spectrum/button';

test('displays terminal loading animation', async () => {
  render(
    <Button 
      isPending={true} 
      loadingStyle="terminal"
      loadingText="Testing"
    >
      Test Button
    </Button>
  );

  // Check initial state
  expect(screen.getByText('Testing')).toBeInTheDocument();
  
  // Check animation progression
  await waitFor(() => {
    expect(screen.getByText(/Testing\./)).toBeInTheDocument();
  });
});

test('maintains accessibility attributes', () => {
  render(
    <Button isPending={true} loadingStyle="terminal">
      Test
    </Button>
  );

  const button = screen.getByRole('button');
  expect(button).toHaveAttribute('aria-live', 'polite');
  expect(button).toHaveAttribute('role', 'status');
});
```

### Integration Testing

```jsx
test('terminal loading with form submission', async () => {
  const onSubmit = jest.fn();
  
  render(
    <Form onSubmit={onSubmit}>
      <Button 
        type="submit"
        isPending={isSubmitting}
        loadingStyle="terminal"
      >
        Submit
      </Button>
    </Form>
  );

  // Test interaction blocking during loading
  const button = screen.getByRole('button');
  fireEvent.click(button);
  
  expect(onSubmit).toHaveBeenCalledTimes(1);
});
```

## Browser Support

The terminal loading animation supports all browsers that React Spectrum supports:

- **Modern Browsers**: Chrome 70+, Firefox 70+, Safari 12.1+, Edge 79+
- **Mobile**: iOS Safari 12.1+, Chrome Mobile 70+
- **Animation Fallback**: Graceful degradation on older browsers

## Troubleshooting

### Common Issues

#### Animation Not Visible
```jsx
// Issue: Animation speed too slow
<Button loadingSpeed={5000} loadingStyle="terminal">
  Slow Button
</Button>

// Solution: Use reasonable speed
<Button loadingSpeed={500} loadingStyle="terminal">
  Fixed Button
</Button>
```

#### Text Overflow
```jsx
// Issue: Long loading text with many dots
<Button 
  loadingText="Very long loading message"
  loadingDots={10}
  loadingStyle="terminal"
>
  Button
</Button>

// Solution: Keep text concise
<Button 
  loadingText="Loading"
  loadingDots={4}
  loadingStyle="terminal"
>
  Button
</Button>
```

#### Accessibility Warnings
```jsx
// Issue: Missing descriptive loading text
<Button loadingText="..." loadingStyle="terminal">
  Save
</Button>

// Solution: Use descriptive text
<Button loadingText="Saving document" loadingStyle="terminal">
  Save
</Button>
```

### Debug Mode

```jsx
// Add logging for debugging
function DebugButton({ children, ...props }) {
  useEffect(() => {
    if (props.isPending) {
      console.log('Terminal loading started:', {
        text: props.loadingText,
        speed: props.loadingSpeed,
        dots: props.loadingDots
      });
    }
  }, [props.isPending]);

  return <Button {...props}>{children}</Button>;
}
```

## Contributing

To contribute to the terminal loading feature:

1. **File Structure**:
   ```
   packages/@react-spectrum/button/
   ├── src/
   │   ├── Button.tsx          # Main button component
   │   └── TerminalLoader.tsx  # Terminal animation component
   └── test/
       ├── Button.test.js          # Button tests
       └── TerminalLoader.test.js  # Terminal loader tests
   ```

2. **Development Setup**:
   ```bash
   yarn install
   yarn build
   yarn test packages/@react-spectrum/button
   ```

3. **Testing Requirements**:
   - Unit tests for all props and animations
   - Accessibility tests
   - Integration tests with forms
   - Visual regression tests

## Changelog

### Version 3.x.x
- ✨ Added terminal loading animation support
- ✨ Added `loadingStyle`, `loadingText`, `loadingSpeed`, `loadingDots` props
- ✅ Maintained full backward compatibility
- ♿ Enhanced accessibility with ARIA live regions
- 🌍 Added internationalization support
- 🎨 Integrated with Spectrum CSS theming system

---

## Examples Repository

For more examples and interactive demos, visit the [React Spectrum Examples](../examples/) directory:

- **Basic Usage**: `examples/terminal-loading-basic/`
- **Advanced Customization**: `examples/terminal-loading-advanced/`
- **Form Integration**: `examples/terminal-loading-forms/`
- **Accessibility Demo**: `examples/terminal-loading-a11y/`

## Support

For questions, issues, or feature requests related to terminal loading:

- 📚 **Documentation**: [React Spectrum Button Docs](https://react-spectrum.adobe.com/react-spectrum/Button.html)
- 🐛 **Issues**: [GitHub Issues](https://github.com/adobe/react-spectrum/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/adobe/react-spectrum/discussions)
- 📧 **Email**: spectrum-engineering@adobe.com