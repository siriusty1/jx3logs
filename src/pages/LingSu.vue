<template>
  <template v-if="loaded">
    <div style="display:flex;flex-direction:column;align-items: center;position: relative">
      <div style="display:flex; justify-content:space-between;font-size: 20px; font-weight: bold; width: 1400px;margin-bottom: 20px">
        <div>灵素复盘 8.0.2</div>
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
      <!--            统计面板-->
      <el-tabs type="border-card"  class="statisticBox">
        <el-tab-pane label="即时排名">
          <div class="statisticBoxInner">
            <SkillDisplay :skill="timeFlowData.realTimeRank['lszh']" :sortList="{
        'key':['num','numPerSec','HPS'],
        'value':['数量：','每秒数量：','HPS：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('lszh','skills_logo')" alt="中和">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">灵素中和</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.realTimeRank['bzhf']" :sort-list="{
        'key':['num','numPerSec','delay','HPS','effRate'],
        'value':['数量：','每秒数量：','延迟：','HPS：','有效比例：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('bzhf','skills_logo')" alt="白芷含芳">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">白芷含芳</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.realTimeRank['cshx']" :sort-list="{
        'key':['skillNum','num','numPerSec','delay','skillHPS','HPS'],
        'value':['数量：','HOT数量：','每秒HOT：','延迟：','直接HPS：','HOTHPS：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('cshx','skills_logo')" alt="赤芍寒香">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">赤芍寒香</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.realTimeRank['dgsn']" :sort-list="{
        'key':['num','numPerSec','delay','HPS','effRate'],
        'value':['数量：','每秒数量：','延迟：','HPS：','有效比例：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('dgsn','skills_logo')" alt="当归四逆">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">当归四逆</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.realTimeRank['qczl']" :sort-list="{
        'key':['num','numPerSec','HPS','effRate'],
        'value':['数量：','每秒数量：','HPS：','有效比例：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('qczl','skills_logo')" alt="青川濯莲">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">青川濯莲</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.realTimeRank['ygzx']" :sort-list="{
        'key':['num','numPerSec','HPS','effRate'],
        'value':['数量：','每秒数量：','HPS：','有效比例：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('ygzx','skills_logo')" alt="银光照雪">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">银光照雪</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.realTimeRank['qqhh']" :sort-list="{
        'key':['num','HPS','effRate'],
        'value':['数量：','HPS：','有效比例：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('qqhh','skills_logo')" alt="七情和合">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">七情和合</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.realTimeRank['general']" :sort-list="{
        'key':['PeiwuRate','PeiwuDPS','PiaohuangNum','PiaohuangDPS','efficiency'],
        'value':['配伍比例','配伍DPS','飘黄数量','飘黄DPS','战斗效率']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('tuanfu','skills_logo')" alt="团辅">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">团队辅助</text>
              </template>
            </SkillDisplay>
          </div>
        </el-tab-pane>
        <el-tab-pane label="全时刻排名">
          <div class="statisticBoxInner">
            <SkillDisplay :skill="timeFlowData.allTimeRank['lszh']" :sortList="{
        'key':['num','numPerSec','HPS'],
        'value':['数量：','每秒数量：','HPS：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('lszh','skills_logo')" alt="中和">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">灵素中和</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.allTimeRank['bzhf']" :sort-list="{
        'key':['num','numPerSec','delay','HPS','effRate'],
        'value':['数量：','每秒数量：','延迟：','HPS：','有效比例：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('bzhf','skills_logo')" alt="白芷含芳">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">白芷含芳</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.allTimeRank['cshx']" :sort-list="{
        'key':['skillNum','num','numPerSec','delay','skillHPS','HPS'],
        'value':['数量：','HOT数量：','每秒HOT：','延迟：','直接HPS：','HOTHPS：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('cshx','skills_logo')" alt="赤芍寒香">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">赤芍寒香</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.allTimeRank['dgsn']" :sort-list="{
        'key':['num','numPerSec','delay','HPS','effRate'],
        'value':['数量：','每秒数量：','延迟：','HPS：','有效比例：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('dgsn','skills_logo')" alt="当归四逆">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">当归四逆</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.allTimeRank['qczl']" :sort-list="{
        'key':['num','numPerSec','HPS','effRate'],
        'value':['数量：','每秒数量：','HPS：','有效比例：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('qczl','skills_logo')" alt="青川濯莲">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">青川濯莲</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.allTimeRank['ygzx']" :sort-list="{
        'key':['num','numPerSec','HPS','effRate'],
        'value':['数量：','每秒数量：','HPS：','有效比例：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('ygzx','skills_logo')" alt="银光照雪">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">银光照雪</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.allTimeRank['qqhh']" :sort-list="{
        'key':['num','HPS','effRate'],
        'value':['数量：','HPS：','有效比例：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('qqhh','skills_logo')" alt="七情和合">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">七情和合</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.allTimeRank['general']" :sort-list="{
        'key':['PeiwuRate','PeiwuDPS','PiaohuangNum','PiaohuangDPS','efficiency'],
        'value':['配伍比例','配伍DPS','飘黄数量','飘黄DPS','战斗效率']}">
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
          <div style="height: 100px; padding-left:10px; line-height:100px; background-color:#201020; border-bottom: 1px solid #555;">药性</div>
          <div class="label">GCD技能</div>
          <div class="label">非GCD技能</div>
          <div class="label">青川濯莲</div>
          <div class="label">千枝绽蕊</div>
          <div class="label">BOSS机制</div>
        </div>
        <el-scrollbar style="width: 1250px;position: relative" ref="scrollBar" @wheel.prevent="handleScroll">
          <div class="timeFlow">
            <div style="height: 100px;width: 100%;border-bottom: 1px solid #555">
              <v-chart :option="yaoxing_chart" style="width: 100%;height: 100%"></v-chart>
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
            <div class="flowerBuff">
              <div v-for="i in timeFlowData.timeScale" style="height: 100%; width: 199px;border-right: 1px solid rgba(85,85,85,0.5)"></div>
              <div class="flower_icon" v-for="item in timeFlowData.qingchuan_active" :style="{
                backgroundColor:'rgb(84,169,108)',
                borderRadius:'3px',
                left:xPosition(item[0]),
                height: icon_length,
                width: Math.floor(item[1] * 40 / 1000) + 'px'}">
              </div>
              <img class="flower_icon"  :src="getImageUrl(9529,'skills_logo')" v-for="item in timeFlowData.qingchuan_active" :style="{
                left:xPosition(item[0]),
                height: icon_length,
                width: icon_length}">
            </div>
            <div class="qianzhiBuff">
              <div v-for="i in timeFlowData.timeScale" style="height: 100%; width: 199px;border-right: 1px solid rgba(85,85,85,0.5)"></div>
              <div class="qianzhi_icon" v-for="item in timeFlowData.qianzhi_active" :style="{
                position:'absolute',
                backgroundColor:'rgb(84,169,108)',
                borderRadius:'3px',
                left:xPosition(item[0]),
                height: icon_length,
                width: Math.floor(item[1] * 40 / 1000) + 'px'}">
              </div>
              <img v-for="(item, index) in timeFlowData.qianzhi_active"
                   :src="getImageUrl(16027,'skills_logo')"
                   alt="icon"
                   class="qianzhi_icon"
                   :style="{
               left:xPosition(item[0]),
               height:icon_length,
               width:icon_length
             }"
              >
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
  '醒窍':{
    'img':'15676',
    'alias':'醒窍',
    'desc':'"白芷含芳"治疗量提高10%。'
  },
  '反佐':{
    'img':'15677',
    'alias':'反佐',
    'desc':'"灵素中和"会心几率提高10%，会心效果提高10%。'
  },
  '收涩':{
    'img':'15678',
    'alias':'收涩',
    'desc':'"灵素中和"效果对命中目标回复0.5%的内力值。'
  },
  '凝壁':{
    'img':'15679',
    'alias':'凝壁',
    'desc':'"银光照雪"对队友施展时，使得自身为目标承受50%的伤害，持续6秒。'
  },
  '月见':{
    'img':'15723',
    'alias':'月见',
    'desc':'"银光照雪"伤害和治疗效果提高20%，对自身6尺270度扇形范围最多5个友方目标生效，自身气血值每降低25%，伤害和治疗效果提高5%。'
  },
  '鬼卿':{
    'img':'15680',
    'alias':'鬼卿',
    'desc':'"当归四逆"每跳卸除目标身上阴性、阳性、混元性、毒性、点穴不利效果各一个。'
  },
  '不染':{
    'img':'15681',
    'alias':'不染',
    'desc':'"青川濯莲"长成后，自身每发生一次中和，使其回复20%气血值，持续时间增加2秒，至多触发4次。'
  },
  '寸草':{
    'img':'15682',
    'alias':'寸草',
    'desc':'"当归四逆"施展后每跳也会为自身恢复气血值。'
  },
  '木通':{
    'img':'15700',
    'alias':'木通',
    'desc':'自身在温性状态施展招式距离提高2尺，在寒性状态下受到伤害降低10%。'
  },
  '游泽':{
    'img':'15684',
    'alias':'游泽',
    'desc':'"惊鸿掠水"对目标区域6尺范围的最多6个敌对目标都造成一次定身效果和伤害效果，定身时间提高2秒。该伤害还会受到自身治疗量加成。若成功定身目标则获得3秒内额外施展一次"银光照雪"的机会。'
  },
  '素柯':{
    'img':'15685',
    'alias':'素柯',
    'desc':'"当归四逆"完整运功使得下一个"赤芍寒香"命中目标时将在目标区域绽开一次，1.5秒后对目标区域8尺区域的5个友方目标造成一次治疗效果并使其附带"赤芍寒香"持续治疗效果。'
  },
  '韶时':{
    'img':'15686',
    'alias':'韶时',
    'desc':'"白芷含芳"运功时间降低0.5秒，命中目标后使得自身基础调息时间降低0.5秒。'
  },
  '妒茵':{
    'img':'15687',
    'alias':'妒茵',
    'desc':'"当归四逆"治疗量提高25%，期间自身和主目标受到伤害降低35%。'
  },
  '水苏':{
    'img':'15688',
    'alias':'水苏',
    'desc':'"惊鸿掠水"可以对队友目标施展，变为位移至队友身边，使目标周围6尺的最多5个友方目标恢复最多气血值，使得接下来的"回风微澜"施展距离提高3尺并恢复自身点气血值。'
  },
  '相须':{
    'img':'15689',
    'alias':'相须',
    'desc':'"七情和合"触发的"灵素中和"效果治疗量提高100%，且叠加不高于3层"七情"效果时，其降低治疗效果的数值减半。'
  },
  '畅和':{
    'img':'15698',
    'alias':'畅和',
    'desc':'"灵素中和"效果还会对作用目标附近6尺额外1个团队成员造成治疗效果，且其在"千枝绽蕊"期间作用人数额外提高3个并不会产生威胁值。'
  },
  '顾步':{
    'img':'15712',
    'alias':'顾步',
    'desc':'对8尺外的目标施展"惊鸿掠水"，重置自身"银光照雪"调息时间，并使下个"银光照雪"会心几率提高30%。'
  },
  '寒香':{
    'img':'15736',
    'alias':'寒香',
    'desc':'"逐云寒蕊"气血值提高100%，随后该效果在10秒内逐渐衰减至0%。'
  },
  '忘忧':{
    'img':'15683',
    'alias':'忘忧',
    'desc':'施展"七情和合"前根据自身已获得的药性自动获得5点寒性或5点温性，施展后3秒内受到伤害使得自身气血值低于50%，则立即重置"七情和合"调息时间，该效果在自身拥有5层及以上"七情"效果时不会触发。'
  },
  '蔓蕊':{
    'img':'15738',
    'alias':'蔓蕊',
    'desc':'"千枝绽蕊"期间每累积受到相当于自身最大气血值20%的伤害，降低自身"绿野蔓生""逐云寒蕊"1秒调息时间，该效果在切换至"千枝伏藏"后即清空计数。'
  },
  '挂雨':{
    'img':'15693',
    'alias':'挂雨',
    'desc':'施展"凌然天风"自身治疗量提高5%，获得3层"赤芍寒香"透支使用次数，并在"凌然天风"结束之后结算其调息时间。'
  },
  '绿绦':{
    'img':'15705',
    'alias':'绿绦',
    'desc':'"绿野蔓生"对6尺内攻击自身的目标造成伤害时自身毒性内功攻击力得到提高，提高幅度等同于自身50%的治疗量，并为自身恢复点气血值。'
  },
  '同梦':{
    'img':'15695',
    'alias':'同梦',
    'desc':'"龙葵自苦"调息时间提高40秒，对目标10尺内最多25个目标生效，最大吸收量降低为目标最大气血值的50%。'
  },
  '苦降':{
    'img':'15696',
    'alias':'苦降',
    'desc':'"龙葵自苦"对队友施展时，每秒折算"自苦"层数的20%由自身来承担。'
  },
  '晴柔':{
    'img':'15697',
    'alias':'晴柔',
    'desc':'"青川濯莲"影响的队友攻击目标时，回复效果提高15%，并也会为自身恢复点气血值。'
  },
  '吹绽':{
    'img':'17191',
    'alias':'吹绽',
    'desc':'自身造成伤害的100%转化为自身气血值，施展毒性内功伤害招式命中目标，会额外引导飞草附着目标，在1.5秒后或者被自身施展的其他毒性内功伤害招式命中时，对目标区域4尺最多3个目标造成受到自身治疗量加成的点毒性内功伤害。敌对侠士受到的该伤害将被平摊，若命中气血值低于50%的目标则伤害翻倍。'
  },
  '清嘉':{
    'img':'15699',
    'alias':'清嘉',
    'desc':'"青川濯莲"的气血上限提高100%，气血值为气血上限的50%，"青川濯莲"治疗命中低于50%气血值的友方目标时，会消耗10%的最大气血值为其恢复点气血值。'
  },
  '飘黄':{
    'img':'15692',
    'alias':'飘黄',
    'desc':'"逐云寒蕊"不再产生隐匿效果，使得"逐云寒蕊"10尺范围的团队成员施展伤害招式附带一段额外伤害，该伤害无视目标100%的防御，最多每1.5秒触发一次，持续10秒，该效果在60秒内只能享受一次。'
  },
  '渡若':{
    'img':'15747',
    'alias':'渡若',
    'desc':'"惊鸿掠水"调息时间降低2秒，施展"惊鸿掠水"自身免疫控制效果，持续3秒。'
  },
  '浅碧':{
    'img':'15701',
    'alias':'浅碧',
    'desc':'处于自身"绿野蔓生"状态期间，自身6尺范围内最多3个团队成员不会重伤。'
  },
  '败叶':{
    'img':'15716',
    'alias':'败叶',
    'desc':'"青川濯莲"释放时为目标20尺范围最多5个目标恢复点气血值，播种后蛰伏时间缩短2秒，若自身处于"青川濯莲"20尺范围内，"青川濯莲"为自身承担20%的伤害。'
  },
  '配伍':{
    'img':'15702',
    'alias':'配伍',
    'desc':'"灵素中和"治疗量提高13%，命中目标使其提高1%的力道、身法、元气和根骨，最多叠加5层，持续10秒。'
  },
  '幽姿':{
    'img':'15704',
    'alias':'幽姿',
    'desc':'"白芷含芳"不会被打退，对当前气血值百分比不高于自身的目标额外造成25%的治疗量。'
  },
  '双生':{
    'img':'15752',
    'alias':'双生',
    'desc':'"绿野蔓生"可以对友方目标施展，使其和自身共同获得"绿野蔓生"效果。'
  },
  '香稠':{
    'img':'15690',
    'alias':'香稠',
    'desc':'"赤芍寒香"治疗量提高10%，施展"赤芍寒香"使得目标体质提高20%，相同该效果不能共存。'
  },
  '燕徊':{
    'img':'15706',
    'alias':'燕徊',
    'desc':'"凌然天风"期间自身免疫无法运功、缴械、打断效果，每跳跃一次回复1%内力值。'
  },
  '决明':{
    'img':'15707',
    'alias':'决明',
    'desc':'"灵素中和"效果命中的目标气血值若低于50%，则该次"灵素中和"治疗加成提高25%。'
  },
  '摧蕊':{
    'img':'15756',
    'alias':'摧蕊',
    'desc':'"千枝绽蕊"每过6秒，内力消耗速度提高50%，期间在受到第一次击倒效果后即免疫后续击倒效果，直至切换至"千枝伏藏"为止。'
  },
  '独活':{
    'img':'15708',
    'alias':'独活',
    'desc':'"龙葵自苦"不再占用基础调息时间，持续时间提高1秒，期间目标受到治疗效果提高3%。'
  },
  '织翠':{
    'img':'15709',
    'alias':'织翠',
    'desc':'"千枝绽蕊"期间自身受到伤害的100%将会被储存起来，最多储存到自身最大气血值的30%，并在转换为"千枝伏藏"后附着在自身柳叶刀上，持续15秒，下一次对敌方目标施展"银光照雪"时会附带这段额外伤害。'
  },
  '胜娇':{
    'img':'15710',
    'alias':'胜娇',
    'desc':'"青川濯莲"范围内小队成员御劲、化劲等级提高10%。'
  },
  '旋生飞草':{
    'img':'15711',
    'alias':'旋生',
    'desc':'在自身面前种植蒲公英，在1秒后绽开，获得3点寒性，对周围15尺的最多3个敌对目标造成一次受到自身治疗量加成的伤害，并使其招式施展距离降低15%，持续8秒，施展时每中和一点温性该伤害会心几率提高15%；还使得周围15尺最多3个友方目标招式施展距离增加15%，移动速度提高15%，持续8秒。'
  },
  '释冰':{
    'img':'15691',
    'alias':'释冰',
    'desc':'"银光照雪"会心几率提高10%，会心效果提高10%，对友方目标施展时，立即吞噬其"赤芍寒香"剩余治疗量。'
  },
  '莲池':{
    'img':'15713',
    'alias':'莲池',
    'desc':'"青川濯莲"不再占用基础调息时间，作用目标提高3个。'
  },
  '自馨':{
    'img':'15703',
    'alias':'自馨',
    'desc':'"千枝绽蕊"期间受到伤害使自身气血值低于25%时，在自身脚下生成一朵莲花，持续10秒，莲花被摧毁前自身受到伤害降低70%。自身则强制进入"千枝伏藏"状态，并获得60秒的调息时间。'
  },
  '拂怜':{
    'img':'15715',
    'alias':'拂怜',
    'desc':'每次触发"灵素中和"，随机降低自身"七情"的1秒或者2秒持续时长。'
  },
  '陌归':{
    'img':'15715',
    'alias':'陌归',
    'desc':'每次触发"灵素中和"，随机降低自身"七情"的1秒或者2秒持续时长。'
  },
  '辞零':{
    'img':'15714',
    'alias':'辞零',
    'desc':'"银光照雪"治疗目标将会消除目标属于自身50%的"自苦"层数，并卸除目标阴性、阳性、混元性、毒性不利效果各一个。'
  },
  '卫矛':{
    'img':'15717',
    'alias':'卫矛',
    'desc':'"枯木苏息"效果自身不再沉睡，但使得自身救治的友方目标获得气血最大值500%的治疗吸收盾，持续30秒，若效果结束后未吸收足够治疗量则救治的目标重新枯萎。'
  },
  '青圃着尘':{
    'img':'15768',
    'alias':'青圃',
    'desc':'被动效果："凌波飞叶令"套路招式调息时间受到加速影响，每次施展获得2片"飞叶"效果。<br>主动效果：拥有12片"飞叶"可以施展，引导"飞叶"对目标及其周围10尺范围最多4个非自身的友方目标进行持续治疗。每片"飞叶"对范围内随机一个友方目标回复气血值，当"飞叶"命中10尺外的友方目标时回复气血值提高至。"飞叶"连续命中同一友方目标时其后续治疗效果会衰减50%。'
  },
  '百药宣时':{
    'img':'15718',
    'alias':'百药',
    'desc':'在自身脚下舒展一幅卷轴，使得自身进入"百药宣时"状态，"中和"效果提高50%，施展"行宜列药"套路的治疗招式均会额外触发一次"中和"效果，持续10秒，期间自身每通过这个方式获得额外的一次中和效果，即使得"百药宣时"状态结束后的下一次中和效果治疗量降低90%。'
  }
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
      if (item['skillname'] === '当归四逆'){
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

    let qingchuan = resObj.value['replay']['qingchuan'].slice(1)
    if (qingchuan[qingchuan.length - 1][1]){
      qingchuan.push([resObj.value['replay']['finalTime'],0])
    }
    let qingchuan_active = []
    for (let i = 1;i < qingchuan.length; i = i + 2){
      qingchuan_active.push([qingchuan[i-1][0],qingchuan[i][0] - qingchuan[i - 1][0]])
    }

    let qianzhi_active = []
    if (resObj.value['replay']['qianzhi'].length % 2 === 0){
      let endMark = resObj.value['replay']['qianzhi'][resObj.value['replay']['qianzhi'].length - 1]
      endMark[0] = resObj.value['replay']['finalTime']
      resObj.value['replay']['qianzhi'].push(endMark)
    }
    for (let i = 2;i < resObj.value['replay']['qianzhi'].length - 1; i = i + 2){
      qianzhi_active.push([resObj.value['replay']['qianzhi'][i-1][0],resObj.value['replay']['qianzhi'][i][0] - resObj.value['replay']['qianzhi'][i-1][0]])
    }

    let yaoxing_data = resObj.value['replay']['yaoxing']
    let yaoxing_end = yaoxing_data[yaoxing_data.length - 1]
    yaoxing_end[0] = resObj.value['replay']['finalTime']
    yaoxing_data.unshift(['time','yaoxing'])
    yaoxing_data.push(yaoxing_end)
    for (let item of yaoxing_data){
      item[1] = -1 * item[1]
    }

    timeFlowData.value = {
      GCD,
      timeFlowWidth,
      casting,
      firstHit,
      timeScale,
      realTimeRank,
      allTimeRank,
      qingchuan_active,
      qianzhi_active,
      yaoxing_data
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

const yaoxing_chart = computed(()=>{
  return {
    dataset:{
      source:timeFlowData.value.yaoxing_data
    },
    xAxis:{
      type:'time',
      boundaryGap: false,
      axisPointer:{
        show:true,
        label:{
          show:true,
          backgroundColor:'transparent',
          formatter:(params)=>{
            let toTime = (params.value - resObj.value['replay']['startTime']) / 1000
            return toTime.toFixed(1) + 's'
          }
        }
      },
    },
    yAxis:{
      max:5,
      min:-5,
      maxInterval:1,
      splitLine:{
        lineStyle:{
          color:'rgba(85,85,85,0.5)'
        }
      }
    },
    series:[{
      type: 'line',
      step:'end',
      symbol: 'none',
      encode:{
        x:'time',
        y:'yaoxing'
      },
      areaStyle: {}
    }],
    grid:{
      top:'0px',
      bottom:'0px',
      left:'0px',
      right:'0px'
    },
    visualMap:{
      show:false,
      type:'piecewise',
      dimension:1,
      pieces:[
        {
          gte: -5,
          lt: -4,
          color: 'rgb(31,78,120)'
        },
        {
          gte: -4,
          lt: -3,
          color: 'rgb(47,117,181)'
        },
        {
          gte: -3,
          lt: -2,
          color: 'rgb(155,194,230)'
        },
        {
          gte: -2,
          lt: -1,
          color: 'rgb(189,215,238)'
        },
        {
          gte: -1,
          lt: 0,
          color: 'rgb(221,235,247)'
        },
        {
          gte: 0,
          lt: 1,
          color: '#FFFFFF'
        },
        {
          gte: 1,
          lt: 2,
          color: 'rgb(255,242,204)'
        },
        {
          gte: 2,
          lt: 3,
          color: 'rgb(255,230,153)'
        },
        {
          gte: 3,
          lt: 4,
          color: 'rgb(255,217,102)'
        },
        {
          gte: 4,
          lt: 5,
          color: 'rgb(255,192,0)'
        },
        {
          gte: 5,
          lt: 6,
          color: 'rgb(249,104,13)'
        }
      ]
    }
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
.flowerBuff{
  display: flex;
  flex-direction: row;
  height: v-bind("icon_length");
  border-bottom: 1px solid #555;
}
.qianzhiBuff{
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
  top:v-bind("(101 + 4 * icon_length) + 'px'")
}
.noGCD_skill_icon{
  position: absolute;
  top: v-bind("(101 + icon_length) + 'px'")
}
.GCD_skill_icon{
  position: absolute;
  top:101px;
}
.qianzhi_icon{
  position: absolute;
  top:v-bind("(101 + 3 * icon_length) + 'px'")
}
.flower_icon{
  position: absolute;
  top:v-bind("(101 + 2 * icon_length) + 'px'")
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