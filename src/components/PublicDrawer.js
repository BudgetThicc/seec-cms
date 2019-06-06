import React,{Component} from "react";
import { Drawer} from 'antd';
import BaseComponent from "./BaseComponent"
import { resetDrawer } from '../redux/actions/action';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    content: state.drawerReducer.content,
    loading: state.drawerReducer.loading,
})

class PublicDrawer extends BaseComponent{

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
            title="Basic Drawer"
            placement="right"
            closable={true}
            onClose={this._close}
            visible={this.state.visible}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                {this.props.content}
            </Drawer>
        );
  }
}

export default connect(mapStateToProps)(PublicDrawer) 