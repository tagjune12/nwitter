import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from '../routes/Home';
import Auth from '../routes/Auth';
import Navigation from "./Navigation";
import Profile from "routes/Profile";
import { useState } from "react";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {

    const [isPC, setIsPC] = useState(window.innerWidth >= 801);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 801);

    window.onresize = () => {

        if (window.innerWidth >= 801) {
            setIsPC(true);
            setIsMobile(false);
        } else {
            setIsPC(false);
            setIsMobile(true);
        }
    }

    return (
        <Router>
            {isLoggedIn && isMobile && <Navigation userObj={userObj} />}
            <div style={
                {
                    maxWidth: 890,
                    width: "100%",
                    margin: "0 auto",
                    marginTop: 80,
                    display: "flex",
                    justifyContent: "center",
                }
            }>
                {isLoggedIn && isPC && <Navigation userObj={userObj} />}
                <Routes>
                    {isLoggedIn ?
                        (<>
                            <Route path="/" element={<Home userObj={userObj} />} />
                            <Route path="/profile" element={<Profile refreshUser={refreshUser} userObj={userObj} />} />
                        </>) : (<>
                            <Route path="" element={<Auth />} />
                        </>)}
                </Routes>
            </div>
        </Router>
    )

}

export default AppRouter;