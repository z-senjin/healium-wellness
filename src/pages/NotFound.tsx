
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-primary-50 px-6">
      <div className="text-center glass-card p-12 max-w-md w-full">
        <span className="inline-block bg-primary-100 text-primary-800 px-4 py-1 rounded-full text-sm font-medium mb-6">
          Page Not Found
        </span>
        
        <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-primary-500 mb-6">
          404
        </h1>
        
        <p className="text-lg text-primary-800/80 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link to="/">
          <Button 
            className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 button-glow"
          >
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
