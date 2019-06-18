import React from "react";
import BaseComponent from '../../../../components/BaseComponent'
import { Row, Col, Modal, Button, Affix, Icon } from 'antd';
import TicketComplete from '../../../../components/orders/TicketComplete'
import RefundPolicy from './refundPolicy'

var moment = require('moment');

export class Complete extends BaseComponent {
    constructor(props){
        super(props);
        this.state={
            selected:[],
            current:["No Policy Available"],
            visible:false,
            content:null
        }
    }    

    descend=(x,y)=>{
        return y.maxTimeBorder-x.maxTimeBorder
    }

    componentWillMount(){
        this.get("/refund/getAll",(result)=>{
            result.content.map((item)=>{
                if(item.inUse==1){
                    let current=item.refundBorderItemList
                    current.sort(this.descend)
                    this.setState({current})
                }
            })
        })
    }
    
    refresh=()=>{
        this.setState({selected:[]})
        this.props.refresh()
    }

    onCancel=()=>{
        this.setState({visible:false})
    }

    refund=()=>{
        var successAction=()=>{
            this.pushNotification("success","退票成功")
            this.refresh()
            this.onCancel()
        }
        var unsuccessAction=()=>{
            this.pushNotification("danger","退票失败，请刷新票务信息后再试")
            this.refresh()
        }
        var url="/ticket/refund?"
        const selected=this.state.selected
        for(var i=0;i<selected.length;i++){
            url+="ticketIdList="+selected[i]
            if(i!=selected.length-1)
                url+="&"
        }
        this.post(url,null,successAction,unsuccessAction)
    }

    handleRemain=()=>{
        let remain=0
        this.props.tickets.map((ticket)=>{
            if(this.state.selected.indexOf(ticket.id)>-1){
                const startTime=ticket.startTime
                let start=moment(startTime.substring(0,10)+startTime.substring(11,19),
                "YYYY-MM-DDhh:mm:ss")-moment()
                start=start/1000/60/60
                const policies=this.state.current
                if(policies[0].maxTimeBorder<start){
                    remain+=ticket.fare*policies[policies.length-1].rate/100
                }else{
                    for(var i=policies.length-2;i>=0;i--){
                        if(start<policies[i].maxTimeBorder){
                            remain+=ticket.fare*policies[i].rate/100
                            break;
                        }
                    }
                }
            }
        })
        return remain
    }

    onClick=()=>{
        this.setState({
            visible:true,
            content:<RefundPolicy 
            current={this.state.current}
            onCancel={this.onCancel}
            num={this.state.selected.length}
            remain={this.handleRemain()} 
            refund={this.refund}/>
        })
    }

    onChange=(id)=>{
        let {selected}=this.state
        for(var i=0;i<selected.length;i++){
            if(id==selected[i]){
                selected.splice(i,1)
                this.setState({selected})
                return;
            }
        }
        selected.push(id)
        this.setState({selected})
    }

    renderTicket=(ticket)=>{
        return(
            <TicketComplete onChange={this.onChange} ticket={ticket} />
        )
    }

    renderAffix=()=>{
        return(
            <div style={styles.affix}>
                <Affix offsetTop={50}>
                    <Button
                    size="large"
                    onClick={this.onClick}
                    type="primary" 
                    disabled={this.state.selected.length==0}>
                        <Icon type="close-circle" />
                        退票
                    </Button>
                </Affix>
            </div>
        )
    }

    render(){
        return (
            <Row style={styles.container}>
                <Row type='flex' justify='center' style={{marginRight:30}}>
                    {this.props.tickets.map(this.renderTicket)}
                </Row>
                <Modal
                title={null}
                visible={this.state.visible}
                closable={false}
                footer={null}
                destroyOnClose={true}
                >
                    {this.state.content}
                </Modal>
                {this.renderAffix()}
            </Row>
        );
    }
}

const styles = {
    container:{
        marginTop:"10px"
    },
    affix:{
        position:"absolute",
        top:5,right:5
    }
}

