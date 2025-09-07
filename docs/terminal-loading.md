# Terminal Loading Animation

A nostalgic terminal-style loading animation for React Spectrum Button components, featuring cycling dots that create a classic command-line interface feel.

## Overview

The terminal loading feature enhances React Spectrum's Button component with a retro terminal-style animation that cycles through dots (e.g., 'Loading', 'Loading.', 'Loading..', 'Loading...', 'Loading….'), providing a nostalgic alternative to the default spinner animation.

## Features

- 🔄 **Smooth Animation**: Cycling dots that create a terminal-like loading experience
- 🎨 **Fully Customizable**: Configure text, speed, and dot count
- ♿ **Accessible**: Full screen reader support with ARIA live regions
- 🔙 **Backward Compatible**: Existing code continues to work unchanged
- 🌙 **Theme Support**: Works seamlessly with Spectrum's light and dark themes
- 🌍 **Internationalization**: Supports RTL languages and custom loading text

## Quick Start

### Basic Usage

```tsx
import { Button } from '@react-spectrum/button';

function MyComponent() {
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

### Custom Configuration

```tsx
<Button 
  isPending={isLoading} 
  loadingStyle="terminal"
  loadingText="Processing"
  loadingSpeed={300}
  loadingDots={3}
  onPress={handleProcess}
>
  Process Data
</Button>
```

## API Reference

### Button Props

The terminal loading feature adds the following props to the Button component:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `loadingStyle` | `'spinner' \| 'terminal'` | `'spinner'` | Controls the loading animation type |
| `loadingText` | `string` | `'Loading'` | Base text displayed during terminal loading |
| `loadingSpeed` | `number` | `500` | Animation speed in milliseconds per frame |
| `loadingDots` | `number` | `4` | Maximum number of dots in the animation cycle |

### TerminalLoader Component

The underlying `TerminalLoader` component can also be used independently:

```tsx
import { TerminalLoader } from '@react-spectrum/button/src/TerminalLoader';

<TerminalLoader 
  text="Loading"
  speed={500}
  maxDots={4}
  className="custom-loader"
  aria-label="Loading content"
/>
```

## Examples

### Default Terminal Loading

```tsx
// Uses default settings: "Loading" text, 500ms speed, 4 dots
<Button isPending={isLoading} loadingStyle="terminal">
  Submit Form
</Button>
```

**Animation Sequence:**
- Loading
- Loading.
- Loading..
- Loading...
- Loading.... (cycles back to "Loading")

### Custom Loading Text

```tsx
<Button 
  isPending={isLoading} 
  loadingStyle="terminal"
  loadingText="Saving"
>
  Save Changes
</Button>
```

**Animation Sequence:**
- Saving
- Saving.
- Saving..
- Saving...
- Saving....

### Fast Animation

```tsx
<Button 
  isPending={isLoading} 
  loadingStyle="terminal"
  loadingText="Quick sync"
  loadingSpeed={200}
  loadingDots={3}
>
  Sync Now
</Button>
```

**Animation Sequence (200ms per frame):**
- Quick sync
- Quick sync.
- Quick sync..
- Quick sync...

### Comparison with Default Spinner

```tsx
// Default spinner loading (existing behavior)
<Button isPending={isLoading}>
  Upload File
</Button>

// Terminal loading
<Button isPending={isLoading} loadingStyle="terminal">
  Upload File
</Button>
```

## Behavior

### Loading State Timing

The terminal loading follows the same timing behavior as the default spinner:

1. **Immediate**: Button becomes disabled and shows pending state
2. **1-Second Delay**: After 1 second, the loading animation appears
3. **Text Replacement**: Button text is completely replaced with the terminal animation
4. **Accessibility**: Screen readers announce the loading state immediately

### Text Replacement

When terminal loading is active:
- The button's original text is completely replaced
- The terminal animation (`loadingText` + cycling dots) becomes the button content
- Button width may change based on the loading text length
- Focus remains on the button throughout the loading process

## Accessibility

### Screen Reader Support

- **Immediate Announcement**: Loading state is announced immediately when `isPending` becomes true
- **Live Updates**: The cycling animation uses `aria-live="polite"` for non-intrusive updates
- **Semantic Markup**: Uses `role="status"` to identify the loading indicator
- **Custom Labels**: Supports custom `aria-label` for specific contexts

### Keyboard Navigation

- **Focus Retention**: Button remains focusable during loading
- **Interaction Blocking**: Button is disabled to prevent multiple submissions
- **Visual Feedback**: Clear visual indication of loading state

### Example with Custom Accessibility

```tsx
<Button 
  isPending={isLoading}
  loadingStyle="terminal"
  loadingText="Uploading file"
  aria-label="Upload document to server"
>
  Upload Document
