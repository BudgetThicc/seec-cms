import React from "react";
import BaseComponent from '../../../components/BaseComponent'
import { Row, Col, AutoComplete,Steps,Icon,Button } from 'antd';
import {SeatSelection,OrderConfirm,TicketConfirm ,OrderComplete} from "./orderSteps"

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
var scheduleId=null
export class Schedule extends BaseComponent {

    constructor(props){
        super(props);
        if(this.props.location.state){
            const scheduleId=this.props.location.state.scheduleId
            this.state={
                current:0,
                content:[],
                selected:[],
                seats:[],
                schedule:{},
                tickets:[],
                coupons:[],
                loading:false,
                completeTickets:[],
                completeCoupon:null
            }
        }
    }

    componentWillMount(){
        if(this.props.location.state!=null){
            scheduleId=this.props.location.state.scheduleId
            this.state.content.push(
                <SeatSelection 
                selected={this.state.selected}
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
            var successAction=(result)=>{
                const {seats,scheduleItem}=result.content
                this.setState({
                    seats:seats,
                    schedule:scheduleItem
                })
            }
            this.get("/ticket/get/occupiedSeats?scheduleId="+scheduleId,successAction)
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

    setCompleteTickets=(tickets,coupon)=>{
        const _coupon=0
        if(coupon!=null&&coupon.coupon!=null){
            _coupon=coupon.coupon.id
        }
        this.setState({
            completeTickets:tickets,
            completeCoupon:_coupon
        })
    }

    next() {
        const current = this.state.current + 1;
        this.setState({ 
            current:current,
            loading:false
         });
    }
    
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    lockSeat(){
        const user=JSON.parse(localStorage.getItem("user"))
        const selected=this.state.selected
        let form = new FormData();
        this.setState({loading:true})
        form.append('userId', user.id);   
        form.append('scheduleId', scheduleId); 
        if(selected.length==0)
            this.pushNotification("danger","未选中任何座位")
        for(var i=0;i<selected.length;i++){
            const x=selected[i][0]
            const y=selected[i][1]
            const type=this.state.seats[x][y]
            form.append("seats["+i+"].columnIndex",y+1)
            form.append("seats["+i+"].rowIndex",x+1)
            form.append("seats["+i+"].seatType",type)
        }  
        var successAction=(result)=>{
            this.state.tickets=result.content.ticketVOList
            this.state.coupons=result.content.coupons
            this.state.content.push(
                <TicketConfirm
                tickets={this.state.tickets}
                coupons={this.state.coupons}
                fare={this.state.schedule.fare}
                setCompleteTickets={this.setCompleteTickets}/>
            )
            this.pushNotification("success","锁座成功")
            this.next()
        }
        this.post("/ticket/lockSeat",form,successAction)
    }

    pay=()=>{
        const ticketId=this.state.completeTickets
        const couponId=this.state.completeCoupon
        var url="/ticket/buy?"
        url+="couponId="+couponId
        ticketId.map((id)=>
            {url+="&"+"ticketId="+id}
        )
        var successAction=(result)=>{
            this.pushNotification("success","购票成功")
            this.state.content.push(
                <OrderComplete/>
            )
            this.next()
        }
        this.post(url,null,successAction)
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
        return(
            <Col span={20}>
                <Row style={styles.rows} type="flex" justify="end">
                    {this.renderLeftButton()}
                    {this.renderRightButton()}
                </Row>
            </Col>
        )
    }

    renderLeftButton=()=>{
        const {current}=this.state
        switch (current){
            case 0:
                return null;
            case 1:
                return (
                    <Button size="large" onClick={() => this.prev()}>
                        返回选座
                    </Button>)
            case 2:
                return (
                    <Button size="large" onClick={() => this.props.history.goBack()}>
                        稍后支付
                    </Button>
                )
        }
        return null;
    }

    renderRightButton=()=>{
        const {current}=this.state
        switch (current){
            case 0:
                return (
                    <Button
                    disabled={this.state.selected.length==0}
                    size="large" 
                    style={{ marginLeft: 10 }} 
                    type="primary" 
                    onClick={() => this.next()}>
                        下一步
                    </Button>
                )
            case 1:
                return (
                    <Button loading={this.state.loading} size="large" style={{ marginLeft: 10 }} onClick={() => this.lockSeat()} type="primary" >
                        确认锁座
                    </Button>)
            case 2:
                return (
                    <Button size="large" style={{ marginLeft: 10 }} onClick={() => this.pay()} type="primary" >
                        确认支付
                    </Button>
                )
            case 3:
                return (
                    <Button size="large" style={{ marginLeft: 10 }} onClick={() => this.props.history.goBack()} type="primary" >
                        返回此前页面
                    </Button>
                )
        }
        return null;
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

