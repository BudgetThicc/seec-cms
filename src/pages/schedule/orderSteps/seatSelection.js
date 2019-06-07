import React from "react";
import BaseComponent from '../../../components/BaseComponent'
import { Row, Col, AutoComplete } from 'antd';

export class SeatSelection extends BaseComponent {
    constructor(props){
        super(props);
    }
    
    componentWillMount(){
        if(this.props.scheduleId!=undefined){
            var successAction=(result)=>{
                this.pushNotification("success",JSON.stringify(result.content))
            }
            this.get("/ticket/get/occupiedSeats?scheduleId="+this.props.scheduleId,successAction)
        }
    }
    render(){
        return (
            <Row>
                <Row type='flex' justify='center'>
                    <span>{this.props.scheduleId}</span>
                </Row>
            </Row>
        );
    }
}

const styles = {

}