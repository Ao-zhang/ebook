import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import * as UserSER from './services/UserService';
import {message} from "antd";

class PersonRouter extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            haveAuth:false,
            appliedAuth:false
        };
    }

    checkAuth = (data) => {
        // debugger;
        console.log(data);
        if (data.status >= 0) {
            this.setState({haveAuth: true, appliedAuth: true});
        } else {
            message.error(data.info);
            localStorage.removeItem('user');
            this.setState({haveAuth: false, appliedAuth: true});
        }
    };

    componentDidMount() {
        // debugger;
        UserSER.checkSession(this.checkAuth);
    }

    render() {
        const {component: Component, path="/",exact=false,strict=false} = this.props;
        console.log(this.state.haveAuth);

        if (!this.state.appliedAuth) {
            return null;
        }
        return <Route path={path} exact={exact} strict={strict} render={props => (
            this.state.haveAuth ? (
                <Component {...props}/>
            ) : (
                <Redirect to={{
                    pathname: '/login',
                    state: {from: props.location}
                }}/>
            )
        )}/>
    }
}

export default PersonRouter;
