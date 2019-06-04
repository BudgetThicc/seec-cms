import React,{ Component } from 'react';
import {notification,Button} from 'antd';
import BannerAnim, { Element,Thumb } from 'rc-banner-anim';
import TweenOne from 'rc-tween-one';
import 'rc-banner-anim/assets/index.css';

const BgElement = Element.BgElement;
var count=0;
class Banner extends Component {

    constructor(props){
        super(props);
    };

    renderButton=(button)=>{
        const {icon,text,onClick,href}=button
        return(
            <Button 
            type="primary"
            style={styles.button} 
            icon={icon} 
            size="large" 
            onClick={onClick}
            href={href}
            ghost>
                {text}
            </Button>
        )
    }

    renderGradient=()=>{
        if(this.props.index==1)
            return(
                <TweenOne
                animation={{ y: 30, opacity: 0, type: 'from' }}
                style={styles.gradient}
                >
                    <div style={{
                    height:"300px",
                    backgroundImage:"linear-gradient(rgba(0,0,0,0),rgba(255,255,255,1))"}}/>
                </TweenOne>
            )
    }

    render(){
        return(
            <BannerAnim 
            ref={(c) => { this.props.getBanner(c); }}
            type="vertical"
            style={this.props.bgheight}
            arrow={false}
            dragPlay={false}
            autoPlay={true}
            autoPlaySpeed={3000}>
                {this.props.banners.map(this.renderElement)}
            </BannerAnim>
        )
    }

    renderElement=(banner)=>{
        count++;
        return(
            <Element 
            style={styles.element}
            key={count+""}
            prefixCls="banner-user-elem"
            followParallax={{
                delay: 500,
                data: [
                { id: 'bg'+count, value: 20, bgPosition: '50%', type: ['backgroundPositionX'] },
                { id: 'title', value: 30, type: 'x' },
                { id: 'title2', value: -20, type: 'x' },
                ],
            }}
            >
                
                {this.renderGradient()}
                <BgElement
                key={"bg"+count}
                style={{
                ...{backgroundImage: `url(${banner.back})`},
                ...styles.bg,
                ...this.props.bgheight
                }}
                id={"bg"+count}
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
                
                <TweenOne
                animation={{ y: 30, opacity: 0, type: 'from',delay:100 }}
                id="button"
                style={styles.buttons}
                >
                    {this.props.buttons.map(this.renderButton)}
                </TweenOne>
            </Element>
        )
    }
}

const styles={
    element:{
        textAlign: "center",
        color: "white",
        position: "relative",
    },
    gradient:{
        position:'absolute',
        top:"400px",
        height:"300px",
        left:0,
        right:0,
        zIndex:5
    },
    bg:{
        position:'absolute',
        top:0,
        left:-100,
        right:-100,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
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
    },
    button:{
        marginRight:"10px",
        opacity:0.7
    },
    buttons:{
        zIndex:6,//浮于渐变之上
        top: "65%",
        left: "30%",
        fontFamily:"Georgia",
    }
}

export default Banner;