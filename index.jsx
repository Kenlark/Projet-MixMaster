import { useState } from "react";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { loader as DrinksLoader } from "./src/pages/Drinks.jsx";

import SharedLayout from "./src/layout/SharedLayout.jsx";
import About from "./src/pages/About.jsx";
import Newsletter from "./src/pages/Newsletter.jsx";
import Drinks from "./src/pages/Drinks.jsx";

import ErrorPage from "./src/pages/ErrorPage.jsx";
import SingleDrinks, {
  loader as SingleDrinkLoader,
} from "./src/pages/SingleDrinks.jsx";

function ReactRouter() {
  const newsletterUrl = "https://www.course-api.com/cocktails-newsletter";

  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage />,
      element: <SharedLayout />,
      children: [
        {
          index: true,
          element: <Drinks />,
          loader: DrinksLoader,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "cocktail/:DrinkID",
          element: <SingleDrinks />,
          loader: SingleDrinkLoader,
        },
        {
          path: "newsletter",
          element: <Newsletter />,
          errorElement: <div>erreur</div>,
          action: async ({ request }) => {
            const formData = await request.formData();
            const data = Object.fromEntries(formData);

            console.log(data);

            try {
              const response = await fetch(newsletterUrl, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              });

              const resultat = await response.json();
              console.log(resultat);

              const email = document.querySelector('input[name="email"]').value;

              if (email !== "test@test.com") {
                return toast.error("only test email allowed");
              }

              toast.success("success, check your email");

              console.log(response);

              return redirect("/");
            } catch (error) {
              console.error("Erreur:", error);
              return redirect("/newsletter");
            }
          },
        },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer position="top-center" />
      <RouterProvider router={router} />
    </>
  );
}

export default ReactRouter;
