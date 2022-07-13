<template>
  <template v-if="status">
    <div style="display: flex; flex-direction: column; align-items: center">
      <div class="character_box">
        <div style="display: flex;flex-direction: row;padding: 10px">
          <div style="display: flex;justify-content: center;align-items: center">
            <template v-if="status === 200">
              <img :src="getImgUrl('sect_logo',sect)" alt="sect_pic" class="sect_icon">
            </template>
          </div>
          <div style="flex-direction: column">
            <div style="font-size: 28px; font-weight: bold;padding-bottom: 10px">{{ info[0] }}</div>
            <div>{{ info[1] }}</div>
          </div>
        </div>
        <template v-if="status === 200">
          <div class="occ_choose">
            <img @click="mainOcc" :class="{active:activeOcc === 0}" class="occ_img" :src="getImgUrl('occ_logo',occTable[sect][0])">
            <img v-if="occTable[sect].length > 1" @click="subOcc" :class="{active:activeOcc === 1}" class="occ_img" :src="getImgUrl('occ_logo',occTable[sect][1])">
          </div>
        </template>
      </div>
      <div class="main_box">
        <div>
          <el-select v-model="season" size="small" style="padding-left:20px;padding-right:20px;padding-top:20px; width:150px">
            <el-option label="江湖无限赛季" value="110-4"></el-option>
            <el-option label="北天药宗赛季" value="110-3"></el-option>
          </el-select>
          <el-select v-if="season === '110-4'" v-model="instance" size="small" style="width:160px">
            <el-option label="河阳之战（25人英雄）" value="25人英雄河阳之战"></el-option>
            <el-option label="河阳之战（25人普通）" value="25人普通河阳之战"></el-option>
          </el-select>
          <el-select v-if="season === '110-3'" v-model="instance" size="small" style="width:160px">
            <el-option label="雷狱大泽（25人英雄）" value="25人英雄雷狱大泽"></el-option>
            <el-option disabled label="雷狱大泽（25人普通）" value="25人普通雷狱大泽"></el-option>
          </el-select>
        </div>
        <template v-if="status === 200">
          <div style="height: 300px; border:1px solid #555; margin:20px; display: flex; flex-direction: row;justify-content: space-between">
            <div style="height: 100%; width:100%">
              <v-chart :option="healerChart"  v-if="occToSect[occTable[sect][activeOcc]][2] === 'h'"></v-chart>
            </div>
            <div style="border-left: 1px solid #555; width: 380px; display: flex; flex-direction: column; justify-content: center;align-items: center">
              <div style="font-size:22px; font-weight: bold; margin-bottom: 10px">最佳表现</div>
              <div style="font-size:26px; font-weight: bold; margin-bottom: 10px" :class="color(overallScoreHealer.max)">{{ overallScoreHealer.max }}</div>
              <div style="font-size:22px; font-weight: bold; margin-bottom: 10px">平均表现</div>
              <div style="font-size:26px; font-weight: bold; margin-bottom: 10px" :class="color(overallScoreHealer.avg)">{{ overallScoreHealer.avg }}</div>
            </div>
          </div>
          <div style="margin: 0 20px 20px 20px;border: 1px solid #555" v-if="occToSect[occTable[sect][activeOcc]][2] === 'd'">
            <el-table border :data="instData[season]" stripe style="width: 100%">
              <el-table-column align="center" prop="name" label="首领" width="180">
                <template #default="scope">
                  <div style="display: flex;flex-direction: row;justify-content: left;align-items: center">
                    <img :src="scope.row.pic" alt="alt" class="boss_pic">
                    <div style="margin-left: 10px">{{ scope.row.name }}</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="center" label="击杀次数" />
              <el-table-column align="center" label="最快击杀" />
              <el-table-column align="center" label="最佳%" />
              <el-table-column align="center" label="平均数%" />
              <el-table-column align="center" label="最高nDPS" />
              <el-table-column align="center" label="最高rDPS" />
              <el-table-column align="center" label="最高aDPS" />
            </el-table>
          </div>
          <div style="margin: 0 20px 20px 20px;border: 1px solid #555" v-if="occToSect[occTable[sect][activeOcc]][2] === 'h'">
            <el-table border :data="healerForm" stripe style="width: 100%">
              <el-table-column align="center" prop="name" label="首领" width="180">
                <template #default="scope">
                  <div style="display: flex;flex-direction: row;justify-content: left;align-items: center">
                    <img :src="scope.row.pic" alt="alt" class="boss_pic">
                    <div style="margin-left: 10px">{{ scope.row.name }}</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="center" label="击杀次数" prop="num" />
              <el-table-column align="center" label="最佳表现">
                <template #default="scope">
                  <div :class="color(scope.row.max)">{{scope.row.max}}</div>
                </template>
              </el-table-column>
              <el-table-column align="center" label="平均表现">
                <template #default="scope">
                  <div :class="color(scope.row.avg)">{{scope.row.avg}}</div>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作">
                <template #default="scope">
                  <el-button type="primary" link :disabled="scope.row.logsList?.length === 0" @click="showAllLogs(scope.row.logsList)">查看全部</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
        <template v-if="status === 404">
          <div style="display: flex;;flex-direction: column;align-items: center;margin-top: 40px;margin-bottom: 40px">
            <div style="width: 190px;height: 190px;background-color: #000000;display: flex;justify-content: center;align-items: center">
              <div>
                <div style="font-size:54px; font-weight: bold; display: flex">
                  <div style="height: 80px;width: 80px;display: flex;justify-content: center;line-height: 80px;margin-right: 10px;margin-bottom: 10px">这</div>
                  <div style="height: 80px;width: 80px;display: flex;justify-content: center;line-height: 80px">还</div>
                </div>
                <div style="font-size:54px; font-weight: bold;display: flex">
                  <div style="height: 80px;width: 80px;display: flex;justify-content: center;line-height: 80px;margin-right: 10px">不</div>
                  <div style="height: 80px;width: 80px;display: flex;justify-content: center;line-height: 80px; color:#000000;
          background-color: rgb(247,151,30)">急</div>
                </div>
              </div>
            </div>
            <div style="font-size: 36px;font-weight: bold;margin-top:40px; margin-bottom: 40px">哈哈，报错了！</div>
            <div style="font-size: 24px">未找到该玩家在此副本中的战斗记录！</div>
          </div>
        </template>
        <div v-if="allLogsWindowShow" style="border: 1px solid #555; margin: 0 20px 20px 20px">
          <el-table border :data="allLogsTable" stripe style="width: 100%">
            <el-table-column align="center" label="战斗时间">
              <template #default="scope">
                <div>{{ timestampToTime(scope.row.battleTime) }}</div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="上传时间">
              <template #default="scope">
                <div>{{ timestampToTime(scope.row.submitTime) }}</div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="表现">
              <template #default="scope">
                <div style="display: flex;justify-content: center">
                  <img :src="getImgUrl('occ_logo',occTable[sect][activeOcc])" alt="occ" style="height: 24px;width: 24px;margin-right: 5px">
                  <div :class="color(scope.row.score)">{{ scope.row.score }}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="复盘版本" prop="edition"></el-table-column>
            <el-table-column align="center" label="战斗详情"></el-table-column>
            <el-table-column align="center" label="心法复盘">
              <template #default="scope">
                <el-button @click="toReplay(scope.row.occ, scope.row.shortID)" link type="primary">前往复盘</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </template>
