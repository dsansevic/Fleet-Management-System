import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCar, faUsers, faCalendarCheck, faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";
import Title from "@components/ui/Title";

const HomePage = () => {
    return (
        <div className="bg-gray-100 min-h-screen w-full">
            <header className="bg-brand-dark text-white text-center py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold leading-tight">
                        Fleet Management Made Simple
                    </h1>
                    <p className="mt-4 text-lg text-gray-200">
                        Add your company, manage employees, track vehicles, and approve reservations – all in one place.
                    </p>
                    <div className="mt-6 flex justify-center space-x-4">
                        <Link 
                            to="/signup"
                            className="px-6 py-3 bg-white text-brand-dark font-semibold rounded-lg shadow hover:bg-gray-200"
                        >
                            Register Your Company
                        </Link>
                        <Link 
                            to="/login"
                            className="px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-brand-base"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </header>

            <section className="max-w-6xl mx-auto my-16 px-6">
                <Title>How FleetFlow Helps You</Title>
                <p className="text-gray-600 text-center max-w-3xl mx-auto">
                    Manage your company fleet effortlessly with these powerful features:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
                    <div className="p-6 bg-white shadow-md rounded-lg text-center">
                        <FontAwesomeIcon icon={faUsers} className="text-4xl text-brand-dark" />
                        <h3 className="text-lg font-semibold mt-3">Add Your Employees</h3>
                        <p className="text-gray-600 mt-2">
                            Invite employees to your company and manage their access easily.
                        </p>
                    </div>
                    <div className="p-6 bg-white shadow-md rounded-lg text-center">
                        <FontAwesomeIcon icon={faCar} className="text-4xl text-brand-dark" />
                        <h3 className="text-lg font-semibold mt-3">Manage Your Vehicles</h3>
                        <p className="text-gray-600 mt-2">
                            Track, update, and assign company vehicles to employees.
                        </p>
                    </div>
                    <div className="p-6 bg-white shadow-md rounded-lg text-center">
                        <FontAwesomeIcon icon={faCalendarCheck} className="text-4xl text-brand-dark" />
                        <h3 className="text-lg font-semibold mt-3">Approve Reservations</h3>
                        <p className="text-gray-600 mt-2">
                            Easily review and approve vehicle reservations from your employees.
                        </p>
                    </div>
                    <div className="p-6 bg-white shadow-md rounded-lg text-center">
                        <FontAwesomeIcon icon={faExclamationTriangle} className="text-4xl text-brand-dark" />
                        <h3 className="text-lg font-semibold mt-3">Report Issues</h3>
                        <p className="text-gray-600 mt-2">
                            Employees can submit damage reports to keep your fleet in top shape.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-brand-light py-16 text-center">
                <h2 className="text-2xl font-bold text-gray-800">
                    Ready to Simplify Fleet Management?
                </h2>
                <p className="text-gray-600 mt-2">
                    Sign up today and take full control of your company vehicles.
                </p>
                <div className="mt-6">
                    <Link 
                        to="/signup"
                        className="px-6 py-3 bg-brand-dark text-white font-semibold rounded-lg shadow hover:bg-brand-darker"
                    >
                        Get Started
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
