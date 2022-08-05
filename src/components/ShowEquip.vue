<template>
  <div style="display: flex;justify-content: space-around">
    <template v-if="loading">
      <el-tooltip v-for="item in equipResolve" effect="light">
        <template #content>
          <div style="max-width: 300px">
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
          </div>
        </template>
        <div style="display: flex;flex-direction: column;justify-content: center;align-items: center">
          <img :src="'https://icon.jx3box.com/icon/' + item._IconID + '.png'" alt="icon" style="width: 32px">
          <div>{{ equipPosition[item.SubType] }}</div>
        </div>
      </el-tooltip>
    </template>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, toRaw } from 'vue'

const loading = ref(false)

const props = defineProps(['equipInfo'])

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
  "atAgilityBase":['身法+','mainAttr'],
  "atSpunkBase":['元气+','mainAttr'],
  "atStrengthBase":['力道+','mainAttr'],
  "atSpiritBase":['根骨+','mainAttr'],

  "atDecriticalDamagePowerBase":['化劲'],
  "atParryValueBase":['招架'],
  "atDodge":['闪避'],
  "atToughnessBase":['御劲'],
  "atStrainBase":['无双'],
  "atActiveThreatCoefficient":['威胁值'],

  "atPhysicsAttackPowerBase":['外功攻击力提高','subAttr'],
  "atMagicAttackPowerBase":['内功攻击力提高','subAttr'],
  "atSolarAttackPowerBase":['阳性内功攻击力提高','subAttr'],
  "atLunarAttackPowerBase":['阴性内功攻击力提高','subAttr'],
  "atNeutralAttackPowerBase":['混元内功攻击力提高','subAttr'],
  "atPoisonAttackPowerBase":['毒性内功攻击力提高','subAttr'],
  "atSolarAndLunarAttackPowerBase":['阴阳内功攻击力提高','subAttr'],

  "atTherapyPowerBase":['治疗成效提高','subAttr'],

  "atAllTypeCriticalStrike":['全会心等级提高','subAttr'],
  "atPhysicsCriticalStrike":['外功会心等级提高','subAttr'],
  "atMagicCriticalStrike":['内功会心等级提高','subAttr'],
  "atSolarCriticalStrike":['阳性内功会心等级提高','subAttr'],
  "atLunarCriticalStrike":['阴性内功会心等级提高','subAttr'],
  "atNeutralCriticalStrike":['混元内功会心等级提高','subAttr'],
  "atPoisonCriticalStrike":['毒性内功会心等级提高','subAttr'],
  "atSolarAndLunarCriticalStrike":['阴阳内功会心等级提高','subAttr'],

  "atPhysicsOvercomeBase":['外功破防等级提高','subAttr'],
  "atMagicOvercome":['内功破防等级提高','subAttr'],
  "atSolarOvercomeBase":['阳性内功破防等级提高','subAttr'],
  "atLunarOvercomeBase":['阴性内功破防等级提高','subAttr'],
  "atNeutralOvercomeBase":['混元内功破防等级提高','subAttr'],
  "atPoisonOvercomeBase":['毒性内功破防等级提高','subAttr'],
  "atSolarAndLunarOvercomeBase":['阴阳内功破防等级提高','subAttr'],

  "atAllTypeCriticalDamagePowerBase":['全会心等级提高','subAttr'],
  "atPhysicsCriticalDamagePowerBase":['外功会心等级提高','subAttr'],
  "atMagicCriticalDamagePowerBase":['内功会心等级提高','subAttr'],
  "atSolarCriticalDamagePowerBase":['阳性内功会心等级提高','subAttr'],
  "atLunarCriticalDamagePowerBase":['阴性内功会心等级提高','subAttr'],
  "atSolarAndLunarCriticalDamagePowerBase":['阴阳内功会心等级提高','subAttr'],
  "atPoisonCriticalDamagePowerBase":['毒性内功会心等级提高','subAttr'],
  "atNeutralCriticalDamagePowerBase":['混元内功会心等级提高','subAttr'],

  "atHasteBase":['加速等级提高','subAttr'],
}

const description = (item) => {
  let detail = toRaw(item)
  if (detail['attr'][0] in attrTable){
    return [attrTable[detail['attr'][0]][0] + detail['attr'][1],attrTable[detail['attr'][0]][1]]
  }else{
    return [detail['label'].match(/".*"/g)[0].replace(/"/g,'').replace(/\\/g,'').replace(/[“”]/g,'"'),'subAttr']
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
      url:'/boxapi/equip/weapon',
      params:{'id':`${equipArray[weapon[i]][0]}`}
    }))
  }
  for (let i in armor){
    requestList.push(axios({
      method:'get',
      url:'/boxapi/equip/armor',
      params:{'id':`${equipArray[armor[i]][0]}`}
    }))
  }
  for (let i in trinket){
    requestList.push(axios({
      method:'get',
      url:'/boxapi/equip/trinket',
      params:{'id':`${equipArray[trinket[i]][0]}`}
    }))
  }
  axios.all(requestList).then((res)=>{
    console.log('@@@',res)
    let sortList = ['3','2','6','10','8','9','4','7','5','1','0']
    for (let i in res){
      res[i] = res[i].data.list[0]
    }
    res.sort(function (a, b){
      return sortList.indexOf(a.SubType) - sortList.indexOf(b.SubType)
    })
    equipResolve.value = res
    loading.value = true
    console.log(res)
  }).catch((err)=>{
    console.log(err)
  })
}else if(equipArray.value.length === 13){
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