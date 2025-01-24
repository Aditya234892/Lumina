import { Outlet } from "react-router-dom";
import NavBar from "./Header";
import { Suspense } from "react";

const Layout: React.FC = () => {
  return (
    <div> 
         <Outlet />
         <Suspense fallback={<div> Loading...</div>}><NavBar/></Suspense>
    </div>
  )
}

export default Layout;
