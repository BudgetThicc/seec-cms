import React from "react";
import BaseComponent from '../../../../components/BaseComponent'
import { Row, Col, Button, Typography,Divider } from 'antd';

export default class RefundPolicy extends BaseComponent {
    constructor(props){
        super(props)
        this.state={
            current:this.props.current
        }
    }

    renderPolicy=(policy)=>{
        const hour=parseInt(policy.maxTimeBorder/1)
        const minute=policy.maxTimeBorder%1
        let time=hour+"小时"
        if(minute>0) time+=minute*60+"分钟"
        time+="内"
        if(hour==0&&minute==0)
        time="其他"
        return(
            <Col span={18}>
                <Row type='flex' justify='start'>
                    <Col span={12}>
                        <Typography 
                        style={{fontSize:18}}>
                            {time}
                        </Typography>
                    </Col>
                    <Col span={12}>
                        <Typography 
                        style={{fontSize:18}}>
                        退回{policy.rate}%票价
                        </Typography>
                    </Col>
                </Row>
            </Col>
        )
    }

    render(){
        return (
            <Row style={styles.container}>
                <Row type='flex' justify='center'>
                    <Col span={18}>
                        <p style={{fontSize:20,color:"#1890ff"}}>现行退票政策</p>
                    </Col>
                    {this.state.current.map(this.renderPolicy)}
                    <Divider/>
                </Row>
                <Row type='flex' justify='end'>
                    <Typography style={{fontSize:18,marginBottom:5}}>
                        退票{this.props.num}张
                    </Typography>
                </Row>
                <Row type='flex' justify='end' align='bottom'>
                    <Typography style={{fontSize:18,color:"#1890ff"}}>
                        您将获得退款：
                    </Typography>
                    <Typography style={{fontSize:22}}>
                        {this.props.remain}元
                    </Typography>
                    <Divider/>
                </Row>
                <Button onClick={this.props.refund} 
                type="primary"
                size="large"  
                style={{margin:5}}
                block>
                    确认退票
                </Button>
                <Button onClick={this.props.onCancel} 
                size="large"  
                style={{margin:5}}
                block>
                    取消退票
                </Button>
            </Row>
        );
    }
}

const styles = {
}

