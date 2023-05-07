export const menuItems = [
    {
        id: 1,
        label: 'menuitems.dashboard.text',
        icon: 'ri-dashboard-line',
        link: '/'
    },
    {
        id: 22,
        label: 'menuitems.apps.text',
        icon: 'ri-apps-2-line',
        subItems: [
            {
                id: 28,
                label: 'menuitems.ecommerce.text',
                subItems: [
                    {
                        id: 29,
                        label: 'menuitems.ecommerce.list.products',
                        link: '/ecommerce/products'
                    },
                    {
                        id: 30,
                        label: 'menuitems.ecommerce.list.productdetail',
                        link: '/ecommerce/product-detail'
                    },
                ]
            },
        ]
    },
]