import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../../styles/Navbar.css'

function Navbar({ user, setUser }) {
    const [openLinks, setOpenLinks] = useState(false);

    const toggleNavbar = () => {
        setOpenLinks(!openLinks);
    };

    function handleLogout() {
        fetch("/logout", {
            method: "DELETE"
        })
            .then((r) => {
                if (r.ok) {
                    setUser(null)
                }
            })
    }

    return (
        <>
            <div className="navbar">
                <div className="leftSide" id={openLinks ? "open" : "close"}>
                    <h1>DOGHOUSES-AIRBNB</h1>

                    {user ? (
                        <div className="rightSide">
                            <Link to="/"> Home </Link>
                            <Link to="/about"> About </Link>
                            <Link>
                                <button onClick={handleLogout}>Logout</button>
                            </Link>
                        </div>
                    ) : (
                        <div className="rightSide">
                            <Link to="/"> Home </Link>
                            <Link to="/about"> About </Link>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                            <button onClick={toggleNavbar}>

                            </button>
                        </div>
                    )}

                </div>

            </div>
        </>
    );
}

export default Navbar;
