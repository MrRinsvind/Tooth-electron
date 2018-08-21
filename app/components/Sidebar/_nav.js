export default {
  items: [
    {
      name: 'Главная',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      title: true,
      name: 'Theme',
      wrapper: {
        element: '',
        attributes: {},
      },
      class: '',
    },
    {
      name: 'Клиенты',
      url: '/clients',
      icon: 'icon-people',
    },
    {
      name: 'Прайслист',
      url: '/price',
      icon: 'icon-people',
    },
    {
      name: 'Charts',
      url: '/charts',
      icon: 'icon-pie-chart'
    },
  ]
};
