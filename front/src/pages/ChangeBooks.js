import React from 'react';
import {Layout, Table, Card, Row, Col, InputNumber, Button, Form, Input, PageHeader, message} from "antd";
import *as BookService from "../services/BookService";
import Sidebars from "../Component/Sidebars";
import {getBooks} from "../services/BookService";
import EditableTable from "../Component/BooklTable";
import "../css/ChangeBooks.css"
const { Search } = Input;

const { Sider, Footer, Content } = Layout;
const { Meta } = Card;


class ChangeBooks extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            pagesize:20,
            pagenum:1,
            booksinfo:[],
            collapsed:false,
            insert:false,
            bookimg:"",
            searchText: '',
        };
        this.changePage=this.changePage.bind(this);
        // this.onFilterTextChange=this.onFilterTextChange.bind(this);
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };
    onFinish = values => {
        debugger;
        console.log(values);
        if(this.state.bookimg!=""){
            let img_src=this.state.bookimg;
            this.setState({bookimg:""});
            values.img_src=img_src;
        }
        const callback=(data)=>{
            debugger;
            if(data!=null){
                message.success("书籍添加成功");

            }
            else{
                message.error("书籍添加失败，请之后重新尝试");
            }
        }
        BookService.insertBooks(values,callback);
        this.setState({insert:false});
    };

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
        BookService.searchBooks(json,callback);

    }


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

    handleImgChange=(e)=>{
        debugger;
        let reader=new FileReader();
        let file=e.target.files[0];

        reader.readAsDataURL(file);
        reader.onloadend=()=>{
            debugger;
            let img=reader.result;
            this.setState({bookimg:img});
        }
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
                        index={'5'}
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
                        title={"管理书籍信息"}
                        subTitle="Pay attention when you want to make changes"
                    />
                    <Row justify="left">
                        <Button type={"primary"} onClick={()=>{this.setState({insert:!this.state.insert});}}>
                            {!this.state.insert?"添加新书":"返回列表"}
                        </Button>
                    </Row>
                    <br/>
                    <br/>
                    <Search placeholder="input search text" onSearch={this.onSearch} enterButton/>
                    <Row justify="center" >
                    {
                        !this.state.insert?
                            (
                                    <Col span={24}>
                                        <EditableTable booksinfo={this.state.booksinfo}
                                                       current={this.state.pagenum}
                                                       pagesize={this.state.size}
                                                       changepage={this.changePage}/>
                                        {/*<Ceishi/>*/}
                                    </Col>
                            ):
                            (
                                <Card>
                                    <Form {...this.layout} name="nest-messages" onFinish={this.onFinish} >
                                        <Form.Item
                                            name="b_title"
                                            label="书名"
                                            rules={[
                                                {
                                                    required: true,message: 'Please input book name!', whitespace: true
                                                },
                                            ]}
                                        >
                                            <Input placeholder={"Input Book name like 小王子"}/>
                                        </Form.Item>
                                        <Form.Item
                                            name={"category"}
                                            label="类别"
                                            rules={[
                                                {
                                                    required: true,message: 'ISBN of this book!', whitespace: true
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name={"author"}
                                            label="作者"
                                            rules={[
                                                {
                                                    required: true,message: 'The Author of the book!', whitespace: true
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name="price"
                                            label="单价"
                                            rules={[
                                                {
                                                    type:"number",
                                                    required: true,message: 'The Price of the book!', whitespace: true
                                                },
                                            ]}
                                        >
                                            <InputNumber />
                                        </Form.Item>
                                        <Form.Item
                                            name={"store_num"}
                                            label="库存"
                                            rules={[
                                                {
                                                    type:"number",
                                                    required: true,message: 'The store number of the book!', whitespace: true
                                                },
                                            ]}
                                        >
                                            <InputNumber />
                                        </Form.Item>
                                        <Form.Item
                                            name={'img_src'}
                                            label={"封面图"}
                                            rules={[
                                                {
                                                    message: 'The image of the book!', whitespace: true
                                                },
                                            ]}
                                        >
                                            {
                                                this.state.bookimg!=""?
                                                    <Card
                                                        bordered={true}
                                                        cover={<img src={this.state.bookimg}  style={{ width: '100%' }} />}
                                                    >
                                                    </Card>:
                                                    null
                                            }
                                        <Input type="file"
                                               size={"large"}
                                               placeholder={"select a photo"}
                                               onChange={this.handleImgChange}
                                               accept={".jpg,.jpeg,.png,.JPG,.JPEG,.PNG"}/>
                                        </Form.Item>

                                        <Form.Item name='description'
                                                   label='简介'
                                                   rules={[
                                                       {
                                                           required: true,message: 'The description of the book!', whitespace: true
                                                       },
                                                   ]}
                                        >
                                            <Input.TextArea />
                                        </Form.Item>
                                        <Form.Item wrapperCol={{ ...this.layout.wrapperCol, offset: 8 }}>
                                            <Button type="primary" htmlType="submit">
                                                Submit
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </Card>
                            )
                    }
                    </Row>
                    <Footer style={{ textAlign: 'center' }}>
                        ©e-Book<br/>云墨阁
                    </Footer>
                </Content>
            </Layout>
        );
    }
}
export default ChangeBooks;
