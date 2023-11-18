import { BrowserRouter, Routes, Route } from "react-router-dom"
import { HOME, PRIVATE, USER, USERID } from "./paths";
import PrivateRoutes from "./PrivateRoutes";
import { MainLayout } from "../layouts/MainLayout";
import { HomePage } from "../pages/HomePage";
import UserPage from "../pages/UserPage";

import { APIGenreProvider } from "../context/genreContext/genreContext";
import { MovieProvider } from "../context/moviesContext/MoviesContext";
import { UserProvider } from "../context/userContext/UserContext";

export function Router() {
    return (
        // <MovieProvider>
        <APIGenreProvider>
            <UserProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path={"/"} element={<MainLayout />}>
                            <Route index path={HOME} element={<HomePage />} />
                            <Route path={USER} element={<UserPage />} />
                            <Route path={PRIVATE} element={
                                <PrivateRoutes>
                                    <UserPage />
                                </PrivateRoutes>
                            } />
                        </Route>



                        <Route path={PRIVATE} element={
                            <PrivateRoutes>
                                <UserPage />
                            </PrivateRoutes>
                        } />
                        {/* <Route path={PRIVATE} element={
                        <PrivateRoutes>
                        <CheckoutPage />
                        </PrivateRoutes>
                    } /> */}
                    </Routes>
                </BrowserRouter>
            </UserProvider>
        </APIGenreProvider>
        // </MovieProvider> 
    )
}