</template>

<script setup>
import {watch, reactive, ref, toRaw, computed} from "vue";
import { useRoute,useRouter } from "vue-router";
import axios from "axios";
import lodash from 'lodash'
const route = useRoute()
const router = useRouter()

const season = ref('110-4')
const instance = ref('25人英雄河阳之战')
const allLogsWindowShow = ref(false)
const allLogsTable = ref()
const sect = ref()

const occToSect = {
  'mowen':['cg',0,'d'],
  'xiangzhi':['cg',1,'h'],
  'huajianyou':['wh',0,'d'],
  'lijingyidao':['wh',1,'h'],
  'wufang':['yz',0,'d'],
  'lingsu':['yz',1,'h'],
  'dujing':['wd',0,'d'],
  'butianjue':['wd',1,'h'],
  'bingxinjue':['qx',0,'d'],
  'yunchangxinjing':['qx',1,'h'],

}

const timestampToTime = (timestamp) => {
  let date = new Date(timestamp * 1000);
  let Y = date.getFullYear() + '-'
  let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
  let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
  let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
  return Y+M+D+h+m+s;
}

const status = ref()

const allLogs = ref()

const occTable = {
  'bd':['beiaojue'],
  'cg':['mowen','xiangzhi'],
  'cj':['shanjujianyi'],
  'cy':['fenshanjin','tieguyi'],
  'cyg':['zixiagong','taixujianyi'],
  'lxg':['yinlongjue'],
  'mj':['fenying','mingzun'],
  'pl':['linghaijue'],
  'qx':['bingxinjue','yunchangxinjing'],
  'sl':['yjj','xsj'],
  'tc':['aoxue','tielao'],
  'tm':['jingyujue','tianluo'],
  'wd':['dujing','butianjue'],
  'wh':['huajianyou','lijingyidao'],
  'ytz':['taixuanjing'],
  'yz':['wufang','lingsu']
}

