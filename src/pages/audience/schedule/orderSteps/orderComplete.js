import React from "react";
import BaseComponent from '../../../../components/BaseComponent'
import { Row, Col,Button,Divider } from 'antd';
import {Typography} from '@material-ui/core';

var row=-1
export class OrderComplete extends BaseComponent {
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        return (
            <Row style={styles.rows} >
                <Col span={24} style={styles.rows}>
                    <Row type='flex' justify='center'>
                        <img style={styles.pic} src={require('./resource/success.png')}/>
                    </Row>
                </Col>
                <Col span={24} style={styles.rows}>    
                    <Row type='flex' justify='center'>
                        <Typography style={styles.name}>购票成功 感谢您的支持</Typography>
                    </Row>
                </Col>
            </Row>
        );
    }
}

const styles = {
    rows:{
        marginRight:40
    },
    pic:{
        height:180,
        width:180
    },
    name:{
        textAlign:'start',
        fontSize:"24px",
        color:"black",
        fontFamily:"黑体",
        margin:10
    },
}