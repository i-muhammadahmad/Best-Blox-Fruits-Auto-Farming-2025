
import BarChartIcon from '@material-ui/icons/BarChart';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

export default [
  {
    title: 'Pages',
    pages: [
      {
        title: 'Dashboards',
        href: '/dashboards/default',
        icon: DashboardIcon
      },
      {
        title: 'Activity Management',
        href: '',
        icon: BarChartIcon,
        children: [
          {
            title: 'Activity Log',
            href: '/activity-log'
          },
          {
            title: 'Activity Setup',
            href: '/activity-setup'
          },
          {
            title: 'Activity Category',
            href: '/activity-category'
          },
          {
            title: 'Activity Category Status',
            href: '/activity-category-status'
          },
          {
            title: 'Activity Access',
            href: '/activity-access'
          },
          {
            title: 'Reports',
            href: '',
            children: [
              {
                title: 'My Logged Report',
                href: '/activity-reports/myLoggedActivites'
              },
              {
                title: 'All Logged Report',
                href: '/activity-reports/allLoggedActivites'
              },
              {
                title: 'My Logged Summary Report',
                href: '/activity-reports/myLoggedActivitesSummary'
              },
              {
                title: 'All Logged Summary Report',
                href: '/activity-reports/allLoggedActivitesSummary'
              },
            ]
          },
          {
            title: 'Audit',
            href: '',
            children: [
              {
                title: 'Audit Reviews',
                href: '/activity-audit/audit-reviews'
              },
              {
                title: 'Error Category',
                href: '/activity-audit/error-category'
              },
              {
                title: 'Infractions',
                href: '/activity-audit/infractions'
              },
              {
                title: 'Error Severity',
                href: '/activity-audit/error-severity'
              }
            ]
          },
          {
            title: 'Bulk Activity Management',
            href: '',
            icon: ViewModuleIcon,
            children: [
              {
                title: 'Bulk Activity Setup',
                href: '/bulk-activity-setup'
              },
              {
                title: 'Bulk Activity Log',
                href: '/bulk-activity-log'
              },
            ]
          },
        ]
      },
      {
        title: 'User Management',
        href: '',
        icon: ViewModuleIcon,
        children: [
          {
            title: 'Users',
            href: '/users'
          },
          {
            title: 'Roles',
            href: '/roles'
          },
          {
            title: 'Objects',
            href: '/objects'
          },
          {
            title: 'Object Types',
            href: '/object-types'
          },
          {
            title: 'TimeZone',
            href: '/timeZones'
          },
          {
            title: 'Reports',
            href: '',
            children: [
              {
                title: 'User Activity Track',
                href: '/user-reports/userActivityTrackReport'
              }
            ]
          },
        ]
      },
      {
        title: 'Setup',
        href: '',
        icon: ViewModuleIcon,
        children: [
          {
            title: 'Offices',
            href: '/offices'
          },
          {
            title: 'Departments',
            href: '/departments'
          },
          {
            title: 'Workstations',
            href: '/workstations'
          },
        ]
      },
      {
        title: 'Holiday Management',
        href: '',
        icon: ViewModuleIcon,
        children: [
          {
            title: 'Holidays',
            href: '/holiday'
          },
          {
            title: 'Holiday Calendar',
            href: '/holiday/calendar'
          },
          {
            title: 'Holiday Category',
            href: '/holiday-category'
          },
        ]
      },
      {
        title: 'Client Management',
        href: '',
        icon: ViewModuleIcon,
        children: [
          {
            title: 'Clients',
            href: '/client'
          },

        ]
      },
      {
        title: 'HR',
        href: '',
        icon: BarChartIcon,
        children: [
          {
            title: 'Designation',
            href: '/designation'
          },
          {
            title: 'Designation Category',
            href: '/designation-category'
          },
          {
            title: 'Department',
            href: ''
          },
          {
            title: 'Employees',
            href: ''
          },
          {
            title: 'Employee Movement (PCN)',
            href: ''
          },
          {
            title: 'Employee Credentials',
            href: ''
          },
          {
            title: 'Employee documents/Memo',
            href: ''
          },
          {
            title: 'Global Document',
            href: ''
          },
          {
            title: 'Employee Attrition',
            href: ''
          },
          {
            title: 'Employee Schedule',
            href: ''
          },
          {
            title: 'Attendance',
            href: ''
          },
          {
            title: 'Leave Policy',
            href: ''
          }
        ]
      }
    ]
  }
]
