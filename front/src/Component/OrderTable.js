import React from 'react';
import {Dropdown, Table, Button, Row,Col,message,Input} from 'antd';
import { Resizable } from 'react-resizable';
import * as OrderService from "../services/OrderService";
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;
const {Search}=Input;
const ResizeableTitle = props => {
    const { onResize, width, ...restProps } = props;

    if (!width) {
        return <th {...restProps} />;
    }

    return (
        <Resizable
            width={width}
            height={0}
            handle={
                <span
                    className="react-resizable-handle"
                    onClick={e => {
                        e.stopPropagation();
                    }}
                />
            }
            onResize={onResize}
            draggableOpts={{ enableUserSelectHack: false }}
        >
            <th {...restProps} />
        </Resizable>
    );
};

Date.prototype.format = function(format) {
    var o = {
        "M+" : this.getMonth() + 1,// month
        "d+" : this.getDate(),// day
        "h+" : this.getHours(),// hour
        "m+" : this.getMinutes(),// minute
        "s+" : this.getSeconds(),// second
        "q+" : Math.floor((this.getMonth() + 3) / 3),// quarter
        "S" : this.getMilliseconds()
        // millisecond
    };
    if (/(y+)/.test(format) || /(Y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for ( var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};

const components = {
    header: {
        cell: ResizeableTitle,
    },
};

const itemcolumns = [
    {
        title: '书号',
        dataIndex: 'b_id',
        width:70,
    },
    {
        title: '书名',
        dataIndex: 'b_title',
        width:200,
    },
    {
        title: '作者',
        dataIndex: 'author',
        width: 200,
    },
    {
        title: '单价',
        dataIndex: 'price',
        width: 70,
    },
    {
        title: '数量',
        dataIndex: 'book_num',
        width: 70,
    },
    {
        title: '总价',
        dataIndex: 'tot_price',
        width: 70,
    },
];

const listitems=(items)=>{
    return(
        <Table
            bordered
            components={components} columns={itemcolumns} dataSource={items}
        />);
};


class OrderTable extends React.Component {
    state = {
        columns: [
            {
                title: '订单编号',
                dataIndex: 'ord_id',
                key:'ord_id',
                width: 70,
            },
            {
                title: '下单时间',
                dataIndex: 'ord_time' ,
                width: 150,
                render:(_,record)=>{
                    let time=new Date(parseFloat(record.ord_time.time)).format("yyyy-MM-dd hh:mm:ss");
                    debugger;
                   return (
                       <p>{time}</p>
                   )
                }
            },
            {
                title: '价格',
                dataIndex: 'tot_cost',
                width: 70,
            },
            {
                title: '收件地址',
                dataIndex: 'address',
                width: 320,
                render:(_,record)=>{
                    let province=record.address.province;
                    let city=record.address.city;
                    let town=record.address.town;
                    let street=record.address.street;
                    let detail_info=record.address.detail_info
                    return (
                        <b>{province+" "+city+" "+town+" "+street+" "+detail_info}</b>
                    )
                }
            },
            {
                title: '手机',
                dataIndex: 'con_phone',
                width: 80,
                render:(_,record)=>{
                    let phone=record.address.con_phone;
                    return (
                        <p>{phone}</p>
                    )
                }
            },
            {
                title: '收件人',
                dataIndex: 'con_name',
                width:80,
                render:(_,record)=>{
                    let conName=record.address.con_name;
                    return (
                        <p>{conName}</p>
                    )
                }
            },
            {
                title:"详情",
                dataIndex:'items',
                width:100,
                render:(_,record)=>{
                    return(
                        <Dropdown overlay={listitems(record.items)} trigger={"click"} placement="bottomRight">
                            <Button type={"primary"}>
                                查看
                            </Button>
                        </Dropdown>
                    )
                }
            }


        ],
        u_id:0,
        orderinfo: [],
        pagesize:20,
        pagenum:1,
        searchText:"",
    };


    convertdata=(data)=>{
        let orderinfo=[];
        for(let i=0;i<data.length;i++){
            data[i].orderinfo.items=data[i].orditems
            data[i].orderinfo.address=data[i].address;
            orderinfo.push(data[i].orderinfo);
        }
        this.setState({orderinfo:orderinfo});
    }

    componentDidMount() {
        const callback=(data)=>{
            if(data.status){
                message.error("获取订单信息失败")
            }
            else{
                message.success("获取订单信息成功");
                this.convertdata(data);
            }
        }
        let user=JSON.parse(localStorage.getItem("user"));
        this.setState({u_id:user.u_id});
        let json={};
        if(this.props.type==0){
            json.u_id=user.u_id;
        }
        OrderService.getorders(json,callback);
    }

    // changePage=(current,pageSize)=>{
    //     this.setState({
    //         pagenum:current,pagesize:pageSize
    //     });
    //     const callback=(data)=>{
    //         if(data.status){
    //             message.error("获取用户信息失败")
    //         }
    //         else{
    //             message.success("获取用户信息成功")
    //             this.setState({usersinfo:data});
    //         }
    //     }
    //
    // }

    onChange=(moment,  string)=>{
        // debugger;
        const callback=(data)=>{
            if(data.status){
                message.error("获取订单信息失败")
            }
            else{
                message.success("获取订单信息成功");
                this.convertdata(data);
            }
        }
        let json={};
        if(this.props.type==0){
            json.u_id=this.state.u_id;
        }
        if(string[0]!=""){
            json.early=string[0];
        }
        if(string[1]!=""){
            json.later=string[1];
        }
        OrderService.getorders(json,callback);
    }

    onSearch=(values)=>{
        this.setState({searchText:values});
        const callback=(data)=>{
            if(data.status){
                message.error("搜索失败");
            }
            else{
                // debugger;
                if(data.length){
                    message.success("搜索成功");
                    this.convertdata(data);
                }
                else{
                    message.info("找不到您要的书名，请检查书名后重新输入")
                }
            }
        };
        let json={keyword:values};
        if(this.props.type==0){
            json.u_id=this.state.u_id;
        }
        OrderService.getorders(json,callback);
    }

    handleResize = index => (e, { size }) => {
        this.setState(({ columns }) => {
            const nextColumns = [...columns];
            nextColumns[index] = {
                ...nextColumns[index],
                width: size.width,
            };
            return { columns: nextColumns };
        });
    };

    render() {
        const columns = this.state.columns.map((col, index) => ({
            ...col,
            onHeaderCell: column => ({
                width: column.width,
                onResize: this.handleResize(index),
            }),
        }));

        return (
            <div>
                <Row justify={"center"}>
                    <Col span={8}>
                        <Search placeholder="input search text" onSearch={this.onSearch} enterButton/>
                    </Col>
                    <Col offset={2} span={8}>
                        <RangePicker onChange={this.onChange}/>
                    </Col>
                </Row>
                <br/>
                <br/>
                <Row justify={"center"}>
                    <Col span={20}>
                        <Table
                            bordered
                            components={components} columns={columns} dataSource={this.state.orderinfo}
                            // pagination={{
                            //     onChange: this.changePage,
                            //     total:200
                            // }}
                        />
                    </Col>
                </Row>

            </div>


            );
    }
}



export default OrderTable;
