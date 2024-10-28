import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const Home: React.FC = () => {
    const cookies = new Cookies(null, { path: '/' });
    const accessToken = cookies.get("accessToken");
    return (
        accessToken ? 
        <div className="container mt-5 text-center">
            <h1>Welcome</h1>
            <Link to="/" className="btn btn-primary btn-lg mt-3">
                This is your home page
            </Link>
        </div>
        : <Navigate to="/login"/>
    );
};

export default Home;
