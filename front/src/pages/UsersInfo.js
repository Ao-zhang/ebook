import React from 'react';
import {Layout, Table, Card, Row, Col, InputNumber, Button, Form, Input, PageHeader, message} from "antd";
import *as BookService from "../services/BookService";
import Sidebars from "../Component/Sidebars";
import {getBooks} from "../services/BookService";
import "../css/UsersInfo.css"
import UserTable from "../Component/UserTable";
const { Search } = Input;

const { Sider, Footer, Content } = Layout;



class UsersInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            pagesize:20,
            pagenum:1,
            usersinfo:[],
            collapsed:false,
            insert:false,
        };
        this.changePage=this.changePage.bind(this);
        // this.onFilterTextChange=this.onFilterTextChange.bind(this);
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    changePage=(current, pageSize)=>{
        debugger;
        this.setState({
            pagenum: current,
            pagesize:pageSize
        });
        const callback1=(data)=>{
            debugger;
            this.setState({booksinfo:data});
        }
        getBooks({"pagenum":current,"size":pageSize},callback1);
    }

    componentWillMount() {
        const callback=(data)=>{
            this.setState({booksinfo:data});
        }
        BookService.getBooks({"pagenum":this.state.pagenum,"size":this.state.pagesize},callback);
    }
    render() {
        debugger;

        return (
            <Layout className="layout">
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <Sidebars
                        collapsed={this.state.collapsed}
                        toggle={this.toggle}
                        index={'3'}
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
                        title={"管理人员信息"}
                        subTitle="Pay attention when you want to make changes"
                    />
                    <Row justify={"center"}>
                        <Col span={18}>
                            <UserTable/>
                        </Col>

                    </Row>
                    <Footer style={{ textAlign: 'center' }}>
                        ©e-Book<br/>云墨阁
                    </Footer>
                </Content>
            </Layout>
        );
    }
}
export default UsersInfo;
