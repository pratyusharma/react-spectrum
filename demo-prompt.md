I need to create a simple demo for the TagGroup undo feature and update App.tsx to showcase it. I want to fetch the "Demo Table" from Airtable and treat each column as a separate TagGroup.

Please:

1. Create a simple examples/rsp-cra-18/src/TagGroupUndoDemo.tsx that demonstrates:
   - TagGroup with allowsUndo={true} and maxUndoCount={3}
   - Multiple removable tags
   - onUndo callback that logs restored items

2. Update examples/rsp-cra-18/src/App.tsx to:
   - Replace all existing content with just the TagGroupUndoDemo
   - Add a simple title

The demo should showcase the undo feature with toast notifications and be clean/focused for testing the new functionality.