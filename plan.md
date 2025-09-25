# TagGroup Undo Feature Implementation Plan

## Overview
Enhance the TagGroup component in React Spectrum to support undo functionality when items are removed, with configurable limits and toast notifications.

## Requirements Summary
- Add undo-related props to `SpectrumTagGroupProps` interface
- Implement undo state management with removed items tracking
- Add default undo button UI that appears conditionally
- Show success toast with "😮‍💨" emoji on undo actions
- Maintain original tag ordering after restoration
- Respect `maxUndoCount` limit for undo operations
- Create demo component and update App.tsx

## Implementation Plan

### Phase 1: Core Interface & State Management
- [x] **Task 1**: Analyze existing TagGroup implementation and understand current state management
- [x] **Task 2**: Extend `SpectrumTagGroupProps` interface with undo-related props:
  - `allowsUndo?: boolean` (default false)
  - `undoLabel?: string` (default 'Undo')
  - `maxUndoCount?: number` (default 2)
  - `onUndo?: (restoredItem: T) => void`
- [x] **Task 3**: Add undo state management inside TagGroup component:
  - State to track removed items: `removedItems: T[]`
  - State to track removed keys: `removedKeys: Set<React.Key>`
  - Maintain original ordering by storing original index of each removed item

### Phase 2: Undo Logic Implementation
- [x] **Task 4**: Implement undo functionality logic:
  - Store removed items when they're deleted
  - Restore the most recently removed item when undo is pressed
  - Maintain original tag ordering after restoration
  - Call the `onUndo` callback with the restored item
  - Respect the `maxUndoCount` limit

### Phase 3: UI & User Experience
- [x] **Task 5**: Add default undo button UI that appears when `allowsUndo=true` and there are removed items
- [x] **Task 6**: Integrate toast notifications with "😮‍💨" emoji for undo success

### Phase 4: Testing & Integration
- [x] **Task 7**: Test undo functionality with existing TagGroup features (collapsing, actions, etc.)
- [x] **Task 8**: Create `TagGroupUndoDemo.tsx` component for demonstration:
  - TagGroup with `allowsUndo={true}` and `maxUndoCount={3}`
  - Multiple removable tags
  - `onUndo` callback that logs restored items
- [x] **Task 9**: Update `App.tsx` to showcase the undo demo:
  - Replace all existing content with just the TagGroupUndoDemo
  - Add a simple title

### Phase 5: Final Testing
- [x] **Task 10**: Test the complete implementation end-to-end

## Technical Considerations

### State Management Approach
- Use React state to track removed items and their original positions
- Filter out removed items from the visible collection
- Maintain a separate undo stack with original indices

### Integration Points
- Hook into existing `useListState` for collection management
- Integrate with existing action button area for undo button
- Ensure compatibility with existing features (collapsing, custom actions)

### Toast Implementation
- Need to determine toast library/implementation approach
- Consider using existing React Spectrum toast components if available

## Open Questions - RESOLVED
1. **Toast Implementation**: ✅ Use React Spectrum's toast components
2. **Styling**: ✅ Follow existing action button styling patterns
3. **Accessibility**: ✅ No additional ARIA labels needed
4. **Testing Strategy**: ✅ Both unit tests and integration testing

## Success Criteria
- [x] Undo functionality works correctly with configurable limits
- [x] Original tag ordering is preserved after restoration
- [x] Toast notifications appear on successful undo
- [x] Integration with existing TagGroup features remains intact
- [x] Demo showcases the feature effectively
- [x] Code follows React Spectrum patterns and conventions
