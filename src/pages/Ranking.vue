<template>
  <div style="display: flex; justify-content: center; width: 100%;flex-direction: column;align-items: center">
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
          <img class="occ_icon" :src="getImgUrl('occ_logo','yunchangxinjing')" alt="nx" :class="{active:occChosen === '5h'}" @click="occChosen = '5h'">
          <img class="occ_icon" :src="getImgUrl('occ_logo','lijingyidao')" alt="nh" :class="{active:occChosen === '2h'}" @click="occChosen = '2h'">
          <img class="occ_icon" :src="getImgUrl('occ_logo','butianjue')" alt="nd" :class="{active:occChosen === '6h'}" @click="occChosen = '6h'">
          <img class="occ_icon" :src="getImgUrl('occ_logo','xiangzhi')" alt="ng" :class="{active:occChosen === '22h'}" @click="occChosen = '22h'">
          <img class="occ_icon" :src="getImgUrl('occ_logo','lingsu')" alt="ny" :class="{active:occChosen === '212h'}" @click="occChosen = '212h'">
        </div>
      </div>
    </div>
    <div style="width: 1400px; border: 1px solid #555;margin-top: 20px">content</div>
  </div>

</template>

<script setup>
import { ref } from 'vue'

const occChosen = ref()

const getImgUrl = (folder,name) => {
  return new URL(`../assets/${folder}/${name}.png`, import.meta.url).href
}
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