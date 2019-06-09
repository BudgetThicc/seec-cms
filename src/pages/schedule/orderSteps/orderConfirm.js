import React from "react";
import BaseComponent from '../../../components/BaseComponent'
import { Row, Col,Button,Divider } from 'antd';
import {Typography} from '@material-ui/core';
import Order from '../../../components/Order'
import { thisExpression } from "@babel/types";

var row=-1
export class OrderConfirm extends BaseComponent {
    constructor(props){
        super(props);
        this.state={
            tickets:[],
            schedule:{},
            seats:[[]]
        }
    }

    componentWillMount(){
        if(this.props.scheduleId!=undefined){
            var successAction=(result)=>{
                const {seats,scheduleItem}=result.content
                this.setState({
                    seats:seats,
                    schedule:scheduleItem
                })
            }
            this.get("/ticket/get/occupiedSeats?scheduleId="+this.props.scheduleId,successAction)
        }
    }

    renderTicket=(item)=>{
        if(item.length!=0&&this.state.seats[0].length!=0){
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
                <Row style={{width:"100%"}}>
                    <Divider style={{margin:0}}/>
                    <Order 
                    schedule={this.state.schedule}
                    item={item}
                    type={type}/>
                </Row>
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
                        
                        <Typography style={{fontSize:20}}>已选中座位列表</Typography>
                        <Row type="flex" justify="center" style={styles.rows}>
                            {this.props.selected.map(this.renderTicket)}
                        </Row>
                    </Col>
                    {/* <Col xs={0} sm={0} lg={1}>
                        <Divider style={{height:"100%"}} type="vertical" />
                    </Col>
                    <Col xs={24} sm={24} lg={6}>
                        {this.renderOrderDetail()}
                    </Col> */}
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