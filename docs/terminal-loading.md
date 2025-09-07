# Terminal Loading Animation

A nostalgic terminal-style loading animation component for React Spectrum buttons that provides a cycling dots animation (e.g., 'Loading', 'Loading.', 'Loading..', 'Loading...', 'Loading….').

## Overview

The Terminal Loading feature enhances React Spectrum's Button component with a retro terminal-style loading animation that replaces the default spinner. This provides users with a nostalgic computing experience while maintaining full accessibility and customization options.

## Features

- 🔄 **Smooth Animation**: Cycling dots that smoothly transition through different states
- 🎨 **Fully Customizable**: Configure text, speed, and maximum dot count
- ♿ **Accessible**: Full screen reader support with ARIA live regions
- 🎯 **Backward Compatible**: Existing code continues to work without changes
- 🌙 **Theme Support**: Works with light/dark themes and RTL languages
- ⚡ **Performance Optimized**: Efficient animation with proper cleanup

## API Reference

### Button Props

The terminal loading functionality is integrated into the existing Button component through new optional props:

```typescript
interface SpectrumButtonProps {
  // ... existing props
  
  /** The loading animation style to use */
  loadingStyle?: 'spinner' | 'terminal'; // default: 'spinner'
  
  /** Custom text to display during terminal loading */
  loadingText?: string; // default: 'Loading'
  
  /** Animation speed in milliseconds per frame */
  loadingSpeed?: number; // default: 500
  
  /** Maximum number of dots to cycle through */
  loadingDots?: number; // default: 4
}
```

### TerminalLoader Component

The core animation component that powers the terminal loading effect:

```typescript
interface TerminalLoaderProps {
  /** Base text to display (dots will be appended) */
  text?: string; // default: 'Loading'
  
  /** Animation speed in milliseconds per frame */
  speed?: number; // default: 500
  
  /** Maximum number of dots in the cycle */
  maxDots?: number; // default: 4
  
  /** Additional CSS class name */
  className?: string;
  
  /** ARIA label for screen readers */
  'aria-label'?: string;
}
```

## Usage Examples

### Basic Terminal Loading

Replace the default spinner with terminal animation:

```tsx
import {Button} from '@react-spectrum/button';

function SaveButton() {
  const [isSaving, setIsSaving] = useState(false);
  
  return (
    <Button 
      isPending={isSaving}
      loadingStyle="terminal"
      onPress={() => handleSave()}
    >
      Save Document
    </Button>
  );
}
```

### Custom Loading Text

Use custom text instead of the default "Loading":

```tsx
<Button 
  isPending={isProcessing}
  loadingStyle="terminal"
  loadingText="Processing"
>
  Process Data
</Button>
```

### Full Customization

Configure all animation parameters:

```tsx
<Button 
  isPending={isUploading}
  loadingStyle="terminal"
  loadingText="Uploading"
  loadingSpeed={300}    // Faster animation (300ms per frame)
  loadingDots={3}       // Only cycle through 3 dots
>
  Upload File
</Button>
```

### Comparison with Default Spinner

```tsx
{/* Default spinner behavior (unchanged) */}
<Button isPending={isLoading}>
  Save
</Button>

{/* Terminal loading animation */}
<Button isPending={isLoading} loadingStyle="terminal">
  Save
</Button>
```

## Animation Behavior

The terminal loading animation cycles through the following states:

1. **Base text** (e.g., "Loading")
2. **One dot** (e.g., "Loading.")
3. **Two dots** (e.g., "Loading..")
4. **Three dots** (e.g., "Loading...")
5. **Four dots** (e.g., "Loading....")
6. **Back to base** (cycle repeats)

### Timing

- **Default Speed**: 500ms per frame (2 seconds for full cycle with 4 dots)
- **Delay**: Follows the same 1-second delay as the default spinner
- **Smooth Transitions**: No jarring jumps between states

## Accessibility

The terminal loading animation maintains full accessibility compliance:

### Screen Reader Support

- **ARIA Live Region**: Changes are announced to screen readers
- **Role Status**: Proper semantic role for loading states
- **Polite Updates**: Uses `aria-live="polite"` to avoid interrupting users

### Focus Management

- **Maintained Focus**: Button remains focusable during loading
- **Keyboard Navigation**: Full keyboard support preserved
- **Focus Indicators**: Visual focus rings work normally

