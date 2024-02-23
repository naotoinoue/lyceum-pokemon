<script setup>
//トレーナー一覧を取得する

// userTrainers()がuserFetchの返り値を返しているため、const {data}でデータを受け取る。
// userFetchはnuxt3で利用できるfetchのラッパー。
const { data:trainers } = await useTrainers();
</script>


<template>
  <div>
    <h1>つづきからはじめる</h1>
    <!-- トレーナー一覧を表示する
    トレーナーの画面へのリンクを生成する -->
    <GamifyList>
      <GamifyItem v-for="trainer in trainers" :key="trainer">
        <!-- ★toの前に:が必要だったことが判明 ← わかるまで結構時間かかった -->
        <NuxtLink :to="`/trainer/${trainer}`">{{ trainer }}</NuxtLink>
      </GamifyItem>
    </GamifyList>

  </div>
</template>

<style scoped>
form {
  border-radius: 0.5rem;
  border: solid 4px #555;
  padding: 1.5rem 3rem;
}

form > :not(:last-child) {
  display: block;
  margin-bottom: 1rem;
}

.item > label,
.item > span {
  display: block;
  margin-bottom: 0.25rem;
}
.item > span {
  font-size: 0.875rem;
}
</style>
