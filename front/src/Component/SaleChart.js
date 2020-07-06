import React, { Component } from 'react';
import {Row, Col,Button,  message,InputNumber} from "antd";
import { Bar } from '@ant-design/charts';
import { DatePicker } from 'antd';
import * as OrderService from "../services/OrderService";
const { RangePicker } = DatePicker;

class SaleChart extends Component {
    constructor(props) {
        super(props);
        this.state={
            selllist:[],
            consumelist:[],
            early:null,
            later:null,
            num:7,
            topSell:true
        };
    }
    callback1=(data)=>{
        if(data.status){
            message.error("获取榜单信息失败")
        }
        else{
            message.success("获取榜单信息成功");
            this.setState({selllist:data});
        }
    };
    callback2=(data)=>{
        if(data.status){
            message.error("获取榜单信息失败")
        }
        else{
            message.success("获取榜单信息成功");
            this.setState({consumelist:data});
        }
    };

    componentDidMount() {
        let json={num:this.state.num,early:this.state.early,later:this.state.later};
        OrderService.getTopSeller(json,this.callback1);
        OrderService.getTopConsume(json,this.callback2);
    };

    onNnumberChange=(value)=>{
        if(value==null || value<3 || value>12){
            if(value!=null){
                message.warn("查询数量在3-12之间，请输入数量在此范围之内！")
            }
            this.setState({num:7});
            let json={num:7,early:this.state.early,later:this.state.later};
            if(this.state.topSell){
                OrderService.getTopSeller(json,this.callback1);
            }
            else{
                OrderService.getTopConsume(json,this.callback2);
            }

        }
        else{
            this.setState({num:value});
            let json={num:value,early:this.state.early,later:this.state.later};
            if(this.state.topSell){
                OrderService.getTopSeller(json,this.callback1);
            }
            else{
                OrderService.getTopConsume(json,this.callback2);
            }
        }
    };

    onDataChange=()=>{
        let topSell=!this.state.topSell;
        this.setState({topSell:topSell});
    }



    onTimeChange=(moment,  string)=>{
        let early=string[0]==""?null:string[0];
        let later=string[1]==""?null:string[1];
        this.setState({early:early,later:later});
        let json={num:this.state.num,early:early,later:later};
        if(this.state.topSell){
            OrderService.getTopSeller(json,this.callback1);
        }
        else{
            OrderService.getTopConsume(json,this.callback2);
        }
    };
      render() {
          const {selllist,consumelist,num}=this.state;
          const config1 = {
              title: {
                  visible: true,
                  text: "热销榜TOP"+num,
                  alignTo: "middle",
                  style:{
                      fontSize: 32,
                      fill: 'black',
                  }
              },

              forceFit: true,
              data:selllist,
              xField: 'sold_num',
              yField: 'b_title',
              color: 'l(0) 0:#3e5bdb 1:#dd3121',
              columnStyle: { fillOpacity: 0.8 },
              label: {
                  visible: true,
              },
              meta:{
                  sold_num:{
                      alias:"销售量",
                      formatter:(v)=>{return `${v}本`}
                  },
                  b_title:{
                      alias:"书名"
                  }
              },
              legend: {
                  visible: true,
                  position: 'top-center',
              },
              // interactions: [{ type: 'scrollbar' }],
          };
          const config2 = {
              title: {
                  visible: true,
                  text: "消费榜TOP"+num,
                  alignTo: "middle",
                  style:{
                      fontSize: 32,
                      fill: 'black',
                  }
              },

              forceFit: true,
              data:consumelist,
              xField: 'pay',
              yField: 'u_name',
              color: 'l(0) 0:#3e5bdb 1:#dd3121',
              columnStyle: { fillOpacity: 0.8 },
              label: {
                  visible: true,
              },
              meta:{
                  pay:{
                      alias:"总消费金额",
                      formatter:(v)=>{return `${v}元`}
                  },
                  u_name:{
                      alias:"用户名(非昵称)"
                  }
              },
              legend: {
                  visible: true,
                  position: 'top-center',
              },
          };
          return (
              <div>
                  <Row justify={"left"}>
                      <Col offset={2}>
                          <Button type={"primary"} onClick={this.onDataChange}>
                              {
                                  this.state.topSell?
                                      ("查看消费榜"):("查看热销榜")
                              }
                          </Button>
                      </Col>
                  </Row>
                  <Row justify={"center"}>
                      <Col span={8}>
                          <b>{"查询数量(3~12)"}</b>
                          <InputNumber min={3} max={12} defaultValue={7} onChange={this.onNnumberChange} />
                      </Col>
                      <Col span={8} offset={2}>
                          <RangePicker onChange={this.onTimeChange}/>
                      </Col>
                  </Row>
                  {
                      this.state.topSell?
                          <Bar {...config1}/>
                          :<Bar {...config2}/>
                  }
              </div>
          );
      }

}
export default SaleChart;
