import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faUsers,
  faCalendarCheck,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

const features = [
  {
    icon: faUsers,
    title: "Add Your Employees",
    description:
      "Invite employees to your company and manage their access easily.",
  },
  {
    icon: faCar,
    title: "Manage Your Vehicles",
    description: "Track, update and assign company vehicles to employees.",
  },
  {
    icon: faCalendarCheck,
    title: "Approve Reservations",
    description:
      "Easily review and approve vehicle reservations from your employees.",
  },
  {
    icon: faExclamationTriangle,
    title: "Report Issues",
    description:
      "Employees can submit damage reports to keep your fleet in top shape.",
  },
];

const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen w-full">
      <header className="bg-brand-dark text-white text-center py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold leading-tight">
            Fleet Management Made Simple
          </h1>
          <p className="mt-4 text-lg text-gray-200">
            Add your company, manage employees, track vehicles, and approve
            reservations – all in one place.
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <Link
              to="/signup"
              className="px-6 py-3 bg-white text-brand-dark text-xl font-medium rounded-lg shadow hover:bg-gray-200"
            >
              Register Your Company
            </Link>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto my-16 px-6">
        <p className="text-gray-600 text-2xl font-medium text-center">
          FleetFlow makes managing your company fleet simple with these key
          features:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white shadow-md rounded-lg text-center"
            >
              <FontAwesomeIcon
                icon={feature.icon}
                className="text-4xl text-brand-dark"
              />
              <h3 className="text-lg font-semibold mt-3">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </div>
          ))}
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
