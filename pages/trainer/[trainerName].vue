<script setup></script>

<template>
  <div>
    <h1>トレーナー情報</h1>
    {{ $route.params.trainerName }}

    <GamifyList>
      <GamifyItem>
        <!-- <NuxtLink to="/trainer">つづきからはじめる</NuxtLink> -->
      </GamifyItem>
      <GamifyItem>
        <!-- <NuxtLink to="/new">あたらしくはじめる</NuxtLink> -->
      </GamifyItem>
    </GamifyList>
  </div>
</template>
