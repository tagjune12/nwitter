import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ userObj }) => {

    return (
        <nav >
            <ul className='navContainer'>
                <li className='navHome'>
                    <Link to="/"><FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" /></Link>

                </li>
                <li>
                    <Link className='navProfile'
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