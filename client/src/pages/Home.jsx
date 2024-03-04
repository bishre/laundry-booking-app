/* eslint-disable react/prop-types */
// src/components/Home.js
import { useContext } from 'react';

import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';

import UserContext from '../context/userContext';

import 'react-datepicker/dist/react-datepicker.css';

import Machine from '../components/Machine';
import LoginForm from '../components/LoginForm';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

const MAX_BOOKINGS_PER_WEEK = 4; // Maximum allowed bookings per week

const Home = () => {
  const { user, isLoggedIn, setLoggedIn, setUser, reservations, selectedDate, setSelectedDate } = useContext(UserContext)

  if (!reservations) return null

  const calculateBookingsThisWeek = () => {
    const userBookings = reservations.filter((booking) =>
      booking.user === user.id
    )
    return userBookings.length;
  };

  const bookingsThisWeek = calculateBookingsThisWeek();

  const canBookSlot = () => {
    // Check if the user can book a slot based on the maximum allowed bookings in a week
    return bookingsThisWeek < MAX_BOOKINGS_PER_WEEK;
  }

  const handleLogout = () => {
    setLoggedIn(false);
    setUser({
      username: '',
      token: '',
    });
    setSelectedDate(null);
  }

  const machines = Array.from({ length: 8 }, (_, index) => {
    return {
      id: index + 1
    }
  })

  return (
    <div className="relative">
      <h1 className="text-2xl font-bold mb-4">Laundrify</h1>
      {!isLoggedIn ? (
        <LoginForm />
      ) : (
        <>
          <div className="absolute right-0 top-0 mb-4">
            <span className="mr-2"><AccountCircleIcon /> Welcome, {user.username}</span>
            <button onClick={handleLogout} className="">
              <LogoutIcon />
            </button>
          </div>
          <div className="lg:absolute right-0 top-10 py-2 text-md">
            {isLoggedIn && (
              <p>
                <Link to="/reservations/"><span className="text-blue-500">Reservations </span></Link>
                ({MAX_BOOKINGS_PER_WEEK - bookingsThisWeek} left)
              </p>
            )}
          </div>
          <div>
            Pick a date:
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              minDate={new Date()}
              maxDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)} // 7 days from now
              dateFormat="MMMM d, yyyy"
              className="border p-2 mb-4"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {machines.map((machine) => (
              <div key={machine.id} className="mb-8">
                <Machine
                  id={machine.id}
                  canBookSlot={canBookSlot}
                  selectedDate={selectedDate}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
