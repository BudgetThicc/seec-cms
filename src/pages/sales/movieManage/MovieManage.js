import React from 'react'
import {Card, Spin, Button, Radio, List, Switch, Avatar,BackTop,Anchor,Affix,Icon} from 'antd'
import {BaseComponent} from '../../../components/BaseComponent'
import AddMovieModal from './AddMovieModal';

const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );

export class MovieManage extends BaseComponent{
    constructor(props){
      super(props)
      this.state={
        data:[],
        addVis:false
      }
      this.handleClick=this.handleClick.bind(this)
      this.addCancel=this.addCancel.bind(this)
    }
    
    componentWillMount(){
      this.get("/movie/all",result=>
      {
        this.setState({
          data:result.content,
          addVis:false
        })
      })
    }

    addCancel(){
      this.setState({
        addVis:false
      })
    }


  
    handleClick(){
      this.setState({
        addVis:true
      })
    }

    like(count){
      if (count==null)
       return "0"
       else 
       return count
    }

  render(){
    return (
      <div>
        <Card bordered={false} title={<div>已上架电影<Button onClick={this.handleClick} id="addFilm" style={{float:"right"}}>上架新电影</Button></div>} style={{marginBottom: 15}} id='verticalStyle'>
          <List dataSource={this.state.data}
          itemLayout='vertical'
          pagination={{pageSize: 10}}
          style={styles.listStyle}
          renderItem={item=>{
            return (
              <List.Item
                extra={<img width={160} height={200} onerror="this.src='http://img.daimg.com/uploads/allimg/181010/1-1Q010161035.jpg'" src={item.posterUrl} />}>
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={<a href={"/home/movieDetail?id="+item.id}>{item.name}</a>}
                />
                类型：{item.type}&emsp;导演：{item.director}&emsp;主演：{item.starring}
                <br></br>
                <br></br>
                {item.description}
                <br></br>
                <br></br>
                <IconText type="like-o" text={this.like(item.likeCount)} />
                </List.Item>
                  )
                }}
          />
        </Card>
        <AddMovieModal visible={this.state.addVis} onCancel={this.addCancel}></AddMovieModal>
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
      width:'80%',
      boxSizing: 'border-box'
    },
    noBorder: {
      minHeight: 270,
      width:'80%',
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