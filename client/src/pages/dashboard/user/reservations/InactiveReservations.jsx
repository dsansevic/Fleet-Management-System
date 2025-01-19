import { fetchInactiveReservations } from "@api/reservations";
import ReservationsList from "./ReservationsList";

const InactiveReservations = () => {
    return (
        <ReservationsList
            title="Inactive Reservations"
            description="Here you can find a list of all your past reservations, including completed, 
                         canceled, rejected, or unresolved ones. You can check reservation details, 
                         but editing or reactivating them isn't possible."
            fetchFunction={fetchInactiveReservations}
            storageKey="inactiveReservationsPage"
            emptyMessage = "No inactive reservations at the moment."
        />
    );
};

export default InactiveReservations;