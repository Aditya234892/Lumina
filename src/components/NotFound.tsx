import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-gray-900 text-white">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl mb-4">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="text-blue-400 hover:text-blue-600">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
    