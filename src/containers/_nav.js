import i18n from '../i18n'
export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: `/${i18n.locale}/dashboard`,
        icon: 'cil-speedometer',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Add_members',
        to: `/${i18n.locale}/users/register`,
        icon: 'cil-user-follow'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'System_Setting',
        to: `/${i18n.locale}/settings/customer`,
        icon: 'cil-settings'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Manage_members',
        to: `/${i18n.locale}/users/report`,
        icon: 'cil-settings'
      },
      // {
      //   _name: 'CSidebarNavTitle',
      //   _children: ['Withdraw_money']
      // },
      {
        _name: 'CSidebarNavItem',
        name: 'Authorization_to_withdraw',
        to: `/${i18n.locale}/withdraw/manual`,
        icon: 'cil-dollar'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Automatic_transfer_waiting_list',
        to: `/${i18n.locale}/withdraw/auto`,
        icon: 'cil-dollar'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Error_transfer',
        to: `/${i18n.locale}/withdraw/error`,
        icon: 'cil-dollar'
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Set_Up']
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Setup_withdrawal',
        to: `/${i18n.locale}/settings/transfer-withdraw`,
        icon: 'cil-settings'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'colors_backgrounds',
        to: `/${i18n.locale}/settings/styles`,
        icon: 'cil-settings'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'membership_page',
        to: `/${i18n.locale}/settings/register`,
        icon: 'cil-settings'
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'staff',
        route: '/base',
        icon: 'cil-people',
        items: [
          {
            name: 'Add_staff',
            to: `/${i18n.locale}/settings/staff/add`
          },
          {
            name: 'Employee_list',
            to: `/${i18n.locale}/settings/staff/list`
          }

        ]
      },
      {
        _name: 'CSidebarNavItem',
        name: 'deposit_withdraw_money',
        to: `/${i18n.locale}/settings/bankings`,
        icon: 'cil-basket'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Wallet_Deposit',
        to: `/${i18n.locale}/settings/truewallet/deposit`,
        icon: 'cil-pencil'
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Promotion',
        route: '/settings/promotions',
        icon: 'cil-star',
        items: [
          {
            name: 'Promotion',
            to: `/${i18n.locale}/settings/promotions`
          },
          {
            name: 'Promotional_Image',
            to: `/${i18n.locale}/settings/promotions/pictures`
          }
        ]
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Affiliate',
        to: `/${i18n.locale}/settings/affiliate`,
        icon: 'cil-user'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Alert',
        to: `/${i18n.locale}/settings/notifications`,
        icon: 'cil-bell'
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Report']
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Deposit_Withdraw_Transfer',
        route: '/reports',
        icon: 'cil-layers',
        items: [
          {
            name: 'Deposit',
            to: `/${i18n.locale}/reports/deposit`,
          },
          {
            name: 'Withdraw',
            to: `/${i18n.locale}/reports/withdraw`
          },
          {
            name: 'Transfer',
            to: `/${i18n.locale}/reports/transfer`
          }
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Summary_Report',
        route: '/reports/statement',
        icon: 'cil-layers',
        items: [
          {
            name: 'Profit_Loss',
            to: `/${i18n.locale}/reports/statement`
          },
          {
            name: 'Games',
            to: `/${i18n.locale}/games/list`
          },
          // {
          //   // _name: 'CSidebarNavDropdown',
          //   name: 'Games',
          //   route: '/base',
          //   icon: 'cil-laptop',
          //   items: [

          //   ]
          // },
          // {
          //   name: 'Promotion_Summary',
          //   to: `/${i18n.locale}/reports/promotion`
          // }
        ]
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Affiliate_Report',
        to: `/${i18n.locale}/reports/affiliate`,
        icon: 'cil-layers'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Money_transfer_report',
        to: `/${i18n.locale}/reports/transfers`,
        icon: 'cil-layers'
      },
      {
        _name: 'CSidebarNavDivider',
        _class: 'm-2'
      },
      // {
      //   _name: 'CSidebarNavTitle',
      //   _children: ['Various_history']
      // },
      {
        _name: 'CSidebarNavItem',
        name: 'Making_of_admins',
        to: `/${i18n.locale}/logs/admin-activity`,
        icon: 'cil-cloud-download'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Account_List',
        to: `/${i18n.locale}/logs/banking/deposit`,
        icon: 'cil-cloud-download'
      },
      // {
      //   _name: 'CSidebarNavTitle',
      //   _children: ['Manage_Server']
      // },
      {
        _name: 'CSidebarNavItem',
        name: 'Agent_system',
        to: `/${i18n.locale}/status/agent`,
        icon: 'cil-layers'
      },
      {
        _name: 'CSidebarNavDivider',
        _class: 'm-2'
      }
    ]
  }
]