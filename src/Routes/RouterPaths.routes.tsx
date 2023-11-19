import { BrowserRouter, Routes, Route } from "react-router-dom"
import { HOME, PRIVATE, USER, USERID,MOVIE, DETAIL } from "./paths";
import PrivateRoutes from "./PrivateRoutes";
import { MainLayout } from "../layouts/MainLayout";
import HomePage  from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import DetailPage from "../pages/DetailPage"


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
                            <Route path={MOVIE}>
                                <Route path={DETAIL} element={<DetailPage />} />
                            </Route>
                            <Route path={PRIVATE} element={
                                <PrivateRoutes>
                                    <UserPage />
                                </PrivateRoutes>
                            } />
                        </Route>

                    </Routes>
                </BrowserRouter>
            </UserProvider>
        </APIGenreProvider>
        // </MovieProvider> 
    )
}