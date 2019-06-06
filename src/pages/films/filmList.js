import React from "react";
import BaseComponent from '../../components/BaseComponent'
import { Row,Col,Anchor } from 'antd';
import {Typography} from '@material-ui/core';
import FilmCard from './filmCard'

export class FilmList extends BaseComponent {
    constructor(props){
        super(props);
        this.state={
            data1:[
            ],
            data2:[
            ],
            loading:true
        }
    }

    componentDidMount(){
        if(this.state.data1.length==0)
            if(this.state.loading)
                this.fetchFilmList()
            else
                this.pushNotification("danger","获取电影失败，请检查网络")
    }

    fetchFilmList=()=>{
        var successAction = (result) => {
            const data1=[]
            const data2=[]
            if(result.content!=null&&result.content.length>0){
                for(var i=0;i<result.content.length;i++){
                    if(i%2==0)
                        data1.push(result.content[i])
                    else
                        data2.push(result.content[i])
                }
                this.state.data1=data1
                this.state.data2=data2
            }
            this.setState({loading:false})   
        }
        this.get("/movie/search?keyword=",successAction)
    }



    render(){
        return (
        <Row style={styles.container} >
            <Row id="listStart" type='flex' justify='center'>
                <Col xs={22} sm={20} lg={18}>
                    <h3 style={styles.titles}>电影列表</h3>
                </Col>
            </Row>
            <Row  type='flex' justify='center'>
                <Col xs={24} sm={22} lg={20}>
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

