import React from "react";
import BaseComponent from '../../components/BaseComponent'
import { Row, Skeleton,Col,Button,Icon,Divider,Tabs} from 'antd';
import {Typography,Grid} from '@material-ui/core';

const { TabPane } = Tabs;
var count=0
class FilmDrawer extends BaseComponent {

    constructor(props) {
        super(props);
        this.state={
            schedules:null,
        }
    }

    componentDidMount(){
        var successAction=(result)=>{
            if(!result.content)
                this.setState({schedules:"暂无排片信息"})
            else
                this.setState({schedules:result.content})
        }
        this.get("/schedule/search/audience?movieId="+this.props.item.id,successAction)
    }

    renderSchedules=()=>{
        this.pushNotification("success",""+this.state.schedules)
        if(this.state.schedules==null)
            return <Skeleton active> </Skeleton>
        else if(this.state.schedules=="暂无排片信息")
            return (
                <Row>
                    <Typography style={{fontSize:18}}>暂无排片信息</Typography>
                </Row>
            )
        else
            return(
                <Tabs>
                    {this.state.schedules.map(this.renderTab)}
                </Tabs>
            )
    }

    renderTab=(schedule)=>{
        const {date,scheduleItemList}=schedule;
        count++
        return(
            <TabPane
            tab={
                <span><Icon type="clock-circle" />{date}</span>
            }
            key={""+count}>
            </TabPane>

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
                <Row type="flex" align="middle">
                    <Col style={{marginLeft:5}}>
                        <Typography style={styles.name}>{name}</Typography>
                        {this.renderStatus()}
                    </Col>
                </Row>
                <Row style={styles.rows}>
                    <Typography style={styles.description}>{"类型："+type}</Typography>
                    <Typography style={styles.description}>{"导演："+director}</Typography>
                    <Typography style={styles.description}>{"主演："+starring}</Typography>
                    <Divider/>
                    <Typography style={styles.description}>{description}</Typography>
                    <Divider/>
                </Row>
                <Row style={styles.rows}>
                    {this.renderSchedules()}
                </Row>
            </Row>
        )
    }

    render(){
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
    description1:{
        marginTop:"5px",
        color:"black",
        fontSize:"16px",
    }
}

export default FilmDrawer;
