# Terminal Loading Animation

A nostalgic terminal-style loading animation for React Spectrum Button components, featuring cycling dots that create a classic command-line interface loading experience.

## Overview

The terminal loading animation provides an alternative to the default spinner loading state, displaying animated text with cycling dots (e.g., 'Loading', 'Loading.', 'Loading..', 'Loading...', 'Loading….') that replaces the button text entirely during the loading state.

## Features

- 🎯 **Text Replacement**: Completely replaces button text during loading
- ⚡ **Customizable Speed**: Configurable animation speed (default: 500ms per frame)
- 🔧 **Custom Text**: Configurable base loading text (default: 'Loading')
- 📊 **Variable Dots**: Adjustable maximum dot count (default: 4)
- ♿ **Accessible**: Full screen reader support with ARIA live regions
- 🎨 **Themed**: Integrates with Spectrum CSS design tokens
- 🔄 **Smooth Animation**: Seamless cycling animation with proper cleanup
- ⏱️ **1-Second Delay**: Maintains existing loading behavior timing

## API Reference

### Button Props

The terminal loading animation is controlled through additional props on the standard `Button` component:

```typescript
interface ButtonProps {
  /** Whether to display loading state */
  isPending?: boolean;
  
  /** Loading animation style */
  loadingStyle?: 'spinner' | 'terminal'; // default: 'spinner'
  
  /** Custom loading text */
  loadingText?: string; // default: 'Loading'
  
  /** Animation speed in milliseconds per frame */
  loadingSpeed?: number; // default: 500
  
  /** Maximum number of dots in animation */
  loadingDots?: number; // default: 4
}
```

### TerminalLoader Component

The underlying `TerminalLoader` component can also be used independently:

```typescript
interface TerminalLoaderProps {
  /** Base text to display */
  text?: string; // default: 'Loading'
  
  /** Animation speed in milliseconds per frame */
  speed?: number; // default: 500
  
  /** Maximum number of dots */
  maxDots?: number; // default: 4
  
  /** Additional CSS class */
  className?: string;
  
  /** ARIA label for accessibility */
  'aria-label'?: string;
}
```

## Usage Examples

### Basic Terminal Loading

Replace the default spinner with terminal-style animation:

```tsx
import { Button } from '@react-spectrum/button';

function SaveButton() {
  const [isSaving, setIsSaving] = useState(false);

  return (
    <Button 
      isPending={isSaving}
      loadingStyle="terminal"
      onPress={() => setIsSaving(true)}
    >
      Save Document
    </Button>
  );
}
```

**Animation sequence**: `Loading` → `Loading.` → `Loading..` → `Loading...` → `Loading….` → repeat

### Custom Loading Text

Customize the base text for different contexts:

```tsx
<Button 
  isPending={isProcessing}
  loadingStyle="terminal"
  loadingText="Processing"
>
  Process Data
</Button>
```

**Animation sequence**: `Processing` → `Processing.` → `Processing..` → `Processing...` → `Processing….` → repeat

### Fast Animation

Speed up the animation for more dynamic feedback:

```tsx
<Button 
  isPending={isUploading}
  loadingStyle="terminal"
  loadingText="Uploading"
  loadingSpeed={250} // 4 frames per second
>
  Upload Files
</Button>
```

### Minimal Dots

Use fewer dots for a more subtle animation:

```tsx
<Button 
  isPending={isConnecting}
  loadingStyle="terminal"
  loadingText="Connecting"
  loadingDots={2} // Only show up to 2 dots
>
  Connect
</Button>
```

**Animation sequence**: `Connecting` → `Connecting.` → `Connecting..` → repeat

### Full Customization

Combine all options for complete control:

```tsx
<Button 
  isPending={isAnalyzing}
  loadingStyle="terminal"
  loadingText="Analyzing data"
  loadingSpeed={400}
  loadingDots={5}
  variant="accent"
>
  Run Analysis
</Button>
```

## Accessibility Features

The terminal loading animation maintains full accessibility compliance:

### Screen Reader Support

- **ARIA Live Region**: Uses `aria-live="polite"` to announce text changes
- **Role Status**: Includes `role="status"` for proper semantic meaning
- **Dynamic Labels**: Updates ARIA labels during loading state
- **Focus Management**: Preserves button focusability during loading

### Implementation Details

```tsx
// Accessibility attributes applied automatically
<span 
  className="spectrum-TerminalLoader"
  aria-live="polite"
  role="status"
  aria-label="Loading with 2 dots"
>
  Loading..
</span>
```

### Screen Reader Experience

1. **Loading Start**: "Save Document button, Loading"
2. **Animation Updates**: Politely announces text changes
3. **Loading End**: Returns to original button text and functionality

## Styling and Theming

The terminal loader integrates seamlessly with Spectrum CSS design tokens:

### CSS Classes

