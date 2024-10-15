import { createBrowserRouter, ScrollRestoration } from 'react-router-dom';
import Registration from './pages/Registration/Registration';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home/Home';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Admin from './pages/Admin/Admin';
import StudentIdeas from './pages/StudentIdeas/StudentIdeas';
import Ideas from './pages/Ideas/Ideas';
import AdminRegistration from './pages/Registration/AdminRegistration';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Registration />,
        errorElement: <ErrorPage />
    },
    {
        path: '/home',
        errorElement: <ErrorPage />,
        element: (
            <>
                <ScrollRestoration />
                <Navbar />
                <Home />
                <Footer />
            </>
        )
    },
    {
        path: '/admin',
        errorElement: <ErrorPage />,
        element: (
            <>
                <ScrollRestoration />
                <Navbar />
                <Admin />
                <Footer />
            </>
        )
    },
    {
        path: '/studentideas/:studentId',
        errorElement: <ErrorPage />,
        element: (
            <>
                <ScrollRestoration />
                <Navbar />
                <StudentIdeas />
                <Footer />
            </>
        )
    },
    {
        path: '/ideas',
        errorElement: <ErrorPage />,
        element: (
            <>
                <ScrollRestoration />
                <Navbar />
                <Ideas />
                <Footer />
            </>
        )
    },
    {
        path: '/addAdmin',
        errorElement: <ErrorPage />,
        element: (
            <>
                <ScrollRestoration />
                <Navbar />
                <AdminRegistration />
                <Footer />
            </>
        )
    }
]);

export default router;