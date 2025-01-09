import React from "react";

const VehicleList = ({ vehicles, error, loading }) => {
    if (loading) {
        return <div className="text-center text-gray-600">Loading vehicles...</div>;
    }
    if (error) {
        return <div className="text-center text-error">{error}</div>;
    }

    return (
        <ul className="bg-white shadow-md rounded-md p-4">
             {vehicles.map((vehicle, index) => (
                <li
                    key={vehicle.licensePlate || index}
                    className="border-b last:border-0 py-2 px-4 hover:bg-gray-100"
                >
                    <div className="font-semibold">
                        {vehicle.brand} {vehicle.model} ({vehicle.type}) - {vehicle.status}
                    </div>
                    <div className="text-sm text-gray-600">
                        License Plate: {vehicle.licensePlate}, Capacity: {vehicle.capacity}
                    </div>
                    <div className="text-sm text-gray-500">
                        Inspection Due: {new Date(vehicle.vehicleInspection).toLocaleDateString()}
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default VehicleList;