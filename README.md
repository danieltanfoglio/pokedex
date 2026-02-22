# Pixel Pokedex Walkthrough

## 1. Sistema di Design Retro

   - Estetica Pixelata: Utilizzo di image-rendering: pixelated; e del font "Press Start 2P".
   - Overlay Granulare: Aggiunto un filtro rumore SVG animato per un effetto "vintage cartoon".
   - Linee di Scansione CRT: Implementato un overlay a linee (scanlines) per completare il look retro.

## 2. Griglia del Pokédex

  - Visualizzazione di 50 celebri Pokémon recuperati tramite PokeAPI.
  - Modale Dettagliata: Cliccando su un Pokémon si apre un popup con HP, Attacco e Abilità.
    
## 3. Sistema di Battaglia

   - Fase di Selezione: Scelta tra 3 Pokémon generati casualmente.
   - Scontro con il Boss: Battaglia contro un potente Boss (Mewtwo) con logica a turni.
   - Feedback Visivo: Le barre della salute si animano in base al danno e un registro (log) traccia l'andamento dello scontro.
   - Stato di Vittoria: Celebrazione con coriandoli (confetti) alla sconfitta del boss.

# Risultati della Verifica
### Build e Funzionalità

  - Comando `npm run build` eseguito con successo.
  - Tutti i componenti (Home, Dex, Battle) sono responsive e funzionanti.
  - Dimostrazione dell'interfaccia utente completata.

## Galleria

- **Homepage**
![Homepage](home.png)

- **Pokedex Grid**
![Pokedex Grid](griglia.png)

- **Pokemon Details**
![Pokemon Details](modello.png)

- **Battle Selection**
![Battle Selection](battaglia.png)

- **Battle vs Mewtwo**
![Battle vs Mewtwo](<schermo battaglia.png>)

### Video Tutorial
![Demo Video](video.webp)

