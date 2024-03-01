
<template>
  <div class="indexwrap">
    <div class="cardwrap">
        <!-- <div class="single-card">
          <p>我是玩家</p>
        </div>
        <div class="single-card">
          <p>我是城主</p>
        </div> -->
        <div class="single-card" @click="goItem()">
          <!-- <img src="" alt=""> -->
          <p>物品查询</p>
        </div>
        <div class="single-card" @click="goSpell()">
          <!-- <img src="" alt=""> -->
          <p>法术速查 </p>
        </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
console.log(router)
const goItem = ()=> { 
  router.push('Item')
}
const goSpell = ()=> { 
  router.push('spellList')
}
</script>
<style scope lang="scss">
.indexwrap{
   background-color: #000;
   width: 100%;
   height: 100vh;
}
.cardwrap{
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  display: flex;
  justify-content: center;
  flex-wrap: wrap; 
  .single-card{
    padding: 10px 20px;
    // background-color:rgb(193, 210 ,240,0.2);
    border-radius: 8px;
    margin: 10px 12px;
    cursor: pointer;
    transition: 0.3s;
    color: #666;
    box-shadow: 2px 1px 30px rgb(193, 210 ,240);
    background-color:rgb(193, 210 ,240)
  }
  .single-card:hover{
   
  }
}
</style>