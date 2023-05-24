import { Navigate, Route, Routes } from 'react-router-dom';
import GuardRoute from '../components/GuardRoute';
import GuestOnlyRoute from '../components/GuestOnlyRoute';

import Login from '../pages/signin';
import { HomeRoute } from './HomeRoutes';
// import { TalentsRoute } from './TalentsRoute';
import { GenreRoute } from './GenreRoutes';
// import { PaymentsRoute } from './PaymentsRoute';
import KNavbar from '../components/Navbar';
// import { EventsRoute } from './EventsRoute';
// import { OrdersRoute } from './OrdersRoute';
// import { OrganizersRoute } from './OrganizersRoute';
// import { ParticipantsRoute } from './ParticipantsRoute';

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="login"
        element={
          <GuestOnlyRoute>
            <Login />
          </GuestOnlyRoute>
        }
      />
      <Route
        path="/"
        element={
          <>
            <KNavbar />
            <GuardRoute />
          </>
        }
      >
        <Route path="dashboard/*" element={<HomeRoute />} />
        <Route path="genre/*" element={<GenreRoute />} />
        {/* <Route path="talents/*" element={<TalentsRoute />} />
        <Route path="payments/*" element={<PaymentsRoute />} />
        <Route path="events/*" element={<EventsRoute />} />
        <Route path="orders/*" element={<OrdersRoute />} />
        <Route path="organizers/*" element={<OrganizersRoute />} />
        <Route path="participants/*" element={<ParticipantsRoute />} /> */}

        <Route path="" element={<Navigate to="/dashboard" replace={true} />} />
      </Route>
    </Routes>
  );
}
