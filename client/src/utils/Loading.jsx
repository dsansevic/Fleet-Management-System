import fleetflowLogo from '@assets/logo.png';

const Loading = () => {
    return(
        <div className="flex flex-col items-center justify-center gap-4 h-screen w-auto">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-brand-dark rounded-full animate-spin"
            aria-hidden="true">
            </div>
            <img src={fleetflowLogo} alt="FleetFlow" className="h-4" />
        </div>
    )
}

export default Loading;