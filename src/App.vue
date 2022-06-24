<template>
  <el-config-provider :locale="zhCn">
      <el-container>
        <el-header class="header">
          <img :src="getImageUrl('logo')" alt="logo" style="height: 40px; width: 40px">
          <div style="margin-left: 10px;font-size: 26px; font-family: 'Microsoft YaHei';">JX3 Logs</div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
  </el-config-provider>
</template>

<script setup>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

const getImageUrl = (name) => {
  return new URL(`./assets/${name}.png`, import.meta.url).href
}
</script>

<style>
body{
  background-color: #001020;
  margin: 0;
}
.header{
  height: 64px;
  background-color: #141414;
  border-bottom: 1px solid #555;
  display: flex;
  align-items: center;
}
.grey{
  color:#666666
}
.green{
  color:#1eff00
}
.blue{
  color:#0070ff
}
.purple{
  color:#a335ee
}
.orange{
  color:#ff8000
}
.pink{
  color:#e268a8
}
.gold{
  color:#e5cc80
}
</style>
