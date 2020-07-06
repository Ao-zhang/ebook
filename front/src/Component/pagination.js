import React from "react";
import { Pagination } from 'antd';

function onShowSizeChange(current, pageSize) {
    console.log(current, pageSize);
}

class Pagesfooter extends React.Component{
    render() {
        return (
            <div>
                <Pagination
                    showSizeChanger
                    showQuickJumper
                    onChange={this.props.changePage}
                    defaultCurrent={1}
                    defaultPageSize={16}
                    current={this.props.pagenum}
                    pageSize={this.props.size}
                    total={500}
                />
            </div>)
    }
}

export default Pagesfooter;
