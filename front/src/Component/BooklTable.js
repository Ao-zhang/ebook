import React, {useCallback, useEffect, useState} from 'react';
import { Table, Input, InputNumber, Popconfirm, Form,message } from 'antd';
import { Resizable } from 'react-resizable';
import *as BookSER from "../services/BookService";
const { Search } = Input;


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

const EditableCell = ({
                          editing,
                          dataIndex,
                          title,
                          inputType,
                          record,
                          index,
                          children,
                          ...restProps
                      }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};


//函数以及变量出现的顺序很重要！
const EditableTable = (props) => {
     const booksinfo=props.booksinfo;
    const [form] = Form.useForm();
    // debugger;
    const [data, setData] = useState(booksinfo);
    const [editingKey, setEditingKey] = useState(0);
    const [columns,setColumns]=useState([]);


    const edit = (record )=> {
        form.setFieldsValue({
            b_title: '',
            category: '',
            author: '',
            price:'',
            description:'',
            store_num:'',
            img_src:'',
            ...record,
        });
        debugger;

        setEditingKey(record.b_id);
    };

    const isEditing = record => record.b_id == editingKey;



    const remove=record=>{
        let json={b_id:record.b_id};
        const callback=(data)=>{
            // debugger;
            if(data){
                message.success("删除成功！")
            }
            else{
                message.success("删除失败")
            }
        }
        BookSER.deleteBooks(json,callback)
    }

    const cancel = () => {
        setEditingKey(0);
    };

    const save = async record => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex(item => record.b_id === item.b_id);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setData(newData);
                setEditingKey(0);
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey(0);
            }
            row["b_id"]=record.b_id;
            debugger;
            const callback=(data)=>{
                debugger;
                if(data.status!=null){
                    message.error("保存失败！");
                }
                else{
                    message.success("保存成功！");
                }
            }
            BookSER.insertBooks(row,callback);

        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const changePage=(current,pageSize)=>{
        setEditingKey(0);
        props.changepage(current,pageSize);
    }


    const initcolumns = [
        {
            title: '书号',
            dataIndex: 'b_id',
            width: 50,
            editable: false,
        },
        {
            title: '书名',
            dataIndex: 'b_title',
            width: 100,
            editable: true,
        },
        {
            title: 'ISBN（种类）',
            dataIndex: 'category',
            width: 80,
            editable: true,
        },
        {
            title: '作者',
            dataIndex: 'author',
            width: 100,
            editable: true,
        },
        {
            title: '价格',
            dataIndex: 'price',
            width: 70,
            editable: true,
        },
        {
            title: '简介',
            dataIndex: 'description',
            width: 270,
            editable: true,
            ellipsis: true,
        },
        {
            title: '库存',
            dataIndex: 'store_num',
            width: 70,
            editable: true,
        },
        {
            title: '封面',
            dataIndex: 'img_src',
            width: 160,
            editable: true,
            ellipsis: true,
        },
        {
            title: '操作',
            dataIndex: 'operation',
            width:100,
            render: (_, record) => {
                const editable = isEditing(record);
                // debugger;
                return editable ? (
                    <span>
            <a
                href="javascript:;"
                onClick={() => save(record)}
                style={{
                    marginRight: 16,
                }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
                ) : (
                    <span>
                        <a disabled={editingKey != 0} onClick={() => edit(record)} style={{
                            marginRight: 16,
                        }}>
                            Edit
                        </a>
                        <Popconfirm title="Sure to delete?" onConfirm={() => remove(record)} >
                            <a disabled={editingKey != 0} > Delete</a>
                        </Popconfirm>
                    </span>

                );
            },
        },
    ];




    const mergedColumns = columns.map((col,index)=> {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onHeaderCell: column => ({
                width: column.width,
                onResize: handleResize(index),
            }),
            onCell: record => ({
                record,
                inputType: (col.dataIndex==="price"|| col.dataIndex==="store_num")?'number':'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const handleResize = index => (e, { size }) => {
        let nextColumns = [...columns];
        nextColumns[index] = {
            ...nextColumns[index],
            width: size.width,
        };
        setColumns(nextColumns);
    };
    useEffect(()=>{
        console.log(props);
        setData(props.booksinfo);
        setColumns(initcolumns);
        // debugger;
    },[props]);
    useEffect(()=>{
        console.log(editingKey);
        setColumns(initcolumns);
        // setData(props.booksinfo);
        // setColumns(initcolumns);
        debugger;
    },[editingKey])

    // const onSearch=(value)=>{
    //     props.onsearch(value);
    // }


    return (
        <div>

            <br/>
            <br/>
            <Form form={form} component={false}>
                <Table
                    components={{
                        header:{
                            cell:ResizeableTitle,
                        },
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: changePage,
                        current:props.current,
                        pageSize:props.pagesize,
                        total:200
                    }}
                />
            </Form>
        </div>
    );
};

export default EditableTable ;
