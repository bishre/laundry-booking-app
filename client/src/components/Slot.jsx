/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'

const Slot = ({ hour, machineId, isSlotBooked, canBookSlot, handleBookSlot }) => {
  const [booked, setBooked] = useState(null)

  useEffect(() => {
    const booked = isSlotBooked(machineId, `${hour}:00-${hour + 1}:00`)
    console.log(booked)
    if (booked) {
      setBooked(true)
    }
  }, [])

  return (
    <div key={hour} className="flex items-center justify-between space-x-2 border rounded px-2">
      <span>{`${hour}:00-${hour + 1}:00`}</span>
      {booked ? (
        <span className="text-gray-500 py-2">Booked</span>
      ) : (
        <button
          onClick={() => handleBookSlot(machineId, `${hour}:00-${hour + 1}:00`)}
          className="text-blue-500 py-2"
          disabled={!canBookSlot()}
        >
          Book
        </button>
      )}
    </div>
  )
}

export default Slot