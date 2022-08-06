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
      <!--      统计面板       -->
      <el-tabs type="border-card"  class="statisticBox">
        <el-tab-pane label="即时排名">
          <div class="statisticBoxInner">
            <SkillDisplay :skill="timeFlowData.realTimeRank['meihua']" :sortList="{
        'key':['num','numPerSec','cover','delay','youxiangHPS','pingyinHPS'],
        'value':['数量：','每秒数量：','覆盖率：','延迟：','犹香HPS：','平吟HPS：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('meihua','skills_logo')" alt="梅花三弄">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">梅花三弄</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.realTimeRank['gong']" :sort-list="{
        'key':['num','numPerSec','delay','HPS','effRate','zhenliuHPS'],
        'value':['数量：','每秒数量：','延迟：','HPS：','有效比率：','枕流HPS：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('gong','skills_logo')" alt="宫">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">宫</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.realTimeRank['shang']" :sort-list="{
        'key':['num','numPerSec','cover','delay','HPS'],
        'value':['数量：','每秒数量：','覆盖率：','延迟：','HPS：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('shang','skills_logo')" alt="商">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">商</text>
              </template>
            </SkillDisplay>
            <!--        7.9.1兼容性-->
            <SkillDisplay :skill="timeFlowData.realTimeRank['yu']" :sort-list="resObj.overall['edition'] === '奶歌复盘pro v7.9.1' ?
        {'key':['num','effRate','delay','HPS'], 'value':['数量：','有效比率：','延迟：','HPS：']} :
        {'key':['num','numPerSec','effRate','delay','HPS'], 'value':['数量：','每秒数量：','有效比率：','延迟：','HPS：']}
        ">
              <!--                  -->
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('yu','skills_logo')" alt="羽">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">羽</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.realTimeRank['zhi']" :sort-list="{
        'key':['num','numPerSec','delay','HPS','effRate','gudaoHPS'],
        'value':['数量：','每秒数量：','延迟：','HPS：','有效比率：','古道HPS：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('zhi','skills_logo')" alt="徵">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">徵</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.realTimeRank['jue']" :sort-list="{
        'key':['num','numPerSec','cover','delay','HPS'],
        'value':['数量：','每秒数量：','覆盖率：','延迟：','HPS：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('jue','skills_logo')" alt="角">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">角</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.realTimeRank['xiangyi']" :sort-list="{
        'key':['num','HPS','effRate'],
        'value':['数量：','HPS：','有效比率：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('xiangyi','skills_logo')" alt="相依">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">相依</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.realTimeRank['general']" :sort-list="{
        'key':['APS','SangrouDPS','ZhuangzhouDPS','YujianDPS','efficiency'],
        'value':['APS估算：','桑柔DPS：','庄周梦DPS：','玉简DPS：','战斗效率：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('tuanfu','skills_logo')" alt="团辅">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">团队辅助</text>
              </template>
            </SkillDisplay>
          </div>
        </el-tab-pane>
        <el-tab-pane label="全时刻排名">
          <div class="statisticBoxInner">
            <SkillDisplay :skill="timeFlowData.allTimeRank['meihua']" :sortList="{
        'key':['num','numPerSec','cover','delay','youxiangHPS','pingyinHPS'],
        'value':['数量：','每秒数量：','覆盖率：','延迟：','犹香HPS：','平吟HPS：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('meihua','skills_logo')" alt="梅花三弄">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">梅花三弄</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.allTimeRank['gong']" :sort-list="{
        'key':['num','numPerSec','delay','HPS','effRate','zhenliuHPS'],
        'value':['数量：','每秒数量：','延迟：','HPS：','有效比率：','枕流HPS：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('gong','skills_logo')" alt="宫">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">宫</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.allTimeRank['shang']" :sort-list="{
        'key':['num','numPerSec','cover','delay','HPS'],
        'value':['数量：','每秒数量：','覆盖率：','延迟：','HPS：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('shang','skills_logo')" alt="商">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">商</text>
              </template>
            </SkillDisplay>
            <!--        7.9.1兼容性-->
            <SkillDisplay :skill="timeFlowData.allTimeRank['yu']" :sort-list="resObj.overall['edition'] === '奶歌复盘pro v7.9.1' ?
        {'key':['num','effRate','delay','HPS'], 'value':['数量：','有效比率：','延迟：','HPS：']} :
        {'key':['num','numPerSec','effRate','delay','HPS'], 'value':['数量：','每秒数量：','有效比率：','延迟：','HPS：']}
        ">
              <!--                  -->
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('yu','skills_logo')" alt="羽">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">羽</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.allTimeRank['zhi']" :sort-list="{
        'key':['num','numPerSec','delay','HPS','effRate','gudaoHPS'],
        'value':['数量：','每秒数量：','延迟：','HPS：','有效比率：','古道HPS：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('zhi','skills_logo')" alt="徵">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">徵</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.allTimeRank['jue']" :sort-list="{
        'key':['num','numPerSec','cover','delay','HPS'],
        'value':['数量：','每秒数量：','覆盖率：','延迟：','HPS：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('jue','skills_logo')" alt="角">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">角</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.allTimeRank['xiangyi']" :sort-list="{
        'key':['num','HPS','effRate'],
        'value':['数量：','HPS：','有效比率：']}">
              <template #icon>
                <img class="skill_statistic_icon" :src="getImageUrl('xiangyi','skills_logo')" alt="相依">
                <text style="margin-top: 5px; font-weight: bold;font-size: 16px">相依</text>
              </template>
            </SkillDisplay>
            <SkillDisplay :skill="timeFlowData.allTimeRank['general']" :sort-list="{
        'key':['APS','SangrouDPS','ZhuangzhouDPS','YujianDPS','efficiency'],
        'value':['APS估算：','桑柔DPS：','庄周梦DPS：','玉简DPS：','战斗效率：']}">
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
          <div style="display:flex; flex-direction:column; justify-content:center; height: 100px; padding-left:10px; background-color:#201020; border-bottom: 1px solid #555;">
            <div>DPS梅花盾</div>
            <div>实时覆盖率</div>
          </div>
          <div class="label">GCD技能</div>
          <div class="label">非GCD技能</div>
          <div class="label">曲风状态</div>
          <div class="label">BOSS机制</div>
        </div>
        <el-scrollbar style="width: 1250px;position: relative" ref="scrollBar" @wheel.prevent="handleScroll">
          <div class="timeFlow">
            <div style="height: 100px;width: 100%;border-bottom: 1px solid #555">
              <v-chart class="coverage_chart" :option="coverage_chart_option"></v-chart>
            </div>
            <div class="GCD">
              <div v-for="i in timeFlowData.timeScale" style="height: 100%; width: 199px;border-right: 1px solid rgba(85,85,85,0.5)"></div>
              <div v-for="(item, index) in timeFlowData.firstHit"
                   @mouseenter="enterImg($event,item)"
                   @mouseleave="leaveImg($event,item)"
                   :style="{
                           position: 'absolute',
                           top:'101px',
                           borderRadius:'3px',
                           backgroundColor:'rgb(100, 250, 180)',
                           left:xPosition(item.start),
                           height: icon_length,
                           width: Math.floor(item.duration * item['hits'] / 1000 * 40) + 'px'
                          }"></div>
              <img v-for="(item, index) in timeFlowData.firstHit"
                   :src="getImageUrl('7174','skills_logo')"
                   @mouseenter="enterImg($event,item)"
                   @mouseleave="leaveImg($event,item)"
                   alt="icon"
                   class="GCD_skill_icon"
                   :style="{
                             left:xPosition(item.start),
                             height: icon_length,
                             width: icon_length
                            }">
              <img v-for="(item, index) in timeFlowData.timeflow_without_channelling"
                   :src="getImageUrl(item.iconid,'skills_logo')"
                   alt="icon"
                   class="GCD_skill_icon"
                   @mouseenter="enterImg($event,item)"
                   @mouseleave="leaveImg($event,item)"
                   :style="{
                           left:xPosition(item.start),
                           height: icon_length,
                           width: icon_length
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
            <div class="songStatus">
              <div v-for="i in timeFlowData.timeScale" style="height: 100%; width: 199px;border-right: 1px solid rgba(85,85,85,0.5)"></div>
              <div v-for="item in timeFlowData.songChange" :class="item.skillname" :style="{
                position:'absolute',
                borderRadius:'3px',
                left:xPosition(item.start),
                height: icon_length,
                width: item.lasts / 1000 * 40 + 'px',
                top:(101 + 2 * icon_length) + 'px'
            }">
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
              <div v-if="popUpDetails['targetName']" style="margin: 10px" v-html="'目标：<br>' + popUpDetails['targetName']"></div>
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
import {watch, nextTick, ref, toRaw,computed} from 'vue'

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

const qixueTable = {
  '雪海':{
    'img':'7097',
    'alias':'雪海',
    'desc':'"宫"治疗效果提高10%。'
  },
  '红隙':{
    'img':'7100',
    'alias':'红隙',
    'desc':'"宫"会心几率提高10%，会心效果提高10%。'
  },
  '蔚风':{
    'img':'7102',
    'alias':'蔚风',
    'desc':'"角"每跳为友方玩家目标和自身回复1%内力值，该效果同一时间只能作用一个目标。'
  },
  '枕流':{
    'img':'7956',
    'alias':'枕流',
    'desc':'"高山流水"曲目下每次施展"变宫"将会给目标叠加一层"枕流"效果，"枕流"持续8秒叠加至2层将对目标造成点治疗效果，"枕流"只能对一个目标生效。'
  },
  '秋鸿':{
    'img':'7121',
    'alias':'秋鸿',
    'desc':'"徵"内力消耗降低15%，可对目标及其半径20尺范围内小队成员产生治疗效果。'
  },
  '风入松':{
    'img':'7079',
    'alias':'风入松',
    'desc':'施展"角"使自身和目标移动速度提高30％，持续4秒。'
  },
  '奉知音':{
    'img':'13451',
    'alias':'奉知音',
    'desc':'施展"移形换影"后3秒内，"徵"或"羽"命中当前选中的友方目标，对目标造成一次必会心的额外治疗量。若目标拥有属于自身的持续治疗效果，每多一个持续治疗效果则多造成一次必会心的额外治疗。'
  },
  '争簇':{
    'img':'7126',
    'alias':'争簇',
    'desc':'"徵"作用效果降低20%，每0.5秒产生一次作用效果，持续3秒。'
  },
  '潋滟':{
    'img':'11860',
    'alias':'潋滟',
    'desc':'"变徵"对目标造成一次治疗，使目标身上属于自身所有的持续治疗立刻生效一跳。'
  },
  '石间意':{
    'img':'7129',
    'alias':'石间意',
    'desc':'施展"梅花三弄"主动招式，使目标免疫控制效果(击退和被拉除外)、缴械和无法运功效果，持续3秒，若"梅花三弄"盾提前消失则此效果消失。'
  },
  '流音':{
    'img':'7136',
    'alias':'流音',
    'desc':'受到伤害重伤时自身影子将对自身施展"杯水留影"，该效果将不受"杯水留影"秘籍影响。'
  },
  '绿绮':{
    'img':'7133',
    'alias':'绿绮',
    'desc':'"羽"治疗成效提高15%，施展后使"徵"会心几率提高10%，会心效果提高10%，持续10秒，该效果时间可叠加。'
  },
  '敛意':{
    'img':'16233',
    'alias':'敛意',
    'desc':'解除自身受到的所有控制，执剑作歌，持续6秒，期间自身闪避几率提高80%，"醉剑"命中敌方目标则回复自身及10尺内小队成员气血值，可施展二段招式提前结束，收剑回琴。'
  },
  '一指回鸾':{
    'img':'7045',
    'alias':'回鸾',
    'desc':'为友方目标卸除混元性内功不利效果、阳性内功不利效果、阴性内功不利效果、毒性内功不利效果各一个，并使目标气血值恢复点。'
  },
  '谪仙':{
    'img':'7137',
    'alias':'谪仙',
    'desc':'"徵"运功不会被打退，立刻对目标产生治疗效果，治疗效果提高20%。'
  },
  '超然':{
    'img':'7169',
    'alias':'超然',
    'desc':'"孤影化双"调息时间降低45秒，施展返回招式时，不受缴械和无法运功效果的影响，影子被召回8秒内仍然会附着玩家，期间分摊玩家受到伤害的50%，并使自身免疫所有控制效果(击退和被拉除外)。'
  },
  '寒酒':{
    'img':'7142',
    'alias':'寒酒',
    'desc':'"梅花三弄"盾效果持续时间延长70%。'
  },
  '温语':{
    'img':'7144',
    'alias':'温语',
    'desc':'"梅花三弄"伤害吸收量提高10%，命中气血值低于50%的目标，伤害吸收量再额外提高40%。'
  },
  '自赏':{
    'img':'7144',
    'alias':'自赏',
    'desc':'"梅花三弄"伤害吸收量提高10%，命中气血值低于50%的目标，伤害吸收量再额外提高40%。'
  },
  '引芳':{
    'img':'7148',
    'alias':'引芳',
    'desc':'"商""角"增加两跳治疗效果，"变宫""宫"不再需要运功，立刻对目标造成治疗效果，并使目标每3秒受到一次治疗效果，持续18秒。每个治疗持续效果为目标提供一层6%的减伤，最多可以叠加三层。'
  },
  '犹香':{
    'img':'7150',
    'alias':'犹香',
    'desc':'"梅花三弄"盾也会治疗目标，数值相当于伤害吸收量的65%。'
  },
  '平吟':{
    'img':'7151',
    'alias':'平吟',
    'desc':'施展"梅花三弄"将使自身恢复点点气血值，"梅花三弄"效果因受到伤害提前消失后获得的"寒梅"减伤效果，可在5秒内持续减免伤害。'
  },
  '寸光阴':{
    'img':'7153',
    'alias':'寸光阴',
    'desc':'"商""角"治疗效果降低15%，"宫""变宫"成功运功两次后，命中有自身"商"或"角"持续治疗效果的目标，使目标及其小队20尺范围内所有友方队友添加该持续效果。'
  },
  '井仪':{
    'img':'7155',
    'alias':'井仪',
    'desc':'持续效果被卸除后，每个持续效果使驱散者2秒内无法运功，最多持续6秒。'
  },
  '笙簧':{
    'img':'7157',
    'alias':'笙簧',
    'desc':'"梅花三弄"盾持续时间结束时若仍拥有最大吸收量且目标在战斗状态，则自动刷新盾的持续时间。'
  },
  '乐情':{
    'img':'7161',
    'alias':'乐情',
    'desc':'"笑傲光阴"调息时间降低7秒，音域减伤效果可对自身小队成员产生作用，自身减伤效果提高至70%。'
  },
  '思议':{
    'img':'7114',
    'alias':'思议',
    'desc':'"高山流水"主动技能状态期间运功不会被打退、打断，不受无法施展内功招式和缴械效果的影响。'
  },
  '绝唱':{
    'img':'7117',
    'alias':'绝唱',
    'desc':'"梅花三弄"若提前消失，则减少目标身上"落梅"效果持续时间，数值为"梅花三弄"剩余持续时间的60%。'
  },
  '蒹葭':{
    'img':'7149',
    'alias':'蒹葭',
    'desc':'"云生结海"音域生成时立刻平衡音域范围内所有小队成员当前气血值百分比并恢复10%气血最大值。'
  },
  '捣衣':{
    'img':'7165',
    'alias':'捣衣',
    'desc':'施展"疏影横斜"将自身传送至影子位置后使自身免疫缴械和无法运功效果，持续3秒，该效果时间可累加。'
  },
  '行云':{
    'img':'13453',
    'alias':'行云',
    'desc':'"商""角"会心几率提高10%，会心效果提高20%。'
  },
  '诗上':{
    'img':'7160',
    'alias':'诗上',
    'desc':'施展"移形换影"后"疏影"效果期间，自身治疗效果的45%将再次作用于自身。'
  },
  '相依':{
    'img':'7168',
    'alias':'相依',
    'desc':'"孤影化双"持续时间延长8秒，施展"孤影化双"后，残影会在场地中施展两次逐渐向外扩散的环形音波，"莫问"心法下对敌对目标造成2次共计点阴性内功伤害，"相知"心法下使友方玩家回复2次共计点气血值。'
  },
  '流霜':{
    'img':'13449',
    'alias':'流霜',
    'desc':'自身所有持续效果每跳造成的效果递增12%，自身所有持续作用间隔缩短1秒，总持续时间保持不变。'
  },
  '天音知脉':{
    'img':'7170',
    'alias':'天音',
    'desc':'"羽"充能时间提高3秒，"梅花三弄"曲风下，施展"羽"消除目标"落梅"效果，并使自身下一次"梅花三弄"必会心。'
  },
  '绕梁':{
    'img':'11865',
    'alias':'绕梁',
    'desc':'"梅花三弄"只对一个目标生效，治疗成效提高100%，若"梅花三弄"提前消失，使得目标"寒梅"效果期间，受到治疗成效提高25%。'
  },
  '棋宫':{
    'img':'7104',
    'alias':'棋宫',
    'desc':'"阳春白雪"曲目下，自身治疗基础值提高10%。'
  },
  '贯珠':{
    'img':'7106',
    'alias':'贯珠',
    'desc':'受到技能伤害超过自身气血最大值10%，则该次伤害降低20%。'
  },
  '寿生':{
    'img':'7107',
    'alias':'寿生',
    'desc':'"杯水留影"使目标复活持续时间延长30秒，救治目标后立刻重置目标所有招式调息时间（救治重伤目标招式除外）。'
  },
  '庄周梦':{
    'img':'9555',
    'alias':'庄周梦',
    'desc':'"梅花三弄"持续期间，目标伤害招式无视目标15%内外功防御等级。'
  },
  '不器':{
    'img':'12720',
    'alias':'不器',
    'desc':'若"商""角"造成完整治疗，则为目标额外恢复气血值。'
  },
  '掷杯':{
    'img':'7110',
    'alias':'掷杯',
    'desc':'施展任何疗伤招式命中气血值低于50%的目标，使自身基础治疗效果提高10%，持续12秒。'
  },
  '游羽':{
    'img':'7076',
    'alias':'游羽',
    'desc':'"青霄飞羽"持续期间基础疗伤成效提高25%，双击"左平移""右平移"，可朝指定方向移动一段距离。'
  },
  '江永':{
    'img':'11861',
    'alias':'江永',
    'desc':'气套路下技能调息时间降低20%。'
  },
  '大韶':{
    'img':'7113',
    'alias':'大韶',
    'desc':'"云生结海""笑傲光阴"无需运功可直接释放。'
  },
  '古道':{
    'img':'14066',
    'alias':'古道',
    'desc':'"青霄飞羽"期间自身受到伤害降低20%，施展治疗招式命中目标使得目标额外回复1.5%的最大气血值。'
  },
  '祭子期':{
    'img':'13448',
    'alias':'祭子期',
    'desc':'"高山流水"主动技能变为充能技能，可充能两层，调息时间为50秒。'
  },
  '无尽藏':{
    'img':'7115',
    'alias':'无尽藏',
    'desc':'"阳春白雪"主动技能调息时间降低2秒。'
  },
  '桑柔':{
    'img':'11863',
    'alias':'桑柔',
    'desc':'"梅花三弄"持续期间，目标每次造成伤害，盾也会追加一次伤害。自身治疗量越高，伤害越高，对非侠士目标造成的伤害提高100%。每个盾每4秒最多触发一次。'
  },
  '琴音共鸣':{
    'img':'7118',
    'alias':'琴音',
    'desc':'移除敌对玩家身上2个增益效果，并添加给自身。'
  },
  '游太清':{
    'img':'14070',
    'alias':'游太清',
    'desc':'对敌方侠士目标施展，保存目标气血状态，持续10秒，可以施展二段技能，使目标气血状态恢复至记录的状态，但目标气血值不会低于30%。'
  }
}

const teamMate = ref()

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

axios({
  method:'get',
  url: `http://120.48.95.56:8009/getReplayPro?id=${route.params.replay_id}`
}).then((res)=>{
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
    let timeflow_without_channelling = []
    let timeflow_channelling = []
    for (let item of replay['replay']['normal']){
      if (item['skillname'] === '徵'){
        timeflow_channelling.push(item)
      }else{
        timeflow_without_channelling.push(item)
      }
    }
    let firstHit = [timeflow_channelling[0]]
    firstHit[0]['hits'] = 1
    for (let i = 1; i < timeflow_channelling.length; i++){
      if (timeflow_channelling[i]['start'] - timeflow_channelling[i - 1]['start'] < 1000){
        firstHit[firstHit.length - 1]['hits'] += 1
        firstHit[firstHit.length - 1]['heal'] = firstHit[firstHit.length - 1]['heal'] + timeflow_channelling[i]['heal']
        firstHit[firstHit.length - 1]['healeff'] = firstHit[firstHit.length - 1]['healeff'] + timeflow_channelling[i]['healeff']
      }else{
        firstHit.push(timeflow_channelling[i])
        firstHit[firstHit.length - 1]['hits'] = 1
      }
    }
    let songChange = []
    songChange.push({
      'skillname':'梅花三弄·切换',
      'start':replay['replay']['startTime']
    })
    for (let item of replay['replay']['special']){
      if(item['skillname'] === '高山流水·切换' || item['skillname'] === '阳春白雪·切换' || item['skillname'] === '梅花三弄·切换'){
        songChange.push(item)
      }
    }
    for (let i = 0; i < songChange.length; i++){
      if (i < songChange.length - 1){
        songChange[i]['lasts'] = songChange[i + 1]['start'] - songChange[i]['start']
      }else{
        songChange[i]['lasts'] = replay['replay']['finalTime'] - songChange[i]['start']
      }
    }

    if (replay.equip.available){
      console.log(replay.equip.raw)
    }
    timeFlowData.value = {
      GCD,
      timeFlowWidth,
      timeScale,
      realTimeRank,
      allTimeRank,
      timeflow_channelling,
      timeflow_without_channelling,
      firstHit,
      songChange
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

const coverage_chart_option = computed(()=>{
  if (loaded.value){
    let xAxis = []
    for (let i = 0; i < resObj.value['replay']['heat']['timeline'].length; i++){
      xAxis.push(0.5 * i + 's')
    }
    return {
      xAxis:{
        type:'category',
        data:xAxis,
        boundaryGap: false,
      },
      yAxis:{
        max:100,
        min:0,
        splitLine:{
          lineStyle:{
            color:'rgba(85,85,85,0.5)'
          }
        }
      },
      tooltip:{
        trigger:'axis',
        confine:true,
        valueFormatter: (value) => value + '%'
      },
      series:[{
        type: 'line',
        data:resObj.value['replay']['heat']['timeline'],
        symbol: 'none',
        areaStyle: {}
      }],
      grid:{
        top:'0px',
        bottom:'0px',
        left:'0px',
        right:'0px'
      }
    }
    }
    return {}
})

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
.songStatus{
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
.阳春白雪·切换{
  background-image: url("../assets/skills_logo/ycbx.png");
  background-color: rgba(0, 255, 170, 0.2);
  background-repeat: no-repeat;
}
.高山流水·切换{
  background-image: url("../assets/skills_logo/gsls.png");
  background-color: rgba(0, 170, 255,0.2);
  background-repeat: no-repeat;
}
.梅花三弄·切换{
  background-image: url("../assets/skills_logo/mhsn.png");
  background-color: rgba(221, 170, 255,0.2);
  background-repeat: no-repeat;
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