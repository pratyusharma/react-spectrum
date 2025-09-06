# Terminal Loading Animation - Accessibility Guide

This guide covers the accessibility features and considerations for the terminal loading animation in React Spectrum Button components. The feature is designed with accessibility-first principles to ensure an inclusive experience for all users.

## Table of Contents

- [Overview](#overview)
- [Screen Reader Support](#screen-reader-support)
- [Keyboard Navigation](#keyboard-navigation)
- [Visual Accessibility](#visual-accessibility)
- [ARIA Implementation](#aria-implementation)
- [Testing with Assistive Technology](#testing-with-assistive-technology)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Overview

### Accessibility Principles

The terminal loading animation follows these core accessibility principles:

- **Perceivable**: Loading states are communicated through multiple channels
- **Operable**: Keyboard navigation remains functional during loading
- **Understandable**: Clear, consistent loading state communication
- **Robust**: Compatible with assistive technologies

### Compliance Standards

- **WCAG 2.1 AA**: Full compliance with Web Content Accessibility Guidelines
- **Section 508**: Compatible with U.S. federal accessibility requirements
- **ARIA 1.1**: Proper implementation of ARIA attributes and live regions

## Screen Reader Support

### Loading State Announcements

The terminal animation provides clear announcements to screen readers:

```tsx
<Button isPending={true} loadingAnimation="terminal">
  Submit Form
</Button>
```

**Screen reader announces:**
1. **Initial press**: "Submit Form button, pressed"
2. **Loading starts**: "Loading, please wait"
3. **Loading continues**: (No repeated announcements to avoid spam)
4. **Loading ends**: "Submit Form button" (returns to normal state)

### Custom ARIA Labels

You can customize screen reader announcements:

```tsx
<Button 
  isPending={isProcessing}
  loadingAnimation="terminal"
  aria-label={isProcessing ? "Processing your request, please wait" : "Submit form"}
>
  Submit Form
</Button>
```

### Live Region Integration

The animation integrates with ARIA live regions:

```html
<!-- Rendered HTML structure -->
<button aria-describedby="loading-status">
  Submit Form
  <span role="img" aria-label="Loading, please wait">Loading...</span>
</button>

<div id="loading-status" aria-live="polite" aria-atomic="true">
  Loading, please wait
</div>
```

## Keyboard Navigation

### Focus Management

Loading buttons maintain proper focus behavior:

```tsx
function AccessibleForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <form>
      <input type="text" placeholder="Enter your name" />
      
      <Button 
        type="submit"
        isPending={isSubmitting}
        loadingAnimation="terminal"
        // Button remains focusable but disabled during loading
      >
        Submit
      </Button>
      
      <Button type="button">
        Cancel
      </Button>
    </form>
  );
}
```

**Keyboard behavior during loading:**
- ✅ Button remains focusable with Tab/Shift+Tab
- ✅ Enter/Space keys are disabled (no action)
- ✅ Focus moves normally to other elements
- ✅ Screen reader announces loading state when focused

### Focus Indicators

Visual focus indicators remain visible during loading:

```css
/* Focus ring remains visible during loading */
.spectrum-Button:focus-visible[aria-busy="true"] {
  outline: 2px solid var(--spectrum-focus-ring-color);
  outline-offset: 2px;
}
```

### Escape Key Handling

For cancellable operations:

```tsx
function CancellableOperation() {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleKeyDown = (event) => {
    if (event.key === 'Escape' && isLoading) {
      // Cancel operation
      setIsLoading(false);
    }
  };

  return (
    <Button 
      isPending={isLoading}
      loadingAnimation="terminal"
      onKeyDown={handleKeyDown}
      aria-label={isLoading ? "Processing... Press Escape to cancel" : "Start process"}
    >
      {isLoading ? 'Processing... (Esc to cancel)' : 'Start Process'}
    </Button>
  );
}
```

## Visual Accessibility

### High Contrast Mode

Terminal animation adapts to high contrast mode:

```css
/* High contrast mode support */
@media (prefers-contrast: high) {
  [data-terminal-animation] {
    color: ButtonText;
    background-color: ButtonFace;
    border: 1px solid ButtonText;
  }
}

/* Windows High Contrast Mode */
@media screen and (-ms-high-contrast: active) {
  [data-terminal-animation] {
    color: ButtonText;
    background-color: ButtonFace;
  }
}
```

### Reduced Motion Support

Respects user's motion preferences:

```css
/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  [data-terminal-animation] {
    animation: none;
    /* Show static loading text instead */
  }
  
  [data-terminal-animation]::after {
    content: " (Loading)";
    font-style: italic;
  }
}
```

### Color Contrast

Terminal animation maintains sufficient color contrast:

```tsx
// Example with custom styling that maintains accessibility
<Button 
  isPending={true}
  loadingAnimation="terminal"
  UNSAFE_className="high-contrast-terminal"
>
  Submit
</Button>
```

```css
.high-contrast-terminal [data-terminal-animation] {
  /* Ensure minimum 4.5:1 contrast ratio */
  color: #000000;
  background-color: #ffffff;
  border: 2px solid #000000;
}
```

### Font Size Scaling

Animation text scales with user font size preferences:

```css
[data-terminal-animation] {
  /* Uses relative units for font scaling */
  font-size: 1em; /* Scales with user preferences */
  line-height: 1.2;
}
```

## ARIA Implementation

### Core ARIA Attributes

The terminal animation uses these ARIA attributes:

```html
<!-- Loading button structure -->
<button 
  aria-busy="true"
  aria-describedby="loading-description"
  aria-live="polite"
>
  Submit Form
  <span 
    role="img"
    aria-label="Loading, please wait"
    data-terminal-animation
  >
    Loading...
  </span>
</button>

<div 
  id="loading-description" 
  aria-live="polite" 
  aria-atomic="true"
  class="sr-only"
>
  Loading, please wait
</div>
```

### ARIA Attribute Details

#### `aria-busy`
Indicates the button is in a loading state:

```tsx
<Button isPending={true}>
  {/* aria-busy="true" automatically applied */}
  Submit
</Button>
```

#### `aria-live`
Controls how loading announcements are made:

```tsx
// Default: polite announcements
<Button isPending={true} loadingAnimation="terminal">Submit</Button>

// Custom: assertive announcements for urgent operations
<Button 
  isPending={true}
  loadingAnimation="terminal"
  aria-live="assertive" // More urgent announcements
>
  Emergency Submit
</Button>
```

#### `role="img"`
The loading animation uses `role="img"` for screen readers:

```html
<span role="img" aria-label="Loading, please wait">Loading...</span>
```

### Dynamic ARIA Updates

ARIA attributes update based on loading state:

```tsx
function DynamicARIAExample() {
  const [isLoading, setIsLoading] = useState(false);
  
  const ariaLabel = isLoading 
    ? "Processing your request, please wait" 
    : "Submit your request";
    
  return (
    <Button 
      isPending={isLoading}
      loadingAnimation="terminal"
      aria-label={ariaLabel}
      onPress={() => setIsLoading(true)}
    >
      {isLoading ? 'Processing...' : 'Submit Request'}
    </Button>
  );
}
```

## Testing with Assistive Technology

### Screen Reader Testing

#### NVDA (Windows)

```bash
# Test with NVDA screen reader
# 1. Navigate to button with Tab
# 2. Press Enter to activate
# 3. Verify loading announcement
# 4. Wait for completion announcement
```

**Expected NVDA behavior:**
- "Submit button"
- (After press) "Loading, please wait"
- (After completion) "Submit button"

#### JAWS (Windows)

**Expected JAWS behavior:**
- "Submit button"
- (After press) "busy, Loading, please wait"
- (After completion) "Submit button"

#### VoiceOver (macOS)

**Expected VoiceOver behavior:**
- "Submit, button"
- (After press) "Loading, please wait, image"
- (After completion) "Submit, button"

### Automated Testing

#### axe-core Integration

```tsx
import { axe, toHaveNoViolations } from 'jest-axe';

test('terminal loading animation has no accessibility violations', async () => {
  const { container } = render(
    <Button isPending={true} loadingAnimation="terminal">
      Submit
    </Button>
  );
  
  // Wait for loading animation to appear
  await waitFor(() => {
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
  
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

#### Custom Accessibility Tests

```tsx
describe('Terminal Loading Accessibility', () => {
  test('has proper ARIA attributes', async () => {
    render(<Button isPending={true} loadingAnimation="terminal">Submit</Button>);
    
    await waitFor(() => {
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-busy', 'true');
      
      const loadingIndicator = screen.getByRole('img');
      expect(loadingIndicator).toHaveAttribute('aria-label');
    });
  });
  
  test('announces loading state to screen readers', async () => {
    const announcements = [];
    
    // Mock live announcer
    jest.spyOn(require('@react-aria/live-announcer'), 'announce')
      .mockImplementation((message) => {
        announcements.push(message);
      });
    
    const { rerender } = render(
      <Button isPending={false}>Submit</Button>
    );
    
    rerender(<Button isPending={true} loadingAnimation="terminal">Submit</Button>);
    
    await waitFor(() => {
      expect(announcements).toContain('Loading, please wait');
    });
  });
  
  test('maintains focus during loading', async () => {
    render(<Button isPending={true} loadingAnimation="terminal">Submit</Button>);
    
    const button = screen.getByRole('button');
    button.focus();
    
    expect(document.activeElement).toBe(button);
    
    // Focus should remain after loading starts
    await waitFor(() => {
      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });
    
    expect(document.activeElement).toBe(button);
  });
});
```

### Manual Testing Checklist

#### Keyboard Navigation
- [ ] Tab to button works
- [ ] Enter/Space activates button (when not loading)
- [ ] Enter/Space ignored during loading
- [ ] Focus remains on button during loading
- [ ] Tab away from button works during loading

#### Screen Reader Testing
- [ ] Button is announced correctly
- [ ] Loading state is announced
- [ ] Loading completion is announced
- [ ] No excessive announcements during loading
- [ ] Custom aria-label is respected

#### Visual Testing
- [ ] Loading animation is visible
- [ ] Focus indicator remains visible during loading
- [ ] High contrast mode works
- [ ] Font scaling works
- [ ] Reduced motion preference is respected

## Best Practices

### Meaningful Loading Messages

Provide context-specific loading messages:

```tsx
// ❌ Generic loading message
<Button isPending={isLoading}>Submit</Button>

// ✅ Specific loading context
<Button 
  isPending={isLoading}
  aria-label={isLoading ? "Submitting your form, please wait" : "Submit form"}
>
  {isLoading ? 'Submitting...' : 'Submit Form'}
</Button>
```

### Progress Information

Include progress information when available:

```tsx
function ProgressiveLoadingButton() {
  const [progress, setProgress] = useState(0);
  const isLoading = progress > 0 && progress < 100;
  
  const progressLabel = isLoading 
    ? `Processing ${progress}% complete, please wait`
    : "Start processing";
    
  return (
    <Button 
      isPending={isLoading}
      loadingAnimation="terminal"
      aria-label={progressLabel}
    >
      {isLoading ? `Processing ${progress}%` : 'Start Processing'}
    </Button>
  );
}
```

### Error State Accessibility

Handle error states accessibly:

```tsx
function ErrorHandlingButton() {
  const [state, setState] = useState('idle'); // 'idle' | 'loading' | 'error' | 'success'
  
  const getAriaLabel = () => {
    switch (state) {
      case 'loading': return 'Processing, please wait';
      case 'error': return 'Processing failed, click to retry';
      case 'success': return 'Processing completed successfully';
      default: return 'Start processing';
    }
  };
  
  return (
    <>
      <Button 
        variant={state === 'error' ? 'negative' : 'primary'}
        isPending={state === 'loading'}
        loadingAnimation="terminal"
        aria-label={getAriaLabel()}
        aria-describedby={state === 'error' ? 'error-message' : undefined}
      >
        {state === 'loading' && 'Processing...'}
        {state === 'error' && 'Retry'}
        {state === 'success' && 'Success!'}
        {state === 'idle' && 'Start Process'}
      </Button>
      
      {state === 'error' && (
        <div 
          id="error-message" 
          role="alert"
          className="error-message"
        >
          Processing failed. Please try again.
        </div>
      )}
    </>
  );
}
```

### Timeout Handling

Provide timeout information:

```tsx
function TimeoutAwareButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [timeoutWarning, setTimeoutWarning] = useState(false);
  
  const startProcess = async () => {
    setIsLoading(true);
    setTimeoutWarning(false);
    
    // Show timeout warning after 10 seconds
    const timeoutTimer = setTimeout(() => {
      setTimeoutWarning(true);
    }, 10000);
    
    try {
      await longRunningProcess();
    } finally {
      clearTimeout(timeoutTimer);
      setIsLoading(false);
      setTimeoutWarning(false);
    }
  };
  
  const ariaLabel = (() => {
    if (timeoutWarning) return 'Processing is taking longer than expected, please wait';
    if (isLoading) return 'Processing, please wait';
    return 'Start process';
  })();
  
  return (
    <Button 
      isPending={isLoading}
      loadingAnimation="terminal"
      aria-label={ariaLabel}
      aria-describedby={timeoutWarning ? 'timeout-warning' : undefined}
      onPress={startProcess}
    >
      {isLoading ? 'Processing...' : 'Start Process'}
      
      {timeoutWarning && (
        <div 
          id="timeout-warning"
          role="status"
          aria-live="polite"
          className="sr-only"
        >
          Processing is taking longer than expected. Please wait.
        </div>
      )}
    </Button>
  );
}
```

## Troubleshooting

### Common Accessibility Issues

#### Screen Reader Not Announcing Loading

**Problem**: Screen reader doesn't announce loading state
**Solution**: Check ARIA live region setup

```tsx
// ❌ Missing live region
<Button isPending={true}>Submit</Button>

// ✅ Proper live region (automatic in React Spectrum)
<Button isPending={true} loadingAnimation="terminal">Submit</Button>
```

#### Multiple Announcements

**Problem**: Screen reader makes too many announcements
**Solution**: Use `aria-atomic="true"` and debounce updates

```tsx
// Automatic in React Spectrum - no action needed
<Button isPending={isLoading} loadingAnimation="terminal">Submit</Button>
```

#### Focus Lost During Loading

**Problem**: Focus moves away from button during loading
**Solution**: Ensure button remains focusable

```tsx
// React Spectrum handles this automatically
<Button 
  isPending={isLoading}
  loadingAnimation="terminal"
  // tabIndex remains 0 during loading
>
  Submit
</Button>
```

#### High Contrast Mode Issues

**Problem**: Loading animation not visible in high contrast mode
**Solution**: Add high contrast styles

```css
@media (prefers-contrast: high) {
  [data-terminal-animation] {
    color: ButtonText !important;
    background-color: ButtonFace !important;
    border: 1px solid ButtonText !important;
  }
}
```

### Testing Tools

#### Browser Extensions
- **axe DevTools**: Automated accessibility testing
- **WAVE**: Web accessibility evaluation
- **Lighthouse**: Accessibility audit

#### Screen Readers
- **NVDA** (Free): Windows screen reader
- **JAWS**: Professional Windows screen reader  
- **VoiceOver**: Built-in macOS screen reader
- **Orca**: Linux screen reader

#### Testing Commands

```bash
# Install accessibility testing tools
npm install --save-dev jest-axe @testing-library/jest-dom

# Run accessibility tests
npm test -- --testNamePattern="accessibility"

# Run with screen reader simulation
npm test -- --testNamePattern="screen reader"
```

### Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [React Spectrum Accessibility](https://react-spectrum.adobe.com/react-spectrum/accessibility.html)
- [Testing with Screen Readers](https://webaim.org/articles/screenreader_testing/)

This accessibility guide ensures that the terminal loading animation provides an inclusive experience for all users, regardless of their abilities or the assistive technologies they use.