</Button>
```

## Styling and Theming

### CSS Classes

The terminal loader automatically inherits styling from the Button component and supports:

- **Theme Integration**: Works with Spectrum's light and dark themes
- **Custom Styling**: Can be styled using standard CSS classes
- **Responsive Design**: Adapts to different screen sizes

### CSS Customization

```css
/* Custom styling for terminal loader */
.spectrum-Button .terminal-loader {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  letter-spacing: 0.1em;
}
```

## Migration Guide

### From Existing Buttons

The terminal loading feature is fully backward compatible. No changes are required to existing code.

```tsx
// Before (still works)
<Button isPending={isLoading}>Save</Button>

// After (opt-in to terminal loading)
<Button isPending={isLoading} loadingStyle="terminal">Save</Button>
```

### Upgrading from Spinner to Terminal

```tsx
// Old approach
<Button isPending={isLoading}>
  Process Data
</Button>

// New approach with terminal loading
<Button 
  isPending={isLoading}
  loadingStyle="terminal"
  loadingText="Processing"
>
  Process Data
</Button>
```

## Best Practices

### Loading Text Guidelines

1. **Keep it concise**: Use short, descriptive text (e.g., "Saving", "Loading", "Processing")
2. **Match the action**: Align loading text with button purpose
3. **Consider length**: Longer text may cause layout shifts

```tsx
// Good
<Button loadingStyle="terminal" loadingText="Saving">Save Document</Button>

// Avoid (too long)
<Button loadingStyle="terminal" loadingText="Please wait while we save your document">
  Save Document
</Button>
```

### Animation Speed Recommendations

- **Fast actions (< 2s)**: 200-300ms for responsive feel
- **Medium actions (2-5s)**: 400-500ms (default) for balanced experience  
- **Long actions (> 5s)**: 600-800ms for calm, patient feel

### Accessibility Considerations

1. **Provide context**: Use descriptive loading text
2. **Avoid rapid changes**: Don't set speed too low (< 100ms)
3. **Test with screen readers**: Verify announcements work correctly

## Performance

### Optimization Features

- **Efficient Animation**: Uses `setInterval` with proper cleanup
- **Memory Management**: Automatically cleans up on component unmount
- **Minimal Re-renders**: Optimized state updates to prevent unnecessary renders

### Performance Tips

```tsx
// Good: Stable configuration
const loadingConfig = useMemo(() => ({
  loadingStyle: 'terminal',
  loadingText: 'Saving',
  loadingSpeed: 500
}), []);

<Button isPending={isLoading} {...loadingConfig}>Save</Button>

// Avoid: Creating new objects on every render
<Button 
  isPending={isLoading}
  loadingStyle="terminal"
  loadingText={someVariable} // Only if necessary
>
  Save
</Button>
```

## Troubleshooting

### Common Issues

#### Animation Not Appearing

**Issue**: Terminal loading doesn't show up
**Solution**: Ensure `loadingStyle="terminal"` is set along with `isPending={true}`

```tsx
// Incorrect
<Button isPending={true}>Save</Button>

// Correct
<Button isPending={true} loadingStyle="terminal">Save</Button>
```

#### Layout Shifts

**Issue**: Button width changes during loading
**Solution**: Use consistent loading text length or apply fixed width

```tsx
// Option 1: Consistent text length
<Button loadingStyle="terminal" loadingText="Save">Save Document</Button>

// Option 2: Fixed width
<Button 
  loadingStyle="terminal" 
  UNSAFE_style={{ minWidth: '120px' }}
>
  Save
</Button>
```

#### Accessibility Warnings

**Issue**: Screen reader announces too frequently
**Solution**: Verify `loadingSpeed` isn't too fast (< 200ms)

```tsx
// Avoid: Too fast for screen readers
<Button loadingStyle="terminal" loadingSpeed={50}>Save</Button>

// Better: Reasonable speed
<Button loadingStyle="terminal" loadingSpeed={300}>Save</Button>
```

## Browser Support

The terminal loading feature supports all browsers that React Spectrum supports:

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **JavaScript**: Requires ES2015+ support
- **Accessibility**: Works with all major screen readers

## Contributing

### Testing

When contributing to the terminal loading feature:

1. **Unit Tests**: Ensure all animation cycles work correctly
2. **Accessibility Tests**: Verify screen reader compatibility
3. **Visual Tests**: Test across different themes and screen sizes
4. **Performance Tests**: Verify cleanup and memory management

### Development Setup

```bash
# Install dependencies
yarn install

# Run tests
yarn test Button

# Run specific terminal loading tests
yarn test TerminalLoader
```

## Changelog

### Version 1.0.0
- ✅ Initial release of terminal loading feature
- ✅ Added `loadingStyle`, `loadingText`, `loadingSpeed`, and `loadingDots` props
- ✅ Full accessibility support with ARIA live regions
- ✅ Comprehensive test coverage
- ✅ Theme integration with Spectrum CSS
- ✅ Backward compatibility maintained

## Related

- [Button Component Documentation](./button.md)
- [Loading States Guide](./loading-states.md)
- [Accessibility Guidelines](./accessibility.md)
- [Theme Customization](./theming.md)