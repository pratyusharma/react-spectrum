# TagGroup Undo Feature Documentation

## Overview

The TagGroup component in React Spectrum supports tag removal through the `onRemove` prop, but does not include a built-in undo mechanism. However, you can implement an undo feature by combining TagGroup with the Toast component to provide users with the ability to reverse tag removal actions.

## Implementation Pattern

The undo feature for TagGroup typically follows this pattern:

1. **Tag Removal**: User removes a tag via the remove button or keyboard shortcut
2. **Immediate Removal**: Tag is removed from the UI and state
3. **Toast Notification**: A toast appears with an "Undo" action
4. **Undo Action**: User can click "Undo" to restore the removed tag
5. **Auto-dismiss**: Toast automatically disappears after a timeout if no action is taken

## Basic Implementation

### 1. State Management

```tsx
import React, { useState, useCallback } from 'react';
import { TagGroup, Item } from '@react-spectrum/tag';
import { ToastQueue } from '@react-spectrum/toast';

function TagGroupWithUndo() {
  const [items, setItems] = useState([
    { id: 1, name: 'News' },
    { id: 2, name: 'Travel' },
    { id: 3, name: 'Gaming' },
    { id: 4, name: 'Shopping' }
  ]);

  // Store removed items for potential undo
  const [removedItems, setRemovedItems] = useState([]);

  const handleRemove = useCallback((keys) => {
    // Find items being removed
    const itemsToRemove = items.filter(item => keys.has(item.id));
    
    // Store removed items for undo
    setRemovedItems(prev => [...prev, ...itemsToRemove]);
    
    // Remove from current items
    setItems(prev => prev.filter(item => !keys.has(item.id)));
    
    // Show undo toast
    ToastQueue.negative('Tag removed', {
      actionLabel: 'Undo',
      onAction: () => handleUndo(itemsToRemove)
    });
  }, [items]);

  const handleUndo = useCallback((itemsToRestore) => {
    // Restore items
    setItems(prev => [...prev, ...itemsToRestore]);
    
    // Remove from removed items
    setRemovedItems(prev => 
      prev.filter(item => 
        !itemsToRestore.some(restored => restored.id === item.id)
      )
    );
    
    // Show confirmation toast
    ToastQueue.positive('Tag restored');
  }, []);

  return (
    <TagGroup
      label="Categories"
      items={items}
      onRemove={handleRemove}
    >
      {item => <Item>{item.name}</Item>}
    </TagGroup>
  );
}
```

### 2. Advanced Implementation with Multiple Undo Support

```tsx
import React, { useState, useCallback, useRef } from 'react';
import { TagGroup, Item } from '@react-spectrum/tag';
import { ToastQueue } from '@react-spectrum/toast';

function AdvancedTagGroupWithUndo() {
  const [items, setItems] = useState([
    { id: 1, name: 'News' },
    { id: 2, name: 'Travel' },
    { id: 3, name: 'Gaming' },
    { id: 4, name: 'Shopping' }
  ]);

  // Use ref to store undo actions
  const undoActions = useRef([]);

  const handleRemove = useCallback((keys) => {
    // Find items being removed
    const itemsToRemove = items.filter(item => keys.has(item.id));
    
    // Create undo action
    const undoAction = {
      id: Date.now(),
      items: itemsToRemove,
      execute: () => {
        setItems(prev => [...prev, ...itemsToRemove]);
        ToastQueue.positive('Tags restored');
      }
    };
    
    // Store undo action
    undoActions.current.push(undoAction);
    
    // Remove from current items
    setItems(prev => prev.filter(item => !keys.has(item.id)));
    
    // Show undo toast
    ToastQueue.negative(
      `${itemsToRemove.length} tag${itemsToRemove.length > 1 ? 's' : ''} removed`,
      {
        actionLabel: 'Undo',
        onAction: () => {
          undoAction.execute();
          // Remove this undo action from the stack
          undoActions.current = undoActions.current.filter(
            action => action.id !== undoAction.id
          );
        }
      }
    );
  }, [items]);

  return (
    <TagGroup
      label="Categories"
      items={items}
      onRemove={handleRemove}
    >
      {item => <Item>{item.name}</Item>}
    </TagGroup>
  );
}
```

### 3. Implementation with useListData Hook

