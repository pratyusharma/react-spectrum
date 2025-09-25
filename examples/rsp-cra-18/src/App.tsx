import './App.css';
import {Provider, defaultTheme} from '@adobe/react-spectrum';
import {useState} from 'react';
import {TagGroupUndoDemo} from './TagGroupUndoDemo';

function App() {
  let [selected, setSelection] = useState(false);

  return (
    <Provider theme={defaultTheme}
              colorScheme={selected ? "light" : "dark"}>
      <div className="content-padding">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
          <h1>React Spectrum TagGroup Undo Feature Demo</h1>
          <button 
            onClick={() => setSelection(!selected)}
            style={{
              padding: '8px 16px',
              backgroundColor: selected ? '#333' : '#fff',
              color: selected ? '#fff' : '#333',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
            {selected ? 'Dark' : 'Light'} Theme
          </button>
        </div>
        <TagGroupUndoDemo />
      </div>
    </Provider>
  );
}

export default App;