### ARIA Labels

```tsx
// Automatic ARIA labeling
<Button isPending={true} loadingStyle="terminal">
  Save
</Button>
// Announces: "Save, Loading..." (with dot count changes)

// Custom ARIA label
<Button 
  isPending={true} 
  loadingStyle="terminal"
  loadingText="Saving document"
  aria-label="Save document button"
>
  Save
</Button>
// Announces: "Save document button, Saving document..."
```

## Styling and Theming

### CSS Integration

The terminal loader integrates seamlessly with Spectrum CSS:

```css
/* Automatic styling through Spectrum CSS */
.spectrum-Button-label {
  /* Terminal text inherits button label styles */
  font-family: inherit;
  font-size: inherit;
  color: inherit;
}

/* Dark theme support */
.spectrum--dark .spectrum-Button-label {
  /* Automatically adapts to dark theme */
}
```

### Custom Styling

Add custom styles through className:

```tsx
<Button 
  isPending={isLoading}
  loadingStyle="terminal"
  UNSAFE_className="my-custom-button"
>
  Save
</Button>
```

```css
.my-custom-button .spectrum-Button-label {
  font-family: 'Courier New', monospace;
  letter-spacing: 0.1em;
}
```

## Internationalization

### RTL Language Support

The terminal loading animation works correctly with right-to-left languages:

```tsx
// Arabic example
<Button 
  isPending={isLoading}
  loadingStyle="terminal"
  loadingText="جاري التحميل"
>
  حفظ
</Button>
```

### Localization

Customize loading text for different languages:

```tsx
const loadingText = {
  en: 'Loading',
  es: 'Cargando',
  fr: 'Chargement',
  de: 'Laden',
  ja: '読み込み中'
};

<Button 
  isPending={isLoading}
  loadingStyle="terminal"
  loadingText={loadingText[currentLocale]}
>
  {buttonText[currentLocale]}
</Button>
```

## Performance Considerations

### Efficient Animation

- **requestAnimationFrame**: Uses browser-optimized timing
- **Proper Cleanup**: Intervals are cleared on component unmount
- **Minimal Re-renders**: Optimized dependency arrays prevent unnecessary updates

### Memory Management

```tsx
// The component automatically handles cleanup
useEffect(() => {
  const interval = setInterval(() => {
    setDotCount(prev => (prev + 1) % (maxDots + 1));
  }, speed);
  
  // Cleanup on unmount or dependency change
  return () => clearInterval(interval);
}, [speed, maxDots]);
```

## Migration Guide

### From Existing Code

No breaking changes - existing code continues to work:

```tsx
// Before (still works)
<Button isPending={isLoading}>Save</Button>

// After (opt-in to terminal loading)
<Button isPending={isLoading} loadingStyle="terminal">Save</Button>
```

### Gradual Adoption

You can migrate buttons incrementally:

```tsx
// Phase 1: Keep existing spinners
<Button isPending={isLoading}>Save</Button>

// Phase 2: Add terminal loading to new buttons
<Button isPending={isLoading} loadingStyle="terminal">Export</Button>

// Phase 3: Update existing buttons when convenient
<Button isPending={isLoading} loadingStyle="terminal">Save</Button>
```

## Best Practices

### When to Use Terminal Loading

**Good Use Cases:**
- Developer tools and IDEs
- Command-line interfaces
- Retro/nostalgic applications
- Long-running operations
- File processing tasks

**Consider Alternatives:**
- Modern consumer applications (use default spinner)
- Quick operations (< 1 second)
- Mobile-first applications
- Accessibility-critical contexts where text changes might be disruptive

### Configuration Guidelines

**Loading Text:**
- Keep it concise (1-2 words)
- Use action verbs ("Saving", "Loading", "Processing")
- Match the button's action

**Animation Speed:**
- **Fast (200-300ms)**: For quick operations
- **Normal (400-600ms)**: For most use cases
- **Slow (800-1000ms)**: For long operations or emphasis

**Dot Count:**
- **3 dots**: Minimal, clean look
- **4 dots**: Default, balanced
- **5+ dots**: More dramatic effect

### Accessibility Best Practices

