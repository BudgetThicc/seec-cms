import React from "react"
import BaseComponent from '../../BaseComponent'
import { Row,Card,Typography,Icon,Col,Button} from "antd";
import ErrorPage from '../../ErrorPage'

export default class Coupons extends BaseComponent{

    constructor(props) {
        super(props);
        this.state={
            coupons:[]
        }
        this.getAllCoupon()
    }

    renderCoupons=()=>{
        const {coupons}=this.state
        if(coupons.length==0){
            return(
                <Row style={{marginTop:40}}> 
                    <ErrorPage text="无优惠券"/>
                </Row>
            )
        }else{
            return coupons.map(this.renderCoupon)
        }
    }

    renderCoupon=(item)=>{
        return(
            <Col xs={24} sm={24} lg={12} style={{padding:10}}>
                <Card title={item.name} style={{padding:0}}>
                    <div style={{fontSize:16}}>
                        <Typography>{item.description}</Typography>
                        <Typography>满{item.targetAmount}减{item.discountAmount}</Typography>
                        <Typography>有效期至：{this.handleDate(item.endTime)}</Typography>
                    </div>
                </Card>
            </Col>
        )
    }

    render=()=>{
        return(
            <div>
                {this.renderCoupons()}
            </div> 
        )
    }

    getAllCoupon=()=>{
        if(this.loadStorage("user")){
            var successAction = (result) => {
                this.setState({coupons: result.content})
            }
            this.get('/coupon/'+this.loadStorage("user").id+'/get',successAction)
        }
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