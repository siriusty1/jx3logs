<template>
  <template v-if="loaded">
    <div style="display:flex;flex-direction:column;align-items: center">
      <div style="font-size: 20px; font-weight: bold">相知复盘 7.10.0 Dev</div>
      <div class="infoBox">
        <div style="border: 1px solid #555">
          <div><text>角色名称：</text><text>{{ resObj.overall['name'] }}</text></div>
          <div><text>服务器：</text><text>{{ resObj.overall['server'] }}</text></div>
          <div><text>战斗时间：</text><text>{{ resObj.overall['battleTimePrint'] }}</text></div>
          <div><text>生成时间：</text><text>{{ resObj.overall['generateTimePrint'] }}</text></div>
          <div><text>副本：</text><text>{{ resObj.overall['map'] }}</text></div>
          <div><text>首领：</text><text>{{ resObj.overall['boss'] }}</text></div>
          <div><text>有效人数：</text><text>{{ resObj.overall['numPlayer'] }}</text></div>
          <div><text>战斗时长：</text><text>{{ resObj.overall['sumTimePrint'] }}</text></div>
          <div><text>数据种类：</text><text>{{ resObj.overall['dataType'] }}</text></div>
        </div>
        <div>

        </div>
        <div>

        </div>
      </div>
      <!--      统计面板       -->
      <div class="statisticBox">
        <SkillDisplay :skill="timeFlowData.realTimeRank['meihua']" :sortList="{
        'key':['num','numPerSec','cover','delay','youxiangHPS','pingyinHPS'],
        'value':['数量：','每秒数量：','覆盖率：','延迟：','犹香HPS：','平吟HPS：']}">
          <template #icon>
            <img class="skill_statistic_icon" :src="getImageUrl('meihua','skills_logo')" alt="梅花三弄">
            <text style="margin-top: 5px; font-weight: bold;font-size: 16px">梅花三弄</text>
          </template>
        </SkillDisplay>
        <SkillDisplay :skill="timeFlowData.realTimeRank['gong']" :sort-list="{
        'key':['num','numPerSec','delay','HPS','effRate','zhenliuHPS'],
        'value':['数量：','每秒数量：','延迟：','HPS：','有效比率：','枕流HPS：']}">
          <template #icon>
            <img class="skill_statistic_icon" :src="getImageUrl('gong','skills_logo')" alt="宫">
            <text style="margin-top: 5px; font-weight: bold;font-size: 16px">宫</text>
          </template>
        </SkillDisplay>
        <SkillDisplay :skill="timeFlowData.realTimeRank['shang']" :sort-list="{
        'key':['num','numPerSec','cover','delay','HPS'],
        'value':['数量：','每秒数量：','覆盖率：','延迟：','HPS：']}">
          <template #icon>
            <img class="skill_statistic_icon" :src="getImageUrl('shang','skills_logo')" alt="商">
            <text style="margin-top: 5px; font-weight: bold;font-size: 16px">商</text>
          </template>
        </SkillDisplay>
        <SkillDisplay :skill="timeFlowData.realTimeRank['yu']" :sort-list="{
        'key':['num','numPerSec','effRate','delay','HPS'],
        'value':['数量：','每秒数量：','有效比率：','延迟：','HPS：']}">
          <template #icon>
            <img class="skill_statistic_icon" :src="getImageUrl('yu','skills_logo')" alt="羽">
            <text style="margin-top: 5px; font-weight: bold;font-size: 16px">羽</text>
          </template>
        </SkillDisplay>
        <SkillDisplay :skill="timeFlowData.realTimeRank['zhi']" :sort-list="{
        'key':['num','numPerSec','delay','HPS','effRate','gudaoHPS'],
        'value':['数量：','每秒数量：','延迟：','HPS：','有效比率：','古道HPS：']}">
          <template #icon>
            <img class="skill_statistic_icon" :src="getImageUrl('zhi','skills_logo')" alt="徵">
            <text style="margin-top: 5px; font-weight: bold;font-size: 16px">徵</text>
          </template>
        </SkillDisplay>
        <SkillDisplay :skill="timeFlowData.realTimeRank['jue']" :sort-list="{
        'key':['num','numPerSec','cover','delay','HPS'],
        'value':['数量：','每秒数量：','覆盖率：','延迟：','HPS：']}">
          <template #icon>
            <img class="skill_statistic_icon" :src="getImageUrl('jue','skills_logo')" alt="角">
            <text style="margin-top: 5px; font-weight: bold;font-size: 16px">角</text>
          </template>
        </SkillDisplay>
        <SkillDisplay :skill="timeFlowData.realTimeRank['xiangyi']" :sort-list="{
        'key':['num','HPS','effRate'],
        'value':['数量：','HPS：','有效比率：']}">
          <template #icon>
            <img class="skill_statistic_icon" :src="getImageUrl('xiangyi','skills_logo')" alt="相依">
            <text style="margin-top: 5px; font-weight: bold;font-size: 16px">相依</text>
          </template>
        </SkillDisplay>
        <SkillDisplay :skill="timeFlowData.realTimeRank['general']" :sort-list="{
        'key':['APS','SangrouDPS','ZhuangzhouDPS','YujianDPS','efficiency'],
        'value':['APS：','桑柔DPS：','庄周梦DPS：','玉简DPS：','战斗效率：']}">
          <template #icon>
            <img class="skill_statistic_icon" :src="getImageUrl('tuanfu','skills_logo')" alt="团辅">
            <text style="margin-top: 5px; font-weight: bold;font-size: 16px">团队辅助</text>
          </template>
        </SkillDisplay>
      </div>
      <!--      时间轴        -->
      <div style="display:flex;flex-direction:row; width: 1400px; border: 1px solid #555;background-color: #141414;position: relative;margin-bottom: 20px">
        <div style="display:flex;flex-direction:column; width: 150px;border-right: 1px solid #555">
          <div style="display:flex; flex-direction:column; justify-content:center; height: 100px; padding-left:10px; background-color:#201020; border-bottom: 1px solid #555;">
            <div>DPS梅花盾</div>
            <div>实时覆盖率</div>
          </div>
          <div class="label">GCD技能</div>
          <div class="label">非GCD技能</div>
          <div class="label">曲风状态</div>
          <div class="label">BOSS机制</div>
        </div>
        <el-scrollbar style="width: 1250px;position: relative" ref="scrollBar" @wheel.prevent="handleScroll">
          <div class="timeFlow">
            <div style="height: 100px;width: 100%;border-bottom: 1px solid #555">
              <v-chart class="coverage_chart" :option="coverage_chart_option"></v-chart>
            </div>
            <div class="GCD">
              <div v-for="i in timeFlowData.timeScale" style="height: 100%; width: 199px;border-right: 1px solid rgba(85,85,85,0.5)"></div>
              <!--            <img v-for="(item, index) in firstHit"-->
              <!--                 @mouseenter="enterImg($event,item)"-->
              <!--                 @mouseleave="leaveImg($event,item)"-->
              <!--                 :src="getImageUrl('15412_' + item.hits,'skills_logo')"-->
              <!--                 alt="icon"-->
              <!--                 class="GCD_skill_icon"-->
              <!--                 :style="{-->
              <!--                           left:xPosition(item.start),-->
              <!--                           height:Math.floor(GCD / 1000 * 40)+'px',-->
              <!--                           width:Math.floor(item.duration * item.hits / 1000 * 40)+'px'-->
              <!--                          }">-->
              <img v-for="(item, index) in timeFlowData.timeflow_without_channelling"
                   :src="getImageUrl(item.iconid,'skills_logo')"
                   alt="icon"
                   class="GCD_skill_icon"
                   @mouseenter="enterImg($event,item)"
                   @mouseleave="leaveImg($event,item)"
                   :style="{
                           left:xPosition(item.start),
                           height:timeFlowData.icon_length,
                           width:timeFlowData.icon_length
                          }">
            </div>
            <div class="noGCD">
              <div v-for="i in timeFlowData.timeScale" style="height: 100%; width: 199px;border-right: 1px solid rgba(85,85,85,0.5)"></div>
              <img v-for="(item, index) in resObj['replay']['special']"
                   @mouseenter="enterImg($event,item)"
                   @mouseleave="leaveImg($event,item)"
                   :src="getImageUrl(item.iconid,'skills_logo')"
                   alt="icon"
                   class="noGCD_skill_icon"
                   :style="{
               left:xPosition(item.start),
               height: icon_length,
               width: icon_length
             }">
            </div>
            <div class="songStatus">
              <div v-for="i in timeFlowData.timeScale" style="height: 100%; width: 199px;border-right: 1px solid rgba(85,85,85,0.5)"></div>
              <div v-for="item in timeFlowData.songChange" :class="item.skillname" :style="{
                position:'absolute',
                borderRadius:'3px',
                left:xPosition(item.start),
                height: icon_length,
                width: item.lasts / 1000 * 40 + 'px',
                top:'197px'
            }">
              </div>
            </div>
            <div class="bossPhase">
              <div v-for="i in timeFlowData.timeScale" style="height: 100%; width: 199px;border-right: 1px solid rgba(85,85,85,0.5)"></div>
              <img v-for="(item, index) in resObj['replay']['environment']"
                   :src="getImageUrl(item.iconid,'skills_logo')"
                   alt="icon"
                   class="bossPhase_icon"
                   @mouseenter="enterImg($event,item)"
                   @mouseleave="leaveImg($event,item)"
                   :style="{
               left: xPosition(item.start),
               height: icon_length,
               width: icon_length
             }">
            </div>
            <div class="timeScale">
              <div v-for="i in timeFlowData.timeScale" style="display:flex; justify-content: space-between;flex-direction:column; height: 100%; width: 199px;border-right: 1px solid rgba(85,85,85,0.5)">
                <text style="margin-left: 10px">{{ (i-1)*5 }}</text>
                <text v-if="(i-1)*5 % 60 === 0" style="margin-left: 10px">{{ (i-1)*5 / 60 }}min</text>
              </div>
            </div>
            <div ref="popUp" v-if="popUpShow" class="popUp">
              <div style="font-size:20px ;font-weight: bold; margin: 10px">{{ popUpDetails['skillname'] }}</div>
              <div v-if="popUpDetails['description']" style="margin: 10px">{{ popUpDetails['description'] }}</div>
              <div v-if="popUpDetails['heal']" style="margin: 10px">治疗量：{{ popUpDetails['heal'] }}</div>
              <div v-if="popUpDetails['healeff']" style="margin: 10px">有效治疗量：{{ popUpDetails['healeff'] }}</div>
              <div v-if="popUpDetails['targetName']" style="margin: 10px" v-html="'目标：<br>' + popUpDetails['targetName']"></div>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <!--      手法警察       -->
      <Review :review="resObj.review[['content']]"></Review>
    </div>
  </template>