```tsx
// Good: Descriptive loading text
<Button 
  isPending={isUploading}
  loadingStyle="terminal"
  loadingText="Uploading file"
>
  Upload
</Button>

// Good: Consider screen reader users
<Button 
  isPending={isProcessing}
  loadingStyle="terminal"
  loadingText="Processing data"
  aria-label="Process customer data"
>
  Process
</Button>

// Avoid: Generic text for specific actions
<Button 
  isPending={isDeleting}
  loadingStyle="terminal"
  loadingText="Loading" // Should be "Deleting"
>
  Delete
</Button>
```

## Troubleshooting

### Common Issues

**Animation Not Starting:**
- Ensure `isPending` is set to `true`
- Check that `loadingStyle="terminal"` is specified
- Verify the 1-second delay before animation appears

**Animation Too Fast/Slow:**
- Adjust `loadingSpeed` prop (in milliseconds)
- Remember: lower values = faster animation

**Text Overflow:**
- Use shorter `loadingText` values
- Consider button width and responsive design
- Test with maximum dot count

**Accessibility Issues:**
- Ensure `loadingText` is descriptive
- Test with screen readers
- Verify ARIA labels are appropriate

### Performance Issues

If you notice performance problems:

```tsx
// Optimize with useMemo for static configurations
const terminalConfig = useMemo(() => ({
  loadingStyle: 'terminal',
  loadingText: 'Processing',
  loadingSpeed: 500,
  loadingDots: 4
}), []);

<Button isPending={isLoading} {...terminalConfig}>
  Process
</Button>
```

## Examples Gallery

### Basic Examples

```tsx
// Simple terminal loading
<Button isPending={true} loadingStyle="terminal">
  Save
</Button>

// Custom text
<Button isPending={true} loadingStyle="terminal" loadingText="Saving">
  Save Document
</Button>

// Fast animation
<Button 
  isPending={true} 
  loadingStyle="terminal" 
  loadingSpeed={250}
>
  Quick Action
</Button>
```

### Advanced Examples

```tsx
// File upload with progress indication
function FileUploader() {
  const [isUploading, setIsUploading] = useState(false);
  
  return (
    <Button 
      isPending={isUploading}
      loadingStyle="terminal"
      loadingText="Uploading"
      loadingSpeed={400}
      loadingDots={5}
      onPress={handleUpload}
    >
      Upload Files
    </Button>
  );
}

// Conditional loading style
function AdaptiveButton() {
  const isRetroMode = useRetroMode();
  
  return (
    <Button 
      isPending={isLoading}
      loadingStyle={isRetroMode ? 'terminal' : 'spinner'}
      loadingText="Processing"
    >
      Process Data
    </Button>
  );
}
```

## Technical Implementation

### Component Architecture

```
Button Component
├── Standard button functionality
├── isPending state management
├── 1-second delay logic
└── Loading display logic
    ├── Spinner (default)
    └── TerminalLoader (new)
        ├── Animation state management
        ├── Interval-based dot cycling
        └── Accessibility features
```

### File Structure

```
packages/@react-spectrum/button/
├── src/
│   ├── Button.tsx           # Main button component
│   ├── TerminalLoader.tsx   # Terminal animation component
│   └── index.ts            # Exports
├── test/
│   ├── Button.test.js      # Button tests (updated)
│   └── TerminalLoader.test.js # Terminal loader tests
└── package.json
```

## Contributing

### Adding New Animation Styles

To add new loading animation styles:

1. **Update Types**: Add new style to `loadingStyle` union type
2. **Create Component**: Implement new animation component
3. **Integrate**: Add to Button component's loading logic
4. **Test**: Add comprehensive test coverage
5. **Document**: Update this documentation

### Testing Guidelines

When contributing, ensure:

- **Unit Tests**: Test animation cycles and timing
- **Integration Tests**: Test Button integration
- **Accessibility Tests**: Verify ARIA attributes
- **Visual Tests**: Check animation smoothness
- **Performance Tests**: Monitor memory usage

---

## Support

For questions, issues, or feature requests related to the terminal loading animation:

1. **Documentation**: Check this guide first
2. **Issues**: Search existing GitHub issues
3. **Community**: Ask in React Spectrum discussions
4. **Contributing**: See CONTRIBUTING.md for development setup

---

*This feature enhances the React Spectrum Button component while maintaining backward compatibility and accessibility standards.*