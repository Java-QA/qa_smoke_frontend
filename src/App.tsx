import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Login from './pages/Login';
import Register from './pages/Register';
import WishLists from './pages/WishLists';
import WishListDetail from './pages/WishListDetail';
import Users from './pages/Users';
import UserWishlists from './pages/UserWishlists';
import 'bootstrap/dist/css/bootstrap.min.css';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
    return (
        <Router>
            <Navigation />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/wishlists"
                    element={
                        <PrivateRoute>
                            <WishLists />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/wishlists/:id"
                    element={
                        <PrivateRoute>
                            <WishListDetail />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/users"
                    element={
                        <PrivateRoute>
                            <Users />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/users/:userId/wishlists"
                    element={
                        <PrivateRoute>
                            <UserWishlists />
                        </PrivateRoute>
                    }
                />
                <Route path="/" element={<Navigate to="/wishlists" />} />
            </Routes>
        </Router>
    );
};

export default App;
