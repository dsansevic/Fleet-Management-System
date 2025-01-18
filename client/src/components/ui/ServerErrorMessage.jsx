import { XCircleIcon } from "@heroicons/react/20/solid";

const ServerErrorMessage = (error) => {
    return (
        <div className="flex items-center space-x-2 text-error bg-red-100 p-4 rounded-md">
            <XCircleIcon className="h-5 w-5" />
            <span>{error}</span>
        </div>
    )
}

export default ServerErrorMessage;