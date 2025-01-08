import { XMarkIcon } from '@heroicons/react/20/solid';

const ErrorMessage = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="bg-red-100 border border-red-400 text-error px-4 py-3 rounded relative mb-4" role="alert">
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{message}</span>
      <span 
        className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer"
        onClick={onClose}
      >
        <XMarkIcon className="h-6 w-6 text-error" aria-hidden="true" />
      </span>
    </div>
  );
};

export default ErrorMessage;