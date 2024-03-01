<template>
  <div class="bg">
    <img src="../../assets/image/coner.png" alt="" class="conner conner1">
    <img src="../../assets/image/coner.png" alt="" class="conner conner2">
    <!-- <img src="../../assets/image/dragon.png" alt=""> -->
    <!-- <img src="../../assets/image/nameBorder.png" alt=""> -->
    <!-- <div class="header">
      <div class="back"  @click="backList">返回</div>
        
    </div> -->
    <div class="contentbody">
        <h2>{{ itemName }}</h2>
        <div class="msgwrap">
            <div v-for="(item,index) in itemMsgs" :key="index" class="singlewrap">
                <span class="firstText">{{ item[0]+':' }}</span>
                <span>{{ item[1] }}</span>
            </div>
        </div>
    </div>
    <div class="back"  @click="backList">返回</div>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
const { proxy } = getCurrentInstance()
const router = useRouter()
let itemId = ref('')
let cateId = ref('')
let itemMsgs = ref([])
let itemName = ref('')
const backList = () => {
    router.push({
        name: 'ItemList',
        query: {
            id:cateId.value
        }
    })
}
const getItemList = async (params) => {
  const res = await proxy.$api.searchItemList(params);
    console.log(res)
    itemName.value = res.data[0].name
    switch (parseInt(cateId.value)) {
        case 1: handleWeaponMsg(res.data[0]); break
        case 2: handlearmorMsg(res.data[0]);break
        
    }
};
const handlearmorMsg = (obj) => {
    let type 
    switch (parseInt(obj.armorType)) {
        case 1: type = '轻甲'; break
        case 2: type = '中甲'; break
        case 3: type = '重甲';break
    }
    let sendArr = [
        ['名称', obj.name],
        ['护甲值', obj.ac],
        ['护甲类型', type],
        ['描述', obj.description],
        ['最大敏捷加成',obj.max_agility],
        ['价格', obj.price+'gp'],
        ['品质', obj.quality],
        ['力量需求', obj.strengthNeed],
        ['是否隐匿劣势', obj.hideInferior==1?'劣势':'不劣势'],
        ['重量', obj.weight+'磅']
    ]
    console.log(sendArr)
    itemMsgs.value = sendArr
}
const handleWeaponMsg = (obj) => {
    let type 
    switch (parseInt(obj.type)) {
        case 1: type = '简易近战武器'; break
        case 2: type = '建议远程武器'; break
        case 3: type = '军用近战武器'; break
        case 3: type = '军用远程武器';break
    }
    let quality 
    switch (parseInt(obj.quality)) {
        case 1: quality = '普通'; break
        case 2: quality = '非普通'; break
        case 3: quality = '珍稀'; break
        case 3: quality = '极珍稀'; break
        case 3: quality = '传说';break
    }
    let dmgtype 
    switch (parseInt(obj.dmgType)) {
        case 1: dmgtype = '钝击伤害'; break
        case 2: dmgtype = '穿刺伤害'; break
        case 3: dmgtype = '挥砍伤害'; break
    }
    let sendArr = [
        ['名称', obj.name],
        ['伤害',obj.dmg],
        ['描述', obj.description],
        ['武器类型', type],
        ['价格', obj.price+'gp'],
        ['品质', quality],
        ['伤害类型', dmgtype],
        ['是否轻型', obj.isLight==1?'轻型武器':'非轻型武器'],
        ['是否灵巧',  obj.isDexterous==1?'灵巧武器':'非灵巧武器'],
        ['重量', obj.weight+'磅'],
        ['射程', obj.range],
    ]
    itemMsgs.value = sendArr
}
onMounted(() => {
    let params
  if (router.currentRoute.value.query.id) {
    itemId.value = router.currentRoute.value.query.id;
    cateId.value = router.currentRoute.value.query.cateId;
    params = {
        id: itemId.value,
        cateId: cateId.value,
        name:''
      };
    }
    getItemList(params)
})
</script>

<style lang="scss" scoped>
.back{
    margin: auto;
    text-align: center;
    background-color: #79bbff;
    padding: 5px 15px;
    color: #fff;
    width: 120px;
    border-radius: 8px;
}
.singlewrap{
    display: flex;
    margin-top: 15px;
    justify-content: space-between;
}
.firstText{
    display: block;
    flex-shrink: 0;
} 
.conner{
    width: 120px;
    height: 120px;
}
.conner1{
    position: absolute;
    bottom: 0px;
    left: 0px;
}
.conner2{
    position: absolute;
    top: 0px;
    right: 0px;
    transform: rotate(180deg);
}
.bg{
    // background: url('../../assets/image/itemBorder.jpg') no-repeat center;
    position: relative;
    width: 100%;
    height: 100vh;
}
.contentbody{
    margin: auto;
    padding: 80px 50px;
    h2{
        text-align: center;
    }
}
</style>