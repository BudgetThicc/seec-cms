import React from "react";
import BaseComponent from '../../../../components/BaseComponent'
import { Row, Col, AutoComplete, Button, Affix, Icon } from 'antd';
import TicketComplete from '../../../../components/orders/TicketComplete'

export class Incomplete extends BaseComponent {
    constructor(props){
        super(props);
        this.state={
            selected:[]
        }
    }

    refresh=()=>{
        this.setState({selected:[]})
        this.props.refresh()
    }

    onClick=()=>{
        var successAction=()=>{
            this.pushNotification("success","购票成功")
            this.refresh()
        }
        var unsuccessAction=()=>{
            this.pushNotification("danger","购票失败，请刷新票务信息后再试")
            this.refresh()
        }
        var url="/ticket/buy?couponId=0&"
        const selected=this.state.selected
        for(var i=0;i<selected.length;i++){
            url+="ticketId="+selected[i]
            if(i!=selected.length-1)
                url+="&"
        }
        this.post(url,null,successAction,unsuccessAction)
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
                <Affix offsetTop={30}>
                    <Button
                    onClick={this.onClick}
                    type="primary" 
                    disabled={this.state.selected.length==0}>
                        <Icon type="close-circle" />
                        支付
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

