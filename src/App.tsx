import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import './App.css';

// Lazy-loaded components
const LoginSignUp = lazy(() => import('./components/LoginSignUp'));
const Layout = lazy(() => import('./components/Layout'));
const Home = lazy(() => import('./components/Home'));
const Search = lazy(() => import('./components/Search'));
const Profile = lazy(() => import('./components/Profile'));
const NotFound = lazy(() => import('./components/NotFound'));

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Suspense fallback={<div>Loading...</div>}><LoginSignUp /></Suspense>,
      errorElement: <Suspense fallback={<div>Loading...</div>}><NotFound /></Suspense>,
    },
    {
      path: "/Lumina",
      element: <Suspense fallback={<div>Loading...</div>}><Layout /></Suspense>,
      children: [
        { path: "", element: <Suspense fallback={<div>Loading...</div>}><Home /></Suspense> },
        { path: "search", element: <Suspense fallback={<div>Loading...</div>}><Search /></Suspense> },
        { path: "profile/:userId", element: <Suspense fallback={<div>Loading...</div>}><Profile /></Suspense> },
      ]
    },
    {
      path: "*", // Catch-all route for undefined paths
      element: <Suspense fallback={<div>Loading...</div>}><NotFound /></Suspense>
    }
  ]);

  return (
    <div className="w-[100vw] h-[100vh] bg-gray-800">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
