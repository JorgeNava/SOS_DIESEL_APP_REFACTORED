import store from "@/state/store";
import router from "./index.js";

export default [
	{
		path: "/",
		name: "home",
		meta: {
			authRequired: false,
			adminRequired: false,
		},
		component: () => import("../views/pages/home/home"),
	},
	{
		path: "/productos",
		name: "productos",
		meta: {
			authRequired: false,
			adminRequired: false,
		},
		component: () => import("../views/pages/products/products"),
	},
	{
		path: "/detalles-del-producto",
		name: "product details",
		meta: {
			authRequired: false,
			adminRequired: false,
		},
		component: () => import("../views/pages/product-details/product-details"),
	},
	{
		path: "/panel-de-administracion",
		name: "panel-de-administracion",
		meta: {
			authRequired: true,
			adminRequired: false,
		},
		component: () => import("../views/pages/dashboard/shop/products"),
	},
	{
		path: "/panel-de-administracion/catalogo",
		name: "panel-de-administracion-productos",
		meta: {
			authRequired: true,
			adminRequired: false,
		},
		component: () => import("../views/pages/dashboard/shop/products"),
	},
	{
		path: "/panel-de-administracion/inventario",
		name: "panel-de-administracion-inventario",
		meta: {
			authRequired: true,
			adminRequired: false,
		},
		component: () =>
			import("../views/pages/dashboard/shop/products-management"),
	},
	{
		path: "/panel-de-administracion/usuarios",
		name: "usuarios",
		meta: {
			authRequired: true,
			adminRequired: true,
		},
		component: () => import("../views/pages/dashboard/users/users-management"),
	},
	{
		path: "/panel-de-administracion/perfil",
		name: "panel-de-administracion-perfil",
		meta: {
			authRequired: true,
			adminRequired: false,
		},
		component: () => import("../views/pages/dashboard/users/user-profile"),
	},
	{
		path: "/login",
		name: "login",
		component: () => import("../views/pages/account/login"),
		meta: {
			beforeResolve(routeTo, routeFrom, next) {
				// If the user is already logged in
				if (store.getters["auth/loggedIn"]) {
					// Redirect to the home page instead
					next({ name: "panel-de-administracion-productos" });
				} else {
					// Continue to the login page
					next();
				}
			},
		},
	},
	{
		path: "/logout",
		name: "logout",
		meta: {
			authRequired: true,
			adminRequired: false,
			beforeResolve(routeTo, routeFrom) {
				store.dispatch("auth/logOut");
				const authRequiredOnPreviousRoute = routeFrom.matched.some((route) => {
					return route.meta.authRequired || false;
				});
				router.replace(
					authRequiredOnPreviousRoute ? { name: "login" } : { ...routeFrom }
				);
			},
		},
	},
	{
		path: "/register",
		name: "register",
		component: () => import("../views/pages/account/register"),
		meta: {
			beforeResolve(routeTo, routeFrom, next) {
				// If the user is already logged in
				if (store.getters["auth/loggedIn"]) {
					// Redirect to the home page instead
					next({ name: "panel-de-administracion-productos" });
				} else {
					// Continue to the login page
					next();
				}
			},
		},
	},
	{
		path: "/forgot-password",
		name: "Forgot-password",
		component: () => import("../views/pages/account/forgot-password"),
		meta: {
			beforeResolve(routeTo, routeFrom, next) {
				// If the user is already logged in
				if (store.getters["auth/loggedIn"]) {
					// Redirect to the home page instead
					next({ name: "panel-de-administracion-productos" });
				} else {
					// Continue to the login page
					next();
				}
			},
		},
	},
];
