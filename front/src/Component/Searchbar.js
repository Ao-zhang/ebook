import React from "react";
import {Input} from "antd";
const { Search } = Input;

class SearchBar extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            value1:''
        }
    }
    handleFilterTextChange(e) {
            let t_value=e;
            console.log(t_value);
            this.setState(()=>({value1:t_value}))
            this.props.onFilterTextChange(t_value);
    }
    render() {
        return (
            <Search
                placeholder="input search text"
                onSearch={e=>this.handleFilterTextChange(e)}
                enterButton />
            );
    }
}
export default SearchBar;