interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
    // {
    //   name: 'Tài Khoản Nhân Viên',
    //   url: '/employee',
    //   icon: 'fa fa-user-circle-o'
    // },
    // {
    //   name: 'Tài Khoản Người Chơi',
    //   url: '/customer',
    //   icon: 'icon-user'
    // },
    // {
    //   name: 'Cuộc Thi',
    //   url: '/contest',
    //   icon: 'fa fa-laptop'
    // },
    // {
    //   name: 'Chủ Đề',
    //   url: '/topic',
    //   icon: 'fa fa-folder-open'
    // },
    // {
    //   name: 'QH Chủ Đề - Cuộc Thi',
    //   url: '/include',
    //   icon: 'fa fa-file'
    // },
    // {
    //   name: 'Bộ Đề',
    //   url: '/question',
    //   icon: 'fa fa-book'
    // },
    // {
    //   name: 'Xếp Hạng',
    //   url: '/result',
    //   icon: 'fa fa-trophy'
    // }
];
