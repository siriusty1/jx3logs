<template>
<!--  <div style="display:flex;flex-direction:column;align-items: center">-->
<!--    <div class="infoBox">-->
<!--      奶歌复盘Beta-->
<!--    </div>-->
<!--    <div class="reviewBox">-->
<!--      <el-collapse>-->
<!--        <el-collapse-item name="1" v-if="resObj['review']['content'][0]['status']">-->
<!--          <template #title>-->
<!--            <el-icon :size="18" style="margin-left: 10px; color: rgb(219, 40, 40)"><CloseBold /></el-icon>-->
<!--            <div class="reviewTitle">不要死</div>-->
<!--          </template>-->
<!--          <div class="reviewDetails">-->
<!--            所有的重伤都可以避免，请尝试躲避技能，正确处理机制。重伤会产生非常大的影响，不仅会极大程度降低你的团队贡献，而且增加了战斗失败的可能。-->
<!--          </div>-->
<!--          <div class="reviewDetails">-->
<!--            你在本场战斗中重伤了：0次，期间浪费了：{{resObj['review']['content'][0]['duration']}}秒的时间。-->
<!--          </div>-->
<!--        </el-collapse-item>-->
<!--        <el-collapse-item name="2" v-if="resObj['review']['content'][5]['status']">-->
<!--          <template #title>-->
<!--            <el-icon :size="18" style="margin-left: 10px; color: rgb(219, 40, 40)"><CloseBold /></el-icon>-->
<!--            <div class="reviewTitle">不要玩血歌</div>-->
<!--          </template>-->
<!--          <div class="reviewDetails">-->
<!--            只要不是全程持续伤害类型的副本，血歌的作用就永远比盾歌低。梅花三弄附带的化解和减伤同样可以减少团队血量的压力，并且还能带来输出增益，“团血崩了”绝不是你切血歌的理由。-->
<!--          </div>-->
<!--        </el-collapse-item>-->
<!--        <el-collapse-item name="3" v-if="resObj['review']['content'][1]['status']">-->
<!--          <template #title>-->
<!--            <el-icon :size="18" style="margin-left: 10px; color: rgb(219, 40, 40)"><CloseBold /></el-icon>-->
<!--            <div class="reviewTitle">不要放生队友</div>-->
<!--          </template>-->
<!--          <div class="reviewDetails">-->
<!--            如果你的队友没有受到不可挽救的伤害，你就应当对其进行治疗以避免重伤。请记住，治疗职业的第一优先级永远是保证团队成员的存活，不要为了刷治疗量放弃队友。有时拯救队友需要快速的反应或者预判，这取决于你对副本的理解。-->
<!--          </div>-->
<!--          <div class="reviewDetails">-->
<!--            你在本场战斗中你放生了num次队友：time，id，damage。-->
<!--          </div>-->
<!--        </el-collapse-item>-->
<!--        <el-collapse-item name="4">-->
<!--          <template #title>-->
<!--            <el-icon v-if="resObj['review']['content'][2]['status'] === 3" :size="18" style="margin-left: 10px; color: rgb(219, 40, 40)"><CircleCloseFilled /></el-icon>-->
<!--            <el-icon v-if="resObj['review']['content'][2]['status'] === 2" :size="18" style="margin-left: 10px; color: rgb(242, 113, 28)"><CirclePlusFilled /></el-icon>-->
<!--            <el-icon v-if="resObj['review']['content'][2]['status'] === 1" :size="18" style="margin-left: 10px; color: rgb(235, 199, 0)"><CirclePlusFilled /></el-icon>-->
<!--            <el-icon v-if="resObj['review']['content'][2]['status'] === 0" :size="18" style="margin-left: 10px; color: rgb(33, 186, 69)"><CircleCheckFilled /></el-icon>-->
<!--            <div class="reviewTitle">保持GCD不要空转</div>-->
<!--          </template>-->
<!--          <div class="reviewDetails">-->
<!--            保持使用技能是战斗的基础。只要你持续处于读条或者转GCD的状态，就一定比站在原地发呆好。记得为可能产生的移动做好准备，在移动时也可以使用瞬发技能。-->
<!--          </div>-->
<!--          <div class="reviewDetails">-->
<!--            你在本场战斗中战斗效率为{{(100 * resObj['review']['content'][2]['cover']).toFixed(2)}}%，超过了{{resObj['review']['content'][2]['rank']}}%的玩家。-->
<!--          </div>-->
<!--        </el-collapse-item>-->
<!--        <el-collapse-item name="5">-->
<!--          <template #title>-->
<!--            <el-icon v-if="resObj['review']['content'][3]['status'] === 3" :size="18" style="margin-left: 10px; color: rgb(219, 40, 40)"><CircleCloseFilled /></el-icon>-->
<!--            <el-icon v-if="resObj['review']['content'][3]['status'] === 2" :size="18" style="margin-left: 10px; color: rgb(242, 113, 28)"><CirclePlusFilled /></el-icon>-->
<!--            <el-icon v-if="resObj['review']['content'][3]['status'] === 1" :size="18" style="margin-left: 10px; color: rgb(235, 199, 0)"><CirclePlusFilled /></el-icon>-->
<!--            <el-icon v-if="resObj['review']['content'][3]['status'] === 0" :size="18" style="margin-left: 10px; color: rgb(33, 186, 69)"><CircleCheckFilled /></el-icon>-->
<!--            <div class="reviewTitle">提高HPS或虚条HPS</div>-->
<!--          </template>-->
<!--          <div class="reviewDetails">-->
<!--            HPS仍然是副本中评价治疗职业的公认标准，保证充足的HPS可以为团队提供更高的容错。在副本环境中，很多时候你需要用溢出治疗来保证血量健康，因此虚条HPS也可以是指标的一部分。-->
<!--          </div>-->
<!--          <div class="reviewDetails">-->
<!--            你在本场战斗中的HPS为：{{resObj['review']['content'][3]['hps']}}，超过了{{resObj['review']['content'][3]['hpsRank']}}%的玩家；虚条HPS为：{{resObj['review']['content'][3]['ohps']}}，超过了{{resObj['review']['content'][3]['ohpsRank']}}%的玩家。-->
<!--          </div>-->
<!--        </el-collapse-item>-->
<!--        <el-collapse-item name="6">-->
<!--          <template #title>-->
<!--            <el-icon v-if="resObj['review']['content'][4]['status'] === 3" :size="18" style="margin-left: 10px; color: rgb(219, 40, 40)"><CircleCloseFilled /></el-icon>-->
<!--            <el-icon v-if="resObj['review']['content'][4]['status'] === 2" :size="18" style="margin-left: 10px; color: rgb(242, 113, 28)"><CirclePlusFilled /></el-icon>-->
<!--            <el-icon v-if="resObj['review']['content'][4]['status'] === 1" :size="18" style="margin-left: 10px; color: rgb(235, 199, 0)"><CirclePlusFilled /></el-icon>-->
<!--            <el-icon v-if="resObj['review']['content'][4]['status'] === 0" :size="18" style="margin-left: 10px; color: rgb(33, 186, 69)"><CircleCheckFilled /></el-icon>-->
<!--            <div class="reviewTitle">使用有CD的技能</div>-->
<!--          </template>-->
<!--          <div class="reviewDetails">-->
<!--            有CD的技能大多都是十分强力的。虽然说有时这些技能应当用来救急，但是如果战斗中它们空转了过长的时间，或许你应该去重新安排它们。-->
<!--          </div>-->
<!--          <div class="reviewDetails">-->
<!--            <div style="display: flex; align-items: center">-->
<!--              <img style="height: 24px" :src="getImageUrl('7052','skills_logo')" alt="孤影化双">-->
<!--              <text style="margin-left: 5px">-->
<!--                孤影化双：{{ resObj['review']['content'][4]['num'][0] }} / {{ resObj['review']['content'][4]['sum'][0] }}-->
<!--              </text>-->
<!--            </div>-->
<!--            <div style="display: flex; align-items: center">-->
<!--              <img style="height: 24px" :src="getImageUrl('7066','skills_logo')" alt="疏影横斜">-->
<!--              <text style="margin-left: 5px">-->
<!--                疏影横斜：{{ resObj['review']['content'][4]['num'][1] }} / {{ resObj['review']['content'][4]['sum'][1] }}-->
<!--              </text>-->
<!--            </div>-->
<!--          </div>-->
<!--        </el-collapse-item>-->
<!--        <el-collapse-item name="7">-->
<!--          <template #title>-->
<!--            <el-icon v-if="resObj['review']['content'][6]['status'] === 3" :size="18" style="margin-left: 10px; color: rgb(219, 40, 40)"><CircleCloseFilled /></el-icon>-->
<!--            <el-icon v-if="resObj['review']['content'][6]['status'] === 2" :size="18" style="margin-left: 10px; color: rgb(242, 113, 28)"><CirclePlusFilled /></el-icon>-->
<!--            <el-icon v-if="resObj['review']['content'][6]['status'] === 1" :size="18" style="margin-left: 10px; color: rgb(235, 199, 0)"><CirclePlusFilled /></el-icon>-->
<!--            <el-icon v-if="resObj['review']['content'][6]['status'] === 0" :size="18" style="margin-left: 10px; color: rgb(33, 186, 69)"><CircleCheckFilled /></el-icon>-->
<!--            <div class="reviewTitle">保证梅花三弄的覆盖率</div>-->
<!--          </template>-->
<!--          <div class="reviewDetails">-->
<!--            梅花三弄的覆盖率是奶歌最重要的指标，保证覆盖率可以增加团队输出，同时也为团队血量提供保障。多数时候，即使面对血量不满的目标也应当贴盾，让其它治疗来奶满。-->
<!--          </div>-->
<!--          <div class="reviewDetails">-->
<!--            你在本场战斗中梅花三弄的覆盖率为：{{ (100 * resObj['review']['content'][6]['cover']).toFixed(2) }}%，超过了{{ resObj['review']['content'][6]['rank'] }}%的玩家。-->
<!--          </div>-->
<!--        </el-collapse-item>-->
<!--        <el-collapse-item name="8">-->
<!--          <template #title>-->
<!--            <el-icon v-if="resObj['review']['content'][7]['status'] === 3" :size="18" style="margin-left: 10px; color: rgb(219, 40, 40)"><CircleCloseFilled /></el-icon>-->
<!--            <el-icon v-if="resObj['review']['content'][7]['status'] === 2" :size="18" style="margin-left: 10px; color: rgb(242, 113, 28)"><CirclePlusFilled /></el-icon>-->
<!--            <el-icon v-if="resObj['review']['content'][7]['status'] === 1" :size="18" style="margin-left: 10px; color: rgb(235, 199, 0)"><CirclePlusFilled /></el-icon>-->
<!--            <el-icon v-if="resObj['review']['content'][7]['status'] === 0" :size="18" style="margin-left: 10px; color: rgb(33, 186, 69)"><CircleCheckFilled /></el-icon>-->
<!--            <div class="reviewTitle">中断徵的倒读条</div>-->
<!--          </template>-->
<!--          <div class="reviewDetails">-->
<!--            `徵`应当在读条过半时中断（带有`争簇`时为第3跳，无`争簇`时为第2跳），这样可以最大化利用`弄梅`；特别是当点出`谪仙`时，不中断会导致损失徵的跳数。-->
<!--          </div>-->
<!--          <div class="reviewDetails">-->
<!--            你在本场战斗中总共运功了{{ resObj['review']['content'][7]['time'] }}次徵，但只正确中断了{{ resObj['review']['content'][7]['perfectTime'] }}次，其中{{ resObj['review']['content'][7]['fullTime'] }}次完全没有中断。-->
<!--          </div>-->
<!--        </el-collapse-item>-->
<!--        <el-collapse-item name="9">-->
<!--          <template #title>-->
<!--            <el-icon v-if="resObj['review']['content'][8]['status'] === 3" :size="18" style="margin-left: 10px; color: rgb(219, 40, 40)"><CircleCloseFilled /></el-icon>-->
<!--            <el-icon v-if="resObj['review']['content'][8]['status'] === 2" :size="18" style="margin-left: 10px; color: rgb(242, 113, 28)"><CirclePlusFilled /></el-icon>-->
<!--            <el-icon v-if="resObj['review']['content'][8]['status'] === 1" :size="18" style="margin-left: 10px; color: rgb(235, 199, 0)"><CirclePlusFilled /></el-icon>-->
<!--            <el-icon v-if="resObj['review']['content'][8]['status'] === 0" :size="18" style="margin-left: 10px; color: rgb(33, 186, 69)"><CircleCheckFilled /></el-icon>-->
<!--            <div class="reviewTitle">选择合适的徵目标</div>-->
<!--          </template>-->
<!--          <div class="reviewDetails">-->
<!--            徵会以当前目标中心进行20尺扩散，因此选择正确的目标可以让更多队友受到治疗效果。 使用茗伊团队面板的扩散辅助可以精准地找到最适合的目标。-->
<!--          </div>-->
<!--          <div class="reviewDetails">-->
<!--            你在本场战斗中总共有{{ resObj['review']['content'][8]['time'] }}跳徵，其中{{ resObj['review']['content'][8]['coverTime'] }}跳覆盖了4个或更多的目标。-->
<!--          </div>-->
<!--        </el-collapse-item>-->
<!--        <el-collapse-item name="10">-->
<!--          <template #title>-->
<!--            <el-icon v-if="resObj['review']['content'][9]['status'] === 3" :size="18" style="margin-left: 10px; color: rgb(219, 40, 40)"><CircleCloseFilled /></el-icon>-->
<!--            <el-icon v-if="resObj['review']['content'][9]['status'] === 2" :size="18" style="margin-left: 10px; color: rgb(242, 113, 28)"><CirclePlusFilled /></el-icon>-->
<!--            <el-icon v-if="resObj['review']['content'][9]['status'] === 1" :size="18" style="margin-left: 10px; color: rgb(235, 199, 0)"><CirclePlusFilled /></el-icon>-->
<!--            <el-icon v-if="resObj['review']['content'][9]['status'] === 0" :size="18" style="margin-left: 10px; color: rgb(33, 186, 69)"><CircleCheckFilled /></el-icon>-->
<!--            <div class="reviewTitle">使用移形换影</div>-->
<!--          </template>-->
<!--          <div class="reviewDetails">-->
<!--            记得使用`移形换影`去回收影子以维持健康的内力，从而弥补贴盾的大量消耗。-->
<!--          </div>-->
<!--          <div class="reviewDetails">-->
<!--            你在本场战斗中一共浪费了{{ resObj['review']['content'][9]['wasteTime'] }}次影子提供的回蓝。-->
<!--          </div>-->
<!--        </el-collapse-item>-->
<!--        <el-collapse-item name="11">-->
<!--          <template #title>-->
<!--            <el-icon v-if="resObj['review']['content'][10]['status'] === 3" :size="18" style="margin-left: 10px; color: rgb(219, 40, 40)"><CircleCloseFilled /></el-icon>-->
<!--            <el-icon v-if="resObj['review']['content'][10]['status'] === 2" :size="18" style="margin-left: 10px; color: rgb(242, 113, 28)"><CirclePlusFilled /></el-icon>-->
<!--            <el-icon v-if="resObj['review']['content'][10]['status'] === 1" :size="18" style="margin-left: 10px; color: rgb(235, 199, 0)"><CirclePlusFilled /></el-icon>-->
<!--            <el-icon v-if="resObj['review']['content'][10]['status'] === 0" :size="18" style="margin-left: 10px; color: rgb(33, 186, 69)"><CircleCheckFilled /></el-icon>-->
<!--            <div class="reviewTitle">使用角</div>-->
<!--          </template>-->
<!--          <div class="reviewDetails">-->
<!--            记得保持`角`的覆盖以维持健康的内力，从而弥补贴盾的大量消耗。角的持续治疗效果对主T的血量也是可观的支持。-->
<!--          </div>-->
<!--          <div class="reviewDetails">-->
<!--            你在本场战斗中角的覆盖率为：{{ resObj['review']['content'][10]['cover'] }}%。-->
<!--          </div>-->
<!--        </el-collapse-item>-->
<!--      </el-collapse>-->
<!--    </div>-->
<!--    <div class="statisticBox">-->
<!--      <SkillDisplay :skill="realTimeRank['meihua']" :sortList="{-->
<!--        'key':['num','numPerSec','cover','delay','youxiangHPS','pingyinHPS'],-->
<!--        'value':['数量：','每秒数量：','覆盖率：','延迟：','犹香HPS：','平吟HPS：']}">-->
<!--        <template #icon>-->
<!--          <img class="skill_statistic_icon" :src="getImageUrl('meihua','skills_logo')" alt="梅花三弄">-->
<!--          <text style="margin-top: 5px; font-weight: bold;font-size: 16px">梅花三弄</text>-->
<!--        </template>-->
<!--      </SkillDisplay>-->
<!--      <SkillDisplay :skill="realTimeRank['gong']" :sort-list="{-->
<!--        'key':['num','numPerSec','delay','HPS','effRate','zhenliuHPS'],-->
<!--        'value':['数量：','每秒数量：','延迟：','HPS：','有效比率：','枕流HPS：']}">-->
<!--        <template #icon>-->
<!--          <img class="skill_statistic_icon" :src="getImageUrl('gong','skills_logo')" alt="宫">-->
<!--          <text style="margin-top: 5px; font-weight: bold;font-size: 16px">宫</text>-->
<!--        </template>-->
<!--      </SkillDisplay>-->
<!--      <SkillDisplay :skill="realTimeRank['shang']" :sort-list="{-->
<!--        'key':['num','numPerSec','cover','delay','HPS'],-->
<!--        'value':['数量：','每秒数量：','覆盖率：','延迟：','HPS：']}">-->
<!--        <template #icon>-->
<!--          <img class="skill_statistic_icon" :src="getImageUrl('shang','skills_logo')" alt="商">-->
<!--          <text style="margin-top: 5px; font-weight: bold;font-size: 16px">商</text>-->
<!--        </template>-->
<!--      </SkillDisplay>-->
<!--      <SkillDisplay :skill="realTimeRank['yu']" :sort-list="{-->
<!--        'key':['num','numPerSec','effRate','delay','HPS'],-->
<!--        'value':['数量：','每秒数量：','有效比率：','延迟：','HPS：']}">-->
<!--        <template #icon>-->
<!--          <img class="skill_statistic_icon" :src="getImageUrl('yu','skills_logo')" alt="羽">-->
<!--          <text style="margin-top: 5px; font-weight: bold;font-size: 16px">羽</text>-->
<!--        </template>-->
<!--      </SkillDisplay>-->
<!--      <SkillDisplay :skill="realTimeRank['zhi']" :sort-list="{-->
<!--        'key':['num','numPerSec','delay','HPS','effRate','gudaoHPS'],-->
<!--        'value':['数量：','每秒数量：','延迟：','HPS：','有效比率：','古道HPS：']}">-->
<!--        <template #icon>-->
<!--          <img class="skill_statistic_icon" :src="getImageUrl('zhi','skills_logo')" alt="徵">-->
<!--          <text style="margin-top: 5px; font-weight: bold;font-size: 16px">徵</text>-->
<!--        </template>-->
<!--      </SkillDisplay>-->
<!--      <SkillDisplay :skill="realTimeRank['jue']" :sort-list="{-->
<!--        'key':['num','numPerSec','cover','delay','HPS'],-->
<!--        'value':['数量：','每秒数量：','覆盖率：','延迟：','HPS：']}">-->
<!--        <template #icon>-->
<!--          <img class="skill_statistic_icon" :src="getImageUrl('jue','skills_logo')" alt="角">-->
<!--          <text style="margin-top: 5px; font-weight: bold;font-size: 16px">角</text>-->
<!--        </template>-->
<!--      </SkillDisplay>-->
<!--      <SkillDisplay :skill="realTimeRank['xiangyi']" :sort-list="{-->
<!--        'key':['num','HPS','effRate'],-->
<!--        'value':['数量：','HPS：','有效比率：']}">-->
<!--        <template #icon>-->
<!--          <img class="skill_statistic_icon" :src="getImageUrl('xiangyi','skills_logo')" alt="相依">-->
<!--          <text style="margin-top: 5px; font-weight: bold;font-size: 16px">相依</text>-->
<!--        </template>-->
<!--      </SkillDisplay>-->
<!--      <SkillDisplay :skill="realTimeRank['general']" :sort-list="{-->
<!--        'key':['APS','SangrouDPS','ZhuangzhouDPS','YujianDPS','efficiency'],-->
<!--        'value':['APS：','桑柔DPS：','庄周梦DPS：','玉简DPS：','战斗效率：']}">-->
<!--        <template #icon>-->
<!--          <img class="skill_statistic_icon" :src="getImageUrl('tuanfu','skills_logo')" alt="团辅">-->
<!--          <text style="margin-top: 5px; font-weight: bold;font-size: 16px">团队辅助</text>-->
<!--        </template>-->
<!--      </SkillDisplay>-->
<!--    </div>-->
<!--    <div style="display:flex;flex-direction:row; width: 1400px; border: 1px solid #555;background-color: #141414;position: relative">-->
<!--      <div style="display:flex;flex-direction:column; width: 150px;border-right: 1px solid #555">-->
<!--        <div style="display:flex; flex-direction:column; justify-content:center; height: 100px; padding-left:10px; background-color:#201020; border-bottom: 1px solid #555;">-->
<!--          <div>DPS梅花盾</div>-->
<!--          <div>实时覆盖率</div>-->
<!--        </div>-->
<!--        <div class="label">GCD技能</div>-->
<!--        <div class="label">非GCD技能</div>-->
<!--        <div class="label">曲风状态</div>-->
<!--        <div class="label">BOSS机制</div>-->
<!--      </div>-->
<!--      <el-scrollbar style="width: 1250px;position: relative" ref="scrollBar" @wheel.prevent="handleScroll">-->
<!--        <div class="timeFlow">-->
<!--          <div style="height: 100px;width: 100%;border-bottom: 1px solid #555">-->
<!--            <v-chart class="coverage_chart" :option="coverage_chart_option"></v-chart>-->
<!--          </div>-->
<!--          <div class="GCD">-->
<!--            <div v-for="i in timeScale" style="height: 100%; width: 199px;border-right: 1px solid rgba(85,85,85,0.5)"></div>-->
<!--            &lt;!&ndash;            <img v-for="(item, index) in firstHit"&ndash;&gt;-->
<!--            &lt;!&ndash;                 @mouseenter="enterImg($event,item)"&ndash;&gt;-->
<!--            &lt;!&ndash;                 @mouseleave="leaveImg($event,item)"&ndash;&gt;-->
<!--            &lt;!&ndash;                 :src="getImageUrl('15412_' + item.hits,'skills_logo')"&ndash;&gt;-->
<!--            &lt;!&ndash;                 alt="icon"&ndash;&gt;-->
<!--            &lt;!&ndash;                 class="GCD_skill_icon"&ndash;&gt;-->
<!--            &lt;!&ndash;                 :style="{&ndash;&gt;-->
<!--            &lt;!&ndash;                           left:xPosition(item.start),&ndash;&gt;-->
<!--            &lt;!&ndash;                           height:Math.floor(GCD / 1000 * 40)+'px',&ndash;&gt;-->
<!--            &lt;!&ndash;                           width:Math.floor(item.duration * item.hits / 1000 * 40)+'px'&ndash;&gt;-->
<!--            &lt;!&ndash;                          }">&ndash;&gt;-->
<!--            <img v-for="(item, index) in timeflow_without_channelling"-->
<!--                 :src="getImageUrl(item.iconid,'skills_logo')"-->
<!--                 alt="icon"-->
<!--                 class="GCD_skill_icon"-->
<!--                 @mouseenter="enterImg($event,item)"-->
<!--                 @mouseleave="leaveImg($event,item)"-->
<!--                 :style="{-->
<!--                           left:xPosition(item.start),-->
<!--                           height:Math.floor(GCD / 1000 * 40)+'px',-->
<!--                           width:Math.floor(item.duration / 1000 * 40)+'px'-->
<!--                          }">-->
<!--          </div>-->
<!--          <div class="noGCD">-->
<!--            <div v-for="i in timeScale" style="height: 100%; width: 199px;border-right: 1px solid rgba(85,85,85,0.5)"></div>-->
<!--            <img v-for="(item, index) in resObj['replay']['special']"-->
<!--                 @mouseenter="enterImg($event,item)"-->
<!--                 @mouseleave="leaveImg($event,item)"-->
<!--                 :src="getImageUrl(item.iconid,'skills_logo')"-->
<!--                 alt="icon"-->
<!--                 class="noGCD_skill_icon"-->
<!--                 :style="{-->
<!--               left:xPosition(item.start),-->
<!--               height:Math.floor(GCD / 1000 * 40)+'px',-->
<!--               width:Math.floor(GCD / 1000 * 40)+'px'-->
<!--             }">-->
<!--          </div>-->
<!--          <div class="songStatus">-->
<!--            <div v-for="i in timeScale" style="height: 100%; width: 199px;border-right: 1px solid rgba(85,85,85,0.5)"></div>-->
<!--            <div v-for="item in songChange" :class="item.skillname" :style="{-->
<!--                position:'absolute',-->
<!--                borderRadius:'3px',-->
<!--                left:xPosition(item.start),-->
<!--                height: Math.floor(GCD / 1000 * 40)+'px',-->
<!--                width: item.lasts / 1000 * 40 + 'px'-->
<!--            }">-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="bossPhase">-->
<!--            <div v-for="i in timeScale" style="height: 100%; width: 199px;border-right: 1px solid rgba(85,85,85,0.5)"></div>-->
<!--            <img v-for="(item, index) in resObj['replay']['environment']"-->
<!--                 :src="getImageUrl(item.iconid,'skills_logo')"-->
<!--                 alt="icon"-->
<!--                 class="bossPhase_icon"-->
<!--                 @mouseenter="enterImg($event,item)"-->
<!--                 @mouseleave="leaveImg($event,item)"-->
<!--                 :style="{-->
<!--               left:xPosition(item.start),-->
<!--               height:Math.floor(GCD / 1000 * 40)+'px',-->
<!--               width:Math.floor(GCD / 1000 * 40)+'px'-->
<!--             }">-->
<!--          </div>-->
<!--          <div class="timeScale">-->
<!--            <div v-for="i in timeScale" style="display:flex; justify-content: space-between;flex-direction:column; height: 100%; width: 199px;border-right: 1px solid rgba(85,85,85,0.5)">-->
<!--              <text style="margin-left: 10px">{{ (i-1)*5 }}</text>-->
<!--              <text v-if="(i-1)*5 % 60 === 0" style="margin-left: 10px">{{ (i-1)*5 / 60 }}min</text>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div ref="popUp" v-if="popUpShow" class="popUp">-->
<!--            <div style="font-size:20px ;font-weight: bold; margin: 10px">{{ popUpDetails['skillname'] }}</div>-->
<!--            <div v-if="popUpDetails['description']" style="margin: 10px">{{ popUpDetails['description'] }}</div>-->
<!--            <div v-if="popUpDetails['heal']" style="margin: 10px">治疗量：{{ popUpDetails['heal'] }}</div>-->
<!--            <div v-if="popUpDetails['healeff']" style="margin: 10px">有效治疗量：{{ popUpDetails['healeff'] }}</div>-->
<!--            <div v-if="popUpDetails['targetName']" style="margin: 10px" v-html="'目标：<br>' + popUpDetails['targetName']"></div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </el-scrollbar>-->
<!--    </div>-->
<!--  </div>-->

