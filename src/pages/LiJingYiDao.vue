<template>
  <template v-if="loaded">
    <div style="display:flex;flex-direction:column;align-items: center;position: relative">
      <div style="display:flex; justify-content:space-between;font-size: 20px; font-weight: bold; width: 1400px;margin-bottom: 20px">
        <div>奶花复盘 8.0.2</div>
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
              装备信息获取失败。在进入战斗后打开团队装分面板即可获取。如果是第一视角也可以自动获取。

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
      <!--            统计面板-->
      <el-tabs type="border-card"  class="statisticBox">
        <el-tab-pane label="即时排名">
          <div class="statisticBoxInner">
            <SkillDisplay :skill="timeFlowData.realTimeRank['wozhen']" :sortList="{
        'key':['num','numPerSec','delay','HPS','shengxiHPS','cover'],
        'value':['数量：','每秒数量：','延迟：','HPS：','生息HPS：','覆盖率：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('wozhen','skills_logo')" alt="握针">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">握针</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.realTimeRank['tizhen']" :sort-list="{
        'key':['num','numPerSec','delay','HPS','hzDirectHPS','hzPercentHPS','effRate'],
        'value':['数量：','每秒数量：','延迟：','HPS：','毫针DHPS：','毫针PHPS：','有效比例：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('tizhen','skills_logo')" alt="提针">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">提针</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.realTimeRank['changzhen']" :sort-list="{
        'key':['num','numPerSec','delay','HPS','yuehuaHPS','effRate'],
        'value':['数量：','每秒数量：','延迟：','HPS：','月华HPS：','有效比例：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('changzhen','skills_logo')" alt="长针">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">长针</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.realTimeRank['bizhen']" :sort-list="{
        'key':['num','numPerSec','delay','HPS','shCover','effRate'],
        'value':['数量：','每秒数量：','延迟：','HPS：','述怀覆盖率：','有效比例：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('bizhen','skills_logo')" alt="彼针">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">彼针</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.realTimeRank['longwu']" :sort-list="{
        'key':['num','numPerSec','delay','HPS','effRate'],
        'value':['数量：','每秒数量：','延迟：','HPS：','有效比例：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('longwu','skills_logo')" alt="泷雾">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">泷雾</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.realTimeRank['chunni']" :sort-list="{
        'key':['num','numPerSec'],
        'value':['数量：','每秒数量：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('chunni','skills_logo')" alt="春泥">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">春泥护花</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.realTimeRank['others']" :sort-list="{
        'key':['hanqing','qingshu'],
        'value':['寒清数量：','清疏HPS：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('hanqing','skills_logo')" alt="其他">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">其他</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.realTimeRank['general']" :sort-list="{
        'key':['qiusuCover','qiusuDPS','efficiency'],
        'value':['秋肃覆盖率：','秋肃DPS：','战斗效率：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('tuanfu','skills_logo')" alt="团辅">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">团队辅助</text>
              </template>
            </SkillDisplay>
          </div>
        </el-tab-pane>
        <el-tab-pane label="全时刻排名">
          <div class="statisticBoxInner">
            <SkillDisplay :skill="timeFlowData.allTimeRank['wozhen']" :sortList="{
        'key':['num','numPerSec','delay','HPS','shengxiHPS','cover'],
        'value':['数量：','每秒数量：','延迟：','HPS：','生息HPS：','覆盖率：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('wozhen','skills_logo')" alt="握针">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">握针</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.allTimeRank['tizhen']" :sort-list="{
        'key':['num','numPerSec','delay','HPS','hzDirectHPS','hzPercentHPS','effRate'],
        'value':['数量：','每秒数量：','延迟：','HPS：','毫针DHPS：','毫针PHPS：','有效比例：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('tizhen','skills_logo')" alt="提针">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">提针</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.allTimeRank['changzhen']" :sort-list="{
        'key':['num','numPerSec','delay','HPS','yuehuaHPS','effRate'],
        'value':['数量：','每秒数量：','延迟：','HPS：','月华HPS：','有效比例：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('changzhen','skills_logo')" alt="长针">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">长针</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.allTimeRank['bizhen']" :sort-list="{
        'key':['num','numPerSec','delay','HPS','shCover','effRate'],
        'value':['数量：','每秒数量：','延迟：','HPS：','述怀覆盖率：','有效比例：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('bizhen','skills_logo')" alt="彼针">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">彼针</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.allTimeRank['longwu']" :sort-list="{
        'key':['num','numPerSec','delay','HPS','effRate'],
        'value':['数量：','每秒数量：','延迟：','HPS：','有效比例：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('longwu','skills_logo')" alt="泷雾">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">泷雾</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.allTimeRank['chunni']" :sort-list="{
        'key':['num','numPerSec'],
        'value':['数量：','每秒数量：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('chunni','skills_logo')" alt="春泥">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">春泥护花</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.allTimeRank['others']" :sort-list="{
        'key':['hanqing','qingshu'],
        'value':['寒清数量：','清疏HPS：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('hanqing','skills_logo')" alt="其他">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">其他</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.allTimeRank['general']" :sort-list="{
        'key':['qiusuCover','qiusuDPS','efficiency'],
        'value':['秋肃覆盖率：','秋肃DPS：','战斗效率：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('tuanfu','skills_logo')" alt="团辅">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">团队辅助</text>
              </template>
            </SkillDisplay>
          </div>
        </el-tab-pane>
      </el-tabs>
      <!--      时间轴        -->
      <div style="display:flex;flex-direction:row; width: 1400px; border: 1px solid #555;background-color: #141414;position: relative;margin-bottom: 20px">
        <div style="display:flex;flex-direction:column; width: 150px;border-right: 1px solid #555">
          <div style="display:flex; flex-direction:row; justify-content:space-between; height: 100px; padding-left:10px; background-color:#201020; border-bottom: 1px solid #555;">
            <div style="display: flex;justify-content: center;align-items: center">握针HOT时间</div>
            <div style="display: flex;flex-direction: column; justify-content: space-between">
              <div style="font-size: 12px;margin-right: 5px">5队</div>
              <div style="font-size: 12px;margin-right: 5px">4队</div>
              <div style="font-size: 12px;margin-right: 5px">3队</div>
              <div style="font-size: 12px;margin-right: 5px">2队</div>
              <div style="font-size: 12px;margin-right: 5px">1队</div>
            </div>
          </div>
          <div class="label">GCD技能</div>
          <div class="label">非GCD技能</div>
          <div class="label">BOSS机制</div>
        </div>
        <el-scrollbar style="width: 1250px;position: relative" ref="scrollBar" @wheel.prevent="handleScroll">
          <div class="timeFlow">
            <div style="height: 100px;width: 100%;border-bottom: 1px solid #555">
              <v-chart :option="heatChart" style="width: 100%;height: 100%"></v-chart>
            </div>
            <div class="GCD">
              <div v-for="i in timeFlowData.timeScale" style="height: 100%; width: 199px;border-right: 1px solid rgba(85,85,85,0.5)"></div>
              <img v-for="(item, index) in timeFlowData.timeflow_instant"
                   :src="getImageUrl(item.iconid,'skills_logo')"
                   alt="icon"
                   class="GCD_skill_icon"
                   :style="{
                           left:xPosition(item.start),
                           height: icon_length,
                           width: Math.floor(item.duration / 1000 * 40) + 'px'
                          }">
              <div v-for="(item, index) in timeFlowData.timeflow_casting"
                   :style="{
                           position: 'absolute',
                           top:'101px',
                           borderRadius:'3px',
                           backgroundColor:'rgb(46,147,86)',
                           left:xPosition(item.start),
                           height: icon_length,
                           width: Math.floor(item.duration / 1000 * 40) + 'px'
                          }">
              </div>
            </div>
              <img v-for="(item, index) in timeFlowData.timeflow_casting"
                   :src="getImageUrl(item.iconid,'skills_logo')"
                   alt="icon"
                   class="GCD_skill_icon"
                   :style="{
                           left:xPosition(item.start),
                           height: icon_length,
                           width: icon_length
                          }">
            <button v-for="(item, index) in resObj['replay']['normal']"
                 @mouseenter="enterImg($event,item)"
                 @mouseleave="leaveImg($event,item)"
                 :style="{
                           position: 'absolute',
                           backgroundColor: 'transparent',
                           border: 0,
                           top:'101px',
                           left:xPosition(item.start),
                           height: icon_length,
                           width: icon_length,
                           color:'red',
                           fontSize:'32px',
                           fontWeight:'bold',
                           lineHeight: icon_length,
                           textAlign: 'center'
                          }">
              {{ item.team }}
            </button>
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
              <div style="font-size:20px ;font-weight: bold; margin: 10px">
                <text>{{ popUpDetails['skillname'] }}</text>
                <text v-if="popUpDetails['instant']">（瞬发）</text>
              </div>
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
  '弹指':{
    'img':'4564',
    'alias':'弹指',
    'desc':'"提针"的疗伤效果提高25%。'
  },
  '竭泽':{
    'img':'3401',
    'alias':'竭泽',
    'desc':'"提针"的运功时间降低0.25秒。'
  },
  '少阳指':{
    'img':'1517',
    'alias':'少阳',
    'desc':'施展"商阳指"使目标移动速度降低60%，持续4秒。'
  },
  '烟霞':{
    'img':'4219',
    'alias':'烟霞',
    'desc':'"提针"运功不会被打退，会心几率提高10%，会心效果提高10%。'
  },
  '生息':{
    'img':'9528',
    'alias':'生息',
    'desc':'"握针"施展距离提高4尺，施展后立即回复目标气血值，效果期间玩家受到的治疗效果提高10%，该效果同时只能作用一个目标。'
  },
  '花语':{
    'img':'407',
    'alias':'花语',
    'desc':'"碧水滔天"效果持续期间，每秒回复目标6%气血值。'
  },
  '青律':{
    'img':'3006',
    'alias':'青律',
    'desc':'"长针"的运功时间减少0.375秒且治疗成效提高10%，使目标附带1层春泥护花效果，对于同一目标每2秒触发一次该效果。若目标拥有40%及以上的其他减伤效果则不生效。'
  },
  '月华':{
    'img':'3009',
    'alias':'月华',
    'desc':'"长针"同时对目标周围8尺范围内的5个友方目标回复气血值。该效果不受到"长针"秘籍的影响。'
  },
  '31208':{
    'img':'403',
    'alias':'秋肃',
    'desc':'商阳指调息时间增加15秒，施展商阳指，使目标18秒内受到的伤害提高5%，不可与同类效果叠加。'
  },
  '秋肃':{
    'img':'403',
    'alias':'秋肃',
    'desc':'商阳指调息时间增加15秒，施展商阳指，使目标18秒内受到的伤害提高5%，不可与同类效果叠加。'
  },
  '清风垂露':{
    'img':'1523',
    'alias':'清风',
    'desc':'为友方目标卸除阳性不利效果、阴性不利效果、混元不利效果、毒性不利效果、点穴不利效果、持续伤害不利效果各一个。'
  },
  '月斜':{
    'img':'12732',
    'alias':'月斜',
    'desc':'"星楼月影"持续期间自身加速值突破上限，提高30%，"星楼月影"期间获得的护盾若没有被打破则将"星楼月影"护盾剩余值转化为恢复自身气血值。'
  },
  '风雨':{
    'img':'407',
    'alias':'风雨',
    'desc':'"春泥护花"效果消失后，有几率于保护目标位置及周围10尺随机位置各洒下1朵落花，落花持续8秒，友方目标踩中后恢复点气血值和5%内力值，敌对目标踩中锁足3秒。'
  },
  '清疏':{
    'img':'3011',
    'alias':'清疏',
    'desc':'每次施展疗伤招式，自身获得1层"清疏"效果，积累到5层时，则为自身10尺范围内小队成员回复气血值。若疗伤招式会心，则额外获得1层"清疏"效果。'
  },
  '阙阴指':{
    'img':'1513',
    'alias':'阙阴',
    'desc':'若目标正在运功则进行打断并造成点混元性内功伤害，并使其无法施放内功招式，持续4秒。'
  },
  '沃土':{
    'img':'413',
    'alias':'沃土',
    'desc':'"春泥护花"不再使目标受到的伤害降低，每层使目标加速率提高5%，免疫打断运功、缴械和无法运功效果的影响，施展治疗招式或造成直接伤害后消耗1层。'
  },
  '弹梦':{
    'img':'4501',
    'alias':'弹梦',
    'desc':'"春泥护花"不受被击消耗和卸除影响，持续12秒。'
  },
  '南柯':{
    'img':'3014',
    'alias':'南柯',
    'desc':'"春泥护花"的伤害减免效果提高15%。'
  },
  '微潮':{
    'img':'396',
    'alias':'微潮',
    'desc':'"长针"命中有自身"握针"持续效果的目标，为目标及其半径15尺内所有没有自身"握针"效果的友方小队成员添加"握针"效果。'
  },
  '千机':{
    'img':'3003',
    'alias':'千机',
    'desc':'若太素九针会心或成功运功长针，自身将获得"内舍"气劲，每层使基础疗伤成效提高3%，可叠加5层。'
  },
  '不舍':{
    'img':'11825',
    'alias':'不舍',
    'desc':'"握针"每跳回复玩家目标1%的内力，若自身存在"握针"效果，受到攻击有5%几率使下一个"提针"无需运功，持续30秒。'
  },
  '生花':{
    'img':'13437',
    'alias':'生花',
    'desc':'每次施展"提针"将为自身累计一层"生花"效果，最多20层。施展"水月无间"将消耗自身全部"生花"效果并获得对应层数的"绽放"效果，持续10秒。"绽放"效果期间无法累计"生花"效果，自身"长针""提针"附带额外治疗量，额外治疗量和"绽放"效果层数有关。'
  },
  '秋毫':{
    'img':'3007',
    'alias':'秋毫',
    'desc':'"清心静气"调息时间增加至30秒，施展后为友方目标添加7层"毫针"效果。'
  },
  '束彼':{
    'img':'4573',
    'alias':'束彼',
    'desc':'"彼针"可以为目标及其半径15尺范围内的小队成员造成治疗效果。'
  },
  '书离':{
    'img':'326',
    'alias':'书离',
    'desc':'"提针"施展后必定为目标添加一层"毫针"效果，且"毫针"效果还将额外使目标外功防御等级提高3200点。'
  },
  '踏冰':{
    'img':'395',
    'alias':'踏冰',
    'desc':'"提针"能够为友方目标卸除阳性不利效果、阴性不利效果、混元不利效果、毒性不利效果、点穴不利效果各一个。'
  },
  '星移':{
    'img':'1520',
    'alias':'星移',
    'desc':'"星楼月影"调息时间降低3秒，免疫击退和被拉，持续时间增加1秒。'
  },
  '渐催':{
    'img':'3005',
    'alias':'渐催',
    'desc':'"星楼月影"调息时间降低3秒，免疫击退和被拉，持续时间增加1秒。'
  },
  '池月':{
    'img':'7234',
    'alias':'池月',
    'desc':'"星楼月影"调息时间降低3秒，免疫击退和被拉，持续时间增加1秒。'
  },
  '金屋':{
    'img':'4546',
    'alias':'金屋',
    'desc':'施展"太阴指"后，受到的伤害降低30%，持续8秒。'
  },
  '清露':{
    'img':'9522',
    'alias':'清露',
    'desc':'"利针"无调息时间，内力消耗降低50%，额外卸除敌方目标阴性、混元性、阳性、毒性气劲各一个，友方目标阴性、混元性、阳性、毒性、点穴不利效果各一个。'
  },
  // 傻逼花姐把花间和奶花的奇穴搞混了
  '碎玉':{
    'img':'13441',
    'alias':'延气',
    'desc':'施展"商阳指"/"阳明指"，在目标位置落下一枚黑子/白子，持续8秒。10尺内两枚异色子互相引爆，对10尺范围内最多5个目标造成点治疗。'
  },
  '延气':{
    'img':'13441',
    'alias':'延气',
    'desc':'施展"商阳指"/"阳明指"，在目标位置落下一枚黑子/白子，持续8秒。10尺内两枚异色子互相引爆，对10尺范围内最多5个目标造成点治疗。'
  },
  '述怀':{
    'img':'3000',
    'alias':'述怀',
    'desc':'"彼针"命中目标后，目标每3秒回复231点气血值，持续9秒。'
  },
  '生脉':{
    'img':'399',
    'alias':'生脉',
    'desc':'"水月无间"的免疫控制效果持续时间延长至6秒。期间使自身免疫缴械和无法运功效果的影响，且运功不会被打断。'
  },
  '寒清':{
    'img':'7212',
    'alias':'寒清',
    'desc':'"握针"持续时间增加6秒，受到伤害有80%几率使下一跳"握针"效果立刻生效。'
  },
  '锋末':{
    'img':'17188',
    'alias':'锋末',
    'desc':'"提针"可以在移动中施展，并且命中带有自身"握针"效果的非自身目标时，会额外使目标和自身同时恢复气血值。'
  },
  '知寒':{
    'img':'14147',
    'alias':'知寒',
    'desc':'"布散"效果持续期间，每次受到伤害时，消耗0.4%内力以格挡自身最大气血值1%的伤害值；施展疗伤技能则额外消耗1%的内力，额外使其回复气血值。只在内力值高于30%时生效。'
  },
  '零落':{
    'img':'3017',
    'alias':'零落',
    'desc':'"彼针"命中有自身"握针"效果的目标，刷新握针的持续时间。'
  },
  '清神':{
    'img':'13438',
    'alias':'清神',
    'desc':'每次施展"长针"，将减少"水月无间"2秒调息时间。'
  },
  '流溢':{
    'img':'7229',
    'alias':'流溢',
    'desc':'战斗状态下自身气血值每降低20%，基础疗伤成效提高12%，受到伤害降低10%。'
  },
  '沁莲':{
    'img':'13436',
    'alias':'沁莲',
    'desc':'"春泥护花"调息时间降低5秒，给友方目标施展"春泥护花"自身也将获得"春泥护花"效果。'
  },
  '守拙':{
    'img':'11826',
    'alias':'守拙',
    'desc':'受到控制时可以对8尺内敌对目标施展，唤出"阿甘贰型"，将敌方目标关入"阿甘贰型"体内，期间"阿甘贰型"不可移动，持续4秒，在"花间游"心法下返还10秒"乱洒青荷"调息时间。'
  },
  '遥归':{
    'img':'9525',
    'alias':'遥归',
    'desc':'"水月无间"变为两层充能招式，额外使2个招式无需运功，并立刻回复自身10%内力值。'
  },
  '砚悬':{
    'img':'7242',
    'alias':'砚悬',
    'desc':'"彼针"调息时间降低2秒，作用范围增加5尺。'
  },
  '夏风':{
    'img':'2998',
    'alias':'夏风',
    'desc':'"听风吹雪"调息时间降低10秒，额外气血恢复效果提高至40%。'
  },
  '轻鸿':{
    'img':'1515',
    'alias':'轻鸿',
    'desc':'"太阴指"变为2层充能技能，充能时间17秒，但无法被"春泥护花"重置调息时间。'
  },
  '望邪':{
    'img':'14149',
    'alias':'望邪',
    'desc':'"彼针"可以移动施展，治疗量提高150%，运功时间降低0. 5秒，命中附带"握针"的目标，会心几率提高30%。'
  },
  '金针':{
    'img':'1521',
    'alias':'金针',
    'desc':'受到的"锁足""定身""眩晕""击倒"控制效果持续时间降低20%。'
  },
  '天工甲士':{
    'img':'16223',
    'alias':'天工',
    'desc':'持续运功5秒组装天工甲士，随后激活二段招式"天工"操纵天工甲士，每次操纵时间最多持续30秒。天工甲士无法受到治疗，其气血值耗尽时会损坏并使操纵者脱离。当场上存在自身损坏的天工甲士时，"天工甲士"无需运功并使其自我修复5秒。若主动离开天工甲士则记录离开时天工甲士的气血值，25秒后可以再次使用"天工"并继承离开时天工甲士的气血值。'
  },
  '风荷':{
    'img':'7226',
    'alias':'风荷',
    'desc':'受到任何伤害导致自身气血值低于40%，立刻重置"听风吹雪"调息时间，该效果最多每1分钟触发一次。'
  },
  '折叶笼花':{
    'img':'16602',
    'alias':'折叶',
    'desc':'守护友方玩家目标生命，期间目标受到的治疗效果提高45%，受到伤害降低30%，效果正常结束后，回复目标25%气血，可通过牺牲"笼花"效果来使目标免于重伤，触发后该效果消失并回复目标50%气血最大值，最多持续12秒。'
  },
  '大针':{
    'img':'14148',
    'alias':'大针',
    'desc':'消耗自身当前30%气血值，使得目标回复5%最大内力值和气血值，随后使得目标当前和最大气血值同时提高100%，每秒回复最大气血值的3%，持续6秒。'
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
    realTimeRank['general']['qiusuCover'] = realTimeRank['qiusu']['cover']
    realTimeRank['general']['qiusuDPS'] = realTimeRank['qiusu']['dps']
    realTimeRank['others'] = {
      'qingshu':realTimeRank['qingshu']['HPS'],
      'hanqing':realTimeRank['general']['HanQingNum']
    }
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
    allTimeRank['general']['qiusuCover'] = allTimeRank['qiusu']['cover']
    allTimeRank['general']['qiusuDPS'] = allTimeRank['qiusu']['dps']
    allTimeRank['others'] = {
      'qingshu':allTimeRank['qingshu']['HPS'],
      'hanqing':allTimeRank['general']['HanQingNum']
    }

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
    let timeflow_instant = []
    let timeflow_casting = []
    for (let item of replay['replay']['normal']){
      if (item['skillname'] === '长针'){
        timeflow_casting.push(item)
      }else{
        timeflow_instant.push(item)
      }
    }

    timeFlowData.value = {
      GCD,
      timeFlowWidth,
      timeflow_instant,
      timeflow_casting,
      timeScale,
      realTimeRank,
      allTimeRank
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


const heatChart = computed(()=>{
  let teams = [0,1,2,3,4]
  let data = []
  let i = -1
  let j = -1
  for (let item of resObj.value['replay']['heat']['timeline']){
    i = -1
    j += 1
    let teamData = []
    for (let value of item){
      i += 1
      data.push([i, j , value])
    }
  }
  let xAxis = []
  for (let i = 0; i < resObj.value['replay']['heat']['timeline'][0].length; i++){
    xAxis.push((i + 1) * 0.5 + '秒')
  }
  return {
    tooltip: {
      valueFormatter:(value)=> value + '%'
    },
    grid: {
      top:0,
      bottom: 0,
      left:0,
      right:0
    },
    xAxis: {
      type: 'category',
      data:xAxis,
      splitArea: {
        show: true
      }
    },
    yAxis: {
      type: 'category',
      data: teams,
      splitArea: {
        show: true
      }
    },
    visualMap: {
      min: 0,
      max: 100,
      show:false
    },
    series: [
      {
        type: 'heatmap',
        data: data,
        label: {
          show: false
        }
      }
    ]
  }
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
  top:v-bind("(101 + 2 * icon_length) + 'px'")
}
.noGCD_skill_icon{
  position: absolute;
  top: v-bind("(101 + icon_length) + 'px'")
}
.GCD_skill_icon{
  position: absolute;
  top:101px;
}
.popUp{
  position: absolute;
  border: 1px solid rgba(85,85,85,0.5);
  border-radius: 12px;
  top: v-bind("popUpPos[1] + 'px'");
  left: v-bind("popUpPos[0] + 'px'");
  background-color: #201020;
  max-width: 450px;
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