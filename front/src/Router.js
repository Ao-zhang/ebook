import React from 'react';
import {BrowserRouter as Router, Route, Switch,Redirect} from 'react-router-dom';
import Home from "./pages/home";
import Login from "./pages/Login";
import Register from "./pages/register";
import Bookdetail from "./pages/bookdetail";
import {history} from "./util/history";
import LoginRouter from "./loginRouter";
import PersonRouter from "./PersonRouter";
import Personal from "./pages/personal";
import ChangeBooks from "./pages/ChangeBooks";
import CartPage from "./pages/cart";
import UsersInfo from "./pages/UsersInfo";
import OrdersInfo from "./pages/OrdersInfo";
import SaleAnalyze from "./pages/SaleAnalyze";


class BasicRoute extends React.Component{
    // constructor(props) {
    //     super(props);
    // }
    render() {
        return (
            // <Provider store={store}>
                <Router history={history}>
                    <Switch>
                        <PersonRouter exact path="/" component={Home}/>
                        <PersonRouter exact path="/personal" component={Personal}/>
                        <PersonRouter exact path="/changebooks" component={ChangeBooks}/>
                        <PersonRouter exact path="/mycart" component={CartPage}/>
                        <PersonRouter exact path="/usersinfo" component={UsersInfo}/>
                        <PersonRouter  path="/ordersinfo/:type" component={OrdersInfo}/>
                        <PersonRouter  path="/analyze/:type" component={SaleAnalyze}/>
                        <PersonRouter  path="/bookdetail/:id" component={Bookdetail}/>
                        <LoginRouter exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                        <Redirect from="/*" to="/" />
                    </Switch>
                </Router>


        )
    }
}


export default BasicRoute;
