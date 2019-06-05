import React from "react";
import BaseComponent from '../../components/BaseComponent'
import { Row, Skeleton,Col} from 'antd';
import {Paper,Typography} from '@material-ui/core';

export default class FilmCard extends BaseComponent {

    renderName=(name)=>{
        return(
            <Row type="flex" justify="center">
                <Typography style={styles.name}>
                    {name}
                </Typography>
            </Row>
        )
    }

    render(){
        const {id,name,
            posterUrl,
            director,description,
            starring,type,country}
            =this.props.item
        return (//lg时并排显示，否则取消描述，仅保留标题
        <Paper elevation={6} style={styles.paper}>
            <Row >
                <Col xs={24} sm={24} lg={8}>
                    <div>
                        <img src={posterUrl} style={styles.poster}/>
                        <div style={styles.hover}>
                            <Row style={{zIndex:8}}>  
                                <Col xs={24} sm={24} lg={0}>
                                    {this.renderName(name)}
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
                <Col xs={0} sm={0} lg={16}>

                </Col>
                {/* <div style={styles.hover}/> */}
            </Row>
        </Paper>
        ); 
    }
}

const styles = {
    paper:{
        marginTop:20,
        marginBottom:20,
        borderRadius:5,
        backgroundColor: '#FFFFFF',
    },
    poster:{
        objectFit: "cover",
        position:"relative",
        height:'100%',
        width:'100%',
        borderRadius:5,
    },
    hover:{
        position:"absolute",
        height:"40px",
        left:0,right:0,
        bottom:0,
        zIndex:5,
        backgroundImage:"linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1))"
    },
    name:{
        marginTop:"10px",
        color:"white",
        fontSize:"18px",
        fontFamily:"黑体"
    }
}
