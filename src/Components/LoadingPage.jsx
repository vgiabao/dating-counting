import React, {Component} from 'react';
import {navigate} from "@reach/router";
import {Modal, Button, Input, Spin} from "antd";

class LoadingPage extends Component {
    constructor() {
        super();
        this.state = {
            width: window.innerWidth,
            visible: false,
            loading: false,
            userInput: '',
            preLoading: false
        }
        this.handleChange = this.handleChange.bind(this)
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = () => {
        if (this.state.userInput === this.props.password) {
            this.setState({
                loading: true,
            });
            this.props.handleLogin();
            setTimeout(() => {
                this.setState({
                    visible: false,
                    loading: false,
                });
            }, 2000);
            setTimeout(() => {
                navigate('/bee-home');
                this.setState({preloading: true})
            }, 3000)
        }

    };
    handleCancel = () => {
        this.setState({
            visible: false,
            userInput: ''
        });
    };

    handleChange(e) {
        this.setState({userInput: e.target.value})
    }

    componentDidMount() {
        setTimeout(() => this.setState({preLoading: true}), 2000)
        alert('Website Này Chỉ Dành Riêng Cho Nhi Của Bảo!')
    }

    render() {
        let {visible, loading} = this.state
        return (
            <div id={'heart-container'} className={'d-flex justify-content-center align-items-center flex-column'}>
                {/*<div id="heart"/>*/}
                <h4 style={{
                    fontFamily: 'Brush Script MT, Brush Script Std, cursive',
                    color: 'white',
                    fontSize: '3rem'
                }}> Counting Dating</h4>
                <i className="fa fa-heart" id={'heart-2'} aria-hidden="true"/>
                <div>

                    {this.state.preLoading ?
                        <Button style={{borderRadius: '10px'}} type="primary" onClick={this.showModal}>
                            Ấn Vào Đi Bee
                        </Button> : <Spin size={'large'}/>}
                    <Modal
                        title="Nhập Mật Khẩu Của 2 Đứa Nè"
                        visible={visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="back" onClick={this.handleCancel}>
                                Quên Òi!
                            </Button>,
                            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                                Dạ :v
                            </Button>,
                        ]}
                    >
                        <Input value={this.state.userInput} type={'password'} onChange={this.handleChange}
                               placeholder={'Ngày Mình Quen Nhaoo??'}/>
                    </Modal>
                </div>
            </div>

        );
    }
}

export default LoadingPage;