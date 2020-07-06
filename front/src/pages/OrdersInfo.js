import React from 'react';
import {Layout,  PageHeader} from "antd";
import Sidebars from "../Component/Sidebars";
import "../css/UsersInfo.css";
import OrderTable from "../Component/OrderTable";
const { Sider, Footer, Content } = Layout;

class OrdersInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            collapsed:false,
        };
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        debugger;

        return (
            <Layout className="layout">
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <Sidebars
                        collapsed={this.state.collapsed}
                        toggle={this.toggle}
                        index={this.props.match.params.type==0?'6':'7'}
                    />
                </Sider>
                <Content  style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 780,
                }}>
                    <PageHeader
                        className="site-page-header"
                        onBack={() => window.history.back()}
                        title={this.props.match.params.type==0?"您的订单信息":"订单信息"}
                        subTitle={this.props.match.params.type==0?"书籍是人类进步的阶梯":"check orders"}
                    />
                           <OrderTable type={this.props.match.params.type}/>


                    <Footer style={{ textAlign: 'center' }}>
                        ©e-Book<br/>云墨阁
                    </Footer>
                </Content>
            </Layout>
        );
    }
}
export default OrdersInfo;
