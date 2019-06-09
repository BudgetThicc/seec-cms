import React from "react";
import BaseComponent from './BaseComponent'
import { Row, Col, AutoComplete,Button, Divider } from 'antd';
import {Typography} from '@material-ui/core';

export default class Ticket extends BaseComponent {
    constructor(props){
        super(props);
        this.state={
            schedule:{}
        }
    }

    componentWillMount(){
        const {scheduleId}=this.props.ticket
        var successAction=(result)=>{
            const schedule=result.content
            this.setState({
                schedule:schedule
            })
        }
        this.get("/schedule/"+scheduleId,successAction)
    }

    onClick=()=>{
        return 
    }
    
    render(){
        const {ticket}=this.props;
        //todo:ticket没有自己的fare
        const {id,rowIndex,columnIndex,seatType,state}=ticket
        const {movieName,startTime,endTime,hallName,fare}=this.state.schedule
        var type=seatType
        switch (type){
            case 1:
                type="普通座"
                break;
            case 2:
                type="情侣座"
                break;
            case 3:
                type="4D座"
                break;
        }
        return (
            <Button  onClick={this.onClick} style={styles.button}>
                <Row type="flex" justify="center">

                    <Col span={3} >
                        <Row style={styles.courseItem}>电影票Id</Row>
                        <Typography style={styles.content}>
                            {id}
                        </Typography>
                    </Col>

                    <Col span={4} >
                        <Row style={styles.courseItem}>电影名</Row>
                        <Typography style={styles.content}>
                            {movieName}
                        </Typography>
                    </Col>

                    <Col span={4}>
                        <Row style={styles.courseItem}>时间</Row>
                        <Typography style={styles.content}>
                            {this.handleTime(""+startTime)
                            +"至"+this.handleTime(""+endTime)}
                        </Typography>
                    </Col>

                    <Col span={4} >
                        <Row style={styles.courseItem}>影厅</Row>
                        <Typography style={styles.content}>{hallName}</Typography>
                    </Col>

                    <Col span={4}>
                        <Row style={styles.courseItem}>座位</Row>
                        <Typography style={styles.content}>{
                            rowIndex+"排"+columnIndex+"座 "+type
                        }</Typography>
                    </Col>

                    <Col span={3}>
                        <Row style={styles.courseItem}>票价</Row>
                        <Typography style={styles.content}>
                            {fare}
                        </Typography>
                    </Col>

                    <Col span={3}>
                        <Row style={styles.courseItem}>状态</Row>
                        <Typography style={styles.content}>
                            {state}
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
