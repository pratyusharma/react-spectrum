# Terminal Loading Animation API Reference

## Button Props

### `loadingAnimation`

Controls the type of loading animation displayed when `isPending` is true.

**Type**: `'spinner' | 'terminal'`  
**Default**: `'terminal'`  
**Required**: No

```tsx
interface ButtonLoadingProps {
  /** Type of loading animation to display when isPending is true */
  loadingAnimation?: 'spinner' | 'terminal';
}
```

#### Usage

```tsx
// Terminal animation (default)
<Button isPending={true} loadingAnimation="terminal">Submit</Button>

// Spinner animation
<Button isPending={true} loadingAnimation="spinner">Submit</Button>

// Implicit terminal animation (default behavior)
<Button isPending={true}>Submit</Button>
```

#### Component Support

This prop is available on all Button variants:

| Component | Package | Support |
|-----------|---------|---------|
| `Button` | `@react-spectrum/button` | ✅ |
| `Button` | `@react-spectrum/s2` | ✅ |
| `Button` | `react-aria-components` | ✅ |

### Extended Type Definitions

The `loadingAnimation` prop extends the existing Button prop interfaces:

```tsx
// @react-spectrum/button
interface SpectrumButtonProps extends ButtonLoadingProps {
  variant: 'accent' | 'primary' | 'secondary' | 'negative';
  style?: 'fill' | 'outline';
  isPending?: boolean;
  // ... other existing props
}

// @react-spectrum/s2  
interface ButtonStyleProps extends ButtonLoadingProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'negative' | 'premium' | 'genai';
  fillStyle?: 'fill' | 'outline';
  size?: 'S' | 'M' | 'L' | 'XL';
  isPending?: boolean;
  // ... other existing props
}

// react-aria-components
interface ButtonProps extends ButtonLoadingProps {
  isPending?: boolean;
  // ... other existing props
}
```

## TerminalAnimation Component

Internal utility component that powers the terminal loading animation.

```tsx
interface TerminalAnimationProps {
  /** Whether the animation should be visible and actively running */
  isVisible: boolean;
  
  /** Accessible label for screen readers */
  ariaLabel?: string;
  
  /** Additional CSS class names to apply */
  className?: string;
  
  /** Custom animation timing in milliseconds */
  interval?: number;
}
```

### Props Details

#### `isVisible`
- **Type**: `boolean`
- **Required**: Yes
- **Description**: Controls whether the animation is visible and running. When `false`, the animation stops and the element is hidden.

```tsx
<TerminalAnimation isVisible={isPending} />
```

#### `ariaLabel`
- **Type**: `string`
- **Default**: `"Loading, please wait"`
- **Description**: Provides accessible text for screen readers. Should describe the loading state in user-friendly language.

```tsx
<TerminalAnimation 
  isVisible={true}
  ariaLabel="Processing your request, please wait"
/>
```

#### `className`
- **Type**: `string`
- **Description**: Additional CSS classes to apply to the animation container for custom styling.

```tsx
<TerminalAnimation 
  isVisible={true}
  className="my-custom-terminal-style"
/>
```

#### `interval`
- **Type**: `number`
- **Default**: `500`
- **Description**: Animation timing interval in milliseconds. Controls how fast the dots cycle.

```tsx
<TerminalAnimation 
  isVisible={true}
  interval={300} // Faster animation
/>
```

### Animation States

The component cycles through these text states:

```tsx
type AnimationState = 
  | ''           // Empty (brief pause)
  | '.'          // One dot
  | '..'         // Two dots  
  | '...'        // Three dots
  | '….'         // Ellipsis + dot
```

### Internal Implementation

```tsx
function TerminalAnimation({ 
  isVisible, 
  ariaLabel = "Loading, please wait",
  className,
  interval = 500 
}: TerminalAnimationProps) {
  const [dots, setDots] = useState('');
  
  useEffect(() => {
    if (!isVisible) return;
    
    const states = ['', '.', '..', '...', '….'];
    let currentIndex = 0;
    
    const timer = setInterval(() => {
      currentIndex = (currentIndex + 1) % states.length;
      setDots(states[currentIndex]);
    }, interval);
    
    return () => clearInterval(timer);
  }, [isVisible, interval]);
  
  if (!isVisible) return null;
  
  return (
    <span 
      role="img"
      aria-label={ariaLabel}
      className={className}
      data-terminal-animation
    >
      Loading{dots}
    </span>
  );
}
```

## TypeScript Integration

### Type Imports

```tsx
import type { 
  SpectrumButtonProps,
  ButtonLoadingProps 
} from '@react-types/button';

import type { 
  TerminalAnimationProps 
} from '@react-spectrum/utils';
```

### Custom Button Components

When creating custom button components that support terminal loading:

```tsx
interface CustomButtonProps extends ButtonLoadingProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  onPress?: () => void;
}

function CustomButton({ 
  loadingAnimation = 'terminal',
  isPending,
  children,
  ...props 
}: CustomButtonProps) {
  return (
    <Button 
      {...props}
      isPending={isPending}
      loadingAnimation={loadingAnimation}
    >
      {children}
    </Button>
  );
}
```

### Generic Button Wrapper

```tsx
interface LoadingButtonProps<T extends ElementType = 'button'> 
  extends SpectrumButtonProps<T> {
  loadingText?: string;
  successText?: string;
  errorText?: string;
}

function LoadingButton<T extends ElementType = 'button'>({
  loadingText = "Loading...",
  successText,
  errorText,
  children,
  isPending,
  loadingAnimation = 'terminal',
  ...props
}: LoadingButtonProps<T>) {
  return (
    <Button
      {...props}
      isPending={isPending}
      loadingAnimation={loadingAnimation}
    >
      {isPending ? loadingText : children}
    </Button>
  );
}
```