</template>

<script setup>
import {watch, nextTick, onBeforeUnmount, ref, toRaw,computed} from 'vue'
import * as echarts from 'echarts/core';
import { GridComponent,DatasetComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import lodash from 'lodash'
import SkillDisplay from '../components/SkillDisplay.vue'
import Review from '../components/Review.vue'
import axios from "axios";
import { useRoute } from 'vue-router'

const loaded = ref(false)
const router = useRoute()
const resObj = ref()
const rankObj = ref()
const timeFlowData = ref()

axios({
  method:'get',
  url: `http://139.199.102.41:8009/getReplayPro?id=${router.params.replay_id}`
}).then((res)=>{
  console.log(res)
  let repl = res.data['raw'].replace(/'/g, '"').replace(/&#39;/g, '"').replace(/\n/g, '\\n').replace(/\t/g, '\\t');
  let repl2 = res.data['rank'].replace(/'/g, '"').replace(/&#34;/g, '"').replace(/\n/g, '\\n').replace(/\t/g, '\\t');
  let replay  = JSON.parse(repl)
  resObj.value = JSON.parse(repl)
  let rank = JSON.parse(repl2)
  rankObj.value = JSON.parse(repl2)

  let realTimeRank = lodash.cloneDeep(toRaw(resObj.value['skill']))
  for (let item in realTimeRank){
    for (let sub_item in realTimeRank[item]){
      realTimeRank[item][sub_item] = [realTimeRank[item][sub_item]]
      realTimeRank[item][sub_item].push(resObj.value['rank'][item][sub_item])
    }
  }

  const calcGCD = (haste,talent) =>{
    if (haste < 43){}
    else if (haste < 43){return 1500}
    else if (haste >= 43 && haste < 1928){return 1440}
    else if (haste >= 1928 && haste < 4026){return 1380}
    else if (haste >= 4026 && haste < 6296){return 1310}
    else if (haste >= 6296 && haste < 8780){return 1250}
    else{return 1187.5}
  }
  let GCD = calcGCD(replay['overall']['hasteReal'])
  let timeFlowWidth = (replay['replay']['finalTime'] - replay['replay']['startTime']) / 1000 * 40
  let timeScale = Math.floor(timeFlowWidth / 200)
  let timeflow_without_channelling = []
  let timeflow_channelling = []
  for (let item of replay['replay']['normal']){
    if (item['skillname'] === '徵'){
      timeflow_channelling.push(item)
    }else{
      timeflow_without_channelling.push(item)
    }
  }
  let firstHit = [timeflow_channelling[0]]
  firstHit[0]['hits'] = 1
  for (let i = 1; i < timeflow_channelling.length; i++){
    if (timeflow_channelling[i]['start'] - timeflow_channelling[i - 1]['start'] < 1000){
      firstHit[firstHit.length - 1]['hits'] += 1
      firstHit[firstHit.length - 1]['heal'] = firstHit[firstHit.length - 1]['heal'] + ' / ' + timeflow_channelling[i]['heal']
      firstHit[firstHit.length - 1]['healeff'] = firstHit[firstHit.length - 1]['healeff'] + ' / ' + timeflow_channelling[i]['healeff']
      firstHit[firstHit.length - 1]['targetName'] = firstHit[firstHit.length - 1]['targetName'] + '<br>' + timeflow_channelling[i]['targetName']
    }else{
      firstHit.push(timeflow_channelling[i])
      firstHit[firstHit.length - 1]['hits'] = 1
    }
  }

  let songChange = []
  songChange.push({
    'skillname':'梅花三弄·切换',
    'start':replay['replay']['startTime']
  })
  for (let item of replay['replay']['special']){
    if(item['skillname'] === '高山流水·切换' || item['skillname'] === '阳春白雪·切换' || item['skillname'] === '梅花三弄·切换'){
      songChange.push(item)
    }
  }
  for (let i = 0; i < songChange.length; i++){
    if (i < songChange.length - 1){
      songChange[i]['lasts'] = songChange[i + 1]['start'] - songChange[i]['start']
    }else{
      songChange[i]['lasts'] = replay['replay']['finalTime'] - songChange[i]['start']
    }
  }

  timeFlowData.value = {
    GCD,
    timeFlowWidth,
    timeScale,
    realTimeRank,
    timeflow_channelling,
    timeflow_without_channelling,
    firstHit,
    songChange
  }
  loaded.value = true
})

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
  else{
    return 'gold'
  }
}
const getImageUrl = (name,folder) => {
  return new URL(`../assets/${folder}/${name}.png`, import.meta.url).href
}

const icon_length = computed(()=>{
  if (loaded.value){
    return Math.floor(timeFlowData.value.GCD / 1000 * 40) + 'px'
  }else{
    return '0px'
  }
})

const timeFlowWidth = computed(()=>{
  if (loaded.value){
    return Math.floor(timeFlowData.value.timeFlowWidth) + 'px'
  }else{
    return '0px'
  }
})

const ChartWidth = computed(()=>{
  if (loaded.value){
    return (Math.floor(timeFlowData.value.timeFlowWidth / 40 * 2) * 20 - 1) + 'px'
  }else{
    return '0px'
  }
})

const timeScaleHeight = computed(()=>{
  if (loaded.value){
    return Math.floor(350 - 104 - 4 * timeFlowData.value.GCD / 1000 * 40) + 'px'
  }else{
    return '0px'
  }
})

const xPosition = (time) => {
  return (time - resObj.value['replay']['startTime']) / 1000 * 40 + 'px'
}

const popUpShow = ref(false)
const popUpPos = ref([0,0])
const popUpDetails = ref()
const popUp = ref()

const enterImg = ($event,item) => {
  popUpDetails.value = item
  popUpShow.value = true
  nextTick(()=>{
    let leftBias
    if ($event.target.offsetLeft < popUp.value.offsetWidth / 2){
      leftBias = $event.target.offsetLeft
    }
    else if ($event.target.offsetLeft > timeFlowWidth - popUp.value.offsetWidth / 2){
      leftBias = $event.target.offsetLeft - (popUp.value.offsetWidth - timeFlowData.value.GCD / 1000 * 40)
    }
    else {
      leftBias = Math.floor($event.target.offsetLeft  - (popUp.value.offsetWidth - timeFlowData.value.GCD / 1000 * 40) / 2)
    }
    if($event.target.offsetTop >= 203){
      popUpPos.value = [leftBias, $event.target.offsetTop - popUp.value.offsetHeight - 10]
    }else{
      popUpPos.value = [leftBias, $event.target.offsetTop + timeFlowData.value.GCD / 1000 * 40 + 10]
    }
  })
}

const leaveImg = ($event,item) => {
  popUpShow.value = false
}
const scrollBar = ref(null)
const handleScroll = (e) => {
  const wheelDelta = e.wheelDelta || -e.deltaY * 80
  const scrollbar = scrollBar.value
  scrollbar.setScrollLeft(scrollbar.wrap$.scrollLeft - wheelDelta)
}

const coverage_chart_option = computed(()=>{
  if (loaded.value){
    let xAxis = []
    for (let i = 0; i < resObj.value['replay']['heat']['timeline'].length; i++){
      xAxis.push(0.5 * i + 's')
    }
    return {
      xAxis:{
        type:'category',
        data:xAxis,
        boundaryGap: false,
      },
      yAxis:{
        max:100,
        min:0,
        splitLine:{
          lineStyle:{
            color:'rgba(85,85,85,0.5)'
          }
        }
      },
      tooltip:{
        trigger:'axis',
        confine:true,
        valueFormatter: (value) => value + '%'
      },
      series:[{
        type: 'line',
        data:resObj.value['replay']['heat']['timeline'],
        symbol: 'none',
        areaStyle: {}
      }],
      grid:{
        top:'0px',
        bottom:'0px',
        left:'0px',
        right:'0px'
      }
    }
    }
    return {}
})

</script>

<style scoped>
.skill_statistic_icon{
  height: 60px;
  width: 60px;
}
.infoBox{
  margin-bottom: 20px;
  width: 1400px;
}
.statisticBox{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 1400px;
  background-color: #141414;
  border: 1px solid #555;
  margin-bottom: 20px;
}
.infoBox_inner{
  width: 518px;
  border: 1px solid #555;
  background-color: #141414;
}
.timeFlow{
  display: flex;
  position: relative;
  flex-direction: column;
  height: 350px;
  width: v-bind("timeFlowWidth");
}
.coverage_chart{
  width: v-bind("ChartWidth")
}
.label{
  background-color: #201020;
  height: v-bind("icon_length");
  border-bottom: 1px solid #555;
  padding-left: 10px;
  line-height: v-bind("icon_length");
}
.GCD{
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #555;
  height: v-bind("icon_length");
}
.songStatus{
  display: flex;
  flex-direction: row;
  height: v-bind("icon_length");
  border-bottom: 1px solid #555;
}
.bossPhase{
  display: flex;
  flex-direction: row;
  height: v-bind("icon_length");
  border-bottom: 1px solid #555;
}
.timeScale{
  display: flex;
  flex-direction: row;
  height: v-bind("timeScaleHeight");
}
.noGCD{
  display: flex;
  flex-direction: row;
  height: v-bind("icon_length");
  border-bottom: 1px solid #555;
}
.bossPhase_icon{
  position: absolute;
  top:245px;
}
.flower_icon{
  position: absolute;
  top:197px
}
.noGCD_skill_icon{
  position: absolute;
  top:149px;
}
.GCD_skill_icon{
  position: absolute;
  top:101px;
}
.popUp{
  position: absolute;
  border: 1px solid rgba(85,85,85,0.5);
  border-radius: 12px;
  top: v-bind("popUpPos[1] + 'px'");
  left: v-bind("popUpPos[0] + 'px'");
  background-color: #201020;
}
.阳春白雪·切换{
  background-image: url("../assets/skills_logo/ycbx.png");
  background-color: rgba(0, 255, 170, 0.2);
  background-repeat: no-repeat;
}
.高山流水·切换{
  background-image: url("../assets/skills_logo/gsls.png");
  background-color: rgba(0, 170, 255,0.2);
  background-repeat: no-repeat;
}
.梅花三弄·切换{
  background-image: url("../assets/skills_logo/mhsn.png");
  background-color: rgba(221, 170, 255,0.2);
  background-repeat: no-repeat;
}
</style>