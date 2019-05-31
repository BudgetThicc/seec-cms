import { Component } from 'react';
import {notification} from 'antd';

var moment = require('moment');

export class BaseComponent extends Component {
    
    // local
    ip = "http://localhost:8080";  
    // remote
    // ip = "http://139.224.238.182:8080"


    post = (url, form, successAction) => {
        return fetch(this.ip + url, { 
            method: 'POST', 
            mode: 'cors',
            body: form, 
            header: { 'content-type': 'multipart/form-data' } 
            })
            .then((response) => (response.json()))
            .catch((error) => { console.error(error); })
            .then((result) => { this.handleResult(result,successAction); });
    }

    get = (url, successAction)=>{
        return fetch(this.ip + url, { method: 'GET'})
        .then((response) => (response.json()))
        .catch((error) => { console.error(error); })
        .then((result) => { this.handleResult(result,successAction); });
    }

    handleResult=(result,successAction) => {
        if (!result) {
            console.log(result)
            this.pushNotification("danger", "连接错误");
            return;
        }

        if (result.status === 'fail') {
            console.log(result)
            this.pushNotification("danger", result.description);
            return;
        }

        if (result.status === 'success') {
            successAction(result);
            return;
        } 
        this.pushNotification("danger", result.description);
    }

    fromNow = (date) => {
        return moment(date).fromNow()
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    hasErrors(fieldsError) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }

    pushNotification = ( kind, reason ) => {
        notification.config({
            placement: 'topRight',
            top: 80,
            duration: 4,
        });
        if(kind=='danger')
            notification.warning({
                message:reason,
                description:"糟了!",
            })
        else if(kind=='success')
            notification.success({
                message:reason,
                description:"成功"
            })
        else
            notification.open({
                message:reason,
                description:""
            })
    }
    

}

export default BaseComponent;