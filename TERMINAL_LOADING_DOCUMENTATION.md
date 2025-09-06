# Terminal-Style Loading Animation Documentation

## Overview

The Terminal-Style Loading Animation is a nostalgic loading feature for React Spectrum's Button component that replaces the traditional spinner with animated cycling dots, reminiscent of classic terminal interfaces. When activated, it displays text like 'Loading', 'Loading.', 'Loading..', 'Loading...', creating a smooth, retro-style loading experience.

## Features

### ✨ **Core Capabilities**
- **Text-Based Animation**: Replaces button text entirely with animated loading text
- **Cycling Dots**: Smooth progression of dots (0 → 1 → 2 → 3 → 4 → 0...)
- **Customizable Content**: Full control over loading text, speed, and dot count
- **Accessibility First**: Built-in screen reader support and ARIA compliance
- **Backward Compatible**: Maintains all existing Button functionality

### 🎯 **Visual Behavior**
- **1-Second Delay**: Follows existing Button loading pattern
- **Smooth Transitions**: Seamless animation cycles
- **Theme Integration**: Works with all Spectrum themes (light/dark)
- **Responsive Design**: Adapts to different button sizes and layouts

## API Reference

### Button Props

The terminal loading feature extends the existing Button component with new optional props:

```typescript
interface SpectrumButtonProps {
  // Existing props...
  isPending?: boolean;
  
  // New terminal loading props
  loadingStyle?: 'spinner' | 'terminal';  // default: 'spinner'
  loadingText?: string;                    // default: 'Loading'
  loadingSpeed?: number;                   // milliseconds per frame, default: 500
  loadingDots?: number;                    // maximum dots, default: 4
}
```

#### `loadingStyle`
- **Type**: `'spinner' | 'terminal'`
- **Default**: `'spinner'`
- **Description**: Determines the loading animation type. When set to `'terminal'`, activates the terminal-style loading animation instead of the default spinner.

#### `loadingText`
- **Type**: `string`
- **Default**: `'Loading'`
- **Description**: The base text displayed during loading. Dots will be appended to this text during animation.
- **Examples**: `'Loading'`, `'Saving'`, `'Processing'`, `'Uploading'`

#### `loadingSpeed`
- **Type**: `number`
- **Default**: `500`
- **Description**: Animation speed in milliseconds per frame. Lower values create faster animations.
- **Range**: Recommended 200-1000ms for optimal user experience

#### `loadingDots`
- **Type**: `number`
- **Default**: `4`
- **Description**: Maximum number of dots in the animation cycle (0 to this number).
- **Range**: Typically 3-6 dots work best for visual appeal

## Usage Examples

### Basic Usage

```tsx
import {Button} from '@react-spectrum/button';

// Default spinner loading (existing behavior)
<Button isPending={isLoading}>
  Save Changes
</Button>

// Terminal loading with default settings
<Button 
  isPending={isLoading} 
  loadingStyle="terminal"
>
  Save Changes
</Button>
```

### Custom Loading Text

```tsx
// Custom loading messages
<Button 
  isPending={isSubmitting} 
  loadingStyle="terminal"
  loadingText="Saving"
>
  Save Document
</Button>

<Button 
  isPending={isUploading} 
  loadingStyle="terminal"
  loadingText="Uploading"
>
  Upload File
</Button>

<Button 
  isPending={isProcessing} 
  loadingStyle="terminal"
  loadingText="Processing"
>
  Process Data
</Button>
```

### Advanced Customization

```tsx
// Fast animation with fewer dots
<Button 
  isPending={isLoading} 
  loadingStyle="terminal"
  loadingText="Quick Save"
  loadingSpeed={300}
  loadingDots={3}
>
  Quick Save
</Button>

// Slow, detailed animation
<Button 
  isPending={isLoading} 
  loadingStyle="terminal"
  loadingText="Deep Analysis"
  loadingSpeed={800}
  loadingDots={6}
>
  Analyze Data
</Button>
```

### Real-World Examples

```tsx
// Form submission
const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async () => {
  setIsSubmitting(true);
  try {
    await submitForm();
  } finally {
    setIsSubmitting(false);
  }
};

<Button 
  isPending={isSubmitting}
  loadingStyle="terminal"
  loadingText="Submitting"
  onPress={handleSubmit}
>
  Submit Form
</Button>

// File operations
<Button 
  isPending={isDeleting}
  loadingStyle="terminal"
  loadingText="Deleting"
  variant="negative"
>
  Delete File
</Button>

// API calls
<Button 
  isPending={isFetching}
  loadingStyle="terminal"
  loadingText="Fetching"
  variant="primary"
>
  Load Data
</Button>
```

