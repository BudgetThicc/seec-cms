import React from "react";
import BaseComponent from '../../../components/BaseComponent'
import { Row, Col, AutoComplete } from 'antd';

export class Canceled extends BaseComponent {

    renderOrder=(ticket)=>{
        return(
            <div />
        )
    }

    render(){
        const {tickets}=this.props
        return (
            <Row style={styles.container}>
                <Row type='flex' justify='center'>
                    {this.props.tickets.map(this.renderOrder)}
                </Row>
            </Row>
        );
    }
}

const styles = {
    container:{
        marginTop:"10px"
    }
}

