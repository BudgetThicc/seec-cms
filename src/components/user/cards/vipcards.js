import React from "react"
import BaseComponent from '../../BaseComponent'
import { Row,Card,Typography,Icon,Col,Button,Modal} from "antd";
import VipBuy from './vipBuy'
import VipCharge from './vipCharge'
import ErrorPage from '../../ErrorPage'

export default class VipCards extends BaseComponent{

    constructor(props) {
        super(props);
        this.state={
            cards:[],
            visible:false,
            content:<VipBuy onCancel={this.onCancel}/>
        }
        this.getAllCards()
    }

    onCancel=()=>{
        this.setState({
            visible:false
        })
    }

    renderCoupons=()=>{
        const {cards}=this.state
        if(cards.length==0){
            return(
                <Row style={{marginTop:40}}> 
                    <ErrorPage text="无会员卡"/>
                </Row>
            )
        }else{
            return cards.map(this.renderCoupon)
        }
    }

    buyVip=()=>{
        this.setState({
            visible:true,
            content:<VipBuy onCancel={this.onCancel}/>
        })
    }

    charge=(id)=>{
        this.setState({
            visible:true,
            content:<VipCharge
            vipId={id}
            onCancel={this.onCancel}/>
        })
    }

    renderCoupon=(item)=>{
        return(
            <Col xs={24} sm={24} lg={12} style={{padding:10}}>
                <Card title={item.name} style={{padding:0}} 
                extra={
                    <Button onClick={()=>this.charge(item.id)} type="link">
                        充值
                    </Button>}>
                    <div style={{fontSize:16}}>
                        <p>余额 {item.balance}</p>
                        <p>历史消费金额 {item.monetary}</p>
                    </div>
                </Card>
            </Col>
        )
    }

    render=()=>{
        return(
            <Row>
                <Button 
                size="large"
                onClick={this.buyVip} 
                block style={{margin:15}}>购买会员卡</Button>
                <Row>
                    {this.renderCoupons()}
                </Row>
                <Modal
                title={null}
                visible={this.state.visible}
                closable={false}
                footer={null}
                destroyOnClose={true}
                >
                    {this.state.content}
                </Modal>
            </Row> 
        )
    }

    getAllCards=()=>{
        var successAction = (result) => {
            this.setState({cards: result.content})
        }
        this.get('/vip/getByUser/'+this.loadStorage("user").id,successAction)
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