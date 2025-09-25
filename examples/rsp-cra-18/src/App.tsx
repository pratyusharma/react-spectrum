import './App.css';
import {
  Provider, 
  defaultTheme,
  View,
  Flex,
  Heading,
  ActionButton
} from '@adobe/react-spectrum';
import {useState} from 'react';
import {TagGroupUndoDemo} from './TagGroupUndoDemo';

// Use default theme with dark color scheme
const cursorTheme = defaultTheme;

function App() {
  let [selected, setSelection] = useState(false);

  return (
    <Provider theme={cursorTheme} colorScheme="dark">
      <div 
        className="content-padding"
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #171717 50%, #262626 100%)',
          minHeight: '100vh',
          color: '#fafafa'
        }}>
        <Flex 
          justifyContent="space-between" 
          alignItems="center" 
          marginBottom="size-500"
          gap="size-200">
          <h1 className="gradient-heading">
            React Spectrum TagGroup Undo Feature Demo
          </h1>
          <button 
            className="theme-toggle"
            onClick={() => setSelection(!selected)}>
            {selected ? '🌙 Dark' : '☀️ Light'} Theme
          </button>
        </Flex>
        <TagGroupUndoDemo />
      </div>
    </Provider>
  );
}

export default App;
