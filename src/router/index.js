import {createRouter,createWebHistory} from 'vue-router';
const Index = () => import('../pages/Index.vue')
const Character = () => import('../pages/Character.vue')
const Ranking = () => import('../pages/Ranking.vue')
const LingSu = () => import('../pages/LingSu.vue')
const YunChangXinJing = () => import('../pages/YunChangXinJing.vue')
const XiangZhi = () => import('../pages/XiangZhi.vue')
const LiJingYiDao = () => import('../pages/LiJingYiDao.vue')
const BuTianJue = () => import('../pages/BuTianJue.vue')
const showEquip = () => import('../components/ShowEquip.vue')

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path: "/",
            component: Index
        },
        {
            path: "/se",
            component: showEquip
        },
        {
            path:"/character/:server/:name",
            component: Character
        },
        {
            path:"/ranking/",
            component: Ranking
        },
        {
            path:"/lingsu/:replay_id",
            component: LingSu
        },
        {
            path:"/xiangzhi/:replay_id",
            component: XiangZhi
        },
        {
            path:"/lijingyidao/:replay_id",
            component: LiJingYiDao
        },
        {
            path:"/yunchangxinjing/:replay_id",
            component: YunChangXinJing
        },
        {
            path:"/butianjue/:replay_id",
            component: BuTianJue
        }
    ]
});

export default router;