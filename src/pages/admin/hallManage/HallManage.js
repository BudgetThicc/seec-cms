import React from 'react'
import ReactDOM from 'react-dom'
import {Card, Spin, Button, Radio, List, Switch, Avatar,BackTop,Anchor,Affix,Icon} from 'antd'
import './css/style.css'
import AddHallForm from './AddHallForm';
import { BaseComponent } from '../../../components/BaseComponent';

const biao=[
    [22,13],
    [18,10],
    [12,8],
    [10,5]
]

const sea=[
    [0,1],
    [2,2],
    [3,3]
]

const hallList=[
    {name:"一号厅", row:3,column:2,seat:sea,size:0},
    {name:"二号厅",row:3,column:2,seat:sea,size:0}
]


const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );

export class HallManage extends BaseComponent{
    constructor(props){
        super(props)
        this.state={
            hallList:[],
            addVis:false,
            change:false
        }
        this.cao=React.createRef()
        this.addCancel=this.addCancel.bind(this)
        this.handleClick=this.handleClick.bind(this)
        this.handleCli=this.handleCli.bind(this)
        this.changeEdit=this.changeEdit.bind(this)
    }

    componentWillMount(){
        this.get("/hall/all",result=>{
            this.setState({
                hallList:result.content
            })
        })
    }

    addCancel(){
        this.setState({addVis:false})
    }

    renderAllHall(hallList){
        var t=[]
        for(var tt=0;tt<hallList.length;tt++){
            t.push(this.renderHall(hallList[tt]))
            t.push(<div> </div>)
        }
        return t
    }

    renderHall(hall){
        var r=[]
        let tem=""
        if(hall.size===0){
            tem="小"
        }
        else if(hall.size===1){
            tem="中"
        }
        else if(hall.size===2){
            tem="大"
        }
        else if(hall.size===3){
            tem="巨大"
        }
        r.push(<div><span style={{fontSize:"25px",color:"black"}}>{hall.name}</span><span>{hall.row+"*"+hall.column+" "+tem}</span></div>)
        r.push(this.renderSeat(hall))
        return r
    }

    
    renderS(column){
        var res=[]
        for(var i=0;i<column;i++){
            res.push(<div class="cinema-hall-seat"></div>)
        }
        return res
    }

    handleCli(j,i,id){
        if(this.state.change==false)
        return 
        this.get("/hall/set?row="+(j+1)+"&col="+(i+1)+"&id="+id,result=>{
            this.setState(
                (state)=>{
                    state.hallList.filter(x=>{return x.id==id})[0].seats[j][i]=(state.hallList.filter(x=>{return x.id==id})[0].seats[j][i]+1)%4
                    return state
                }
            )
        })



    }

    renderSeat(hall){
        var re=[]
        for (let j=0;j<hall.row;j++){
            let res=[]
            for(let i=0;i<hall.column;i++){
                if(hall.seats[j][i]===0)
                    res.push(<div class="seat0" onClick={()=>{this.handleCli(j,i,hall.id);
                    }
                }></div>)
                else if(hall.seats[j][i]===1)
                res.push(<div class="seat1" onClick={()=>{this.handleCli(j,i,hall.id)}}></div>)
                else if(hall.seats[j][i]===2)
                res.push(<div class="seat2" onClick={()=>{this.handleCli(j,i,hall.id)}}></div>)
                else if(hall.seats[j][i]===3)
                res.push(<div class="seat3" onClick={()=>{this.handleCli(j,i,hall.id)}}></div>)
            }
            let temp=<div>{res}</div>
            re.push(temp);
        }
        return re
    }

    handleClick(){
        this.setState({addVis:true})


    }

    changeEdit(){
        this.setState(
            (state)=>{
                state.change=state.change==true?false:true
                return state
            }
        )
    }
  render(){
    return (
        <div>
    <Card ref={this.cao} id="cao" bordered={false} title={<div>影厅管理(如需修改座位请开启编辑模式后点击座位){"  编辑模式："}<Switch defaultChecked={false} onChange={this.changeEdit}></Switch><Button onClick={this.handleClick} id="addFilm" style={{float:"right"}}>添加新影厅</Button></div>} style={{marginBottom: 15}}>
        {this.renderAllHall(this.state.hallList)}

        </Card>

        <AddHallForm visible={this.state.addVis} onCancel={this.addCancel}></AddHallForm>


        </div>
    )
  }
}
