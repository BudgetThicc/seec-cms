import React from "react";
import BaseComponent from '../../components/BaseComponent'
import FilmDrawer from './filmDrawer'
import { Row, Skeleton,Col,Button,Icon} from 'antd';
import { showDrawer } from '../../redux/actions/action';
import {Card,CardActionArea,CardActions,Typography,Grid} from '@material-ui/core';

import { connect } from 'react-redux';
const mapStateToProps = state => ({
    content: state.drawerReducer.content,
    loading: state.drawerReducer.loading,
})

class FilmCard extends BaseComponent {

    constructor(props) {
        super(props);
    }

    toggleDrawer=()=>{
        const content=(<FilmDrawer item={this.props.item}/>)
        this.props.dispatch(showDrawer(content))
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
                    <Col style={{marginRight:40}}>
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

    renderButtons=()=>{
        let {isLike,likeCount}=this.props.item
        let theme="outlined"
        if(!likeCount) likeCount=0
        if(isLike) theme="filled"
        return(
            <Grid container justify="center">
                    <Button style={styles.button} type="link" size="large">
                        <Icon type="heart" theme={theme} />
                        {likeCount+"人想看"}
                    </Button>
                    
                    <Button style={styles.button} type="link"  size="large" onClick={this.toggleDrawer}>
                        查看详情
                        <Icon type="right" />
                    </Button>
            </Grid>
        );
    }

    render(){
        const {id,posterUrl}=this.props.item
        return (//lg时并排显示，否则取消描述，仅保留标题
            <Card elevation={6} style={styles.paper}>
                <CardActionArea>
                    <Row>
                        <Col xs={0} sm={0} lg={8}>
                            <img src={posterUrl} style={styles.poster}/>
                        </Col>
                        <Col xs={0} sm={0} lg={16}>
                            {this.renderDetail()}
                        </Col>
                        <Col xs={24} sm={24} lg={0}>
                            {this.renderHidablePoster()}
                        </Col>
                    </Row>
                </CardActionArea>
                <CardActions>
                    {this.renderButtons()}
                </CardActions>
            </Card>
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

export default connect(mapStateToProps)(FilmCard);
