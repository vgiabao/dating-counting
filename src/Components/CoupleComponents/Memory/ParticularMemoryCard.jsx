import React, {Component} from 'react';
import {VerticalTimelineElement} from 'react-vertical-timeline-component'
import {ClockCircleOutlined, PlayCircleOutlined} from '@ant-design/icons'
import Gallery from "./Gallery";
import {Modal, Carousel} from 'antd';
import ReactPlayer from "react-player";
import MemoryVideo from "./MemoryVideo";

// function randomInt(min, max) {
//     return min + Math.floor((max - min) * Math.random());
// }
//
// function columns(containerWidth) {
//     let columns = 1;
//     if (containerWidth >= 500) columns = 2;
//     if (containerWidth >= 900) columns = 3;
//     if (containerWidth >= 1500) columns = 4;
//     return columns;
// }

class ParticularMemoryCard extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            currentImgUrl: '',
        }
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.clone = this.clone.bind(this);
    }

    showModal() {
        this.setState({visible: true})
    }

    closeModal() {
        this.setState({visible: false})
    }

    clone(imgUrl) {
        this.setState({visible: true, currentImgUrl: imgUrl})
    }

    render() {
        let imageArr = [];
        if (this.props.image) {
            for (let image in this.props.image) {
                if (!this.props.image[image].includes("mp4"))
                imageArr.push(<img style={{height:'30vh!important', width:'100%'}} src={this.props.image[image]} alt={'memory image'}/>
                )
                else {
                    imageArr.push(<MemoryVideo video={this.props.image[image]}  />)
                }
            }
        }

        return (
            <VerticalTimelineElement
                className="vertical-timeline-element--work mb-4"
                contentArrowStyle={{borderRight: '7px solid  #89A894'}}
                date={'Hôm ' + this.props.date}
                dateStyle={{fontSize: '2rem', borderRadius: '5px', padding: '30px'}}
                iconStyle={{background: 'gray', color: '#fff', marginTop: '10px'}}
                icon={<ClockCircleOutlined style={{fontSize: '3rem'}}/>}
            >
                <h3 className="vertical-timeline-element-title" style={{color: 'white' , wordBreak: 'break-word'}}>{this.props.title}</h3>
                <hr/>
                <p style={{color: 'white'}}>
                    {this.props.content}
                </p>
                <Carousel >
                    {imageArr}
                </Carousel>

                <Modal bodyStyle={{padding: '0'}}
                       closeIcon={<i className="fa fa-times" style={{color: 'red', fontWeight: 'bold'}}
                                     aria-hidden="true"/>
                       } centered footer={null} visible={this.state.visible}
                       onCancel={this.closeModal}>
                    <div style={{maxHeight: '60vh', padding: '0'}}>
                        <img  src={this.state.currentImgUrl} alt={'Large Image'}/>
                    </div>
                </Modal>
            </VerticalTimelineElement>
        );
    }
}

export default ParticularMemoryCard;
