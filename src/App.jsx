import { memo, useCallback, useEffect, useState } from 'react';
import './App.css';

const LETTERS = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

const KeyboardKey = memo(({ letter, onClick, isActive }) => {
  return (
    <div>
      <button
        className={`key ${isActive ? 'active' : ''}`}
        onClick={() => onClick(letter)}
      >
        {letter}
      </button>
    </div>
  );
});
KeyboardKey.displayName = 'KeyboardKey';

function App() {
  const [input, setInput] = useState('');
  const [activeKey, setActiveKey] = useState(null);

  const backspaceHandler = useCallback(() => {
    setInput((prev) => prev.slice(0, -1));
  }, []);

  const keyPressHandler = useCallback((letter) => {
    setInput((prev) => prev + letter);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const key = e.key.toUpperCase();

      if (key === 'BACKSPACE') {
        e.preventDefault();
        setActiveKey('BACKSPACE');
        backspaceHandler();
      } else if (LETTERS.includes(key)) {
        e.preventDefault();
        setActiveKey(key);
        keyPressHandler(key);
      }
    };

    const handleKeyUp = () => {
      setActiveKey(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [backspaceHandler, keyPressHandler]);

  return (
    <div className="app">
      <div className="container">
        <header style={{ textAlign: 'center' }}>
          <h1 className="title">Alphabet Buttons</h1>
          {/* 1. FIXED TYPO HERE (from subtititle to subtitle) to match test expectations */}
          <p className="subtitle">
            Click letters (or use keyboard) to build text
          </p>
        </header>
        <main
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            width: '100%',
          }}
        >
          <div className="input-section">
            {/* 2. ADDED '.output' CLASS HERE so Cypress can find it using cy.get('.output') */}
            <input
              type="text"
              className="output"
              style={{
                width: '100%',
                borderRadius: '5px',
                padding: '10px',
                fontSize: '18px',
                boxSizing: 'border-box',
              }}
              onChange={(e) => setInput(e.target.value.toUpperCase())}
              value={input}
              placeholder="Type anywhere..."
            />
            <button
              className={`backspace-btn ${activeKey === 'BACKSPACE' ? 'active' : ''}`}
              onClick={backspaceHandler}
            >
              Backspace
            </button>
          </div>
          <div className="keyboard">
            {LETTERS.map((l) => (
              <KeyboardKey
                key={l}
                letter={l}
                onClick={keyPressHandler}
                isActive={activeKey === l}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
