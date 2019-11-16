import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import {EmployeesComponent} from './views/employees/employees.component';
import { CustomersComponent } from './views/customers/customers.component';
import { AuthinfoComponent } from './views/authinfo/authinfo.component';
import { ChangepassComponent } from './views/changepass/changepass.component';
import { TopicsComponent } from './views/topics/topics.component';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Đăng Nhập'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'employee',
        component: EmployeesComponent,
        data: {
          title: 'Quản Lí Tài Khoản Nhân Viên'
        }
      },
      {
        path: 'customer',
        component: CustomersComponent,
        data: {
          title: 'Quản Lí Tài Khoản Người Chơi'
        }
      },
      {
        path: 'authinfo',
        component: AuthinfoComponent,
        data: {
          title: 'Thông Tin Tài Khoản'
        }
      },
      {
        path: 'changepass',
        component: ChangepassComponent,
        data: {
          title: 'Thay Đổi Mật Khẩu'
        }
      },
      {
        path: 'topic',
        component: TopicsComponent,
        data: {
          title: 'Quản Lí Chủ Đề'
        }
      },
      
      // {
      //   path: 'base',
      //   loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
      // },
      // {
      //   path: 'buttons',
      //   loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule)
      // },
      // {
      //   path: 'charts',
      //   loadChildren: () => import('./views/chartjs/chartjs.module').then(m => m.ChartJSModule)
      // },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      // {
      //   path: 'icons',
      //   loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
      // },
      // {
      //   path: 'notifications',
      //   loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule)
      // },
      // {
      //   path: 'theme',
      //   loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule)
      // },
      // {
      //   path: 'widgets',
      //   loadChildren: () => import('./views/widgets/widgets.module').then(m => m.WidgetsModule)
      // }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
