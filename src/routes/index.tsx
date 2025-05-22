import type { Role } from '../types/roles';
import type { ReactNode } from 'react';

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
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/people', element: <PeopleDashboard />, roles: ['admin', 'member'] },
  { path: '/people/add-member', element: <AddMember />, roles: ['admin'] },
  { path: '/people/add-visitor', element: <AddVisitor />, roles: ['admin', 'member'] },
  { path: '/attendance', element: <AttendanceDashboard />, roles: ['admin', 'member'] },
  { path: '/offering', element: <OfferingDashboard />, roles: ['admin'] },
  { path: '/rewards', element: <RewardPointsDisplay />, roles: ['admin', 'member'] },
  { path: '/account', element: <MyAccount /> },
  { path: '/account/admin', element: <Admin />, roles: ['admin'] },
  { path: '/account/settings', element: <Settings /> },
];
