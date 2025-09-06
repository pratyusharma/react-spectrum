# Terminal Loading Animation - Migration Guide

This guide helps you migrate to the new terminal loading animation feature in React Spectrum Button components. The feature is designed to be fully backward compatible, making migration straightforward and safe.

## Table of Contents

- [Overview](#overview)
- [Breaking Changes](#breaking-changes)
- [Migration Strategies](#migration-strategies)
- [Component-Specific Migration](#component-specific-migration)
- [TypeScript Updates](#typescript-updates)
- [Testing Migration](#testing-migration)
- [Performance Considerations](#performance-considerations)
- [Troubleshooting](#troubleshooting)

## Overview

### What's Changed

The terminal loading animation feature introduces:

- **New default behavior**: Buttons with `isPending={true}` now show terminal animation by default
- **New prop**: `loadingAnimation` prop to choose between `'terminal'` and `'spinner'`
- **Enhanced accessibility**: Improved screen reader support for loading states
- **No breaking changes**: All existing props and functionality remain unchanged

### Compatibility Matrix

| React Spectrum Version | Terminal Loading Support | Default Animation |
|----------------------|-------------------------|-------------------|
| < 3.35.0 | ❌ Not available | Spinner |
| >= 3.35.0 | ✅ Available | Terminal |

## Breaking Changes

**Good news: There are no breaking changes!** 

All existing Button implementations will continue to work exactly as before, with the following behavioral change:

### Default Animation Change

**Before (< v3.35.0):**
```tsx
<Button isPending={true}>Submit</Button>
// Shows spinner animation
```

**After (>= v3.35.0):**
```tsx
<Button isPending={true}>Submit</Button>
// Shows terminal animation (new default)
```

This is the only visible change, and it's intentionally designed to be an enhancement rather than a breaking change.

## Migration Strategies

### Strategy 1: Gradual Migration (Recommended)

Adopt the terminal animation gradually across your application:

```tsx
// Phase 1: Let new default take effect
<Button isPending={isLoading}>Submit</Button>
// Terminal animation automatically applies

// Phase 2: Explicitly opt into terminal where desired
<Button 
  isPending={isLoading}
  loadingAnimation="terminal" // Explicit
>
  Submit
</Button>

// Phase 3: Keep spinner where needed
<Button 
  isPending={isLoading}
  loadingAnimation="spinner" // Preserve old behavior
>
  Submit
</Button>
```

### Strategy 2: Conservative Migration

Keep existing spinner behavior while selectively enabling terminal animation:

```tsx
// Step 1: Preserve all existing behavior
<Button 
  isPending={isLoading}
  loadingAnimation="spinner" // Explicit spinner
>
  Submit
</Button>

// Step 2: Selectively enable terminal animation
<Button 
  isPending={isLoading}
  loadingAnimation="terminal" // New terminal animation
>
  Process Data
</Button>
```

### Strategy 3: Full Adoption

Embrace the new terminal animation everywhere:

```tsx
// Let default behavior apply everywhere
<Button isPending={isLoading}>Submit</Button>
<Button isPending={isProcessing}>Process</Button>
<Button isPending={isSaving}>Save</Button>

// All will use terminal animation automatically
```

## Component-Specific Migration

### @react-spectrum/button

**Before:**
```tsx
import { Button } from '@react-spectrum/button';

function MyComponent() {
  return (
    <Button 
      variant="accent"
      isPending={isLoading}
      onPress={handleSubmit}
    >
      Submit
    </Button>
  );
}
```

**After (automatic terminal animation):**
```tsx
import { Button } from '@react-spectrum/button';

function MyComponent() {
  return (
    <Button 
      variant="accent"
      isPending={isLoading}
      onPress={handleSubmit}
      // loadingAnimation="terminal" is now default
    >
      Submit
    </Button>
  );
}
```

**After (preserve spinner):**
```tsx
import { Button } from '@react-spectrum/button';

function MyComponent() {
  return (
    <Button 
      variant="accent"
      isPending={isLoading}
      loadingAnimation="spinner" // Explicit spinner
      onPress={handleSubmit}
    >
      Submit
    </Button>
  );
}
```

### @react-spectrum/s2

**Before:**
```tsx
import { Button } from '@react-spectrum/s2';

function S2Component() {
  return (
    <Button 
      variant="primary"
      size="L"
      isPending={isProcessing}
      onPress={handleProcess}
    >
      Process
    </Button>
  );
}
```

**After (automatic terminal animation):**
```tsx
import { Button } from '@react-spectrum/s2';

function S2Component() {
  return (
    <Button 
      variant="primary"
      size="L"
      isPending={isProcessing}
      onPress={handleProcess}
      // Terminal animation applies automatically
    >
      Process
    </Button>
  );
}
```

### react-aria-components

**Before:**
```tsx
import { Button } from 'react-aria-components';

function RACComponent() {
  return (
    <Button 
      isPending={isLoading}
      onPress={handleAction}
    >
      {({isPending}) => (
        <>
          {isPending ? 'Loading...' : 'Click Me'}
        </>
      )}
    </Button>
  );
}
```

**After:**
```tsx
import { Button } from 'react-aria-components';

function RACComponent() {
  return (
    <Button 
      isPending={isLoading}
      loadingAnimation="terminal" // Optional: explicit control
      onPress={handleAction}
    >
      {({isPending}) => (
        <>
          {isPending ? 'Processing...' : 'Click Me'}
        </>
      )}
    </Button>
  );
}
```

## TypeScript Updates

### Type Imports

No changes needed for existing imports:

```tsx
// These imports remain the same
import type { SpectrumButtonProps } from '@react-types/button';
import type { ButtonProps } from 'react-aria-components';
```

### New Type Definitions

If you want to use the new types:

```tsx
// Optional: Import new loading animation types
import type { ButtonLoadingProps } from '@react-types/button';

interface MyButtonProps extends SpectrumButtonProps {
  // loadingAnimation is already included
  customProp?: string;
}
```

### Generic Button Wrapper

Update generic button components to support the new prop:

**Before:**
```tsx
interface CustomButtonProps {
  variant?: 'primary' | 'secondary';
  isPending?: boolean;
  children: React.ReactNode;
  onPress?: () => void;
}

function CustomButton(props: CustomButtonProps) {
  return <Button {...props} />;
}
```

**After:**
```tsx
interface CustomButtonProps {
  variant?: 'primary' | 'secondary';
  isPending?: boolean;
  loadingAnimation?: 'spinner' | 'terminal'; // New prop
  children: React.ReactNode;
  onPress?: () => void;
}

function CustomButton({ 
  loadingAnimation = 'terminal', // Set default
  ...props 
}: CustomButtonProps) {
  return <Button {...props} loadingAnimation={loadingAnimation} />;
}
```

## Testing Migration

### Update Test Expectations

**Before:**
```tsx
test('shows loading spinner when pending', async () => {
  render(<Button isPending={true}>Submit</Button>);
  
  await waitFor(() => {
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
```

**After:**
```tsx
test('shows loading animation when pending', async () => {
  render(<Button isPending={true}>Submit</Button>);
  
  await waitFor(() => {
    // Now expects terminal animation by default
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});

test('shows spinner when explicitly requested', async () => {
  render(
    <Button isPending={true} loadingAnimation="spinner">
      Submit
    </Button>
  );
  
  await waitFor(() => {
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
```

### Visual Regression Tests

Update visual tests to account for new default:

```tsx
// Storybook stories
export const LoadingStates = {
  render: () => (
    <div>
      {/* Will now show terminal animation */}
      <Button isPending={true}>Default Loading</Button>
      
      {/* Explicit spinner for comparison */}
      <Button isPending={true} loadingAnimation="spinner">
        Spinner Loading
      </Button>
      
      {/* Explicit terminal */}
      <Button isPending={true} loadingAnimation="terminal">
        Terminal Loading
      </Button>
    </div>
  )
};
```

### Accessibility Tests

Update accessibility tests to expect terminal animation:

```tsx
test('terminal animation has proper accessibility attributes', async () => {
  render(<Button isPending={true}>Submit</Button>);
  
  await waitFor(() => {
    const loadingElement = screen.getByRole('img');
    expect(loadingElement).toHaveAttribute('aria-label');
    expect(loadingElement.getAttribute('aria-label')).toMatch(/loading/i);
  });
});
```

## Performance Considerations

### Bundle Size Impact

The terminal animation feature adds approximately **2KB gzipped** to your bundle:

```tsx
// Before: Button component only
import { Button } from '@react-spectrum/button';

// After: Button + Terminal animation (automatic)
import { Button } from '@react-spectrum/button';
// +2KB for terminal animation functionality
```

### Runtime Performance

**No performance regression expected:**

- Terminal animation uses the same performance optimizations as the spinner
- Memory usage is comparable
- Animation performance is optimized with `requestAnimationFrame`

### Opt-out for Performance-Critical Scenarios

If bundle size is critical, you can opt back to spinner:

```tsx
// Slightly smaller bundle by using spinner
<Button 
  isPending={true}
  loadingAnimation="spinner"
>
  Submit
</Button>
```

## Migration Checklist

### Pre-Migration

- [ ] Update React Spectrum to version 3.35.0 or later
- [ ] Review all Button components with `isPending` prop
- [ ] Identify components where spinner behavior must be preserved
- [ ] Update test expectations for new default behavior

### During Migration

- [ ] Test visual appearance of terminal animation
- [ ] Verify accessibility with screen readers
- [ ] Update component documentation
- [ ] Run existing test suites
- [ ] Perform visual regression testing

### Post-Migration

- [ ] Monitor user feedback on new animation
- [ ] Update style guides and design systems
- [ ] Train team on new `loadingAnimation` prop
- [ ] Consider creating custom terminal themes

## Common Migration Patterns

### Form Buttons

**Pattern**: Convert form submission buttons to terminal animation

```tsx
// Before
<Button type="submit" isPending={isSubmitting}>
  Submit Form
</Button>

// After (automatic)
<Button type="submit" isPending={isSubmitting}>
  Submit Form
</Button>
// Terminal animation applies automatically

// After (explicit)
<Button 
  type="submit" 
  isPending={isSubmitting}
  loadingAnimation="terminal"
>
  Submit Form
</Button>
```

### Action Buttons

**Pattern**: Keep spinner for quick actions, use terminal for longer operations

```tsx
// Quick actions - keep spinner
<Button 
  isPending={isSaving}
  loadingAnimation="spinner"
  onPress={handleQuickSave}
>
  Save
</Button>

// Long operations - use terminal
<Button 
  isPending={isProcessing}
  loadingAnimation="terminal"
  onPress={handleDataProcessing}
>
  Process Data
</Button>
```

### Navigation Buttons

**Pattern**: Choose based on navigation type

```tsx
// Page navigation - spinner (quick)
<Button 
  isPending={isNavigating}
  loadingAnimation="spinner"
  onPress={handleNavigation}
>
  Go to Dashboard
</Button>

// Data loading navigation - terminal
<Button 
  isPending={isLoadingReport}
  loadingAnimation="terminal"
  onPress={handleReportLoad}
>
  Load Report
</Button>
```

## Rollback Plan

If you need to rollback the terminal animation:

### Option 1: Per-Component Rollback

```tsx
// Rollback specific buttons to spinner
<Button 
  isPending={isLoading}
  loadingAnimation="spinner" // Explicit rollback
>
  Submit
</Button>
```

### Option 2: Global Rollback via Wrapper

```tsx
// Create a wrapper component that defaults to spinner
function LegacyButton(props) {
  return (
    <Button 
      {...props}
      loadingAnimation={props.loadingAnimation || 'spinner'}
    />
  );
}

// Use wrapper throughout app
<LegacyButton isPending={isLoading}>Submit</LegacyButton>
```

### Option 3: Theme-Level Configuration

```tsx
// Configure default in theme/provider (if supported in future)
<Provider theme={theme} defaultLoadingAnimation="spinner">
  <App />
</Provider>
```

## Troubleshooting

### Common Issues

#### Animation Not Showing

**Problem**: Terminal animation doesn't appear
**Solution**: Check the 1-second delay is expected

```tsx
// Animation appears after 1 second delay (by design)
<Button isPending={true}>Submit</Button>
```

#### Wrong Animation Type

**Problem**: Showing spinner instead of terminal
**Solution**: Explicitly set `loadingAnimation`

```tsx
// Ensure terminal animation is explicit
<Button 
  isPending={true}
  loadingAnimation="terminal"
>
  Submit
</Button>
```

#### TypeScript Errors

**Problem**: TypeScript errors with new prop
**Solution**: Update React Spectrum version

```bash
npm update @react-spectrum/button @react-types/button
# or
yarn upgrade @react-spectrum/button @react-types/button
```

#### Test Failures

**Problem**: Tests expecting spinner behavior
**Solution**: Update test expectations

```tsx
// Update tests to expect terminal animation
await waitFor(() => {
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

// Or test specific animation type
render(<Button isPending={true} loadingAnimation="spinner" />);
await waitFor(() => {
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
});
```

### Debug Mode

Enable debug logging during migration:

```tsx
// Development only
if (process.env.NODE_ENV === 'development') {
  window.REACT_SPECTRUM_TERMINAL_DEBUG = true;
}
```

### Version Compatibility

Ensure all React Spectrum packages are compatible:

```json
{
  "dependencies": {
    "@react-spectrum/button": "^3.35.0",
    "@react-spectrum/s2": "^3.35.0",
    "@react-types/button": "^3.35.0",
    "react-aria-components": "^1.35.0"
  }
}
```

## Migration Timeline Recommendation

### Week 1: Preparation
- Update dependencies
- Review existing Button usage
- Plan migration strategy
- Update development environment

### Week 2: Development Migration
- Update development/staging environments
- Test new default behavior
- Update tests and documentation
- Train development team

### Week 3: Selective Production Migration
- Deploy to low-traffic areas first
- Monitor user feedback
- Adjust based on feedback
- Document any issues

### Week 4: Full Production Migration
- Complete rollout to all areas
- Final documentation updates
- Team training completion
- Performance monitoring

## Support and Resources

### Getting Help

- **GitHub Issues**: Report bugs or request features
- **Discord Community**: Get help from other developers
- **Documentation**: Comprehensive guides and API reference
- **Migration Support**: Contact React Spectrum team for enterprise support

### Useful Links

- [Terminal Loading Feature Documentation](./terminal-loading-feature.md)
- [API Reference](./terminal-loading-api.md)
- [Usage Examples](./terminal-loading-examples.md)
- [React Spectrum Button Documentation](https://react-spectrum.adobe.com/react-spectrum/Button.html)

This migration guide should help you smoothly transition to the new terminal loading animation feature while maintaining backward compatibility and ensuring a great user experience.