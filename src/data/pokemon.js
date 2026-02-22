export const TOP_POKEMON_IDS = [
  1, 4, 7, 25, 39, 52, 54, 63, 66, 74, 
  92, 94, 95, 129, 130, 131, 133, 143, 150, 151,
  152, 155, 158, 175, 182, 196, 197, 212, 214, 248,
  249, 250, 252, 255, 258, 280, 282, 302, 306, 330,
  350, 359, 373, 376, 380, 381, 382, 383, 384, 448
];

// Helper to get image URL
export const getPokemonSprite = (id) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

// This will be fetched or kept static for performance
export const fetchPokemonData = async () => {
  const promises = TOP_POKEMON_IDS.slice(0, 50).map(id => 
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json())
  );
  const results = await Promise.all(promises);
  return results.map(p => ({
    id: p.id,
    name: p.name,
    sprite: p.sprites.front_default,
    hp: p.stats.find(s => s.stat.name === 'hp').base_stat,
    attack: p.stats.find(s => s.stat.name === 'attack').base_stat,
    abilities: p.abilities.map(a => a.ability.name),
    types: p.types.map(t => t.type.name),
  }));
};
