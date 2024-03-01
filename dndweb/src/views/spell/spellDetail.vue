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
          <pre>{{ itemMsgs.name }}</pre>
          <div class="msgwrap">
            <div>
                <span>环位：</span>
                <span>{{itemMsgs.ring==0?'戏法':itemMsgs.ring+'环'}}</span>
            </div>
            <div>
                <span>持续时间：</span>
                <span>{{itemMsgs.duration}}</span>
            </div>
            <div>
                <span>派系：</span>
                <span>{{itemMsgs.faction}}</span>
            </div>
            <div>
                <span>施法距离：</span>
                <span>{{getdistence(itemMsgs.distance)}}</span>
            </div>
            <div>
                <span>施法时间：</span>
                <span>{{itemMsgs.release_time}}</span>
            </div>
            <div v-if="itemMsgs.material">
                <span>施法耗材：</span>
                <span>{{itemMsgs.material}}</span>
            </div>
            <div >
                <span>是否仪式施法：</span>
                <span>{{itemMsgs.is_rite==1?'是':'否'}}</span>
            </div>
            <div >
                <span>是否专注施法：</span>
                <span>{{itemMsgs.is_concentration==1?'是':'否'}}</span>
            </div>
          </div>
          <div class="des-wrap">
            <h2 class="des-title">技能描述</h2>
            <div style="font-size: 16px">{{ itemMsgs.description }}</div>
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
  const getdistence = (item) => {
        switch (item) {
              case 0: return '自身'; break
              case 1: return '触及'; break
        }
    return item + '尺'
  }
  const backList = () => {
      router.push({
          name: 'SpellList',
      })
  }
  const getItemList = async (params) => {
        const res = await proxy.$api.getSpellList(params);
        itemMsgs.value = res.data[0]
  };
  onMounted(() => {
      let params
    if (router.currentRoute.value.query.id) {
      itemId.value = router.currentRoute.value.query.id;
      cateId.value = router.currentRoute.value.query.cateId;
      params = {
          spell_id: itemId.value,
            occu_id: '',
            ring: '',
            name:''
        };
      }
      getItemList(params)
  })
  </script>
  
  <style lang="scss" scoped>
  .des-wrap{
    margin-top: 25px;
    .des-title{
        text-align: center;
    }
  }
  .msgwrap{
    >div{
        span:first-of-type{
            width: 120px;
            display: block;
            flex-shrink: 0;
        }
        span:last-of-type{
            width: 200px;
            display: block;
            flex-shrink: 0;
            text-align: right;
        }
        display: flex;
        justify-content: space-around;
        font-size: 16px;
        margin-top: 15px;
    }
  }
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
      pre{
        font-size: 20px;
        font-weight: 700;
        text-align: center;
      }
  }
  </style>