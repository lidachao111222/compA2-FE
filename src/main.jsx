// eslint-disable-next-line no-unused-vars
import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import router from "./utils/Router";
import { Provider } from "jotai";
import '@smastrom/react-rating/style.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {console.log("Hi there! This is an Easter egg! Welcome to our website :)")}
    <Provider>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
