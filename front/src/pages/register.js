import React from 'react';
import RegistrationForm from "../Component/Registerform";
import {withRouter} from "react-router-dom";
import "../css/login.css";

class Register extends React.Component{

    render() {
        return (
            <div className="lg-page">
                <div className="lg-container">
                    <div className="lg-box">
                        <h1 className="lg-title">Register</h1>
                        <div className="lg-content">
                            <RegistrationForm/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Register);
