import React from 'react'
import { Chart, Axis, Geom, Tooltip, Coord, Label, Legend, G2 } from 'bizcharts'
import { Card, Row, Col,BackTop ,Button,Table,Icon,Divider, Modal} from 'antd'
import SetRoleModal from "./SetRoleModal"
import EditRoleModal from './EditRoleModal';
import { BaseComponent } from '../../../components/BaseComponent';
const data = [
  {
    key: '1',
    username: "root",
    name: 'John Brown',
    role: '管理员'
  }, {
    key: '2',
    username: "zhourui",
    name: '蔡徐坤',
    role: '售票员'
  }, {
    key: '3',
    username: "caonima",
    name: '篮球',
    role: '售票员'
  }]

export class StaffManage extends BaseComponent{

  constructor(props){
    super(props)
    this.state={
      addVis:false,
      edit:false,
      editKey:{

      },
      staffList:null,
      oneDelete:'nulllll'
    }
    this.handleClick=this.handleClick.bind(this)
    this.Addoncancel=this.Addoncancel.bind(this)
    this.Editoncancel=this.Editoncancel.bind(this)
    this.handleEdit=this.handleEdit.bind(this)
    this.deleteSomeone=this.deleteSomeone.bind(this)
    this.delete=this.delete.bind(this)
    this.refresh=this.refresh.bind(this)
  }

  refresh(){
    var tt=RegExp("\"role\":2",'g')
    var ttt=RegExp("\"role\":1",'g')
    this.get("/staff/all",(result)=>{
      var t=JSON.stringify(result.content.sort((a,b)=>{return b.role-a.role})).replace(tt,"\"role\":\"管理员\"")
      t=t.replace(ttt,"\"role\":\"售票员\"")
      this.setState({
        staffList:JSON.parse(t)
      })
      //alert(JSON.stringify(this.state.staffList))
    })

    this.setState({
      addVis:false,
      edit:false
    })
  }


  handleEdit(username,name,role){
    this.setState({
      edit:true,
      editKey:{
        username:username,
        name:name,
        role:role=="售票员"?1:2
      }
    })
  }

  deleteSomeone(name){
    Modal.confirm({
      title:"您确定要删除"+name+"吗？操作将不可恢复。",
      onOk:()=>{
        this.setState({
          oneDelete:name
        })
        this.delete()
      }
    }
    )
  }
  
  delete(){
    this.post("/staff/delete?name="+this.state.oneDelete+"&operator=me",null,result=>{
      Modal.success({
        title:"删除员工"+this.state.oneDelete+"成功！",
        onOk:()=>{
          this.refresh()
        }
      })
      
    })
  }

  columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      render: text => <a>{text}</a>,
    }, {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '职务',
      dataIndex: 'role',
      key: 'role',
    }, {
      title: '',
      key: 'action',
      render: (text, record) => (
        <span>
        <a onClick={()=>{this.handleEdit(record.username,record.name,record.role)}}>修改{record.name}</a>
        <Divider type="vertical"/>
        <a onClick={()=>{
          this.setState({oneDelete:record.username})
          this.deleteSomeone(record.username)
          }}>删除</a>
      </span>
      ),
    }]


  componentWillMount(){
    var tt=RegExp("\"role\":2",'g')
    var ttt=RegExp("\"role\":1",'g')
    this.get("/staff/all",(result)=>{
      var t=JSON.stringify(result.content.sort((a,b)=>{return b.role-a.role})).replace(tt,"\"role\":\"管理员\"")
      t=t.replace(ttt,"\"role\":\"售票员\"")
      this.setState({
        staffList:JSON.parse(t)
      })
      //alert(JSON.stringify(this.state.staffList))
    })
  }

  handleClick(){
    this.setState({
      addVis:true
    })
  }

  Addoncancel(){
    this.setState({
      addVis:false
    })
  }

  Editoncancel(){
    this.setState({
      edit:false
    })
  }

  render(){
    return (
      <div>

      <Card ref={this.cao} id="cao" bordered={false} title={<div>员工管理<Button onClick={this.handleClick} id="addFilm" style={{float:"right"}}>添加员工</Button></div>} style={{marginBottom: 15}}>
                  <Table dataSource={this.state.staffList} columns={this.columns} style={styles.tableStyle}/>
      </Card>

      <SetRoleModal refresh={this.refresh} visible={this.state.addVis} onCancel={this.Addoncancel}></SetRoleModal>
      <EditRoleModal refresh={this.refresh} formt={this.state.editKey} visible={this.state.edit} onCancel={this.Editoncancel}></EditRoleModal>

      </div>
    )
  }
}



const styles = {
  tableStyle: {
    width: '100%'
  },
  affixBox: {
    position: 'absolute',
    top: 100,
    right: 50,
    with: 170
  }
}