import React from 'react';
import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
    children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
    const token = localStorage.getItem('token');

    if (token) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default PublicRoute;