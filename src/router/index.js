import { createRouter, createWebHistory } from "vue-router";
import NotesView from "../views/NotesView.vue";
import EditView from "../views/EditView.vue";
import NotFoundView from "../views/NotFoundView.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: NotesView,
        meta: { title: "Заметки" },
    },
    {
        path: "/note/add",
        name: "noteAdd",
        component: EditView,
        meta: { title: "Новая заметка" },
    },
    {
        path: "/note/:id",
        name: "note",
        component: EditView,
        props: true,
        meta: { title: "Редактировать" },
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notFound",
        component: NotFoundView,
        meta: { title: "Ошибочка!" },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
});

export default router;
