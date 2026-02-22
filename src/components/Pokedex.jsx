import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fetchPokemonData } from '../data/pokemon'

const Pokedex = () => {
    const [pokemon, setPokemon] = useState([])
    const [selectedPokemon, setSelectedPokemon] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchPokemonData().then(data => {
            setPokemon(data)
            setLoading(false)
        })
    }, [])

    if (loading) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <p>CARICAMENTO DEX...</p>
            </div>
        )
    }

    return (
        <div>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                gap: '20px',
                padding: '10px'
            }}>
                {pokemon.map(p => (
                    <motion.div
                        key={p.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="pixel-card"
                        style={{
                            cursor: 'pointer',
                            textAlign: 'center',
                            backgroundColor: '#f8f8f8'
                        }}
                        onClick={() => setSelectedPokemon(p)}
                    >
                        <img src={p.sprite} alt={p.name} style={{ width: '80px', marginBottom: '10px' }} />
                        <p style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold' }}>
                            #{p.id} {p.name}
                        </p>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedPokemon && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000,
                        padding: '20px'
                    }} onClick={() => setSelectedPokemon(null)}>
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            className="pixel-card"
                            style={{
                                maxWidth: '400px',
                                width: '100%',
                                backgroundColor: 'white',
                                padding: '20px',
                                position: 'relative'
                            }}
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                className="pixel-button"
                                style={{
                                    position: 'absolute',
                                    top: '-10px',
                                    right: '-10px',
                                    padding: '5px 10px',
                                    minWidth: 'auto'
                                }}
                                onClick={() => setSelectedPokemon(null)}
                            >X</button>

                            <div style={{ textAlign: 'center' }}>
                                <img src={selectedPokemon.sprite} alt={selectedPokemon.name} style={{ width: '150px' }} />
                                <h3 style={{ marginBottom: '20px' }}>{selectedPokemon.name}</h3>

                                <div style={{ textAlign: 'left', fontSize: '10px', lineHeight: '2' }}>
                                    <p><strong>PUNTI VITA:</strong> {selectedPokemon.hp}</p>
                                    <p><strong>PUNTI DANNO:</strong> {selectedPokemon.attack}</p>
                                    <p><strong>ABILITÀ:</strong> {selectedPokemon.abilities.join(', ')}</p>
                                    <p><strong>TIPO:</strong> {selectedPokemon.types.join(' / ')}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Pokedex
