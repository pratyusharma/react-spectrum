# @react-spectrum/button

This package is part of [react-spectrum](https://github.com/adobe/react-spectrum). See the repo for more details.

## Features

- **Accessible button component** with full keyboard and screen reader support
- **Multiple variants** (accent, primary, secondary, negative) and styles (fill, outline)
- **Loading states** with both spinner and terminal-style animations
- **Icon support** with flexible content composition
- **Static color variants** for use on colored backgrounds

## Terminal Loading Animation 🎮

New in this version! Experience nostalgic terminal-style loading with cycling dots:

```tsx
import {Button} from '@react-spectrum/button';

// Basic terminal loading
<Button isPending={isLoading} loadingStyle="terminal">
  Save Document
</Button>

// Fully customized
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

Animation cycles: "Loading" → "Loading." → "Loading.." → "Loading..." → "Loading...." → repeat

### Quick Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `loadingStyle` | `'spinner' \| 'terminal'` | `'spinner'` | Loading animation type |
| `loadingText` | `string` | `'Loading'` | Text for terminal animation |
| `loadingSpeed` | `number` | `500` | Speed in ms per frame |
| `loadingDots` | `number` | `4` | Max dots in cycle |

See [TerminalLoading.md](./docs/TerminalLoading.md) for complete documentation.
