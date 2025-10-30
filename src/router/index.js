import { createWebHashHistory, createRouter } from "vue-router";

import { routes as userRoutes } from './user.js'
import { routes as adminRoutes } from './admin.js'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [...userRoutes, ...adminRoutes],
});

export default router;
