<template>
  <div class="reviewBox">
    <div style="height:49px;line-height:49px; margin-left: 15px;font-size: 20px; font-weight: bold">建议</div>
    <el-collapse>
      <el-collapse-item v-for="(item,index) in reviewRes" :name="index">
        <template #title>
          <div style="width:100%; display: flex;align-items: center;justify-content: space-between">
            <div style="display: flex;align-items: center">
              <el-icon v-if="item['status'] === 3" :size="18" style="margin-left: 10px; color: rgb(219, 40, 40)"><CircleCloseFilled /></el-icon>
              <el-icon v-if="item['status'] === 2" :size="18" style="margin-left: 10px; color: rgb(242, 113, 28)"><CirclePlusFilled /></el-icon>
              <el-icon v-if="item['status'] === 1" :size="18" style="margin-left: 10px; color: rgb(235, 199, 0)"><CirclePlusFilled /></el-icon>
              <el-icon v-if="item['status'] === 0" :size="18" style="margin-left: 10px; color: rgb(33, 186, 69)"><CircleCheckFilled /></el-icon>
              <div class="reviewTitle">{{ item.title }}</div>
            </div>
            <div style="width: 200px;margin-right: 20px">
              <el-progress :text-inside="true" :stroke-width="16" :percentage="(item.rate * 100).toFixed(2)" :color="rateColor(item.status)"/>
            </div>
          </div>
        </template>
        <div class="reviewDetails" v-html="item.desc"></div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>
import {ref,computed,toRaw} from 'vue'
import lodash from 'lodash'

const reviewObj = ref()
const props = defineProps(['review'])
reviewObj.value = props.review

const rateColor = (status) =>{
  if (status === 0){
    return 'rgb(33, 186, 69)'
  }
  else if (status === 1){
    return 'rgb(235, 199, 0)'
  }
  else if (status === 2){
    return 'rgb(242, 113, 28)'
  }
  else if (status === 3){
    return 'rgb(219, 40, 40)'
  }
}

