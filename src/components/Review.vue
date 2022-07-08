<template>
  <div class="reviewBox">
    <div style="height:49px;line-height:49px; margin-left: 15px;font-size: 20px; font-weight: bold">建议</div>
    <el-collapse>
      <el-collapse-item v-for="(item,index) in reviewRes" :name="index">
        <template #title>
          <el-icon v-if="item['status'] === 3" :size="18" style="margin-left: 10px; color: rgb(219, 40, 40)"><CircleCloseFilled /></el-icon>
          <el-icon v-if="item['status'] === 2" :size="18" style="margin-left: 10px; color: rgb(242, 113, 28)"><CirclePlusFilled /></el-icon>
          <el-icon v-if="item['status'] === 1" :size="18" style="margin-left: 10px; color: rgb(235, 199, 0)"><CirclePlusFilled /></el-icon>
          <el-icon v-if="item['status'] === 0" :size="18" style="margin-left: 10px; color: rgb(33, 186, 69)"><CircleCheckFilled /></el-icon>
          <div class="reviewTitle">{{ item.title }}</div>
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
        resItem['desc'] = `如果你的队友没有受到不可挽救的伤害，你就应当对其进行治疗以避免重伤。请记住，治疗职业的第一优先级永远是保证团队成员的存活，不要为了刷治疗量放弃队友。有时拯救队友需要快速的反应或者预判，这取决于你对副本的理解。<br>本场战斗你放生了${resItem.num}次队友。`
        res.push(resItem)
        break;
      case 11:
        resItem['title'] = '保持GCD不要空转'
        resItem['desc'] = `保持使用技能是战斗的基础。只要你持续处于读条或者转GCD的状态，就一定比站在原地发呆好。记得为可能产生的移动做好准备，在移动时也可以使用瞬发技能。<br>本场战斗你的战斗效率为${(100 * resItem.cover).toFixed(2)}%，超过了${resItem.rank}%的玩家。`
        res.push(resItem)
        break;
      case 12:
        resItem['title'] = '提高HPS或者虚条HPS'
        resItem['desc'] = `HPS仍然是副本中评价治疗职业的公认标准，保证充足的HPS可以为团队提供更高的容错。在副本环境中，很多时候你需要用溢出治疗来保证血量健康，因此虚条HPS也可以是指标的一部分。<br>你的HPS为${resItem.hps}，超过了${resItem.hpsRank}%的玩家；虚条HPS为${resItem.ohps}，超过了${resItem.ohpsRank}%的玩家。`
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
        resItem['desc'] = `"徵"应当在读条过半时中断（带有"争簇"时为第3跳，无"争簇"时为第2跳），这样可以最大化利"弄梅"。特别是当点出“谪仙“时，不中断会导致损失徵的跳数。<br>本场战斗你总共运功了${resItem.time}次徵，但只正确中断了${resItem.perfectTime}次，其中有${resItem.fullTime}次完全没有进行中断。`
        res.push(resItem)
        break;
      case 104:
        resItem['title'] = '选择合适的"徵"目标'
        resItem['desc'] = `"徵"会以当前目标中心进行20尺扩散，因此选择正确的目标可以让更多队友受到治疗效果。使用茗伊团队面板的扩散辅助可以精准地找到最适合的目标。<br>本场战斗你总共施放了${resItem.time}跳徵，但只有${resItem.coverTime}跳覆盖了4个或更多的目标。`
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
        resItem['title'] = '敬请期待'
        resItem['desc'] = `这个心法的功能还没有完全实现，敬请期待！`
        res.push(resItem)
        break;
      case 202:
        resItem['title'] = '敬请期待'
        resItem['desc'] = `这个心法的功能还没有完全实现，敬请期待！`
        res.push(resItem)
        break;
      case 203:
        resItem['title'] = '敬请期待'
        resItem['desc'] = `这个心法的功能还没有完全实现，敬请期待！`
        res.push(resItem)
        break;
      case 204:
        resItem['title'] = '敬请期待'
        resItem['desc'] = `这个心法的功能还没有完全实现，敬请期待！`
        res.push(resItem)
        break;
      case 205:
        resItem['title'] = '敬请期待'
        resItem['desc'] = `这个心法的功能还没有完全实现，敬请期待！`
        res.push(resItem)
        break;
      case 206:
        resItem['title'] = '敬请期待'
        resItem['desc'] = `这个心法的功能还没有完全实现，敬请期待！`
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