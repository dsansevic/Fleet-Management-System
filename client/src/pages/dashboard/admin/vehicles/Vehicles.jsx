import VehicleList from "@pages/dashboard/admin/vehicles/VehicleList";
import LinkButton from "@components/ui/LinkButton";
import Title from "@components/ui/Title";
import { getVehicles } from "@api/vehicles";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";

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
    <div className="p-6 w-full mx-auto">
      <Title>Company Vehicles</Title>
      <p className="text-gray-700 mb-4">
        Track and manage your fleet effortlessly. Vehicle statuses update
        automatically based on reservations.
      </p>

      <div className="border-l-4 border-brand-dark pl-4 py-2 bg-white text-gray-700 mb-4 rounded-base">
        <p className="font-bold">Full Control Over Vehicle Details</p>
        <p>
          Manually adjust vehicle details to ensure accurate fleet management.
        </p>
      </div>
      <LinkButton
        to="new"
        className="border-0 bg-white shadow-sm shadow-brand-dark"
      >
        <FontAwesomeIcon icon={faFileCirclePlus} className="mr-1" /> Add new
        vehicle
      </LinkButton>
      <VehicleList vehicles={vehicles} error={error} loading={loading} />
    </div>
  );
};

export default Vehicles;
