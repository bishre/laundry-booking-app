/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import { createContext, useState } from "react"
import reservationService from "../services/reservation";

const UserContext = createContext()

const initialUser = JSON.parse(localStorage.getItem('loggedUser')) || {
  username: '',
  token: '',
};

const initialMachines = Array.from({ length: 8 }, (_, index) => {
  return {
    id: index + 1
  }
})

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(initialUser)
  const [isLoggedIn, setLoggedIn] = useState(!!initialUser.username)
  const [machines, setMachines] = useState(initialMachines)
  const [selectedDate, setSelectedDate] = useState(new Date());

  const result = useQuery({
    queryKey: ['reservations'],
    queryFn: reservationService.getAllReservations
  })

  return (
    <UserContext.Provider value={{
      user, setUser,
      machines, setMachines,
      isLoggedIn, setLoggedIn,
      reservations: result?.data,
      selectedDate, setSelectedDate}}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
