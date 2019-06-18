import React from "react"
import BaseComponent from '../../BaseComponent'
import { Row,Tabs } from "antd";
import Coupons from "./coupons"
import VipCards from "./vipcards"
const { TabPane } = Tabs;

export default class Cards extends BaseComponent{

    constructor(props) {
        super(props);
        this.state={
        }
    }

    render=()=>{
        return(
            <Tabs defaultActiveKey="1">
                <TabPane tab="会员卡" key="1">
                    <VipCards/>
                </TabPane>
                <TabPane tab="优惠券" key="2">
                    <Coupons/>
                </TabPane>
            </Tabs>
        )
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