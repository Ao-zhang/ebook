import React from 'react';
import Pagesfooter from "../Component/pagination";
 import ControlledCarousel from "../Component/Carousels";
import {Books} from "../Component/Books";
import Sidebars from "../Component/Sidebars";
import {Col, Input, Layout, message, Row} from "antd";
import {withRouter} from "react-router-dom";
import "../css/home.css";
import {getBooks, getCart, add_to_Cart, searchBooks} from "../services/BookService";
const {  Footer, Sider, Content } = Layout;
const { Search } = Input;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            userid:0,
            filterText:"",
            willbuybooks:[],
            numofbooks:[],
            booksinfo:[],
            pagesize:20,
            pagenum:1,
            collapsed:false,

        }
        this.toggle=this.toggle.bind(this);
        this.changePage=this.changePage.bind(this);
    }
    onSearch=(values)=>{
        this.setState({searchText:values,pagenum:1});
        console.log(values);
        debugger;
        let json={keyword:values,pagenum:1, size:this.state.pagesize};
        const callback=(data)=>{
            if(data.status){
                message.error("搜索失败");
            }
            else{
                debugger;
                if(data.length){
                    message.success("搜索成功");
                }
                else{
                    message.info("找不到您要的书名，请检查书名后重新输入")
                }
                this.setState({booksinfo:data});

            }
        };
        searchBooks(json,callback);

    }

    componentDidMount() {
        let u =localStorage.getItem('user');
        let user=JSON.parse(u);
        let id=user.u_id;
        debugger;
        this.setState({userid:id},()=>{console.log(user)});
        const callback1=(data)=>{
            debugger;
            this.setState({booksinfo:data});
        }
        getBooks({"pagenum":this.state.pagenum,"size":this.state.pagesize},callback1);
    }



    // handleAddToCart=(item,num)=>{
    //
    // }

    // onSubmitorder=()=>{
    //     const callback=(flag)=>{
    //         if(flag) console.log("add success");
    //         else console.log(("add failed"));
    //
    //     };
    //     const callback2=(data)=>{
    //         debugger;
    //         let willbuybooks=[];
    //         let numofbooks=[];
    //         for(let i=0;i<data.length;i++){
    //             debugger;
    //             willbuybooks.push({bookid:data[i].book_id,ordid: data[i].ord_id});
    //             numofbooks.push(data[i].book_num);
    //         }
    //         this.setState( {willbuybooks:willbuybooks,numofbooks:numofbooks});
    //     };
    //     let indents=[];
    //     // let nums=this.state.numofbooks;
    //     // let willbuy=this.state.willbuybooks;
    //     debugger;
    //     for(let i=0;i<this.state.willbuybooks.length;i++){
    //        if(this.state.numofbooks[i]>0){
    //            indents.push({
    //                             user_id: 1,
    //                             book_id: this.state.willbuybooks[i].bookid,
    //                             book_num: this.state.numofbooks[i],
    //                             address_id: 1,
    //                             status: 1,
    //                             totalPrice: null,
    //                             ord_id: 1
    //                         });
    //         }
    //     }
    //     add_to_Cart(indents,callback);
    //     getCart(this.state.userid,callback2);
    // }

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
    render() {
        return (
            <div>
                <Layout>
                    <Layout >
                        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                            <Sidebars
                                collapsed={this.state.collapsed}
                                toggle={this.toggle}
                                index={'1'}
                            />
                        </Sider>
                        <Content className={"homecontent"} style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 580,
                        }}>
                            <div className={"controlcarousel"}><ControlledCarousel/></div>
                            <br/>
                            <Row justify={"center"}>
                                <Col span={18}>
                                    <Search placeholder="input search text" onSearch={this.onSearch} enterButton/>
                                </Col>
                            </Row>
                            <br/>
                            <Books
                                   booksinfo={this.state.booksinfo}
                                   onAddtoCart={this.handleAddToCart}
                            />
                            <Footer >
                                <Pagesfooter pagenum={this.state.pagenum} size={this.state.pagesize} changePage={this.changePage}/>
                            </Footer>
                            <Footer style={{ textAlign: 'center' }}>
                                ©e-Book<br/>云墨阁
                            </Footer>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

export default withRouter(Home);
