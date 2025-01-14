import { useState } from "react";
import SelectField from "@components/form/SelectField";
import Button from "@components/ui/Button"; 

function FilterDamageReports({ reports, setFilteredReports }) {
    const [filterVehicle, setFilterVehicle] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [filterTime, setFilterTime] = useState("");

    const handleFilterChange = () => {
        let filtered = reports;

        if (filterVehicle) {
            filtered = filtered.filter(report => 
                report.reservation?.vehicle?.licensePlate === filterVehicle
            );
        }

        if (filterStatus) {
            filtered = filtered.filter(report => report.status === filterStatus);
        }

        if (filterTime) {
            const now = new Date();
            filtered = filtered.filter(report => {
                const reportDate = new Date(report.createdAt);
                return now - reportDate <= filterTime * 24 * 60 * 60 * 1000; 
            });
        }

        setFilteredReports(filtered);
    };

    const resetFilters = () => {
        setFilterVehicle("");
        setFilterStatus("");
        setFilterTime("");
        setFilteredReports(reports);
    };

    return (
        <div className="flex flex-row gap-4">
            <div className="flex gap-4 items-end">
                <SelectField
                    label="Vehicle"
                    name="vehicle"
                    value={filterVehicle}
                    onChange={(e) => setFilterVehicle(e.target.value)}
                    options={reports
                        .map(report => ({
                            value: report.reservation?.vehicle?.licensePlate,
                            label: `${report.reservation?.vehicle?.brand} ${report.reservation?.vehicle?.model}`,
                        }))
                        .filter((v, i, a) => a.findIndex(t => t.value === v.value) === i)} // Remove duplicates
                    placeholder="Select vehicle"
                />
                <SelectField
                    label="Status"
                    name="status"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    options={[
                        { value: "", label: "All Statuses" },
                        { value: "pending", label: "Pending" },
                        { value: "in progress", label: "In Progress" },
                        { value: "resolved", label: "Resolved" },
                    ]}
                    placeholder="Select status"
                />
                <SelectField
                    label="Time Period"
                    name="time"
                    value={filterTime}
                    onChange={(e) => setFilterTime(e.target.value)}
                    options={[
                        { value: "", label: "All Time" },
                        { value: 7, label: "Last 7 Days" },
                        { value: 30, label: "Last Month" },
                        { value: 365, label: "Last Year" },
                    ]}
                    placeholder="Select time period"
                />
                <div className="flex gap-2">
                    <Button onClick={handleFilterChange} label = "Apply Filters" className="bg-brand-base" />
                    <Button onClick={resetFilters} label = "Reset Filters" />
                </div>
            </div>
        </div>
    );
}

export default FilterDamageReports;