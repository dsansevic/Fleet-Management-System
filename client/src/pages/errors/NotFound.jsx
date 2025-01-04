import { Link } from "react-router-dom";
import NotFoundImage from '@assets/not-found.png';

const NotFound = () => {

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-full bg-background p-6">
      <img 
        src={NotFoundImage} 
        className="w-10/12 md:w-5/12 max-w-md mb-6 md:mb-0 md:mr-8" 
        alt="Not Found" 
      />
      <div className="text-center md:text-left">
        <h1 className="text-4xl font-bold text-text-primary mb-4">Oops!</h1>
        <p className="text-lg text-text-secondary mb-6">
          It seems like the page you're looking for doesn't exist 🥺
        </p>
        <Link 
          to="/" 
          className="inline-block bg-slate-700 text-white px-4 py-2 rounded-md text-lg font-medium hover:bg-slate-600 transition-colors"
        >
          Go back to Home Page
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
