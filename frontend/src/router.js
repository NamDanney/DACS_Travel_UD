import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LocationListPage from './pages/LocationListPage';
import LocationDetailPage from './pages/LocationDetailPage';
import PlanPage from './pages/PlanPage';
import ItineraryDetail from './components/ItineraryDetail/ItineraryDetail';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import PrivateRoute from './components/auth/PrivateRoute';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AdminLayout from './components/admin/layout/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import UserManagement from './pages/admin/UserManagement';
import LocationManagement from './pages/admin/LocationManagement';
import TourManagement from './pages/admin/TourManagement';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/locations" element={<LocationListPage />} />
            <Route path="/locations/:id" element={<LocationDetailPage />} />
            <Route path="/plan" element={<PlanPage />} />
            <Route path="/itinerary/:id" element={<ItineraryDetail />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route
                path="/profile"
                element={
                <PrivateRoute>
                    <ProfilePage />
                </PrivateRoute>
                }
            />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="locations" element={<LocationManagement />} />
                <Route path="tours" element={<TourManagement />} />

            </Route>
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
        </Routes>
    );
};

export default AppRouter;