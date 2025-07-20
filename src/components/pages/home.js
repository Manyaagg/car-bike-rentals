import React, { useState } from 'react';
import VehicleCard from '../components/VehicleCard';
const vehicles = [
  {
    id: 1,
    name: 'Activa 6G',
    type: 'Bike',
    pricePerDay: 250,
    imageUrl: 'https://example.com/activa.jpg',
  },
  {
    id: 2,
    name: 'Hyundai i20',
    type: 'Car',
    pricePerDay: 1200,
    imageUrl: 'https://example.com/i20.jpg',
  },
];




export default function Home() {
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleBook = (bookingDetails) => {
    const options = {
      key: "YOUR_RAZORPAY_KEY",
      amount: bookingDetails.totalAmount * 100, // in paisa
      currency: "INR",
      name: "Vehicle Rentals",
      description: `Booking for ${bookingDetails.name}`,
      image: bookingDetails.imageUrl,
      handler: function (response) {
        alert("Payment Successful! Booking ID: " + response.razorpay_payment_id);
        // Save bookingDetails + payment ID to Firestore here
      },
      prefill: {
        name: "Customer",
        email: "customer@example.com",
        contact: "9999999999"
      },
      theme: {
        color: "#0d9488"
      }
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Available Vehicles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {vehicles.map(vehicle => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} onSelect={setSelectedVehicle} />
        ))}
      </div>

      {selectedVehicle && (
        <BookingForm vehicle={selectedVehicle} onBook={handleBook} />
      )}
    </div>
  );
}
