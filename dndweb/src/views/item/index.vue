<template>
  <div>
    <div class="header">
      物品列表
    </div>
    <div class="cateWrap">
      <div v-for="(item,index) in cateList" :key="index" class="border-container" @click="goitemList(item)">
      {{ item.name }}
    </div>
    </div>
  </div>
</template>
<script setup>
import { getCurrentInstance, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
const { proxy } = getCurrentInstance()
const router = useRouter()
const getList = async () => {
    const res = await proxy.$api.getItemCate()
  return res.data
}
let cateList = ref({})
const goitemList = (item) => {
  router.push({
    name:'ItemList',
    query: {
      id:item.id
    }
  })
}
onMounted( async() => {
  cateList.value = await getList()
})
</script>

<style scoped lang="scss">
.header{
  background-color: #fafafa;
  padding: 10px;
  text-align: center;
  color: #666;
}
.cateWrap>div{
  padding: 10px;
  text-align: center;
  color: #666;
  // border-bottom: 1px solid rgba(0,0,0,0.1); 
  margin-bottom: 12px;
}
.border-container {
    --angle: 0deg;
    border-width: 5px;
    border-style: dotted;
    border-color: grey;
    border-image-source: linear-gradient(
      var(--angle),
      #900000,
      #ee2400,
      #ffb09c 20rem
    );
    border-image-slice: 1;
    -webkit-animation: 10s rotate linear infinite;
            animation: 10s rotate linear infinite;
}
@-webkit-keyframes rotate {
    to {
      --angle: 360deg;
    }
}
@keyframes rotate {
    to {
      --angle: 360deg;
    }
}
@property --angle { 
    syntax: "<angle>";
    initial-value: 0deg;
    inherits: false;
}
</style>