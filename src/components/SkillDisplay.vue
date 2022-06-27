<template>
  <div class="skill_statistic">
    <div class="skill_icon_box">
      <slot name="icon">
      </slot>
    </div>
    <div style="display:flex;flex-direction: row">
      <div class="skill_details">
        <slot name="details">
        </slot>
      </div>
      <div class="skill_details">
        <el-tooltip v-for="(val, key, index) in skill" placement="right" effect="light">
          <template #content>
            排名：<text :class="color(val[1]['percent'])">{{val['percent']}}%</text><br>
            样本：<text :class="color(val[1]['percent'])">{{val['num']}}</text>
          </template>
          <text :class="color(val[1]['percent'])">{{formatter(val[0])}}</text>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script setup>
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

const formatter = (value) => {
  let x = String(value).indexOf(".") + 1; //得到小数点的位置
  let y = 0
  if (x > 0){
    y = String(value).length - x; //小数点的位数
  }
  if (y > 3){
    return (100 * value).toFixed(2) + '%'
  }else{
    return value
  }
}

const props = defineProps(['skill'])

const fontSize = Object.keys(props.skill).length < 6 ? '14px' : '12px'

</script>

<style scoped>
.skill_statistic{
  margin: 20px;
  height: 100px;
  display: flex;
  flex-direction: row;
}
.skill_icon_box{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
}
.skill_statistic_icon{
  height: 60px;
  width: 60px;
}
.skill_details{
  font-size: v-bind("fontSize");
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>