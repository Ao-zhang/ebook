import React from 'react';
import Loginform from "../Component/Loginform";
import {withRouter} from "react-router-dom";
import "../css/login.css";

class Login extends React.Component{

    render() {
        return (
            <div className="lg-page">
                <div className="lg-container">
                    <div className="lg-box">
                        <h1 className="lg-title">Login</h1>
                        <div className="lg-content">
                            <Loginform/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Login);