const activeOcc = ref(0)

const mainOcc = () => {
  activeOcc.value = 0
}

const subOcc = () => {
  activeOcc.value = 1
}

const getImgUrl = (folder,name) => {
  return new URL(`../assets/${folder}/${name}.png`, import.meta.url).href
}

const instData = {
  '110-4':[
    {
      'name':'勒齐那',
      'pic':getImgUrl('hyzz',1)
    },
    {
      'name':'阿阁诺',
      'pic':getImgUrl('hyzz',2)
    },
    {
      'name':'周通忌',
      'pic':getImgUrl('hyzz',3)
    },
    {
      'name':'周贽',
      'pic':getImgUrl('hyzz',4)
    },
    {
      'name':'常宿',
      'pic':getImgUrl('hyzz',5)
    }
  ],
  '110-3':[
    {
      'name':'巨型尖吻凤',
      'pic':getImgUrl('lydz',1)
    },
    {
      'name':'桑乔',
      'pic':getImgUrl('lydz',2)
    },
    {
      'name':'悉达罗摩',
      'pic':getImgUrl('lydz',3)
    },
    {
      'name':'尤迦罗摩',
      'pic':getImgUrl('lydz',4)
    },
    {
      'name':'月泉淮',
      'pic':getImgUrl('lydz',5)
    },
    {
      'name':'乌蒙贵',
      'pic':getImgUrl('lydz',6)
    }
  ]
}
const info = computed(()=>{
  return [route.params.name,route.params.server,instance.value]
})

watch(()=>info.value,(newValue,oldValue)=> {
  allLogsWindowShow.value = false
  axios({
    method: 'get',
    url: `http://120.48.95.56:8009/getSinglePlayer?id=${newValue[0]}&server=${newValue[1]}&map=${newValue[2]}`
  }).then((res) => {
    console.log(res)
    if (JSON.stringify(res.data.result.table) !== '{}') {
      status.value = 200
      // 根据最后一次上传的logs确定玩家的门派
      let lastLog = []
      for (let i in res.data.result.table){
        lastLog.push(res.data.result.table[i].slice(-1)[0])
        lastLog = lastLog.sort((a,b)=>{
          return b.battleTime - a.battleTime
        })

        sect.value = occToSect[lastLog[0].occ][0]
        activeOcc.value = occToSect[lastLog[0].occ][1]

        let mainOccLogs = lodash.cloneDeep(res.data.result.table)
        let subOccLogs = lodash.cloneDeep(res.data.result.table)

        for (let i in mainOccLogs){
          mainOccLogs[i] = mainOccLogs[i].filter((item)=>{
            return item['occ'] === occTable[sect.value][0]
          })
        }

        for (let i in subOccLogs){
          subOccLogs[i] = subOccLogs[i].filter((item)=>{
            return item['occ'] === occTable[sect.value][1]
          })
        }
        allLogs.value = [mainOccLogs,subOccLogs]
        status.value = 200
      }
    } else {
      status.value = 404
    }
  })
},{immediate:true,deep:true})

