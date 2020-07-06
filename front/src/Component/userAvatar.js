import {Button, Card, Input} from 'antd';
import React from "react";
import * as UserService from "../services/UserService";





class UpAvatar extends React.Component {
    state = {
        avatar:""
    };

    handleAvatarChange=(e)=>{
        debugger;
        let reader=new FileReader();
        let file=e.target.files[0];

        reader.readAsDataURL(file);
        reader.onloadend=()=>{
            debugger;
            let t_avatar=reader.result;
            this.setState({avatar:t_avatar});

        }
    }

    handleAvatarCommit=()=>{
        let avatar=this.state.avatar;
        this.props.handleCommit(avatar);
    }

    render() {
        const uploadButton = (
            <Card
                bordered={true}
                cover={<img src={this.props.avatar} style={{ width: '100%' }} />}
            >
            </Card>
        );
        return (
            <div>
                {
                    this.state.avatar!=""?
                        <Card
                            bordered={true}
                            cover={<img src={this.state.avatar}  style={{ width: '100%' }} />}
                        >
                        </Card>:
                        uploadButton
                }
                <Input type="file"
                       size={"large"}
                       placeholder={"select a photo as your new avatar"}
                       onChange={this.handleAvatarChange}
                       accept={".jpg,.jpeg,.png,.JPG,.JPEG,.PNG"}/>
                <Button type={"primary"} shape="circle" className={"Editbutton"} onClick={this.handleAvatarCommit}>上传</Button>
            </div>

        );
    }
}

export default UpAvatar;
