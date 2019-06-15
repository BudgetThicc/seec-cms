
import React from 'react'
import {Card, Carousel} from 'antd'
import ReactDOM from 'react-dom';
import './css/style.css'
import {Col, Row, Collapse,BackTop,Button} from 'antd'
import {Descriptions} from "antd"
import {BaseComponent} from "../../../components/BaseComponent"
import ActivityForm from './ActivityForm';

const Panel = Collapse.Panel

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const text2 = (
  <p style={{ paddingLeft: 24 }}>
      和蔡徐坤一起来跳舞！
  </p>
);
const colors = ['#364d79','#64cbcc','sandybrown','darksalmon','goldenrod','burlywood','darkseagreen','indianred']


const animations = [
    ['bounceInDown','bounceInUp'],
    ['bounceInLeft','bounceInRight'],
    ['rotateIn','rotateIn'],
    ['flipInX','flipInY'],
    ['rotateInDownLeft','rotateInUpRight'],
    ['rotateInDownRight','rotateInUpLeft'],
    ['zoomInLeft','zoomInRight'],
    ['zoomInDown','zoomInUp'],
    ['zoomIn','zoomIn'],
    ['lightSpeedIn','bounceInLeft'],
  ]
const activityList=[activi,activit]
var activit={
    name:"蔡徐坤跳舞",
    description:"没有",
    startTime:"2003-43-432",
    endTime:"4352-325-234",
    coupon:{
        name:"caonoawef",
        targetAmount:100,
        discountAmount:99,
        description:"weag"
    }
}


var activi={
    name:"蔡徐坤不会跳舞",
    description:"跳你妈妈",
    startTime:"2003-43-432",
    endTime:"4352-325-234",
    coupon:{
        name:"caonoawef",
        targetAmount:100,
        discountAmount:99,
        description:"weag"
    }
}

function getAnimation(animations){
    let index = Math.floor(Math.random()*animations.length)
    let arr = animations[index]
    arr = arr.map(item=>{
      return `${item} animated slider-active`
    })
    return arr
  }

export class ActivityManage extends BaseComponent{

  constructor(props){
    super(props)
    this.state={
      current:0,
      activityL:[],
      addVis:false
    }
    this.handleClick=this.handleClick.bind(this)
    this.addCance=this.addCance.bind(this)

  }


  componentWillMount(){
    this.get("/activity/get",result=>{
      this.setState({
        activityL:result.content,
      })
    })
  }

  handleClick(){
    this.setState(
      {
        addVis:true
      }
    )
  }

  addCance(){
    this.setState({
      addVis:false
    })
  }

      animations = getAnimation(animations)
      componentWillUpdate(){
        //当current变化时，也就是state变化时重新给animations赋值，否则animations不会改变.实现类似vue的watch
        //用componentWUpdate还是componentDidUpdate根据具体场景，componentDidUpdate一般是需要用到state时调用（因为setState是异步，需要等更新完成）
        let temp  =  getAnimation(animations)
        while (this.animations[0] === temp[0] ) {
          temp = getAnimation(animations)
        }
        this.animations = temp
    
      }



      renderActivityL(l){
        var temp=[]
        for(var i=0;i<l.length;i++){
          //alert(i)
          temp.push(<Panel header={l[i].name} key={i+''}>{this.renderActivity(l[i])}</Panel>)
        }
        var res=[]
        res.push(<Collapse defaultActiveKey={['0']} bordered={false}>{temp}</Collapse>)
        return res
      }


      renderActivity(act){
        // var res=[]
        // var movieL=[]
        // if(act.movieList.length==0)
        // movieL.push("所有电影")
        // else
        // movieL=act.movieList.map((e)=>{return e.name})
        // res.push(<div>{"活动时间："+act.startTime.split("T")[0]+"到"+act.endTime.split("T")[0]}</div>)
        // res.push(<div>{"参与电影："+movieL}</div>)
        // res.push(<div>{"优惠券名称："+act.coupon.name}</div>)
        // res.push(<div>{"优惠幅度：满"+act.coupon.targetAmount+"减"+act.coupon.discountAmount}</div>)
        // res.push(<div>{act.coupon.description}</div>)
        // return res;
        var movieL=[]
        if(act.movieList.length==0)
        movieL.push("所有电影")
        else
        movieL=act.movieList.map((e)=>{return e.name})
        var res=[]
        res.push(<Descriptions.item label="活动时间：">{act.startTime.split("T")[0]+"到"+act.endTime.split("T")[0]}</Descriptions.item>)
        res.push(<Descriptions.item label="参与电影："><span>{movieL+''}</span></Descriptions.item>)
        res.push(<Descriptions.item label="优惠券名称：">{act.coupon.name}</Descriptions.item>)
        res.push(<Descriptions.item label="优惠幅度：">{"满"+act.coupon.targetAmount+"减"+act.coupon.discountAmount}</Descriptions.item>)
        res.push(<Descriptions.item label="优惠券描述：">{act.coupon.description}</Descriptions.item>)
        var t=[]
        t.push(<Descriptions bordered={true}>{res}</Descriptions>)
        return t
      }


  render(){
    const { current} = this.state
    var res=[]
    for (var i=0;i<this.state.activityL.length;i++){
      var backg=colors[Math.floor(Math.random()*8)]
      res.push(
        <div>
        <div className='slider-item' style={{background:backg}}>
          <h3 className={current === i ? this.animations[0] : ''}>{this.state.activityL[i].name}</h3>
          <p className={current === i ? this.animations[1] : ''}>{this.state.activityL[i].description}</p>
        </div>
      </div>
      )
    }


      return(
        <div>
                      <ActivityForm visible={this.state.addVis} onCancel={this.addCance}> </ActivityForm>
          
          <Card title={<span>活动展示<Button onClick={this.handleClick} style={{float:"right"}}>新增活动</Button></span>}>
    <Carousel id="cao" speed={100} arrows afterChange={(current)=>this.setState({current})} autoplay>
      {res}
    </Carousel>
  </Card>

        <Card bordered={false} className='card-item' title='活动详情查看'>
          {this.renderActivityL(this.state.activityL)}
            </Card>


      </div>
      )
  }
}