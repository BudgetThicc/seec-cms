import React from "react"
import BaseComponent from '../../BaseComponent'
import ErrorPage from '../../ErrorPage'
import { Row, Card, Collapse, Icon, Descriptions, Badge ,Skeleton } from "antd";


const Panel = Collapse.Panel;
const Description = Descriptions.Item;

export default class PayRecord extends BaseComponent{

    constructor(props) {
        super(props);
        this.state={
            payRecord: [],
            scheduleInfo:[],
            loading:true
        }
        this.getPayRecord();
    }

    getPayRecord=()=>{
        var successAction = (result) => {
            this.state.payRecord=result.content
            this.transformRecordData();
            this.setState({loading:false})
        }
        this.get('/payRecord/'+this.loadStorage("user").id+'/allPayRecord', successAction)
    }

    transformRecordData=()=>{
        for(var i=0;i<this.state.payRecord.length;i++){
            this.state.scheduleInfo.push({})
            if(this.state.payRecord[i].ticketVOList.length==0) continue
            var scheduleId = this.state.payRecord[i].ticketVOList[0].scheduleId
            var time=this.state.payRecord[i].ticketVOList[0].time
            this.get("/schedule/"+scheduleId,(result)=>{
                if(result.content){
                    let scheduleInfo=this.state.scheduleInfo
                    scheduleInfo[i]={
                        movieName : result.content.movieName,
                        startTime : result.content.startTime,
                        endTime : result.content.endTime,
                        hallName : result.content.hallName,
                        fare : result.content.fare,
                        time : time
                    }
                    this.setState({scheduleInfo})
                }
            })
            
        }
    }

    
    renderDetail=(item)=>{
        if(item.couponName!="" && item.useVIPCard==1){
            return(
                <Descriptions bordered size='small'>
                    <Description label="购票数量">{item.ticketAmount}</Description>
                    <Description label="实付金额" span={3}>{item.totalPay}</Description>
                    <Description label="是否使用优惠券" span={3}>
                        <Badge status="success" text="使用" />
                    </Description>
                    <Description label="优惠券名">{item.couponName}</Description>
                    <Description label="优惠金额" span= {3}>{item.couponDiscount}</Description>
                    <Description label="支付方式">VIP卡支付</Description>
                    <Description label="VIP卡优惠金额">{item.vipDiscount}</Description>
                </Descriptions>
            )
        }else if(item.couponName=="" && item.useVIPCard==1){
            return(
                <Descriptions bordered size='small'>
                    <Description label="购票数量">{item.ticketAmount}</Description>
                    <Description label="实付金额" span={3}>{item.totalPay}</Description>
                    <Description label="是否使用优惠券" span={3}>
                        <Badge status="dafaule" text="未使用" />
                    </Description>
                    <Description label="支付方式">VIP卡支付</Description>
                    <Description label="VIP卡优惠金额">{item.vipDiscount}</Description>
                </Descriptions>
            )
        }else if(item.couponName!="" && item.useVIPCard==0){
            return(
                <Descriptions bordered size='small'>
                    <Description label="购票数量">{item.ticketAmount}</Description>
                    <Description label="实付金额" span={3}>{item.totalPay}</Description>
                    <Description label="是否使用优惠券" span={3}>
                        <Badge status="success" text="使用" />
                    </Description>
                    <Description label="优惠券名">{item.couponName}</Description>
                    <Description label="优惠金额" span= {3}>{item.couponDiscount}</Description>
                    <Description label="支付方式">银行卡支付</Description>
                </Descriptions>
            )
        }else{
            return(
                <Descriptions bordered size='small'>
                    <Description label="购票数量">{item.ticketAmount}</Description>
                    <Description label="实付金额" span={3}>{item.totalPay}</Description>
                    <Description label="是否使用优惠券" span={3}>
                        <Badge status="default" text="未使用" />
                    </Description>
                    <Description label="支付方式">银行卡支付</Description>
                </Descriptions>
            )
        }
    }
  
    renderTicket=(ticket,item)=>{
        const startTime=this.handleDate(item.startTime)+" "+this.handleTime(item.startTime)
        const endTime=this.handleDate(item.endTime)+" "+this.handleTime(item.endTime)
        return(
        <Descriptions bordered size='small'>
            <Description label="影厅名">{item.hallName}</Description><Description label="票价" span={3}>{item.fare}</Description>
            <Description label="座位号">{ticket.rowIndex+"排"+ticket.columnIndex+"列"}</Description>
            <Description label="座位类型" span={3}>{this.renderSeatType(ticket.seatType)}</Description>
            <Description label="开始放映时间">{startTime}</Description>
            <Description label="结束放映时间">{endTime}</Description>
        </Descriptions>
        )
    }
  
    renderSeatType=(type)=>{
        if(type==1){
            return("普通座")
        }else if(type==2){
            return("情侣座")
        }else{return("4D座")}
  }
  
  renderTicketState=(state)=>{
      if(state==1){
          return(
          <Badge status="success" text="可使用" />
          )
    }else if(state==2){
      return(
        <Badge status="default" text="已失效" />
      )
    }else if(state==3){
      return(
        <Badge status="warning" text="已退票" />
      )
    }else{
      return(
        <Badge status="default" text="已失效" />
      )
    }
  }



  render=()=>{
        var key = 0;
        var keywithIn = 0;
        if(this.state.loading)
            return <Skeleton active/>
        if(this.state.payRecord.length==0)
            return <ErrorPage text="无消费记录"/>
        return(
        <Collapse
        bordered={true}
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => <Icon type="money-collect" rotate={isActive ? 90 : 0} />}
        >
        {this.state.payRecord.map((item) => {
            key = key+1;
            const schedule=this.state.scheduleInfo[key]
            if(schedule)
            return(
                <Panel 
                header={<Row style={{fontFamily:"微软雅黑"}}>{schedule.movieName} 下单时间:{schedule.time} <span style={{float:'right'}}>付款金额:{item.totalPay+""}</span></Row>} 
                key={key} style={customPanelStyle} border>
                    <Collapse defaultActiveKey="1" bordered={true}  expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}>
                    {keywithIn = 0}
                    {item.ticketVOList.map((ticket) => {
                        keywithIn = keywithIn+1;
                        return(
                        <Panel 
                        header=
                        {<Row>{"电影票"+keywithIn}
                        <span style = {{float:'right'}}>
                        {this.renderTicketState(ticket.state)}
                        </span>
                        </Row>}
                        key={keywithIn}
                        style = {TicketPanelStyle}
                        border>
                        {this.renderTicket(ticket,schedule)}
                        </Panel>
                        )
                    })}
                </Collapse>
                {this.renderDetail(item)}
                </Panel>        
            )
        })}
        </Collapse>
        )
    }
}

const customPanelStyle = {
    background: '#d9d9d9',
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
    overflow: 'hidden',
  };
  
  const TicketPanelStyle = {
    background: '#e8e8e8',
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
    overflow: 'hidden',
  };