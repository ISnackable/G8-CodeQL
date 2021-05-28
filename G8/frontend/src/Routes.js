import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/Layout/Layout';
import Typography from '@/pages/Typography/Typography';
import Tables from '@/pages/Tables/Tables';
import Notifications from '@/pages/Notifications/Notifications';
import Icons from '@/pages/Icons/Icons';
import Maps from '@/pages/Maps/Maps';
import Charts from '@/pages/Charts/Charts';
import Dashboard from '@/pages/Visits/Visits';
import Login from '@/pages/Login/Login';
import ErrorPage from '@/pages/Error/Error';

//######## Imports added that are not part of the templates ########
import Alerts from '@/pages/Alerts/Alerts';
import Home from '@/pages/Home/Home';
import Customquery from '@/pages/Customquery/Customquery';
import Layoutdashboard from '@/components/Layout/Layout-dashboard';
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
      path: '/app',
      name: 'Layout',
      component: Layoutdashboard,
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
          name: 'Customquery',
          component: Customquery,
        },
        //#################End of new routes added for app-child#######################
      ],
    },

    {
      path: '*',
      name: 'Error',
      component: ErrorPage,
    }
  ],
});