## Animation Behavior

### Timing Sequence

1. **Initial State**: Button displays normal text
2. **Loading Triggered**: `isPending` becomes `true`
3. **1-Second Delay**: Maintains existing Button behavior
4. **Animation Start**: Text replacement begins
5. **Cycling Animation**: Dots cycle continuously
6. **Loading Complete**: `isPending` becomes `false`, returns to normal

### Animation Cycle

With default settings (`loadingText="Loading"`, `loadingDots=4`, `loadingSpeed=500`):

```
Frame 1 (0ms):   "Loading"
Frame 2 (500ms): "Loading."
Frame 3 (1000ms):"Loading.."
Frame 4 (1500ms):"Loading..."
Frame 5 (2000ms):"Loading...."
Frame 6 (2500ms):"Loading"     // Cycle repeats
```

## Accessibility Features

### Screen Reader Support

- **ARIA Live Regions**: Uses `aria-live="polite"` for non-intrusive announcements
- **Role Attribution**: Proper `role="status"` for loading indicators
- **Label Management**: Maintains button accessibility during loading states

### Keyboard Navigation

- **Focus Retention**: Button remains focusable during loading
- **Interaction Blocking**: Prevents accidental activation while loading
- **State Communication**: Clear indication of loading state to assistive technologies

### Implementation Details

```tsx
// Accessibility attributes automatically applied
<span 
  role="status"
  aria-live="polite"
  aria-label="Loading in progress"
>
  Loading...
</span>
```

## Styling and Theming

### CSS Integration

The terminal loading feature integrates seamlessly with Spectrum CSS:

```css
.spectrum-Button--terminal-loading {
  /* Inherits all standard Button styles */
  font-family: var(--spectrum-font-family-base);
  font-size: var(--spectrum-button-font-size);
  color: var(--spectrum-button-text-color);
}

.spectrum-Button--terminal-loading .terminal-text {
  /* Ensures proper text alignment */
  display: inline-block;
  min-width: var(--spectrum-button-min-width);
}
```

### Theme Compatibility

- **Light Theme**: Standard text colors and contrast ratios
- **Dark Theme**: Automatically adapts to dark theme colors
- **High Contrast**: Maintains accessibility standards
- **Custom Themes**: Inherits theme-specific styling

## Performance Considerations

### Optimization Features

- **Efficient Animations**: Uses `setInterval` with proper cleanup
- **Memory Management**: Automatic cleanup on component unmount
- **Re-render Optimization**: Minimal re-renders during animation
- **Resource Cleanup**: Proper disposal of timers and event listeners

### Best Practices

```tsx
// ✅ Good: Proper cleanup handled automatically
const MyComponent = () => {
  const [isPending, setIsPending] = useState(false);
  
  return (
    <Button 
      isPending={isPending}
      loadingStyle="terminal"
    >
      Action
    </Button>
  );
};

// ✅ Good: Reasonable animation speeds
<Button 
  loadingStyle="terminal"
  loadingSpeed={500} // Good balance of visibility and performance
>
  Submit
</Button>

// ⚠️ Caution: Very fast animations may cause accessibility issues
<Button 
  loadingStyle="terminal"
  loadingSpeed={100} // Too fast for some users
>
  Submit
</Button>
```

## Internationalization (i18n)

### Localization Support

The terminal loading feature is designed for global applications:

```tsx
// English
<Button loadingText="Loading">Save</Button>

// Spanish
<Button loadingText="Cargando">Guardar</Button>

// French
<Button loadingText="Chargement">Sauvegarder</Button>

// German
<Button loadingText="Laden">Speichern</Button>

// Japanese
<Button loadingText="読み込み中">保存</Button>
```

### RTL (Right-to-Left) Support

- **Automatic Adaptation**: Works with RTL languages
- **Text Direction**: Proper text alignment in RTL contexts
- **Animation Behavior**: Consistent animation regardless of text direction

## Migration Guide

### From Existing Buttons

No breaking changes - the feature is entirely additive:

```tsx
// Before: Default spinner loading
<Button isPending={isLoading}>
  Save
</Button>

// After: Terminal loading (optional)
<Button 
  isPending={isLoading}
  loadingStyle="terminal"  // Only new prop needed
>
  Save
</Button>
```

### Gradual Adoption

```tsx
// Phase 1: Keep existing behavior
<Button isPending={isLoading}>Action</Button>

// Phase 2: Add terminal loading selectively
<Button isPending={isLoading} loadingStyle="terminal">Action</Button>

// Phase 3: Customize as needed
<Button 
  isPending={isLoading} 
  loadingStyle="terminal"
  loadingText="Custom Text"
>
  Action
</Button>
```

