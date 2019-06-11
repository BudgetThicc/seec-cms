import React from "react";
import BaseComponent from '../../../components/BaseComponent'
import { Row, Col, AutoComplete, Button, Affix, Icon } from 'antd';
import TicketIncomplete from '../../../components/orders/TicketIncomplete'

export class Canceled extends BaseComponent {
    constructor(props){
        super(props);
        this.state={
        }
    }

    renderTicket=(ticket)=>{
        return(
            <TicketIncomplete  ticket={ticket} />
        )
    }

    render(){
        return (
            <Row style={styles.container}>
                <Row type='flex' justify='center' style={{marginRight:30}}>
                    {this.props.tickets.map(this.renderTicket)}
                </Row>
            </Row>
        );
    }
}

const styles = {
    container:{
        marginTop:"10px"
    },
}

