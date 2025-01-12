const Modal = ({ isOpen, onClose, title, content, actions }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-gray-800 bg-opacity-60 flex items-center justify-center z-50"
            onClick={onClose} 
        >
            <div
                className="bg-white rounded-lg p-6 w-96 space-y-4"
                onClick={(e) => e.stopPropagation()} 
            >
                <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                <div className="text-gray-600">{content}</div>
                <div className="flex justify-end space-x-4">
                    {actions.map((action, index) => (
                        <button
                            key={index}
                            className={action.className}
                            onClick={action.onClick}
                        >
                            {action.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Modal;