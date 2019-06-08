import React from "react";
import BaseComponent from '../../../components/BaseComponent' 
import Seat from "../../../components/Seat"
import { Row, Col,Button,Divider } from 'antd';
import {Typography} from '@material-ui/core';

var row=-1
export class SeatSelection extends BaseComponent {
    constructor(props){
        super(props);
        this.state={
            isLocked:[],
            seats:[],
            selected:[[1,2]],
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
                    schedule:scheduleItem,
                    selected:this.props.selected,
                })
            }
            this.get("/ticket/get/occupiedSeats?scheduleId="+this.props.scheduleId,successAction)
        }
    }

    addSelected=(x,y)=>{
        this.props.addSelected(x,y)
        this.setState({
            selected:this.props.selected
        })
    }

    removeSelected=(x,y)=>{
        this.props.removeSelected(x,y)
        this.setState({
            selected:this.props.selected
        })
    }

    renderSeat=(item,index)=>{
        const isLocked=this.state.isLocked[row][index] 
        const seats=this.state.seats[row][index]
        const selected=this.state.selected
        var _selected=false; 
        for(var i=0;i<selected.length;i++){
            if(row==selected[i][0]&&index==selected[i][1])
                _selected=true
        }
        return(
        <Seat 
        x={row}
        y={index}
        selected={_selected}
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
        if(item.length!=0&&this.state.seats.length!=0){
            const row=item[0]+1
            const col=item[1]+1
            const {fare}=this.state.schedule
            var type=this.state.seats[item[0]][item[1]]
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
            return(
                <Row>
                    <Typography>{row+"排"+col+"座 "+type+" ¥"+fare}</Typography>
                </Row>
            )
        }
        else
            return null
    }

    renderTickets=()=>{
        const {selected,schedule}=this.state;
        const {movieName,hallName,startTime,endTime}=schedule
        return(
            <Row type="flex" justify='center'>
                <Col span={22}>
                    <Typography style={styles.name}>{movieName}</Typography>
                </Col>
                <Col span={22}>
                    <Typography style={styles.name2}>{hallName}</Typography>
                    <Typography style={styles.name2}>{
                        this.handleTime(startTime+"")+"-"+
                        this.handleTime(endTime+"")
                        }</Typography>
                </Col>
                <Col span={22}>
                    {selected.map(this.renderTicket)}
                </Col>
            </Row>
        )
    }

    render(){
        return (
            <Row style={styles.rows}>
                <Row type='flex' justify='center'>
                    <Col xs={24} sm={24} lg={17}>
                        <div style={styles.scrollable}>
                            {this.state.seats.map(this.renderRow)}
                        </div>
                    </Col>
                    <Col xs={0} sm={0} lg={1}>
                        <Divider style={{height:"100%"}} type="vertical" />
                    </Col>
                    <Col xs={24} sm={24} lg={6}>
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
        textAlign:'start',
        fontSize:"22px",
        color:"black",
        fontFamily:"黑体",
    },
    name2:{
        textAlign:'',
        fontSize:"22px",
        fontFamily:"黑体",
    },
    ticket:{
        textAlign:'start',
        fontSize:"18px",
        fontFamily:"黑体",
    },
    scrollable:{
        width:"90%",
        overflowX:"scroll",
        overflowY:"scroll",
    }
}