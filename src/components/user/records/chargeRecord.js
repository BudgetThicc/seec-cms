import React from "react"
import BaseComponent from '../../BaseComponent'
import ErrorPage from '../../ErrorPage'
import { Row, Card, Collapse, Icon, Descriptions, Badge } from "antd";


const Panel = Collapse.Panel;
const Description = Descriptions.Item;

export default class ChargeRecord extends BaseComponent{

    constructor(props) {
        super(props);
        this.state={
            chargeRecord: [],
            vipname:[]
        }
        this.getChargeRecord();
    }

    getChargeRecord=()=>{
        var successAction = (result) => {
            this.setState({chargeRecord: result.content})
            this.transformRecordData();
        }
        this.get('/chargeRecord/'+this.loadStorage("user").id+'/allChargeRecord', successAction)
    }

    //用vipId获取会员卡名字,每个record新加一个字段：会员卡name
    transformRecordData=()=>{
        for(var i=0;i<this.state.chargeRecord.length;i++){
            var VIPCardId = this.state.chargeRecord[i].vipCardId
            this.state.vipname.push("")

            this.get('/vip/get/'+VIPCardId, (result) => {
                var VIPType = result.content.type
                var VIPCardName = this.state.vipname
                this.get('/vip/'+VIPType+'/getDetail', (result) => {
                    if(result.content){
                        VIPCardName[i] = result.content.name
                    }
                    this.setState({vipname:VIPCardName})
                })
            })
        }
    }

    render=()=>{
        var key = 0;
        if(this.state.chargeRecord.length==0){
            return <ErrorPage text="无充值记录"/>
        }
        return(
            <Collapse
            bordered={false}
            defaultActiveKey={['1']}
            expandIcon={({ isActive }) => <Icon type="money-collect" rotate={isActive ? 0 : -90} />}
            >
                {this.state.chargeRecord.map((item) => {
                    key = key + 1;
                    const time=this.handleDate(item.time)+" "+this.handleTime(item.time)
                    return(
                        <Panel 
                        header={<Row>{this.state.vipname[key]} 充值{item.chargeAmount}元
                            <span style={{float:'right'}}>{time}</span></Row>} 
                        key={key} 
                        style={styles.customPanelStyle}
                        >
                            <Descriptions bordered size='small'>
                                <Description label="充值金额">{item.chargeAmount}</Description>
                                <Description label="赠送金额">{item.giftAmount}</Description>
                                <Description label="会员卡余额">{item.balance}</Description>
                                <Description label="充值时间" span={3}>
                                {time}
                                </Description>
                            </Descriptions>
                        </Panel>
                    )
                })}
            </Collapse>
        )
    }
}

const styles = {
    customPanelStyle:{
        background: '#f5f5f5',
        borderRadius: 4,
        marginBottom: 24,
        border: 0,
        overflow: 'hidden'
    }
};