import React from "react";
import BaseComponent from '../../../components/BaseComponent'
import { Row, Col, AutoComplete, Select, Divider, Typography,Button,Dropdown,Menu } from 'antd';

const {Option}=Select
var moment = require('moment');
var times=["00:00","03:00","06:00","09:00","12:00","15:00","18:00","21:00"]
export class Schedule extends BaseComponent {
    constructor(props){
        super(props);
        this.state={
            current:"",
            hallIds:[],
            hallNames:[],
            scheduleList:[]
        }
    }

    componentWillMount(){
        var successAction=(result)=>{
            if(result.content.length>0){
                var _id=result.content[0].id+""
                var hallIds=[]
                var hallNames=[]
                result.content.map((hall)=>{
                        hallIds.push(hall.id+"")
                        hallNames.push(hall.name)
                    }
                )
                this.setState({hallIds,hallNames,current:_id+""})
                this.fetchSchedule(_id+"")
            }
        }
        this.get("/hall/all",successAction)
    }

    fetchSchedule=(hallId)=>{
        var successAction=(result)=>{
            this.setState({
                scheduleList:result.content
            })
            this.pushNotification("",hallId)
        }
        var url="/schedule/search"
        url+="?hallId="+hallId+"&"
        url+="startDate="+moment().format("YYYY/MM/DD")

        this.get(url,successAction)
    }

    handleStart=(date)=>{
        if(date){
            date+=""
            var hour=parseInt(date.substring(11,13))
            var minute=parseInt(date.substring(14,16))
            return (120*hour+2*minute)
        }
    }

    handleLength=(date1,date2)=>{
        if(date1&&date2){
            date1+=""
            date2+=""
            var hour1=parseInt(date1.substring(11,13))
            var minute1=parseInt(date1.substring(14,16))
            var hour2=parseInt(date2.substring(11,13))
            var minute2=parseInt(date2.substring(14,16))
            var hour=hour2-hour1
            var minute=minute2-minute1
            return(120*hour+2*minute)
        }
    }

    renderSchedule=(item)=>{
        const width=this.handleLength(item.startTime,item.endTime)
        const start=this.handleStart(item.startTime)
        const style={
            width:width,
            positon:"absolute",
            left:start,
            height:88,
            backgroundColor:"#1890ff",
            opacity:0.8,
            borderRadius:5
        }
        const menu=(
            <Menu>
            <Menu.Item>
                <Row type="flex" justify="start">
                    <Typography style={styles.detail2}>电影名：{item.movieName}</Typography>
                </Row>
            </Menu.Item>
            <Menu.Item>
                <Row type="flex" justify="start">
                    <Typography style={styles.detail2}>影厅：{item.hallName}</Typography>
                    <Typography style={styles.detail2}>
                        {this.handleTime(item.startTime)+"-"+this.handleTime(item.endTime)}
                    </Typography>
                </Row>
            </Menu.Item>
            <Menu.Item>
                <Row type="flex" justify="start">
                    <Typography style={styles.detail2}>票价：{item.fare}</Typography>
                </Row>
            </Menu.Item>
            <Menu.Item>
                <Row type="flex" justify="start">
                    <Typography style={styles.detail2}>{"排片Id："+item.id}</Typography>
                </Row>
            </Menu.Item>
            </Menu>
        )
        return(
            <Dropdown overlay={menu}>
            <Button style={style} type="default">
                <Row type="flex" justify="center">
                    <Typography style={styles.detail}>{item.movieName}</Typography>
                    <Typography style={styles.detail}>{item.hallName}</Typography>
                    <Typography style={styles.detail}>
                        {this.handleTime(item.startTime)+"-"+this.handleTime(item.endTime)}
                    </Typography>
                </Row>
            </Button>
            </Dropdown>
        )
    }

    renderSchedules=(item)=>{
        return(
            <Row type="flex" style={{width:3040}}>
                <Col style={styles.date} type="flex" justify="center" align="middle">
                    {this.handleDate(item.date)}
                </Col>
                
                <Col style={{width:2880,marginLeft:10}} type="flex">
                    {item.scheduleItemList.map(this.renderSchedule)}
                </Col>
                <Divider style={{margin:0}}/>
            </Row>
        )
    }

    renderTimes=(text)=>{
        return(
            <Col style={{fontSize:20,width:360}} type="flex" justify="start">
                <Divider type="vertical" style={{backgroundColor:"black",height:20}}/>
                {text}
            </Col>
        )
    }

    renderDates=()=>{
        return(
            <Row>
                <Row type="flex" style={{marginLeft:110,width:2880}}>
                    {times.map(this.renderTimes)}
                </Row>
                {this.state.scheduleList.map(this.renderSchedules)}
            </Row>
        )
    }

    renderOption=(item,index)=>{
        const hallName=this.state.hallNames[index]
        return(
            <Option style={{fontSize:20}} value={item}>{hallName}</Option>
        )
    }

    handleChange=(value)=>{
        this.setState({current:value})
        this.fetchSchedule(value)
    }

    render(){
        const {current}=this.state
        return (
            <Row  type='flex' justify='center' style={styles.container}>
                <Col span={22}>
                <Row style={{fontSize:22}} type='flex' justify='center'>
                    排片信息
                </Row>
                <Select defaultValue={"1"} 
                size="large"
                style={{ width: 300,marginBottom:20,fontSize:20 }} 
                onChange={this.handleChange}>
                    {this.state.hallIds.map(this.renderOption)}
                </Select>
                <div style={styles.scrollable}>
                    {this.renderDates()}
                </div>
                </Col>
            </Row>
        );
    }
}

const styles = {
    container:{
        marginTop:"10px",
    },
    scrollable:{
        width:"100%",
        overflowX:"scroll",
        overflowY:"scroll",
    },
    date:{
        width:100,
        fontSize:20,
        alignText:"center",
        height:90
    },
    detail:{
        color:"white",
        fontSize:18,
        margin:5
    },
    detail2:{
        color:"black",
        fontSize:18,
        margin:5
    }
}

