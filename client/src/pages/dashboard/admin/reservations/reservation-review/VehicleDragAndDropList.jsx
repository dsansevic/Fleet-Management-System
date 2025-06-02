import { Droppable, Draggable } from "@hello-pangea/dnd";

const VehicleDragAndDropList = ({ groupedVehicles, onDragEnd }) => {
  return (
    <Droppable droppableId="vehiclesList" direction="vertical">
      {(provided) => (
        <div
          className="p-4 bg-gray-50 rounded-base overflow-y-auto max-h-64 shadow-sm"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {Object.entries(groupedVehicles).map(([letter, groupedVehicles]) => (
            <div key={letter} className="mb-4">
              <div className="text-sm font-bold text-gray-800 mb-2">
                {letter}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {groupedVehicles.map((veh, index) => (
                  <Draggable
                    key={veh._id}
                    draggableId={veh._id}
                    index={index}
                    isDragDisabled={
                      veh.status === "occupied" || veh.status === "service"
                    }
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`p-2 rounded-base shadow-sm text-sm cursor-grab ${
                          veh.status === "occupied" || veh.status === "service"
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-gray-100 hover:shadow-lg border border-gray-200"
                        }`}
                      >
                        <h3 className="font-semibold">
                          {veh.brand}, {veh.model}
                        </h3>
                        <p className="text-gray-700 text-xs">
                          {veh.type} ({veh.capacity} seats)
                        </p>
                        {(veh.status === "occupied" ||
                          veh.status === "service") && (
                          <p className="text-error text-md font-bold capitalize">
                            {veh.status}
                          </p>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            </div>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default VehicleDragAndDropList;
