import { BrowserRouter, Routes, Route } from "react-router-dom"

import { HomePage } from "../pages/HomePage";


import { HOME } from "./paths";
import { MainLayout } from "../layouts/MainLayout";
import { APIGenreProvider } from "../context/genreContext";



export function Router() {
    return (
        <APIGenreProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route path={HOME} element={<HomePage />} />

                    </Route>


                    {/* <Route path={PRIVATE} element={
                    <PrivateRoutes>
                        <CheckoutPage />
                    </PrivateRoutes>
                } /> */}
                </Routes>
            </BrowserRouter>
        </APIGenreProvider>
    )
}