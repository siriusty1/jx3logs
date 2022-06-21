<template>
  <div style="display: flex; flex-direction: column; align-items: center">
    <div class="character_box">
      <div style="display: flex;flex-direction: row;padding: 10px">
        <div style="display: flex;justify-content: center;align-items: center">
          <img :src="getImgUrl('jobs_logo',job)" alt="img" class="job_icon">
        </div>
        <div style="flex-direction: column">
          <div style="font-size: 28px; font-weight: bold;padding-bottom: 10px">水彩画</div>
          <div>破阵子（双线一区）</div>
        </div>
      </div>
      <div class="talent_choose">
        <img @click="mainTalent" :class="{active:activeTalent === 1}" class="talent_img" :src="getImgUrl('talents_logo',jobsTable[job][0])">
        <img v-if="jobsTable[job].length > 1" @click="subTalent" :class="{active:activeTalent === 2}" class="talent_img" :src="getImgUrl('talents_logo',jobsTable[job][1])">
      </div>
    </div>
    <div class="main_box">
      <div>
        <el-select v-model="season" size="small" style="padding-left:20px;padding-right:20px;padding-top:20px; width:150px">
          <el-option label="江湖无限赛季" value="110-4"></el-option>
          <el-option label="北天药宗赛季" value="110-3"></el-option>
        </el-select>
        <el-select v-if="season === '110-4'" v-model="instance" size="small" style="width:150px">
          <el-option label="河阳之战（25人英雄）" value="hyzz_yx"></el-option>
          <el-option label="河阳之战（25人普通）" value="hyzz_pt"></el-option>
        </el-select>
        <el-select v-if="season === '110-3'" v-model="instance" size="small" style="width:150px">
          <el-option label="雷狱大泽（25人英雄）" value="lydz_yx"></el-option>
          <el-option disabled label="雷狱大泽（25人普通）" value="lydz_pt"></el-option>
        </el-select>
      </div>
      <div style="height: 400px; border:1px solid #555; margin:20px; display: flex; flex-direction: row;justify-content: space-between">
        <div>
          CHART AREA
        </div>
        <div style="border-left: 1px solid #555; width: 300px; display: flex; flex-direction: column; justify-content: center;align-items: center">
          <div style="font-size:22px; font-weight: bold; margin-bottom: 10px">最佳综合表现分</div>
          <div style="font-size:26px; font-weight: bold; margin-bottom: 10px" :class="color(bestPerf)">{{ bestPerf }}</div>
          <div style="font-size:22px; font-weight: bold; margin-bottom: 10px">综合表现中位数</div>
          <div style="font-size:26px; font-weight: bold; margin-bottom: 10px" :class="color(medPerf)">{{ medPerf }}</div>
        </div>
      </div>
      <div style="margin: 0px 20px 20px 20px;border: 1px solid #555">
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
          <el-table-column align="center" label="中位数%" />
          <el-table-column align="center" label="最高nDPS" />
          <el-table-column align="center" label="最高rDPS" />
          <el-table-column align="center" label="最高aDPS" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import {watch,reactive,ref} from "vue";

const season = ref('110-4')

const instance = ref('hyzz_yx')

const job = ref('mj')

const jobsTable = {
  'bd':['baj'],
  'cg':['mw','xz'],
  'cj':['sjjy'],
  'cy':['fsj','tgy'],
  'cyg':['zxg','txjy'],
  'lxg':['ylj'],
  'mj':['fy','mz'],
  'pl':['lhj'],
  'qx':['bx','ycxj'],
  'sl':['yjj','xsj'],
  'tc':['axzy','tll'],
  'tm':['jyj','tlgd'],
  'wd':['dj','btj'],
  'wh':['hjy','ljyd'],
  'ytz':['txj'],
  'yz':['wf','ls']
}

const getImgUrl = (folder,name) => {
  return new URL(`../assets/${folder}/${name}.png`, import.meta.url).href
}

const activeTalent = ref(1)

const mainTalent = () => {
 activeTalent.value = 1
}

const subTalent = () => {
  activeTalent.value = 2
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

watch(season,(new_value,old_value)=>{
  if (new_value === '110-3'){
    instance.value = 'lydz_yx'
  }else if(new_value === '110-4'){
    instance.value = 'hyzz_yx'
  }
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
const bestPerf = ref(100)

const medPerf = ref(95.6)

</script>

<style scoped>
.job_icon{
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
.talent_choose{
  display: flex;
  align-items: center;
}
.talent_img{
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