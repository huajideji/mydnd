<template>
    <div>
      <div class="header">
        <div class="back" @click="router.push('/')">返回</div>
        <h2>法术列表</h2>
      </div>
     
      <div class="select-wrap">
        <div>
            <span>职业：</span>
            <el-select
            v-model="occu_id"
            class="m-2"
            placeholder="Select"
            style="width: 120px"
            @change="searchItem"
        >
        <el-option
        v-for="item in occ_options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        />
        </el-select>
        </div>
        <div>
            <span>环位：</span>
            <el-select
            v-model="ring_id"
            class="m-2"
            placeholder="Select"
            style="width: 120px"
            @change="searchItem"
        >
        <el-option
        v-for="item in ring_options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        />
        </el-select>
        </div>
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
        <div
          v-for="(items, indexs) in itemList" :key="indexs"
          class="single-item"
          @click="godetail(items)"
        >
          <pre style="font-size: 16px; font-weight: 700;">{{ items.name }}</pre>
          <span style="margin: 25px;font-size: 12px;">{{'简述:'+items.show_msg }}</span>
  
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
  let ring_id = ref(1);
  let occu_id = ref(1)
  const ring_options = [
  {
    value: 0,
    label: '戏法',
  },
  {
    value: 1,
    label: '1环',
  },
  {
    value: 2,
    label: '2环',
  },
  {
    value: 3,
    label: '3环',
  },
  {
    value: 4,
    label: '4环',
  },
  {
    value: 5,
    label: '5环',
  },
  {
    value: 6,
    label: '6环',
  },
  {
    value: 7,
    label: '7环',
  },
  {
    value: 8,
    label: '8环',
        },
        {
    value: 9,
    label: '0环',
  },
  ]
  const occ_options = [
  {
    value: 1,
    label: '吟游诗人',
  },
  {
    value: 2,
    label: '牧师',
  },
  {
    value: 3,
    label: '德鲁伊',
  },
  {
    value: 4,
    label: '术士',
  },
  {
    value: 5,
    label: '邪术师',
},
    {
    value: 6,
    label: '法师',
    },
    {
    value: 7,
    label: '圣武士',
        },
        {
    value: 8,
    label: '游侠',
  },
  ]
  const getList = async (type) => {
    const res = await proxy.$api.getItemList(type);
    return res.data;
  };
  const godetail = (item) => {
    router.push({
      name: "SpellDetail",
      query: {
        id: item.id,
      },
    });
  };
  const searchItem = async () => {
    let params = {
      name: searchName.value,
      ring: ring_id.value,
       occu_id: occu_id.value,
      spell_id:''
    };
    const res = await proxy.$api.getSpellList(params);
    itemList.value = res.data;
  };
  onMounted(async () => {
    let resdata =  await searchItem();
  });
  </script>
  
  <style lang="scss" scoped>
  .select-wrap{
    display: flex;
    padding: 0px 30px;
    justify-content: space-between;
    margin: 15px 0;
    >div{
        display: flex;
        align-items: center;
        span{
            flex-shrink: 0;
            font-size: 12px;
        }
    }

  }
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
      cursor: pointer;
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