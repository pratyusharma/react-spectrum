I want to enhance the TagGroup component in React Spectrum to support undo when the items are removed. Here's what I want to do:

1. Add new props to SpectrumTagGroupProps interface:
   - allowsUndo?: boolean (default false)
   - undoLabel?: string (default 'Undo')
   - maxUndoCount?: number (default 2) - configurable number of removals that can be undone
   - onUndo?: (restoredItem: T) => void

2. Add undo state management inside the TagGroup component:
   - State to track removed items: removedItems: T[]
   - State to track removed keys: removedKeys: Set<React.Key>
   - Create an enhanced state object that filters out removed items and provides undo functionality
   - Maintain original ordering by storing the original index of each removed item

3. A default undo button inline that appears when allowsUndo=true and there are removed items

4. Show success toast with "😮‍💨" emoji when undo is performed

The undo functionality should:
- Store removed items when they're deleted
- Show an "Undo" button when items have been removed
- Restore the most recently removed item when undo is pressed
- Maintain original tag ordering after restoration
- Call the onUndo callback with the restored item
- Show a success toast with "😮‍💨" emoji on every undo action
- Respect the maxUndoCount limit for how many removals can be undone

Please implement this in packages/@react-spectrum/tag/src/TagGroup.tsx while maintaining all existing functionality and following React Spectrum patterns. 

Help me think through how to break this into iterative pieces and write a plan.md. Check off items in the plan as we accomplish them as a todo list. If you have open questions that require my input, add those in the plan as well.