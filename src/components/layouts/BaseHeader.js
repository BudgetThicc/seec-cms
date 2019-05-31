import React,{Component} from "react";
import {Row,Col,Menu,Typography} from 'antd';
import {withRouter } from "react-router-dom";
import {connect} from "react-redux"

const mapStateToProps = state => ({
    user: state.identityReducer.user,
    admin: state.identityReducer.admin
})

class BaseHeader extends Component {
    
    constructor(props){
        super(props);
    };

    handleClick = (e) => {
        this.props.history.push(e.key+'') 
    }

    renderItems=(item)=>{
        return (<Menu.Item key={item.key}>{item.name}</Menu.Item>);
    }

    renderLeftHeader=()=>{
        return(
            <Col span={12}>
                <Col sm={0} lg={6}>
                    {/* 当屏幕分辨率小于sm值时隐藏logo */}
                    <img style={styles.logo} src={require("./resource/logo.png")} />
                </Col>
                <Col sm={24} lg={18}>
                    <Menu
                    theme="white"
                    mode="horizontal"
                    style={{ flex:1,fontSize:'20px',lineHeight: '64px' }}
                    onClick={this.handleClick}
                    >
                        {this.props.items.map(this.renderItems)}
                    </Menu>
                </Col>
            </Col>
        );
    }

    renderRightHeader=()=>{
        return(
            <Col span={12}>

            </Col>

        )
    }

    render(){
        return (
        <Row>
           {this.renderLeftHeader()}
           {this.renderRightHeader()}
        </Row>
        );
    }
}

const styles={
    logo: {
        height:'64px',
        width:'192px'
    },
}

export default withRouter(connect(mapStateToProps)(BaseHeader));