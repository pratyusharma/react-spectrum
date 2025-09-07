# @react-spectrum/button

This package is part of [react-spectrum](https://github.com/adobe/react-spectrum). See the repo for more details.

## Features

### Terminal Loading Animation

The Button component now supports a nostalgic terminal-style loading animation with cycling dots. This feature provides an alternative to the default spinner loading state.

```tsx
import {Button} from '@react-spectrum/button';

// Basic terminal loading
<Button isPending={isLoading} loadingStyle="terminal">
  Save File
</Button>

// Customized terminal loading
<Button 
  isPending={isLoading} 
  loadingStyle="terminal"
  loadingText="Processing"
  loadingSpeed={300}
  loadingDots={3}
>
  Process Data
</Button>
```

#### Props

- **`loadingStyle`**: `'spinner' | 'terminal'` - Loading animation style (default: `'spinner'`)
- **`loadingText`**: `string` - Custom loading text (default: `'Loading'`)
- **`loadingSpeed`**: `number` - Animation speed in milliseconds per frame (default: `500`)
- **`loadingDots`**: `number` - Maximum number of dots in the cycle (default: `4`)

#### Accessibility

The terminal loading animation maintains full accessibility support including:
- Screen reader announcements for loading state changes
- `aria-live="polite"` for non-disruptive updates
- Focus management during loading states
- High contrast and reduced motion compatibility
