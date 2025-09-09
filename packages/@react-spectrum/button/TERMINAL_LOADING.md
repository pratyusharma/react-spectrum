# Terminal Loading Animation

A nostalgic terminal-style loading animation for React Spectrum Button components.

## Overview

The terminal loading feature provides an animated cycling dots display that replaces the button text during loading states. Instead of showing a spinner, the button displays text with animated dots (e.g., 'Loading', 'Loading.', 'Loading..', 'Loading...', 'Loading….').

## Quick Start

```tsx
import {Button} from '@react-spectrum/button';

// Basic terminal loading
<Button isPending={isLoading} loadingStyle="terminal">
  Save
</Button>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `loadingStyle` | `'spinner' \| 'terminal'` | `'spinner'` | Controls the loading animation style |
| `loadingText` | `string` | `'Loading'` | Custom text to display during terminal loading |
| `loadingSpeed` | `number` | `500` | Animation speed in milliseconds per frame |
| `loadingDots` | `number` | `4` | Maximum number of dots in the animation cycle |

### Usage Examples

```tsx
// Default terminal animation
<Button isPending={isLoading} loadingStyle="terminal">
  Save Document
</Button>

// Custom loading text
<Button 
  isPending={isLoading} 
  loadingStyle="terminal"
  loadingText="Saving"
>
  Save Document
</Button>

// Faster animation (300ms per frame)
<Button 
  isPending={isLoading} 
  loadingStyle="terminal"
  loadingText="Processing"
  loadingSpeed={300}
>
  Process Data
</Button>

// Custom dot count (max 3 dots)
<Button 
  isPending={isLoading} 
  loadingStyle="terminal"
  loadingText="Syncing"
  loadingDots={3}
>
  Sync Data
</Button>
```

## Features

### ✅ **Core Features**
- Smooth cycling dots animation
- Complete button text replacement during loading
- 1-second delay before showing animation (matches existing behavior)
- Backward compatibility with existing `isPending` functionality

### ✅ **Customization**
- **Base Text**: Customize the loading text (default: 'Loading')
- **Animation Speed**: Control milliseconds per animation frame (default: 500ms)
- **Dot Count**: Set maximum number of dots (default: 4)
- **CSS Integration**: Proper styling with Spectrum CSS design tokens

### ✅ **Accessibility**
- Screen reader announcements for loading state changes
- ARIA live regions for dynamic text updates
- Proper focus management during loading
- Full internationalization support

## Implementation Details

### Animation Cycle
The animation cycles through dot counts from 0 to the maximum:
- Frame 1: "Loading" (0 dots)
- Frame 2: "Loading." (1 dot)
- Frame 3: "Loading.." (2 dots)
- Frame 4: "Loading..." (3 dots)
- Frame 5: "Loading...." (4 dots, if maxDots=4)
- Frame 6: Back to "Loading" (cycle repeats)

### Performance
- Uses `useEffect` with proper cleanup for animation intervals
- Optimized to avoid unnecessary re-renders
- Automatic cleanup on component unmount

### Styling
- Integrates with existing Spectrum CSS design tokens
- Supports light/dark themes automatically
- Maintains responsive behavior
- Proper contrast ratios

## Best Practices

### When to Use Terminal Loading
- Operations that feel "computational" or "processing-heavy"
- Applications with a technical or developer-focused audience
- When you want to add personality to your loading states
- Batch operations or data processing tasks

### When to Use Default Spinner
- Quick actions (under 2-3 seconds)
- Standard business applications
- When visual consistency with other Spectrum components is important
- File uploads or network requests

### Loading Text Guidelines
- Keep text concise and descriptive
- Use present participle verbs ("Saving", "Processing", "Uploading")
- Match your application's voice and tone
- Consider internationalization when choosing text

### Accessibility Considerations
- Test with screen readers to ensure loading text is announced properly
- Ensure loading text is meaningful when read aloud
- Keep animation speed reasonable for users with motion sensitivities
- Provide clear indication when loading is complete

## Browser Support

Works in all modern browsers that support:
- ES6+ features (React 16+)
- CSS custom properties
- `useEffect` and `useState` hooks

## Migration

### From Existing Buttons
No breaking changes - existing buttons continue to work exactly as before. To add terminal loading:

```tsx
// Before
<Button isPending={isLoading}>Save</Button>

// After - adds terminal loading
<Button isPending={isLoading} loadingStyle="terminal">Save</Button>
```

### Customization Migration
```tsx
// Basic terminal loading
<Button isPending={isLoading} loadingStyle="terminal">Save</Button>

// Add custom text
<Button 
  isPending={isLoading} 
  loadingStyle="terminal"
  loadingText="Saving"
>
  Save
</Button>

// Full customization
<Button 
  isPending={isLoading} 
  loadingStyle="terminal"
  loadingText="Processing"
  loadingSpeed={300}
  loadingDots={3}
>
  Process
</Button>
```

## Technical Architecture

### Components
- **TerminalLoader**: Core animation component with cycling dots logic
- **Button**: Enhanced with terminal loading integration
- **Type Definitions**: Extended props interface in `@react-types/button`

### Files Modified
- `packages/@react-spectrum/button/src/Button.tsx` - Integration logic
- `packages/@react-spectrum/button/src/TerminalLoader.tsx` - Animation component
- `packages/@react-types/button/src/index.d.ts` - Type definitions

### Testing
- Comprehensive unit tests for animation cycles
- Integration tests with Button component
- Accessibility testing for screen reader support
- Performance testing for animation cleanup

## Support

For issues, questions, or feature requests related to terminal loading:
1. Check existing tests in `packages/@react-spectrum/button/test/`
2. Review the implementation in `packages/@react-spectrum/button/src/`
3. Refer to the main Button documentation for general usage patterns

---

**🎉 Ready to add some terminal nostalgia to your React Spectrum buttons!**