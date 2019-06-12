import React from "react";
import BaseComponent from '../../../components/BaseComponent'
import { Row, Skeleton,Col,Button,Icon,Divider,Tabs} from 'antd';
import {Typography,Grid} from '@material-ui/core';
import {withRouter} from "react-router-dom";
import { closeDrawer } from '../../../redux/actions/action';
import { connect } from 'react-redux';

const { TabPane } = Tabs;
var count=0

const mapStateToProps = state => ({
    content: state.drawerReducer.content,
    loading: state.drawerReducer.loading,
    closing: state.drawerReducer.closing,
})
class FilmSchedule extends BaseComponent {

    constructor(props) {
        super(props);
        this.state={
        }
    }

    toSchedule=()=>{
        const {id}=this.props.item
        this.props.history.push({ pathname: "/schedule", state: { scheduleId:id } });
        this.props.dispatch(closeDrawer())
    }

    render(){
        if(this.props.item==null)
            return null
        const {startTime,endTime,fare,hallName}=this.props.item
        return(
            <Button style={{height:"100%"}} onClick={this.toSchedule}>
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

export default connect(mapStateToProps)(withRouter(FilmSchedule));
