import { useState, useEffect } from 'react'
import Home from './components/Home'
import Pokedex from './components/Pokedex'
import Battle from './components/Battle'

function App() {
  const [currentTab, setCurrentTab] = useState('home');

  return (
    <div className="app-container">
      <div className="scanlines"></div>

      <header style={{
        padding: '20px',
        backgroundColor: 'var(--pokered)',
        borderBottom: '4px solid black',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100
      }}>
        <h1 style={{ fontSize: '18px', color: 'white' }}>POKEDEX</h1>
        <nav style={{ display: 'flex', gap: '10px' }}>
          <button
            className="pixel-button"
            onClick={() => setCurrentTab('home')}
            style={{ backgroundColor: currentTab === 'home' ? 'var(--pokeyellow)' : 'var(--pokered)' }}
          >HOME</button>
          <button
            className="pixel-button"
            onClick={() => setCurrentTab('pokedex')}
            style={{ backgroundColor: currentTab === 'pokedex' ? 'var(--pokeyellow)' : 'var(--pokered)' }}
          >DEX</button>
          <button
            className="pixel-button"
            onClick={() => setCurrentTab('battle')}
            style={{ backgroundColor: currentTab === 'battle' ? 'var(--pokeyellow)' : 'var(--pokered)' }}
          >BATTLE</button>
        </nav>
      </header>

      <main style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        {currentTab === 'home' && <Home onStart={() => setCurrentTab('pokedex')} />}
        {currentTab === 'pokedex' && <Pokedex />}
        {currentTab === 'battle' && <Battle />}
      </main>

      <footer style={{
        padding: '10px',
        textAlign: 'center',
        fontSize: '8px',
        borderTop: '4px solid black',
        backgroundColor: '#1a1a1a'
      }}>
        © 2026 PIXEL POKEDEX - OAK LABS
      </footer>
    </div>
  )
}

export default App
