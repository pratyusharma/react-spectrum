# Terminal Loading Animation - Technical Implementation

This document provides detailed technical information about the implementation of the terminal loading animation feature in React Spectrum Button components.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Core Components](#core-components)
- [Animation Engine](#animation-engine)
- [Integration Points](#integration-points)
- [Performance Optimizations](#performance-optimizations)
- [Memory Management](#memory-management)
- [Browser Compatibility](#browser-compatibility)
- [Build System Integration](#build-system-integration)

## Architecture Overview

### High-Level Design

The terminal loading animation follows a modular architecture:

```
┌─────────────────────────────────────┐
│           Button Components         │
│  ┌─────────────┐ ┌─────────────────┐│
│  │ @react-     │ │ react-aria-     ││
│  │ spectrum/   │ │ components      ││
│  │ button      │ │                 ││
│  └─────────────┘ └─────────────────┘│
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│       TerminalAnimation Core        │
│  ┌─────────────┐ ┌─────────────────┐│
│  │ Animation   │ │ State           ││
│  │ Engine      │ │ Management      ││
│  └─────────────┘ └─────────────────┘│
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│          Utility Layer              │
│  ┌─────────────┐ ┌─────────────────┐│
│  │ Timer       │ │ Accessibility   ││
│  │ Management  │ │ Helpers         ││
│  └─────────────┘ └─────────────────┘│
└─────────────────────────────────────┘
```

### Component Hierarchy

```tsx
// Simplified component structure
<Button isPending={true} loadingAnimation="terminal">
  <ButtonContent>
    {children}
    {isPending && (
      <TerminalAnimation 
        isVisible={isProgressVisible}
        ariaLabel="Loading, please wait"
      />
    )}
  </ButtonContent>
</Button>
```

## Core Components

### TerminalAnimation Component

**Location**: `packages/@react-spectrum/utils/src/TerminalAnimation.tsx`

```tsx
interface TerminalAnimationProps {
  isVisible: boolean;
  ariaLabel?: string;
  className?: string;
  interval?: number;
}

interface TerminalAnimationState {
  currentDotIndex: number;
  isActive: boolean;
}

const DOT_STATES = ['', '.', '..', '...', '….'] as const;

export function TerminalAnimation({
  isVisible,
  ariaLabel = 'Loading, please wait',
  className,
  interval = 500
}: TerminalAnimationProps) {
  const [currentDotIndex, setCurrentDotIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Animation cycle logic
  useEffect(() => {
    if (!isVisible) {
      setCurrentDotIndex(0);
      return;
    }
    
    const startAnimation = () => {
      timerRef.current = setInterval(() => {
        setCurrentDotIndex(prev => (prev + 1) % DOT_STATES.length);
      }, interval);
    };
    
    // Start animation immediately
    startAnimation();
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isVisible, interval]);
  
  // Performance optimization: early return
  if (!isVisible) return null;
  
  return (
    <span
      role="img"
      aria-label={ariaLabel}
      className={className}
      data-terminal-animation
    >
      Loading{DOT_STATES[currentDotIndex]}
    </span>
  );
}
```

### Button Integration Layer

Each Button variant integrates the terminal animation differently:

#### @react-spectrum/button Integration

```tsx
// In Button.tsx
import { TerminalAnimation } from '@react-spectrum/utils';

export const Button = forwardRef<HTMLElement, SpectrumButtonProps>((props, ref) => {
  const {
    isPending,
    loadingAnimation = 'terminal', // New default
    children,
    ...otherProps
  } = props;
  
  const [isProgressVisible, setIsProgressVisible] = useState(false);
  
  // Existing 1-second delay logic
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    
    if (isPending) {
      timeout = setTimeout(() => {
        setIsProgressVisible(true);
      }, 1000);
    } else {
      setIsProgressVisible(false);
    }
    
    return () => clearTimeout(timeout);
  }, [isPending]);
  
  const renderLoadingIndicator = () => {
    if (!isPending) return null;
    
    if (loadingAnimation === 'terminal') {
      return (
        <TerminalAnimation
          isVisible={isProgressVisible}
          ariaLabel={isPendingAriaLiveLabel}
          className={classNames(styles, 'spectrum-Button-terminalLoader')}
        />
      );
    }
    
    // Fallback to spinner
    return (
      <div
        aria-hidden="true"
        style={{visibility: isProgressVisible ? 'visible' : 'hidden'}}
        className={classNames(styles, 'spectrum-Button-circleLoader')}>
        <ProgressCircle
          aria-label={isPendingAriaLiveLabel}
          isIndeterminate
          size="S"
          staticColor={staticColor}
        />
      </div>
    );
  };
  
  return (
    <Element {...buttonProps} ref={domRef} className={/* ... */}>
      <SlotProvider slots={/* ... */}>
        {children}
        {renderLoadingIndicator()}
        {/* Existing ARIA live regions */}
      </SlotProvider>
    </Element>
  );
});
```

#### react-aria-components Integration

```tsx
// In Button.tsx
import { TerminalAnimation } from '@react-spectrum/utils';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    isPending,
    loadingAnimation = 'terminal',
    children,
    ...otherProps
  } = props;
  
  const renderProps = useRenderProps({
    ...props,
    values: {
      isPending,
      // ... other render props
    }
  });
  
  return (
    <button {...otherProps} ref={ref}>
      {typeof children === 'function' ? children(renderProps) : children}
      {isPending && loadingAnimation === 'terminal' && (
        <TerminalAnimation
          isVisible={true} // RAC shows immediately
          ariaLabel="Loading, please wait"
        />
      )}
    </button>
  );
});
```

## Animation Engine

### State Machine Implementation

The animation uses a simple finite state machine:

```tsx
type AnimationState = 'idle' | 'running' | 'paused' | 'stopped';

interface AnimationStateMachine {
  currentState: AnimationState;
  dotIndex: number;
  timer: NodeJS.Timeout | null;
}

const animationStateMachine = {
  idle: {
    start: 'running'
  },
  running: {
    pause: 'paused',
    stop: 'stopped'
  },
  paused: {
    resume: 'running',
    stop: 'stopped'
  },
  stopped: {
    start: 'running'
  }
};

class TerminalAnimationEngine {
  private state: AnimationStateMachine;
  private dotStates = ['', '.', '..', '...', '….'];
  private interval: number;
  private onUpdate: (text: string) => void;
  
  constructor(interval = 500, onUpdate: (text: string) => void) {
    this.interval = interval;
    this.onUpdate = onUpdate;
    this.state = {
      currentState: 'idle',
      dotIndex: 0,
      timer: null
    };
  }
  
  start() {
    if (this.state.currentState !== 'idle') return;
    
    this.state.currentState = 'running';
    this.scheduleNextUpdate();
  }
  
  stop() {
    this.clearTimer();
    this.state.currentState = 'stopped';
    this.state.dotIndex = 0;
    this.onUpdate('Loading');
  }
  
  pause() {
    if (this.state.currentState === 'running') {
      this.clearTimer();
      this.state.currentState = 'paused';
    }
  }
  
  resume() {
    if (this.state.currentState === 'paused') {
      this.state.currentState = 'running';
      this.scheduleNextUpdate();
    }
  }
  
  private scheduleNextUpdate() {
    this.state.timer = setTimeout(() => {
      this.updateDots();
      if (this.state.currentState === 'running') {
        this.scheduleNextUpdate();
      }
    }, this.interval);
  }
  
  private updateDots() {
    this.state.dotIndex = (this.state.dotIndex + 1) % this.dotStates.length;
    const currentText = `Loading${this.dotStates[this.state.dotIndex]}`;
    this.onUpdate(currentText);
  }
  
  private clearTimer() {
    if (this.state.timer) {
      clearTimeout(this.state.timer);
      this.state.timer = null;
    }
  }
  
  destroy() {
    this.clearTimer();
    this.state.currentState = 'stopped';
  }
}
```

### React Hook Integration

```tsx
function useTerminalAnimation(isVisible: boolean, interval = 500) {
  const [animationText, setAnimationText] = useState('Loading');
  const engineRef = useRef<TerminalAnimationEngine | null>(null);
  
  // Initialize engine
  useEffect(() => {
    engineRef.current = new TerminalAnimationEngine(interval, setAnimationText);
    
    return () => {
      engineRef.current?.destroy();
    };
  }, [interval]);
  
  // Control animation based on visibility
  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;
    
    if (isVisible) {
      engine.start();
    } else {
      engine.stop();
    }
  }, [isVisible]);
  
  // Pause animation when window is not visible (performance optimization)
  useEffect(() => {
    const handleVisibilityChange = () => {
      const engine = engineRef.current;
      if (!engine) return;
      
      if (document.hidden) {
        engine.pause();
      } else {
        engine.resume();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
  
  return animationText;
}
```

## Integration Points

### Type System Integration

```tsx
// @react-types/button/src/index.d.ts
export interface ButtonLoadingProps {
  /**
   * Type of loading animation to display when isPending is true.
   * @default 'terminal'
   */
  loadingAnimation?: 'spinner' | 'terminal';
}

// Extend existing interfaces
export interface SpectrumButtonProps<T extends ElementType = 'button'> 
  extends AriaBaseButtonProps, 
          ButtonProps, 
          ButtonLoadingProps, // New
          StyleProps, 
          FocusableProps {
  // ... existing props
}
```

### CSS Integration

```css
/* packages/@adobe/spectrum-css-temp/components/button/vars.css */

.spectrum-Button-terminalLoader {
  display: inline-block;
  margin-left: var(--spectrum-button-text-gap);
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  
  /* Animation timing */
  --terminal-animation-duration: 500ms;
  
  /* Accessibility */
  speak: never; /* Prevent double announcements */
}

.spectrum-Button[aria-busy="true"] .spectrum-Button-terminalLoader {
  visibility: visible;
}

.spectrum-Button:not([aria-busy="true"]) .spectrum-Button-terminalLoader {
  display: none;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .spectrum-Button-terminalLoader {
    color: ButtonText;
    background-color: ButtonFace;
    border: 1px solid ButtonText;
    padding: 1px 2px;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .spectrum-Button-terminalLoader {
    animation: none;
  }
  
  .spectrum-Button-terminalLoader::after {
    content: " (Loading)";
    font-style: italic;
  }
}
```

### Bundle Integration

```typescript
// packages/@react-spectrum/utils/src/index.ts
export { TerminalAnimation } from './TerminalAnimation';
export type { TerminalAnimationProps } from './TerminalAnimation';

// Conditional export for tree shaking
export const createTerminalAnimation = () => {
  if (typeof window === 'undefined') {
    // SSR fallback
    return null;
  }
  
  return import('./TerminalAnimation').then(module => module.TerminalAnimation);
};
```

## Performance Optimizations

### Rendering Optimizations

```tsx
// Memoized terminal animation to prevent unnecessary re-renders
const TerminalAnimation = memo(function TerminalAnimation({
  isVisible,
  ariaLabel,
  className,
  interval = 500
}: TerminalAnimationProps) {
  // Use callback to prevent re-creation on every render
  const updateText = useCallback((text: string) => {
    // Direct DOM manipulation for performance
    const element = document.querySelector('[data-terminal-animation]');
    if (element) {
      element.textContent = text;
    }
  }, []);
  
  // Memoize animation engine
  const engine = useMemo(() => 
    new TerminalAnimationEngine(interval, updateText),
    [interval, updateText]
  );
  
  // ... rest of implementation
});
```

### Timer Management

```tsx
// Efficient timer management with RAF fallback
class OptimizedTimerManager {
  private timers = new Map<string, number>();
  private useRAF = typeof requestAnimationFrame !== 'undefined';
  
  schedule(id: string, callback: () => void, delay: number) {
    this.cancel(id);
    
    if (this.useRAF && delay < 100) {
      // Use RAF for short delays
      const rafId = requestAnimationFrame(callback);
      this.timers.set(id, rafId);
    } else {
      // Use setTimeout for longer delays
      const timerId = setTimeout(callback, delay);
      this.timers.set(id, timerId);
    }
  }
  
  cancel(id: string) {
    const timerId = this.timers.get(id);
    if (timerId) {
      if (this.useRAF) {
        cancelAnimationFrame(timerId);
      } else {
        clearTimeout(timerId);
      }
      this.timers.delete(id);
    }
  }
  
  cancelAll() {
    for (const [id] of this.timers) {
      this.cancel(id);
    }
  }
}
```

### Memory Leak Prevention

```tsx
// Comprehensive cleanup system
function useTerminalAnimationWithCleanup(isVisible: boolean) {
  const cleanupRef = useRef<(() => void)[]>([]);
  
  const addCleanup = useCallback((fn: () => void) => {
    cleanupRef.current.push(fn);
  }, []);
  
  const cleanup = useCallback(() => {
    cleanupRef.current.forEach(fn => fn());
    cleanupRef.current = [];
  }, []);
  
  // Cleanup on unmount
  useEffect(() => cleanup, [cleanup]);
  
  // Cleanup on visibility change
  useEffect(() => {
    if (!isVisible) {
      cleanup();
    }
  }, [isVisible, cleanup]);
  
  // Cleanup on page unload
  useEffect(() => {
    const handleUnload = () => cleanup();
    window.addEventListener('beforeunload', handleUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
      cleanup();
    };
  }, [cleanup]);
  
  return { addCleanup };
}
```

## Memory Management

### Garbage Collection Optimization

```tsx
// Weak references for large objects
class TerminalAnimationRegistry {
  private static instances = new WeakMap<HTMLElement, TerminalAnimationEngine>();
  
  static register(element: HTMLElement, engine: TerminalAnimationEngine) {
    this.instances.set(element, engine);
  }
  
  static unregister(element: HTMLElement) {
    const engine = this.instances.get(element);
    if (engine) {
      engine.destroy();
      this.instances.delete(element);
    }
  }
  
  static cleanup() {
    // Automatic cleanup happens via WeakMap
    // No manual iteration needed
  }
}
```

### Resource Pooling

```tsx
// Object pooling for animation states
class AnimationStatePool {
  private pool: AnimationState[] = [];
  private maxPoolSize = 10;
  
  acquire(): AnimationState {
    return this.pool.pop() || {
      currentState: 'idle',
      dotIndex: 0,
      timer: null
    };
  }
  
  release(state: AnimationState) {
    if (this.pool.length < this.maxPoolSize) {
      // Reset state
      state.currentState = 'idle';
      state.dotIndex = 0;
      state.timer = null;
      
      this.pool.push(state);
    }
  }
  
  clear() {
    this.pool = [];
  }
}
```

## Browser Compatibility

### Feature Detection

```tsx
// Comprehensive feature detection
const BrowserCapabilities = {
  hasRAF: typeof requestAnimationFrame !== 'undefined',
  hasWeakMap: typeof WeakMap !== 'undefined',
  hasIntersectionObserver: typeof IntersectionObserver !== 'undefined',
  hasVisibilityAPI: typeof document !== 'undefined' && 'hidden' in document,
  
  // Animation support
  supportsCSS3: (() => {
    const div = document.createElement('div');
    return 'transform' in div.style;
  })(),
  
  // Accessibility support
  supportsARIA: (() => {
    const div = document.createElement('div');
    div.setAttribute('aria-label', 'test');
    return div.getAttribute('aria-label') === 'test';
  })()
};
```

### Polyfill Integration

```tsx
// Conditional polyfill loading
async function loadPolyfills() {
  const polyfills = [];
  
  if (!BrowserCapabilities.hasRAF) {
    polyfills.push(import('raf/polyfill'));
  }
  
  if (!BrowserCapabilities.hasWeakMap) {
    polyfills.push(import('es6-weak-map/implement'));
  }
  
  await Promise.all(polyfills);
}

// Initialize with polyfills
export async function initializeTerminalAnimation() {
  await loadPolyfills();
  return TerminalAnimation;
}
```

### Fallback Strategies

```tsx
// Graceful degradation
function createTerminalAnimationWithFallback(props: TerminalAnimationProps) {
  if (!BrowserCapabilities.hasRAF) {
    // Static fallback for very old browsers
    return (
      <span role="img" aria-label={props.ariaLabel}>
        Loading...
      </span>
    );
  }
  
  if (!BrowserCapabilities.supportsCSS3) {
    // Simple text-based animation
    return <SimpleTerminalAnimation {...props} />;
  }
  
  // Full-featured animation
  return <TerminalAnimation {...props} />;
}
```

## Build System Integration

### Webpack Configuration

```javascript
// webpack.config.js additions
module.exports = {
  // ... existing config
  
  resolve: {
    alias: {
      '@react-spectrum/terminal-animation': path.resolve(
        __dirname, 
        'packages/@react-spectrum/utils/src/TerminalAnimation'
      )
    }
  },
  
  optimization: {
    splitChunks: {
      cacheGroups: {
        terminalAnimation: {
          test: /[\\/]TerminalAnimation[\\/]/,
          name: 'terminal-animation',
          chunks: 'all',
          minSize: 0
        }
      }
    }
  }
};
```

### Tree Shaking Configuration

```typescript
// package.json
{
  "sideEffects": [
    "*.css",
    "*.scss"
  ],
  "exports": {
    ".": {
      "import": "./dist/index.esm.js",
      "require": "./dist/index.cjs.js"
    },
    "./terminal-animation": {
      "import": "./dist/TerminalAnimation.esm.js",
      "require": "./dist/TerminalAnimation.cjs.js"
    }
  }
}
```

### TypeScript Build Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@react-spectrum/utils/terminal-animation": [
        "packages/@react-spectrum/utils/src/TerminalAnimation"
      ]
    }
  },
  "include": [
    "packages/@react-spectrum/utils/src/TerminalAnimation.tsx"
  ]
}
```

### Testing Infrastructure

```typescript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/test/terminal-animation-setup.ts'],
  
  // Mock timers for animation testing
  fakeTimers: {
    enableGlobally: true
  },
  
  // Coverage configuration
  collectCoverageFrom: [
    'packages/@react-spectrum/utils/src/TerminalAnimation.tsx',
    '!**/*.d.ts'
  ]
};
```

This technical implementation documentation provides developers with the detailed information needed to understand, maintain, and extend the terminal loading animation feature in React Spectrum.