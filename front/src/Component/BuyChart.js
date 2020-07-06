import React, { Component } from 'react';
import {DatePicker, Row, Col, message, Button, InputNumber} from "antd";
import {DualLine, Column} from '@ant-design/charts';
import * as OrderService from "../services/OrderService";
const { RangePicker } = DatePicker;

class BuyChart extends Component{
    constructor(props) {
        super(props);
        this.state={
            u_id:0,
            datalist:[],
            early:null,
            later:null,
        };
    }

    callback=(data)=>{
        if(data.status){
            message.error("获取订单统计信息失败")
        }
        else{
            message.success("获取订单统计信息成功");
            this.setState({datalist:data});
        }

    };

    componentDidMount() {
        let user=JSON.parse(localStorage.getItem("user"));
        let u_id=user.u_id;
        this.setState({u_id:u_id});
        let json={u_id:u_id,early:this.state.early,later:this.state.later};
        OrderService.getPersonalConsume(json,this.callback);
    }
    onTimeChange=(moment,  string)=>{
        let early=string[0]==""?null:string[0];
        let later=string[1]==""?null:string[1];
        this.setState({early:early,later:later});
        let json={u_id:this.state.u_id,early:early,later:later};
        OrderService.getPersonalConsume(json,this.callback);
    };
    render() {
        const {datalist,early,later}=this.state;
        const config = {
            title: {
                visible: true,
                text: early==null?"最近一个月消费统计图":early+"~"+later+"消费统计图",
                alignTo: "middle",
                style:{
                    fontSize: 32,
                    fill: 'black',
                }
            },
            forceFit: true,
            data:[datalist,datalist],
            xField: 'b_title',
            yField: ['tot_price','tot_num'],
            label: {
                visible: true,
            },
            tooltip:{
                tot_price:{
                    alias:"总价",
                    formatter:(v)=>{return `${v}元`}
                },
            },

            meta:{
                tot_num:{
                    alias:"购买总数",
                    formatter:(v)=>{return `${v}本`}
                },

                b_title:{
                    alias:"书名"
                },
                tot_price:{
                    alias:"总价",
                    formatter:(v)=>{return `${v}元`}
                },

            },
            lineConfigs: [
                {
                    color: '#29cae4',
                    smooth: false,
                    point: { visible: true },
                    lineSize: 3,
                    lineStyle: { opacity: 0.5 },
                },
                {
                    color: '#586bce',
                    smooth: true,
                    point: { visible: true },
                    label: { visible: true },
                    lineSize: 4,
                    lineStyle: { opacity: 0.5 },
                },
            ],
            legend: {
                visible: true,
                flipPage:true,
                formatter:(v)=>{console.log(v)}
            },
            interactions: [{ type: 'scrollbar' }],
        };
        return (
            <div>
                <Row justify={"center"}>
                    <Col span={8} offset={2}>
                        <RangePicker onChange={this.onTimeChange}/>
                    </Col>
                </Row>
                <DualLine {...config}/>
            </div>
        );
    }

}

export  default BuyChart;
