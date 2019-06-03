import React,{ Component } from 'react';
import {notification} from 'antd';
import BannerAnim, { Element } from 'rc-banner-anim';
import TweenOne from 'rc-tween-one';
import 'rc-banner-anim/assets/index.css';
import back1 from "./layouts/resource/back1.jpg"

const BgElement = Element.BgElement;
var count=0;
class Banner extends Component {

    constructor(props){
        super(props);
        this.state={
            banners:[
                {
                    title:"SEEC Cinema",
                    title2:"Make SEEC Great Again",
                    back:back1
                }
            ]
        }
    };

    render(){
        return(
            <BannerAnim style={styles.banner}>
                {this.state.banners.map(this.renderElement)}
            </BannerAnim>
        )
    }

    renderElement=(banner)=>{
        count++;
        return(
            <Element 
            style={styles.element}
            key={count}
            prefixCls="banner-user-elem"
            followParallax={{
                delay: 500,
                data: [
                { id: 'bg', value: 20, bgPosition: '50%', type: ['backgroundPositionX'] },
                { id: 'title', value: 50, type: 'x' },
                { id: 'title2', value: -30, type: 'x' },
                ],
            }}
            >
                <BgElement
                key="bg"
                style={{
                ...{backgroundImage: `url(${banner.back})`},
                ...styles.bg
                }}
                id="bg"
                />
                <TweenOne
                animation={{ y: 30, opacity: 0, type: 'from' }}
                id="title"
                style={styles.title}
                >
                    {banner.title}
                </TweenOne>
                <TweenOne
                animation={{ y: 30, opacity: 0, type: 'from',delay:100 }}
                id="title2"
                style={styles.title2}
                >
                    {banner.title2}
                </TweenOne>
            </Element>
        )
    }
}

const styles={
    banner:{
        height:"1000px"
    },
    element:{
        textAlign: "center",
        color: "white",
        position: "relative",
    },
    bg:{
        height:"1000px",
        position:'absolute',
        top:0,
        left:0,
        right:0
    },
    title:{
        fontSize: "64px",
        top: "30%",
        left: "-30%",
        fontFamily:"Georgia"
    },
    title2:{
        fontSize:"32px",
        top: "30%",
        left: "-30%",
        fontFamily:"Georgia"
    }
}

export default Banner;