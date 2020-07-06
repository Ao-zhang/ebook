import React from 'react';
import {Layout,PageHeader,Row, Col,Card,Button,Descriptions} from "antd";
import Sidebars from "../Component/Sidebars";
import "../css/personal.css";
import UpAvatar from "../Component/userAvatar";
import * as UserService from "../services/UserService";
import PersonInfo from "../Component/PersonInfo";

const {  Footer, Sider, Content } = Layout;
const { Meta } = Card;


class Personal extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            user:{},
            collapsed:false,
            editAvatar:false,
            editInfo:false
        }
        this.handleAvatarCommit=this.handleAvatarCommit.bind(this);
    }
    componentDidMount() {
        let u =localStorage.getItem('user');
        let user=JSON.parse(u);
        debugger;
        this.setState({user:user},()=>{console.log(user)});
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    handleAvatarCommit=(avatar)=>{
        let data={u_id:this.state.user.u_id,avatar:avatar};
        UserService.upLoadAvatar(data);
        this.onCancleAvatar();
    }
    handleInfoCommit=(data)=>{
        UserService.upLoadInfo(data);
        this.onCancleInfo();
    }

    onEditAvatar=()=>{
        this.setState({editAvatar:true});
    }
    onCancleAvatar=()=>{
        this.setState({editAvatar:false});
    }
    onEditInfo=()=>{
        this.setState({editInfo:true});
    }
    onCancleInfo=()=>{
        this.setState({editInfo:false});
    }

    render() {
        return(
            <div>
                <Layout>
                    <Layout >
                        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                            <Sidebars
                                collapsed={this.state.collapsed}
                                toggle={this.toggle}
                                index={'2'}
                            />
                        </Sider>
                        <Content className={"Personal Space"} style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 780,
                        }}>
                            <PageHeader
                                className="site-page-header"
                                onBack={() => window.history.back()}
                                title={this.state.user.u_nickname+"的个人空间"}
                                subTitle="Welcome to Personal Space!"
                            />
                            <Row justify="center">
                                <Col span={7} >
                                    {!this.state.editAvatar?(<Card hoverable
                                                                   bordered
                                                                   title={<b>当前头像</b>}
                                                                   cover={<img alt="example" src={this.state.user.avatar} className={'Avatar'}/>}
                                                                   className={'AvatarCard'}
                                    >
                                        <Button type={"primary"} shape="circle" className={"Editbutton"} onClick={this.onEditAvatar}>编辑</Button>
                                    </Card>):
                                        (
                                            <Card hoverable
                                               bordered
                                               title={<b>上传新的头像</b>}
                                               className={'InfoCard'}>
                                            <UpAvatar avatar={this.state.user.avatar}
                                                      handleCommit={this.handleAvatarCommit}
                                            />
                                            <Button type={"primary"} shape="circle" className={"Canclebutton"} onClick={this.onCancleAvatar}>取消</Button>
                                        </Card>
                                        )
                                    }
                                </Col>
                                <Col span={12} offset={2}>
                                    {!this.state.editInfo?(<Card hoverable
                                                                 bordered
                                                                 title={<b>个人信息</b>}
                                                                 className={'InfoCard'}>
                                        <Descriptions>
                                            <Descriptions.Item label="登录名">{this.state.user.u_name+" (不可更改)"}</Descriptions.Item>
                                            <Descriptions.Item label="昵称">{this.state.user.u_nickname}</Descriptions.Item>
                                            <Descriptions.Item label="手机">{this.state.user.u_phone}</Descriptions.Item>
                                            <Descriptions.Item label="邮箱">{this.state.user.u_email}</Descriptions.Item>
                                            <Descriptions.Item label="性别">{this.state.user.u_gender}</Descriptions.Item>
                                        </Descriptions>
                                        <Button type={"primary"} shape="circle" className={"Editbutton"} onClick={this.onEditInfo}>编辑</Button>
                                    </Card>):(<Card hoverable
                                                    bordered
                                                    title={<b>编辑个人信息</b>}
                                                    className={'InfoCard'}>
                                        <PersonInfo handleInfo={this.handleInfoCommit} user={this.state.user}/>
                                        <Button type={"primary"} shape="circle" className={"Canclebutton"} onClick={this.onCancleInfo}>取消</Button>
                                    </Card>)}

                                </Col>
                            </Row>

                            <Footer style={{ textAlign: 'center' }}>
                                ©e-Book<br/>云墨阁
                            </Footer>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default Personal;
