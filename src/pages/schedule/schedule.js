import React from "react";
import BaseComponent from '../../components/BaseComponent'
import { Row, Col, AutoComplete,Steps,Icon,Button } from 'antd';
import {SeatSelection,OrderConfirm} from "./orderSteps"

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
export class Schedule extends BaseComponent {

    constructor(props){
        super(props);
        if(this.props.location.state){
            const scheduleId=this.props.location.state.scheduleId
            this.state={
                current:0,
                content:[],
                selected:[[]]
            }
        }
    }

    componentWillMount(){
        if(this.props.location.state!=null){
            const scheduleId=this.props.location.state.scheduleId
            this.state.content.push(
                <SeatSelection 
                scheduleId={scheduleId}
                addSelected= {this.addSelected}
                removeSelected= {this.removeSelected}
                />
            )
            this.state.content.push(
                <OrderConfirm 
                selected={this.state.selected} 
                scheduleId={scheduleId}/>
            )
        }
    }

    componentDidMount(){
        this.setState({current:0})
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
        const {current}=this.state
        return(
            <Row style={styles.rows} type="flex" justify='center'>
                <Col span={18}>
                    {this.state.content[current]}
                </Col>
            </Row>
        );
    }

    renderButton=()=>{
        const {current}=this.state
        return(
            <Col span={20}>
                <Row style={styles.rows} type="flex" justify="end">
                    {current == 1 &&(
                        <Button size="large" onClick={() => this.prev()}>
                            上一步
                        </Button>
                    )}
                    {current < 2 && (
                        <Button size="large" style={{ marginLeft: 10 }} type="primary" onClick={() => this.next()}>
                            下一步
                        </Button>
                    )}
                    {current == 2 &&(
                        <Button size="large" onClick={() => this.props.history.goBack()}>
                            稍后支付
                        </Button>
                    )}
                    {current ==2 && (
                        <Button size="large" style={{ marginLeft: 10 }} type="primary" onClick={() => this.next()}>
                            确认支付
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button size="large" type="primary" onClick={() => this.props.history.goBack()}>
                            完成
                        </Button>
                    )}
                </Row>
            </Col>
        )
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
                    {this.renderButton()}
                </Row>
            )
    }

}

const styles = {
    rows:{
        marginTop:40
    }
}

