import React from "react";
import BaseComponent from '../../components/BaseComponent'
import { Row, Skeleton,Col,Button,Icon} from 'antd';
import { showDrawer } from '../../redux/actions/action';
import {Typography,Grid} from '@material-ui/core';


class FilmDrawer extends BaseComponent {

    constructor(props) {
        super(props);
    }

    renderName=(name)=>{
        return(
            <Row type="flex" justify="center">
                <Typography style={styles.name2}>
                    {name}
                </Typography>
            </Row>
        )
    }

    renderHidablePoster=()=>{
        const {posterUrl,name}=this.props.item
        return(
            <div>
                <div style={styles.statusContainer}>
                    {this.renderStatus()}
                </div>
                <img src={posterUrl} style={styles.poster}/>
                <div style={styles.hover}>
                    <Row style={{zIndex:8}}>  
                        <Col xs={24} sm={24} lg={0}>
                            {this.renderName(name)}
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }

    renderStatus=()=>{
        let status=this.props.item.status
        switch(status){
            case 0:
                status="热映中";
                break;
            case 1:
                status="已下架";
                break;
        }
        return(
            <Typography style={styles.status} align='center'>{status}</Typography>
        )
    }

    renderDetail=()=>{
        const {name,starring,director,description,type}=this.props.item
        return(
            <Row style={styles.detail}>
                <Row  style={styles.rows} type="flex" align="middle">
                    <Col style={{marginRight:20}}>
                        <Typography style={styles.name}>{name}</Typography>
                    </Col>
                    <Col>
                        {this.renderStatus()}
                    </Col>
                </Row>
                <Row>
                    <Typography style={styles.description}>{"类型："+type}</Typography>
                    <Typography style={styles.description}>{"导演："+director}</Typography>
                    <Typography style={styles.description}>{"主演："+starring}</Typography>
                </Row>
            </Row>
        )
    }

    render(){
        const {id,posterUrl}=this.props.item
        return (
            <Row>
                {this.renderDetail()}
            </Row>
        ); 
    }
}

const styles = {
    detail:{
        marginLeft:10,
        marginRight:10
    },
    button:{
        marginRight:10,
        marginLeft:10
    },
    poster:{
        objectFit: "cover",
        position:"relative",
        width:"100%",
        borderRadius:5,
    },
    rows:{
        marginTop:10
    },
    status:{
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor:'#1890ff',
        color:"white",
        paddingLeft:5,
        paddingRight:5,
        paddingTop:5,
        paddingBottom:5,
        borderRadius:5,
        fontSize: 15,
        width:"60px"
    },
    statusContainer:{
        position:"absolute",
        height:"40px",
        left:"10px",right:0,
        top:"10px",
        zIndex:6,
    },
    hover:{
        position:"absolute",
        height:"50px",
        left:0,right:0,
        bottom:0,
        zIndex:5,
        backgroundImage:"linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1))"
    },
    name:{
        fontSize:"22px",
        color:"#0050b3",
        fontFamily:"黑体"
    },
    name2:{
        marginTop:"10px",
        color:"white",
        fontSize:"20px",
        fontFamily:"黑体"
    },
    description:{
        marginTop:"3px",
        color:"black",
        fontSize:"16px",
    },
}

export default FilmDrawer;
