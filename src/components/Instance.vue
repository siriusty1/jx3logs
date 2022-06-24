<template>
  <div class="instance_box">
    <div class="instance_title">
      <img :src="data.inst_pic" alt="logo" class="instance_img">
      <text class="instance_title_text">{{ data.chn_name }}</text>
    </div>
    <div class="instance_box_body">
      <div v-for="(item,index) in data.modules" class="inner_box" >
        <div class="inner_box_title">{{item.label}}</div>
        <div style="font-size: 12px">
          <el-row v-for="(sub_item,sub_index) in item.top3" class="main_blank" @mouseover="mouseOver(index,sub_index)" @mouseleave="mouseLeave" :class="{active:onHoverX === index && onHoverY === sub_index}">
            <el-col :span="3" class="img_blank">
              <img :src="getImgUrl(sub_index)" alt="img" class="metal">
            </el-col>
            <el-col :span="12">
              <el-row style="color:#46c5ff;">{{sub_item.name}}</el-row>
              <el-row class='server_text' :class="{active:onHoverX === index && onHoverY === sub_index}">{{sub_item.server}}</el-row>
            </el-col>
            <el-col class="points" :span="9">{{sub_item.score}}</el-col>
          </el-row>
        </div>
        <div @mouseover="mouseOver(index,3)" @mouseleave="mouseLeave" :class="{active:onHoverX === index && onHoverY === 3}" class="check_more">查看更多...</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'

const onHoverX = ref(-1)
const onHoverY = ref(-1)

const mouseOver = (index,sub_index) =>{
  onHoverX.value = index
  onHoverY.value = sub_index
}

const mouseLeave = () =>{
  onHoverX.value = -1
  onHoverY.value = -1
}

const getImgUrl = (index) => {
  return new URL(`../assets/rank${index}.png`, import.meta.url).href
}

defineProps({
  data: Object
})

</script>


<style scoped>
.instance_box{
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  width: 1200px;
  background-color: #141414;
  border: 1px solid #555;
}
.instance_img{
  height: 80px;
  width: 160px;
}
.instance_title{
  border-bottom: 1px solid #555;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.instance_title_text{
  color: #e1f2f5;
  font-weight: bold;
  font-size: 24px;
  padding-left: 20px
}
.instance_box_body{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding-bottom: 10px;
}
.inner_box{
  width: 32%;
  border: 1px solid #555;
  margin: 10px 5px 0;
}
.inner_box_title{
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  color: #e1f2f5;
  font-weight: bold;
  font-size: 20px;
}
.check_more{
  height:40px;
  font-size: 13px;
  line-height: 40px;
  color: #46c5ff;
  text-align: center;
}
.active{
  background-color: rgba(0,32,64,0.4)
}
.metal{
  height: 32px;
  width: 32px
}
.img_blank{
  display: flex;
  justify-content: center;
  align-items: center;
}
.main_blank{
  height: 45px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.points{
  padding-right: 20px;
  display: flex;
  justify-content: right;
  align-items: center;
  color: #d1fa99;
}
.server_text{
  color:#808080
}
.server_text.active{
  color: white;
  background-color: rgba(0,0,0,0);
}

</style>