watch(season,(new_value,old_value)=>{
  if (new_value === '110-3'){
    instance.value = '25人英雄雷狱大泽'
  }else if(new_value === '110-4'){
    instance.value = '25人英雄河阳之战'
  }
})

const healerForm = computed(()=>{
  let form = lodash.cloneDeep(instData[season.value])
  for (let item of form){
    if (item.name in allLogs.value[activeOcc.value]){
      let res = allLogs.value[activeOcc.value][item.name]
      let scoreList = []
      for (let item of res){
        scoreList.push(item['score'])
      }
      item['max'] = Math.max.apply(null,scoreList)
      let total = 0
      for (let num of scoreList){
        total += num
      }
      item['avg'] = (total / scoreList.length).toFixed(2)
      item['num'] = res.length
      item['logsList'] = res
    }else{
      item['num'] = 0
      item['max'] = 'N/A'
      item['avg'] = 'N/A'
      item['logsList'] = []
    }
  }
  return form
})

const healerChart = computed(()=>{
  let boss = []
  for (let item of instData[season.value]){
    boss.push(item['name'])
  }
  let maxList = []
  let avgList = []
  for (let i in healerForm.value){
    if (healerForm.value[i]['max'] === 'N/A'){
      maxList.push(0)
      avgList.push(0)
    }else{
      maxList.push(healerForm.value[i]['max'])
      avgList.push(healerForm.value[i]['avg'])
    }
  }
  return {
    xAxis:{
      type: 'category',
      data: boss,
      axisLine:{
        lineStyle:{
          color:'#FFFFFF'
        }
      },
      axisLabel:{
        fontSize:'14px'
      }
    },
    yAxis:{
      type:'value',
      max:100,
      axisLine:{
        show:true,
        lineStyle:{
          color:'#FFFFFF'
        }
      },
      splitLine:{
        lineStyle:{
          color:'#555'
        }
      }

    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    series:[
      {
        name:'最佳',
        type:'bar',
        data:maxList
      },
      {
        name:'平均',
        type:'bar',
        data:avgList
      }
    ],
    grid:{
      top: '12%',
      bottom: '12%',
      left: '5%',
      right: '5%'
    }
  }
})

const showAllLogs = (logsList) =>{
  console.log(logsList)
  allLogsTable.value = logsList
  allLogsWindowShow.value = true
}

const toReplay = (occ,id) =>{
  router.push(`/${occ}/${id}`)
}

const color = (score) =>{
  if (score < 25){
    return 'grey'
  }
  else if (score >= 25 && score < 50){
    return 'green'
  }
  else if (score >= 50 && score < 75){
    return 'blue'
  }
  else if (score >= 75 && score < 95){
    return 'purple'
  }
  else if (score >= 95 && score < 98){
    return 'orange'
  }
  else if (score >= 98 && score < 100){
    return 'pink'
  }
  else if (score === 100){
    return 'gold'
  }
  else{
    return 'white'
  }
}

const overallScoreHealer = computed(()=>{
  let scoreList = []
  for (let i in allLogs.value[activeOcc.value]) {
    for (let item of allLogs.value[activeOcc.value][i]){
      scoreList.push(item['score'])
    }
  }
  let max = Math.max.apply(null,scoreList)
  let total = 0
  for (let num of scoreList){
    total += num
  }
  let avg = (total / scoreList.length).toFixed(2)
  return {max,avg}
})

</script>

<style scoped>
.sect_icon{
  height: 68px;
  width: 68px;
  margin-right: 10px;
}
.character_box{
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  color: #e1f2f5;
  background-color: #141414;
  margin-bottom: 20px;
  width: 1400px;
  border: 1px solid #555;
}
.occ_choose{
  display: flex;
  align-items: center;
}
.occ_img{
  height: 50px;
  width: 50px;
  margin-right: 20px;
  filter: grayscale(100%);
}
.active{
  filter: grayscale(0);
}
.main_box{
  display: flex;
  flex-direction: column;
  color: #e1f2f5;
  background-color: #141414;
  margin-bottom: 20px;
  width: 1400px;
  border: 1px solid #555;
}
.boss_pic{
  height: 48px;
  width: 48px;
  margin-left: 10px;
  margin-right: 10px;
}
</style>