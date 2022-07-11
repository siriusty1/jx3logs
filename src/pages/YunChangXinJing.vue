<template>
  <template v-if="loaded">
    <div style="display:flex;flex-direction:column;align-items: center;position: relative">
      <div style="display:flex; justify-content:space-between;font-size: 20px; font-weight: bold; width: 1400px;margin-bottom: 20px">
        <div>奶秀复盘 8.0.2</div>
        <div v-if="'score' in resObj.skill.general">
          <text>综合评分：</text>
          <text :class="color(resObj.skill.general.score)">{{resObj.skill.general.score.toFixed(2)}}</text>
        </div>
      </div>
      <div class="infoBox">
        <div style="display:flex; flex-direction:row;justify-content: space-around; border: 1px solid #555; font-size: 14px;width: 300px;background-color: #141414">
          <div>
            <div style="margin: 10px 10px 5px">玩家名称：</div>
            <div style="margin: 5px 10px 5px;">服务器：</div>
            <div style="margin: 5px 10px 5px;">战斗时间：</div>
            <div style="margin: 5px 10px 5px;">生成时间：</div>
            <div style="margin: 5px 10px 5px;">副本：</div>
            <div style="margin: 5px 10px 5px;">首领：</div>
            <div style="margin: 5px 10px 5px;">有效人数：</div>
            <div style="margin: 5px 10px 5px;">战斗时长：</div>
            <div style="margin: 5px 10px 10px;">数据种类：</div>
          </div>
          <div>
            <div style="margin: 10px 10px 5px">{{ resObj.overall['name'] }}</div>
            <div style="margin: 5px 10px 5px;">{{ resObj.overall['server'] }}</div>
            <div style="margin: 5px 10px 5px;">{{ resObj.overall['battleTimePrint'] }}</div>
            <div style="margin: 5px 10px 5px;">{{ resObj.overall['generateTimePrint'] }}</div>
            <div style="margin: 5px 10px 5px;">{{ resObj.overall['map'] }}</div>
            <div style="margin: 5px 10px 5px;">{{ resObj.overall['boss'] }}</div>
            <div style="margin: 5px 10px 5px;">{{ resObj.overall['numPlayer'] }}</div>
            <div style="margin: 5px 10px 5px;">{{ resObj.overall['sumTimePrint'] }}</div>
            <div style="margin: 5px 10px 10px;">{{ resObj.overall['dataType'] }}</div>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;justify-content: space-between; width: 600px; border: 1px solid #555;margin-left: 20px;margin-right: 20px; background-color: #141414">
          <div style="margin: 10px">
            <div style="font-size: 18px;font-weight: bold;margin-bottom: 10px">装备</div>
            <div v-if="resObj.equip['available']" style="font-size: 14px">
              装备信息展示待更新。

            </div>
            <div v-if="!resObj.equip['available']" style="font-size: 14px">
              装备信息获取失败。在进入战斗后打开团队装分面板即可获取。如果是第一视角也可以自动获取。
            </div>
          </div>
          <div style="margin: 10px">
            <div style="font-size: 18px;font-weight: bold;margin-bottom: 10px">奇穴</div>
            <div v-if="resObj.qixue['available']" style="font-size: 14px;display: flex;justify-content: space-around">
              <div v-for="i in 12" style="display: flex;flex-direction: column;
                   justify-content: center;align-items: center"
                   @mouseenter="enterQixue($event,qixueTable[resObj.qixue[i]]['desc'])"
                   @mouseleave="leaveQixue($event,'')">
                <img :src="getImageUrl(qixueTable[resObj.qixue[i]]['img'],'skills_logo')" alt="img" style="width: 32px">
                <div>{{ qixueTable[resObj.qixue[i]]['alias'] }}</div>
              </div>
            </div>
            <div v-if="!resObj.qixue['available']" style="font-size: 14px">
              奇穴信息获取失败。在进入战斗后打开团队装分面板即可获取。如果是第一视角也可以自动获取。
            </div>
          </div>
        </div>
        <div style="display: flex; border: 1px solid #555; width: 500px; background-color: #141414">
          <v-chart :option="healer_chart" style="height: 100%;width: 100%"></v-chart>
        </div>
      </div>
