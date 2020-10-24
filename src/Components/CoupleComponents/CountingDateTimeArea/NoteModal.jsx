import React, {Component} from 'react';
import {Button, Modal, Input} from 'antd'

class NoteModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: false,
            senderValue: '',
            receiverValue: '',
            noteContent: '',
        };
        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this)
        this.handleSenderArea = this.handleSenderArea.bind(this)
        this.handleReceiverArea = this.handleReceiverArea.bind(this)
        this.handleChangeContent = this.handleChangeContent.bind(this)
    }

    showModal() {
        this.setState({
            visible: true,
        })
    }

    handleCancel() {
        this.setState({
            visible: false,
        });
    };

    handleOk() {
        this.setState({loading: true});
        this.props.handlePostNote(this.state.senderValue, this.state.receiverValue, this.state.noteContent);
        setTimeout(() => {
            this.setState({loading: false, visible: false, senderValue: '', receiverValue: '', noteContent: ''})

        }, 2000)

    }

    handleSenderArea(e) {
        console.log(e.target.value)
        this.setState({senderValue: e.target.value})
    }

    handleReceiverArea(e) {
        this.setState({receiverValue: e.target.value})
    }

    handleChangeContent(e) {
        this.setState({noteContent: e.target.value})
    }


    render() {
        return (
            <div>
                <Button style={{fontSize: '0.75rem'}} icon={<i className="fa fa-pencil mr-1" aria-hidden="true"/>
                } onClick={this.showModal} title={'Viết Cho  ' + this.props.target}> Viết Cho {this.props.target} </Button>
                <Modal  title={'Viết Cho' + this.props.target} visible={this.state.visible}
                       onCancel={this.handleCancel} footer={[
                    <Button key="back" onClick={this.handleCancel}>
                        Thui ứ nhắc nữa!
                    </Button>,
                    <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk}
                            disabled={!this.state.senderValue || !this.state.receiverValue || !this.state.noteContent}>
                        Gửi Yêu Thương!
                    </Button>,
                ]}>
                    <div className={'container px-0 my-3 mx-1'}>
                        <div className={'text-center'}>
                            <div className={'d-inline-block col-6 px-0'}>
                                <Input value={this.state.senderValue} required={true} onChange={this.handleSenderArea}
                                       placeholder={ this.props.sender + ' Béo'} addonBefore={'From: '}/>
                            </div>
                            <div className={'d-inline-block col-6 px-0'}>
                                <Input value={this.state.receiverValue} required={true}
                                       onChange={this.handleReceiverArea} placeholder={ this.props.target + ' Béo'} addonBefore={'To: '}/>
                            </div>
                        </div>
                        <div className={'col-12 px-0 mt-2'}>
                            <Input.TextArea style={{height: '20vh'}} onChange={this.handleChangeContent} value={this.state.noteContent} required={true}
                                   placeholder={this.props.sender + ' Mún Nhắc ' + this.props.target + ' Cái Gì Nà?'}/>

                            </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default NoteModal;