<template>
  <div style="display: flex;justify-content: space-around">
    <el-tooltip v-for="item in equipResolve" effect="light">
      <template #content>
        <div :class="'quality' + item.Quality">
          {{ item.Name }}
        </div>
        <div v-for="i in 12">
          <template v-if="item['_Magic' + i + 'Type'] !== null">
            <div :class="description(item['_Magic' + i + 'Type'])[1]">
              {{ description(item['_Magic' + i + 'Type'])[0] }}
            </div>
          </template>
        </div>
        <div style="margin-top:10px; color:#FFFF00">
          品质等级 {{ item.Level }}
        </div>
      </template>
      <div style="display: flex;flex-direction: column;justify-content: center;align-items: center">
        <img :src=getImageUrl(item._IconID) alt="icon" style="width: 32px">
        <div>{{ equipPosition[item.SubType] }}</div>
      </div>
    </el-tooltip>

  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, toRaw } from 'vue'

const props = defineProps(['equipInfo']
)
const equipResolve = ref()

const equipPosition = {
  '3':'帽子',
  '2':'上衣',
  '6':'腰带',
  '10':'护腕',
  '8':'下装',
  '9':'鞋子',
  '4':'项链',
  '7':'腰坠',
  '5':'戒指',
  '1':'暗器',
  '0':'武器'
}

const attrTable = {
  "atVitalityBase":['体质+','mainAttr'],
  "atSpiritBase":['根骨+','mainAttr'],
  "atTherapyPowerBase":['治疗成效提高','subAttr'],
  "atMagicCriticalStrike":['内功会心等级提高','subAttr'],
  "atHasteBase":['加速等级提高','subAttr'],
  "atPoisonCriticalStrike":['毒性内功会心等级提高','subAttr'],
}

const description = (item) => {
  let detail = toRaw(item)
  if (detail['attr'][0] in attrTable){
    return [attrTable[detail['attr'][0]][0] + detail['attr'][1],attrTable[detail['attr'][0]][1]]
  }else{
    return [detail['label'].match(/".*"/g)[0].replace(/"/g,'').replace(/[“”]/g,'"'),'subAttr']
  }

}

let equipArray = props.equipInfo.split('\n')

for (let i = 0; i < equipArray.length; i++){
  equipArray[i] = equipArray[i].split('\t')
}

if (equipArray.length === 12){
  // 非藏剑长度12
  let requestList = []
  let weapon = [0,11]
  let armor = [1,2,6,8,9,10]
  let trinket = [3,4,5,7]
  for (let i in weapon){
    requestList.push(axios({
      method:'get',
      url:'https://node.jx3box.com/equip/weapon',
      params:{'id':`${equipArray[weapon[i]]}`}
    }))
  }
  for (let i in armor){
    requestList.push(axios({
      method:'get',
      url:'https://node.jx3box.com/equip/armor',
      params:{'id':`${equipArray[armor[i]]}`}
    }))
  }
  for (let i in trinket){
    requestList.push(axios({
      method:'get',
      url:'https://node.jx3box.com/equip/trinket',
      params:{'id':`${equipArray[trinket[i]]}`}
    }))
  }
  axios.all(requestList).then((res)=>{
    let sortList = ['3','2','6','10','8','9','4','7','5','1','0']
    for (let i in res){
      res[i] = res[i].data.list[0]
    }
    res.sort(function (a, b){
      return sortList.indexOf(a.SubType) - sortList.indexOf(b.SubType)
    })
    equipResolve.value = res
    console.log(res)
  })
}else if(equipArray.length === 13){
  // 藏剑长度13
}else {
  throw '装备字符串长度错误'
}

const getImageUrl = (name) => {
  return new URL(`https://icon.jx3box.com/icon/${name}.png`, import.meta.url).href
}


</script>

<style scoped>
.quality4{
  color: #FF2DFF
}

.quality5{
  color: #FFA500
}

.mainAttr{
  color: #FFFFFF
}

.subAttr{
  color: #00c848
}

</style>