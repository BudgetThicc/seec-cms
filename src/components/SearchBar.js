import React,{Component} from "react";
import {Row,Col,AutoComplete,Input} from 'antd';

class SearchBar extends Component {
    
    constructor(props){
        super(props);
        this.state={
            isEnter:false,
        }
    };

    renderSearch=()=>{
        if(this.state.isEnter)
            return(
                <AutoComplete
                size="large"
                style={{ width: '100%',opacity:1 }}
                placeholder="搜索即将/已上映/已下架电影">
                    <Input.Search
                    size="large"
                    onSearch={value=>console.log(value)}
                    />
                </AutoComplete>
            );
        else
            return(
                <AutoComplete
                size="large"
                style={{ width: '100%',opacity:0.4 }}
                placeholder="搜索即将/已上映/已下架电影">
                    <Input.Search
                    size="large"
                    onSearch={value=>console.log(value)}
                    />
                </AutoComplete>
            )
    }

    render(){
        return(
            <div
            onMouseEnter={()=>this.setState({isEnter:true})} 
            onMouseLeave={()=>this.setState({isEnter:false})}>
                {this.renderSearch()}
            </div>
        );
    }
}

export default SearchBar;