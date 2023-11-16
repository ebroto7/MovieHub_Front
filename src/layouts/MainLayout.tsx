import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/footer/Footer";

export const MainLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}