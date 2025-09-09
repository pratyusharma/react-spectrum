# @react-spectrum/button

This package is part of [react-spectrum](https://github.com/adobe/react-spectrum). See the repo for more details.

## Features

- **Multiple Button Variants**: Accent, Primary, Secondary, Negative styles
- **Loading States**: Default spinner and terminal-style animations
- **Accessibility**: Full ARIA support and keyboard navigation
- **Internationalization**: RTL support and customizable text
- **Icons**: Support for icon-only and icon+text combinations

### Terminal Loading Animation

The Button component now supports a nostalgic terminal-style loading animation that cycles through dots (e.g., 'Loading', 'Loading.', 'Loading..', 'Loading...'). This provides a retro aesthetic reminiscent of command-line interfaces.

```tsx
<Button 
  isPending={isLoading} 
  loadingStyle="terminal"
  loadingText="Processing"
>
  Save File
</Button>
```

See [TerminalLoading.md](./docs/TerminalLoading.md) for complete documentation and examples.
