<script setup>
    const response = await fetch("https://pokeapi.co/api/v2/pokemon");
    const resBody = await response.json();
    const pokemons = resBody.results;

    const onClick = async(pokemonName)=>{
        console.log("onClick pokemonName: "+pokemonName);
        const trainerName = useRoute().params.trainerName;
        console.log("trainerName:"+trainerName);
        const { data:result } = await useAddPokemon( trainerName, pokemonName);
    }
</script>

<template>
  <div>
    <h1>ポケモンをつかまえる</h1>
    <br>
    <GamifyList>
      <GamifyItem v-for="pokemon in pokemons" :key="pokemon.id">
        {{ pokemon.id }} {{ pokemon.name }} 
        <GamifyButton @click="onClick(pokemon.name)">つかまえる</GamifyButton>
      </GamifyItem>
    </GamifyList>
  </div>
</template>