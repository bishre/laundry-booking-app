/* eslint-disable react/prop-types */

import { useContext } from "react";
import UserContext from "../context/userContext";
import reservationService from "../services/reservation";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const SlotPicker = ({ machine, canBookSlot }) => {
  const queryClient = useQueryClient()
  const { isLoggedIn, selectedDate, user, reservations } = useContext(UserContext)
  const newReservationMutation = useMutation({
    mutationFn: reservationService.createReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations']})
    }
  })

  const isSlotBooked = (machineId, slot) => {
    const bookings = reservations.filter(reservation => reservation.machine === machineId.toString())
    return bookings.some(item => {
      return (item.slot === slot && item.date.split("T")[0] === selectedDate?.toISOString().split("T")[0])
    })
  }

  const handleBookSlot = (slot) => {
    if (!isLoggedIn) {
      toast.error('User not logged in. Cannot book a slot.');
      return;
    }

    if (!selectedDate) {
      toast.error('Please select date before booking.');
      return;
    }

    const newBooking = {
      id: Date.now(),
      userId: user.username,
      slot,
      date: selectedDate.toISOString(),
      machine: machine
    }
    newReservationMutation.mutate(newBooking)
    toast.success(`Slot booked on ${newBooking.date} at ${newBooking.slot}`);
  }


  return (
    <div className="relative mb-4">
      <div className="grid grid-cols-2 gap-4">
        {[9, 10, 11, 12, 13, 14, 15, 16].map((hour) => (
          <div key={hour} className="flex items-center justify-between space-x-2 border rounded px-2">
            <span>{`${hour}:00-${hour + 1}:00`}</span>
            {isSlotBooked(machine, `${hour}:00-${hour + 1}:00`) ? (
              <span className="text-gray-500 py-2">Booked</span>
            ) : (
              <button
                onClick={() => handleBookSlot(`${hour}:00-${hour + 1}:00`)}
                className="text-blue-500 py-2"
                disabled={!canBookSlot()}
              >
                Book
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlotPicker;