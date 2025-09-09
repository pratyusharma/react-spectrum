# Terminal Loading Animation

A nostalgic terminal-style loading animation for React Spectrum Button components that cycles through dots to create a retro command-line interface aesthetic.

## Overview

The terminal loading feature enhances the Button component's existing loading capabilities by providing an alternative to the default spinner animation. Instead of showing a circular progress indicator, the terminal animation replaces the button text with cycling dots that evoke the feel of classic terminal applications.

### Animation Pattern

The animation cycles through different dot counts:
- `Loading` → `Loading.` → `Loading..` → `Loading...` → `Loading....` → back to `Loading`

## Basic Usage

Enable terminal loading by setting the `loadingStyle` prop to `"terminal"`:

```tsx
import {Button} from '@react-spectrum/button';

function SaveButton() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveData();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Button 
      variant="primary" 
      isPending={isSaving} 
      loadingStyle="terminal"
      onPress={handleSave}
    >
      Save Document
    </Button>
  );
}
```

## API Reference

### New Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `loadingStyle` | `'spinner' \| 'terminal'` | `'spinner'` | Controls the loading animation style |
| `loadingText` | `string` | `'Loading'` | Custom text to display during terminal loading |
| `loadingSpeed` | `number` | `500` | Animation speed in milliseconds per frame |
| `loadingDots` | `number` | `4` | Maximum number of dots in the cycle |

### Existing Props (Unchanged)

| Prop | Type | Description |
|------|------|-------------|
| `isPending` | `boolean` | Triggers the loading state |
| `variant` | `'accent' \| 'primary' \| 'secondary' \| 'negative'` | Button style variant |
| `onPress` | `() => void` | Button press handler |

## Customization Examples

### Custom Loading Text

```tsx
<Button 
  isPending={isProcessing} 
  loadingStyle="terminal"
  loadingText="Processing"
>
  Process Data
</Button>
```

### Faster Animation

```tsx
<Button 
  isPending={isUploading} 
  loadingStyle="terminal"
  loadingText="Uploading"
  loadingSpeed={250}  // Faster animation
>
  Upload Files
</Button>
```

### More Dots

```tsx
<Button 
  isPending={isAnalyzing} 
  loadingStyle="terminal"
  loadingText="Analyzing"
  loadingDots={6}  // Up to 6 dots
>
  Run Analysis
</Button>
```

### Complete Customization

```tsx
<Button 
  variant="accent"
  isPending={isConnecting} 
  loadingStyle="terminal"
  loadingText="Connecting to server"
  loadingSpeed={400}
  loadingDots={3}
>
  Connect
</Button>
```

## Behavior Details

### Timing
- Follows the same 1-second delay as the default spinner
- After 1 second, the button text is replaced with the terminal animation
- Animation continues until `isPending` becomes `false`

### Text Replacement
- The terminal animation **completely replaces** the button text
- Original button text is restored when loading completes
- Button maintains its size and layout during the animation

### Interaction
- Button remains focusable during loading
- Click events are blocked while `isPending` is `true`
- Keyboard navigation continues to work

## Accessibility

The terminal loading animation maintains full accessibility compliance:

### Screen Reader Support
- Loading state changes are announced to screen readers
- Uses `aria-live="polite"` for text updates
- Includes `role="status"` for proper semantics

### Focus Management
- Button remains focusable during loading
- Focus indicator continues to work
- Keyboard navigation is unaffected

### ARIA Labels
```tsx
<Button 
  isPending={isLoading} 
  loadingStyle="terminal"
  aria-label="Save document - currently loading"
>
  Save
</Button>
```

## Internationalization

Support for different languages through the `loadingText` prop:

```tsx
// English
<Button loadingStyle="terminal" loadingText="Loading">Save</Button>

// Spanish
<Button loadingStyle="terminal" loadingText="Cargando">Guardar</Button>

// French
<Button loadingStyle="terminal" loadingText="Chargement">Enregistrer</Button>

// German
<Button loadingStyle="terminal" loadingText="Laden">Speichern</Button>

// Japanese
<Button loadingStyle="terminal" loadingText="読み込み中">保存</Button>
```

## Comparison with Default Loading

| Feature | Spinner Loading | Terminal Loading |
|---------|----------------|------------------|
| **Visual Style** | Circular progress indicator | Cycling text with dots |
| **Text Behavior** | Text remains visible | Text is replaced |
| **Animation** | Rotating spinner | Dot cycling |
| **Customization** | Limited | Highly customizable |
| **Accessibility** | Full support | Full support |
| **Performance** | Lightweight | Lightweight |

## Use Cases

### Ideal For
- **Developer Tools**: Code editors, terminals, CLI applications
- **Retro/Gaming UI**: Applications with nostalgic aesthetics  
- **Long Operations**: File uploads, data processing, system operations
- **Technical Applications**: Database queries, API calls, builds

### Consider Default Spinner For
- **Modern UI**: Clean, minimalist interfaces
- **Short Operations**: Quick saves, simple form submissions
- **Mobile-First**: Touch interfaces where text changes might be jarring

## Implementation Notes

### Performance
- Uses `useEffect` with proper cleanup for animation timing
- Minimal re-renders with optimized dependency arrays
- No performance impact when not in loading state

### CSS Integration
- Leverages existing Spectrum CSS design tokens
- Supports all theme variations (light/dark)
- Maintains responsive behavior
- Uses semantic color tokens for accessibility

### Browser Compatibility
- Works in all modern browsers
- Graceful fallback to default loading if needed
- No external dependencies

## Migration Guide

### From Default Loading
No breaking changes - existing code continues to work:

```tsx
// Before (still works)
<Button isPending={isLoading}>Save</Button>

// After (opt-in)
<Button isPending={isLoading} loadingStyle="terminal">Save</Button>
```

### Gradual Adoption
You can mix loading styles within the same application:

```tsx
<Flex gap="size-200">
  <Button isPending={isSaving} loadingStyle="terminal">
    Save Draft
  </Button>
  <Button isPending={isPublishing}>
    Publish
  </Button>
</Flex>
```

## Troubleshooting

### Common Issues

**Animation not visible?**
- Ensure `isPending` is `true`
- Wait for the 1-second delay
- Check that `loadingStyle="terminal"` is set

**Text too long?**
- Consider shorter `loadingText`
- Ensure button has adequate width
- Test with different screen sizes

**Animation too fast/slow?**
- Adjust `loadingSpeed` prop (milliseconds)
- Default is 500ms per frame
- Range: 100ms (very fast) to 1000ms (slow)

**Accessibility concerns?**
- Ensure meaningful `loadingText`
- Test with screen readers
- Provide appropriate `aria-label` if needed

## Future Enhancements

Planned features for future releases:
- Additional animation patterns
- Custom dot characters
- Animation easing options
- Integration with other components (ComboBox, etc.)

---

*This feature is available starting in React Spectrum v3.x and maintains full backward compatibility with existing Button implementations.*