```css
.spectrum-TerminalLoader {
  /* Inherits from Spectrum Button text styles */
  font-family: var(--spectrum-font-family-base);
  font-size: var(--spectrum-font-size-100);
  font-weight: var(--spectrum-font-weight-regular);
  color: var(--spectrum-neutral-content-color-default);
}

/* Dark theme support */
.spectrum--dark .spectrum-TerminalLoader {
  color: var(--spectrum-neutral-content-color-default);
}
```

### Responsive Behavior

The animation text automatically adapts to:
- **Font Size**: Scales with button size variants
- **Color Themes**: Supports light/dark mode
- **RTL Languages**: Proper text direction support
- **High Contrast**: Maintains readability in high contrast mode

## Performance Considerations

### Optimizations

- **Efficient Intervals**: Uses `setInterval` with proper cleanup
- **Minimal Re-renders**: Optimized state updates
- **Memory Management**: Automatic cleanup on unmount
- **Dependency Arrays**: Proper useEffect dependencies

### Best Practices

```tsx
// ✅ Good: Proper cleanup handled automatically
const [isPending, setIsPending] = useState(false);

// ✅ Good: Reasonable animation speed
<Button loadingSpeed={500} />

// ❌ Avoid: Too fast animations (accessibility concern)
<Button loadingSpeed={50} />

// ❌ Avoid: Too many dots (visual clutter)
<Button loadingDots={20} />
```

## Internationalization (i18n)

### Localization Support

The terminal loader supports full internationalization:

```tsx
// English
<Button loadingText="Loading" />

// Spanish  
<Button loadingText="Cargando" />

// French
<Button loadingText="Chargement" />

// Japanese
<Button loadingText="読み込み中" />
```

### RTL Language Support

Automatic support for right-to-left languages through Spectrum CSS:

```tsx
// Hebrew - automatically handled
<Button loadingText="טוען" />

// Arabic - automatically handled  
<Button loadingText="جاري التحميل" />
```

## Migration Guide

### From Existing Buttons

No breaking changes - the feature is fully backward compatible:

```tsx
// Before: Default spinner (continues to work)
<Button isPending={loading}>Save</Button>

// After: Add terminal loading
<Button 
  isPending={loading}
  loadingStyle="terminal" // Only addition needed
>
  Save
</Button>
```

### Gradual Adoption

You can migrate buttons incrementally:

1. **Start with high-impact buttons** (primary actions)
2. **Test with your users** for preference feedback  
3. **Apply consistently** across similar interaction patterns
4. **Maintain spinner** for complex operations where progress indication is important

## Common Patterns

### Form Submission

```tsx
function ContactForm() {
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
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <Button 
        type="submit"
        isPending={isSubmitting}
        loadingStyle="terminal"
        loadingText="Submitting"
        variant="accent"
      >
        Submit Form
      </Button>
    </form>
  );
}
```

### Data Processing

```tsx
function DataProcessor() {
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <Button 
      isPending={isProcessing}
      loadingStyle="terminal"
      loadingText="Processing data"
      loadingSpeed={300} // Faster for active processing
      onPress={() => processData()}
    >
      Process Dataset
    </Button>
  );
}
```

### File Operations

```tsx
function FileUploader() {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <Button 
      isPending={isUploading}
      loadingStyle="terminal"
      loadingText="Uploading files"
      loadingDots={3} // Fewer dots for file operations
    >
      Upload Documents
    </Button>
  );
}
```

## Troubleshooting

### Common Issues

**Animation not showing**
```tsx
// ✅ Ensure loadingStyle is set
<Button isPending={true} loadingStyle="terminal">Save</Button>

// ❌ Missing loadingStyle defaults to spinner
<Button isPending={true}>Save</Button>
```

**Animation too fast/slow**
```tsx
// ✅ Adjust speed (higher = slower)
<Button loadingSpeed={800}>Slow animation</Button>
<Button loadingSpeed={200}>Fast animation</Button>
```

**Text not updating**
```tsx
// ✅ Ensure isPending is boolean
const [loading, setLoading] = useState(false);

// ❌ String values won't work
const [loading, setLoading] = useState("false");
```

### Performance Issues

If you experience performance issues with many animated buttons:

```tsx
// ✅ Good: Reasonable number of concurrent animations
<ButtonGroup>
  <Button loadingStyle="terminal">Action 1</Button>
  <Button loadingStyle="spinner">Action 2</Button>
</ButtonGroup>

// ⚠️ Consider: Many concurrent terminal animations
// May impact performance on slower devices
```

## Browser Support

The terminal loading animation supports all browsers that React Spectrum supports:

- **Chrome**: 73+
- **Firefox**: 63+  
- **Safari**: 12.1+
- **Edge**: 79+

### Fallback Behavior

On unsupported browsers, the animation gracefully falls back to the standard spinner loading state.

## Related Components

- **Button**: Main component implementing terminal loading
- **ProgressCircle**: Default spinner loading animation  
- **ProgressBar**: Alternative progress indication
- **ActionButton**: May receive terminal loading in future updates

---

*This documentation covers the terminal loading animation feature for React Spectrum Button components. For general Button documentation, see the main [Button documentation](./README.md).*