```tsx
import React from 'react';
import { TagGroup, Item } from '@react-spectrum/tag';
import { ToastQueue } from '@react-spectrum/toast';
import { useListData } from '@react-stately/data';

function TagGroupWithListData() {
  const list = useListData({
    initialItems: [
      { id: 1, name: 'News' },
      { id: 2, name: 'Travel' },
      { id: 3, name: 'Gaming' },
      { id: 4, name: 'Shopping' }
    ]
  });

  const handleRemove = (keys) => {
    // Find items being removed
    const itemsToRemove = list.items.filter(item => keys.has(item.id));
    
    // Remove items
    list.remove(...keys);
    
    // Show undo toast
    ToastQueue.negative('Tag removed', {
      actionLabel: 'Undo',
      onAction: () => {
        // Restore items
        list.append(...itemsToRemove);
        ToastQueue.positive('Tag restored');
      }
    });
  };

  return (
    <TagGroup
      label="Categories"
      items={list.items}
      onRemove={handleRemove}
    >
      {item => <Item>{item.name}</Item>}
    </TagGroup>
  );
}
```

## Key Features

### 1. Toast Integration
- Use `ToastQueue.negative()` for removal notifications
- Use `ToastQueue.positive()` for undo confirmations
- Include `actionLabel` and `onAction` props for undo functionality

### 2. State Management
- Store removed items temporarily for undo capability
- Use `useCallback` to prevent unnecessary re-renders
- Consider using `useListData` for complex state management

### 3. User Experience
- Provide clear feedback when tags are removed
- Show confirmation when undo is successful
- Handle multiple removals gracefully

## Accessibility Considerations

### 1. Screen Reader Support
- Toast notifications are automatically announced to screen readers
- Use descriptive action labels like "Undo" instead of generic terms
- Ensure undo actions are keyboard accessible

### 2. Focus Management
- Focus remains on the TagGroup after removal
- Undo action in toast is focusable and accessible
- Consider focus management when restoring tags

## Best Practices

### 1. Timing
- Show undo toast immediately after removal
- Set appropriate timeout for auto-dismiss (default is usually 5 seconds)
- Clear undo state when toast expires

### 2. Multiple Removals
- Handle batch removals with appropriate messaging
- Show count of removed items in toast
- Allow undo of entire batch or individual items

### 3. Error Handling
- Handle cases where undo might fail
- Provide fallback behavior if undo is not possible
- Clear undo state on component unmount

## Example with Error Handling

```tsx
import React, { useState, useCallback } from 'react';
import { TagGroup, Item } from '@react-spectrum/tag';
import { ToastQueue } from '@react-spectrum/toast';

function RobustTagGroupWithUndo() {
  const [items, setItems] = useState([
    { id: 1, name: 'News' },
    { id: 2, name: 'Travel' },
    { id: 3, name: 'Gaming' },
    { id: 4, name: 'Shopping' }
  ]);

  const [removedItems, setRemovedItems] = useState([]);

  const handleRemove = useCallback((keys) => {
    try {
      const itemsToRemove = items.filter(item => keys.has(item.id));
      
      if (itemsToRemove.length === 0) {
        ToastQueue.negative('No items to remove');
        return;
      }
      
      setRemovedItems(prev => [...prev, ...itemsToRemove]);
      setItems(prev => prev.filter(item => !keys.has(item.id)));
      
      ToastQueue.negative('Tag removed', {
        actionLabel: 'Undo',
        onAction: () => handleUndo(itemsToRemove)
      });
    } catch (error) {
      console.error('Error removing tag:', error);
      ToastQueue.negative('Failed to remove tag');
    }
  }, [items]);

  const handleUndo = useCallback((itemsToRestore) => {
    try {
      setItems(prev => [...prev, ...itemsToRestore]);
      setRemovedItems(prev => 
        prev.filter(item => 
          !itemsToRestore.some(restored => restored.id === item.id)
        )
      );
      ToastQueue.positive('Tag restored');
    } catch (error) {
      console.error('Error undoing removal:', error);
      ToastQueue.negative('Failed to restore tag');
    }
  }, []);

  return (
    <TagGroup
      label="Categories"
      items={items}
      onRemove={handleRemove}
    >
      {item => <Item>{item.name}</Item>}
    </TagGroup>
  );
}
```

## Integration with ToastContainer

Make sure to include the `ToastContainer` component in your app root:

```tsx
import { Provider } from '@react-spectrum/provider';
import { ToastContainer } from '@react-spectrum/toast';

function App() {
  return (
    <Provider theme={lightTheme}>
      {/* Your app content */}
      <ToastContainer />
    </Provider>
  );
}
```

## Conclusion

The undo feature for TagGroup is not built-in but can be easily implemented using the Toast component. This pattern provides users with a safety net for accidental tag removals while maintaining a clean and intuitive user experience. The key is to properly manage state, provide clear feedback, and handle edge cases gracefully.