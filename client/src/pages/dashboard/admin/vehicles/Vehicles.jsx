import VehicleList from "@pages/dashboard/admin/vehicles/VehicleList";
import LinkButton from "@components/ui/LinkButton"
import Title from "@components/ui/Title"
import { getVehicles } from "@api/vehicles";
import { useState, useEffect } from "react";

const Vehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                setLoading(true);
                const data = await getVehicles();
                setVehicles(data);
                setError("");
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchVehicles();
    }, []);

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <Title>Company Vehicles</Title>
            <p className="text-gray-700 mb-4">
        When a vehicle is assigned to a reservation, its status will automatically update to <span className="font-medium">occupied </span> 
        until the reservation period ends. Once completed, it becomes <span className="font-medium">available</span> again.
    </p>

    <div className="border-l-4 border-brand-dark pl-4 py-2 bg-purple-50 text-gray-700 mb-4">
        <p className="font-bold">Full Control Over Vehicle Details</p>
        <p>You can manually update vehicle status and modify details at any time, ensuring accurate records and efficient fleet management.</p>
    </div>
            <LinkButton to ="new" className="bg-white shadow">
                Add new vehicle
            </LinkButton>
            <VehicleList vehicles={vehicles} error={error} loading={loading} />
        </div>
    );
};

export default Vehicles;