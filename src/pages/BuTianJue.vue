<template>
  <template v-if="loaded">
    <div style="display:flex;flex-direction:column;align-items: center;position: relative">
      <div style="display:flex; justify-content:space-between;font-size: 20px; font-weight: bold; width: 1400px;margin-bottom: 20px">
        <div>{{resObj['overall']['edition']}}</div>
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
            <div @click="router.push(`/character/${resObj.overall['server']}/${resObj.overall['name']}`)"
                 style="margin: 10px 10px 5px; color:#409EFF; cursor: pointer">{{ resObj.overall['name'] }}</div>
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
              <ShowEquip :equipInfo="resObj.equip.raw"></ShowEquip>
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
        <div style="display: flex;flex-direction: column; border: 1px solid #555; width: 520px; background-color: #141414">
          <div style="margin: 10px 10px 0px 10px;display: flex;justify-content: space-between">
            <div style="font-size: 18px;font-weight: bold">治疗组</div>
            <div style="display: flex;flex-direction: row;align-items: center">
              <el-button link @click="selectHPS = 0">
                <template #default>
                  <span :class="selectHPS === 0 ? 'selected' : 'unselected'">面板HPS</span>
                </template>
              </el-button>
              <el-button link @click="selectHPS = 1">
                <template #default>
                  <span :class="selectHPS === 1 ? 'selected' : 'unselected'">oHPS</span>
                </template>
              </el-button>
              <el-button link @click="selectHPS = 2">
                <template #default>
                  <span :class="selectHPS === 2 ? 'selected' : 'unselected'">aHPS</span>
                </template>
              </el-button>
              <el-button link @click="selectHPS = 3">
                <template #default>
                  <span :class="selectHPS === 3 ? 'selected' : 'unselected'">rHPS</span>
                </template>
              </el-button>
              <el-divider direction="vertical" />
              <el-button link :icon="QuestionFilled" @click="router.push('/help/hps')">帮助</el-button>
            </div>
          </div>
          <div style="margin-left:10px;margin-right:10px; flex-grow: 1">
            <v-chart @click='toPartner' v-if="selectHPS === 0" :option="healer_chart[0]" style="height: 100%;width: 100%"></v-chart>
            <v-chart v-else-if="selectHPS === 1" :option="healer_chart[1]" style="height: 100%;width: 100%"></v-chart>
            <v-chart v-else-if="selectHPS === 2" :option="healer_chart[2]" style="height: 100%;width: 100%"></v-chart>
            <v-chart v-else-if="selectHPS === 3" :option="healer_chart[3]" style="height: 100%;width: 100%"></v-chart>
          </div>
        </div>
      </div>
      <!--            统计面板-->
            <el-tabs type="border-card"  class="statisticBox">
              <el-tab-pane label="即时排名">
                <div class="statisticBoxInner">
                  <SkillDisplay :skill="timeFlowData.realTimeRank['bcqs']" :sortList="{
              'key':['num','numPerSec','delay','HPS','effRate'],
              'value':['数量：','每秒数量：','延迟：','HPS：','有效比例：']}">
                    <template #icon>
                      <img class="skill_statistic_icon" :src="getImageUrl('bcqs','skills_logo')" alt="冰蚕牵丝">
                      <text style="margin-top: 5px; font-weight: bold;font-size: 16px">冰蚕牵丝</text>
                    </template>
                  </SkillDisplay>
                  <SkillDisplay :skill="timeFlowData.realTimeRank['zwjt']" :sort-list="{
              'key':['num','numPerSec','delay','HPS','effRate'],
              'value':['数量：','每秒数量：','延迟：','HPS：','有效比例：']}">
                    <template #icon>
                      <img class="skill_statistic_icon" :src="getImageUrl('zwjt','skills_logo')" alt="醉舞九天">
                      <text style="margin-top: 5px; font-weight: bold;font-size: 16px">醉舞九天</text>
                    </template>
                  </SkillDisplay>
                  <SkillDisplay :skill="timeFlowData.realTimeRank['sszt']" :sort-list="{
              'key':['num','numPerSec','delay','HPS','effRate'],
              'value':['数量：','每秒数量：','延迟：','HPS：','有效比例：']}">
                    <template #icon>
                      <img class="skill_statistic_icon" :src="getImageUrl('sszt','skills_logo')" alt="圣手织天">
                      <text style="margin-top: 5px; font-weight: bold;font-size: 16px">圣手织天</text>
                    </template>
                  </SkillDisplay>
                  <SkillDisplay :skill="timeFlowData.realTimeRank['qdtr']" :sort-list="{
              'key':['num','numPerSec','HPS','effRate'],
              'value':['数量：','每秒数量：','HPS：','有效比例：']}">
                    <template #icon>
                      <img class="skill_statistic_icon" :src="getImageUrl('qdtr','skills_logo')" alt="千蝶吐瑞">
                      <text style="margin-top: 5px; font-weight: bold;font-size: 16px">千蝶吐瑞</text>
                    </template>
                  </SkillDisplay>
                  <SkillDisplay :skill="timeFlowData.realTimeRank['dc']" :sort-list="{
              'key':['num','numPerSec','HPS','effRate'],
              'value':['数量：','每秒数量：','HPS：','有效比例：']}">
                    <template #icon>
                      <img class="skill_statistic_icon" :src="getImageUrl('dc','skills_logo')" alt="蝶池">
                      <text style="margin-top: 5px; font-weight: bold;font-size: 16px">蝶池</text>
                    </template>
                  </SkillDisplay>
                  <SkillDisplay :skill="timeFlowData.realTimeRank['mxym']" :sort-list="{
              'key':['num','numPerSec','HPS','cover'],
              'value':['数量：','每秒数量：','HPS：','覆盖率：']}">
                    <template #icon>
                      <img class="skill_statistic_icon" :src="getImageUrl('mxym','skills_logo')" alt="迷仙引梦">
                      <text style="margin-top: 5px; font-weight: bold;font-size: 16px">迷仙引梦</text>
                    </template>
                  </SkillDisplay>
                  <SkillDisplay :skill="timeFlowData.realTimeRank['dx']" :sort-list="{
              'key':['num','HPS'],
              'value':['数量：','HPS：']}">
                    <template #icon>
                      <img class="skill_statistic_icon" :src="getImageUrl('dx','skills_logo')" alt="蝶旋">
                      <text style="margin-top: 5px; font-weight: bold;font-size: 16px">蝶旋</text>
                    </template>
                  </SkillDisplay>
                  <SkillDisplay :skill="timeFlowData.realTimeRank['general']" :sort-list="{
              'key':['ghzs','nvwa','ql','efficiencyNonGcd','efficiency'],
              'value':['蛊惑覆盖率：','女娲覆盖率：','绮栊覆盖率：','战斗效率：','GCD效率：']}">
                    <template #icon>
                      <img class="skill_statistic_icon" :src="getImageUrl('tuanfu','skills_logo')" alt="综合">
                      <text style="margin-top: 5px; font-weight: bold;font-size: 16px">综合</text>
                    </template>
                  </SkillDisplay>
                </div>
              </el-tab-pane>
              <el-tab-pane label="全时刻排名">
                <div class="statisticBoxInner">
                  <SkillDisplay :skill="timeFlowData.allTimeRank['bcqs']" :sortList="{
              'key':['num','numPerSec','delay','HPS','effRate'],
              'value':['数量：','每秒数量：','延迟：','HPS：','有效比例：']}">
                    <template #icon>
                      <img class="skill_statistic_icon" :src="getImageUrl('bcqs','skills_logo')" alt="冰蚕牵丝">
                      <text style="margin-top: 5px; font-weight: bold;font-size: 16px">冰蚕牵丝</text>
                    </template>
                  </SkillDisplay>
                  <SkillDisplay :skill="timeFlowData.allTimeRank['zwjt']" :sort-list="{
              'key':['num','numPerSec','delay','HPS','effRate'],
              'value':['数量：','每秒数量：','延迟：','HPS：','有效比例：']}">
                    <template #icon>
                      <img class="skill_statistic_icon" :src="getImageUrl('zwjt','skills_logo')" alt="醉舞九天">
                      <text style="margin-top: 5px; font-weight: bold;font-size: 16px">醉舞九天</text>
                    </template>
                  </SkillDisplay>
                  <SkillDisplay :skill="timeFlowData.allTimeRank['sszt']" :sort-list="{
              'key':['num','numPerSec','delay','HPS','effRate'],
              'value':['数量：','每秒数量：','延迟：','HPS：','有效比例：']}">
                    <template #icon>
                      <img class="skill_statistic_icon" :src="getImageUrl('sszt','skills_logo')" alt="圣手织天">
                      <text style="margin-top: 5px; font-weight: bold;font-size: 16px">圣手织天</text>
                    </template>
                  </SkillDisplay>
                  <SkillDisplay :skill="timeFlowData.allTimeRank['qdtr']" :sort-list="{
              'key':['num','numPerSec','HPS','effRate'],
              'value':['数量：','每秒数量：','HPS：','有效比例：']}">
                    <template #icon>
                      <img class="skill_statistic_icon" :src="getImageUrl('qdtr','skills_logo')" alt="千蝶吐瑞">
                      <text style="margin-top: 5px; font-weight: bold;font-size: 16px">千蝶吐瑞</text>
                    </template>
                  </SkillDisplay>
                  <SkillDisplay :skill="timeFlowData.allTimeRank['dc']" :sort-list="{
              'key':['num','numPerSec','HPS','effRate'],
              'value':['数量：','每秒数量：','HPS：','有效比例：']}">
                    <template #icon>
                      <img class="skill_statistic_icon" :src="getImageUrl('dc','skills_logo')" alt="蝶池">
                      <text style="margin-top: 5px; font-weight: bold;font-size: 16px">蝶池</text>
                    </template>
                  </SkillDisplay>
                  <SkillDisplay :skill="timeFlowData.allTimeRank['mxym']" :sort-list="{
              'key':['num','numPerSec','HPS','cover'],
              'value':['数量：','每秒数量：','HPS：','覆盖率：']}">
                    <template #icon>
                      <img class="skill_statistic_icon" :src="getImageUrl('mxym','skills_logo')" alt="迷仙引梦">
                      <text style="margin-top: 5px; font-weight: bold;font-size: 16px">迷仙引梦</text>
                    </template>
                  </SkillDisplay>
                  <SkillDisplay :skill="timeFlowData.allTimeRank['dx']" :sort-list="{
              'key':['num','HPS'],
              'value':['数量：','HPS：']}">
                    <template #icon>
                      <img class="skill_statistic_icon" :src="getImageUrl('dx','skills_logo')" alt="蝶旋">
                      <text style="margin-top: 5px; font-weight: bold;font-size: 16px">蝶旋</text>
                    </template>
                  </SkillDisplay>
                  <SkillDisplay :skill="timeFlowData.allTimeRank['general']" :sort-list="{
              'key':['ghzs','nvwa','ql','efficiencyNonGcd','efficiency'],
              'value':['蛊惑覆盖率：','女娲覆盖率：','绮栊覆盖率：','战斗效率：','GCD效率：']}">
                    <template #icon>
                      <img class="skill_statistic_icon" :src="getImageUrl('tuanfu','skills_logo')" alt="综合">
                      <text style="margin-top: 5px; font-weight: bold;font-size: 16px">综合</text>
                    </template>
                  </SkillDisplay>
                </div>
              </el-tab-pane>
            </el-tabs>
      <!--      时间轴        -->
      <div style="display:flex;flex-direction:row; width: 1400px; border: 1px solid #555;background-color: #141414;position: relative;margin-bottom: 20px">
        <div style="display:flex;flex-direction:column; width: 150px;border-right: 1px solid #555">
          <div class="label">GCD技能</div>
          <div class="label">醉舞九天</div>
          <div class="label">非GCD技能</div>
          <div class="label">迷仙引梦</div>
          <div class="label">仙王蛊鼎</div>
          <div class="label">蛊惑众生</div>
          <div class="label">BOSS机制</div>
        </div>
        <el-scrollbar style="width: 1250px;position: relative" ref="scrollBar" @wheel.prevent="handleScroll">
          <div class="timeFlow">
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
              <div class="GCD_skill_icon" v-for="item in timeFlowData.firstHit" :style="{
                backgroundColor:'rgba(63, 31, 159, 0.8)',
                borderRadius:'3px',
                left:xPosition(item['start']),
                height: icon_length,
                width: Math.floor(item['hits'] * item['duration'] / 2 * 40 / 1000) + 'px'}">
              </div>
              <img v-for="(item, index) in timeFlowData.firstHit"
                   :src="getImageUrl(item.iconid,'skills_logo')"
                   alt="icon" class="GCD_skill_icon"
                   @mouseenter="enterImg($event,item)"
                   @mouseleave="leaveImg($event,item)"
                   :style="{
                           left:xPosition(item.start),
                           height: icon_length,
                           width: icon_length
                          }">
            </div>
            <div class="zuiwu">
              <div v-for="i in timeFlowData.timeScale" style="height: 100%; width: 199px;border-right: 1px solid rgba(85,85,85,0.5)"></div>
              <div class="zuiwu_icon" v-for="item in timeFlowData.zwjtChannel" :style="{
                backgroundColor:'rgba(63, 31, 159, 0.8)',
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
            <div class="mixian">
              <div v-for="i in timeFlowData.timeScale" style="height: 100%; width: 199px;border-right: 1px solid rgba(85,85,85,0.5)"></div>
              <div class="mixian_icon" v-for="item in timeFlowData.mxymChannel" :style="{
                backgroundColor:'rgba(63, 31, 159, 0.8)',
                borderRadius:'3px',
                left:xPosition(item['startTime']),
                height: icon_length,
                width: Math.floor(item['duration'] * 40 / 1000) + 'px'}">
              </div>
            </div>
            <div class="guding">
              <div v-for="i in timeFlowData.timeScale" style="height: 100%; width: 199px;border-right: 1px solid rgba(85,85,85,0.5)"></div>
              <div class="guding_icon" v-for="item in timeFlowData.xwgdChannel" :style="{
                backgroundColor:'rgba(63, 31, 159, 0.8)',
                borderRadius:'3px',
                left:xPosition(item['startTime']),
                height: icon_length,
                width: Math.floor(item['duration'] * 40 / 1000) + 'px'}">
              </div>
            </div>
            <div class="guhuo">
              <div v-for="i in timeFlowData.timeScale" style="height: 100%; width: 199px;border-right: 1px solid rgba(85,85,85,0.5)"></div>
              <div class="guhuo_icon" v-for="item in timeFlowData.ghzsChannel" :style="{
                backgroundColor:'rgba(63, 31, 159, 0.8)',
                borderRadius:'3px',
                left:xPosition(item['startTime']),
                height: icon_length,
                width: Math.floor(item['duration'] * 40 / 1000) + 'px'}">
              </div>
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
import ShowEquip from '../components/ShowEquip.vue'
import SkillDisplay from '../components/SkillDisplay.vue'
import Review from '../components/Review.vue'
import axios from "axios";
import { useRoute, useRouter } from 'vue-router'
import { QuestionFilled } from '@element-plus/icons-vue'

