import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fetchPokemonData } from '../data/pokemon'
import confetti from 'canvas-confetti'

const HealthBar = ({ current, max, name }) => (
    <div style={{ marginBottom: '10px' }}>
        <p style={{ fontSize: '8px', marginBottom: '5px' }}>{name} HP: {current}/{max}</p>
        <div style={{ width: '100%', height: '10px', backgroundColor: '#333', border: '2px solid black' }}>
            <motion.div
                initial={{ width: '100%' }}
                animate={{ width: `${(current / max) * 100}%` }}
                style={{
                    height: '100%',
                    backgroundColor: current / max > 0.5 ? '#4caf50' : current / max > 0.2 ? '#ffeb3b' : '#f44336'
                }}
            />
        </div>
    </div>
)

const Battle = () => {
    const [gameState, setGameState] = useState('selection') // selection, fighting, result
    const [allPokemon, setAllPokemon] = useState([])
    const [choices, setChoices] = useState([])
    const [userPokemon, setUserPokemon] = useState(null)
    const [boss, setBoss] = useState(null)
    const [userHP, setUserHP] = useState(0)
    const [bossHP, setBossHP] = useState(0)
    const [logs, setLogs] = useState(['Inizia la sfida!'])
    const [isUserTurn, setIsUserTurn] = useState(true)

    useEffect(() => {
        fetchPokemonData().then(data => {
            setAllPokemon(data)
            const shuffled = [...data].sort(() => 0.5 - Math.random())
            setChoices(shuffled.slice(0, 3))
        })
    }, [])

    const startBattle = (pokemon) => {
        const bossPokemon = allPokemon.find(p => p.id === 150) || allPokemon[Math.floor(Math.random() * allPokemon.length)]
        setUserPokemon(pokemon)
        setBoss({ ...bossPokemon, hp: 200 }) // Buffed boss
        setUserHP(pokemon.hp)
        setBossHP(200)
        setGameState('fighting')
        setLogs([`Hai scelto ${pokemon.name.toUpperCase()}!`, `Un potente ${bossPokemon.name.toUpperCase()} appare!`])
    }

    const handleAttack = () => {
        if (!isUserTurn || gameState !== 'fighting') return

        // User Attacks
        const damage = Math.floor(userPokemon.attack / 2 + Math.random() * 10)
        const newBossHP = Math.max(0, bossHP - damage)
        setBossHP(newBossHP)
        setLogs(prev => [`${userPokemon.name.toUpperCase()} attacca e infligge ${damage} danni!`, ...prev])

        if (newBossHP === 0) {
            setGameState('result')
            setLogs(prev => [`IL BOSS È STATO SCONFITTO!`, ...prev])
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            })
            return
        }

        setIsUserTurn(false)

        // Boss Counter-Attack after delay
        setTimeout(() => {
            const bossDamage = Math.floor(boss.attack / 3 + Math.random() * 15)
            const newUserHP = Math.max(0, userHP - bossDamage)
            setUserHP(newUserHP)
            setLogs(prev => [`BOSS ${boss.name.toUpperCase()} contrattacca: ${bossDamage} danni!`, ...prev])

            if (newUserHP === 0) {
                setGameState('result')
                setLogs(prev => [`SEI STATO SCONFITTO...`, ...prev])
            } else {
                setIsUserTurn(true)
            }
        }, 1000)
    }

    if (gameState === 'selection') {
        return (
            <div style={{ textAlign: 'center' }}>
                <h2 style={{ marginBottom: '30px' }}>SCEGLI IL TUO POKEMON</h2>
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {choices.map(p => (
                        <div key={p.id} className="pixel-card" style={{ width: '150px' }}>
                            <img src={p.sprite} alt={p.name} style={{ width: '100px' }} />
                            <p style={{ fontSize: '10px' }}>{p.name.toUpperCase()}</p>
                            <button
                                className="pixel-button"
                                style={{ marginTop: '10px', width: '100%' }}
                                onClick={() => startBattle(p)}
                            >SCEGLI</button>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
                {/* User Stats */}
                <div style={{ width: '45%' }}>
                    <img src={userPokemon.sprite} alt={userPokemon.name} style={{ width: '120px' }} />
                    <HealthBar current={userHP} max={userPokemon.hp} name={userPokemon.name.toUpperCase()} />
                </div>

                {/* Boss Stats */}
                <div style={{ width: '45%', textAlign: 'right' }}>
                    <img src={boss.sprite} alt={boss.name} style={{ width: '120px', filter: 'hue-rotate(90deg)' }} />
                    <HealthBar current={bossHP} max={200} name={"BOSS " + boss.name.toUpperCase()} />
                </div>
            </div>

            <div className="pixel-card" style={{ height: '150px', overflowY: 'auto', marginBottom: '20px', backgroundColor: '#eee' }}>
                {logs.map((log, i) => (
                    <p key={i} style={{ fontSize: '8px', marginBottom: '5px', borderBottom: '1px solid #ccc' }}>{log}</p>
                ))}
            </div>

            <div style={{ textAlign: 'center' }}>
                {gameState === 'fighting' ? (
                    <button
                        className="pixel-button"
                        onClick={handleAttack}
                        disabled={!isUserTurn}
                        style={{ opacity: isUserTurn ? 1 : 0.5 }}
                    >ATTACCA!</button>
                ) : (
                    <button
                        className="pixel-button"
                        onClick={() => window.location.reload()}
                    >GIOCA ANCORA</button>
                )}
            </div>
        </div>
    )
}

export default Battle
