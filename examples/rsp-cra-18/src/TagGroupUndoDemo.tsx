import React, {useState, useCallback} from 'react';
import {
  Item, 
  TagGroup, 
  ToastContainer, 
  ToastQueue, 
  ActionButton,
  View,
  Heading,
  Text,
  Content,
  Flex,
  Well
} from '@adobe/react-spectrum';
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
    <View>
      <TagGroup
        aria-label="Categories with undo functionality"
        items={list.items}
        onRemove={handleRemove}>
        {(item: {id: string, name: string}) => <Item key={item.id}>{item.name}</Item>}
      </TagGroup>
      
      {removedItems.length > 0 && (
        <View marginTop="size-300">
          <button 
            className="undo-button"
            onClick={handleUndo}>
            {undoLabel}
          </button>
        </View>
      )}
    </View>
  );
}

export function TagGroupUndoDemo() {
  return (
    <View padding="size-400">
      <ToastContainer />
      
      <Content>
        <h2 className="section-heading">
          TagGroup Undo Demo
        </h2>
        
        <p className="section-description">
          Remove tags by clicking the X button or pressing Delete/Backspace. 
          Use the Undo button to restore the most recently removed tag.
        </p>
        
        <div className="glass-card">
          <UndoableTagGroup
            maxUndoCount={3}
            undoLabel="Undo"
          />
        </div>
        
        <div className="glass-card">
          <h3 className="features-heading">
            Features demonstrated:
          </h3>
          <div className="features-list">
            <p className="feature-item">✅ Remove tags by clicking X or pressing Delete/Backspace</p>
            <p className="feature-item">✅ Undo button appears when tags are removed</p>
            <p className="feature-item">✅ Toast notification with 😮‍💨 emoji on undo</p>
            <p className="feature-item">✅ Maximum of 3 removals can be undone</p>
            <p className="feature-item">✅ Original tag ordering is preserved</p>
            <p className="feature-item">✅ Console logging of restored items</p>
          </div>
        </div>
      </Content>
    </View>
  );
}
