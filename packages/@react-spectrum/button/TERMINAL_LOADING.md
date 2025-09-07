# Terminal Loading Animation

## Overview

The React Spectrum Button component now supports a nostalgic terminal-style loading animation with cycling dots (e.g., 'Loading', 'Loading.', 'Loading..', 'Loading...', 'Loading….').

This feature provides an alternative to the default spinner loading state, perfect for applications that want to evoke a retro computing aesthetic or provide a unique user experience.

## Basic Usage

### Default Terminal Loading

```tsx
import {Button} from '@react-spectrum/button';

function SaveButton() {
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <Button 
      isPending={isLoading} 
      loadingStyle="terminal"
      onPress={() => {
        setIsLoading(true);
        // Simulate async operation
        setTimeout(() => setIsLoading(false), 3000);
      }}
    >
      Save File
    </Button>
  );
}
```

### Custom Loading Text

```tsx
<Button 
  isPending={isLoading} 
  loadingStyle="terminal"
  loadingText="Uploading"
>
  Upload Photos
</Button>
```

## Advanced Configuration

### Animation Speed Control

Control how fast the dots cycle by adjusting the `loadingSpeed` prop (milliseconds per frame):

```tsx
// Fast animation (200ms per frame)
<Button 
  isPending={isLoading} 
  loadingStyle="terminal"
  loadingSpeed={200}
>
  Quick Action
</Button>

// Slow animation (1000ms per frame)  
<Button 
  isPending={isLoading} 
  loadingStyle="terminal"
  loadingSpeed={1000}
>
  Slow Process
</Button>
```

### Dot Count Customization

Adjust the maximum number of dots in the animation cycle:

```tsx
// Minimal dots (max 2)
<Button 
  isPending={isLoading} 
  loadingStyle="terminal"
  loadingDots={2}
>
  Simple Task
</Button>

// More dots (max 6)
<Button 
  isPending={isLoading} 
  loadingStyle="terminal"
  loadingDots={6}
>
  Complex Process
</Button>
```

### Full Customization

```tsx
<Button 
  isPending={isLoading} 
  loadingStyle="terminal"
  loadingText="Processing data"
  loadingSpeed={400}
  loadingDots={5}
>
  Analyze Dataset
</Button>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `loadingStyle` | `'spinner' \| 'terminal'` | `'spinner'` | Loading animation style |
| `loadingText` | `string` | `'Loading'` | Text displayed during terminal loading |
| `loadingSpeed` | `number` | `500` | Animation speed in milliseconds per frame |
| `loadingDots` | `number` | `4` | Maximum number of dots in the cycle |

### Animation Cycle

The terminal loading animation cycles through the following states:
1. `Loading` (base text, no dots)
2. `Loading.` (base text + 1 dot)
3. `Loading..` (base text + 2 dots)
4. `Loading...` (base text + 3 dots)
5. `Loading....` (base text + 4 dots, or custom max)
6. Back to step 1

## Accessibility

### Screen Reader Support

The terminal loading animation provides comprehensive accessibility features:

- **Loading State Announcements**: Screen readers announce when loading starts and stops
- **Live Updates**: Uses `aria-live="polite"` for non-disruptive text updates
- **Status Role**: Loading text has `role="status"` for proper semantic meaning
- **Focus Management**: Button remains focusable during loading state

### High Contrast Mode

The terminal loading animation respects system high contrast preferences and maintains proper color contrast ratios through Spectrum CSS design tokens.

### Reduced Motion

The animation automatically respects the user's `prefers-reduced-motion` setting through CSS media queries.

## Use Cases

### Perfect For

- **Developer Tools**: IDEs, code editors, terminal applications
- **Data Processing**: Analytics dashboards, batch operations
- **File Operations**: Upload/download interfaces, file managers  
- **Retro Aesthetics**: Applications with vintage computing themes
- **Gaming UI**: Retro-style games, console interfaces

### Consider Alternatives For

- **Modern Corporate**: Use default spinner for professional business applications
- **Mobile First**: Spinner may be more familiar on mobile devices
- **Quick Actions**: Very short operations (< 1 second) may not benefit from text animation

## Migration Guide

### From Existing Buttons

No breaking changes! The terminal loading feature is fully backward compatible:

```tsx
// Existing code continues to work unchanged
<Button isPending={isLoading}>Save</Button>

