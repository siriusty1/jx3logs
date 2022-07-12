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
          <img class="occ_icon" :src="getImgUrl('occ_logo','lingsu')" alt="ny" :class="{active:occChosen === 'lingsu'}" @click="occChosen = 'lingsu'">
        </div>
      </div>
    </div>
    <div style="width: 1400px; border: 1px solid #555;margin-top: 20px">
      <div style="margin-bottom: 20px">
        <el-select v-model="season" size="small" style="margin-left:20px;margin-right:20px;margin-top:20px; width:150px">
          <el-option label="江湖无限赛季" value="110-4"></el-option>
          <el-option label="北天药宗赛季" value="110-3"></el-option>
        </el-select>
        <el-select v-if="season === '110-4'" v-model="instance" size="small" style="width:160px;margin-right:20px">
          <el-option label="河阳之战（25人英雄）" value="25人英雄河阳之战"></el-option>
          <el-option label="河阳之战（25人普通）" value="25人普通河阳之战"></el-option>
        </el-select>
        <el-select v-if="season === '110-3'" v-model="instance" size="small" style="width:160px;margin-right:20px">
          <el-option label="雷狱大泽（25人英雄）" value="25人英雄雷狱大泽"></el-option>
          <el-option disabled label="雷狱大泽（25人普通）" value="25人普通雷狱大泽"></el-option>
        </el-select>
        <el-select v-if="season === '110-4'" v-model="boss" size="small" style="width:160px">
          <el-option label="勒齐那" value="勒齐那"></el-option>
          <el-option label="阿阁诺" value="阿阁诺"></el-option>
          <el-option label="周通忌" value="周通忌"></el-option>
          <el-option label="周贽" value="周贽"></el-option>
          <el-option label="常宿" value="常宿"></el-option>
        </el-select>
        <el-select v-if="season === '110-3'" v-model="boss" size="small" style="width:160px">
          <el-option label="巨型尖吻凤" value="巨型尖吻凤"></el-option>
          <el-option label="桑乔" value="桑乔"></el-option>
          <el-option label="悉达罗摩" value="悉达罗摩"></el-option>
          <el-option label="尤迦罗摩" value="尤迦罗摩"></el-option>
          <el-option label="月泉淮" value="月泉淮"></el-option>
          <el-option label="乌蒙贵" value="乌蒙贵"></el-option>
        </el-select>
      </div>
      <div style="margin-left: 20px;margin-right: 20px;margin-bottom: 20px">
        <el-table border :data="rankData" stripe style="width: 100%">
          <el-table-column align="center" label="排名" type="index" width="60" />
          <el-table-column align="center" label="玩家名称" prop="id" />
          <el-table-column align="center" label="服务器" prop="server" />
          <el-table-column align="center" label="表现" width="100">
            <template #default="scope">
              <div style="display: flex;justify-content: center">
                <img :src="getImgUrl('occ_logo',occChosen)" alt="occ" style="height: 24px;width: 24px;margin-right: 5px">
                <div :class="color(scope.row.score)">{{ scope.row.score }}</div>
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
          <el-table-column align="center" label="战斗详情"></el-table-column>
          <el-table-column align="center" label="心法复盘">
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
import { watch, ref } from 'vue'
import { useRouter } from "vue-router";
import axios from 'axios'

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

const occChosen = ref()

const toReplay = (occ,id) =>{
  router.push(`/${occ}/${id}`)
}

const getImgUrl = (folder,name) => {
  return new URL(`../assets/${folder}/${name}.png`, import.meta.url).href
}

const season = ref('110-4')

const instance = ref('25人英雄河阳之战')

const boss = ref('勒齐那')

const page = ref(1)

watch(season,(new_value,old_value)=>{
  if (new_value === '110-3'){
    instance.value = '25人英雄雷狱大泽'
    boss.value = '巨型尖吻凤'
  }else if(new_value === '110-4'){
    instance.value = '25人英雄河阳之战'
    boss.value = '勒齐那'
  }
})

const rankData = ref()

watch(()=>[instance.value,boss.value,occChosen.value,page.value],(newValue)=>{
  if (newValue[2]){
    axios({
      method:'get',
      url:`http://139.199.102.41:8009/getRank?map=${newValue[0]}&boss=${newValue[1]}&occ=${newValue[2]}&page=${newValue[3]}`
    }).then((res)=>{
      let series = []
      for (let i = 0; i < res.data.result.table.length; i++){
        series.push(i)
      }
      console.log(res)
      rankData.value = res.data.result.table
    })
  }
})
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