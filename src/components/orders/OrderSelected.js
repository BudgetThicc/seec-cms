import React from "react";
import BaseComponent from '../BaseComponent'
import { Row, Col, AutoComplete,Button, Divider } from 'antd';
import {Typography} from '@material-ui/core';

export default class OrderSelected extends BaseComponent {
    constructor(props){
        super(props);
        this.state={
            
        }
    }

    onClick=()=>{
        return 
    }
    
    render(){
        const {schedule,item,type}=this.props;
        const {movieName,hallName,startTime,endTime,fare}=schedule
        const row=item[0]+1
        const col=item[1]+1
        return (
            <Button  onClick={this.onClick} style={styles.button}>
                <Row type="flex" justify="center">

                    <Col span={5} >
                        <Row style={styles.courseItem}>电影名</Row>
                        <Typography style={styles.content}>
                            {movieName}
                        </Typography>
                    </Col>

                    <Col span={5}>
                        <Row style={styles.courseItem}>时间</Row>
                        <Typography style={styles.content}>
                            {this.handleTime(""+startTime)
                            +"至"+this.handleTime(""+endTime)}
                        </Typography>
                    </Col>

                    <Col span={5} >
                        <Row style={styles.courseItem}>影厅</Row>
                        <Typography style={styles.content}>{hallName}</Typography>
                    </Col>

                    <Col span={5}>
                        <Row style={styles.courseItem}>座位</Row>
                        <Typography style={styles.content}>{
                            row+"排"+col+"座 "+type
                        }</Typography>
                    </Col>

                    <Col span={4}>
                        <Row style={styles.courseItem}>票价</Row>
                        <Typography style={styles.content}>
                            {fare}
                        </Typography>
                    </Col>
                </Row>
            </Button>
        );
    }
}

const styles = {
    button:{
        width:"100%",
        height: '60px',
        margin:10,
        padding:3,
        border:0
    },
    courseItem: {
        fontSize:14,
        textAlign: 'center',
        color:"#1890ff"
    },
    content:{
        fontSize:18,
        textAlign:"center"
    }
}