const loaded = ref(false)
const route = useRoute()
const router = useRouter()
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

const occTable = {
  2:'lijingyidao',
  5:'yunchangxinjing',
  6:'butianjue',
  22:'xiangzhi',
  212:'lingsu'
}

const qixueTable = {
  '冰体':{
    'img':'3210',
    'alias':'冰体',
    'desc':'"冰蚕牵丝"溅射造成的疗伤效果提高100%且数量提高2个。'
  },
  '清霜':{
    'img':'2746',
    'alias':'清霜',
    'desc':'"醉舞九天"治疗效果提高10%，作用范围提高2尺。'
  },
  '柔丝':{
    'img':'2745',
    'alias':'柔丝',
    'desc':'"冰蚕牵丝"不再对额外的目标生效，但疗伤效果提高50%。'
  },
  '圣涌':{
    'img':'3029',
    'alias':'圣涌',
    'desc':'当宠物存在时，你受到的伤害降低10%。'
  },
  '仁心':{
    'img':'3036',
    'alias':'仁心',
    'desc':'"冰蚕牵丝"疗伤效果提高10%。'
  },
  '蛊梦':{
    'img':'2746',
    'alias':'蛊梦',
    'desc':'"女娲补天"效果期间，"醉舞九天"的吟唱时间由5秒降低为3.4秒，总跳数和治疗量不变。'
  },
  '织雾':{
    'img':'2781',
    'alias':'织雾',
    'desc':'"圣手织天"减伤效果提高10%，减伤效果延长1秒。'
  },
  '圣咏':{
    'img':'2744',
    'alias':'圣咏',
    'desc':'"千蝶吐瑞"的作用时间由8秒降低至4秒，但总作用次数不变。'
  },
  '离争':{
    'img':'3020',
    'alias':'离争',
    'desc':'宠物受到的伤害降低60%，招式伤害造成的威胁值提高，毒性内功招式命中目标后，都能恢复当前宠物7%气血最大值。宠物免疫控制。'
  },
  '飞天':{
    'img':'9563',
    'alias':'飞天',
    'desc':'施展"醉舞九天"立刻造成一跳治疗且有3秒调息时间，"醉舞九天"会心提高10%，会心效果提高10%，且只对小队成员生效。'
  },
  '冰蚕诀':{
    'img':'3019',
    'alias':'冰蚕诀',
    'desc':'"蚕引"效果下"冰蚕牵丝"治疗成效额外提高45%。'
  },
  '冰丝':{
    'img':'2745',
    'alias':'冰丝',
    'desc':'施展"冰蚕牵丝"，使自身急速提高3%，持续18秒，可叠加3层。'
  },
  '虫兽':{
    'img':'3023',
    'alias':'虫兽',
    'desc':'当宠物存在时，自身毒性内功基础攻击力提高15%，疗伤效果提高15%。'
  },
  '祭灵':{
    'img':'2803',
    'alias':'祭灵',
    'desc':'"蛊虫献祭"调息时间降低2秒，施展后立即重置所有宠物技能调息时间。'
  },
  '蝶戏水':{
    'img':'3021',
    'alias':'蝶戏水',
    'desc':'"千蝶吐瑞"治疗量提高20%，在施放过程中若累积治疗同一个目标2次，将为该目标添加效果，使受到的伤害降低35%，持续6秒。'
  },
  '蝶息':{
    'img':'2748',
    'alias':'蝶息',
    'desc':'"千蝶吐瑞"调息时间降低15秒，每命中一个目标，为自身回复3%内力值。'
  },
  '织天':{
    'img':'17213',
    'alias':'织天',
    'desc':'"千蝶吐瑞"每跳使"圣手织天"调息时间降低1秒，战斗状态下完整运功后使自身下一次"圣手织天"会心几率提高30%，会心效果提高30%。'
  },
  '蝎噬':{
    'img':'2757',
    'alias':'蝎噬',
    'desc':'"圣蝎"每攻击一次目标则减少【驭虫奇术】套路下技能调息时间2秒。'
  },
  '渊兮':{
    'img':'2803',
    'alias':'渊兮',
    'desc':'"女娲补天"调息时间降低至30秒，招式效果持续时间降低至10秒。'
  },
  '炼石':{
    'img':'17212',
    'alias':'炼石',
    'desc':'连续三次施展"冰蚕牵丝"或"圣手织天"命中同一目标则会额外使目标恢复点气血值。'
  },
  '枭泣':{
    'img':'2808',
    'alias':'枭泣',
    'desc':'当宠物死亡时，给予宠物周围15尺内最多5个友方目标一个护盾，可以吸收2000点加自身最大气血值10%的伤害，持续10秒。'
  },
  '无惑':{
    'img':'3038',
    'alias':'无惑',
    'desc':'"蛊惑众生"调息时间降低10秒，且生息蛊造成的额外疗伤效果提高20%。'
  },
  '毒手':{
    'img':'3034',
    'alias':'毒手',
    'desc':'"玄水蛊"可以对20尺内的敌方玩家施展，造成点点伤害，效果持续期间自身受到的55%伤害将由敌方玩家承担，目标死亡或距离超过自身50尺则效果消失。（距离限制不在名剑大会，阵营战场，绝境战场场景生效）'
  },
  '纳精':{
    'img':'2756',
    'alias':'纳精',
    'desc':'"醉舞九天"增加1跳。'
  },
  '点苍':{
    'img':'2805',
    'alias':'点苍',
    'desc':'施展"玄水蛊"使宠物当前气血及气血最大值提高50%，且宠物承担的伤害增加至70%。'
  },
  '守一':{
    'img':'3028',
    'alias':'守一',
    'desc':'"圣手织天"命中目标后使自身免疫打断运功、缴械和无法运功效果的影响，持续4秒。'
  },
  '求凰':{
    'img':'14141',
    'alias':'求凰',
    'desc':'"女娲补天"状态下可施展二段技能"求凰"，解除自身控制效果，并使"女娲补天"姿态立即结束。同时庇佑10尺内的最多5个友方目标并使其受到的伤害降低40%，持续4秒。'
  },
  '风身':{
    'img':'3026',
    'alias':'风身',
    'desc':'"女娲补天"状态下被定身、眩晕后，每受到一次攻击，将有90%几率去除这些控制效果。'
  },
  '沉魄':{
    'img':'2762',
    'alias':'沉魄',
    'desc':'"蛊虫献祭"或宠物死亡时重置宠物的调息时间。"蛊虫献祭"的内力消耗降低100%。'
  },
  '决灵':{
    'img':'2743',
    'alias':'决灵',
    'desc':'"女娲补天"移动速度提高20%，且基础疗伤成效提高至100%。'
  },
  '良兽':{
    'img':'9557',
    'alias':'良兽',
    'desc':'"玄水蛊"效果期间，若为自身承受伤害的目标未死亡，则效果结束后降低15秒"玄水蛊"调息时间。'
  },
  '尾后针':{
    'img':'2749',
    'alias':'尾后针',
    'desc':'自身每点治疗提高"灵蛇"1点攻击。'
  },
  '噬蛊':{
    'img':'9564',
    'alias':'噬蛊',
    'desc':'"灵蛊"调息时间增加10秒，可对自身或友方目标释放使其免疫控制（击退和被拉除外），持续5秒。最多叠加到20秒。'
  },
  '仙王蛊鼎':{
    'img':'2747',
    'alias':'蛊鼎',
    'desc':'在地面放置一个仙王蛊鼎，你所属的小队或团队成员可以点击它，每人每30秒只能使用一次。使用后恢复30%气血值和20%内力值。仙王蛊鼎在60秒或者在被使用20次之后消失。'
  },
  '留香':{
    'img':'2748',
    'alias':'留香',
    'desc':'"千蝶吐瑞"可额外透支使用一次，可以在空中施展，使得自身短时停留在空中，若在空中施展，每跳返还0.5秒调息时间，并为自身添加可以格挡2%气血值的伤害吸收盾，持续2秒，可以叠加。'
  },
  '茧灵':{
    'img':'7439',
    'alias':'茧灵',
    'desc':'施展"圣手织天"，减伤效果期间若目标侠士气血值首次低于50%，则使得目标获得可以格挡20%最大气血值的伤害吸收盾，持续4秒。'
  },
  '蝉蜕':{
    'img':'2806',
    'alias':'蝉蜕',
    'desc':'任何伤害使你的当前气血值低于1%时，若自身存在宠物，则牺牲宠物并回复自身50%最大气血值，该效果最多每150秒触发一次。'
  },
  '蝶隐':{
    'img':'9567',
    'alias':'蝶隐',
    'desc':'献祭"碧蝶"后，蝴蝶不再簇拥自身产生治疗而是在脚下生成一个半径8尺的蝶池，每秒回复范围内最多10个友方目标气血值，持续4秒。'
  },
  '承华':{
    'img':'9568',
    'alias':'承华',
    'desc':'"碧蝶"的主动技能"蝶鸾"能额外卸除一个不利效果。调息时间增加到8秒，且使目标6尺范围内最多五个目标回复气血值和5%内力值。'
  },
  '倾心':{
    'img':'2768',
    'alias':'倾心',
    'desc':'"蛊惑众生"额外传递的疗伤效果提高25%。'
  },
  '织心':{
    'img':'3028',
    'alias':'织心',
    'desc':'"圣手织天"调息时间降低2秒，命中时有50%几率使自身获得1层"蚕引"效果，命中气血值低于50%的目标，调息额外降低3秒且必定使自身获得1层"蚕引"效果。'
  },
  '辟寒':{
    'img':'2781',
    'alias':'辟寒',
    'desc':'施展"化蝶"后，立刻对半径15尺内最多5个目标回复点气血值并提高30%的移动速度，持续8秒。'
  },
  '曳光':{
    'img':'2762',
    'alias':'曳光',
    'desc':'施展"蛊虫献祭"后，使自身受到的伤害降低40%，持续4秒。'
  },
  '散影':{
    'img':'2830',
    'alias':'散影',
    'desc':'"化蝶"调息时间降低2秒，施展后自身受到的伤害效果降低40%，持续6秒。'
  },
  '绮栊':{
    'img':'14142',
    'alias':'绮栊',
    'desc':'"醉舞九天"治疗效果提高10%，在释放过程中若累计治疗同一个目标两次，将为目标添加效果，使其受到的伤害降低3%，持续5秒，最多可叠加3层。'
  },
  '争簇':{
    'img':'2748',
    'alias':'争簇',
    'desc':'"千蝶吐瑞"命中气血值低于50%的目标，额外造成60%治疗效果。'
  },
  '采珍':{
    'img':'2744',
    'alias':'采珍',
    'desc':'施展"蛊虫献祭"后立刻重置"圣手织天""蛊惑众生"调息时间。'
  },
  '乱絮':{
    'img':'2811',
    'alias':'乱絮',
    'desc':'"化蝶"变成2层充能效果，充能时间30秒。'
  },
  '迷仙引梦':{
    'img':'7255',
    'alias':'迷仙',
    'desc':'在自身20尺范围内放置一个苗疆圣物，圣物会逐渐成长，成长过程中每2秒为半径20尺范围内最多10名友方目标恢复点气血及3%内力值，持续时间20秒，持续时间越久，圣物疗伤效果越高。'
  },
  '圣元阵':{
    'img':'13447',
    'alias':'圣元阵',
    'desc':'吸引大量蝶群围绕目标，立即产生一次治疗效果，且使得目标所在8尺范围最多5个自身小队成员每1.5秒回复气血值，持续6秒。如果目标是友方侠士，使得目标受到疗伤成效提高20% ，如果目标是敌方侠士，使得目标招式命中几率降低50%。'
  },
}

