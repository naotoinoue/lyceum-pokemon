// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

/** ポケモンの取得 */
export const findPokemon = async (name) => {
  console.log("findPokemon : "+name);
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const pokemon = await response.json();
  // console.log("response : "+JSON.stringify(pokemon));
  return pokemon;
};
