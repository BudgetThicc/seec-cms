import React,{ Component } from 'react';
import {notification,Button} from 'antd';
import BannerAnim, { Element } from 'rc-banner-anim';
import TweenOne from 'rc-tween-one';
import 'rc-banner-anim/assets/index.css';

const BgElement = Element.BgElement;
var count=0;
class Banner extends Component {

    constructor(props){
        super(props);
    };

    renderButton=(banner)=>{
        const {icon,text}=this.props.button;
        var onClick=this.props.button.onClick
        if(onClick==null)//优先使用上级指定的统一onClick，否则转向各横幅自带的button
            onClick=banner.onClick
        if(this.props.button!=null)
            return(
                <TweenOne
                animation={{ y: 30, opacity: 0, type: 'from',delay:100 }}
                id="button"
                style={styles.button}
                >
                    <Button icon={icon} size="large" onClick={onClick} ghost>
                        {text}
                    </Button>
                </TweenOne>
            )
    }

    render(){
        return(
            <BannerAnim style={styles.banner}>
                {this.props.banners.map(this.renderElement)}
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
                { id: 'title', value: 30, type: 'x' },
                { id: 'title2', value: -20, type: 'x' },
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
                {this.renderButton(banner)}
            </Element>
        )
    }
}

const styles={
    banner:{
        height:"800px"
    },
    element:{
        textAlign: "center",
        color: "white",
        position: "relative",
    },
    bg:{
        height:"800px",
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
    },
    button:{
        top: "50%",
        left: "30%",
        fontFamily:"Georgia"
    }
}

export default Banner;