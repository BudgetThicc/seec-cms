import React from "react";
import BaseComponent from '../../../components/BaseComponent'
import { Row, Col,Button,Divider } from 'antd';
import {Typography} from '@material-ui/core';
import Ticket from "../../../components/Ticket";

export class TicketConfirm extends BaseComponent {
    constructor(props){
        super(props);
        this.state={
            tickets:this.props.tickets
        }
    }

    renderTicket=(item)=>{
        if(item){
            return(
                <Ticket ticket={item}/>
            )
        }
        else
            return null
    }

    renderOrderDetail=()=>{
        return(
           <div/> 
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
                        {this.renderOrderDetail()}
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