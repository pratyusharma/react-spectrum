# Terminal Loading Animation

A nostalgic terminal-style loading animation for React Spectrum Button components that replaces the button text with cycling dots (e.g., "Loading", "Loading.", "Loading..", "Loading...", "Loading....").

## Quick Start

```tsx
import {Button} from '@react-spectrum/button';

// Basic terminal loading
<Button isPending={isLoading} loadingStyle="terminal">
  Save
</Button>

// With custom text
<Button 
  isPending={isLoading} 
  loadingStyle="terminal"
  loadingText="Processing"
>
  Process Data
</Button>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `loadingStyle` | `'spinner' \| 'terminal'` | `'spinner'` | The loading animation style |
| `loadingText` | `string` | `'Loading'` | Text to display during terminal loading |
| `loadingSpeed` | `number` | `500` | Animation speed in milliseconds per frame |
| `loadingDots` | `number` | `4` | Maximum number of dots in animation cycle |

### Usage Examples

#### Basic Usage
```tsx
<Button 
  isPending={isLoading} 
  loadingStyle="terminal"
>
  Save Document
</Button>
```

#### Custom Text
```tsx
<Button 
  isPending={isLoading} 
  loadingStyle="terminal"
  loadingText="Uploading"
>
  Upload Files
</Button>
```

#### Fast Animation
```tsx
<Button 
  isPending={isLoading} 
  loadingStyle="terminal"
  loadingText="Processing"
  loadingSpeed={300}
>
  Quick Process
</Button>
```

#### Fewer Dots
```tsx
<Button 
  isPending={isLoading} 
  loadingStyle="terminal"
  loadingText="Saving"
  loadingDots={3}
>
  Save Changes
</Button>
```

#### Full Customization
```tsx
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

The terminal loading animation cycles through different states:

1. **Frame 0**: "Loading" (base text only)
2. **Frame 1**: "Loading." (1 dot)
3. **Frame 2**: "Loading.." (2 dots)
4. **Frame 3**: "Loading..." (3 dots)
5. **Frame 4**: "Loading...." (4 dots, default max)
6. **Repeat**: Back to frame 0

The animation speed controls how long each frame is displayed (default: 500ms).

## Accessibility Features

- **Screen Reader Support**: Uses `aria-live="polite"` for loading state announcements
- **Focus Management**: Button remains focusable during loading
- **ARIA Labels**: Proper labeling with `role="status"`
- **Motion Preferences**: Respects user's reduced motion settings

## Implementation Details

### Component Architecture
- **TerminalLoader**: Core animation component with cycling dots logic
- **Button Integration**: Seamlessly integrated into existing Button component
- **Backward Compatibility**: All existing Button functionality preserved

### Performance
- **Efficient Updates**: Uses `useEffect` with proper cleanup
- **Memory Management**: Automatic interval cleanup on unmount
- **Minimal Re-renders**: Optimized dependency arrays

### Styling
- **Spectrum CSS**: Integrates with existing design tokens
- **Theme Support**: Works with light/dark themes
- **RTL Support**: Proper right-to-left language support

## Comparison with Spinner Loading

| Feature | Spinner Loading | Terminal Loading |
|---------|----------------|------------------|
| Visual Style | Rotating circle | Cycling text dots |
| Text Replacement | Icon replaces text | Text replaced entirely |
| Customization | Limited | Highly customizable |
| Accessibility | Standard ARIA | Enhanced with live regions |
| Performance | CSS animations | JavaScript intervals |
| Nostalgia Factor | Modern | High 🎮 |

## Migration Guide

### From Spinner to Terminal

**Before:**
```tsx
<Button isPending={isLoading}>Save</Button>
```

**After:**
```tsx
<Button isPending={isLoading} loadingStyle="terminal">Save</Button>
```

### No Breaking Changes
- All existing `isPending` usage continues to work
- Default behavior remains unchanged
- New props are optional with sensible defaults

## Best Practices

### When to Use Terminal Loading
- ✅ Developer tools and CLI applications
- ✅ Retro/nostalgic themed interfaces  
- ✅ Long-running operations (>3 seconds)
- ✅ When you want a unique, memorable experience

### When to Use Spinner Loading
- ✅ Modern, professional interfaces
- ✅ Quick operations (<3 seconds)
- ✅ When consistency with system UI is important
- ✅ Mobile-first applications

### Customization Tips
- Use shorter `loadingText` for narrow buttons
- Increase `loadingSpeed` for urgent operations
- Reduce `loadingDots` for minimal designs
- Match `loadingText` to the action being performed

## Troubleshooting

### Common Issues

**Animation not visible:**
- Ensure `isPending={true}` is set
- Check that `loadingStyle="terminal"` is specified
- Verify the 1-second delay before animation starts

**Text too long:**
- Use shorter `loadingText` values
- Consider the button width and text length
- Test with different screen sizes

**Animation too fast/slow:**
- Adjust `loadingSpeed` prop (lower = faster)
- Consider user experience and readability
- Test with actual loading times

### Browser Support
- **Modern Browsers**: Full support
- **Internet Explorer**: Not supported (graceful fallback to spinner)
- **Mobile**: Full support with touch interactions

## Contributing

Found a bug or want to contribute? Check out the implementation files:

- `packages/@react-spectrum/button/src/TerminalLoader.tsx`
- `packages/@react-spectrum/button/src/Button.tsx`
- `packages/@react-types/button/src/index.d.ts`

## License

Licensed under the Apache License, Version 2.0. See the main React Spectrum repository for full license details.