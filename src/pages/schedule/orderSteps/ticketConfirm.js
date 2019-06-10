import React from "react";
import BaseComponent from '../../../components/BaseComponent'
import { Row, Col,Button,Divider,Select } from 'antd';
import {Typography} from '@material-ui/core';
import Ticket from "../../../components/Ticket";

const { Option } = Select;
export class TicketConfirm extends BaseComponent {
    constructor(props){
        super(props);
        this.state={
            ticketsSelected:[],
            couponSelected:[]
        }
    }

    componentWillMount(){
        this.props.tickets.map((item)=>{
            this.state.ticketsSelected.push(item.id)}
        )
    }

    handleCouponChange=(value)=>{
        this.setState({
            couponSelected:value
        })
    }

    handleTicketChange=(value)=>{
        const {ticketsSelected}=this.state
        for(var i=0;i<ticketsSelected.length;i++){
            if(value==ticketsSelected[i]){
                ticketsSelected.splice(i,1)
                this.setState({ticketsSelected})
                return
            }
        }
        ticketsSelected.push(value)
        this.setState({ticketsSelected})
    }

    handleAmount=(ticketsSelected)=>{
        let amount=0;
        this.props.tickets.map(
            (ticket)=>{
                for(var i=0;i<ticketsSelected.length;i++){
                    if((ticketsSelected[i]+"")==(ticket.id)+"")
                        amount+=this.props.fare
                }
            }
        )
        return amount+"";
    }
    
    renderTicket=(item)=>{
        if(item){
            return(
                <Ticket ticket={item} onChange={this.handleTicketChange}/>
            )
        }
        else
            return null
    }

    renderCoupon=(coupon)=>{
        return(
            <Option value={coupon.id}>{coupon.description}</Option>
        )
    }

    renderOrderDetail=(ticketsSelected)=>{
        return(
            <div>
                <Row>
                    {this.handleAmount(ticketsSelected)}
                </Row>
                <Row>
                    {this.state.ticketsSelected+""}
                </Row>
            </div> 
        )
    }

    render(){
        return (
            <Row style={styles.rows}>
                <Row type='flex' justify='center'>
                    <Col xs={24} sm={24} lg={17} >
                        <Typography style={{fontSize:20}}>已锁定影票列表</Typography>
                        <Row type="flex" justify="center" style={styles.rows}>
                            {this.props.tickets.map(this.renderTicket)}
                        </Row>
                    </Col>
                    <Col xs={0} sm={0} lg={1}>
                        <Divider style={{height:"100%"}} type="vertical" />
                    </Col>
                    <Col xs={24} sm={24} lg={6}>
                        {this.renderOrderDetail(this.state.ticketsSelected)}
                    </Col>
                </Row>
                <Row type="flex" justify='end'>
                    <Col style={{marginRight:20}}>
                        <Select size="large" defaultValue={null} style={{ width: 240}} onChange={this.handleCouponChange}>
                            <Option value={null}>不使用优惠券</Option>
                            {this.props.coupons.map(this.renderCoupon)}
                        </Select>
                    </Col>
                </Row>
            </Row>
        );
    }
}

const styles = {
    rows:{
        marginRight:40
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