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
            <Title>Vehicles</Title>
            <LinkButton to ="new" label="Add new vehicle" className="bg-white shadow"></LinkButton>
            <VehicleList vehicles={vehicles} error={error} loading={loading} />
        </div>
    );
};

export default Vehicles;