export const menuItems = [
	{
		id: 1,
		label: "menuitems.catalog.text",
		icon: "ri-store-2-line",
		adminRequired: false,
		subItems: [
			{
				id: 2,
				label: "menuitems.catalog.list.products",
				link: "/panel-de-administracion/productos",
				adminRequired: false
			},
			{
				id: 3,
				label: "menuitems.catalog.list.productdetail",
				link: "/panel-de-administracion/detalles-del-producto",
				adminRequired: false
			},
		],
	},
	{
		id: 2,
		label: "menuitems.users.text",
		icon: "ri-user-line",
		link: "/panel-de-administracion/usuarios",
		adminRequired: true
	},
];
