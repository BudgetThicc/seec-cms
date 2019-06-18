import React from 'react'
import {Row,Card, Spin, Button, Radio, List, Switch, Avatar,BackTop,Icon,Col} from 'antd'
import SetVIPType from './SetVIPType';
import { timingSafeEqual } from 'crypto';
import EditVIPType from './EditVIPType';
import { BaseComponent } from '../../../components/BaseComponent';
import { json } from 'graphlib';


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
      data:[],
      editS:{}
    }
    this.addCancel=this.addCancel.bind(this)
    this.editCancel=this.editCancel.bind(this)
  }

  componentWillMount(){
    this.refresh()
  }

  refresh=()=>{
    this.get("/vipManagement/getAll",result=>{
      this.setState({
        data:result.content
      })
    })
  }

  addCancel(){
    this.setState({addVis:false})
  }

  edit=(name,discountAmount,targetAmount,discount,price,type)=>{
    this.state.editS={
        name:name,
        discountAmount:discountAmount,
        targetAmount:targetAmount,
        discount:discount,
        price:price,
        type:type
    }
    this.setState({
      editVis:true
    })
  }

  editCancel(){
    this.setState({editVis:false})
  }

  handleClick=()=>{
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
            const des=item.description.replace(".0","").replace(".0","")
            const amounts=des.split("满")[1].split("送")
            return (
              <List.Item
                extra={<img width={180} height={140} alt="logo" src='http://www.juimg.com/tuku/yulantu/140516/330292-1405161H44252.jpg' />}>
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={<a onClick={()=>this.edit(item.name,amounts[1],amounts[0],
                    item.discount,item.price,item.type)} style={{fontSize:"25px"}}>{item.name}</a>}
                />
                {des}
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
        <SetVIPType 
        refresh={this.refresh} 
        VIPname={"ao"} 
        visible={this.state.addVis} 
        onCancel={this.addCancel}/>
        <EditVIPType refresh={this.refresh}
         formt={this.state.editS} 
         visible={this.state.editVis} 
         onCancel={this.editCancel}/>
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