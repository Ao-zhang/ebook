import {
    Button, Card, Input, Form,
    Tooltip, Select, Radio, Checkbox
} from 'antd';
import React from "react";
import {FormInstance} from "antd/lib/form";
import * as UserService from "../services/UserService";
import { QuestionCircleOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom";
const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
//还有bug
class PersonInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            loading: false,
        }
    };
    formRef = React.createRef<FormInstance>(this);


    onFinish = values => {
        debugger;
        console.log('Received values of form: ', values);
        this.props.handleInfo(values);

    };

    prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );

    render() {
        return (
            <Form
                {...formItemLayout}
                ref={this.formRef}
                name="register"
                onFinish={this.onFinish}
                initialValues={{
                    prefix: '86',
                }}
                scrollToFirstError
            >
                <Form.Item
                    name="u_nickname"
                    label={
                        <span>
            Nickname&nbsp;
                            <Tooltip title="What do you want others to call you?">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
                    }
                    rules={[{ required: false, message: 'Please input your nickname!', whitespace: true }]}
                >
                    <Input placeholder={this.props.user.u_nickname}/>
                </Form.Item>

                <Form.Item
                    name="u_phone"
                    label="Phone Number"
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                    <Input addonBefore={this.prefixSelector} style={{ width: '100%' }} placeholder={this.props.user.u_phone}/>
                </Form.Item>

                <Form.Item
                    name="u_email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input placeholder={this.props.user.u_email}/>
                </Form.Item>

                <Form.Item
                    {...tailFormItemLayout}
                    name="u_gender"
                    label="Gender"
                    rules={[{ required: true, message: 'Please choose your gender!'}]}>
                    <Radio.Group>
                        <Radio value="Boy">Boy</Radio>
                        <Radio value="Girl">Girl</Radio>
                        <Radio value="Unknown">Others</Radio>
                    </Radio.Group>
                </Form.Item>
                    <Button type={"primary"} shape="circle" htmlType="submit" className={"Editbutton"}>提交</Button>

            </Form>

        );
    }
}
export default PersonInfo;