## CSS Custom Properties

The terminal animation supports customization via CSS custom properties:

```css
[data-terminal-animation] {
  /* Animation timing */
  --terminal-animation-duration: 500ms;
  
  /* Text styling */
  --terminal-animation-color: currentColor;
  --terminal-animation-font-family: inherit;
  --terminal-animation-font-weight: inherit;
  
  /* Spacing */
  --terminal-animation-margin: 0;
  --terminal-animation-padding: 0;
}
```

### Custom Styling Example

```css
/* Retro terminal style */
.retro-terminal [data-terminal-animation] {
  --terminal-animation-color: #00ff00;
  --terminal-animation-font-family: 'Courier New', monospace;
  --terminal-animation-font-weight: bold;
  font-size: 0.9em;
  text-shadow: 0 0 5px currentColor;
}

/* Fast animation */
.fast-loading [data-terminal-animation] {
  --terminal-animation-duration: 200ms;
}

/* Slow animation */
.slow-loading [data-terminal-animation] {
  --terminal-animation-duration: 800ms;
}
```

## Accessibility Attributes

The terminal animation automatically includes appropriate accessibility attributes:

```html
<!-- Rendered HTML structure -->
<span 
  role="img"
  aria-label="Loading, please wait"
  data-terminal-animation
>
  Loading...
</span>
```

### ARIA Live Region Integration

When used within Button components, the animation integrates with existing ARIA live regions:

```html
<!-- Button with terminal animation -->
<button aria-describedby="loading-status">
  Submit
  <span role="img" aria-label="Loading, please wait">Loading...</span>
</button>

<div id="loading-status" aria-live="polite" aria-atomic="true">
  Loading, please wait
</div>
```

### Screen Reader Announcements

The animation triggers appropriate screen reader announcements:

- **Start Loading**: "Loading, please wait"
- **Still Loading**: No repeated announcements (prevents spam)
- **Stop Loading**: "Loading complete" or button text change

## Event Handling

### Animation Lifecycle Events

While not directly exposed, the animation lifecycle can be tracked:

```tsx
function ButtonWithLifecycle() {
  const [isPending, setIsPending] = useState(false);
  
  const handleAnimationStart = useCallback(() => {
    console.log('Terminal animation started');
  }, []);
  
  const handleAnimationEnd = useCallback(() => {
    console.log('Terminal animation ended');
  }, []);
  
  useEffect(() => {
    if (isPending) {
      handleAnimationStart();
    } else {
      handleAnimationEnd();
    }
  }, [isPending, handleAnimationStart, handleAnimationEnd]);
  
  return (
    <Button 
      isPending={isPending}
      loadingAnimation="terminal"
      onPress={() => setIsPending(true)}
    >
      Submit
    </Button>
  );
}
```

## Performance Considerations

### Optimization Props

```tsx
// Memoized button to prevent unnecessary re-renders
const OptimizedButton = memo(function OptimizedButton({ 
  isPending, 
  children, 
  ...props 
}) {
  return (
    <Button 
      {...props}
      isPending={isPending}
      loadingAnimation="terminal"
    >
      {children}
    </Button>
  );
});

// Stable callback references
function MyComponent() {
  const handlePress = useCallback(async () => {
    // Async operation
  }, []);
  
  return (
    <OptimizedButton onPress={handlePress}>
      Submit
    </OptimizedButton>
  );
}
```

### Bundle Impact

| Component | Size Impact | Description |
|-----------|-------------|-------------|
| `TerminalAnimation` | ~1.2KB | Core animation logic |
| Button Integration | ~0.8KB | Props handling and rendering |
| **Total** | **~2KB** | Gzipped additional bundle size |

## Browser Compatibility

### Feature Detection

```tsx
// Check for animation support
function hasAnimationSupport() {
  return typeof window !== 'undefined' && 
         'requestAnimationFrame' in window;
}

// Graceful degradation
function AdaptiveButton(props) {
  const loadingAnimation = hasAnimationSupport() 
    ? 'terminal' 
    : 'spinner';
    
  return (
    <Button 
      {...props}
      loadingAnimation={loadingAnimation}
    />
  );
}
```

### Polyfill Requirements

For IE 11 support, ensure these polyfills are available:

```tsx
// Required polyfills for IE 11
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Optional: Custom timer polyfill for better performance
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = function(callback) {
    return setTimeout(callback, 16);
  };
}
```

## Error Handling

### Graceful Fallbacks

```tsx
function RobustButton({ loadingAnimation = 'terminal', ...props }) {
  const [hasError, setHasError] = useState(false);
  
  // Fallback to spinner on animation error
  const safeLoadingAnimation = hasError ? 'spinner' : loadingAnimation;
  
  return (
    <ErrorBoundary 
      fallback={<Button {...props} loadingAnimation="spinner" />}
      onError={() => setHasError(true)}
    >
      <Button 
        {...props}
        loadingAnimation={safeLoadingAnimation}
      />
    </ErrorBoundary>
  );
}
```

### Debug Information

```tsx
// Development debugging
if (process.env.NODE_ENV === 'development') {
  window.REACT_SPECTRUM_TERMINAL_DEBUG = {
    logAnimationStates: true,
    logPerformanceMetrics: true,
    showAnimationBounds: true
  };
}
```