import React from "react"
import BaseComponent from '../../BaseComponent'
import { Row,Card,Button,InputNumber} from "antd";
import ErrorPage from '../../ErrorPage'

export default class VipCharge extends BaseComponent{

    constructor(props) {
        super(props);
        this.state={
            amount:0
        }
    }

    charge=()=>{
        if(this.state.amount<=0){
            this.pushNotification("danger","请输入有效的数额")
            return
        }
        var successAction=(result)=>{
            this.pushNotification("success","会员卡充值成功")
        }
        var unsuccessAction=(result)=>{
            this.pushNotification("danger",result.message)
        }
        let form =new FormData()
        form.append("vipId",this.props.vipId)
        form.append("amount",this.state.amount)
        const url="/vip/charge"
        this.post(url,form,successAction,unsuccessAction)
    }

    handleChange=(value)=>{
        this.setState({amount:value})
    }

    render=()=>{
        return(
            <Row>
                <InputNumber 
                step={1}
                max={100000}
                min={0}
                style={{margin:10,width:"100%"}}
                placeholder="充值金额"
                onChange={(value)=>this.handleChange(value)}/>

                <Button onClick={this.charge} 
                size="large"  
                style={{margin:10}}
                block>
                    充值
                </Button>

                <Button onClick={this.props.onCancel} 
                size="large"  
                style={{margin:10}}
                block>
                    返回
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