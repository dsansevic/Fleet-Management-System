import { Droppable } from "@hello-pangea/dnd";

const SelectedVehicle = ({ selectedVehicle }) => {
  return (
    <Droppable droppableId="selectedVehicle">
      {(provided) => (
        <div
          className="mt-6 p-6 border-2 border-dashed border-gray-300 rounded-base bg-gray-50 text-center"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {selectedVehicle ? (
            <div className="p-4 bg-green-100 rounded-base shadow-md">
              <h3 className="text-lg font-semibold">
                {selectedVehicle.brand}, {selectedVehicle.model}
              </h3>
              <p className="text-gray-700 text-sm">
                {selectedVehicle.type} ({selectedVehicle.capacity} seats)
              </p>
            </div>
          ) : (
            <p className="text-gray-500">Drag a vehicle here to assign it</p>
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default SelectedVehicle;
