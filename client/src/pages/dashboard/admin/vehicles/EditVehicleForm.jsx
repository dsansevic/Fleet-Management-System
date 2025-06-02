import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getVehicleById, updateVehicle } from "@api/vehicles";
import FormInputField from "@components/form/FormInputField";
import SelectField from "@components/form/SelectField";
import SubmitButton from "@components/ui/SubmitButton";
import Loading from "@utils/Loading";
import { formatDate } from "@utils/formatDate";
import Title from "@components/ui/Title";
import { validateField } from "@utils/inputValidation";
import { validateNotInPast } from "@utils/dateValidation";

const EditVehicleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [vehicleErrors, setVehicleErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const data = await getVehicleById(id);
        setVehicle(data);
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicle();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();

    setFormData((prev) => ({ ...prev, [name]: trimmedValue }));

    if (trimmedValue !== "") {
      if (name === "vehicleInspection") {
        const errorInPast = validateNotInPast(trimmedValue);
        if (errorInPast) {
          setVehicleErrors((prev) => ({
            ...prev,
            vehicleInspection: errorInPast,
          }));
          return;
        }
        const oneYearFromNow = new Date();
        oneYearFromNow.setFullYear(new Date().getFullYear() + 1);
        if (new Date(trimmedValue) > oneYearFromNow) {
          setVehicleErrors((prev) => ({
            ...prev,
            vehicleInspection:
              "Inspection date must be within one year from today.",
          }));
          return;
        }
      }

      const error = validateField(name, trimmedValue);
      setVehicleErrors((prev) => ({ ...prev, [name]: error }));
    } else {
      setVehicleErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleUpdateVehicle = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const filteredData = Object.fromEntries(
      Object.entries(formData).filter(
        ([_, value]) => value && value.trim() !== ""
      )
    );
    console.log(filteredData);

    if (Object.keys(filteredData).length === 0) {
      setErrorMessage("No changes detected. Please enter new values.");
      return;
    }

    try {
      console.log("Slanje podataka na backend:", filteredData);
      await updateVehicle(id, filteredData);
      navigate("/dashboard-admin/vehicles");
    } catch (error) {
      setErrorMessage("Error updating vehicle:", error);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-2xl mx-auto mt-6 bg-white shadow-lg rounded-base p-6 relative">
      <button
        onClick={() => navigate("/dashboard-admin/vehicles")}
        className="absolute top-0 right-0 text-xl"
      >
        ✖
      </button>
      <Title className="text-center">Edit Vehicle</Title>
      {errorMessage && (
        <p className="text-error bg-red-100 p-3 rounded-md text-sm mb-4">
          {errorMessage}
        </p>
      )}
      {vehicle && (
        <div className="mb-4 p-3 rounded-base bg-purple-50 text-sm grid grid-cols-2 gap-2">
          <p>
            <strong>Brand:</strong> {vehicle.brand}
          </p>
          <p>
            <strong>Model:</strong> {vehicle.model}
          </p>
          <p>
            <strong>License Plate:</strong> {vehicle.licensePlate}
          </p>
          <p>
            <strong>Type:</strong> {vehicle.type}
          </p>
          <p>
            <strong>Capacity:</strong> {vehicle.capacity} seats
          </p>
          <p>
            <strong>Inspection Date:</strong>{" "}
            {formatDate(vehicle.vehicleInspection)}
          </p>
          <p className="col-span-2">
            <strong>Status:</strong> {vehicle.status}
          </p>
        </div>
      )}
      <p className="text-center text-gray-600 mb-4 text-sm">
        Enter new values for the fields you want to update.
      </p>
      <form
        onSubmit={handleUpdateVehicle}
        className="grid grid-cols-1 sm:grid-cols-2 gap-2"
      >
        <FormInputField
          label="Brand"
          name="brand"
          value={formData.brand || ""}
          onChange={handleInputChange}
          required={false}
          error={vehicleErrors.brand}
        />
        <FormInputField
          label="Model"
          name="model"
          value={formData.model || ""}
          onChange={handleInputChange}
          required={false}
          error={vehicleErrors.model}
        />
        <FormInputField
          label="License Plate"
          name="licensePlate"
          value={formData.licensePlate || ""}
          onChange={handleInputChange}
          required={false}
          error={vehicleErrors.licensePlate}
        />
        <FormInputField
          label="Capacity"
          type="number"
          name="capacity"
          value={formData.capacity || ""}
          onChange={handleInputChange}
          required={false}
          error={vehicleErrors.capacity}
        />
        <SelectField
          label="Type"
          name="type"
          value={formData.type || ""}
          placeholder="Select vehicle type"
          onChange={handleInputChange}
          required={false}
          options={[
            { value: "car", label: "Car" },
            { value: "truck", label: "Truck" },
            { value: "van", label: "Van" },
            { value: "motorcycle", label: "Motorcycle" },
            { value: "bus", label: "Bus" },
          ]}
        />
        <SelectField
          label="Status"
          name="status"
          value={formData.status || ""}
          onChange={handleInputChange}
          placeholder="Select status"
          required={false}
          options={[
            { value: "available", label: "Available" },
            { value: "occupied", label: "Occupied" },
            { value: "service", label: "Service" },
          ]}
        />
        <FormInputField
          label="Vehicle Inspection Date"
          name="vehicleInspection"
          type="date"
          value={formData.vehicleInspection || ""}
          onChange={handleInputChange}
          required={false}
          error={vehicleErrors.vehicleInspection}
        />
        <div className="col-span-1 sm:col-span-2 flex justify-end">
          <SubmitButton>Update Vehicle</SubmitButton>
        </div>
      </form>
    </div>
  );
};

export default EditVehicleForm;
