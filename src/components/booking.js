import React, { useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
const bookingsRef = collection(db, "bookings");
const data = await getDocs(bookingsRef);


export default function BookingForm({ vehicle, onBook }) {
  const [days, setDays] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    const bookingDetails = {
      vehicleId: vehicle.id,
      name: vehicle.name,
      type: vehicle.type,
      pricePerDay: vehicle.pricePerDay,
      days: days,
      totalAmount: days * vehicle.pricePerDay,
      imageUrl: vehicle.imageUrl,
      date: new Date().toISOString(),
    };

    onBook(bookingDetails); // trigger payment or Firestore save
  };

  if (!vehicle) return null;

  return (
    <div className="p-4 border rounded-xl shadow-md mt-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">Booking: {vehicle.name}</h2>
      <img
        src={vehicle.imageUrl}
        alt={vehicle.name}
        className="w-full h-40 object-cover rounded-xl mb-4"
      />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Rental Duration (in days):</label>
          <input
            type="number"
            min="1"
            value={days}
            onChange={(e) => setDays(parseInt(e.target.value))}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div className="text-lg font-semibold text-blue-700">
          Total Price: ₹{vehicle.pricePerDay * days}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Proceed to Payment
        </button>
      </form>
    </div>
  );
}
