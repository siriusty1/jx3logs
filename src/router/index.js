import {createRouter,createWebHashHistory} from 'vue-router';
const Index = () => import('../pages/Index.vue')
const Character = () => import('../pages/Character.vue')
const LingSu = () => import('../pages/LingSu.vue')
const XiangZhi = () => import('../pages/XiangZhi.vue')
const LiJingYiDao = () => import('../pages/LiJingYiDao.vue')
const Test = () => import('../pages/Test.vue')

const router = createRouter({
    history: createWebHashHistory(),
    routes:[
        {
            path: "/",
            component: Index
        },
        {
            path: "/test",
            component: Test
        },
        {
            path:"/character",
            component: Character
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