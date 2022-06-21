import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/dark/css-vars.css'
import ECharts from 'vue-echarts'
import { use } from "echarts/core";

import {
    CanvasRenderer
} from 'echarts/renderers'
import {
    LineChart
} from 'echarts/charts'
import {
    GridComponent,
    TooltipComponent,
    DatasetComponent,
    VisualMapComponent,

} from 'echarts/components'

use([
    CanvasRenderer,
    LineChart,
    GridComponent,
    TooltipComponent,
    DatasetComponent,
    VisualMapComponent
]);

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(router)
app.component('v-chart',ECharts)
app.mount('#app')
