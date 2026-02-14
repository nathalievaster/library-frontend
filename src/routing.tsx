import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import BookDetailsPage from "./pages/BookDetailsPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/admin",
        element: <AdminPage />
    },
    {
        path: "/books/:id",
        element: <BookDetailsPage />
    }
])

export default router;