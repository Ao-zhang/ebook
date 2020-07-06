import React from 'react';
import {Layout, Breadcrumb, Card, Row, Col, InputNumber, Button, Descriptions, message, PageHeader} from "antd";
import {add_to_Cart, getBook} from "../services/BookService";
import {PlusOutlined,MinusOutlined } from '@ant-design/icons';
import Sidebars from "../Component/Sidebars";

const { Sider, Footer, Content } = Layout;
const { Meta } = Card;

class Bookdetail extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            // bookid: "0",
            bookinfo: {},
            buynum:1,
            collapsed:false
        }
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    callback=(data)=>{
        debugger;
        this.setState({bookinfo:data},()=>{console.log(data)});
    }
    componentWillMount() {
        // debugger;
        // let bookinfo=this.props.location.bookinfo;
        let book_id=this.props.match.params.id ;
        // this.setState({bookinfo:bookinfo},()=>{console.log(this.state.bookinfo)});
        getBook(book_id,this.callback);
    }
    onChange=(value)=>{
        this.setState({buynum:value},()=>{console.log(this.state.buynum)});
    }
    onAdd=()=>{
        let n_num=this.state.buynum+1;
        this.setState({buynum:n_num},()=>(console.log("+1")));
    }
    onMinus=()=>{
        let n_num=this.state.buynum-1;
        if(n_num>=1)
            this.setState({buynum:n_num},()=>(console.log("-1")));
        else message.error("数量不能再减了哦！");
    }
    onAddtoCart=()=>{
        debugger;
        if(this.state.book_num==0)
            return;
        let u=localStorage.getItem("user");
        let user=JSON.parse(u);
        let cart=user.carts;
        let index=cart.findIndex(it=>it.b_id===this.state.bookinfo.b_id);
        let book_num=this.state.buynum;
        if(index>=0){
            book_num+=cart[index].book_num;
            cart[index].book_num=book_num;
        }
        else{
            cart.push({u_id:user.u_id,b_id:this.state.bookinfo.b_id,book_num:book_num});
        }

        user.carts=cart;
        localStorage.setItem("user",JSON.stringify(user));
        message.success("添加成功！");
        // this.setState({cart:cart});
    }
    render() {
        debugger;

        return (
            <Layout className="layout">
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <Sidebars
                        collapsed={this.state.collapsed}
                        toggle={this.toggle}
                        index={'1'}
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
                        title={"书籍详情"}
                        subTitle={"不近人情，举世皆畏途；不察物情，一生俱梦境"}
                    />
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>{this.state.bookinfo.b_title}</Breadcrumb.Item>
                    </Breadcrumb>
                    <Row justify="center">
                        <Col span={5} >
                            <Card hoverable
                                  bordered
                                  cover={<img alt="example" src={this.state.bookinfo.img_src} className={'bookImg'}/>}
                                  className={'BookCards'}

                            >
                                <Meta description={this.state.bookinfo.author} /></Card>
                        </Col>
                        <Col span={8} offset={3}>
                            <Descriptions title={"详情"}  column={1}>
                                <Descriptions.Item label="简述">{this.state.bookinfo.description}</Descriptions.Item>
                                <Descriptions.Item label="分类">{this.state.bookinfo.category}</Descriptions.Item>
                                <Descriptions.Item label="库存">{this.state.bookinfo.store_num}</Descriptions.Item>
                                <Descriptions.Item label="价格">{this.state.bookinfo.price}</Descriptions.Item>
                                <div className="MenuCartcontrol">
                                    <Button type="primary" shape="circle"  size="large" icon={<MinusOutlined/>} onClick={this.onMinus}/>
                                    <InputNumber min={0} max={this.state.bookinfo.store_num} onChange={this.onChange} value={this.state.buynum}/>
                                    <Button type="primary" shape="circle"  size="large" icon={<PlusOutlined/>} onClick={this.onAdd}/>
                                </div>
                                <br/>
                                <div className="MenuCartcontrol">
                                    <Button type="primary" shape="round"  size="large" onClick={this.onAddtoCart}>加入购物车</Button>
                                </div>
                            </Descriptions>
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

export default Bookdetail;
