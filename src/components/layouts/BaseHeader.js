import React,{Component} from "react";
import {Row,Col,Menu,AutoComplete,Typography,Input,Button,Icon} from 'antd';
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
            <Col xs={0} sm={12}>
                <Col  sm={0} lg={8}>
                    {/* 当屏幕分辨率小于sm值时隐藏logo */}
                    <Row type="flex" justify='center'>
                        <img style={styles.logo} src={require("./resource/logo.png")} />
                    </Row>
                </Col>
                <Col sm={12} lg={12}>
                    <AutoComplete
                    size="large"
                    style={{ width: '100%' }}
                    placeholder="搜索即将/已上映/已下架电影">
                        <Input.Search
                        size="large"
                        enterButton
                        onSearch={value=>console.log(value)}
                        />
                    </AutoComplete>
                </Col>
            </Col>
        );
    }

    renderRightHeader=()=>{
        return(
            <Col xs={24} sm={12}>
                <Col sm={12} lg={12}>
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