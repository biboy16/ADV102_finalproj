import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import HomePage from './Pages/HomePage';
import BookingPage from './Pages/BookingPage';
import AboutPage from './Pages/AboutPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import CurrentBookingPage from './Pages/CurrentBookingPage';
import BookingHistoryPage from './Pages/HistoryPage';
import ContactPage from './Pages/ContactPage';

function App() {
  const location = useLocation();
  const hideHeaderPaths = ['/', '/registerpage'];
  const showFooterPaths = ['/homepage', '/aboutpage', '/contactpage'];

  const shouldHideHeader = hideHeaderPaths.includes(location.pathname);
  const shouldShowFooter = showFooterPaths.includes(location.pathname);

  return (
    <div>
      {!shouldHideHeader && <Header />}
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/homepage' element={<HomePage />} />
        <Route path='/bookingpage' element={<BookingPage />} />
        <Route path='/aboutpage' element={<AboutPage />} />
        <Route path='/registerpage' element={<RegisterPage />} />
        <Route path='/currentbookingpage' element={<CurrentBookingPage />} />
        <Route path='/bookinghistorypage' element={<BookingHistoryPage />} />
        <Route path='/contactpage' element={<ContactPage />} />
      </Routes>
      {shouldShowFooter && <Footer />}
    </div>
  );
}

export default App;
