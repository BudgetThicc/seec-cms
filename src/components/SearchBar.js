import React,{Component} from "react";
import {Row,Col,AutoComplete,Input} from 'antd';
import BaseComponent from './BaseComponent'
import {withRouter} from "react-router-dom";

class SearchBar extends BaseComponent {
    
    constructor(props){
        super(props);
        this.state={
            isEnter:false,
            dataSource:[],
            name:""
        }
    };

    search=()=>{
        // var successAction = (result) => {
        //     this.setState({dataSource: result.content});
        //     console.log("success")
        // }
        // this.get("/movie/search?keyword="+this.state.name,successAction)
        const keyword=this.state.name
        this.props.history.push({pathname:"/search",state:{keyword}})
    }

    fetchAutoComplete = (value) => {
        var successAction = (result) => {
            this.setState({dataSource: result.content});
            console.log("success")
        }
        this.post('/movie/incomplete?keyword='+value,null, successAction)
    }

    autoOnChange = (value) => {
        this.setState({
            name:value
        })
        if(this.timer){
            clearTimeout(this.timer);
        }
        this.timer = setTimeout((
            this.fetchAutoComplete(value)
        ),500);
    }

    renderSearch=()=>{
        let style={}
        if(this.state.isEnter)
            style={ width: '100%',opacity:1 }
        else
            style={ width: '100%',opacity:0.4 }
        return(
            <AutoComplete
            size="large"
            style={style}
            dataSource={this.state.dataSource} 
            onChange={this.autoOnChange}
            placeholder="搜索即将/已上映/已下架电影">
                <Input.Search
                size="large"
                onSearch={this.search}
                />
            </AutoComplete>
        )
    }

    render(){
        return(
            <div
            onClick={()=>this.setState({isEnter:true})}>
                {this.renderSearch()}
            </div>
        );
    }
}

export default withRouter(SearchBar);