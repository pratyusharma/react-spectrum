import React, {useState, useCallback} from 'react';
import {Item, TagGroup, ToastContainer, ToastQueue, ActionButton} from '@adobe/react-spectrum';
import {useListData} from '@react-stately/data';
import {Key} from '@react-types/shared';

function UndoableTagGroup({ maxUndoCount = 3, undoLabel = 'Undo' }: { maxUndoCount?: number, undoLabel?: string }) {
  const list = useListData({
    initialItems: [
      {id: '1', name: 'News'},
      {id: '2', name: 'Travel'},
      {id: '3', name: 'Gaming'},
      {id: '4', name: 'Shopping'},
      {id: '5', name: 'Technology'},
      {id: '6', name: 'Sports'},
      {id: '7', name: 'Music'},
      {id: '8', name: 'Movies'}
    ]
  });

  const [removedItems, setRemovedItems] = useState<Array<{item: {id: string, name: string}, originalIndex: number}>>([]);

  const handleRemove = useCallback((keys: Set<Key>) => {
    console.log('handleRemove called with keys:', keys);
    const keysToRemove = Array.from(keys);
    
    // Keys are already strings, so we can use them directly
    const itemsToRemove = list.items.filter(item => keysToRemove.includes(item.id));
    
    console.log('Keys to remove:', keysToRemove);
    console.log('Items to remove:', itemsToRemove);
    console.log('Current list items before removal:', list.items);
    
    // Store removed items for undo
    itemsToRemove.forEach(item => {
      const originalIndex = list.items.findIndex(i => i.id === item.id);
      setRemovedItems(prev => {
        const newRemovedItems = [...prev, {item, originalIndex}];
        // Respect maxUndoCount limit
        if (newRemovedItems.length > maxUndoCount) {
          return newRemovedItems.slice(-maxUndoCount);
        }
        return newRemovedItems;
      });
    });

    // Remove items from the list using string keys
    list.remove(...keysToRemove);
    
    console.log('List items after removal:', list.items);
  }, [list, maxUndoCount]);

  const handleUndo = useCallback(() => {
    if (removedItems.length === 0) return;
    
    const lastRemoved = removedItems[removedItems.length - 1];
    
    // Restore the item at its original position
    list.insert(lastRemoved.originalIndex, lastRemoved.item);
    
    // Remove from undo stack
    setRemovedItems(prev => prev.slice(0, -1));
    
    // Show success toast with tag name and 😮‍💨 emoji
    ToastQueue.positive(`Recovered ${lastRemoved.item.name} 😮‍💨`, {timeout: 1000});
    
    console.log('Item restored:', lastRemoved.item);
  }, [removedItems, list]);

  return (
    <div>
      <TagGroup
        aria-label="Categories with undo functionality"
        items={list.items}
        onRemove={handleRemove}>
        {(item: {id: string, name: string}) => <Item key={item.id}>{item.name}</Item>}
      </TagGroup>
      
      {removedItems.length > 0 && (
        <div style={{marginTop: '10px'}}>
          <ActionButton onPress={handleUndo}>
            {undoLabel}
          </ActionButton>
        </div>
      )}
    </div>
  );
}

export function TagGroupUndoDemo() {
  return (
    <div style={{padding: '20px'}}>
      <ToastContainer />
      <h2>TagGroup Undo Demo</h2>
      <p>Remove tags by clicking the X button or pressing Delete/Backspace. Use the Undo button to restore the most recently removed tag.</p>
      
      <UndoableTagGroup
        maxUndoCount={3}
        undoLabel="Undo"
      />
      
      <div style={{marginTop: '20px', fontSize: '14px', color: '#666'}}>
        <p>Features demonstrated:</p>
        <ul>
          <li>✅ Remove tags by clicking X or pressing Delete/Backspace</li>
          <li>✅ Undo button appears when tags are removed</li>
          <li>✅ Toast notification with 😮‍💨 emoji on undo</li>
          <li>✅ Maximum of 3 removals can be undone</li>
          <li>✅ Original tag ordering is preserved</li>
          <li>✅ Console logging of restored items</li>
        </ul>
      </div>
    </div>
  );
}
