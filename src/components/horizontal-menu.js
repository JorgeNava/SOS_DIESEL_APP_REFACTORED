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
				link: "/dashboard/products",
				adminRequired: false
			},
			{
				id: 3,
				label: "menuitems.catalog.list.productdetail",
				link: "/dashboard/product-detail",
				adminRequired: false
			},
		],
	},
	{
		id: 2,
		label: "menuitems.users.text",
		icon: "ri-user-line",
		link: "/dashboard/users",
		adminRequired: true
	},
];
