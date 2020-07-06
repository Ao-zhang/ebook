import React from 'react';
import { Form, Input, Button, Checkbox} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import * as UserSER from '../services/UserService';



class Loginform extends React.Component{
    constructor(props) {
        super(props);

    }

     onSubmit = values => {
         console.log(values);
         debugger;
         console.log('Received values of form: ', values);
         UserSER.login(values);
    };

    render() {
     debugger;
        return (
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{remember: true}}
                onFinish={this.onSubmit}
            >
                <Form.Item
                    name="u_name"
                    rules={[{required: true, message: 'Please input your Username!'}]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
                </Form.Item>
                <Form.Item
                    name="u_password"
                    rules={[{required: true, message: 'Please input your Password!'}]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon"/>}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember"
                               valuePropName="checked"
                               initialValue={true}
                               noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" >
                        Log in
                    </Button>
                    Or <Link to='/register'>register now!</Link>
                </Form.Item>
            </Form>
        );
    }


}
export default Loginform;
