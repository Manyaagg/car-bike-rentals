import React from 'react';

export default function VehicleCard({ vehicle, onSelect }) {
  return (
    <div className="border rounded-2xl shadow-md p-4 hover:shadow-lg transition-all">
      <img
        src={vehicle.imageUrl}
        alt={vehicle.name}
        className="w-full h-40 object-cover rounded-xl mb-4"
      />
      <h3 className="text-xl font-semibold mb-1">{vehicle.name}</h3>
      <p className="text-gray-600">{vehicle.type}</p>
      <p className="text-blue-600 font-bold mt-2">₹{vehicle.pricePerDay}/day</p>
      <button
        onClick={() => onSelect(vehicle)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
      >
        Book Now
      </button>
    </div>
  );
}