<!--                  统计面板-->
      <el-tabs type="border-card"  class="statisticBox">
        <el-tab-pane label="即时排名">
          <div class="statisticBoxInner">
            <SkillDisplay :skill="timeFlowData.realTimeRank['hxpy']" :sortList="{
        'key':['num','numPerSec','delay','HPS','effRate'],
        'value':['数量：','每秒数量：','延迟：','HPS：','有效比例：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('hxpy','skills_logo')" alt="回雪飘摇">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">回雪飘摇</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.realTimeRank['xlwl']" :sort-list="{
        'key':['num','numPerSec','delay','shuangluanHPS','HPS','cover'],
        'value':['数量：','每秒数量：','延迟：','首跳HPS：','持续HPS：','覆盖率：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('xlwl','skills_logo')" alt="翔鸾舞柳">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">翔鸾舞柳</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.realTimeRank['sydh']" :sort-list="{
        'key':['num','numPerSec','delay','shuangluanHPS','HPS','cover'],
        'value':['数量：','每秒数量：','延迟：','首跳HPS：','持续HPS：','覆盖率：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('sydh','skills_logo')" alt="上元点鬟">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">上元点鬟</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.realTimeRank['wmhm']" :sort-list="{
        'key':['num','numPerSec','HPS','cizhiHPS','effRate'],
        'value':['数量：','每秒数量：','HPS：','辞致HPS：','有效比例：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('wmhm','skills_logo')" alt="王母挥袂">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">王母挥袂</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.realTimeRank['fxda']" :sort-list="{
        'key':['num','numPerSec','HPS','wanqingHPS','effRate'],
        'value':['数量：','每秒数量：','HPS：','晚晴HPS','有效比例：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('fxda','skills_logo')" alt="风袖低昂">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">风袖低昂</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.realTimeRank['jwfh']" :sort-list="{
        'key':['num','numPerSec','HPS','effRate'],
        'value':['数量：','每秒数量：','HPS：','有效比例：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('jwfh','skills_logo')" alt="九微飞花">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">九微飞花</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.realTimeRank['tzhy']" :sort-list="{
        'key':['num','numPerSec','HPS'],
        'value':['数量：','每秒数量：','HPS：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('tzhy','skills_logo')" alt="七情和合">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">跳珠憾玉</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.realTimeRank['general']" :sort-list="{
        'key':['chuimeiHPS','efficiency','efficiencyNonGcd'],
        'value':['垂眉HPS：','GCD效率：','战斗效率：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('tuanfu','skills_logo')" alt="团辅">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">综合</text>
              </template>
            </SkillDisplay>
          </div>
        </el-tab-pane>
        <el-tab-pane label="全时刻排名">
          <div class="statisticBoxInner">
            <SkillDisplay :skill="timeFlowData.allTimeRank['hxpy']" :sortList="{
        'key':['num','numPerSec','delay','HPS','effRate'],
        'value':['数量：','每秒数量：','延迟：','HPS：','有效比例：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('hxpy','skills_logo')" alt="回雪飘摇">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">回雪飘摇</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.allTimeRank['xlwl']" :sort-list="{
        'key':['num','numPerSec','delay','shuangluanHPS','HPS','cover'],
        'value':['数量：','每秒数量：','延迟：','首跳HPS：','持续HPS：','覆盖率：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('xlwl','skills_logo')" alt="翔鸾舞柳">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">翔鸾舞柳</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.allTimeRank['sydh']" :sort-list="{
        'key':['num','numPerSec','delay','shuangluanHPS','HPS','cover'],
        'value':['数量：','每秒数量：','延迟：','首跳HPS：','持续HPS：','覆盖率：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('sydh','skills_logo')" alt="上元点鬟">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">上元点鬟</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.allTimeRank['wmhm']" :sort-list="{
        'key':['num','numPerSec','HPS','cizhiHPS','effRate'],
        'value':['数量：','每秒数量：','HPS：','辞致HPS：','有效比例：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('wmhm','skills_logo')" alt="王母挥袂">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">王母挥袂</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.allTimeRank['fxda']" :sort-list="{
        'key':['num','numPerSec','HPS','wanqingHPS','effRate'],
        'value':['数量：','每秒数量：','HPS：','晚晴HPS','有效比例：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('fxda','skills_logo')" alt="风袖低昂">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">风袖低昂</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.allTimeRank['jwfh']" :sort-list="{
        'key':['num','numPerSec','HPS','effRate'],
        'value':['数量：','每秒数量：','HPS：','有效比例：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('jwfh','skills_logo')" alt="九微飞花">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">九微飞花</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.allTimeRank['tzhy']" :sort-list="{
        'key':['num','numPerSec','HPS'],
        'value':['数量：','每秒数量：','HPS：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('tzhy','skills_logo')" alt="七情和合">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">跳珠憾玉</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.allTimeRank['general']" :sort-list="{
        'key':['chuimeiHPS','efficiency','efficiencyNonGcd'],
        'value':['垂眉HPS：','GCD效率：','战斗效率：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('tuanfu','skills_logo')" alt="团辅">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">综合</text>
              </template>
            </SkillDisplay>
          </div>
        </el-tab-pane>
      </el-tabs>
      <!--      时间轴        -->
      <div style="display:flex;flex-direction:row; width: 1400px; border: 1px solid #555;background-color: #141414;position: relative;margin-bottom: 20px">
        <div style="display:flex;flex-direction:column; width: 150px;border-right: 1px solid #555">
          <div style="height: 100px; padding-left:10px; line-height:100px; background-color:#201020; border-bottom: 1px solid #555;">HOT覆盖率</div>
          <div class="label">GCD技能</div>
          <div class="label">回雪飘摇</div>
          <div class="label">非GCD技能</div>
          <div class="label">BOSS机制</div>
        </div>
        <el-scrollbar style="width: 1250px;position: relative" ref="scrollBar" @wheel.prevent="handleScroll">
          <div class="timeFlow">
            <div style="height: 100px;width: 100%;border-bottom: 1px solid #555">
              <v-chart :option="buffCoverChart" style="width: 100%;height: 100%"></v-chart>
            </div>
            <div class="GCD">
              <div v-for="i in timeFlowData.timeScale" style="height: 100%; width: 199px;border-right: 1px solid rgba(85,85,85,0.5)"></div>
              <img v-for="(item, index) in timeFlowData.casting"
                   :src="getImageUrl(item.iconid,'skills_logo')"
                   alt="icon"
                   class="GCD_skill_icon"
                   @mouseenter="enterImg($event,item)"
                   @mouseleave="leaveImg($event,item)"
                   :style="{
                           left:xPosition(item.start),
                           height: icon_length,
                           width: Math.floor(item.duration / 1000 * 40) + 'px'
                          }">
              <img v-for="(item, index) in timeFlowData.firstHit"
                   :src="getImageUrl(item.iconid + '_' + item['hits'],'skills_logo')"
                   alt="icon"
                   class="GCD_skill_icon"
                   @mouseenter="enterImg($event,item)"
                   @mouseleave="leaveImg($event,item)"
                   :style="{
                           left:xPosition(item.start),
                           height: icon_length,
                           width: Math.floor(item.duration * item['hits']/ 1000 * 40) + 'px'
                          }">
            </div>
            <div class="huixue">
              <div v-for="i in timeFlowData.timeScale" style="height: 100%; width: 199px;border-right: 1px solid rgba(85,85,85,0.5)"></div>
              <div class="huixue_icon" v-for="item in timeFlowData.hxpyChannel" :style="{
                backgroundColor:'rgb(255, 127, 255)',
                borderRadius:'3px',
                left:xPosition(item['startTime']),
                height: icon_length,
                width: Math.floor(item['duration'] * 40 / 1000) + 'px'}">
              </div>
            </div>
            <div class="noGCD">
              <div v-for="i in timeFlowData.timeScale" style="height: 100%; width: 199px;border-right: 1px solid rgba(85,85,85,0.5)"></div>
              <img v-for="(item, index) in resObj['replay']['special']"
                   @mouseenter="enterImg($event,item)"
                   @mouseleave="leaveImg($event,item)"
                   :src="getImageUrl(item.iconid,'skills_logo')"
                   alt="icon"
                   class="noGCD_skill_icon"
                   :style="{
               left:xPosition(item.start),
               height: icon_length,
               width: icon_length
             }">
            </div>
            <div class="bossPhase">
              <div v-for="i in timeFlowData.timeScale" style="height: 100%; width: 199px;border-right: 1px solid rgba(85,85,85,0.5)"></div>
              <img v-for="(item, index) in resObj['replay']['environment']"
                   :src="getImageUrl(item.iconid,'skills_logo')"
                   alt="icon"
                   class="bossPhase_icon"
                   @mouseenter="enterImg($event,item)"
                   @mouseleave="leaveImg($event,item)"
                   :style="{
               left: xPosition(item.start),
               height: icon_length,
               width: icon_length
             }">
            </div>
            <div class="timeScale">
              <div v-for="i in timeFlowData.timeScale" style="display:flex; justify-content: space-between;flex-direction:column; height: 100%; width: 199px;border-right: 1px solid rgba(85,85,85,0.5)">
                <text style="margin-left: 10px">{{ (i-1)*5 }}</text>
                <text v-if="(i-1)*5 % 60 === 0" style="margin-left: 10px">{{ (i-1)*5 / 60 }}min</text>
              </div>
            </div>
            <div ref="popUp" v-if="popUpShow" class="popUp">
              <div style="font-size:20px ;font-weight: bold; margin: 10px">{{ popUpDetails['skillname'] }}</div>
              <div v-if="popUpDetails['description']" style="margin: 10px">{{ popUpDetails['description'] }}</div>
              <div v-if="popUpDetails['heal']" style="margin: 10px">治疗量：{{ popUpDetails['heal'] }}</div>
              <div v-if="popUpDetails['healeff']" style="margin: 10px">有效治疗量：{{ popUpDetails['healeff'] }}</div>
              <div v-if="popUpDetails['targetName']" style="margin: 10px" v-html="'目标：' + popUpDetails['targetName']"></div>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <!--      手法警察       -->
      <template v-if="'review' in resObj">
        <Review :review="resObj.review[['content']]"></Review>
      </template>
      <template v-if="!('review' in resObj)">
        <div class="reviewBox">
          <div style="height:49px;line-height:49px; margin-left: 15px;font-size: 20px; font-weight: bold">建议</div>
          <div style="margin-left: 10px; margin-bottom: 10px">该战斗记录生成时的复盘版本不支持此功能</div>
        </div>
      </template>
      <!--      奇穴悬浮窗-->
      <div v-if="qixueDetailsShow" ref="qixueBox" class="qixueBoxStyle">
        <div style="font-size:14px; margin: 10px">
          <text>{{ qixueDetails }}</text>
        </div>
      </div>
    </div>
  </template>

  <template v-if="err === 'unsupport'">
    <div style="display: flex;;flex-direction: column;align-items: center;">
      <div style="width: 190px;height: 190px;background-color: #000000;display: flex;justify-content: center;align-items: center">
        <div>
          <div style="font-size:54px; font-weight: bold; display: flex">
            <div style="height: 80px;width: 80px;display: flex;justify-content: center;line-height: 80px;margin-right: 10px;margin-bottom: 10px">你</div>
            <div style="height: 80px;width: 80px;display: flex;justify-content: center;line-height: 80px">先</div>
          </div>
          <div style="font-size:54px; font-weight: bold;display: flex">
            <div style="height: 80px;width: 80px;display: flex;justify-content: center;line-height: 80px;margin-right: 10px">别</div>
            <div style="height: 80px;width: 80px;display: flex;justify-content: center;line-height: 80px; color:#000000;
          background-color: rgb(247,151,30)">急</div>
          </div>
        </div>
      </div>
      <div style="font-size: 36px;font-weight: bold;margin-top:40px; margin-bottom: 40px">哈哈，报错了！</div>
      <div style="font-size: 24px">不支持的心法，请等待之后的版本更新！</div>
    </div>
  </template>
  <template v-if="err === 'private'">
    <div style="display: flex;;flex-direction: column;align-items: center;">
      <div style="width: 190px;height: 190px;background-color: #000000;display: flex;justify-content: center;align-items: center">
        <div>
          <div style="font-size:54px; font-weight: bold; display: flex">
            <div style="height: 80px;width: 80px;display: flex;justify-content: center;line-height: 80px;margin-right: 10px;margin-bottom: 10px">你</div>
            <div style="height: 80px;width: 80px;display: flex;justify-content: center;line-height: 80px">先</div>
          </div>
          <div style="font-size:54px; font-weight: bold;display: flex">
            <div style="height: 80px;width: 80px;display: flex;justify-content: center;line-height: 80px;margin-right: 10px">别</div>
            <div style="height: 80px;width: 80px;display: flex;justify-content: center;line-height: 80px; color:#000000;
          background-color: rgb(247,151,30)">急</div>
          </div>
        </div>
      </div>
      <div style="font-size: 36px;font-weight: bold;margin-top:40px; margin-bottom: 40px">哈哈，报错了！</div>
      <div style="font-size: 24px">该战斗记录被上传者设置为未公开！</div>
    </div>
  </template>
  <template v-if="err === 'unexist'">
    <div style="display: flex;flex-direction: column;align-items: center">
      <div style="width: 190px;height: 190px;background-color: #000000;display: flex;justify-content: center;align-items: center">
        <div>
          <div style="font-size:54px; font-weight: bold; display: flex">
            <div style="height: 80px;width: 80px;display: flex;justify-content: center;line-height: 80px;margin-right: 10px;margin-bottom: 10px">你</div>
            <div style="height: 80px;width: 80px;display: flex;justify-content: center;line-height: 80px">先</div>
          </div>
          <div style="font-size:54px; font-weight: bold;display: flex">
            <div style="height: 80px;width: 80px;display: flex;justify-content: center;line-height: 80px;margin-right: 10px">别</div>
            <div style="height: 80px;width: 80px;display: flex;justify-content: center;line-height: 80px; color:#000000;
          background-color: rgb(247,151,30)">急</div>
          </div>
        </div>
      </div>
      <div style="font-size: 36px;font-weight: bold;margin-top:40px; margin-bottom: 40px">哈哈，报错了！</div>
      <div style="font-size: 24px">未找到该战斗记录！</div>
    </div>
  </template>
</template>

<script setup>
import { nextTick, ref, toRaw,computed} from 'vue'
import lodash from 'lodash'
import SkillDisplay from '../components/SkillDisplay.vue'
import Review from '../components/Review.vue'
import axios from "axios";
import { useRoute } from 'vue-router'

const loaded = ref(false)
const route = useRoute()
const resObj = ref()
const rankObj = ref()
const timeFlowData = ref()
const err = ref()

const xfColor = {
  2:['rgb(127, 31, 223)','rgba(127, 31, 223, 0.4)'],
  5:['rgb(255, 127, 255)', 'rgba(255, 127, 255, 0.4)'],
  6:['rgb(63, 31, 159)', 'rgba(63, 31, 159, 0.4)'],
  22:['rgb(100, 250, 180)','rgba(100, 250, 180, 0.4)'],
  212:['rgb(0, 172, 153)','rgba(0, 172, 153, 0.4)']
}

const qixueTable = {
  '香蕊':{
    'img':'2952',
    'alias':'香蕊',
    'desc':'"回雪飘摇"会心几率提高10%，会心效果提高10%。'
  },
  '冰华':{
    'img':'4491',
    'alias':'冰华',
    'desc':'"回雪飘摇"不会被打退，治疗效果提高10%。'
  },
  '朝露':{
    'img':'2950',
    'alias':'朝露',
    'desc':'"上元点鬟"每跳回复目标0.75%的内力并回复自身4%内力，自身内力回复效果每2秒最多触发一次。'
  },
  '盛夏':{
    'img':'4500',
    'alias':'盛夏',
    'desc':'疗伤招式命中携带"翔舞"的目标，有30%几率刷新"翔舞"效果并使目标周围10尺内的3个团队成员获得"翔舞"效果。'
  },
  '红绡倩风':{
    'img':'16209',
    'alias':'红绡',
    'desc':'需"名动四方"触发的剑舞状态，向友方目标丢出一把扇子，使友方目标获得"留风"效果，持续8秒，效果期间目标不会获得持续伤害不利效果，且每秒回复气血值76点，若受到攻击则使得攻击自身的目标内外功基础攻击力降低50%，持续3秒。可以提前收扇并结算治疗量。"留风"效果结束时，为友方目标添加"翔舞"效果。'
  },
  '点绛唇':{
    'img':'11880',
    'alias':'点绛唇',
    'desc':'需"名动四方"触发的剑舞状态，消耗所有"剑舞"守护30尺内的小队成员，可无视障碍卸除目标身上阳性、阴性、混元性、毒性内功不利效果各两个，并每0.5秒使其气血值回复。自身进入"霓裳"状态，免疫控制效果（击退和被拉除外），持续6秒。在"霓裳"状态结束前无法重新开启剑舞。'
  },
  '枕上':{
    'img':'4527',
    'alias':'枕上',
    'desc':'持续疗伤效果的疗伤成效提高15%。'
  },
  '辞致':{
    'img':'2959',
    'alias':'辞致',
    'desc':'"王母挥袂"立即为目标周围8尺内5个友方目标回复气血值。'
  },
  '倾城':{
    'img':'1497',
    'alias':'倾城',
    'desc':'每层剑舞使自身受到的伤害降低1%，移动速度增加1%。'
  },
  '承清':{
    'img':'891',
    'alias':'承清',
    'desc':'施展"名动四方"后，可施展二段技能"雨霖铃"，使友方目标气血值回复点，被疗伤成效提高2%，持续600秒，该效果同时只能作用一个目标。'
  },
  '莫辞':{
    'img':'4554',
    'alias':'莫辞',
    'desc':'"王母挥袂"调息时间降低2秒，会心几率和会心效果提高15%。'
  },
  '瑰姿':{
    'img':'894',
    'alias':'瑰姿',
    'desc':'"回雪飘摇"每0.8秒造成一次治疗成效，持续2.4秒。'
  },
  '春辞':{
    'img':'903',
    'alias':'春辞',
    'desc':'受控状态下自身受到的所有伤害降低15%。'
  },
  '拂罗':{
    'img':'17171',
    'alias':'拂罗',
    'desc':'"风袖低昂"施展后立即回复目标10%气血且附带的"天地低昂"减伤效果提高10%。'
  },
  '乞巧':{
    'img':'4500',
    'alias':'乞巧',
    'desc':'疗伤招式会心后，基础疗伤成效提高3%，可以叠加5层，持续10秒。'
  },
  '雾雨':{
    'img':'1504',
    'alias':'雾雨',
    'desc':'"繁音急节"施展后，"雾雨"效果时间延长4秒。'
  },
  '冰肌':{
    'img':'1498',
    'alias':'冰肌',
    'desc':'"天地低昂"变为2层充能技能。'
  },
  '雾生':{
    'img':'17208',
    'alias':'雾生',
    'desc':'施展"风袖低昂"后，使自身获得"雾雨"效果，持续3秒。若自身已经获得"雾雨"效果，则使该效果延长3秒。'
  },
  '晚阳':{
    'img':'2959',
    'alias':'晚阳',
    'desc':'目标身上每存在一个属于自身的持续疗伤效果，"回雪飘摇"的疗伤效果提高25%。若玩家目标身上的"上元点鬟""翔舞"效果被卸除，则立即回复目标10%的气血值。'
  },
  '散余霞':{
    'img':'4563',
    'alias':'散余霞',
    'desc':'"回雪飘摇"能够对目标周围8尺内的额外2个目标作用。'
  },
  '秋月':{
    'img':'9546',
    'alias':'秋月',
    'desc':'"王母挥袂"变为充能技能，充能时间11秒。'
  },
  '舞霁':{
    'img':'16601',
    'alias':'舞霁',
    'desc':'"风袖低昂"附带的"天地低昂"效果期间，自身每次对目标施展治疗招式将回复目标气血值。"风袖低昂"附带的"天地低昂"效果被卸除时，每剩余1秒钟，则额外使侠士目标获得化解自身最大气血值4%的伤害的护盾，持续6秒。'
  },
  '晚晴':{
    'img':'3844',
    'alias':'晚晴',
    'desc':'"风袖低昂"命中有自身"翔舞"效果的目标时，为目标周围8尺范围最多5个目标回复气血值，并附带"翔舞"效果。'
  },
  '心问':{
    'img':'1507',
    'alias':'心问',
    'desc':'"风袖低昂"附带的"天地低昂"效果期间，目标的被疗伤成效提高25%。'
  },
  '两生':{
    'img':'2957',
    'alias':'两生',
    'desc':'受到攻击若自身气血值低于40%，则自身闪避几率提高50%，持续5秒，每1分钟触发1次。'
  },
  '飞萍':{
    'img':'1506',
    'alias':'飞萍',
    'desc':'"雷霆震怒"施展距离提高8尺，且调息时间降低35秒，若命中但未能成功眩晕目标，则使目标封轻功10秒；若成功眩晕目标，则额外返还"雷霆震怒"10秒调息时间。'
  },
  '棠梨':{
    'img':'9549',
    'alias':'棠梨',
    'desc':'"鹊踏枝"效果期间闪避几率提升至60%，自身闪避后，减少"风袖低昂"1秒调息时间。'
  },
  '碎冰':{
    'img':'910',
    'alias':'碎冰',
    'desc':'疗伤目标血量低于50%，自身的会心几率提高5%，会心效果提高5%，持续10秒。'
  },
  '月白':{
    'img':'13415',
    'alias':'月白',
    'desc':'施展"天地低昂"使得自身受到伤害降低60%，持续8秒，此效果不会被卸除，持续时长不受秘籍影响。'
  },
  '青实':{
    'img':'14119',
    'alias':'青实',
    'desc':'"天地低昂"施展后立即回复5%气血并额外附带10%减伤效果。'
  },
  '跳珠憾玉':{
    'img':'1505',
    'alias':'跳珠',
    'desc':'需剑舞，为友方目标卸除混元性内功不利效果、阳性内功不利效果、阴性内功不利效果、毒性内功不利效果各一个，并使目标气血值回复点。'
  },
  '霜风':{
    'img':'2958',
    'alias':'霜风',
    'desc':'基础根骨、体质提高10%，被疗伤成效提高10%。'
  },
  '冥泽':{
    'img':'2955',
    'alias':'冥泽',
    'desc':'若自身气血值低于1%，解除自身控制效果并使自身闪避几率提高100%，受到伤害降低100%，持续3秒，该效果最多每2分45秒触发1次。'
  },
  '蝶恋':{
    'img':'900',
    'alias':'蝶恋',
    'desc':'施展"王母挥袂"使侠士目标额外回复4%的最大气血值，若目标气血值低于50%，额外附带45%的治疗效果。'
  },
  '吉光':{
    'img':'13414',
    'alias':'吉光',
    'desc':'连续施展"回雪飘摇"命中同一友方目标4次，自身回复气血值和10%的内力值，并使招式"王母挥袂"调息时间降低2秒。'
  },
  '仪凤':{
    'img':'7427',
    'alias':'仪凤',
    'desc':'施展"风袖低昂"命中气血值高于75%的目标，使目标获得的"天地低昂"气劲持续时间延长3秒并使下一个"王母挥袂"治疗量提高25%。'
  },
  '秋深':{
    'img':'911',
    'alias':'秋深',
    'desc':'"风袖低昂"治疗效果提高5%，"回雪飘摇"每跳使"风袖低昂"调息时间降低1秒。'
  },
  '耐夜':{
    'img':'915',
    'alias':'耐夜',
    'desc':'"蝶弄足"充能时间降低20秒，施展后向前疾奔30尺，"冰心诀"使路径上的10个目标附带"急曲"效果，"云裳心经"下回复自身10%气血。'
  },
  '音韵':{
    'img':'4536',
    'alias':'音韵',
    'desc':'"蝶弄足"免疫控制效果(被拉除外)时间额外增加2秒，"迅影"持续期间，受到的"锁足""定身""眩晕"控制效果持续时间降低20%。'
  },
  '左旋右转':{
    'img':'904',
    'alias':'左旋',
    'desc':'需"名动四方"触发的剑舞状态，持续运功10秒，期间每2秒使自身12尺内所有小队成员气血值回复点，且破招值提高500点，持续8秒，该气劲时间可叠加，最多48秒；由该招式产生的疗伤威胁将下降30%。'
  },
  '妍姿':{
    'img':'913',
    'alias':'妍姿',
    'desc':'"上元点鬟"每跳治疗递增10%，效果完结后额外触发的额外治疗成效会心几率提高10%，会心效果提高10%。'
  },
  '玉骨':{
    'img':'906',
    'alias':'玉骨',
    'desc':'施展"鹊踏枝"，使自身受到的内功伤害降低50%，持续6秒。'
  },
  '垂眉':{
    'img':'7476',
    'alias':'垂眉',
    'desc':'施展"风袖低昂""王母挥袂""翔鸾舞柳" "上元点鬟"，会分别消耗四层、三层、两层、两层剑舞层数，并造成额外25%的治疗效果。'
  },
  '敛襟':{
    'img':'14114',
    'alias':'敛襟',
    'desc':'"水榭花盈"对其他目标释放时，调息时间降低10秒；"鹊踏枝"充能时间降低5秒，效果期间闪避后立即回复自身5%气血、内力最大值。'
  },
  '璇妗':{
    'img':'11882',
    'alias':'璇妗',
    'desc':'"心鼓弦"调息时间降低6分钟，重伤起身后使目标受到的伤害降低60%，持续6秒。'
  },
  '绰态':{
    'img':'1499',
    'alias':'绰态',
    'desc':'"帝骖龙翔"调息时间降低5秒，运功1.5秒，使得自身周围8尺目标定身，持续4秒，并使得正对自身的侠士目标无法运功且受到的伤害提高10%，持续4秒。'
  },
  '泠风解怀':{
    'img':'17172',
    'alias':'泠风',
    'desc':'需要"名动四方"触发的剑舞状态，链接自身与友方目标，使目标气血值回复，链接持续5秒，若双方距离超过25尺则提前结束链接状态。链接期间自身伤害、治疗成效降低10%，链接的友方目标的伤害、治疗成效提高10%，且每0.5秒减少自身"风袖低昂"调息时间0.5秒，使友方目标气血值回复，并减少其0.5秒"梦冧"不利气劲。'
  },
  '红隙':{
    'img':'7237',
    'alias':'红隙',
    'desc':'"王母挥袂"命中气血值低于40%的目标，立刻重置技能调息时间，该效果最多20秒触发一次。'
  },
  '险韵':{
    'img':'7253',
    'alias':'险韵',
    'desc':'"王母挥袂"作用目标不是自身，则对自身额外造成50%治疗效果。'
  },
  '余寒映日':{
    'img':'7497',
    'alias':'余寒',
    'desc':'需要"名动四方"触发的剑舞状态，施展后获得"映日"效果："回雪飘摇"治疗量提高15%并可在移动中施展，且提高自身20%急速效果；施展"回雪飘摇"有20%的几率使目标身上"上元点鬟"剩余疗伤效果立即生效并使招式"蝶弄足"调息时间降低1秒，持续12秒。'
  },
  '九微飞花':{
    'img':'13417',
    'alias':'九微',
    'desc':'需"名动四方"触发的剑舞状态，消耗4层剑舞，在自身和目标位置各自落下花雨，每秒使6尺范围最多3个目标回复气血值，每跳治疗效果递增10%，对受控的目标造成的治疗会心几率提高15%，同一个目标同时只会被自身一片花雨治疗，持续6秒。'
  },
}

axios({
  method:'get',
  url: `http://120.48.95.56:8009/getReplayPro?id=${route.params.replay_id}`
}).then((res)=>{
  if (res.data.available){
    let repl = res.data['raw'].replace(/'/g, '"').replace(/&#39;/g, '"').replace(/\n/g, '\\n').replace(/\t/g, '\\t');
    let repl2 = res.data['rank'].replace(/'/g, '"').replace(/&#34;/g, '"').replace(/\n/g, '\\n').replace(/\t/g, '\\t');
    let replay  = JSON.parse(repl)
    resObj.value = JSON.parse(repl)
    let rank = JSON.parse(repl2)
    rankObj.value = JSON.parse(repl2)
    let realTimeRank = lodash.cloneDeep(toRaw(resObj.value['skill']))
    for (let item in realTimeRank){
      for (let sub_item in realTimeRank[item]){
        realTimeRank[item][sub_item] = [realTimeRank[item][sub_item]]
        if ('rank' in toRaw(resObj.value)){
          realTimeRank[item][sub_item].push(resObj.value['rank'][item][sub_item])
        }else{
          realTimeRank[item][sub_item].push({num:'无',percent:'无'})
        }
      }
    }
    realTimeRank['general']['chuimeiHPS'] = realTimeRank['xlwl']['chuimeiHPS']
    let allTimeRank = lodash.cloneDeep(toRaw(resObj.value['skill']))
    for (let item in allTimeRank){
      for (let sub_item in allTimeRank[item]){
        allTimeRank[item][sub_item] = [allTimeRank[item][sub_item]]
        if (rankObj.value){
          allTimeRank[item][sub_item].push(rankObj.value[item][sub_item])
        }else{
          allTimeRank[item][sub_item].push({num:'无',percent:'无'})
        }
      }
    }
    allTimeRank['general']['chuimeiHPS'] = allTimeRank['xlwl']['chuimeiHPS']

    const calcGCD = (haste,talent) =>{
      if (haste < 43){}
      else if (haste < 43){return 1500}
      else if (haste >= 43 && haste < 1928){return 1440}
      else if (haste >= 1928 && haste < 4026){return 1380}
      else if (haste >= 4026 && haste < 6296){return 1310}
      else if (haste >= 6296 && haste < 8780){return 1250}
      else{return 1187.5}
    }

    let GCD = calcGCD(replay['overall']['hasteReal'])
    let timeFlowWidth = (replay['replay']['finalTime'] - replay['replay']['startTime']) / 1000 * 40
    let timeScale = Math.floor(timeFlowWidth / 200)

    let channelling = []
    let casting = []
    for (let item of resObj.value['replay']['normal']){
      if (item['skillname'] === '左旋右转'){
        channelling.push(item)
      }else{
        casting.push(item)
      }
    }

    let firstHit = []
    if (channelling.length > 0){
      firstHit.push({...channelling[0]})
      firstHit[0]['hits'] = 1
      for (let i = 1; i < channelling.length; i++){
        if (channelling[i]['start'] - channelling[i - 1]['start'] < 1000){
          firstHit[firstHit.length - 1]['hits'] += 1
          firstHit[firstHit.length - 1]['heal'] = firstHit[firstHit.length - 1]['heal'] + ' / ' + channelling[i]['heal']
          firstHit[firstHit.length - 1]['healeff'] = firstHit[firstHit.length - 1]['healeff'] + ' / ' + channelling[i]['healeff']
          firstHit[firstHit.length - 1]['targetName'] = firstHit[firstHit.length - 1]['targetName'] + '<br>' + channelling[i]['targetName']
        }else{
          firstHit.push({...channelling[i]})
          firstHit[firstHit.length - 1]['hits'] = 1
        }
      }
    }

    let hxpyChannel = []
    for (let i = 0; i < replay['replay']['hxpy'].length; i++){
      if(replay['replay']['hxpy'][i][1] === 1){
        if (i < replay['replay']['hxpy'].length - 1){
          hxpyChannel.push({
            startTime:replay['replay']['hxpy'][i][0],
            duration:replay['replay']['hxpy'][i + 1][0] - replay['replay']['hxpy'][i][0]
          })
        }else{
          hxpyChannel.push({
            startTime:replay['replay']['hxpy'][i][0],
            duration:replay['replay']['finalTime'] - replay['replay']['hxpy'][i][0]
          })
        }
      }
    }

    timeFlowData.value = {
      GCD,
      timeFlowWidth,
      casting,
      firstHit,
      hxpyChannel,
      timeScale,
      realTimeRank,
      allTimeRank,
    }
    loaded.value = true
  }else{
    if (res.data.text === '数据未公开.'){
      err.value = 'private'
    }
    else if (res.data.text === '不支持的心法，请等待之后的版本更新.'){
      err.value = 'unsupport'
    }
    else if (res.data.text === '结果未找到.'){
      err.value = 'unexist'
    }
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
  else if (score === 100){
    return 'gold'
  }
  else{
    return 'white'
  }
}

const getImageUrl = (name,folder) => {
  return new URL(`../assets/${folder}/${name}.png`, import.meta.url).href
}

const icon_length = computed(()=>{
  if (loaded.value){
    return Math.floor(timeFlowData.value.GCD / 1000 * 40) + 'px'
  }else{
    return '0px'
  }
})

const timeFlowWidth = computed(()=>{
  if (loaded.value){
    return Math.floor(timeFlowData.value.timeFlowWidth) + 'px'
  }else{
    return '0px'
  }
})

const ChartWidth = computed(()=>{
  if (loaded.value){
    return (Math.floor(timeFlowData.value.timeFlowWidth / 40 * 2) * 20 - 1) + 'px'
  }else{
    return '0px'
  }
})

const xPosition = (time) => {
  return (time - resObj.value['replay']['startTime']) / 1000 * 40 + 'px'
}

const popUpShow = ref(false)
const popUpPos = ref([0,0])
const popUpDetails = ref()
const popUp = ref()

const qixueDetailsShow = ref(false)
const qixuePos = ref([0,0])
const qixueDetails = ref()
const qixueBox =ref()

const enterQixue = ($event,item) => {
  qixueDetails.value = item
  qixueDetailsShow.value = true
  nextTick(()=>{
    qixuePos.value = [$event.target.offsetLeft,$event.target.offsetTop + 50]
  })
}

const leaveQixue = ($event,item) => {
  qixueDetailsShow.value = false
}
const enterImg = ($event,item) => {
  popUpDetails.value = item
  popUpShow.value = true
  nextTick(()=>{
    let leftBias
    if ($event.target.offsetLeft < popUp.value.offsetWidth / 2){
      leftBias = $event.target.offsetLeft
    }
    else if ($event.target.offsetLeft > timeFlowWidth - popUp.value.offsetWidth / 2){
      leftBias = $event.target.offsetLeft - (popUp.value.offsetWidth - timeFlowData.value.GCD / 1000 * 40)
    }
    else {
      leftBias = Math.floor($event.target.offsetLeft  - (popUp.value.offsetWidth - timeFlowData.value.GCD / 1000 * 40) / 2)
    }
    if($event.target.offsetTop >= 203){
      popUpPos.value = [leftBias, $event.target.offsetTop - popUp.value.offsetHeight - 10]
    }else{
      popUpPos.value = [leftBias, $event.target.offsetTop + timeFlowData.value.GCD / 1000 * 40 + 10]
    }
  })
}

const leaveImg = ($event,item) => {
  popUpShow.value = false
}
const scrollBar = ref(null)
const handleScroll = (e) => {
  const wheelDelta = e.wheelDelta || -e.deltaY * 80
  const scrollbar = scrollBar.value
  scrollbar.setScrollLeft(scrollbar.wrap$.scrollLeft - wheelDelta)
}

const healer_chart = computed(()=>{
  if(loaded.value){
    let healer = []
    let hps = []
    let effHps = []
    let occ = []
    for(let item of resObj.value['healer']['table']){
      healer.push(item['name'])
      hps.push(item['heal'] - item['healEff'])
      effHps.push(item['healEff'])
      occ.push(item['occ'])
    }
    return {
      xAxis: {
        type: 'value',
        splitLine:{
          lineStyle:{
            color:'#555'
          }
        }
      },
      yAxis: {
        type: 'category',
        data: healer,
        axisLine:{
          show:false
        },
        axisLabel:{
          color:'white',
          formatter:(value)=>{
            if (value.length > 6){
              let str = value.slice(0,6) + '\n' + value.slice(6)
              return str
            }
            return value
          }
        }
      },
      series: [
        {
          name: '有效HPS',
          type: 'bar',
          stack: 'total',
          barMaxWidth:'30px',
          label:{
            show:true,
            offset:[10,0],
            color:'white'
          },
          itemStyle:{
            color:function(params){
              return xfColor[occ[params.dataIndex]][0]
            }
          },
          data: effHps
        },
        {
          name: '虚条HPS',
          type: 'bar',
          stack: 'total',
          label:{
            show:true,
            position:'right',
            color:'white',
            formatter:function(params){
              return params.value + effHps[params.dataIndex]
            }
          },
          itemStyle:{
            color:function(params){
              return xfColor[occ[params.dataIndex]][1]
            }
          },
          data: hps
        }
      ],
      grid:{
        top:'0px',
        bottom:'0px',
        right:'40px',
        left:'100px'
      }
    }
  }else{
    return {}
  }
})

const buffCoverChart = computed(()=>{
  let xAxis = []
  let max = resObj.value['replay']['heat']['timeline'][0].length
  for (let i = 0; i < max; i++){
    xAxis.push((1 + i)* 0.5 + 's')
  }
  return {
    tooltip: {
      trigger: 'axis',
      position:(point, params)=>{
        return [point[0] + 20, 10]
          },
      valueFormatter: (value) => value + '%'
    },
    grid: {
      left: 0,
      right: 0,
      bottom: 0,
      top: 0
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data:xAxis
    },
    yAxis: {
      type: 'value',
      max: 100,
      splitLine: {
        lineStyle: {
          color:'#555'
        }
      }
    },
    series: [
      {
        name: '翔舞覆盖率',
        type: 'line',
        data: resObj.value['replay']['heat']['timeline'][0],
        symbol:'none'
      },
      {
        name: '上元覆盖率',
        type: 'line',
        data: resObj.value['replay']['heat']['timeline'][1],
        symbol:'none'
      }
    ]
  };
})
</script>

<style scoped>
.skill_statistic_icon{
  height: 60px;
  width: 60px;
}
.qixueBoxStyle{
  position: absolute;
  width: 300px;
  border: 1px solid rgba(85,85,85,0.5);
  border-radius: 12px;
  top: v-bind("qixuePos[1] + 'px'");
  left: v-bind("qixuePos[0] + 'px'");
  background-color: #201020;
}
.infoBox{
  margin-bottom: 20px;
  width: 1400px;
  display: flex;
  flex-direction: row;
}
.statisticBox{
  width: 1400px;
  background-color: #141414;
  border: 1px solid #555;
  margin-bottom: 20px;
}
.statisticBoxInner{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
.reviewBox{
  width: 1400px;
  border: 1px solid #555;
  margin-bottom: 20px ;
  background-color: #141414;
}
.timeFlow{
  display: flex;
  position: relative;
  flex-direction: column;
  height: v-bind("(101 + 5 * icon_length) + 'px'");
  width: v-bind("timeFlowWidth");
}
.coverage_chart{
  width: v-bind("ChartWidth")
}
.label{
  background-color: #201020;
  height: v-bind("icon_length");
  border-bottom: 1px solid #555;
  padding-left: 10px;
  line-height: v-bind("icon_length");
}
.GCD{
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #555;
  height: v-bind("icon_length");
}
.huixue{
  display: flex;
  flex-direction: row;
  height: v-bind("icon_length");
  border-bottom: 1px solid #555;
}
.bossPhase{
  display: flex;
  flex-direction: row;
  height: v-bind("icon_length");
  border-bottom: 1px solid #555;
}
.timeScale{
  display: flex;
  flex-direction: row;
  height: v-bind("icon_length");
}
.noGCD{
  display: flex;
  flex-direction: row;
  height: v-bind("icon_length");
  border-bottom: 1px solid #555;
}
.bossPhase_icon{
  position: absolute;
  top:v-bind("(101 + 3 * icon_length) + 'px'")
}
.noGCD_skill_icon{
  position: absolute;
  top: v-bind("(101 + 2 * icon_length) + 'px'")
}
.GCD_skill_icon{
  position: absolute;
  top:101px;
}
.huixue_icon{
  position: absolute;
  top:v-bind("(101 + 1 * icon_length) + 'px'")
}
.popUp{
  position: absolute;
  border: 1px solid rgba(85,85,85,0.5);
  border-radius: 12px;
  top: v-bind("popUpPos[1] + 'px'");
  left: v-bind("popUpPos[0] + 'px'");
  background-color: #201020;
}

:deep(.el-tabs__nav-scroll){
  background-color: #201020;
  border-bottom: 1px solid #555;
}
:deep(.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active){
  color: #409EFF;
  background-color: #141414;
  font-size: 16px;
  font-weight: bold;
}
:deep(.el-tabs--border-card>.el-tabs__header .el-tabs__item){
  color: #FFFFFF;
  font-size: 16px;
}
</style>