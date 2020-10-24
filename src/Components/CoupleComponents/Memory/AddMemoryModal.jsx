import React, {Component} from 'react';
import {PlusCircleOutlined} from "@ant-design/icons";
import {VerticalTimelineElement} from "react-vertical-timeline-component";
import {Button, Input, Modal, DatePicker, Upload} from "antd";
import {PlusOutlined} from '@ant-design/icons';
import {navigate} from "@reach/router";
import moment from 'moment'


class AddMemoryModal extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            visible: false,
            images: [],
            title: '',
            date: '',
            content: '',
            previewVisible: false,
            previewImage: '',
            fileList: [],
        };
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleTitleInput = this.handleTitleInput.bind(this);
        this.handleContentInput = this.handleContentInput.bind(this);
        this.handleDateTimeInput = this.handleDateTimeInput.bind(this);
        this.handleImagesChange = this.handleImagesChange.bind(this)
        this.getDate = this.getDate.bind(this)
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
        const {title, content, date, images} = this.state;
        this.setState({loading: true});
        this.props.handleStorageMemoryImages(images, date)
        this.props.handlePostMemoryData(title, content, date)

        setTimeout(() => {
            this.setState({loading: false, visible: false, date: '', content: '', title: '', images: [], fileList: []});
            this.getDate();
            navigate('/our-story')
        }, 2000);
    }

    isIncludesItem(fileList, target) {
        for (let item of fileList) {
            if (target.uid === item.uid) {
                return true
            }
        }
        return false
    }

    handleImagesChange(file) {
        let newImageArr = [];
        for (let item of this.state.images) {
            if (this.isIncludesItem(file.fileList, item)) newImageArr.push(item)
        }
        this.setState({images: newImageArr, fileList: [... file.fileList]})
        console.log('fileList:', file)
        console.log('state:', this.state.images)
    }

    handleTitleInput(e) {
        this.setState({title: e.target.value})
    }

    handleContentInput(e) {
        this.setState({content: e.target.value})
    }

    handleDateTimeInput(date, dateString) {
        this.setState({date: dateString})
    }



    getDate() {
        let currentDate = new Date
        const currentMoment = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate()
        this.setState({date: currentMoment})
    }

    componentDidMount() {
        this.getDate()
    }

    render() {
        const dateFormat = 'YYYY-MM-DD';
        let currentDate = new Date;
        const currentMoment = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate()
        const {images, title, date, content} = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className={'mb-4'}>
                <VerticalTimelineElement
                    className={'vertical-timeline-element--work'}
                    contentStyle={{background: 'rgb(33, 150, 243)', color: '#fff'}}
                    iconStyle={{background: 'rgb(16, 204, 82)', color: '#fff', alignSelf: 'center'}}
                    icon={<PlusCircleOutlined/>} iconOnClick={this.showModal}
                >
                    <p>Ấn Cái Nút Này Để Thêm Kỉ Niệm 😼</p>
                </VerticalTimelineElement>
                <Modal visible={this.state.visible}
                       onCancel={this.handleCancel} footer={[
                    <Button key="back" onClick={this.handleCancel}>
                        Ứ Thêm Nữa!
                    </Button>,
                    <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk}
                            disabled={!date || !content || !title || images.length === 0}>
                        Thêm Kỉ niệm!
                    </Button>,
                ]}>
                    <div className={'container px-0 my-3 mx-1'}>
                        <div className={'col-6 my-2 px-0 pt-2'}>
                            <DatePicker defaultValue={moment(currentMoment, dateFormat)} height={'middle'}
                                        onChange={this.handleDateTimeInput}/>
                        </div>
                        <div className={'col-12 px-0'}>
                            <Upload
                                action= { (file) => {
                                    this.setState({images: [...this.state.images, file]});
                                    return true;
                                }}
                                onChange={this.handleImagesChange}
                                listType="picture-card"
                                multiple={true}
                                fileList={this.state.fileList}
                                method='POST'
                            >
                                {uploadButton}
                            </Upload>
                        </div>
                        <div className={'text-center'}>
                            <div className={'d-inline-block col-12 px-0'}>
                                <Input value={title} required={true} onChange={this.handleTitleInput}
                                       placeholder={'E.g: Lần đầu đi chơi...'} addonBefore={'Tiêu Đề: '}/>
                            </div>
                        </div>
                        <div className={'col-12 px-0 mt-2'}>
                            <Input.TextArea style={{height: '20vh'}} onChange={this.handleContentInput}
                                            value={content} required={true}
                                            placeholder={ 'Anh/Em Nghĩ gì? :v'}/>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default AddMemoryModal;