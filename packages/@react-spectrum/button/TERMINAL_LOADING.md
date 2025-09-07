# Terminal Loading Feature

A nostalgic terminal-style loading animation for React Spectrum Button components.

## Overview

The terminal loading feature provides an alternative to the default spinner animation, displaying animated text with cycling dots (e.g., "Loading", "Loading.", "Loading..", "Loading...", "Loading....") that mimics classic terminal interfaces.

## Features

- 🔄 **Smooth Animation**: Cycles through dots with configurable timing
- 🎨 **Fully Customizable**: Control text, speed, and dot count
- ♿ **Accessible**: Full screen reader support and ARIA compliance
- 🌍 **Internationalization**: Supports any language through `loadingText`
- 🎯 **Backward Compatible**: No breaking changes to existing code
- 📱 **Responsive**: Works across all device sizes and themes

## Quick Start

```tsx
import {Button} from '@react-spectrum/button';

function MyComponent() {
  const [isPending, setIsPending] = useState(false);

  return (
    <Button 
      isPending={isPending}
      loadingStyle="terminal"
      onPress={() => {
        setIsPending(true);
        // Your async operation
        setTimeout(() => setIsPending(false), 3000);
      }}
    >
      Save Changes
    </Button>
  );
}
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `loadingStyle` | `'spinner' \| 'terminal'` | `'spinner'` | Loading animation style |
| `loadingText` | `string` | `'Loading'` | Base text to display during loading |
| `loadingSpeed` | `number` | `500` | Animation speed in milliseconds per frame |
| `loadingDots` | `number` | `4` | Maximum number of dots to cycle through |

### Examples

#### Basic Usage

```tsx
// Default terminal loading
<Button isPending={isLoading} loadingStyle="terminal">
  Save
</Button>
```

#### Custom Text

```tsx
// Custom loading text
<Button 
  isPending={isLoading} 
  loadingStyle="terminal"
  loadingText="Processing"
>
  Process Data
</Button>
```

#### Fast Animation

```tsx
// Faster animation (300ms per frame)
<Button 
  isPending={isLoading} 
  loadingStyle="terminal"
  loadingText="Uploading"
  loadingSpeed={300}
>
  Upload File
</Button>
```

#### Custom Dot Count

```tsx
// Only 3 dots maximum
<Button 
  isPending={isLoading} 
  loadingStyle="terminal"
  loadingText="Syncing"
  loadingDots={3}
>
  Sync Now
</Button>
```

#### Full Customization

```tsx
// All options combined
<Button 
  isPending={isLoading} 
  loadingStyle="terminal"
  loadingText="Deploying"
  loadingSpeed={400}
  loadingDots={5}
>
  Deploy App
</Button>
```

## Animation Behavior

The terminal loading animation follows this pattern:

1. **Initial State**: Shows base text (e.g., "Loading")
2. **Frame 1**: Adds one dot (e.g., "Loading.")
3. **Frame 2**: Adds second dot (e.g., "Loading..")
4. **Frame N**: Continues until `loadingDots` is reached
5. **Reset**: Returns to base text and repeats

The animation timing is controlled by `loadingSpeed` (milliseconds between frames).

## Accessibility

The terminal loading feature maintains React Spectrum's accessibility standards:

### Screen Reader Support
- Loading state changes are announced automatically
- Uses `aria-live="polite"` for non-intrusive updates
- Maintains proper ARIA labels throughout animation

### Focus Management
- Button remains focusable during loading
- Keyboard navigation is preserved
- Focus indicators work correctly

### ARIA Attributes
- `role="status"` for loading indicator
- `aria-label` supports custom descriptions
- `aria-live="polite"` for text updates

## Internationalization

The terminal loading feature supports internationalization:

```tsx
// Spanish
<Button 
  loadingStyle="terminal"
  loadingText="Cargando"
  isPending={isLoading}
>
  Guardar
</Button>

// Japanese
<Button 
  loadingStyle="terminal"
  loadingText="読み込み中"
  isPending={isLoading}
>
  保存
</Button>

// German
<Button 
  loadingStyle="terminal"
  loadingText="Wird geladen"
  isPending={isLoading}
>
  Speichern
</Button>
```

## Technical Implementation

### Component Architecture

```
Button.tsx
├── isPending check
├── loadingStyle === 'terminal'
│   └── TerminalLoader component
│       ├── useEffect for animation
│       ├── useState for dot count
│       └── Accessibility attributes
└── Default spinner (existing)
```

### Performance Considerations

- Uses `useEffect` with proper cleanup
- Optimized re-render cycle
- Minimal DOM updates
- Efficient interval management

### Browser Support

Works in all browsers supported by React Spectrum:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Migration Guide

### From Spinner to Terminal

```tsx
// Before
<Button isPending={isLoading}>Save</Button>

// After
<Button isPending={isLoading} loadingStyle="terminal">Save</Button>
```

### No Breaking Changes

All existing Button props and functionality remain unchanged. The terminal loading feature is purely additive.

## Testing

The feature includes comprehensive test coverage:

- Animation cycle behavior
- Prop validation
- Accessibility attributes
- Cleanup on unmount
- Integration with Button states

## Troubleshooting

### Common Issues

**Animation not starting**
- Ensure `isPending={true}` is set
- Check that `loadingStyle="terminal"` is specified

**Text not updating**
- Verify `loadingSpeed` is a positive number
- Check browser console for JavaScript errors

**Accessibility warnings**
- Ensure proper ARIA labels are provided
- Check that screen reader testing is configured

**Performance issues**
- Consider increasing `loadingSpeed` for slower animations
- Verify proper cleanup in `useEffect`

## Contributing

To contribute to the terminal loading feature:

1. Check the existing tests in `test/TerminalLoader.test.js`
2. Follow React Spectrum's coding standards
3. Ensure accessibility compliance
4. Add appropriate test coverage

## Related Components

- `@react-spectrum/button` - Main Button component
- `@react-spectrum/progress` - Progress indicators
- `@react-aria/button` - Button accessibility hooks

## Changelog

### v1.0.0 (Initial Release)
- Basic terminal loading animation
- Customizable text, speed, and dot count
- Full accessibility support
- Internationalization ready
- Comprehensive test coverage