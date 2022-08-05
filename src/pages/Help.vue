<template>
  <div style="width: 90vw; margin: auto">
    <h2>FAQ</h2>
    <el-row style="margin: 20px">
      <el-col :span="2">
        <el-menu router>
          <el-menu-item index="1" route="/help/dps">
            <span>DPS指标说明</span>
          </el-menu-item>
          <el-menu-item index="2" route="/help/hps">
            <span>HPS指标说明</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="22">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>

</script>

<style scoped>

</style>