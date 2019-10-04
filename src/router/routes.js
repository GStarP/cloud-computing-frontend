export default [
  {
    path: '*',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '/',
        redirect: '/home/menu'
      },
      {
        path: 'menu',
        component: () => import('../components/Menu.vue')
      },
      {
        path: 'streaming',
        component: () => import('../components/Streaming.vue')
      },
      {
        path: 'graph-x',
        component: () => import('../components/GraphX.vue')
      },
      {
        path: 'machine-learning',
        component: () => import('../components/MachineLearning.vue')
      }
    ]
  }
];
