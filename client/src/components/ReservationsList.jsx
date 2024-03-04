/* eslint-disable react/prop-types */
import ClearIcon from '@mui/icons-material/Clear';
import reservationService from '../services/reservation'
import { useMutation, useQueryClient } from '@tanstack/react-query';

const ReservationsList = ({ user, reservations }) => {
  const queryClient = useQueryClient()

  const newReservationMutation = useMutation({
    mutationFn: reservationService.deleteReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations']})
    }
  })
  // Filter machines based on the user's bookings
  const userBookedMachines = reservations.filter((machine) =>
    machine.user === user.id
  )
  const handleClick = (id) => {
    newReservationMutation.mutate(id)
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Reservations</h1>
      {userBookedMachines.map((reservation) => (
        <div key={reservation.id} className="mb-8">
          <h2 className="text-xl font-bold mb-2">Reservations  {reservation.id}</h2>
          <p>{reservation.date} {reservation.machine} {reservation.slot}</p>
          <button onClick={() => handleClick(reservation.id)} className="ml-8">
            <ClearIcon />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ReservationsList;
