import React from "react";
import BaseComponent from '../../../components/BaseComponent' 
import Seat from "./seat"
import { Row, Col,Button,Divider } from 'antd';
import {Typography} from '@material-ui/core';

var row=-1
export class SeatSelection extends BaseComponent {
    constructor(props){
        super(props);
        this.state={
            isLocked:[[]],
            seats:[[]],
            selected:[[]],
            schedule:{}
        }
    }
    
    componentWillMount(){
        if(this.props.scheduleId!=undefined){
            var successAction=(result)=>{
                const {isLocked,seats,scheduleItem}=result.content
                this.setState({
                    isLocked:isLocked,
                    seats:seats,
                    schedule:scheduleItem
                })
            }
            this.get("/ticket/get/occupiedSeats?scheduleId="+this.props.scheduleId,successAction)
        }
    }

    addSelected=(x,y)=>{
        const selected=this.state.selected
        selected.push([x,y])
        this.setState({
            selected:selected
        })
    }

    removeSelected=(x,y)=>{
        const selected=this.state.selected
        for(var i=0;i<selected.length;i++){
            if(selected[i][0]==x&&selected[i][1]==y){
                selected.splice(i,1)
            }
        }
        this.setState({
            selected:selected
        })
    }

    renderSeat=(item,index)=>{
        const isLocked=this.state.isLocked[row][index] 
        const seats=this.state.seats[row][index] 
        return(
        <Seat 
        x={row}
        y={index}
        isLocked={isLocked} 
        seats={seats}
        addSelected={this.addSelected}
        removeSelected={this.removeSelected}/>)
    }

    renderRow=(item,index)=>{
        row=index;
        const rowLength=item.length+2;
        return(
            <Row style={{minWidth:50*rowLength}} type="flex" justify="center">
                {item.map(this.renderSeat)}
            </Row>
        );
    }

    renderTicket=(item)=>{
        const row=item[0]+1
        const col=item[1]+1
        if(item.length!=0)
            return(
                <Row>
                    <Typography>{row+"排"+col+"座"}</Typography>
                </Row>
            )
        else
            return null
    }

    renderTickets=()=>{
        const {selected,schedule}=this.state;
        const {movieName,hallName,startTime,endTime}=schedule
        return(
            <Row type="flex" justify='start'>
                <Col span={24}>
                    <Typography style={styles.name}>{movieName}</Typography>
                </Col>
                <Col span={24}>
                    <Typography style={styles.name2}>{hallName}</Typography>
                </Col>
                <Col span={24}>
                    <Typography style={styles.name2}>{
                        this.handleTime(startTime)+"~"+
                        this.handleTime(endTime)
                        }</Typography>
                </Col>
                <Col>
                    {selected.map(this.renderTicket)}
                </Col>
            </Row>
        )
    }

    render(){
        return (
            <Row style={styles.rows}>
                <Row type='flex' justify='center'>
                    <Col xs={24} sm={24} lg={19}>
                        <div style={styles.scrollable}>
                            {this.state.seats.map(this.renderRow)}
                        </div>
                    </Col>
                    <Col xs={0} sm={0} lg={1}>
                        <Divider style={{height:"100%"}} type="vertical" />
                    </Col>
                    <Col xs={24} sm={24} lg={4}>
                        {this.renderTickets()}
                    </Col>
                </Row>
            </Row>
        );
    }
}

const styles = {
    rows:{
        marginTop:40
    },
    name:{
        fontSize:"22px",
        color:"black",
        fontFamily:"黑体",
        marginLeft:10
    },
    name2:{
        fontSize:"22px",
        fontFamily:"黑体",
        marginLeft:10
    },
    scrollable:{
        width:"90%",
        overflowX:"scroll",
        overflowY:"scroll",
    }
}