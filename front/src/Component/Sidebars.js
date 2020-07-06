import React from "react";
import {Avatar, Menu,Button} from 'antd';
// import {  MailOutlined, PlusCircleFilled,MinusCircleFilled } from '@ant-design/icons';
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    ShoppingOutlined,
    ShoppingCartOutlined,
    SettingOutlined,
    CopyOutlined,
    ReconciliationOutlined,
    IdcardOutlined,
    LoginOutlined,
    PieChartOutlined,
    AreaChartOutlined
    } from '@ant-design/icons';
import logo from "../assets/logo.svg";
import logoFont from "../assets/logo-name.svg";
import * as UserSER from "../services/UserService";
import {Link} from "react-router-dom";


class Sidebars extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            avatar:"",
            u_name:"",
            u_type:0,
            collapsed:false
        }
    }
    componentDidMount() {
        debugger;
        let user=JSON.parse(localStorage.getItem("user")) ;
        debugger;
        let u_name=user.u_nickname;
        let avatar=user.avatar;
        let type=user.u_type;
        this.setState({u_name:u_name,avatar:avatar,u_type:type},()=>{console.log(user)});
    }

    render() {

        return (
            <div>
                <Button type="primary" onClick={this.props.toggle} style={{ marginBottom: 16 }}>
                    {React.createElement(this.props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                </Button>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={[this.props.index]}>
                    <div className="logo">
                            <img alt="logo" src={logo} style={{height: 45}}/>
                            {!this.props.collapsed ? <img alt="Book Store" src={logoFont} style={{height: 40}}/> : null}

                    </div>
                    <Menu.Item key="1"
                               icon={<AppstoreOutlined />}>
                        <Link to={"/"}>
                            首页
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2"
                               icon={<UserOutlined/>}>
                               {/*// icon={<Avatar src={this.state.avatar} icon={<UserOutlined/>} style={{cursor: "pointer"}}/>}>*/}
                        <Link to={"/personal"}>
                            {this.state.u_name}的个人空间
                        </Link>
                    </Menu.Item>
                    {this.state.u_type>0?
                        (<Menu.Item key="3" icon={<IdcardOutlined />}>
                                <Link to={"/usersinfo"}>  用户管理</Link>
                            </Menu.Item>
                        ):null
                    }
                    {this.state.u_type==0?
                        (<Menu.Item key="4" icon={<ShoppingCartOutlined/>}>
                               <Link to={"/mycart"}> 购物车</Link>
                            </Menu.Item>
                        ):<Menu.Item key="5" icon={<CopyOutlined />}>
                            <Link to={"/changebooks"}>  书籍管理</Link>
                        </Menu.Item>
                    }
                    {this.state.u_type==0?
                        (<Menu.Item key="6" icon={<ShoppingOutlined/>}>
                                <Link to={"/ordersinfo/"+0}>   订单</Link>
                            </Menu.Item>
                        ):<Menu.Item key="7" icon={<ReconciliationOutlined />}>
                            <Link to={"/ordersinfo/"+1}>  订单管理</Link>
                        </Menu.Item>
                    }
                    {this.state.u_type==0?
                        (<Menu.Item key="8" icon={<PieChartOutlined />}>
                                <Link to={"/analyze/"+0}>   消费统计</Link>
                            </Menu.Item>
                        ):<Menu.Item key="9" icon={<AreaChartOutlined />}>
                            <Link to={"/analyze/"+1}>  销售统计</Link>
                        </Menu.Item>
                    }

                    {this.state.u_type==0?
                    (<Menu.Item key="10" icon={<SettingOutlined />}>
                            设置
                        </Menu.Item>
                    ):null
                    }
                    <Menu.Item key="11" icon={<LoginOutlined />}>
                        <a href='' onClick={UserSER.logout}>
                            退出登录
                        </a>
                    </Menu.Item>
                </Menu>
            </div>

        );
    }
}

export default Sidebars;
