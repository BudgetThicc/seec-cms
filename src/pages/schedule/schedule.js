import React from "react";
import BaseComponent from '../../components/BaseComponent'
import { Row, Col, AutoComplete,Steps,Icon } from 'antd';
import {SeatSelection} from "./orderSteps"

const {Step} = Steps
const steps = [
    {
      title: '选座',
      icon: 'gold',
    },
    {
      title: '确认信息',
      icon: 'solution',
    },
    {
      title: '支付',
      icon: 'pay-circle',
    },
    {
      title: '完成',
      icon: 'check-circle',
    }
  ];
const content=[]
export class Schedule extends BaseComponent {

    constructor(props){
        super(props);
        if(this.props.location.state){
            const scheduleId=this.props.location.state.scheduleId
            this.state={
                current:0,
                content:(<SeatSelection scheduleId={scheduleId}/>)
            }
        }
    }

    componentWillMount(){
        if(this.props.location.state!=null){
            const scheduleId=this.props.location.state.scheduleId
            this.state.content=(<SeatSelection scheduleId={scheduleId}/>)
        }
    }

    componentDidMount(){
        this.setState({current:0})
    }

    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }
    
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    renderStep=(item)=>{
        const icon=(<Icon type={item.icon}/>)
        return(
            <Step key={item.title} title={item.title} icon={icon}/>
        );
    }

    renderSchedule=()=>{
        return(
            <Row style={styles.rows} type="flex" justify='center'>
                <Col span={18}>
                    <Steps current={this.state.current}>
                        {steps.map(this.renderStep)}
                    </Steps>
                </Col>
            </Row>
        )
    }

    renderContent=()=>{
        return(
            <Row style={styles.rows} type="flex" justify='center'>
                <Col span={18}>
                    {this.state.content}
                </Col>
            </Row>
        );
    }

    render(){
        if(!this.props.location.state)
            return (
                <Row>
                    <Row type='flex' justify='center'>
                        <span>abnormal Access</span>
                    </Row>
                </Row>
            );
        else
            return (
                <Row>
                    {this.renderSchedule()}
                    {this.renderContent()}
                </Row>
            )
    }

}

const styles = {
    rows:{
        marginTop:40
    }
}

