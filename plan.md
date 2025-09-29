# TagGroup Undo Feature Implementation Plan

## Overview
Enhance the TagGroup component in React Spectrum to support undo functionality when items are removed, with configurable limits.

## Requirements Summary
- Add undo-related props to `SpectrumTagGroupProps` interface
- Implement undo state management with removed items tracking
- Add default undo button UI that appears conditionally
- Maintain original tag ordering after restoration
- Respect `maxUndoCount` limit for undo operations
- Create demo component and update App.tsx

## Implementation Plan

### Phase 1: Core Interface & State Management
- [x] **Task 1**: Analyze existing TagGroup implementation and understand current state management
  - Reviewed `packages/@react-spectrum/tag/src/TagGroup.tsx` to understand current structure
  - Analyzed `useListState` hook usage and collection management
  - Studied existing action button implementation patterns
  - Examined props interface and component architecture

- [x] **Task 2**: Extend `SpectrumTagGroupProps` interface with undo-related props:
  - `allowsUndo?: boolean` (default false)
  - `undoLabel?: string` (default 'Undo')
  - `maxUndoCount?: number` (default 2)
  - `onUndo?: (restoredItem: T) => void`
  - Added these props to the interface in `packages/@react-spectrum/tag/src/TagGroup.tsx`
  - Implemented proper TypeScript typing with generics

- [x] **Task 3**: Add undo state management inside TagGroup component:
  - State to track removed items: `removedItems: T[]`
  - State to track removed keys: `removedKeys: Set<React.Key>`
  - Maintain original ordering by storing original index of each removed item
  - Implemented `useState` hooks for undo state management
  - Created enhanced collection filtering logic

### Phase 2: Undo Logic Implementation
- [x] **Task 4**: Implement undo functionality logic:
  - Store removed items when they're deleted
  - Restore the most recently removed item when undo is pressed
  - Maintain original tag ordering after restoration
  - Call the `onUndo` callback with the restored item
  - Respect the `maxUndoCount` limit
  - Implemented `handleUndo` function with proper state updates
  - Added logic to maintain original item ordering during restoration
  - Integrated with existing `onRemove` callback system

### Phase 3: UI & User Experience
- [x] **Task 5**: Add default undo button UI that appears when `allowsUndo=true` and there are removed items
  - Created conditional undo button rendering
  - Integrated with existing action button area
  - Applied consistent styling with existing action buttons
  - Added proper accessibility attributes

### Phase 4: Testing & Integration
- [x] **Task 6**: Test undo functionality with existing TagGroup features (collapsing, actions, etc.)
  - Verified compatibility with existing TagGroup features
  - Tested with collapsible TagGroups
  - Ensured custom actions still work properly
  - Validated keyboard navigation and accessibility

- [x] **Task 7**: Create `TagGroupUndoDemo.tsx` component for demonstration:
  - TagGroup with `allowsUndo={true}` and `maxUndoCount={3}`
  - Multiple removable tags with different types
  - `onUndo` callback that logs restored items
  - Comprehensive demo showcasing all undo features

- [x] **Task 8**: Update `App.tsx` to showcase the undo demo:
  - Replaced all existing content with just the TagGroupUndoDemo
  - Added a simple title and description
  - Clean, focused demonstration interface

### Phase 5: Final Testing
- [x] **Task 9**: Test the complete implementation end-to-end
  - Verified all undo functionality works correctly
  - Tested edge cases (empty collections, max undo limits)
  - Validated TypeScript compilation
  - Confirmed no regressions in existing functionality

## Technical Considerations

### State Management Approach
- Use React state to track removed items and their original positions
- Filter out removed items from the visible collection
- Maintain a separate undo stack with original indices
- Implemented efficient state updates with proper React patterns

### Integration Points
- Hook into existing `useListState` for collection management
- Integrate with existing action button area for undo button
- Ensure compatibility with existing features (collapsing, custom actions)
- Maintain backward compatibility with existing TagGroup usage

### Implementation Details
- **File Modified**: `packages/@react-spectrum/tag/src/TagGroup.tsx`
- **Props Added**: `allowsUndo`, `undoLabel`, `maxUndoCount`, `onUndo`
- **State Management**: Added `removedItems` and `removedKeys` state
- **UI Integration**: Conditional undo button in action area
- **Demo Created**: `TagGroupUndoDemo.tsx` component

## Open Questions - RESOLVED
1. **Styling**: ✅ Follow existing action button styling patterns
2. **Accessibility**: ✅ No additional ARIA labels needed
3. **Testing Strategy**: ✅ Both unit tests and integration testing

## Success Criteria
- [x] Undo functionality works correctly with configurable limits
- [x] Original tag ordering is preserved after restoration
- [x] Integration with existing TagGroup features remains intact
- [x] Demo showcases the feature effectively
- [x] Code follows React Spectrum patterns and conventions
- [x] TypeScript compilation passes without errors
- [x] No regressions in existing TagGroup functionality
