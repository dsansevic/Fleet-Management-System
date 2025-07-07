// Based on a Flowbite component (https://flowbite.com) - MIT License
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 mt-8 px-6 bg-gradient-to-b from-white/80 to-transparent dark:from-gray-900/80 z-10">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <img
                src="../images/logo_icon.png"
                class="h-8 me-3"
                alt="FleetFlow Logo"
              />
              <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                FleetFlow
              </span>
            </div>
            <div className="flex flex-col text-text-secondary pt-2 text-md">
              <p>Ruđera Boškovića 32, 21000 Split, Croatia</p>
              <p>info@fleetflow.hr</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <ul className="text-gray-500 dark:text-gray-400 font-medium space-y-4">
                <li>
                  <Link to="/about" className="hover:underline">
                    About
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/privacy-policy" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms&conditions" className="hover:underline">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-6" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2025 FleetFlow
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <Link
              to="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 8 19"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                  clip-rule="evenodd"
                />
              </svg>
              <span className="sr-only">Facebook page</span>
            </Link>

            <Link
              to="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M5.92 6H20.58L27.28 19.62L39.03 6H42.2L28.68 21.67L44 44H31.99L21.99 29.42L9.41 44H6.23L20.58 27.38L5.92 6ZM9.72 8L16.88 8L40.2 42H33.04L9.72 8Z" />
              </svg>
              <span className="sr-only">X (Twitter) page</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
