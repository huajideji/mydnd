<template>
  <div>
    <div class="header">
      <div class="back" @click="router.push('Item')">返回</div>
      <h2>{{ typename }}列表</h2>
    </div>
    <div class="search-wrap">
      <Search style="width: 1em; height: 1em; margin-right: 8px" />
      <input
        type="text"
        placeholder="请输入名称"
        class="searchInput"
        v-model="searchName"
      />
      <span class="search-button" @click="searchItem">搜索</span>
    </div>
    <div>
      <div v-for="(item,index) in itemList" :key="index">
        <div class="cateWrap" @click="item.showdata = !item.showdata">
          {{ item.typename }}
          <span v-if="item.showdata"><ArrowUpBold style="width: 1em; height: 1em; margin-right: 8px" /></span>
          <span v-if="!item.showdata"><ArrowDownBold style="width: 1em; height: 1em; margin-right: 8px" /></span>
        </div>
        <div
        v-for="(items, indexs) in item.list" :key="indexs"
        class="single-item"
        @click="godetail(items)"
        v-show="item.showdata"
      >
        <span>{{ items.name }}</span>
        <span style="margin: 15px;">{{ items.price+'gp' }}</span>
        <span>{{ items.weight+'磅' }}</span>

      </div>
      </div>
     
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const { proxy } = getCurrentInstance();
const router = useRouter();
let searchName = ref("");
let itemList = ref([]);
let cateId = ref(1);
let typename = ref("");
const getList = async (type) => {
  const res = await proxy.$api.getItemList(type);
  return res.data;
};
const godetail = (item) => {
  router.push({
    name: "ItemDetail",
    query: {
      id: item.id,
      cateId:cateId.value
    },
  });
};
const searchItem = async () => {
  let params = {
    name: searchName.value,
    cateId: cateId.value,
    id:''
  };
  const res = await proxy.$api.searchItemList(params);
  itemList.value = res.data;
};
const handleWeaponType = (list) => {
  itemList.value.length = 4
  let arr = [{
    typename: '简易近战武器',
    showdata:false,
  },{
    typename: '简易远程武器',
    showdata:false,
  },{
    typename: '军用近战武器',
    showdata:false,
  },{
    typename: '军用远程武器',
    showdata:false,
  }]
  for (let i = 0; i < arr.length; i++){
    arr[i].list = []
  }
  list.forEach((item,index) => {
    arr[parseInt(item.type)-1].list.push(item)
  });
  itemList.value = arr
}
const handleArmorType = (list) => {
  itemList.value.length = 3
  let arr = [{
    typename: '轻甲',
    showdata:false,
  },{
    typename: '中甲',
    showdata:false,
  },{
    typename: '重甲',
    showdata:false,
  }]
  for (let i = 0; i < arr.length; i++){
    arr[i].list = []
  }
  list.forEach((item,index) => {
    arr[parseInt(item.armorType)-1].list.push(item)
  });
  itemList.value = arr
  console.log(itemList.value)
}
onMounted(async () => {
  let params
  if (router.currentRoute.value.query.id) {
    cateId.value = router.currentRoute.value.query.id;
    params = {
      type: cateId.value,
    };
  }
  let resdata =  await getList(params);
  // itemList.value = await getList(params);
  switch (parseInt(params.type)) {
    case 1:
      typename.value = "武器"
      handleWeaponType(resdata);
      break;
    case 2:
      typename.value = "防具";
      handleArmorType(resdata);
      break;
    case 3:
      typename.value = "药水";
      break;
    case 4:
      typename.value = "卷轴";
      break;
    case 5:
      typename.value = "魔法物品";
      break;
    case 6:
      typename.value = "杂物";
      break;
  }
});
</script>

<style lang="scss" scoped>
.cateWrap{
  width: 100%;
  background:  linear-gradient(135deg, #c850c0, #4158d080);
  padding: 10px;
  color: #fff;
  text-align: center;
  margin-top: 10px;
}
.search-wrap {
  display: flex;
  align-items: center;
  border: 1px solid #666;
  width: 80%;
  padding: 4px 8px;
  margin: auto;
  border-radius: 8px;
  .search-button {
    display: block;
    background-color: #79bbff;
    color: #fff;
    padding: 5px 20px;
    border-radius: 6px;
    font-size: 14px;
    flex-shrink: 0;
  }
}
.searchInput {
  border: 0px;
  outline: none;
  width: 80%;
}
.back {
  position: absolute;
  left: 20px;
  font-size: 16px;
  top: 18px;
}
.header {
  padding: 10px;
  text-align: center;
  background-color: #fff;
  color: #666;
  position: relative;
}
.single-item {
  padding: 10px;
  width: 80%;
  margin: auto;
  margin-top: 12px;
  color: #666;
  text-align: center;
  border-radius: 8px;
  background-color: #fafafa;
  // border-bottom: 1px solid #999;
}
</style>  