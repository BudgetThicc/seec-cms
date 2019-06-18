import React from "react"
import BaseComponent from '../../BaseComponent'
import { Row,Card,Typography,Icon,Col,Button} from "antd";
import ErrorPage from '../../ErrorPage'

export default class VipBuy extends BaseComponent{

    constructor(props) {
        super(props);
        this.state={
            cards:[]
        }
        this.getAllCards()
    }

    renderCards=()=>{
        const {cards}=this.state
        if(cards.length==0){
            return(
                <Row style={{marginTop:40}}> 
                    <ErrorPage text="无会员卡"/>
                </Row>
            )
        }else{
            return cards.map(this.renderCard)
        }
    }

    buy=(type)=>{
        var successAction=(result)=>{
            this.pushNotification("success","会员卡购买成功")
        }
        var unsuccessAction=(result)=>{
            this.pushNotification("danger",result.message)
        }
        const userId=this.loadStorage("user").id
        const url="/vip/add"+"?userId="+userId+"&type="+type
        this.post(url,null,successAction,unsuccessAction)
    }

    renderCard=(item)=>{
        return(
            <Col xs={24} sm={24} lg={12} style={{padding:10}}>
                <Card title={item.name} style={{padding:0}} 
                extra={
                    <Button onClick={()=>this.buy(item.type)} type="link">
                        购买
                    </Button>}>
                    <div style={{fontSize:16}}>
                        <p>价格 {item.price}</p>
                        <p>折扣 {item.discount}</p>
                        <p>{item.description}</p>
                    </div>
                </Card>
            </Col>
        )
    }

    render=()=>{
        return(
            <Row>
                <div style={{overflowY:"scroll"}}>
                    {this.renderCards()}
                </div>
                <Button onClick={this.props.onCancel} 
                size="large"  
                style={{margin:5}}
                block>
                    完成
                </Button>
            </Row>
        )
    }

    getAllCards=()=>{
        var successAction = (result) => {
            this.setState({cards: result.content})
        }
        this.get('/vipManagement/getAll',successAction)
    }

}

const styles = {
    title:{
        marginTop:"10px",
        color:"white",
        fontSize:"24px",
        fontFamily:"黑体"
    }
}