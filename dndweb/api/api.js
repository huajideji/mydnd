import request from './sever'
// 数据字典-查询 公共api
export const getItemCate = () => { return request({ url: `/item/getItemCateList`, method: 'GET' }) }
export const getItemList = (params) => { return request({ url: `/item/getItemList?type=${params.type}`, method: 'GET' }) }
export const searchItemList = (params) => { return request({ url: `/item/searchItem?cateId=${params.cateId}&name=${params.name}&id=${params.id}`, method: 'GET' }) }
export const getSpellList = (params) => { return request({ url: `/spell/getspellList?spell_id=${params.spell_id}&occu_id=${params.occu_id}&ring=${params.ring}&name=${params.name}`, method: 'GET' }) }

export default {
    getItemCate,
    getItemList,
    searchItemList,
    getSpellList
}
 