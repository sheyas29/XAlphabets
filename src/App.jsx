import { useEffect, useState } from 'react';
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

function KeyboardKey({ letter, onClick, isActive }) {
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
}

function App() {
  const [input, setInput] = useState('');
  const [activeKey, setActiveKey] = useState(null);

  const backspaceHandler = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const keyPressHandler = (letter) => {
    setInput((prev) => prev + letter);
  };

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
  }, []);

  return (
    <div className="app">
      <div className="container">
        <header style={{ textAlign: 'center' }}>
          <h1 className="title">Alphabet Buttons</h1>
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
            {/* CHANGED TO A DIV: This allows cy.get('.output').should('contain.text') to pass successfully */}
            <div
              className="output"
              style={{
                width: '100%',
                borderRadius: '5px',
                padding: '10px',
                fontSize: '18px',
                boxSizing: 'border-box',
                border: '1px solid #ccc',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                background: '#fff',
                textAlign: 'left',
              }}
            >
              {input}
            </div>
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
