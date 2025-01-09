import VehicleList from "@pages/dashboard/admin/vehicles/VehicleList";
import AddVehicleForm from "@pages/dashboard/admin/vehicles/AddVehicleForm";
import { getVehicles } from "@api/vehicles";
import { useState, useEffect } from "react";

const Vehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isAddNewVisible, setIsAddNewVisible] = useState(false);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                setLoading(true);
                const data = await getVehicles();
                setVehicles(data);
                setError("");
            } catch (error) {
                setError(error.message);
                console.log("Error fetching vehicles:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVehicles();
    }, []);

    const handleVehicleAdded = (newVehicle) => {
        console.log(newVehicle)
        setVehicles((prev) => [...prev, newVehicle]);
    };

    return (
        <div className="max-w-6xl mx-auto p-4 ml-80">
            <h1 className="text-3xl font-bold mb-6">Vehicles</h1>
            <div className="mb-4">
                <button
                    className="mt-4 bg-brand-base text-white py-2 px-4 rounded-md hover:bg-brand-light"
                    onClick={() => setIsAddNewVisible(!isAddNewVisible)}>
                    {isAddNewVisible ? "Close" : "Add new vehicle"}
                </button>
                {isAddNewVisible && (
                    <AddVehicleForm onVehicleAdded={handleVehicleAdded} />
                )}
            </div>
            <VehicleList vehicles={vehicles} error={error} loading={loading} />
        </div>
    );
};

export default Vehicles;