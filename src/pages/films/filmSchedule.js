import React from "react";
import BaseComponent from '../../components/BaseComponent'
import { Row, Skeleton,Col,Button,Icon,Divider,Tabs} from 'antd';
import {Typography,Grid} from '@material-ui/core';

const { TabPane } = Tabs;
var count=0
class FilmSchedule extends BaseComponent {

    constructor(props) {
        super(props);
        this.state={
        }
    }

    render(){
        if(this.props.item==null)
            return null
        const {startTime,endTime,fare,hallName}=this.props.item
        return(
            <Button style={{height:"100%"}}>
                <Typography style={styles.time}>
                    {"场次："+this.handleTime(startTime)+"-"+this.handleTime(endTime)}
                </Typography>
                <Row type="flex" justify="space-around">
                    <Col span={8}>
                        <Typography style={styles.fare}>
                            {"¥"+fare+" "}
                        </Typography>
                    </Col>
                    <Col span={8}>
                        <Typography style={styles.fare}>
                            {hallName}
                        </Typography>
                    </Col>
                </Row>
            </Button>
        )
    }
}

const styles = {
    time:{
        textAlign:"center"
    },
    fare:{

    }
}

export default FilmSchedule;
