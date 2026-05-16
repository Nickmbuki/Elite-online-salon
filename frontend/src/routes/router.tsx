import { createBrowserRouter, Outlet, ScrollRestoration } from "react-router-dom";
import { Footer } from "../components/Footer";
import { InstallPrompt } from "../components/InstallPrompt";
import { Navbar } from "../components/Navbar";
import { BookingPage } from "../pages/BookingPage";
import { AppErrorPage } from "../pages/AppErrorPage";
import { HomePage } from "../pages/HomePage";
import { SharePage } from "../pages/SharePage";

function RootLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <InstallPrompt />
      <ScrollRestoration />
    </>
  );
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <AppErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/booking",
        element: <BookingPage />
      },
      {
        path: "/share",
        element: <SharePage />
      }
    ]
  }
]);
