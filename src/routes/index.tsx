import type { Role } from '../types/roles';
import type { ReactNode } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';

import Home from '../pages/Home';
import Login from '../pages/Login';
import PeopleDashboard from '../pages/People/PeopleDashboard';
import AddMember from '../pages/People/AddMember';
import AddVisitor from '../pages/People/AddVisitor';
import AttendanceDashboard from '../pages/Attendance/AttendanceDashboard';
import OfferingDashboard from '../pages/Offering/OfferingDashboard';
import RewardPointsDisplay from '../pages/Rewards/RewardPointsDisplay';
import MyAccount from '../pages/Account/MyAccount';
import Admin from '../pages/Account/Admin';
import Settings from '../pages/Account/Settings';


export interface AppRoute {
  path: string;
  element: ReactNode;
  roles?: Role[];
}

export const routes: AppRoute[] = [
  { path: '/', element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    )
  },
  { path: '/login', element: <Login /> },

  { path: '/people', element: (
      <ProtectedRoute allowedRoles={['admin', 'member']}>
        <PeopleDashboard />
      </ProtectedRoute>
    )
  },
  { path: '/people/add-member', element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AddMember />
      </ProtectedRoute>
    )
  },
  { path: '/people/add-visitor', element: (
      <ProtectedRoute allowedRoles={['admin', 'member']}>
        <AddVisitor />
      </ProtectedRoute>
    )
  },
  { path: '/attendance', element: (
      <ProtectedRoute allowedRoles={['admin', 'member']}>
        <AttendanceDashboard />
      </ProtectedRoute>
    )
  },
  { path: '/offering', element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <OfferingDashboard />
      </ProtectedRoute>
    )
  },
  { path: '/rewards', element: (
      <ProtectedRoute allowedRoles={['admin', 'member']}>
        <RewardPointsDisplay />
      </ProtectedRoute>
    )
  },
  { path: '/account', element: (
      <ProtectedRoute>
        <MyAccount />
      </ProtectedRoute>
    )
  },
  { path: '/account/admin', element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <Admin />
      </ProtectedRoute>
    )
  },
  { path: '/account/settings', element: (
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    )
  },
];