const teamMate = ref()

axios({
  method:'get',
  url: `http://120.48.95.56:8009/getReplayPro?id=${route.params.replay_id}`
}).then((res)=>{
  console.log(res)
  if (res.data.available){
    let repl = res.data['raw'].replace(/'/g, '"').replace(/&#39;/g, '"').replace(/\n/g, '\\n').replace(/\t/g, '\\t');
    let repl2 = res.data['rank'].replace(/'/g, '"').replace(/&#34;/g, '"').replace(/\n/g, '\\n').replace(/\t/g, '\\t');
    let repl3 = res.data['teammate'].replace(/'/g, '"').replace(/&#34;/g, '"').replace(/\n/g, '\\n').replace(/\t/g, '\\t');
    let replay  = JSON.parse(repl)
    resObj.value = JSON.parse(repl)
    let rank = JSON.parse(repl2)
    rankObj.value = JSON.parse(repl2)
    teamMate.value = JSON.parse(repl3)

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
    realTimeRank['general']['ghzs'] = realTimeRank['ghzs']['cover']
    realTimeRank['general']['ql'] = realTimeRank['qilong']['cover']
    realTimeRank['general']['nvwa'] = realTimeRank['nvwa']['cover']
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
    allTimeRank['general']['ghzs'] = allTimeRank['ghzs']['cover']
    allTimeRank['general']['ql'] = allTimeRank['qilong']['cover']
    allTimeRank['general']['nvwa'] = allTimeRank['nvwa']['cover']

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
      if (item['skillname'] === '千蝶吐瑞'){
        channelling.push(item)
        // TODO 帮狗花修蛊惑BUG，下版本记得改回来
      }else if (item['skillname'] === '蛊惑众生'){
        resObj.value['replay']['special'].push(item)
      }
      else{
        casting.push(item)
      }
    }
    resObj.value['replay']['special'].sort((a,b)=>{
      if(a.start > b.start){
        return a - b
      }else{
        return b - a
      }
    })
    let firstHit = []
    if (channelling.length > 0){
      firstHit.push({...channelling[0]})
      firstHit[0]['hits'] = 1
      for (let i = 1; i < channelling.length; i++){
        if (channelling[i]['start'] - channelling[i - 1]['start'] < 1000){
          firstHit[firstHit.length - 1]['hits'] += 1
          firstHit[firstHit.length - 1]['heal'] = firstHit[firstHit.length - 1]['heal'] + channelling[i]['heal']
          firstHit[firstHit.length - 1]['healeff'] = firstHit[firstHit.length - 1]['healeff'] + channelling[i]['healeff']
          firstHit[firstHit.length - 1]['targetName'] = firstHit[firstHit.length - 1]['targetName'] + '+' + channelling[i]['targetName']
        }else{
          firstHit.push({...channelling[i]})
          firstHit[firstHit.length - 1]['hits'] = 1
        }
      }
    }

    let zwjtChannel = []
    for (let i = 0; i < replay['replay']['zwjt'].length; i++){
      if(replay['replay']['zwjt'][i][1] === 1){
        if (i !== replay['replay']['zwjt'].length - 1){
          zwjtChannel.push({
            startTime:replay['replay']['zwjt'][i][0],
            duration:replay['replay']['zwjt'][i + 1][0] - replay['replay']['zwjt'][i][0]
          })
        }else{
          zwjtChannel.push({
            startTime:replay['replay']['zwjt'][i][0],
            duration:replay['replay']['finalTime'] - replay['replay']['zwjt'][i][0]
          })
        }
      }
    }

    let mxymChannel = []
    for (let i = 0; i < replay['replay']['mxym'].length; i++){
      if(replay['replay']['mxym'][i][1] === 1){
        if (i < replay['replay']['mxym'].length - 1){
          mxymChannel.push({
            startTime:replay['replay']['mxym'][i][0],
            duration:replay['replay']['mxym'][i + 1][0] - replay['replay']['mxym'][i][0]
          })
        }else{
          mxymChannel.push({
            startTime:replay['replay']['mxym'][i][0],
            duration:replay['replay']['finalTime'] - replay['replay']['mxym'][i][0]
          })
        }
      }
    }

    let xwgdChannel = []
    for (let i = 0; i < replay['replay']['xwgd'].length; i++){
      if(replay['replay']['xwgd'][i][1] === 1){
        if (i < replay['replay']['xwgd'].length - 1){
          xwgdChannel.push({
            startTime:replay['replay']['xwgd'][i][0],
            duration:replay['replay']['xwgd'][i + 1][0] - replay['replay']['xwgd'][i][0]
          })
        }else{
          xwgdChannel.push({
            startTime:replay['replay']['xwgd'][i][0],
            duration:replay['replay']['finalTime'] - replay['replay']['xwgd'][i][0]
          })
        }
      }
    }

    let ghzsChannel = []
    for (let i = 0; i < replay['replay']['ghzs'].length; i++){
      if(replay['replay']['ghzs'][i][1] === 1){
        if (i < replay['replay']['ghzs'].length - 1){
          ghzsChannel.push({
            startTime:replay['replay']['ghzs'][i][0],
            duration:replay['replay']['ghzs'][i + 1][0] - replay['replay']['ghzs'][i][0]
          })
        }else{
          ghzsChannel.push({
            startTime:replay['replay']['ghzs'][i][0],
            duration:replay['replay']['finalTime'] - replay['replay']['ghzs'][i][0]
          })
        }
      }
    }

    timeFlowData.value = {
      GCD,
      timeFlowWidth,
      casting,
      firstHit,
      timeScale,
      realTimeRank,
      allTimeRank,
      zwjtChannel,
      mxymChannel,
      xwgdChannel,
      ghzsChannel
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

const selectHPS = ref(0)

const toPartner = (params) => {
  let occ = occTable[resObj.value.healer.table[params.dataIndex]['occ']]
  let id = teamMate.value[resObj.value.healer.table[params.dataIndex]['name']]
  router.push(`/${occ}/${id}`)
}

const healer_chart = computed(()=>{
  if(loaded.value){
    let healer = []
    let hps = []
    let effHps = []
    let aHPS = []
    let oHPS = []
    let rHPS = []
    let occ = []
    for(let item of resObj.value['healer']['table']){
      healer.push(item['name'])
      hps.push(item['heal'] - item['healEff'])
      effHps.push(item['healEff'])
      occ.push(item['occ'])
      if (resObj.value['overall']['edition'].slice(-5) >= '8.1.0'){
        rHPS.push(item['rhps'])
        oHPS.push(item['ohps'])
        aHPS.push(item['ahps'])
      }else{
        rHPS.push(0)
        oHPS.push(0)
        aHPS.push(0)
      }
    }
    let HPSData = {
      tooltip: {
        trigger: 'axis',
        showContent:false,
        axisPointer: {
          type: 'shadow',
        }
      },
      xAxis: {
        type: 'category',
        data: healer,
        triggerEvent:true,
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
      yAxis: {
        type: 'value',
        splitLine:{
          lineStyle:{
            color:'#555'
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
            color:'white',
            offset:[0,-5]
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
            color:'white',
            offset:[0,-15],
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
        top:'10px',
        bottom:'30px',
        right:'0px',
        left:'0px'
      }
    }
    let oHPSData = {
      xAxis: {
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
      yAxis: {
        type: 'value',
        splitLine:{
          lineStyle:{
            color:'#555'
          }
        }
      },
      series: [{
        name: 'oHPS',
        type: 'bar',
        barMaxWidth:'30px',
        label:{
          show:true,
          color:'white',
          position:'top'
        },
        itemStyle:{
          color:function(params){
            return xfColor[occ[params.dataIndex]][0]
          }
        },
        data: oHPS
      }],
      grid:{
        top:'15px',
        bottom:'30px',
        right:'0px',
        left:'0px'
      }
    }
    let aHPSData = {
      xAxis: {
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
      yAxis: {
        type: 'value',
        splitLine:{
          lineStyle:{
            color:'#555'
          }
        }
      },
      series: [{
        name: 'aHPS',
        type: 'bar',
        barMaxWidth:'30px',
        label:{
          show:true,
          color:'white',
          position:'top'
        },
        itemStyle:{
          color:function(params){
            return xfColor[occ[params.dataIndex]][0]
          }
        },
        data: aHPS
      }],
      grid:{
        top:'15px',
        bottom:'30px',
        right:'0px',
        left:'0px'
      }
    }
    let rHPSData = {
      xAxis: {
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
      yAxis: {
        type: 'value',
        splitLine:{
          lineStyle:{
            color:'#555'
          }
        }
      },
      series: [{
        name: 'rHPS',
        type: 'bar',
        barMaxWidth:'30px',
        label:{
          show:true,
          color:'white',
          position:'top'
        },
        itemStyle:{
          color:function(params){
            return xfColor[occ[params.dataIndex]][0]
          }
        },
        data: rHPS
      }],
      grid:{
        top:'15px',
        bottom:'30px',
        right:'0px',
        left:'0px'
      }
    }
    return [HPSData,oHPSData,aHPSData,rHPSData]
  }else{
    return [{},{},{},{}]
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
.zuiwu{
  display: flex;
  flex-direction: row;
  height: v-bind("icon_length");
  border-bottom: 1px solid #555;
}
.mixian{
  display: flex;
  flex-direction: row;
  height: v-bind("icon_length");
  border-bottom: 1px solid #555;
}
.noGCD{
  display: flex;
  flex-direction: row;
  height: v-bind("icon_length");
  border-bottom: 1px solid #555;
}
.guding{
  display: flex;
  flex-direction: row;
  height: v-bind("icon_length");
  border-bottom: 1px solid #555;
}
.guhuo{
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
.GCD_skill_icon{
  position: absolute;
  top:0px;
}
.zuiwu_icon{
  position: absolute;
  top: v-bind("(icon_length) + 'px'")
}
.noGCD_skill_icon{
  position: absolute;
  top: v-bind("(2 * icon_length) + 'px'")
}
.mixian_icon{
  position: absolute;
  top:v-bind("(3 * icon_length) + 'px'")
}
.guding_icon{
  position: absolute;
  top:v-bind("(4 * icon_length) + 'px'")
}
.guhuo_icon{
  position: absolute;
  top:v-bind("(5 * icon_length) + 'px'")
}
.bossPhase_icon{
  position: absolute;
  top:v-bind("(6 * icon_length) + 'px'")
}
.popUp{
  position: absolute;
  max-width: 450px;
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
.selected{
  color: #409EFF
}
</style>