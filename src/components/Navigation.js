import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { authService } from 'firebaseConfig';
const Navigation = ({ userObj }) => {
    console.log("Log from Navigation", userObj);
    useEffect(() => {
        console.log("Navigation is rerendered", userObj);
        console.log("Navigation is rerendered", authService.currentUser);
    }, [userObj])
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/profile">{userObj.displayName}의 Profile</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;