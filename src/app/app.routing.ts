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
import { ContestsComponent } from './views/contests/contests.component';
import { QuestionsComponent } from './views/questions/questions.component';
import { IncludesComponent } from './views/includes/includes.component';
import { ResultsComponent } from './views/results/results.component';
import { RegisterComponent } from './views/register/register.component';
import { MenusComponent } from './views/menus/menus.component';
import { GroupsComponent } from './views/groups/groups.component';
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
    path: 'forgot',
    component: RegisterComponent,
    data: {
      title: 'Quên Mật Khẩu'
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
      {
        path: 'result',
        component: ResultsComponent,
        data: {
          title: 'Quản Lí Xếp Hạng'
        }
      },
      {
        path: 'contest',
        component: ContestsComponent,
        data: {
          title: 'Quản Lí Cuộc Thi'
        }
      },
      {
        path: 'question',
        component: QuestionsComponent,
        data: {
          title: 'Quản Lí Bộ Đề'
        }
      },
      {
        path: 'include',
        component: IncludesComponent,
        data: {
          title: 'Quản Lí QH Chủ Đề-Cuộc Thi'
        }
      },
      {
        path: 'menu',
        component: MenusComponent,
        data: {
          title: 'Quản Lí Menu'
        }
      },
      {
        path: 'group',
        component: GroupsComponent,
        data: {
          title: 'Quản Lí Nhóm Quyền'
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
