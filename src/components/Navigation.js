import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { authService } from 'firebaseConfig';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ userObj }) => {
    console.log("Log from Navigation", userObj);
    useEffect(() => {
        console.log("Navigation is rerendered", userObj);
        console.log("Navigation is rerendered", authService.currentUser);
    }, [userObj])
    return (
        <nav>
            <ul style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
                <li>
                    <Link style={{ marginRight: 10 }} to="/"><FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" /></Link>

                </li>
                <li>
                    <Link style={{
                        marginLeft: 10,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        fontSize: 12,
                    }}
                        to="/profile"><FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
                        <span style={{ marginTop: 10 }}>
                            {userObj.displayName
                                ? `${userObj.displayName}의 Profile`
                                : "Profile"}
                        </span></Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;