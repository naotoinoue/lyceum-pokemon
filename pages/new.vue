<script setup>
const onClick = async ()=>{
  const respones = await fetch("/api/trainer",{
    method:'POST',
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      "name":"noato"
    })
    
  })

  
}


</script>
<template>
  <div>
    <h1>あたらしくはじめる</h1>
    では　はじめに　きみの　なまえを　おしえて　もらおう！
    <form @submit.prevent="onClick">
      なまえ
      とくていの　もじは　とりのぞかれるぞ！
      <input>
      <button type="submit">けってい</button>
    </form>
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
