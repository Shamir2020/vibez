import './App.css';
import HomePage from './pages/home';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import AboutPage from './pages/About';
import ContactPage from './pages/contact';
import ConcertPage from './pages/concerts';
import LoginPage from './pages/login';
import RegisterPage from './pages/Register';
import { Toaster } from 'react-hot-toast';
import ProfilePage from './pages/profilePage';
import UpdateProfile from './pages/updateProfile';
import Dashboard from './pages/dashboardPage';
import ManageEvents from './organizers/manageEvent';
import EventForm from './organizers/eventForm';
import VenueManagement from './admin/venueManagement';
import VenueForm from './admin/venueForm';
import ApproveEvents from './admin/approveEvents';
import BuyTicket from './pages/buyTicket';
import Checkout from './pages/checkout';
import PaymentSuccess from './pages/paymentSuccess';
function App() {
  return (
    <div className="App">
      <Toaster position='top-right'/>
      
      <BrowserRouter>
        <Routes>
          

          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/concerts' element={<ConcertPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />

          <Route path='/profile' element={<ProfilePage />} />

          <Route path='/update-profile' element={<UpdateProfile />} />

          <Route path='/dashboard' element={<Dashboard />} />


          <Route path='/buy-ticket/:id' element={<BuyTicket />} />
          <Route path='/checkout/:id' element={<Checkout />} />


          {/* Organizer  */}

          <Route path='/manage-events' element={<ManageEvents />} />
          <Route path='/event-form' element={<EventForm />} />

          {/* Organizer */}

          {/* Admin  */}

          <Route path='/manage-venues' element={<VenueManagement />} />

          <Route path='/venue-form' element={<VenueForm />} />

          <Route path='/approve-events' element={<ApproveEvents />} />

          {/* Admin */}
          
          {/* Payment  */}

          <Route path='/success/:transactionId' element={<PaymentSuccess />} />

          {/* Payment */}


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
