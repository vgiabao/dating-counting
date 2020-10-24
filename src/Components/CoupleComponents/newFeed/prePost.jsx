import React, {Component} from 'react';
import {Button, Input, message} from "antd";
import firebase from "../../Authentication/Firebase";
import {SmileTwoTone} from "@ant-design/icons";
import parse from 'html-react-parser';

class PrePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            like: 0,
            likeArray: [],
            genderName: this.props.gender === "Chồng" ? this.props.lover_1_name : this.props.lover_2_name,
            otherName: this.props.gender === "Chồng" ? this.props.lover_2_name : this.props.lover_1_name,
            comment: null

        };
        this.fetchLike = this.fetchLike.bind(this);
        this.handleLike = this.handleLike.bind(this);
        this.fetchComment = this.fetchComment.bind(this);
    }

    handleLike() {
        const ownerName = this.props.gender;
        let newLikeArray = [...this.state.likeArray];
        let pushedString = '';
        let like = 0;
        if (this.state.likeArray.includes(ownerName)) {
            const index = this.state.likeArray.findIndex(item => item === ownerName);
            newLikeArray.splice(index, 1);
            newLikeArray = this.deleteSpace(newLikeArray);
            if (newLikeArray.length !== 0) pushedString = newLikeArray[0];
            if (newLikeArray.length === 0) pushedString = null;
            like = this.state.like - 1;
        } else {
            newLikeArray.push(ownerName);
            like = this.state.like + 1;
            for (let i = 0; i < newLikeArray.length; i++) {
                pushedString += newLikeArray[i];
                if (i !== newLikeArray.length - 1) pushedString += ','
            }
        }
        const ref = firebase.database().ref().child('/Status/' + this.props.id);
        ref.update({likeArray: pushedString, like: like});

    }

    fetchLike() {
        const ref = firebase.database().ref('/Status/').child(this.props.id);
        ref.on('value', snapShot => {
            const value = snapShot.val();
            this.setState({
                like: value.like,
                likeArray: value.likeArray ? value.likeArray.split(',') : []
            })
        })
    }
    fetchComment(){
        const ref = firebase.database().ref('/Status/' + this.props.id).child('/comment');
        ref.on('value', snapShot => {
            const commentData = snapShot.val();
            if (commentData) this.setState({comment: commentData});
        })
    }

    componentDidMount() {
        this.fetchLike();
        this.fetchComment();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props !== nextProps) {
            this.setState({
                genderName: this.props.gender === "Chồng" ? this.props.lover_1_name : this.props.lover_2_name,
                otherName: this.props.gender === "Chồng" ? this.props.lover_2_name : this.props.lover_1_name
            })
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.id !== prevProps.id){
            this.fetchLike();
            this.fetchComment();
        }
    }
    replaceAll(str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    }

    deleteSpace(arr) {
        let newArr = [];
        for (let item of arr) {
            if (item !== '') newArr.push(item);
        }
        return newArr
    }

    render() {
        let likeSentence, commentCount, content;
        console.log('cotent prepost',this.props.content)
        const preContent = this.replaceAll(this.props.content, '\\n', '<br/>');
        console.log('pre',preContent)
        content = parse('<p>' + preContent +'</p>')
        console.log('parsed', content)
        // content = this.props.content.split('\n').join('<br/>');
        // if (this.state.comment) console.log(this.state.comment)
        if (this.props.owner === this.props.gender) {
            if (this.state.like === 1) {likeSentence = <div className={'mr-auto'}><i
                className="fa fa-heart pr-1" aria-hidden="true" style={{color: '#e73895'}}/> {this.state.genderName}
            </div>;}
            if (this.state.like === 2) {likeSentence = <div className={'mr-auto'}><i
                className="fa fa-heart pr-1" aria-hidden="true" style={{color: '#e73895'}}/> Bạn
                và {this.state.otherName}
            </div>;}
        } else {
            if (this.state.like === 1) {
                if (this.state.likeArray.includes(this.props.gender))
                {likeSentence = <div className={'mr-auto'}><i
                    className="fa fa-heart pr-1" aria-hid den="true" style={{color: '#e73895'}}/> {this.state.genderName}
                </div>;}
                else{
                    likeSentence = <div className={'mr-auto'}><i
                        className="fa fa-heart pr-1" aria-hid den="true" style={{color: '#e73895'}}/> {this.state.otherName}
                    </div>;
                }
            }
            if (this.state.like === 2) likeSentence = <div className={'mr-auto'}><i
                className="fa fa-heart pr-1" aria-hidden="true" style={{color: '#e73895'}}/> Bạn
                và {this.state.otherName}
            </div>;
        }

        return (
            <div className={'container-fluid newFeedPostSize px-1 my-2 bg-white'}
                 style={{border: '1px solid black', borderRadius: '2px'}}>
                <div className={'d-flex flex-row'}>
                    <img className={'userPostImage'}
                         src={this.props.owner === 'Chồng' ? this.props.baoImage : this.props.nhiImage}
                         alt={'userPostImage'}/>
                    <div className={'d-flex flex-column align-items-start col-10 px-0'}>
                        <div>
                            <bold> {this.props.owner === 'Chồng' ? this.props.lover_1_name : this.props.lover_2_name}</bold>
                            <span className={'ml-1'} style={{color: '#616770'}}> {this.props.emotion}</span>
                        </div>
                        <p className={'mb-0'} style={{color: '#616770'}}> {this.props.date}</p>
                    </div>
                </div>
                <div className={'px-1 '}>
                    {content}
                </div>
                <hr className={'my-1'}/>
                <div className={'container-fluid row'}>
                    <div className={'col-6 text-center newFeedButton'}
                         style={{color: this.state.likeArray.includes(this.props.gender) ? '#e73895' : null,
                         cursor: 'pointer'}}
                         onClick={this.handleLike}><i
                        className="fa fa-heart pr-1" aria-hidden="true"/>
                        Thương
                    </div>
                    <div className={'col-6 text-center newFeedButton'}><i className="fa fa-commenting-o  pr-1"
                                                                          aria-hidden="true"/>
                        Bình Luận
                    </div>
                </div>
                <hr className={'my-1'}/>
                <div className={'container-fluid row'}>
                    {likeSentence}
                    <div> {commentCount} </div>
                </div>
                {/*<div className={'container row d-flex pr-1 py-1 '}>*/}
                {/*    <img className={'userPostImage'}*/}
                {/*         src={this.props.gender === 'Chồng' ? this.props.baoImage : this.props.nhiImage}*/}
                {/*         alt={'userPostImage'}/>*/}
                {/*    <Input.TextArea value={this.state.textInput} target={'_blank'} className={'col-10'}*/}
                {/*                    placeholder={'Viết bình luận...'}*/}
                {/*                    onChange={this.userPostInputHandler}>*/}
                {/*    </Input.TextArea>*/}
                {/*        <Button onClick={this.handlePostStatus} className={'ml-auto'}*/}
                {/*                style={{float: 'right', borderRadius: '10%'}}*/}
                {/*                type={"primary"}> Đăng</Button>*/}

                {/*</div>*/}
            </div>
                );
                }
                }

                export default PrePost;