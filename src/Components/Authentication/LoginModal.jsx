import React, {Component} from 'react';
import {Modal, Button} from "antd";

class LoginModal extends Component {
    constructor() {
        super();
        this.state = {
            visible: true,
            confirmLoading: false,
        }
        this.showModal = this.showModal.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleOk = this.handleOk.bind(this)
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });

        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 2000);
    };
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const {visible, confirmLoading} = this.state;
        return (
            <div>
                <h2>bao123</h2>
                <Modal
                    title="Title"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <p>'Mật khẩu của tụi mình là? :'</p>
                </Modal>
            </div>
        );
    }
}

export default LoginModal;