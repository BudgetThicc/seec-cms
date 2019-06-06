import React,{Component} from "react";
import { Drawer} from 'antd';
import BaseComponent from "./BaseComponent"
import { resetDrawer } from '../redux/actions/action';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    content: state.drawerReducer.content,
    loading: state.drawerReducer.loading,
})

class BaseDrawer extends BaseComponent{

    constructor(props) {
        super(props);
        this.state={
            visible:false
        }
    }

    _close=()=>{
        this.setState({
            visible:false
        })
    }
    render(){
        if(this.props.loading&&!this.state.visible){
            this.state.visible=true
            this.props.dispatch(resetDrawer())
        }
        return(
            <Drawer
            title="影片详情"
            width="60%"
            placement="right"
            closable={true}
            onClose={this._close}
            visible={this.state.visible}
            >
                {this.props.content}
            </Drawer>
        );
  }
}

export default connect(mapStateToProps)(BaseDrawer) 