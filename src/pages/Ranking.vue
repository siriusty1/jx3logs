<template>
  <div style="display: flex; justify-content: center; width: 100%;flex-direction: column;align-items: center">
    <div style="font-size: 20px; font-weight: bold; width: 1400px;margin-bottom: 20px">天梯榜</div>
    <div style="display: flex; justify-content: space-between;width: 1400px">
      <div style="border: 1px solid #555">
        <div style="text-align: center;margin-top: 5px;margin-bottom: 5px;color:#555">防御心法(制作中)</div>
        <div>
          <img class="occ_icon" :src="getImgUrl('occ_logo','xisuijing')" alt="xs">
          <img class="occ_icon" :src="getImgUrl('occ_logo','tielao')" alt="tl">
          <img class="occ_icon" :src="getImgUrl('occ_logo','mingzun')" alt="mz">
          <img class="occ_icon" :src="getImgUrl('occ_logo','tieguyi')" alt="tg">
        </div>
      </div>
      <div style="border: 1px solid #555">
        <div style="text-align: center;margin-top: 5px;margin-bottom: 5px;color:#555">输出心法(制作中)</div>
        <div>
          <img class="occ_icon" :src="getImgUrl('occ_logo','0')" alt="bx">
          <img class="occ_icon" :src="getImgUrl('occ_logo','bingxinjue')" alt="bx">
          <img class="occ_icon" :src="getImgUrl('occ_logo','huajianyou')" alt="hj">
          <img class="occ_icon" :src="getImgUrl('occ_logo','dujing')" alt="dj">
          <img class="occ_icon" :src="getImgUrl('occ_logo','mowen')" alt="mw">
          <img class="occ_icon" :src="getImgUrl('occ_logo','wufang')" alt="wf">
          <img class="occ_icon" :src="getImgUrl('occ_logo','yijinjing')" alt="yj">
          <img class="occ_icon" :src="getImgUrl('occ_logo','fenying')" alt="fy">
          <img class="occ_icon" :src="getImgUrl('occ_logo','zixiagong')" alt="qc">
          <img class="occ_icon" :src="getImgUrl('occ_logo','tianluo')" alt="tl">
          <img class="occ_icon" :src="getImgUrl('occ_logo','taixuanjing')" alt="yt">
          <img class="occ_icon" :src="getImgUrl('occ_logo','aoxue')" alt="ax">
          <img class="occ_icon" :src="getImgUrl('occ_logo','fenshanjin')" alt="fs">
          <img class="occ_icon" :src="getImgUrl('occ_logo','taixujianyi')" alt="jc">
          <img class="occ_icon" :src="getImgUrl('occ_logo','jingyujue')" alt="jy">
          <img class="occ_icon" :src="getImgUrl('occ_logo','wenshuijue')" alt="cj">
          <img class="occ_icon" :src="getImgUrl('occ_logo','xiaochenjue')" alt="gb">
          <img class="occ_icon" :src="getImgUrl('occ_logo','beiaojue')" alt="bd">
          <img class="occ_icon" :src="getImgUrl('occ_logo','linghaijue')" alt="pl">
          <img class="occ_icon" :src="getImgUrl('occ_logo','yinlongjue')" alt="lx">
        </div>
      </div>
      <div style="border: 1px solid #555">
        <div style="text-align: center;margin-top: 5px;margin-bottom: 5px">治疗心法</div>
        <div>
          <img class="occ_icon" :src="getImgUrl('occ_logo','yunchangxinjing')" alt="nx" :class="{active:occChosen === 'yunchangxinjing'}" @click="occChosen = 'yunchangxinjing'">
          <img class="occ_icon" :src="getImgUrl('occ_logo','lijingyidao')" alt="nh" :class="{active:occChosen === 'lijingyidao'}" @click="occChosen = 'lijingyidao'">
          <img class="occ_icon" :src="getImgUrl('occ_logo','butianjue')" alt="nd" :class="{active:occChosen === 'butianjue'}" @click="occChosen = 'butianjue'">
          <img class="occ_icon" :src="getImgUrl('occ_logo','xiangzhi')" alt="ng" :class="{active:occChosen === 'xiangzhi'}" @click="occChosen = 'xiangzhi'">
          <img class="occ_icon" :src="getImgUrl('occ_logo','lingsu')" alt="ny" :class="{active:occChosen === 'lingsu'}" @click="occChosen ='lingsu'">
        </div>
      </div>
    </div>
    <div style="width: 1400px; border: 1px solid #555;margin-top: 20px">
      <div style="margin-bottom: 20px;margin-top: 20px;display: flex;justify-content: left;align-items: center">
        <el-select v-model="instance" size="small" style="width:160px;margin-left:20px;margin-right:20px" placeholder="请选择副本">
          <el-option-group label="横刀断浪赛季">
          <el-option label="西津渡（25人英雄）" value="25人英雄西津渡"></el-option>
          <el-option label="西津渡（25人普通）" value="25人普通西津渡"></el-option>
          </el-option-group>
        </el-select>
        <el-select v-model="boss" size="small" style="width:160px" placeholder="请选择首领">
          <el-option v-for="item in bossTable" :label="item" :value="item"></el-option>
        </el-select>
        <el-radio-group style="margin-left:20px;" v-model="displayData" size="small">
          <el-radio-button label="表现分" />
          <el-radio-button label="rHPS" />
          <el-radio-button label="rDPS" />
          <el-radio-button label="nDPS" />
          <el-radio-button label="mrDPS" />
          <el-radio-button label="mnDPS" />
        </el-radio-group>
      </div>
      <div style="margin-left: 20px;margin-right: 20px;margin-bottom: 20px">
        <el-table border :data="rankData" stripe style="width: 100%">
          <el-table-column align="center" label="排名" type="index" width="60" />
          <el-table-column align="center" label="玩家名称" prop="id">
            <template #default="scope">
              <div style="display: flex;justify-content: center">
                <img :src="getImgUrl('occ_logo',occChosen)" alt="occ" style="height: 24px;width: 24px;margin-right: 5px">
                <div>{{ scope.row.id }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="服务器" width="100" prop="server" />
          <el-table-column align="center" label="排名" width="100">
            <template #default="scope">
              <div style="display: flex;justify-content: center">
                <div v-if="displayData === '表现分'">
                  <div :class="color(scope.row.scoreRank)">{{ scope.row.scoreRank + '%' }}</div>
                </div>
                <div v-else-if="displayData === 'rHPS'">
                  <div :class="color(scope.row.rhpsRank)">{{ scope.row.rhpsRank + '%' }}</div>
                </div>
                <div v-else-if="displayData === 'rDPS'">
                  <div :class="color(scope.row.rdpsRank)">{{ scope.row.rdpsRank + '%' }}</div>
                </div>
                <div v-else-if="displayData === 'nDPS'">
                  <div :class="color(scope.row.ndpsRank)">{{ scope.row.ndpsRank + '%' }}</div>
                </div>
                <div v-else-if="displayData === 'mrDPS'">
                  <div :class="color(scope.row.mrdpsRank)">{{ scope.row.mrdpsRank + '%' }}</div>
                </div>
                <div v-else-if="displayData === 'mnDPS'">
                  <div :class="color(scope.row.mndpsRank)">{{ scope.row.mndpsRank + '%' }}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="displayData" width="100">
            <template #default="scope">
              <div style="display: flex;justify-content: center">
                <div v-if="displayData === '表现分'">{{ (scope.row.score / 100).toFixed(2) }}</div>
                <div v-else-if="displayData === 'rHPS'">{{ scope.row.rhps }}</div>
                <div v-else-if="displayData === 'rDPS'">{{ scope.row.rdps }}</div>
                <div v-else-if="displayData === 'nDPS'">{{ scope.row.ndps }}</div>
                <div v-else-if="displayData === 'mrDPS'">{{ scope.row.mrdps }}</div>
                <div v-else-if="displayData === 'mnDPS'">{{ scope.row.mndps }}</div>
              </div>
            </template>
          </el-table-column>
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
          <el-table-column align="center" label="复盘版本" prop="edition" width="100" />
          <el-table-column align="center" label="战斗详情" width="100"></el-table-column>
          <el-table-column align="center" label="心法复盘" width="100">
            <template #default="scope">
              <el-button @click="toReplay(occChosen, scope.row.shortID)" link type="primary">前往复盘</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>

</template>

<script setup>
import { computed, watch, ref } from 'vue'
import { useRoute,useRouter } from "vue-router";
import axios from 'axios'

const route = useRoute()
const router = useRouter()

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

const occChosen = ref(route.query.occ)

const changeOcc = (occ) => {
  let newQuery = route.query
  newQuery.occ = occ
  router.push({path:'/ranking', query: newQuery})
}

const toReplay = (occ,id) =>{
  router.push(`/${occ}/${id}`)
}

const getImgUrl = (folder,name) => {
  return new URL(`../assets/${folder}/${name}.png`, import.meta.url).href
}

const bossTable = computed(()=>{
  if (instance.value === '25人英雄西津渡' || instance.value === '25人普通西津渡'){
    return ['张景超','刘展','苏凤楼','韩敬青','藤原佑野','李重茂']
  }else if (instance.value === '25人英雄河阳之战' || instance.value === '25人普通河阳之战'){
    return ['勒齐那', '阿阁诺', '周通忌', '周贽','常宿']
  }else if (instance.value === '25人英雄雷域大泽' || instance.value === '25人英雄雷域大泽'){
    return ['巨型尖吻凤','桑乔','悉达罗摩','尤迦罗摩','月泉淮','乌蒙贵']}
})

  // '25人英雄河阳之战':['勒齐那', '阿阁诺', '周通忌', '周贽','常宿'],
  // '25人普通河阳之战':['勒齐那', '阿阁诺', '周通忌', '周贽','常宿'],
  // '25人英雄雷域大泽':['巨型尖吻凤','桑乔','悉达罗摩','尤迦罗摩','月泉淮','乌蒙贵'],
  // '25人普通雷域大泽':['巨型尖吻凤','桑乔','悉达罗摩','尤迦罗摩','月泉淮','乌蒙贵']


const instance = ref(route.query.map)

const boss = ref(route.query.boss)

const page = ref(1)

const rankData = ref()

const displayData = ref('表现分')

watch(()=>instance.value,(newValue)=>{
  if (newValue ==='25人英雄西津渡' || newValue ==='25人普通西津渡'){
    boss.value = '张景超'
  }else if (newValue ==='25人英雄河阳之战' || newValue ==='25人普通河阳之战'){
    boss.value = '勒齐那'
  }else if (newValue === '25人英雄雷域大泽' || newValue === '25人英雄雷域大泽'){
    boss.value = '巨型尖吻凤'
  }
})

watch(()=>[instance.value,boss.value,occChosen.value,page.value],(newValue)=>{
  router.push({
    url:'/ranking',
    query:{
      'map':newValue[0],
      'boss':newValue[1],
      'occ':newValue[2]
    }
  })
  if (instance.value && boss.value && occChosen.value){
    axios({
      method:'get',
      url:`http://120.48.95.56:8009/getRank?map=${instance.value}&boss=${boss.value}&occ=${occChosen.value}&page=${page.value}`
    }).then((res)=>{
      let series = []
      for (let i = 0; i < res.data.result.table.length; i++){
        series.push(i)
      }
      rankData.value = res.data.result.table
    })
  }
},{immediate:true})


</script>

<style scoped>
.occ_icon{
  height: 36px;
  width: 36px;
  margin: 5px;
  filter: grayscale(100%);
}
.active{
  filter: grayscale(0);
}
</style>