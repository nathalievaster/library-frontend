import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import BookDetailsPage from "./pages/BookDetailsPage";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
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
                element: (
                    <ProtectedRoute>
                        <AdminPage />
                    </ProtectedRoute>)
            },
            {
                path: "/books/:id",
                element: <BookDetailsPage />
            }
        ]
    }
])

export default router;