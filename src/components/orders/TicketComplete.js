import React from "react";
import BaseComponent from '../BaseComponent'
import { Row, Col, AutoComplete,Button, Divider,Checkbox } from 'antd';
import {Typography} from '@material-ui/core';
import "moment/locale/zh-cn"
var moment = require('moment');
export default class TicketComplete extends BaseComponent {
    constructor(props){
        super(props);
        this.state={
            selected:false
        }
    }

    onClick=()=>{
        this.onChange()
    }

    onChange=()=>{
        const selected=!this.state.selected
        this.setState({selected:selected})
        this.props.onChange(this.props.ticket.id)
    }

    renderCountDown=(_startTime)=>{
        const startTime=_startTime+""
        moment.locale("zh-cn")
        var start=moment(startTime.substring(0,10)+startTime.substring(11,19),
        "YYYY-MM-DDhh:mm:ss").fromNow()

            return(
                <Col span={6}>
                    <Row style={styles.courseItem}>距离开始时间</Row>
                    <Typography style={styles.content}>
                        {start}
                    </Typography>
                </Col>
            )
    }
    
    render(){
        const {ticket}=this.props;
        const {id,name,hall,startTime,endTime,seat}=ticket
        return (
            <Button  onClick={this.onClick} style={styles.button}>
                <Row type="flex" justify="center">

                    <Col span={1} >
                        <Checkbox checked={this.state.selected} onChange={this.onChange}/>
                    </Col>

                    <Col span={2} >
                        <Row style={styles.courseItem}>Id</Row>
                        <Typography style={styles.content}>
                            {id}
                        </Typography>
                    </Col>

                    <Col span={4} >
                        <Row style={styles.courseItem}>电影名</Row>
                        <Typography style={styles.content}>
                            {name}
                        </Typography>
                    </Col>

                    <Col span={4}>
                        <Row style={styles.courseItem}>时间</Row>
                        <Typography style={styles.content}>
                            {this.handleTime(""+startTime)
                            +"至"+this.handleTime(""+endTime)}
                        </Typography>
                    </Col>

                    <Col span={3} >
                        <Row style={styles.courseItem}>影厅</Row>
                        <Typography style={styles.content}>{hall}</Typography>
                    </Col>

                    <Col span={4}>
                        <Row style={styles.courseItem}>座位</Row>
                        <Typography style={styles.content}>
                            {seat}
                        </Typography>
                    </Col>
                    {this.renderCountDown(startTime)}
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
