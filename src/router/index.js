import Vue from 'vue'
import Router from 'vue-router'
import store from '../store';
import i18n from '../i18n'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

const Page404 = () => import('@/views/auth/Page404')
const Page500 = () => import('@/views/auth/Page500')
const Login = () => import('@/views/auth/Login')
const Register = () => import('@/views/auth/Register')

//---------------------------- skw ------------------------------- //

// withdraw
const ManualWithdraw = () => import('@/views/withdraw/Manual')
const AutoWithdraw = () => import('@/views/withdraw/Auto')
const EorrorWithdraw = () => import('@/views/withdraw/Error')

// settings
const Customer = () => import('@/views/settings/Customer')
const TransferWithdraw = () => import('@/views/settings/transfer-withdraw')
const WebSiteStyle = () => import('@/views/settings/style')
const MembershipPlan = () => import('@/views/settings/register')
// staff
const AddStaff = () => import('@/views/settings/staff/Add')
const StaffList = () => import('@/views/settings/staff/List')
const Banking = () => import('@/views/settings/banking')
const TrueWallet = () => import('@/views/settings/trueWallet')
const Promotion = () => import('@/views/settings/promotion/promotion')
const PromotionImage = () => import('@/views/settings/promotion/image')
const Affiliate = () => import('@/views/settings/Affiliate')
const AlertSetting = () => import('@/views/settings/Alert')

// reports
const DepositReport = () => import('@/views/reports/deposit')
const WithdrawalReport = () => import('@/views/reports/withdraw')
const TransferReport = () => import('@/views/reports/moveMoney')
const TransfersReport = () => import('@/views/reports/transfers')
const StatementReport = () => import('@/views/reports/statement')
const PromotionReport = () => import('@/views/reports/promotion')
const AffiliateReport = () => import('@/views/reports/affiliate')

// logs
const AdminActivity = () => import('@/views/logs/adminActivity')
const BankDepositHistory = () => import('@/views/logs/bankingDeposit')
const BetHistory = () => import('@/views/logs/UserBetHistory')

//users
const UserRegister = () => import('@/views/users/UserRegister')
const UserReport = () => import('@/views/users/report')

//status
const AgentSystem = () => import('@/views/status/agent')

//games
const GameList = () => import('@/views/games/Game')




Vue.use(Router)

