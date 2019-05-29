import React,{Component} from "react";
import {Row,Col,Menu,Typography} from 'antd';

class BaseHeader extends Component {
    
    constructor(props){
        super(props);
    };

    renderItems=(item)=>{
        return (<Menu.Item key={item.key}>{item.name}</Menu.Item>);
    }

    render(){
        return (
        <Row>
            <Col sm={0} lg={5}>
                <img style={styles.logo} src={require("./resource/logo.png")} />
            </Col>
            <Col sm={24} lg={19}>
            <Menu
            theme="white"
            mode="horizontal"
            style={{ flex:1,fontSize:'20px',lineHeight: '64px' }}
            >
                {this.props.items.map(this.renderItems)}
            </Menu>
            </Col>
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

export default BaseHeader;