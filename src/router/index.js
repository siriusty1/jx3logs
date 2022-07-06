import {createRouter,createWebHistory} from 'vue-router';
const Index = () => import('../pages/Index.vue')
const Character = () => import('../pages/Character.vue')
const Ranking = () => import('../pages/Ranking.vue')
const LingSu = () => import('../pages/LingSu.vue')
const XiangZhi = () => import('../pages/XiangZhi.vue')
const LiJingYiDao = () => import('../pages/LiJingYiDao.vue')

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path: "/",
            component: Index
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
            path:"/lingsu",
            component: LingSu
        },
        {
            path:"/xiangzhi/:replay_id",
            component: XiangZhi
        },
        {
            path:"/lijingyidao",
            component: LiJingYiDao
        }
    ]
});

export default router;