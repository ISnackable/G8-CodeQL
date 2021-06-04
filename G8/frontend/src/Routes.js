import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/Layout/Layout';
import LayoutDocumentation from '@/components/Layout/LayoutDocumentation';
import Typography from '@/pages/Typography/Typography';
import Tables from '@/pages/Tables/Tables';
import Notifications from '@/pages/Notifications/Notifications';
import Icons from '@/pages/Icons/Icons';
import Maps from '@/pages/Maps/Maps';
import Charts from '@/pages/Charts/Charts';
import Dashboard from '@/pages/Visits/Visits';
import Login from '@/pages/Login/Login';
import AboutG8 from '@/pages/Documentation/AboutG8';
import ExploringG8 from '@/pages/Documentation/ExploringG8';
import GettingStarted from '@/pages/Documentation/GettingStarted';
import FAQ from '@/pages/Documentation/Faq';
import G8Glossary from '@/pages/Documentation/G8Glossary';
import ErrorPage from '@/pages/Error/Error';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/error',
      name: 'Error',
      component: ErrorPage,
    },
    {
      path: '/documentation',
      name: 'LayoutDocumentation',
      component: LayoutDocumentation,
      children: [
        {
          path: 'about-g8',
          name: 'AboutG8',
          component: AboutG8,
        },
        {
          path: 'getting-started',
          name: 'GettingStarted',
          component: GettingStarted,
        },
        {
          path: 'exploring-g8',
          name: 'ExploringG8',
          component: ExploringG8,
        },
        {
          path: 'faq',
          name: 'FAQ',
          component: FAQ,
        },
        {
          path: 'g8-glossary',
          name: 'G8Glossary',
          component: G8Glossary,
        },
      ],
    },
    {
      path: '/app',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
        },
        {
          path: 'typography',
          name: 'Typography',
          component: Typography,
        },
        {
          path: 'tables',
          name: 'Typography',
          component: Tables,
        },
        {
          path: 'notifications',
          name: 'Notifications',
          component: Notifications,
        },
        {
          path: 'components/icons',
          name: 'Icons',
          component: Icons,
        },
        {
          path: 'components/maps',
          name: 'Maps',
          component: Maps,
        },
        {
          path: 'components/charts',
          name: 'Charts',
          component: Charts,
        },
      ],
    },
    {
      path: '*',
      name: 'Error',
      component: ErrorPage,
    }
  ],
});