const reviewRes = computed(()=>{
  let res = []
  for (let item of toRaw(reviewObj.value)){
    let resItem = lodash.cloneDeep(item)
    switch (item['code']){
      case 1:
        resItem['title'] = '不要死'
        resItem['desc'] = `所有的重伤都可以避免，请尝试躲避技能，正确处理机制。重伤会产生非常大的影响，不仅会极大程度降低你的团队贡献，而且增加了战斗失败的可能。<br>本场战斗你重伤了${resItem.num}次，期间浪费了${resItem.duration}秒的时间。`
        res.push(resItem)
        break;
      case 10:
        resItem['title'] = '不要放生队友'
        let deadList = ''
        for (let i = 0; i < item['time'].length; i++){
          let str = `${item['time']}：${item['id']}（${item['damage']}）<br>`
          deadList += str
            }
        resItem['desc'] = `如果你的队友没有受到不可挽救的伤害，你就应当对其进行治疗以避免重伤。请记住，治疗职业的第一优先级永远是保证团队成员的存活，不要为了刷治疗量放弃队友。有时拯救队友需要快速的反应或者预判，这取决于你对副本的理解。<br>本场战斗你放生了${resItem.num}次队友。<br>${deadList}`
        res.push(resItem)
        break;
      case 11:
        resItem['title'] = '保持GCD不要空转'
        resItem['desc'] = `保持使用技能是战斗的基础。只要你持续处于读条或者转GCD的状态，就一定比站在原地发呆好。记得为可能产生的移动做好准备，在移动时也可以使用瞬发技能。<br>本场战斗你的战斗效率为${(100 * resItem.cover).toFixed(2)}%，超过了${resItem.rank}%的玩家。`
        res.push(resItem)
        break;
      case 12:
        resItem['title'] = '提高HPS或者虚条HPS'
        resItem['desc'] = `HPS仍然是副本中评价治疗职业的公认标准，保证充足的HPS可以为团队提供更高的容错。在副本环境中，很多时候你需要用溢出治疗来保证血量健康，因此虚条HPS也可以是指标的一部分。<br>本场战斗你的HPS为${resItem.hps}，超过了${resItem.hpsRank}%的玩家；虚条HPS为${resItem.ohps}，超过了${resItem.ohpsRank}%的玩家。`
        res.push(resItem)
        break;
      case 13:
        let str = ''
        for (let i = 0; i < resItem['skill'].length; i++){
          str += resItem['skill'][i] + '：' + resItem['num'][i] + ' / ' + resItem['sum'][i] + '<br>'
        }
        resItem['title'] = '使用有CD的技能'
        resItem['desc'] = `有CD的技能大多都是十分强力的。虽然说有时这些技能应当用来救急，但是如果战斗中它们空转了过长的时间，你就应该去重新安排它们。<br>本场战斗你的技能使用情况：<br>${str}`
        res.push(resItem)
        break;
      case 90:
        resItem['title'] = '敬请期待'
        resItem['desc'] = `这个心法的功能还没有完全实现，敬请期待！`
        res.push(resItem)
        break;
      case 101:
        resItem['title'] = '不要玩血歌'
        resItem['desc'] = `只要不是全程持续伤害类型的副本，血歌的作用就永远比盾歌低。"梅花三弄"附带的化解和减伤同样可以减少团队血量的压力，并且还能带来输出增益，"团血崩了"绝不是你切血歌的理由。`
        res.push(resItem)
        break;
      case 102:
        resItem['title'] = '保证"梅花三弄"的覆盖率'
        resItem['desc'] = `"梅花三弄"的覆盖率是奶歌最重要的指标，保证覆盖率可以增加团队输出，同时也为团队血量提供保障。多数时候，即使面对血量不满的目标也应当贴盾，让其它治疗来奶满。<br>本场战斗你的"梅花三弄"覆盖率为${(100 * resItem.cover).toFixed(2)}%，超过了${resItem.rank}%的玩家。`
        res.push(resItem)
        break;
      case 103:
        resItem['title'] = '中断"徵"的倒读条'
        resItem['desc'] = `"徵"应当在读条过半时中断（带有"争簇"时为第3跳，无"争簇"时为第2跳），这样可以最大化利"弄梅"。特别是当点出“谪仙“时，不中断会导致损失徵的跳数。<br>本场战斗你总共运功了${resItem.time}次徵，正确中断了${resItem.perfectTime}次，其中${resItem.fullTime}次完全没有进行中断。`
        res.push(resItem)
        break;
      case 104:
        resItem['title'] = '选择合适的"徵"目标'
        resItem['desc'] = `"徵"会以当前目标中心进行20尺扩散，因此选择正确的目标可以让更多队友受到治疗效果。使用茗伊团队面板的扩散辅助可以精准地找到最适合的目标。<br>本场战斗你总共施放了${resItem.time}跳徵，其中${resItem.coverTime}跳覆盖了4个或更多的目标。`
        res.push(resItem)
        break;
      case 105:
        resItem['title'] = '使用"移形换影"'
        resItem['desc'] = `记得使用"移形换影"去回收影子以维持健康的内力，从而弥补贴盾的大量消耗。<br>本场战斗你浪费了${resItem.wasteTime}次影子提供的回蓝。`
        res.push(resItem)
        break;
      case 106:
        resItem['title'] = '使用"角"'
        resItem['desc'] = `记得保持"角"的覆盖以维持健康的内力，从而弥补贴盾的大量消耗。"角"的持续治疗效果对主T的血量也是可观的支持。`
        res.push(resItem)
        break;
      case 201:
        resItem['title'] = '保证"秋肃"的覆盖率'
        resItem['desc'] = `"秋肃"会为团队带来可观的输出增益，是奶花在副本中最有价值的门票。尝试通过各种监控方式去适应秋肃的手感，绝对不要让增益中断。<br>本场战斗你的"秋肃"覆盖率为${(100 * resItem.cover).toFixed(2)}%，超过了${resItem.rank}%的玩家。`
        res.push(resItem)
        break;
      case 202:
        resItem['title'] = '保证"握针"的覆盖率'
        resItem['desc'] = `"握针"是奶花最重要的治疗量来源，尽可能使全团保持这个效果。"握针"的数量也是评判奶花手法最重要的依据。<br>本场战斗你的"握针"覆盖率为${(100 * resItem.cover).toFixed(2)}%，超过了${resItem.rank}%的玩家。`
        res.push(resItem)
        break;
      case 203:
        resItem['title'] = '不要浪费瞬发次数'
        resItem['desc'] = `""行气血"与"水月无间"提供的瞬发效果可以让你无损瞬发技能，但是如果时间用尽或者被新的"行气血"顶掉就会失去这些机会。尽可能利用好这些瞬发次数。<br>本场战斗你获得了${resItem.timeShuiyue}层水月，${resItem.timeXqx}层行气血，你使用了其中的${resItem.timeCast}次。`
        res.push(resItem)
        break;
      case 204:
        resItem['title'] = '优先瞬发"长针"'
        resItem['desc'] = `尽可能使用瞬发效果去瞬发"长针"，这可以为你节省一个GCD的时间；瞬发"提针"与"彼针"不能为你节省GCD时间，除非这一个GCD可以用来救急，否则不应该这样瞬发。<br>本场战斗你使用了${resItem.timeCast}次瞬发，其中${resItem.timeChangzhen}次用于"长针"。`
        res.push(resItem)
        break;
      case 205:
        resItem['title'] = '选择合适的"长针"目标'
        resItem['desc'] = `"微潮"会以当前目标中心进行15尺扩散，因此选择正确的目标可以让更多队友受到"握针"的效果。使用茗伊团队面板的扩散辅助可以精准地找到最适合的目标。<br>你总共触发了${resItem.time}次"微潮"，其中${resItem.coverTime}次覆盖了4个或更多的目标。`
        res.push(resItem)
        break;
      case 301:
        resItem['title'] = '保证"灵素中和"的触发次数'
        resItem['desc'] = `"灵素中和"是药奶的主要治疗来源，也是简单有效地衡量药奶手法的手段。由于其自动选取血量最低的队友的特点，只要保证中和的触发次数，就一定可以有稳定的治疗量。<br>本场战斗你的每秒中和次数为${resItem.numPerSec}，超过了${resItem.rank}%的玩家。`
        res.push(resItem)
        break;
      case 302:
        resItem['title'] = '避免药性溢出'
        resItem['desc'] = `药奶的中和机制需要药性在温性与寒性之间互相抵消，而药性超过+5或-5的部分不会被累加，你需要调整技能的施放方式以尽量避免这种情况。有时药性溢出是不可避免的，但这个比例过高则意味着一定出现了问题。<br>本场战斗由于药性溢出，你浪费了${resItem.numOver}点药性。`
        res.push(resItem)
        break;
      case 303:
        resItem['title'] = '提高"飘黄"的覆盖人数'
        resItem['desc'] = `"飘黄"是药奶最有价值的增益技能，但是只对10尺内的玩家生效。你需要调整站位以使其覆盖更多的队友，有时还需要根据副本机制来决定合适的施放时机。<br>本场战斗你的"飘黄"平均覆盖人数为${resItem.numCover.toFixed(2)}，而总人数为${resItem.numAll}。`
        res.push(resItem)
        break;
      case 304:
        resItem['title'] = '注意控制"七情"状态'
        resItem['desc'] = `"七情和合"是优秀的爆发技能，但多次叠加"七情"会使自身叠加显著的治疗降低效果，因此需要尝试在合适的时机消除"七情"。<br>本场战斗你将"七情"debuff最高叠加到了${resItem.maxLayer}层。`
        res.push(resItem)
        break;
      case 305:
        resItem['title'] = '充分使用"千枝绽蕊"'
        resItem['desc'] = `"畅和"奇穴下，"千枝绽蕊"期间只有"灵素中和"能受到增益，但无论有没有触发中和都会消耗内力，所以尽量在此期间触发更多的中和数量。使用快速开关切换可以大幅度提高效率。<br>本场战斗你在千枝绽蕊期间的${resItem.time.toFixed(2)}秒中，共触发了${resItem.num}次中和，效率为${resItem.efficiency}。`
        res.push(resItem)
        break;
      case 401:
        resItem['title'] = '保证"冰蚕牵丝"或"醉舞九天"的触发次数'
        resItem['desc'] = `"根据流派不同，"冰蚕牵丝"或"醉舞九天"之一是你的主要填充技能，你需要保证其触发次数从而提供稳定的治疗。<br>本场战斗你的"冰蚕牵丝"的每秒次数为${resItem.bcNum}，超过了${resItem.bcRank}%的玩家；"醉舞九天"的每秒次数为${resItem.zwNum}，超过了${resItem.zwRank}%的玩家。`
        res.push(resItem)
        break;
      case 402:
        resItem['title'] = '使用"蛊惑众生"'
        resItem['desc'] = `""蛊惑众生"是非常强力的单体保人技能，不要因为游戏内插件不统计就忘记施放了。<br>本场战斗你的"蛊惑众生"的覆盖率为${(100 * resItem.cover).toFixed(2)}%。`
        res.push(resItem)
        break;
      case 403:
        resItem['title'] = '保证回蓝技能的使用次数'
        resItem['desc'] = `"迷仙引梦"和"仙王蛊鼎"是相当强力的回蓝技能，并且在治疗层面也拥有超乎想象的性价比。作为奶毒，应当尽可能关注这两个技能的cd情况。`
        res.push(resItem)
        break;
      case 404:
        resItem['title'] = '不要回收"迷仙引梦"'
        resItem['desc'] = `"迷仙引梦"的主要作用应当是回蓝，回收会导致损失回蓝的跳数，并且治疗量也得不偿失，不应当为了抢治疗进行回收。<br>本场战斗你回收了${resItem.timeCast}次"迷仙引梦"。`
        res.push(resItem)
        break;
      case 405:
        resItem['title'] = '使用"蚕引"层数'
        resItem['desc'] = `"蚕引"效果附赠了具有治疗增益的"冰蚕诀"，记得在30秒之内把它们全部用掉。<br>本场战斗你获得了${resItem.sumAll}层蚕引，你使用了其中的${resItem.timeCast}次。`
        res.push(resItem)
        break;
      case 406:
        resItem['title'] = '保留"碧蝶献祭"的会心增益到"蝶池"'
        resItem['desc'] = `"碧蝶献祭"会获得一个必会心的buff，它会被治疗技能消耗掉，所以应当在1秒之内避免使用其它治疗技能从而让"蝶池"吃到这个增益。<br>本场战斗你使用了${resItem.sumAll}次"蛊虫献祭"，其中${resItem.rightTime}次正确处理了必会心的buff。`
        res.push(resItem)
        break;
      case 501:
        resItem['title'] = '保证"回雪飘摇"的触发次数'
        resItem['desc'] = `"回雪飘摇"是奶秀的填充技能，也是最主要的治疗来源，保持回雪飘摇的不间断施放是奶秀最基本的手法，在充分练习之后可以得到非常稳定的治疗量。<br>本场战斗你的"回雪飘摇"每秒次数为${resItem.numPerSec}，超过了${resItem.rank}%的玩家。`
        res.push(resItem)
        break;
      case 502:
        resItem['title'] = '保证"上元点鬟"的覆盖率'
        resItem['desc'] = `"上元点鬟"是奶秀的进阶手法，但现在几乎也是必须掌握的操作了。在"翔舞"基本稳定覆盖大多数队友之后，"上元点鬟"就是拉开手法差距的最重要一环。<br>本场战斗你的上元覆盖率为${resItem.cover}，超过了${resItem.rank}%的玩家。`
        res.push(resItem)
        break;
      case 503:
        resItem['title'] = '"中断"回雪飘摇"的倒读条'
        resItem['desc'] = `你需要在"回雪飘摇"第二跳之后直接使用GCD技能，而不是等倒读条结束，这样每6跳回雪飘摇中你就多了一个施展GCD技能的机会；另外，也不要过早中断，这样会直接导致回雪跳数损失。<br>本场战斗你总共施放了${resItem.time}次"回雪飘摇"，其中正确中断了${resItem.perfectTime}次，有${resItem.earlyTime}次因过早中断而损失了跳数。`
        res.push(resItem)
        break;
      case 504:
        resItem['title'] = '不要重复施放"上元点鬟"'
        resItem['desc'] = `不要对已经有"上元点鬟"的目标再次施放"上元点鬟"，这样会使其末跳被覆盖。如果是极限的单加情况为了触发首跳，你也应当使用"翔鸾舞柳"来代替。<br>本场战斗你有${resItem.wrongTime}次"上元点鬟"重复施放，导致损失了末跳。`
        res.push(resItem)
        break;
    }
  }
  return res
})

</script>

<style scoped>
.reviewBox{
  width: 1400px;
  border: 1px solid #555;
  margin-bottom: 20px ;
}
.reviewTitle{
  font-size: 16px;
  margin-left: 10px;
}
.reviewDetails{
  margin-left: 20px;
  white-space: pre-wrap;
}
</style>