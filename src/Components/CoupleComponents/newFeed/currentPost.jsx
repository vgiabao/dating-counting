import React, {Component} from 'react';
import {Input, Button, Modal, message} from 'antd'
import {FileImageOutlined, SmileTwoTone} from "@ant-design/icons";
import EmojiCard from "./emojiCard";
class CurrentPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textInput: '',
            emotion: '',
            emoji: '',
            visible: false,
        };
        this.userPostInputHandler = this.userPostInputHandler.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleAddEmoji = this.handleAddEmoji.bind(this);
        this.handleAddEmotion = this.handleAddEmotion.bind(this);
        this.removeEmoji = this.removeEmoji.bind(this);
        this.removeEmotion = this.removeEmotion.bind(this);
        this.clearState = this.clearState.bind(this)
        this.handlePostStatus = this.handlePostStatus.bind(this)
        this.handlePressEnter = this.handlePressEnter.bind(this)
    }

    userPostInputHandler(e) {
        this.setState({textInput: e.target.value})
    }

    showModal() {
        this.setState({visible: true});
    }

    handleCancel() {
        this.setState({visible: false});
    }

    handleAddEmoji(value) {
        this.setState({emoji: value});
    }

    handleAddEmotion(value) {
        this.setState({emotion: value});
    }

    removeEmoji() {
        this.setState({emoji: ''});
    }

    removeEmotion() {
        this.setState({emotion: ''});
    }

    clearState() {
        this.setState({gender: '', emotion: '', emoji: '', textInput: ''})
    }
    replaceAll(str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    }

    handlePostStatus() {
        const date = new Date();
        const moment = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        let {emotion, emoji, textInput} = this.state;
        const replacedContent = this.replaceAll(textInput, '\n', '\n' );
        const feeling = emoji ? " đang " + emoji + " " + emotion : '';
        this.props.handlePostStatus(this.props.gender, replacedContent, moment, feeling);
        this.clearState();
        message.success('Đã đăng status!!!!')

    }
    handlePressEnter(e){
        this.setState({textInput: this.state.textInput})
    }

    render() {
        const emojiObject = {
            'cười tít mắt': '😄',
            'cười không thấy mặt trời': "😁",
            'cảm thấy có gì đó hông ổn': '😅',
            'mắc cười': '🤣',
            'cười thánh thiện': '😇',
            'cảm thấy đáng ghét': '🙂',
            'cảm thấy vô lý': '🙃',
            'gửi một nụ hôn': '😘',
            'mắc cười quá hà': '😂',
            'đặt vấn đề': '🤨',
            'cảm thấy ngầu': '😎',
            'muốn thổi kèn': '🥳',
            'nhếch môi': '😏',
            'cảm thấy buồn': '😟',
            'thật sự cảm thấy buồn': '☹️',
            'giả bộ đau đầu': '😣',
            'muốn khóc': '😢',
            'muốn khóc thật tooo': '😭',
            'muốn đấm bạn': '🤜',
            'khen bạn': '👏',
            'thực hiện một lời hứa': '🙏',
            'kêu meo meo': '🐱',
            'cảm thấy ụt ụt': '🐷',
            'cảm thấy nóng': '🥵',
            'cảm thấy lạnh': '🥶',
            'hem biết nói gì': '🤐',
            'mắc ói': '🤢',
        };
        const emojiDOMArray = Object.keys(emojiObject).map((keyName, i) => (
            <EmojiCard emoji={emojiObject[keyName]} emotion={keyName} checked={this.state.emotion === keyName}
                       handleEmoji={this.handleAddEmoji} handleEmotion={this.handleAddEmotion}
                       removeEmoji={this.removeEmoji} removeEmotion={this.removeEmotion}/>
        ))

        return (

            <div className={'container-fluid newFeedPostSize mb-5 bg-white'}>
                <bold className={'h6 rounded-pill bg-dark p-2 '} style={{color: 'white'}}> Bài Viết:</bold>

                <div className={'container px-0 d-flex flex-row no-wrap justify-content-center mt-3 mx-0'}>
                    <img className={'userPostImage'}
                         src={this.props.gender === 'Chồng' ? this.props.baoImage : this.props.nhiImage}
                         alt={'userPostImage'}/>
                    <div className={'container flex-column d-flex pr-1 py-1 '}>

                        <Input.TextArea value={this.state.textInput} target={'_blank'} className={'col-10'}
                                        placeholder={'Bạn Đang Nghĩ Gì?'} onPressEnter={this.handlePressEnter}
                                        onChange={this.userPostInputHandler}>
                        </Input.TextArea>

                        <div className={'container d-flex flex-row no-wrap align-items-center px-0 py-1'}>
                            <div className={'mr-auto d-inline-block' + this.state.emotion ? ' rounded-pill' : ''}
                                 style={{backgroundColor: '#ccd0d5'}}>
                                <SmileTwoTone style={{fontSize: '30px'}} onClick={this.showModal}/>
                                {this.state.emotion ? <p className={'mb-0 pl-1 d-inline-block px-1'}
                                                         style={{}}> {window.innerWidth >= 762 ? ' đang ' : null} {this.state.emoji} {window.innerWidth >= 762 ? '- ' + this.state.emotion : null} </p> : null}
                            </div>
                            <Button onClick={this.handlePostStatus} className={'ml-auto'}
                                    style={{float: 'right', borderRadius: '10%'}}
                                    type={"primary"}> Đăng</Button>
                        </div>
                    </div>

                </div>
                <Modal title={'Đang cảm thấy'} onOk={this.handleCancel}
                       onCancel={this.handleCancel}
                       visible={this.state.visible}>
                    <div style={{height: '60vh', overflowY: 'scroll'}}>
                        {emojiDOMArray}
                    </div>
                </Modal>

            </div>
        );
    }
}

export default CurrentPost;