import React,{Component} from "react";
import {withRouter } from "react-router-dom";
import {connect} from "react-redux"
import {showSignIn} from '../../../redux/actions/action';
import BaseComponent from "../../BaseComponent"
import Banner from '../../Banner'

import back1 from "./resource/back1.jpg"
import film1 from "./resource/film1.png"
import film2 from "./resource/film2.jpg"

const mapStateToProps = state => ({
    user: state.identityReducer.user,
    admin: state.identityReducer.admin
})

var data=[]

class BaseBanner extends BaseComponent {
    
    constructor(props){
        super(props);
        this.state={
            banner:null
        }
        var anchor="listStart"
        data=[
            {banners:[
                {
                    title:"SEEC Cinema",
                    title2:"Make SEEC Great Again",
                    back:back1
                }
                ],
            buttons:[{
                text:"加入我们",
                icon:"user",
                onClick:()=>{this.props.dispatch(showSignIn())}
                }],
            bgheight:{height:"800px"}
            },
            {//下为影片数据，应当从后端拿到
            banners:[
                {
                    title:"天气之子",
                    title2:"正在热映中",
                    back:film1
                },
                {
                    title:"星际穿越",
                    title2:"正在热映中",
                    back:film2
                }
                ],
            buttons:[{
                    text:"马上订票",
                    icon:"pay-circle"
                },{
                    text:"查看更多",
                    icon:"caret-down",
                    onClick:this.handleScroll
                }],
            bgheight:{height:"700px"}
            }
        ]
    };

    handleScroll=()=>{
        this.scrollToView("listStart")
    }

    render(){
        const {buttons,banners,bgheight}=data[this.props.index]
        return(
            <Banner 
            getBanner={(c) => { this.props.getBanner(c)}}
            index={this.props.index}
            buttons={buttons}
            banners={banners}
            bgheight={bgheight}/>
        );
    }
}

const styles={

}

export default withRouter(connect(mapStateToProps)(BaseBanner));