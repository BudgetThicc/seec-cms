import React from 'react'
import {Badge,Col,Row,Popover,Card, Spin, Button, Radio, List, Switch, Avatar,BackTop,Anchor,Affix,Icon, Divider} from 'antd'
import { BaseComponent } from '../../../components/BaseComponent';
import AddRefundForm from './AddRefundForm';

const content=(
  <div>caonima</div>
)

const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );


export class RefundManage extends BaseComponent{
    constructor(props){
      super(props)
      this.state={
        refundList:[],
        addVis:false
      }
      this.handleClick = this.handleClick.bind(this)
      this.refresh=this.refresh.bind(this)
      this.addCancel=this.addCancel.bind(this)
    }

    componentWillMount(){
      this.get("/refund/getAll",(result)=>{
        var t=JSON.stringify(result.content)
        this.setState({
          refundList:JSON.parse(t)
        })
      })
    }


    handleClick(){
        this.setState({
          addVis:true
        })
    }

    addCancel(){
      this.setState({
        addVis:false
      })
    }

    renderContent(border){
      var re=[]
      re.push(<div>距离放映开始&emsp;&emsp;退票金额比率</div>)
      for(var s=0;s<border.length;s++){
        let c=""
        if(s==0){
          if(border[s].maxTimeBorder=='0'){
            c ="任意时间"
          }else{
            c="小于"+border[s].maxTimeBorder+"h"
          }
        }
        else if(s==border.length-1)
          c="大于"+border[s-1].maxTimeBorder+"h"
        else
          c=+border[s-1].maxTimeBorder+"h~"+border[s].maxTimeBorder+"h"
        let temp=<div>{c+"--------------"+border[s].rate+"%"}</div>
        re.push(temp)
      }
      return re
    }

    renderList(refundList){
      let res=[]
      for(var i=0;i<parseInt(refundList.length/3);i++){
        var t=[]
        for(var j=0;j<3;j++){
          let temp=this.renderCard(refundList[3*i+j])
          t.push(temp)
        }
        res.push(<Row gutter={16}>{t}</Row>)
      }
      var t=[]
      for(var i=0;i<parseInt(refundList.length%3);i++){
        let temp=this.renderCard(refundList[parseInt((refundList.length/3))*3+i])
        t.push(temp)
      }
      res.push(<Row gutter={16}>{t}</Row>)
      return res
    }

    use(id){
      this.get("/refund/start?id="+id,result=>{
        this.refresh()
      })

    }

    refresh(){
      this.get("/refund/getAll",(result)=>{
        var t=JSON.stringify(result.content)
        this.setState({
          refundList:JSON.parse(t)
        })
      })
    }

    unuse(id){
      this.get("/refund/stop?id="+id,result=>{
        this.refresh()
      })
    }


    renderCard(refund){
      let res=[]
      let content=this.renderContent(refund.refundBorderItemList)
      let ttt;
      if(refund.inUse==1)
      ttt=<Badge status="success" text="使用中"></Badge>
      else
      ttt=<Badge status="default"></Badge>
      let tit=[]
      tit.push(<span>{refund.name+" "}</span>)
      tit.push(ttt)
      let yy=[]
      yy.push(<a href="#">修改</a>)
      if(refund.inUse==0){
        yy.push(<Divider type="vertical"></Divider>)
        yy.push(<a onClick={()=>{this.use(refund.id)}}>使用</a>)
      }
      if(refund.inUse==1){
        yy.push(<Divider type="vertical"></Divider>)
        yy.push(<a onClick={()=>{this.unuse(refund.id)}}>弃用</a>)
      }
      let temp=<Col span={12}><Card size="small" title={<div>{tit}<span style={{float:"right"}}>{yy}</span></div>}  style={{ width: 400}}>{content}</Card></Col>
      res.push(temp)
      return res
    }



  render(){
    return (
      <div>
    <Card bordered={false} title={<div>退票策略<Button onClick={this.handleClick} id="add" style={{float:"right"}}>新增退票策略</Button></div>} style={{marginBottom: 15}} id='verticalStyle'>
      {this.renderList(this.state.refundList)}
        </Card>
        <AddRefundForm visible={this.state.addVis} onCancel={this.addCancel}></AddRefundForm>
        </div>
    )
  }
}

const styles = {
    addFilm:{
        marginRight :5
    },
    haveBorder: {
      minHeight: 270,
      width:'70%',
      boxSizing: 'border-box'
    },
    noBorder: {
      minHeight: 270,
      width:'70%',
      padding: '0 24px',
      boxSizing: 'border-box',
      border: '1px solid #fff'
    },
    loadMore: {
      height: 32,
      marginTop: 16,
      lineHeight: '32px',
      textAlign: 'center',
    },
    listStyle:{
      width:'100%'
    },
    affixBox:{
      position: 'absolute',
      top: 100,
      right: 50,
      with: 170
    },
  }