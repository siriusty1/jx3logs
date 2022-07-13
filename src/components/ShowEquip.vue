<template>

</template>

<script setup>
import axios from 'axios'

const raw = "31674\t0\t11491\t0\t\t\t\t\n58696\t0\t11471\t11506\t\t\t\t\n59833\t0\t11447\t11507\t\t\t\t\n33869\t0\t11480\t0\t\t\t\t\n33737\t0\t11484\t0\t\t\t\t\n33719\t0\t11484\t0\t\t\t\t\n58612\t0\t11448\t11503\t\t\t\t\n33875\t0\t11482\t0\t\t\t\t\n59827\t0\t11437\t11397\t\t\t\t\n58640\t0\t11470\t11504\t\t\t\t\n58584\t0\t11460\t11505\t\t\t\t\n32126\t8\t11287\t0\t8\t8\t8\t25469"
console.log(raw)
axios({
  method:'get',
  url:'https://node.jx3box.com/equip/armor',
  params:{'id':59592}
}).then((res)=>{
  console.log(res)
})
</script>

<style scoped>

</style>