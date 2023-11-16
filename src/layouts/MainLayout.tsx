import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import NavBarUI from "../components/navBar/NavBarUI";

export const MainLayout = () => {
    return (
        <>
            <NavBarUI />
            <Outlet />
            <Footer />
        </>
    )
}