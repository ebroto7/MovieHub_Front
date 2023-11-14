import { BrowserRouter, Routes, Route } from "react-router-dom"

import { HomePage } from "../pages/HomePage";


import {  HOME  } from "./paths";



export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={HOME} element={<HomePage />} />


                {/* <Route path={PRIVATE} element={
                    <PrivateRoutes>
                        <CheckoutPage />
                    </PrivateRoutes>
                } /> */}
            </Routes>
        </BrowserRouter>
    )
}