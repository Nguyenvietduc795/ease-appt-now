import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import BookAppointment from '@/pages/BookAppointment';
import Appointments from '@/pages/Appointments';
import Profile from '@/pages/Profile';
import Help from '@/pages/Help';
import NotFound from "./pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/book-appointment" element={<BookAppointment />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/help" element={<Help />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes; 