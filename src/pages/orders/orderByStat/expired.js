import React from "react";
import BaseComponent from '../../../components/BaseComponent'
import { Row, Col, AutoComplete } from 'antd';

export class Expired extends BaseComponent {
    render(){
        return (
            <Row style={styles.container}>
                <Row type='flex' justify='center'>
                    <span>过期</span>
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

