import React from "react";
import BaseComponent from '../../../components/BaseComponent'
import { Row, Col, AutoComplete, Select, Divider } from 'antd';

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
                var _id=result.content[0].id
                var hallIds=[]
                var hallNames=[]
                result.content.map((hall)=>{
                        hallIds.push(hall.id+"")
                        hallNames.push(hall.name)
                    }
                )
                this.setState({hallIds,hallNames,current:_id+""})
                this.fetchSchedule()
            }
        }
        this.get("/hall/all",successAction)
    }

    fetchSchedule=()=>{
        var hallId=this.state.current
        var successAction=(result)=>{
            this.setState({
                scheduleList:result.content
            })
            this.pushNotification("",JSON.stringify(this.state.scheduleList))
        }
        var url="/schedule/search"
        url+="?hallId="+hallId+"&"
        url+="startDate="+moment().format("YYYY/MM/DD")
        this.get(url,successAction)
    }

    renderSchedule=(item)=>{
    }

    renderSchedules=(item)=>{
        return(
            <Row>
                <div style={styles.date}>
                    <Row>{this.handleDate(item.date)}</Row>
                </div>
                <Divider/>
            </Row>
        )
    }

    renderTimes=(text)=>{
        return(
            <Col style={{fontSize:20,width:360}} type="flex" justify="start">
                {text}
            </Col>
        )
    }

    renderDates=()=>{
        return(
            <Row>
                <Row type="flex" style={{width:2880}}>
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
        this.fetchSchedule()
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
        height:60
    }
}

