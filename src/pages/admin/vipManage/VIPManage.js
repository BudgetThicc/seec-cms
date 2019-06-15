import React from 'react'
import {Row,Card, Spin, Button, Radio, List, Switch, Avatar,BackTop,Icon,Col} from 'antd'
import SetVIPType from './SetVIPType';
import { timingSafeEqual } from 'crypto';
import EditVIPType from './EditVIPType';
import { BaseComponent } from '../../../components/BaseComponent';


const data3 = []
for(let i=0;i<23;i++){
  data3.push({
    key:i,
    name:"白金卡"+i,
    target: "100",
    gift :"20",
    discount :"50%",
    price:"40"
  })
}

const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );

export  class VIPManage extends BaseComponent{
  constructor(props){
    super(props)
    this.state={
      addVis:false,
      editVis:false,
      data:[]

    }
    this.handleClick=this.handleClick.bind(this)
    this.addCancel=this.addCancel.bind(this)
    this.editCancel=this.editCancel.bind(this)
    this.edit=this.edit.bind(this)
  }

  componentWillMount(){
    this.get("/vipManagement/getAll",result=>{
      this.setState({
        data:result.content
      })
    })
  }


  addCancel(){
    this.setState({addVis:false})
  }

  edit(key){
    this.setState({editVis:true})
  }

  editCancel(){
    this.setState({editVis:false})
  }

  handleClick(){
      this.setState({addVis:true})
  }
  
  renderTitle=()=>{
    return(
      <Row style={{width:"100%"}}>
        <Col span={12}>
          <Row type="flex" justify="start">
            会员优惠策略
          </Row>
        </Col>
        <Col span={12}>
          <Row type="flex" justify="end">
            <Button 
            onClick={this.handleClick} 
            id="add" 
            style={{float:"right"}}>新增会员卡类型</Button>
          </Row>
        </Col>
      </Row>
    )
  }

  render(){
    return (
      <Row>
        <Card bordered={false} title={this.renderTitle()}
          id='verticalStyle'>
          <List dataSource={this.state.data}
          itemLayout='vertical'
          pagination={{pageSize: 10}}
          style={styles.listStyle}
          renderItem={item=>{
            return (
              <List.Item
                extra={<img width={180} height={140} alt="logo" src='http://www.juimg.com/tuku/yulantu/140516/330292-1405161H44252.jpg' />}>
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={<a onClick={()=>this.edit(item.key)}style={{fontSize:"25px"}}>{item.name}</a>}
                />
                {item.description.replace(".0","").replace(".0","")}
                <br></br>
                <br></br>
                折扣：{item.discount}
                <br></br>
                <br></br>
                价格：{item.price}元
                <br></br>
                <br></br>
                </List.Item>
                  )
                }}
          />
        </Card>
        <SetVIPType VIPname={"ao"} visible={this.state.addVis} onCancel={this.addCancel}></SetVIPType>
        <EditVIPType visible={this.state.editVis} onCancel={this.editCancel}></EditVIPType>
      </Row>
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
  }