// Add terminal loading with one prop
<Button isPending={isLoading} loadingStyle="terminal">Save</Button>
```

### From Custom Loading Solutions

If you have custom loading text implementations:

```tsx
// Before: Custom loading text
<Button isPending={isLoading}>
  {isLoading ? 'Saving...' : 'Save'}
</Button>

// After: Built-in terminal loading
<Button 
  isPending={isLoading} 
  loadingStyle="terminal"
  loadingText="Saving"
>
  Save
</Button>
```

## Examples

### Common Patterns

```tsx
// File operations
<Button loadingStyle="terminal" loadingText="Uploading">Upload</Button>
<Button loadingStyle="terminal" loadingText="Downloading">Download</Button>
<Button loadingStyle="terminal" loadingText="Saving">Save</Button>

// Data operations  
<Button loadingStyle="terminal" loadingText="Processing">Analyze</Button>
<Button loadingStyle="terminal" loadingText="Computing">Calculate</Button>
<Button loadingStyle="terminal" loadingText="Generating">Export</Button>

// Network operations
<Button loadingStyle="terminal" loadingText="Connecting">Connect</Button>
<Button loadingStyle="terminal" loadingText="Syncing">Sync</Button>
<Button loadingStyle="terminal" loadingText="Fetching">Refresh</Button>
```

### Interactive Demo

```tsx
function TerminalLoadingDemo() {
  const [activeButton, setActiveButton] = useState(null);
  
  const startLoading = (buttonId) => {
    setActiveButton(buttonId);
    setTimeout(() => setActiveButton(null), 4000);
  };
  
  return (
    <div>
      <h3>Terminal Loading Styles</h3>
      
      <Button 
        variant="primary"
        isPending={activeButton === 'default'}
        loadingStyle="terminal"
        onPress={() => startLoading('default')}
      >
        Default Terminal
      </Button>
      
      <Button 
        variant="accent"
        isPending={activeButton === 'fast'}
        loadingStyle="terminal"
        loadingText="Processing"
        loadingSpeed={250}
        onPress={() => startLoading('fast')}
      >
        Fast Animation
      </Button>
      
      <Button 
        variant="secondary"
        isPending={activeButton === 'custom'}
        loadingStyle="terminal"
        loadingText="Computing"
        loadingDots={6}
        loadingSpeed={300}
        onPress={() => startLoading('custom')}
      >
        Custom Dots
      </Button>
    </div>
  );
}
```

## Technical Details

### Implementation

The terminal loading feature is implemented using:
- **TerminalLoader Component**: Handles the cycling animation logic
- **useEffect Hook**: Manages the interval-based animation
- **Spectrum CSS**: Provides consistent styling and theming
- **ARIA Attributes**: Ensures accessibility compliance

### Performance

- **Lightweight**: Minimal performance impact with efficient interval management
- **Memory Safe**: Proper cleanup prevents memory leaks
- **Optimized Rendering**: Only re-renders when dot count changes

### Browser Support

The terminal loading animation works in all browsers supported by React Spectrum, with graceful degradation for older browsers.

## Troubleshooting

### Common Issues

**Animation not starting**: Ensure `isPending={true}` and `loadingStyle="terminal"` are both set.

**Text not updating**: Check that `loadingText` prop is being passed correctly.

**Animation too fast/slow**: Adjust the `loadingSpeed` prop (higher values = slower animation).

**Wrong number of dots**: Set the `loadingDots` prop to your desired maximum.

### Debug Tips

```tsx
// Add console logging to debug loading states
<Button 
  isPending={isLoading} 
  loadingStyle="terminal"
  onPress={() => {
    console.log('Starting loading...');
    setIsLoading(true);
  }}
>
  Debug Button
</Button>
```

## Feedback

We'd love to hear how you're using the terminal loading feature! Share your implementations and feedback with the React Spectrum team.