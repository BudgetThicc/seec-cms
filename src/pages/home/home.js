import React from "react";
import BaseComponent from '../../components/BaseComponent'
import { Row, Col, AutoComplete } from 'antd';

export class Home extends BaseComponent {
    render(){
        return (
            <Row style={styles.container}>
                <Row type='flex' justify='center'>
                    <span>home page (todo)</span>
                </Row>
            </Row>
        );
    }
}

const styles = {
    container:{
        marginTop:"900px"
    }
}