## Testing Strategies

### Unit Testing

```tsx
import {render, screen} from '@testing-library/react';
import {Button} from '@react-spectrum/button';

test('terminal loading displays animated text', async () => {
  render(
    <Button isPending loadingStyle="terminal" loadingText="Testing">
      Test Button
    </Button>
  );
  
  // Wait for 1-second delay
  await waitFor(() => {
    expect(screen.getByText(/Testing/)).toBeInTheDocument();
  }, { timeout: 1500 });
});

test('animation cycles through dot counts', async () => {
  render(
    <Button isPending loadingStyle="terminal" loadingSpeed={100}>
      Test
    </Button>
  );
  
  await waitFor(() => {
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });
  
  await waitFor(() => {
    expect(screen.getByText('Loading.')).toBeInTheDocument();
  });
});
```

### Integration Testing

```tsx
test('terminal loading maintains accessibility', () => {
  render(
    <Button isPending loadingStyle="terminal">
      Accessible Button
    </Button>
  );
  
  const button = screen.getByRole('button');
  expect(button).toHaveAttribute('aria-disabled', 'true');
  
  const status = screen.getByRole('status');
  expect(status).toHaveAttribute('aria-live', 'polite');
});
```

## Troubleshooting

### Common Issues

#### Animation Not Visible
```tsx
// ❌ Problem: Missing loadingStyle prop
<Button isPending>Action</Button>

// ✅ Solution: Add loadingStyle
<Button isPending loadingStyle="terminal">Action</Button>
```

#### Animation Too Fast/Slow
```tsx
// ❌ Problem: Default speed not suitable
<Button isPending loadingStyle="terminal">Action</Button>

// ✅ Solution: Adjust speed
<Button isPending loadingStyle="terminal" loadingSpeed={300}>Action</Button>
```

#### Accessibility Warnings
```tsx
// ❌ Problem: Missing semantic information
<Button isPending loadingStyle="terminal">Action</Button>

// ✅ Solution: Provide clear loading context
<Button 
  isPending 
  loadingStyle="terminal"
  loadingText="Saving document"
  aria-label="Save document, currently saving"
>
  Save
</Button>
```

### Performance Issues

#### Memory Leaks
- **Automatic Cleanup**: Component handles timer cleanup automatically
- **Proper Unmounting**: No manual intervention required
- **State Management**: Built-in state cleanup on prop changes

#### Animation Stuttering
- **Reasonable Speeds**: Use 300-800ms for smooth animations
- **Browser Compatibility**: Tested across modern browsers
- **Performance Monitoring**: Built-in optimization for smooth rendering

## Browser Support

### Compatibility Matrix

| Browser | Version | Support Level |
|---------|---------|---------------|
| Chrome | 90+ | Full Support |
| Firefox | 88+ | Full Support |
| Safari | 14+ | Full Support |
| Edge | 90+ | Full Support |
| Mobile Safari | 14+ | Full Support |
| Chrome Mobile | 90+ | Full Support |

### Fallback Behavior

- **Older Browsers**: Graceful degradation to spinner loading
- **Reduced Motion**: Respects `prefers-reduced-motion` settings
- **Screen Readers**: Full compatibility with assistive technologies

## Future Enhancements

### Planned Features

1. **Animation Presets**: Pre-configured animation styles
2. **Custom Characters**: Beyond dots (e.g., |/-\\ spinner)
3. **Progress Integration**: Combine with actual progress percentages
4. **Sound Support**: Optional audio feedback for accessibility
5. **Advanced Patterns**: More complex animation sequences

### Extensibility

The terminal loading system is designed for future expansion:

```tsx
// Future: Custom animation patterns
<Button 
  isPending
  loadingStyle="terminal"
  loadingPattern={['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']}
>
  Advanced Loading
</Button>

// Future: Progress-aware animations
<Button 
  isPending
  loadingStyle="terminal"
  loadingProgress={0.6} // 60% complete
>
  Upload (60%)
</Button>
```

## Conclusion

The Terminal-Style Loading Animation brings a touch of nostalgia to modern web applications while maintaining React Spectrum's high standards for accessibility, performance, and user experience. Its flexible API allows for extensive customization while remaining simple to implement and maintain.

Whether you're building a retro-themed application or simply want to add some character to your loading states, the terminal loading feature provides a delightful alternative to traditional spinners while preserving all the robustness and accessibility features users expect from React Spectrum components.

---

*This documentation covers the complete terminal loading feature implementation. For additional support or feature requests, please refer to the React Spectrum documentation or submit an issue to the project repository.*