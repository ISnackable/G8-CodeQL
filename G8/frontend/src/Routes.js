import Vue from 'vue';
import Router from 'vue-router';

// import Layout from '@/components/Layout/Layout';
import LayoutDocumentation from '@/components/Layout/LayoutDocumentation';
import Typography from '@/pages/Typography/Typography';
import Tables from '@/pages/Tables/Tables';
import Notifications from '@/pages/Notifications/Notifications';
import Icons from '@/pages/Icons/Icons';
import Maps from '@/pages/Maps/Maps';
import Charts from '@/pages/Charts/Charts';
import Dashboard from '@/pages/Visits/Visits';
import Login from '@/pages/Login/Login';
import Documentation from '@/pages/Documentation/Documentation';
import ExploringG8 from '@/pages/Documentation/ExploringG8';
import GettingStarted from '@/pages/Documentation/GettingStarted';
import FAQ from '@/pages/Documentation/Faq';
import ErrorPage from '@/pages/Error/Error';
import Homepage from '@/pages/Homepage/Homepage';

//######## Imports added that are not part of the templates ########
import Alerts from '@/pages/Alerts/Alerts';
import Home from '@/pages/Home/Home';
import CustomQuery from '@/pages/CustomQuery/CustomQuery';
import LayoutDashboard from '@/components/Layout/LayoutDashboard';
//######## End of new imports added ########
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
          path: 'documentation',
          name: 'Documentation',
          component: Documentation,
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
      ],
    },
    {
      path: '/app',
      name: 'Layout',
      component: LayoutDashboard,
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
        //#################New-Routes added for app-child##############################
        {
          path: 'home',
          name: 'Home',
          component: Home,
        },
        {
          path: 'alerts',
          name: 'Alerts',
          component: Alerts,
        },
        {
          path: 'customquery',
          name: 'CustomQuery',
          component: CustomQuery,
        },
        //#################End of new routes added for app-child#######################
      ],
    },
    {
      path: '/homepage',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '*',
      name: 'Error',
      component: ErrorPage,
    }
  ],
});
