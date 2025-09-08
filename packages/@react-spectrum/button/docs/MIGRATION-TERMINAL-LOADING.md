# Migration Guide: Adding Terminal Loading to Your Buttons

This guide helps you upgrade your existing React Spectrum buttons to use the new terminal-style loading animation.

## Overview

The terminal loading feature adds a nostalgic, CLI-inspired animation to button loading states. It's completely backward compatible - all existing buttons continue to work exactly as before.

## Basic Migration

### Before (Spinner Loading)
```tsx
<Button isPending={isLoading}>Save</Button>
```

### After (Terminal Loading)
```tsx
<Button isPending={isLoading} loadingStyle="terminal">Save</Button>
```

That's it! Just add `loadingStyle="terminal"` to enable the terminal animation.

## Step-by-Step Migration

### Step 1: Identify Loading Buttons
Find all buttons in your codebase that use the `isPending` prop:

```bash
# Search for isPending usage
grep -r "isPending" src/
```

### Step 2: Choose Candidates
Terminal loading works best for:
- Save/submit operations
- File uploads/downloads  
- Data processing tasks
- Developer tools
- Retro-themed interfaces

### Step 3: Add Terminal Loading
Update your buttons one by one:

```tsx
// Original
<Button isPending={isSaving}>Save Document</Button>

// Updated
<Button isPending={isSaving} loadingStyle="terminal">Save Document</Button>
```

### Step 4: Customize (Optional)
Add custom text that matches the action:

```tsx
<Button 
  isPending={isSaving} 
  loadingStyle="terminal"
  loadingText="Saving"
>
  Save Document
</Button>
```

## Common Migration Patterns

### Form Submit Buttons
```tsx
// Before
<Button type="submit" isPending={isSubmitting}>Submit</Button>

// After  
<Button 
  type="submit" 
  isPending={isSubmitting} 
  loadingStyle="terminal"
  loadingText="Submitting"
>
  Submit
</Button>
```

### File Upload Buttons
```tsx
// Before
<Button isPending={isUploading}>Upload Files</Button>

// After
<Button 
  isPending={isUploading} 
  loadingStyle="terminal"
  loadingText="Uploading"
  loadingSpeed={400}
>
  Upload Files
</Button>
```

### Data Processing Buttons
```tsx
// Before
<Button isPending={isProcessing}>Process Data</Button>

// After
<Button 
  isPending={isProcessing} 
  loadingStyle="terminal"
  loadingText="Processing"
  loadingDots={5}
>
  Process Data
</Button>
```

### API Call Buttons
```tsx
// Before
<Button isPending={isLoading}>Fetch Results</Button>

// After
<Button 
  isPending={isLoading} 
  loadingStyle="terminal"
  loadingText="Fetching"
  loadingSpeed={300}
>
  Fetch Results
</Button>
```

## Advanced Customization

### Dynamic Loading Text
```tsx
const [status, setStatus] = useState('idle');
const loadingText = status === 'uploading' ? 'Uploading' : 
                   status === 'processing' ? 'Processing' : 'Loading';

<Button 
  isPending={status !== 'idle'} 
  loadingStyle="terminal"
  loadingText={loadingText}
>
  Submit
</Button>
```

### Context-Aware Animation Speed
```tsx
// Faster for quick operations
<Button 
  isPending={isQuickSave} 
  loadingStyle="terminal"
  loadingSpeed={200}
>
  Quick Save
</Button>

// Slower for long operations  
<Button 
  isPending={isLongProcess} 
  loadingStyle="terminal"
  loadingSpeed={800}
>
  Generate Report
</Button>
```

### Responsive Dot Count
```tsx
// Fewer dots for mobile/narrow screens
const isMobile = useMediaQuery('(max-width: 768px)');

<Button 
  isPending={isLoading} 
  loadingStyle="terminal"
  loadingDots={isMobile ? 3 : 4}
>
  Save
</Button>
```

## Testing Your Migration

### Visual Testing
1. Trigger the loading state
2. Verify the terminal animation appears after 1 second
3. Check that text cycles through dot states smoothly
4. Ensure button remains properly styled

### Accessibility Testing
1. Use a screen reader to verify loading announcements
2. Test keyboard navigation during loading
3. Confirm focus management works correctly

### Cross-Browser Testing
- Test in Chrome, Firefox, Safari, Edge
- Verify animation timing is consistent
- Check that fallbacks work in older browsers

## Rollback Strategy

If you need to rollback, simply remove the terminal loading props:

```tsx
// Terminal loading
<Button 
  isPending={isLoading} 
  loadingStyle="terminal"
  loadingText="Saving"
>
  Save
</Button>

// Back to spinner (remove terminal props)
<Button isPending={isLoading}>Save</Button>
```

## Performance Considerations

### Bundle Size Impact
- **TerminalLoader component**: ~2KB gzipped
- **Button updates**: ~1KB gzipped  
- **Total impact**: ~3KB gzipped

### Runtime Performance
- Uses `setInterval` for animation (cleaned up properly)
- Minimal CPU impact during animation
- No impact when not in loading state

### Memory Usage
- Each terminal loading button: ~100 bytes
- Automatic cleanup on unmount
- No memory leaks

## Troubleshooting

### Animation Not Appearing
**Problem**: Terminal animation doesn't show
**Solutions**:
- Ensure `isPending={true}` is set
- Add `loadingStyle="terminal"` prop
- Wait for 1-second delay before animation starts

### Text Too Long
**Problem**: Loading text gets cut off
**Solutions**:
- Use shorter `loadingText` values
- Test button width with longest text state
- Consider responsive design

### Animation Too Fast/Slow
**Problem**: Animation speed doesn't feel right
**Solutions**:
- Adjust `loadingSpeed` prop (lower = faster)
- Test with actual loading operation timing
- Consider user context (urgent vs. background tasks)

## Best Practices

### Do ✅
- Use descriptive loading text that matches the action
- Test with realistic loading times
- Consider the overall UI theme and context
- Keep loading text concise
- Test accessibility thoroughly

### Don't ❌
- Don't use terminal loading everywhere (be selective)
- Don't use very long loading text
- Don't set extremely fast speeds (< 200ms)
- Don't forget to test the 1-second delay
- Don't ignore accessibility requirements

## Getting Help

- **Documentation**: [TerminalLoading.md](./TerminalLoading.md)
- **Examples**: Check the main Button.mdx documentation
- **Issues**: File issues in the React Spectrum repository
- **Discussions**: Join the React Spectrum community discussions

## Checklist

Use this checklist for each button you migrate:

- [ ] Added `loadingStyle="terminal"` prop
- [ ] Chose appropriate `loadingText` 
- [ ] Tested loading state visually
- [ ] Verified accessibility with screen reader
- [ ] Tested on mobile/responsive breakpoints
- [ ] Confirmed animation timing feels right
- [ ] Updated any related tests
- [ ] Documented the change for your team

Happy migrating! 🚀