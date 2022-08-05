<template>
  <el-card style="margin-left: 20px;margin-right: 20px">
    <h2>0 前言</h2>
    <el-divider></el-divider>
    <el-space wrap direction="vertical" alignment="left" size="default">
      <div>众所周知，HPS不是评价剑三治疗手法的唯一标准，但是由于游戏内置了统计插件，所以多数时候还是会拿HPS说事。</div>
      <div>然而这个HPS统计有许多缺陷，这些缺陷组合起来不仅对评价方式有影响，更重要的是它们提供了一个错误的基准，而各种技改都是在这个基准上进行的，这会对职业的实际强度造成错误的预估。</div>
      <div>由于有JCL的存在，使用额外手段分析战斗记录成为了一种可行的方案。</div>
    </el-space>

    <h2 class="title">1 新的HPS指标</h2>
    <el-divider></el-divider>
    <h3 class="sub_title">1.1 HPS, oHPS</h3>
    <el-space wrap direction="vertical" alignment="left" size="default">
      <div>HPS代表游戏中统计的有效HPS。oHPS全称为over HPS，代表包含过量的治疗。</div>
      <div>注意，oHPS是包含HPS的。我们说的“过量治疗”一般指oHPS - HPS。</div>
      <div>为什么oHPS有意义？</div>
      <div>1.在不同MMORPG中治疗的定位有所不同，而截止当前版本（110级），剑三的治疗拥有充足的资源，不用担心缺蓝的问题；同时，治疗职业在绝大多数副本中只有加血一个任务。因此，提高oHPS并不需要付出很多代价；</div>
      <div>2.在伤害随机的场合，无法对需要的治疗做出预判，此时HPS可能仅仅因为先后顺序不同就变为有效或无效，而这本应是没有意义的。而剑三中，随机点名、招架闪避、意外吃机制等导致随机的情形数不胜数，因此oHPS一样代表了避免重伤的工作量；</div>
      <div>3.许多治疗为了维持循环必须产生oHPS（例如奶花的“微潮”，奶秀的“盛夏”）；</div>
      <div>4.当血量奶满时可以触发dps的头大附魔，提高团队伤害；</div>
      <div>5.但是，由于“抢治疗量”可以提高团队在面临随机伤害时的容错，HPS要显著地比oHPS更有意义。这样，我们已知oHPS的价值大于0，又小于HPS，所以我们需要给它赋予一个合适的权值。</div>
    </el-space>

    <h3 class="sub_title">1.2 有价值oHPS</h3>
    <el-space wrap direction="vertical" alignment="left" size="default">
      <div>我们定义“从目标受到伤害开始，到目标受到第一次过量治疗的5秒后，这段时间的oHPS均为有价值oHPS”。不属于此期间的oHPS即为无价值oHPS。</div>
      <div>这是为了解决上述问题中的第2点，也即有价值oHPS可以为随机机制提供容错，而无价值oHPS几乎没有这个作用。5秒在游戏中相当于4个GCD，基本上是一些溢出操作的极限。</div>
      <div>然而我们并不需要向玩家展示哪些是有价值的，因为这件事没有意义，它不能对玩家手法产生正面影响。</div>
    </el-space>

    <h3 class="sub_title">1.3 aHPS</h3>
    <el-space wrap direction="vertical" alignment="left" size="default">
      <div>aHPS指响应式治疗、减伤或化解产生的HPS，全称为absorbed HPS。这是游戏中APS概念的推广。这部分数值不计入HPS或oHPS中。</div>
      <div>对于化解部分，茗伊插件统计中的“APS”事实上不准确，这是因为剑三底层反馈的数据中，只有“化解量是多少”和“目标身上有什么buff”，没有“具体哪些化解量来自什么”，这使得准确的aHPS只能靠推测得到。另外，茗伊并没有统计部分buff。</div>
      <el-collapse style="margin: 20px">
        <el-collapse-item title="你猜猜这里有多少坑" name="1">
          <el-space wrap direction="vertical" alignment="left" size="default">
            <div>1. 绝大部分化解是通过buff作用的，也就是“有这个buff就化解，达到化解量就移除这个buff”；有多个这样的buff时会优先消耗先获得的buff;</div>
            <div>2. [梅花三弄]的buff没有化解效果，而是控制了一个单独的血条，可以视为一个底层机制。它的优先级永远比其它的化解低;</div>
            <div>3. [笙簧]奇穴下的[梅花三弄]会不断刷新，这个刷新有间隔，大概每次会消失0.5秒再出现，在此期间[庄周梦]之类绑定在buff上的增益会无效，但化解是独立血条机制，不会跟着这个刷新，所以不会有间断;</div>
            <div>4. 如果“产生化解效果”和“buff消失”发生在同一个逻辑帧，那么记录中的顺序就可能反过来，而这就是化解盾被击碎的表现，这件事在不同机器上的记录可能不一样。但是，[梅花三弄]是独立血条机制，buff的消失永远比化解产生要慢一点点;</div>
            <div>5. 茗伊的APS统计是按buff计算的，它监控了一些buff是否存在，这是一个人工表，所以有一些非常重要的化解（例如[龙葵自苦]、[盾壁]）找不到来源，这时如果有其它在表里的buff就会记录在这些buff上，不在表里的话就会直接不统计;</div>
            <div>6. 因此，APS会受到上面1~5的影响。例如4会导致“反过来”的化解记录不被统计，3会导致梅花三弄漏掉一部分记录，5会导致很多化解记录被统计在其它地方。</div>
          </el-space>
        </el-collapse-item>
      </el-collapse>
      <div>对于减伤，事实上它和化解是完全相同的作用原理，产生的效果也是相同的。只是受限于插件功能，在游戏里没有办法做详细的推测。而实际上它可以统计到aHPS中。</div>
      <div>响应式治疗最典型的例子是“寒清”，它也有和化解完全相同的作用原理，唯一的区别就是它不能防止超过当前血量的伤害，然而这种情况几乎不可能发生。将这种类型的治疗算作HPS是很不科学的，这个问题同构于“为什么不能直接算HPS + APS”，而具体原因我们稍后说明。</div>
    </el-space>

    <h3 class="sub_title">1.4 未解明HPS</h3>
    <el-space wrap direction="vertical" alignment="left" size="default">
      <div>未解明HPS指类似吸血、蛊惑等，由于游戏底层反馈的原因无法确定是否过量的治疗量。</div>
      <div>我们可以利用前后数据是否过量来推测，当然这件事本身就不一定靠谱。这部分数值会计入HPS或oHPS中。</div>
    </el-space>

    <h3 class="sub_title">1.5 无意义HPS</h3>
    <div>当前版本指“大针”。这个技能造成的HPS会直接从数据中移除。</div>

    <h3 class="sub_title">1.6 rHPS</h3>
    <el-space wrap direction="vertical" alignment="left" size="default">
      <div>rHPS指换算后对团队血量有贡献的治疗量，全称为raid HPS。换算方式为：</div>
      <div>累计全团的HPS与aHPS，将总和记为S1；</div>
      <div>累计全团的有价值oHPS与aHPS，将总和记为S2；</div>
      <div>对于每个玩家，其每个技能的rHPS定义为：(有价值oHPS + aHPS) × S1 / S2。</div>
      <div>首先我们要知道一件事，有价值oHPS与HPS的团队贡献是接近的，而oHPS与aHPS之间就没有了这个“加法”的障碍。这也是rHPS算法的来源。</div>
      <div>而S1/S2这个系数是为了做归一化，保证最后的值与实际的治疗量在同一个衡量标准中，相当于它是一个对HPS的修正。</div>
    </el-space>

    <h2 class="title">2 rHPS的合理性</h2>
    <el-divider></el-divider>
    <h3 class="sub_title">2.1 oHPS窗口</h3>
    <el-space wrap direction="vertical" alignment="left" size="default">
      <div>我们仔细思考有价值oHPS的定义，它实际上回答了一个问题，就是“如果其他人都不奶，会怎么样”。</div>
      <div>如果在目标受到伤害之前就奶了，那么它一定是过量的，不管其他人的操作怎么变化。这部分是“无价值”的。</div>
      <div>如果在目标受到伤害之后，到目标被奶满之前奶，那一定是不过量的，谁来都一样。这部分是“有价值”的。</div>
      <div>如果在被奶满5秒内奶，那么一个很有可能的结果是，虽然我奶过量了，但是如果其他奶妈不奶，这部分就不过量了，而这原本就是一个先来后到的事，换过来也没有区别。这部分也是“有价值”的。</div>
      <div>如果在被奶满5秒之后奶，那这部分要么依然是过量的，要么就无法应对随机的伤害机制。这部分是“无价值”的。</div>
      <div>因此，“受到伤害”是一个很严格的窗口起点，而“5秒后”是一个模糊的终点。虽然说更好的方式是使用衰减来计算，但是算法的复杂性本身会影响结论的严谨程度。</div>
    </el-space>

    <h3 class="sub_title">2.2 aHPS的价值</h3>
    <el-space wrap direction="vertical" alignment="left" size="default">
      <div>我们考虑一些资源紧张的游戏，在这里溢出治疗占比极少。这个时候，实际上aHPS就可以当HPS用。而在rHPS的公式里，这一点也是正确的，它们的结果就是直接相加。</div>
      <div>为什么剑三里不行呢？因为在HPS严重溢出的环境里，aHPS的成本是很低的，它强行占据了队列里第一个位置，导致其顶掉了原本可能成为有效治疗的部分。</div>
      <div>我们考虑一个思考题，在剑三面板中，1WHPS + 4WAPS，和5WHPS，你选哪个？</div>
      <div>实际上这取决于BOSS：</div>
      <div>1.在持续AOE类型的BOSS中，你会很明显地感觉到1WHPS + 4WAPS有更大的压力，为什么呢，因为5WHPS并不是空中楼阁，你为了这5WHPS需要不可避免地产生1-2倍的过量治疗。这样的话，考虑有价值oHPS的算法，两者的贡献对比实际上是几万对十几万的差距；</div>
      <div>2.在随机点名类的BOSS中，很多人本来就是不掉血的，过量治疗没有用，而单体集中伤害可能会导致减员，APS就能有效防止这一点。</div>
      <div>这个时候如果我们使用rHPS算法，就会发现它可以同时处理这两种情况，也就是说可以使用一套算法处理两种情形。</div>
    </el-space>

    <h3 class="sub_title">2.3 综合衡量</h3>
    <el-space wrap direction="vertical" alignment="left" size="default">
      <div>不要把rHPS看成唯一指标。你需要结合HPS，oHPS，aHPS，技能数等数据来综合判定治疗的表现，而这与BOSS类型关系很大。</div>
      <div>如果一个玩家的rHPS比其他人低，而aHPS高，说明他使用了保人打法，这在一些BOSS重要得多，因为不保人是真的会造成减员的；而在另一些BOSS完全没有保人需求，是标准的画蛇添足。</div>
      <div>如果一个玩家的rHPS比其他人低，而HPS高，说明他使用了一些“抢治疗”的手法，这在一些BOSS可以应对间隔远小于5秒的随机AOE，而在另一些BOSS纯属无价值的内卷行为。</div>
      <div>如果一个玩家的rHPS比其他人低，而oHPS高，说明他更偏向保持技能与循环，这在一些BOSS可以通过稳定的治疗来提供容错，而在另一些BOSS会使资源与承伤错位，无法最大化利用自己技能的价值。</div>
      <div>看到这里，你还会认为只看游戏里的HPS统计很靠谱吗？</div>
    </el-space>

    <h2 class="title">3 对五奶的主要影响（待补充）</h2>
    <el-divider></el-divider>
    <h3 class="sub_title">3.1 奶歌</h3>
    <div>
      rHPS算法解决了原本“APS”的贡献量，在不考虑输出增益，仅需要稳血线的情形下，我们可以得出手法之间的价值差异，例如纯贴盾/贴盾+刷徵/寸光阴中的哪一种流派更适合。
    </div>

    <h3 class="sub_title">3.2 奶花</h3>
    <div>
      rHPS算法解决了寒清的价值量问题，在具体的BOSS会使寒清的价值量更加突出。它增加跳数和改善循环毫无疑问是有用的，但如果仅仅是为了优先生效，点出来就是不划算的。
    </div>

    <h3 class="sub_title">3.3 奶毒</h3>
    <div>
      蝶池由于快速反应的机制可以有效抢HPS，但这件事情并不一定是最大收益的行为，rHPS可以指导一个更合理的施放时机。当然，更重要的是蛊惑可以参与计算，这个技能由于不参与面板计算很少有人仔细去想它的收益。
    </div>

    <h3 class="sub_title">3.4 奶秀</h3>
    <div>
      rHPS算法更大程度上会使奶秀在“预判治疗”方面开拓新的思路，例如风袖实际上有强力减伤属性，但很多时候都当大加用掉了。奶秀的治疗构成较为平稳，rHPS可以弥补在“抢治疗”方面的劣势。
    </div>

    <h3 class="sub_title">3.5 药奶</h3>
    <div>
      中和机制使得药奶自带一些有效治疗量的优势，但这件事可能是伪命题，rHPS可以帮你判断这一点是否成立。
    </div>
  </el-card>
</template>

<script setup>

</script>

<style scoped>
.title{
  margin-top: 40px;
}
.sub_title{
  margin-top: 20px;
}
</style>