# Terminal Loading Animation

A nostalgic terminal-style loading animation for React Spectrum buttons that replaces the default spinner with cycling dots (e.g., 'Loading', 'Loading.', 'Loading..', 'Loading...').

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
        // Your async operation here
      }}
    >
      Save File
    </Button>
  );
}
```

## Features

- ✅ **Nostalgic Feel**: Terminal-style cycling dots animation
- ✅ **Fully Customizable**: Custom text, speed, and dot count
- ✅ **Accessible**: Screen reader support with ARIA live regions
- ✅ **Backward Compatible**: Works alongside existing `isPending` prop
- ✅ **Theme Support**: Integrates with Spectrum CSS design tokens

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `loadingStyle` | `'spinner' \| 'terminal'` | `'spinner'` | Loading animation style |
| `loadingText` | `string` | `'Loading'` | Text to display during loading |
| `loadingSpeed` | `number` | `500` | Animation speed in milliseconds per frame |
| `loadingDots` | `number` | `4` | Maximum number of dots to cycle through |

### Usage Examples

#### Basic Terminal Loading
```tsx
<Button isPending={isLoading} loadingStyle="terminal">
  Save
</Button>
```

#### Custom Text and Speed
```tsx
<Button 
  isPending={isLoading} 
  loadingStyle="terminal"
  loadingText="Processing"
  loadingSpeed={300}
>
  Process Data
</Button>
```

#### Full Customization
```tsx
<Button 
  isPending={isLoading} 
  loadingStyle="terminal"
  loadingText="Compiling"
  loadingSpeed={600}
  loadingDots={3}
>
  Build Project
</Button>
```

## Animation Behavior

The terminal loading animation cycles through dots:
1. "Loading" (0 dots)
2. "Loading." (1 dot)  
3. "Loading.." (2 dots)
4. "Loading..." (3 dots)
5. "Loading...." (4 dots, default max)
6. Back to "Loading" (cycle repeats)

## Accessibility

The terminal loading animation maintains full accessibility:

- **Screen Reader Support**: Uses `aria-live="polite"` for text changes
- **Focus Management**: Button remains focusable but disabled during loading
- **ARIA Labels**: Proper `role="status"` and ARIA labeling
- **Announcements**: Loading start/end announced to screen readers

## Implementation Details

### Components
- **TerminalLoader**: Core animation component with cycling dots
- **Button**: Enhanced with terminal loading integration
- **CSS**: Spectrum design token integration for theming

### Files
- `packages/@react-spectrum/button/src/TerminalLoader.tsx` - Animation component
- `packages/@react-spectrum/button/src/Button.tsx` - Enhanced button with terminal loading
- `packages/@react-types/button/src/index.d.ts` - TypeScript definitions

### Testing
- ✅ Unit tests for TerminalLoader animation cycles
- ✅ Integration tests for Button with terminal loading
- ✅ Accessibility testing with screen readers
- ✅ Backward compatibility verification

## Migration

This feature is **fully backward compatible**. Existing buttons with `isPending` will continue to work unchanged with the default spinner animation.

To adopt terminal loading:
```tsx
// Before (still works)
<Button isPending={isLoading}>Save</Button>

// After (new terminal style)
<Button isPending={isLoading} loadingStyle="terminal">Save</Button>
```

## Browser Support

Works in all modern browsers that support:
- ES2015+ JavaScript features
- CSS custom properties
- React 16.8+ (hooks)

## Performance

- **Minimal Bundle Impact**: ~1KB additional JavaScript
- **Optimized Animations**: Uses `setInterval` with proper cleanup
- **No Layout Thrashing**: Text-based animation, no DOM manipulation
- **Memory Efficient**: Proper cleanup on component unmount