let router = new Router({
  mode: 'history', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

function configRoutes() {
  return [
    {
      path: '/',
      redirect: `/${i18n.locale}`
    },
    {
      path: '/:lang',
      component: {
        render(c) { return c('router-view') }
      },
      children: [
        {
          path: '',
          redirect: `/${i18n.locale}/dashboard`,
          component: TheContainer,
          meta: {
            requiresAuth: true
          },
          name: 'Home',
          children: [
            {
              path: 'dashboard',
              name: 'Dashboard',
              component: Dashboard
            },
            {
              path: 'view',
              redirect: '/',
              name: 'View',
              component: {
                render(c) { return c('router-view') }
              },
              children: [
                {
                  path: 'transactionHistory',
                  redirect: '/users',
                },
                {
                  path: 'transactionHistory/:userID',
                  name: 'Transaction History',
                  component: AdminActivity
                }
              ]
            },
            {
              path: 'games',
              redirect: `/${i18n.locale}/games/list`,
              name: 'Games',
              component: {
                render(c) { return c('router-view') }
              },
              children: [
                {
                  path: 'list',
                  name: 'Games List',
                  component: GameList
                }
              ]
            },
            {
              path: 'withdraw',
              redirect: `/${i18n.locale}/withdraw/manual`,
              name: 'Withdraw',
              component: {
                render(c) { return c('router-view') }
              },
              children: [
                {
                  path: 'manual',
                  name: 'Manual',
                  component: ManualWithdraw
                },
                {
                  path: 'auto',
                  name: 'Auto',
                  component: AutoWithdraw
                },
                {
                  path: 'error',
                  name: 'Error',
                  component: EorrorWithdraw
                }
              ]
            },
            {
              path: 'settings',
              redirect: `/${i18n.locale}/settings/customer`,
              name: 'Settings',
              component: {
                render(c) { return c('router-view') }
              },
              children: [
                {
                  path: 'customer',
                  name: 'Customer',
                  component: Customer
                },
                {
                  path: 'transfer-withdraw',
                  name: 'Transfer Withdraw',
                  component: TransferWithdraw
                },
                {
                  path: 'styles',
                  name: 'Style',
                  component: WebSiteStyle
                },
                {
                  path: 'register',
                  name: 'Membership Plan',
                  component: MembershipPlan
                },
                {
                  path: 'staff',
                  redirect: `/${i18n.locale}/staff/list`,
                  name: 'Staff',
                  component: {
                    render(c) { return c('router-view') }
                  },
                  children: [
                    {
                      path: 'list',
                      name: 'Staff List',
                      component: StaffList
                    },
                    {
                      path: 'add',
                      name: 'Add Staff',
                      component: AddStaff
                    }
                  ]
                },
                {
                  path: 'bankings',
                  name: 'Bank',
                  component: Banking
                },
                {
                  path: 'truewallet/deposit',
                  name: 'Wallet Deposit',
                  component: TrueWallet
                },
                {
                  path: 'promotions',
                  redirect: `/${i18n.locale}/settings/promotions`,
                  name: 'Promotion',
                  component: {
                    render(c) { return c('router-view') }
                  },
                  children: [
                    {
                      path: '',
                      name: '',
                      component: Promotion
                    }, {
                      path: 'pictures',
                      name: 'Picture',
                      component: PromotionImage
                    },
                  ]
                },
                {
                  path: 'affiliate',
                  name: 'Affiliate',
                  component: Affiliate
                },
                {
                  path: 'notifications',
                  name: 'Alert',
                  component: AlertSetting
                },
              ]
            },
            {
              path: 'reports',
              redirect: `/${i18n.locale}/reports/affiliate`,
              name: 'Reports',
              component: {
                render(c) { return c('router-view') }
              },
              children: [
                {
                  path: 'deposit',
                  name: 'Deposit',
                  component: DepositReport
                },
                {
                  path: 'withdraw',
                  name: 'Withdraw',
                  component: WithdrawalReport
                },
                {
                  path: 'transfer',
                  name: 'Transfer',
                  component: TransferReport
                },
                {
                  path: 'statement',
                  name: 'Statement',
                  component: StatementReport
                },
                {
                  path: 'promotion',
                  name: 'Promotion',
                  component: PromotionReport
                },
                {
                  path: 'affiliate',
                  name: 'Affiliate',
                  component: AffiliateReport
                },
                {
                  path: 'transfers',
                  name: 'Transfers',
                  component: TransfersReport
                }
              ]
            },
            {
              path: 'logs',
              name: 'Logs',
              redirect: `/${i18n.locale}/logs/admin-activity`,
              component: {
                render(c) { return c('router-view') }
              },
              children: [
                {
                  path: 'admin-activity',
                  name: 'Admin Activity',
                  component: AdminActivity
                },
                {
                  path: 'banking/deposit',
                  name: 'Bank Deposit',
                  component: BankDepositHistory
                },
                {
                  path: 'betHistory/:userID',
                  name: 'Bet History',
                  component: BetHistory
                }
              ]
            },
            {
              path: 'users',
              name: 'Users',
              redirect: `/${i18n.locale}/users/register`,
              component: {
                render(c) { return c('router-view') }
              },
              children: [
                {
                  path: 'register',
                  name: 'Register',
                  component: UserRegister
                },
                {
                  path: 'report',
                  name: 'Report',
                  component: UserReport
                }
              ]
            },
            {
              path: 'status/agent',
              name: 'Agent System',
              component: AgentSystem
            }
          ]
        }
      ]
    },
    {
      path: '/auth',
      redirect: '/auth/login',
      name: 'auth',
      component: {
        render(c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        }
      ]
    }
  ]
}
router.beforeEach((to, from, next) => {
  let language = to.params.lang;
  if (!language) {
    language = 'en'
  }
  i18n.locale = language;

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters['auth/isLoggedIn']) {
      next()
      return
    }
    next('/auth/login')
  } else {
    next()
  }
});

export default router;