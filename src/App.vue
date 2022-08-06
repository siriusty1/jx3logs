<template>
  <el-config-provider :locale="zhCn">
      <el-container>
        <el-header class="header">
          <div style="display: flex;justify-content: center;align-items: center;cursor: pointer" @click="router.push('/')">
            <img :src="getImageUrl('logo')" alt="logo" style="height: 40px; width: 40px">
            <div style="margin-left: 10px;font-size: 26px; font-family: 'Microsoft YaHei';">JX3 Logs</div>
          </div>
          <el-input style="width: 200px;margin-left: 60px" placeholder="请输入角色名进行查询" v-model="name"></el-input>
          <el-select style="width: 150px;margin-left: 10px" placeholder="请选择服务器" v-model="server" filterable>
            <el-option-group
                v-for="group in options"
                :key="group.label"
                :label="group.label"
            >
              <el-option
                  v-for="item in group.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-option-group>
          </el-select>
          <el-button :icon="Search" style="margin-left: 10px" @click="startSearch" />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
  </el-config-provider>
</template>

<script setup>
import {ref} from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import {Search} from '@element-plus/icons-vue'
import {useRouter} from 'vue-router'

const router = useRouter()

const name = ref()
const server = ref()

const options = [
  {
    label: '双线一区',
    options: [
      {
        value: '天鹅坪',
        label: '天鹅坪',
      },
      {
        value: '破阵子',
        label: '破阵子',
      }
    ],
  },
  {
    label: '双线二区',
    options: [
      {
        value: '飞龙在天',
        label: '飞龙在天',
      }
    ],
  },
  {
    label: '双线四区',
    options: [
      {
        value: '青梅煮酒',
        label: '青梅煮酒',
      }
    ],
  },
  {
    label: '电信一区',
    options: [
      {
        value: '龙争虎斗',
        label: '龙争虎斗',
      },
      {
        value: '蝶恋花',
        label: '蝶恋花',
      },
      {
        value: '长安城',
        label: '长安城',
      }
    ],
  },
  {
    label: '电信五区',
    options: [
      {
        value: '乾坤一掷',
        label: '乾坤一掷',
      },
      {
        value: '唯我独尊',
        label: '唯我独尊',
      },
      {
        value: '梦江南',
        label: '梦江南',
      },
      {
        value: '斗转星移',
        label: '斗转星移',
      },
      {
        value: '幽月轮',
        label: '幽月轮',
      },
      {
        value: '剑胆琴心',
        label: '剑胆琴心',
      },
    ],
  },
  {
    label:'电信八区',
    options: [
      {
        value: '绝代天骄',
        label: '绝代天骄',
      },
    ]
  },
  {
    label:'國際服',
    options: [
      {
        value: '傲血戰意',
        label: '傲血戰意',
      },
    ]
  }
]
const getImageUrl = (name) => {
  return new URL(`./assets/${name}.png`, import.meta.url).href
}

const startSearch = () =>{
  if(name.value && server.value){
    router.push(`/character/${server.value}/${name.value}`)
  }
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
