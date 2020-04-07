import React, {Component} from 'react';
import axios from 'axios'
import ParticularDateTime from "./ParticularDateTime";
import ParticularNote from "./ParticularNote";
import DefaultNote from "./DefaultNote";
import {Carousel} from "antd";

class CountingDateTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultNote: ['example content 1']
            //     ['Hôm nay hem có note, chắc cả hai đứa đều bận. Nhưng mà luôn thông cảm cho công việc của ' +
            // 'nhauu nè. Để đi được xa. Anyways, anh/em có muốn nhắc nhở nhau cái gì hôm?']
        }
    }

    calculateTotalDay() {
        let currentDate = new Date()
        let startingDate = new Date('2020/03/05')
        let gap = Math.abs(currentDate - startingDate);
        return Math.floor(gap / 60 / 60 / 24 / 1000)
    }

    componentDidMount() {
        // vXq7bdXLOmfvS8ai0BDFbCQM7IRC6uFRuP0oNNFD
        axios.get('https://dating-counting.firebaseio.com/password/' + '.json?auth=vXq7bdXLOmfvS8ai0BDFbCQM7IRC6uFRuP0oNNFD')
            .then((response) => {
                console.log(response.data)
            });
    }


    render() {
        let noteBoxes;

        if (this.props.notes !== null) noteBoxes = Object.keys(this.props.notes).map(item => <ParticularNote
            content={this.props.notes[item].content} sender={this.props.notes[item].sender}
            target={this.props.notes[item].receiver}/>)
        else noteBoxes = <DefaultNote/>
        return (
            <Carousel autoplay={true} dots={true} effect={'fade'} style={{height:'50vh'}}>
                <ParticularDateTime calculateTotalDay={this.calculateTotalDay}/>
                {noteBoxes}
            </Carousel>
        )
    }

}

export default CountingDateTime;