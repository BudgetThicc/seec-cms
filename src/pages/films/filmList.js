import React from "react";
import BaseComponent from '../../components/BaseComponent'
import { Row,Col,Anchor } from 'antd';
import {Typography} from '@material-ui/core';
import FilmCard from './filmCard'

export class FilmList extends BaseComponent {
    constructor(props){
        super(props);
        this.state={
            data1:[//data for column 1,use height for example
                {height:100},
                {height:150},
                {height:120},
                {height:80},
            ],
            data2:[//data for column 2
                {height:70},
                {height:160},
                {height:90},
                {height:100},
            ],
        }
    }



    render(){
        return (
        <Row style={styles.container} >
            <Row id="list" type='flex' justify='center'>
                <Col xs={24} sm={16}>
                    <h3 style={styles.titles}>电影列表</h3>
                </Col>
            </Row>
            <Row  type='flex' justify='center'>
                
                <Col xs={24} sm={16}>
                    {this.renderList()}
                </Col>
            </Row>
        </Row>
        );
    }

    renderList=()=>{
        return(
            <Row  type='flex' justify='space-around'>
                <Col xs={11} sm={10}>
                    {this.state.data1.map(this.renderItem)}
                </Col>
                <Col xs={11} sm={10}>
                    {this.state.data2.map(this.renderItem)}
                </Col>
            </Row>
        )
    }

    renderItem=(item)=>{
        return(
            <FilmCard item={item}/>
        );
    }
}

const styles = {
    container:{
        backgroundColor:"white",
        marginTop:"100px"
    },
    titles:{
        marginLeft:20,
        marginTop:10,
        fontSize:20,
        fontFamily:"黑体"
    }
}

