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
        let DOMNodes = [];
        let  reveredArr = this.props.memoryData;
        console.log('arr', reveredArr)
        for (let item of reveredArr){
            DOMNodes.push(<ParticularMemoryCard content={item.content} image={item.images} title={item.title}
                                                date={item.date}/>)
        }


        return (
            <VerticalTimeline >
                <AddMemoryModal handlePostMemoryData={this.props.handlePostMemoryData}
                                handleStorageMemoryImages={this.props.handleStorageMemoryImages}/>
                {DOMNodes}

            </VerticalTimeline>
        );
    }
}

export default TimeLine;
