import React from 'react';
import {Layout,  PageHeader} from "antd";
import Sidebars from "../Component/Sidebars";
import "../css/SaleAnalyze.css";
import SaleChart from "../Component/SaleChart";
import BuyChart from "../Component/BuyChart";
const { Sider, Footer, Content } = Layout;

class SaleAnalyze extends React.Component{
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
                        index={this.props.match.params.type=="0"?'8':'9'}
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
                        title={this.props.match.params.type==0?"您的消费统计":"销售统计"}
                        subTitle={this.props.match.params.type==0?"佳思忽来，书能下酒":"侠情一往，云可赠人"}
                    />
                    {

                        this.props.match.params.type!=0?
                            (<SaleChart/>)
                        :
                            (<BuyChart />)
                    }
                    <Footer style={{ textAlign: 'center' }}>
                        ©e-Book<br/>云墨阁
                    </Footer>
                </Content>
            </Layout>
        );
    }
}
export default SaleAnalyze;
