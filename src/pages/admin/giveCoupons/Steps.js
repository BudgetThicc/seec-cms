import React from 'react'
import {Modal,Table,rowSelection,Card, Alert, Divider, Select, Steps, Input, Button, Form,Icon,BackTop} from 'antd'
import {inject,observer} from 'mobx-react'
import { BaseComponent } from '../../../components/BaseComponent';
import './css/style.css'


var couponSelect=-1
var monetary=-1
var vip=[]

const { Step } = Steps;
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};
const tailFormItemLayout = {
  wrapperCol:{
    offset:5
  }
}

const columns3 = [
  {
    title: '用户名',
    dataIndex: 'username',
  }, {
    title: '姓名',
    dataIndex: 'name',
  }, {
    title: '已消费金额',
    dataIndex: 'monetary',
}]

const columns2 = [
  {
    title: '优惠券名称',
    dataIndex: 'name',
  }, {
    title: '满减金额',
    dataIndex: 'targetAmount',
  }, {
    title: '优惠金额',
    dataIndex: 'discountAmount',
}]

const data2 = []
for (let i = 0; i < 46; i++) {
  data2.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  })
}


@inject('stepFormStore') @Form.create() @observer
class Step1 extends BaseComponent{
  constructor(props){
    super(props)
    var couponLis=[]
    
    this.state={
      select: -1,
      couponList:[]
    }
    this.handleclick=this.handleclick.bind(this)
  }

  componentWillMount(){
    var reg = new RegExp("id","g")
    this.get("/coupon/all",(result)=>{
      this.setState({
        couponList:JSON.parse(JSON.stringify(result.content).replace(reg,'key'))
      })
    })
  }

  nextStep = () =>{
    this.props.form.validateFields((err,values)=>{
      if (!err){
        this.props.stepFormStore.setInfo(values)
        this.props.stepFormStore.setCurrent(1)
      }
    })
  }

  handleclick(){
    if(couponSelect==-1){
      Modal.warning({
        title:"没有选择优惠券！",
        onOk:()=>{
          return 
        }
      })
    }else
    this.props.stepFormStore.setCurrent(1)
  }

  render(){
    const rowSelection = {
      selections: true,
      type:"radio",
      onChange: (selectRowKeys)=>{couponSelect=selectRowKeys}
    }
    const {getFieldDecorator} = this.props.form
    return (
      <Card bordered={false}  style={{marginBottom: 10}} id='select'>
      <Table rowSelection={rowSelection} dataSource={this.state.couponList} columns={columns2} style={{}}/>
      <Button onClick={this.handleclick} style={{ marginLeft: 8 }}>下一步</Button>
    </Card>
    )
  }
}

@inject('stepFormStore')  @observer
class Step2 extends BaseComponent{
  state = {
    loading:false
  }
  render(){
    return (
      <div>
        <div>
          <span>&emsp;</span>
        </div>
      <div>
        <lable marginLeft="20px">请输入应完成的最低消费金额：</lable>
        <Input  onChange={(e)=>{monetary=e.target.value}} style={{width:"60%"}}></Input>
      </div>
      <div>
          <span>&emsp;</span>
        </div>
      <div >
          <Button style={{textAlign:"center"}} onClick={()=>this.props.stepFormStore.setCurrent(0)} style={{ marginLeft: 8 }}>上一步</Button>
          <Button  style={{textAlign:"center"}} onClick={()=>{
            if(monetary=="" || monetary==null || isNaN(monetary)){
              Modal.warning({title:"输入有误！"})
            }
            else
            this.props.stepFormStore.setCurrent(2)
          }} style={{ marginLeft: 8 }}>下一步</Button>
      </div>
      </div>
    )
  }
}

@inject('stepFormStore') @observer
class Step3 extends BaseComponent{
  constructor(props){
    super(props)
    this.state={
      vipLis:null
    }
    this.handleclick=this.handleclick.bind(this)
  }

  componentWillMount(){
    var reg = new RegExp("userId","g")
    this.get("/vip/list?monetary="+monetary,(result)=>{
      this.setState({
        vipLis:JSON.parse(JSON.stringify(result.content).replace(reg,'key'))
      })
    })
  }

  handleclick(){
    if (vip.length==0){
      Modal.warning({
        title:"请选择想要赠送的会员！"
      })
      return 
    }
    else{
    var url="/coupon/issueCoupons?"
    url+="couponId="
    url+=couponSelect
    for(var i=0;i<vip.length;i++){
      url+="&user="
      url+=vip[i]
    }
    this.post(url,null,result =>{
    })
    Modal.success({
      title:"成功",
      content:"赠送优惠券成功！",
      onOk(){
        window.location.href="/admin/giveCoupons"
      }
    })}
  }
  render(){
    const roww={
      selections:true,
      onChange: (selectRowKeys)=>{vip=selectRowKeys}
    }
    return (
      <Card bordered={false}  style={{marginBottom: 10}} id='select'>
      <Table rowSelection={roww} dataSource={this.state.vipLis} columns={columns3} style={{}}/>
      <Button onClick={()=>this.props.stepFormStore.setCurrent(1)} style={{ marginLeft: 8 }}>上一步</Button>
      <Button onClick={this.handleclick} style={{ marginLeft: 8 }}>提交</Button>
    </Card>
    )
  }
}

@inject('stepFormStore') @observer
class GiveCouponsSteps extends BaseComponent {
  constructor(props){
    super(props)
    this.state={
      coupon:-1,
      monetary:-1,
      vip:[]
    }
    this.handleCoupon=this.handleCoupon.bind(this)
  }



  handleCoupon(selectRowKeys){
    this.setState(
      state =>{
        state.coupon=selectRowKeys
        return state
      }
    )
  }

  handleMonetary(monetary){
    this.setState(
      state =>{
        state.monetary=monetary
        return state
      }
    )
  }

  handleCoupon(list){
    this.setState(
      state =>{
        state.vip=list
        return state
      }
    )
  }


  showStep = ()=>{
    switch (this.props.stepFormStore.current){
      case 1 : return <Step2 handleMonetary={this.handleMonetary}/>
      case 2: return <Step3 coupon={this.state.coupon}/>
      default: return <Step1 handleCoupon={this.handleCoupon}/>
    }
  }
  render () {
    return (
      <div>
        <Card title='赠送优惠券' bordered={false} style={{minHeight: 600}}>
          <Steps style={styles.steps} current={this.props.stepFormStore.current}>
            <Step title="请选择想要赠送的优惠券" />
            <Step title="请输入应完成的最低消费金额" />
            <Step title="请选择想要赠送的会员" />
          </Steps>
          <div>{this.showStep()}</div>
        </Card>
      </div>
    )
  }
}

const styles = {
  steps:{
    maxWidth:750,
    margin: '16px auto'
  },
  desc:{
    padding:'0 56px',
  }
}

export default GiveCouponsSteps