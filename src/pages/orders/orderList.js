import React from "react";
import BaseComponent from '../../components/BaseComponent'
import { Row, Col, AutoComplete,Tabs,Button,Icon,Typography,Modal,Skeleton } from 'antd';
import * as Stats from "./stats" 

const { TabPane } = Tabs;
const titles=["未完成","已完成","已退票","已过期"]
const icons=["loading","check-circle","close-circle","clock-circle"]
export class OrderList extends BaseComponent {

    constructor(props){
        super(props);
        this.state={
            loading:true,
            contents:[],
            tickets:[],
            visible:true
        }
    }

    componentWillMount(){
        this.loadContent()
    }

    componentDidMount(){
        if(this.props.user){
            const {id}=this.props.user
            var successAction=(result)=>{
                this.state.tickets=result.content
                this.state.loading=false
                this.loadContent()
            }
            this.get("/ticket/get/"+id,successAction)
        }
    }

    loadContent=()=>{
        let contents=[]
        const tickets=this.state.tickets
        contents.push(
            <Stats.Incomplete tickets={tickets}/>,
            <Stats.Complete tickets={tickets}/>,
            <Stats.Canceled tickets={tickets}/>,
            <Stats.Expired tickets={tickets}/>
        )
        this.setState({contents:contents})
    }

    renderTabPane=(item,index)=>{
        if(!this.state.loading)
            return(
                <TabPane
                tab={<span>
                        <Icon type={icons[index]} />
                        {titles[index]}
                    </span>}
                key={index}
                >
                    {(item)}
                </TabPane>
            )
        else
            return(
                <TabPane
                tab={<span>
                        <Icon type={icons[index]} />
                        {titles[index]}
                    </span>}
                key={index}
                >
                    <Skeleton active/>
                </TabPane>
            )
    }

    render(){
        return (
            <Row style={styles.container} type='flex' justify='center'>
                <Col xs={20} sm={20} lg={18}>
                    <Typography style={styles.title}>订单列表</Typography>
                </Col>
                <Col xs={22} sm={20} lg={18}>
                    <Tabs defaultActiveKey="1">
                        {this.state.contents.map(this.renderTabPane)}
                    </Tabs>
                </Col>
            </Row>
        );
    }
}

const styles = {
    container:{
        marginTop:"50px"
    },
    title:{
        fontSize:"22px",
        color:"#1890ff",
        marginBottom:20,
        fontFamily:"黑体"
    },
}