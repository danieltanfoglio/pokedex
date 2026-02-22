import { motion } from 'framer-motion'

const Home = ({ onStart }) => {
    return (
        <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            textAlign: 'center',
            padding: '40px 0'
        }}>
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="pixel-card"
                style={{ marginBottom: '30px' }}
            >
                <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Benvenuto!</h2>
                <p style={{ lineHeight: '1.6', fontSize: '10px' }}>
                    Questo è il Pokedex definitivo in stile Retrò.
                    Esplora i 50 Pokemon più famosi, scopri le loro abilità
                    e mettiti alla prova nella sezione Battle contro il Boss finale!
                </p>
            </motion.div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                <button className="pixel-button" onClick={onStart}>ESPLORA POKEDEX</button>
            </div>

            <div style={{ marginTop: '50px', opacity: 0.7 }}>
                <img
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
                    alt="Pikachu"
                    style={{ width: '120px', imageRendering: 'pixelated' }}
                />
            </div>
        </div>
    )
}

export default Home