</template>

<script setup>
import {watch, nextTick, onBeforeUnmount, ref, toRaw} from 'vue'
import * as echarts from 'echarts/core';
import { GridComponent,DatasetComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import lodash from 'lodash'
import SkillDisplay from '../components/SkillDisplay.vue'
import axios from "axios";
import { useRoute } from 'vue-router'

const router = useRoute()
const resObj = ref()
const rankObj = ref()

axios({
  method:'get',
  url: `http://139.199.102.41:8009/getReplayPro?id=${router.params.replay_id}`
}).then((res)=>{
  let repl = res.data['raw'].replace(/'/g, '"').replace(/&#39;/g, '"').replace(/\n/g, '\\n').replace(/\t/g, '\\t');
  let repl2 = res.data['rank'].replace(/'/g, '"').replace(/&#34;/g, '"').replace(/\n/g, '\\n').replace(/\t/g, '\\t');
  resObj.value = JSON.parse(repl)
  rankObj.value = JSON.parse(repl2)
  console.log(resObj,rankObj)
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
  else{
    return 'gold'
  }
}
const getImageUrl = (name,folder) => {
  return new URL(`../assets/${folder}/${name}.png`, import.meta.url).href
}

console.log(resObj.value['skill'])
let realTimeRank = lodash.cloneDeep(resObj.value['skill'])
for (let item in realTimeRank){
  for (let sub_item in realTimeRank[item]){
    realTimeRank[item][sub_item] = [realTimeRank[item][sub_item]]
    realTimeRank[item][sub_item].push(resObj['rank'][item][sub_item])
  }
}
console.log(realTimeRank)
const calcGCD = (haste,talent) =>{
  if (haste < 43){}
  else if (haste < 43){return 1500}
  else if (haste >= 43 && haste < 1928){return 1440}
  else if (haste >= 1928 && haste < 4026){return 1380}
  else if (haste >= 4026 && haste < 6296){return 1310}
  else if (haste >= 6296 && haste < 8780){return 1250}
  else{return 1187.5}
}
let GCD = calcGCD(resObj['overall']['hasteReal'],occ)
let timeFlowWidth = (resObj['replay']['finalTime'] - resObj['replay']['startTime']) / 1000 * 40
let timeScale = Math.floor(timeFlowWidth / 200)
let timeflow_without_channelling = []
let timeflow_channelling = []
for (let item of resObj['replay']['normal']){
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
    firstHit[firstHit.length - 1]['heal'] = firstHit[firstHit.length - 1]['heal'] + ' / ' + timeflow_channelling[i]['heal']
    firstHit[firstHit.length - 1]['healeff'] = firstHit[firstHit.length - 1]['healeff'] + ' / ' + timeflow_channelling[i]['healeff']
    firstHit[firstHit.length - 1]['targetName'] = firstHit[firstHit.length - 1]['targetName'] + '<br>' + timeflow_channelling[i]['targetName']
  }else{
    firstHit.push(timeflow_channelling[i])
    firstHit[firstHit.length - 1]['hits'] = 1
  }
}
const xPosition = (time) => {
  return (time - resObj['replay']['startTime']) / 1000 * 40 + 'px'
}

const popUpShow = ref(false)
const popUpPos = ref([0,0])
const popUpDetails = ref()
const popUp = ref(null)

const enterImg = ($event,item) => {
  popUpDetails.value = item
  popUpShow.value = true
  nextTick(()=>{
    let leftBias
    if ($event.target.offsetLeft < popUp.value.offsetWidth / 2){
      leftBias = $event.target.offsetLeft
    }
    else if ($event.target.offsetLeft > timeFlowWidth - popUp.value.offsetWidth / 2){
      leftBias = $event.target.offsetLeft - (popUp.value.offsetWidth - GCD / 1000 * 40)
    }
    else {
      leftBias = Math.floor($event.target.offsetLeft  - (popUp.value.offsetWidth - GCD / 1000 * 40) / 2)
    }
    if($event.target.offsetTop >= 203){
      popUpPos.value = [leftBias, $event.target.offsetTop - popUp.value.offsetHeight - 10]
    }else{
      popUpPos.value = [leftBias, $event.target.offsetTop + GCD / 1000 * 40 + 10]
    }
  })
}

const leaveImg = ($event,item) => {
  popUpShow.value = false
}
const scrollBar = ref(null)
const handleScroll = (e) => {
  const wheelDelta = e.wheelDelta || -e.deltaY * 40
  const scrollbar = scrollBar.value
  scrollbar.setScrollLeft(scrollbar.wrap$.scrollLeft - wheelDelta)
}
// let chart_xAxis = []
// for (let i = 0; i < resObj['replay']['heat']['timeline'].length; i++){
//   chart_xAxis.push(0.5 * i + 's')
// }
// const coverage_chart_option = {
//   xAxis:{
//     type:'category',
//     data:chart_xAxis,
//     boundaryGap: false,
//   },
//   yAxis:{
//     max:100,
//     min:0,
//     splitLine:{
//       lineStyle:{
//         color:'rgba(85,85,85,0.5)'
//       }
//     }
//   },
//   tooltip:{
//     trigger:'axis',
//     confine:true,
//     valueFormatter: (value) => value + '%'
//   },
//   series:[{
//     type: 'line',
//     data:resObj['replay']['heat']['timeline'],
//     symbol: 'none',
//     areaStyle: {}
//   }],
//   grid:{
//     top:'0px',
//     bottom:'0px',
//     left:'0px',
//     right:'0px'
//   }
// }
// let songChange = []
// songChange.push({
//   'skillname':'梅花三弄·切换',
//   'start':resObj['replay']['startTime']
// })
// for (let item of resObj['replay']['special']){
//   if(item['skillname'] === '高山流水·切换' || item['skillname'] === '阳春白雪·切换' || item['skillname'] === '梅花三弄·切换'){
//     songChange.push(item)
//   }
// }
// for (let i = 0; i < songChange.length; i++){
//   if (i < songChange.length - 1){
//     songChange[i]['lasts'] = songChange[i + 1]['start'] - songChange[i]['start']
//   }else{
//     songChange[i]['lasts'] = resObj['replay']['finalTime'] - songChange[i]['start']
//   }
// }
</script>

<style scoped>
.reviewTitle{
  font-size: 16px;
  margin-left: 10px;
}
.reviewDetails{
  margin-left: 20px;
}
.skill_statistic_icon{
  height: 60px;
  width: 60px;
}
.infoBox{
  margin-bottom: 20px;
  width: 1400px;
}
.reviewBox{
  width: 1400px;
  border: 1px solid #555;
  margin-bottom: 20px ;
}
.statisticBox{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 1400px;
  background-color: #141414;
  border: 1px solid #555;
  margin-bottom: 20px;
}
.infoBox_inner{
  width: 518px;
  border: 1px solid #555;
  background-color: #141414;
}
/*.timeFlow{*/
/*  display: flex;*/
/*  position: relative;*/
/*  flex-direction: column;*/
/*  height: 350px;*/
/*  width: v-bind("timeFlowWidth + 'px'");*/
/*}*/
/*.coverage_chart{*/
/*  width: v-bind("timeFlowWidth + 'px'")*/
/*}*/
/*.label{*/
/*  background-color: #201020;*/
/*  height: v-bind("Math.floor(GCD / 1000 * 40)+'px'");*/
/*  border-bottom: 1px solid #555;*/
/*  padding-left: 10px;*/
/*  line-height: v-bind("Math.floor(GCD / 1000 * 40)+'px'");*/
/*}*/
/*.GCD{*/
/*  display: flex;*/
/*  flex-direction: row;*/
/*  border-bottom: 1px solid #555;*/
/*  height: v-bind("Math.floor(GCD / 1000 * 40)+'px'");*/
/*}*/
/*.songStatus{*/
/*  display: flex;*/
/*  flex-direction: row;*/
/*  height: v-bind("Math.floor(GCD / 1000 * 40)+'px'");*/
/*  border-bottom: 1px solid #555;*/
/*}*/
/*.bossPhase{*/
/*  display: flex;*/
/*  flex-direction: row;*/
/*  height: v-bind("Math.floor(GCD / 1000 * 40)+'px'");*/
/*  border-bottom: 1px solid #555;*/
/*}*/
/*.timeScale{*/
/*  display: flex;*/
/*  flex-direction: row;*/
/*  height: v-bind("Math.floor(350 - 56 - 5 * GCD / 1000 * 40)+'px'");*/
/*}*/
/*.noGCD{*/
/*  display: flex;*/
/*  flex-direction: row;*/
/*  height: v-bind("Math.floor(GCD / 1000 * 40) + 'px'");*/
/*  border-bottom: 1px solid #555;*/
/*}*/
.bossPhase_icon{
  position: absolute;
  top:245px;
}
.flower_icon{
  position: absolute;
  top:197px
}
.noGCD_skill_icon{
  position: absolute;
  top:149px;
}
.GCD_skill_icon{
  position: absolute;
  top:101px;
}
.popUp{
  position: absolute;
  border: 1px solid rgba(85,85,85,0.5);
  border-radius: 12px;
  /*top: v-bind("popUpPos[1] + 'px'");*/
  /*left: v-bind("popUpPos[0] + 'px'");*/
  background-color: #201020;
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
</style>