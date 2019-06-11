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
            incomplete:[],
            complete:[],
            expired:[],
            canceled:[],
            visible:true
        }
    }

    componentWillMount(){
        this.loadContent()
    }

    componentDidMount(){
        if(this.props.user){
            this.refresh()
        }
    }

    refresh=()=>{
        const {id}=this.props.user
        const incomplete=[]
        const complete=[]
        const canceled=[]
        const expired=[]
        var successAction=(result)=>{
            result.content.map((ticket)=>{
                switch(ticket.state){
                    case 0:
                        incomplete.push(ticket)
                        break;
                    case 1:
                        complete.push(ticket)
                        break;
                    case 2:
                        expired.push(ticket)
                        break;
                    case 3:
                        canceled.push(ticket)
                        break;
                    }
                })
            this.setState({incomplete,complete,canceled,expired})
            this.state.loading=false
            this.loadContent()
        }
        this.get("/ticket/get/"+id,successAction)
    }

    loadContent=()=>{
        const {incomplete,complete,canceled,expired}=this.state
        let contents=[]
        const refresh=this.refresh
        contents.push(
            <Stats.Incomplete tickets={incomplete} refresh={refresh}/>,
            <Stats.Complete tickets={complete} refresh={refresh}/>,
            <Stats.Canceled tickets={canceled} refresh={refresh}/>,
            <Stats.Expired tickets={expired} refresh={refresh}/>
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