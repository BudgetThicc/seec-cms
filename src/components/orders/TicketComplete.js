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
            selected:false,
            ticket:this.props.ticket
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
                    <Row style={styles.courseItem}>距上映</Row>
                    <Typography style={styles.content}>
                        {start}
                    </Typography>
                </Col>
            )
    }

    render(){
        const {ticket}=this.props;
        const {id,name,hall,startTime,endTime,seat}=ticket
        if(this.props.ticket!=this.state.ticket){//载入新票重置选择
            this.state.selected=false
            this.state.ticket=this.props.ticket
        }
        const start=moment(startTime.substring(0,10)+startTime.substring(11,19),
        "YYYY-MM-DDhh:mm:ss")-moment()
        const enable=start>0
        return (
            <Button onClick={enable&&this.onClick} style={styles.button}>
                <Row type="flex" justify="center">

                    <Col span={1} >
                        {enable&&<Checkbox disabled={false}
                        checked={this.state.selected} 
                        onChange={this.onChange}/>}
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
