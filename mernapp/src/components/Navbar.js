import React from 'react'
import './Navbar1.css'; // Import CSS file


import '@fortawesome/fontawesome-free/css/all.css';
import {
    Link
} from 'react-router-dom'
import Background from './Background';
export default function Navbar() {
    return (
        <>
            <nav className="main-menu">
                <ul>
                    <li>
                        <Link to="/home">
                            <i className="fa fa-home nav-icon"></i>
                            <span className="nav-text">Home</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/Transactions">
                            <i className="fa fa-clock-rotate-left nav-icon"></i>
                            <span className="nav-text">Transactions</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/Transfer">
                            <i className="fa fa-money-bill-transfer nav-icon"></i>
                            <span className="nav-text">Transfer</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/vault">
                            <i className="fa fa-vault nav-icon"></i>
                            <span className="nav-text">Vault</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/Notifications">
                            <i className="fa fa-bell nav-icon"></i>
                            <span className="nav-text">Notification</span>
                        </Link>
                    </li>

                </ul>

                <ul className="logout">
                    <li>
                        <Link to="/profile">
                            <i className="fa fa-user nav-icon"></i>
                            <span className="nav-text">Profile</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="#">
                            <i className="fa fa-right-from-bracket nav-icon"></i>
                            <span className="nav-text">
                                Logout
                            </span>
                        </Link>
                    </li>
                </ul>
            </nav>


          
           
               
                
        </>
            );
}
