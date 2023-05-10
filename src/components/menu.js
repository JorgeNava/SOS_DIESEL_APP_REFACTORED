export const menuItems = [
	{
		id: 1,
		label: "menuitems.catalog.text",
		icon: "ri-store-2-line",
		subItems: [
			{
				id: 2,
				label: "menuitems.catalog.list.products",
				link: "/dashboard/products",
			},
			{
				id: 3,
				label: "menuitems.catalog.list.productdetail",
				link: "/dashboard/product-detail",
			},
		],
	},
	{
		id: 2,
		label: "menuitems.users.text",
		icon: "ri-user-line",
		link: "/dashboard/users",
	},
];
