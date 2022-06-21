import {createRouter,createWebHashHistory} from 'vue-router';
const Index = () => import('../pages/Index.vue')
const Character = () => import('../pages/Character.vue')
const Test = () => import('../pages/Test.vue')

const router = createRouter({
    history: createWebHashHistory(),
    routes:[
        {
            path: "/",
            component: Index
        },
        {
            path:"/character",
            component: Character
        },
        {
            path:"/test",
            component: Test
        }
    ]
});


export default router;