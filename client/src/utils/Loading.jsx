import fleetflowLogo from '@assets/logo.png';

const Loading = () => {
    return(
        <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
            <div className="text-center">
                <img src={fleetflowLogo} alt="FleetFlow" className="h-7 w-auto " />
                <p className="mt-4 text-lg font-semibold text-gray-700">Loading...</p>
            </div>
        </div>
    )
}

export default Loading;