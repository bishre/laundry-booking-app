import { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';

import ReservationsList from './components/ReservationsList';
import Home from './pages/Home';
import UserContext from './context/userContext';
import reservationService from './services/reservation';

const App = () => {
  const { user, setUser, reservations } = useContext(UserContext)

  useEffect(() => {
    localStorage.setItem('loggedUser', JSON.stringify(user));
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      reservationService.setToken(user.token)
    }
  }, [])

  return (
    <Router>
      <div className="container mx-auto p-4">
        <nav className="mb-4">
          <ul className="flex">
            <li className="mr-4 text-blue-500">
              <Link to="/laundry-app/">Home</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route
            path="/laundry-app"
            element={
              <Home />
            }
          />
          <Route
            path="/reservations"
            element={
              <ReservationsList
                reservations={reservations}
                user={user}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;