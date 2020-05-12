import React, {Component} from 'react';
import {VerticalTimeline} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import ParticularMemoryCard from './ParticularMemoryCard'
import AddMemoryModal from "./AddMemoryModal";

class TimeLine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            loading: false,
            datePicker: '',
            title: '',
            content: '',
            images: '',
        }
    }

    render() {
        let index = this.props.memoryData.length;
        let  reveredArr = this.props.memoryData;
        const memoryCards = reveredArr.map(item => (
            <ParticularMemoryCard content={item.content} image={this.props.memoryImageArr[index -=1]} title={item.title}
                                  date={item.date}/>
    ))

        return (
            <VerticalTimeline >
                <AddMemoryModal handlePostMemoryData={this.props.handlePostMemoryData}
                                handleStorageMemoryImages={this.props.handleStorageMemoryImages}/>
                {memoryCards}

            </VerticalTimeline>
        );
    }
}

export default TimeLine;