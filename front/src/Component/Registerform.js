import React, { useState } from 'react';
import {
    Form,
    Input,
    Tooltip,
    Select,
    Radio,
    Checkbox,
    Button,
    Upload, message
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import { FormInstance } from 'antd/lib/form';
import * as UserService from "../services/UserService";

const { Option } = Select;
//const AutoCompleteOption = AutoComplete.Option;


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


class RegistrationForm extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            loading: false,
        }
    };
    formRef = React.createRef<FormInstance>(this);


    onFinish = values => {
        console.log('Received values of form: ', values);
        debugger;
        let nickname=values.u_nickname;
        if(nickname==null){
            values.u_nickname=values.u_name;
        }
        console.log('Received values of form: ', values);
        UserService.register(values);
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
                <Input />
            </Form.Item>

            <Form.Item
                name="u_name"
                label={
                    <span>
            Name&nbsp;
                        <Tooltip title="it's needed when you want to login">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
                }
                rules={[{ required:true, message: 'Please input your name!', whitespace: true }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="u_password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('u_password') == value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('The two passwords that you entered do not match!');
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

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
                <Input />
            </Form.Item>

            <Form.Item
                name="u_gender"
                label="Gender"
                rules={[{ required: true, message: 'Please choose your gender!'}]}>
                <Radio.Group>
                    <Radio value="Boy">Boy</Radio>
                    <Radio value="Girl">Girl</Radio>
                    <Radio value="Unknown">Others</Radio>
                </Radio.Group>
            </Form.Item>


            <Form.Item
                name="u_phone"
                label="Phone Number"
                rules={[{ required: true, message: 'Please input your phone number!' }]}
            >
                <Input addonBefore={this.prefixSelector} style={{ width: '100%' }} />
            </Form.Item>



            <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                    { validator:(_, value) => value ? Promise.resolve() : Promise.reject('Should accept agreement') },
                ]}
                {...tailFormItemLayout}
            >
                <Checkbox>
                    I have read the <a href="">agreement</a>
                </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>

                Or already have an account, click<Link to='/login'> here </Link>  for login

            </Form.Item>
        </Form>
    );
}
};
export default RegistrationForm;
