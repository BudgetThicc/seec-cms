import React from "react";
import BaseComponent from '../../../components/BaseComponent'
import { Row, Col, AutoComplete, Select, Divider, Typography } from 'antd';

export class Home extends BaseComponent {
    constructor(props){
        super(props);
        this.state={
        }
    }

    render(){
        const {current}=this.state
        return (
            <Row style={styles.container}>
                <Col span={24}>
                    <Row type="flex" justify="center">
                        <img style={styles.img} src={require('./resource/logo_admin.png')}/>
                    </Row>
                </Col>
                <Col style={{marginTop:50}} span={24}>
                    <Row type="flex" justify="center">
                        <Typography style={styles.welcome}>欢迎来到超级管理员界面</Typography>
                    </Row>
                </Col>
            </Row>
        );
    }
}

const styles = {
    welcome:{
        fontSize:30,
        opacity:0.6
    },
    container:{
        marginTop:"150px",
    },
    img:{
        height:"100px",
        width:"400px",
        opacity:0.4
    }
}

