import React, {Component} from 'react';
import {Modal, Button} from 'antd'
class CenterNotifModal extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
        }
        this.onCancel = this.onCancel.bind(this);
    }

    onCancel(e){
        e.preventDefault();
        this.setState({visible: false})
    }
    render() {
        return (
            <Modal  onCancel={this.onCancel} centered={true} footer={<div className={'d-flex flex-row justify-contet-center'}> <Button>
                Okayyy!
            </Button></div>}>
            <div >
                <img src={'http://m.loptruong.com/uploads/images/mon%20qua.jpg'} alt={'notifImage'}/>
                <h1> Bạn đã nhận được 1 món quà từ Em</h1>
            </div>
            </Modal>
        );
    }
}

export default CenterNotifModal;
