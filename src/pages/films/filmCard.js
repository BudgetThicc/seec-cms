import React from "react";
import BaseComponent from '../../components/BaseComponent'
import { Row, Skeleton,Col} from 'antd';
import {Paper} from '@material-ui/core';

export default class FilmCard extends BaseComponent {

    render(){
        var rows={rows:parseInt(this.props.item.height/10)}
        return (
        <Paper elevation={12} style={styles.paper}>
            <Skeleton active paragraph={rows}>
                {/* sth here */}
            </Skeleton>
        </Paper>
        ); 
    }
}

const styles = {
    paper:{
        marginTop:10,
        marginBottom:10,
        padding:10,
        borderRadius:15,
        backgroundColor: '#FFFFFF',
    },
}
