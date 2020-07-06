import React from 'react';
import {Popconfirm, Table, Button, message} from 'antd';
import { Resizable } from 'react-resizable';
import * as UserService from "../services/UserService";

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

class UserTable extends React.Component {
    state = {
        columns: [
            {
                title: '用户编号',
                dataIndex: 'u_id',
                width: 70,
            },
            {
                title: '用户名',
                dataIndex: 'u_name' ,
                width: 100,
            },
            {
                title: '类别',
                dataIndex: 'u_type',
                width: 120,
                render:(_,record)=>{
                    if(record.u_type===0){
                        return(<p>普通用户</p>)
                    }
                    else if(record.u_type<0){
                        return(<p>被禁用户</p>)
                    }else if(record.u_type==1){
                        return(<p>管理员</p>)
                    }
                    else{
                        return(<p>超级管理员</p>)
                    }
                }
            },
            {
                title: '昵称',
                dataIndex: 'u_nickname',
                width: 120,
            },
            {
                title: '手机',
                dataIndex: 'u_phone',
                width: 100,
            },
            {
                title: '邮箱',
                dataIndex: 'u_email',
                width:200,
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (_, record) => {
                    let user=JSON.parse(localStorage.getItem("user"));
                    let u_id=user.u_id;
                    let u_type=user.u_type;//超级管理员
                    return (
                        <span>
                            <Popconfirm
                                disabled={record.u_type>0 ||record.u_id===u_id}
                                title={"Sure to update "+record.u_nickname+" as an administrator？"} onConfirm={() => {this.onChangeType(record.u_id,1)}} >
                              <Button disabled={record.u_type>0 ||record.u_id===u_id} style={{
                                  float:"right"
                              }}>
                                  升级成管理员
                              </Button>
                        </Popconfirm>
                            <Popconfirm
                                disabled={record.u_type>=0 ||record.u_id===u_id }
                                title={"Sure to bring "+record.u_nickname+" back？"} onConfirm={() => {this.onChangeType(record.u_id,0)}} >
                              <Button disabled={record.u_type>=0 ||record.u_id===u_id } style={{
                                  float:"right"
                              }}>
                                  启用
                              </Button>
                        </Popconfirm>
                          <Popconfirm
                              disabled={record.u_type<0 ||record.u_id===u_id ||(record.u_type>0 && u_type<2)}
                              title="Sure to forbidden?" onConfirm={() => {this.onChangeType(record.u_id,-1)}}>
                              <Button disabled={record.u_type<0 ||record.u_id===u_id ||(record.u_type>0 && u_type<2)} style={{
                                  float:"right"
                              }}>
                                  禁用
                              </Button>
                        </Popconfirm>


                    </span>
                    )
                }
            },
        ],
        usersinfo: [],
        pagesize:20,
        pagenum:1,
    };

    components = {
        header: {
            cell: ResizeableTitle,
        },
    };

    onChangeType=(u_id,u_type)=>{
        const callback=(data)=>{
            if(data.status){
                message.error("修改用户权限失败")
            }
            else{
                message.success("修改用户权限成功")
                this.changePage(1,20);
            }
        }
        let json={u_id:u_id,u_type:u_type};
        UserService.changeType(json,callback);
    }

    componentDidMount() {
        const callback=(data)=>{
            if(data.status){
                message.error("获取用户信息失败")
            }
            else{
                message.success("获取用户信息成功")
                this.setState({usersinfo:data});
            }
        }
        UserService.getUsers({"pagenum":this.state.pagenum,"size":this.state.pagesize},callback);
    }

     changePage=(current,pageSize)=>{
        this.setState({
            pagenum:current,pagesize:pageSize
        });
         const callback=(data)=>{
             if(data.status){
                 message.error("获取用户信息失败")
             }
             else{
                 message.success("获取用户信息成功")
                 this.setState({usersinfo:data});
             }
         }
         UserService.getUsers({"pagenum":current,"size":pageSize},callback);
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

        return (<Table
            bordered
            components={this.components} columns={columns} dataSource={this.state.usersinfo}
            pagination={{
                onChange: this.changePage,
                current:this.state.pagenum,
                pageSize:this.state.pagesize,
                total:200
            }}
        />);
    }
}



export default UserTable;
