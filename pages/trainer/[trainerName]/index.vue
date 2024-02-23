<script setup>
  const trainerName = useRoute().params.trainerName;
  const { data:trainer } = await useTrainer(trainerName);
  const trainerObj = JSON.parse(trainer.value);
  const pokemons = trainerObj.pokemons;

</script>

<template>
  <div>
    <h1>トレーナー情報</h1>
    {{ $trainerName }}
    <br>
    <GamifyButton>マサラタウンにかえる</GamifyButton>
    <br>
    <h1>てもちポケモン</h1>
    <CatchButton :to="`/trainer/${trainerName}/pokemonlist`">ポケモンをつかまえる</CatchButton>
    <GamifyList>
      <GamifyItem v-for="pokemon in pokemons" :key="pokemon.id">
        <img :src="`${pokemon.sprites.front_default}`">
        {{ pokemon.id }} {{ pokemon.name }} {{ pokemon.nickname }} 
        <GamifyButton>ニックネームをつける</GamifyButton>
        <GamifyButton>はかせにおくる</GamifyButton>
      </GamifyItem>
    </GamifyList>
  </div>
</template>
