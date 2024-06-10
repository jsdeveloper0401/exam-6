import React from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import App from "@/App";
import Login from "@components/login/login";
import Cars from "@components/cars/cars";
import Main from "@components/main/main";
import Photos from "@components/photos/photos";
import SingleCar from "@components/single-car/single-car";
import Product from "../components/product";
import Products from "../components/product";
const Index = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<App />}>
                <Route index element={<Login />} />
                <Route path="main/*" element={<Main />}>
                    <Route index element={<Cars />} />
                    <Route path="photos" element={<Photos />} />
                    <Route path="single-car" element={<SingleCar />} />
                    <Route path="products/:id" element={<Product />} />
                    <Route path="product/:id" element={<Products />} />
                </Route>
            </Route>
        )
    );

    return <RouterProvider router={router} />;
};

export default Index;
