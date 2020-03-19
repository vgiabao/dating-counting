import React, {Component} from 'react';
import {SpringSpring, useSpring, animated, config} from 'react-spring'
import {Spring} from "react-spring/renderprops-universal";
import axios from 'axios'
import ParticularDateTime from "./ParticularDateTime";
import InDetailsDateTime from "./InDetailsDateTime";
class CountingDateTime extends Component {
    calculateTotalDay(){
        let currentDate = new Date()
        let startingDate = new Date('2020/03/05')
        let gap = Math.abs(currentDate - startingDate);
        return Math.floor(gap/60/60/24/1000)
    }

    componentDidMount() {
        // vXq7bdXLOmfvS8ai0BDFbCQM7IRC6uFRuP0oNNFD
        axios.get('https://dating-counting.firebaseio.com/password/' +  '.json?auth=vXq7bdXLOmfvS8ai0BDFbCQM7IRC6uFRuP0oNNFD')
            .then((response) => {
                console.log(response.data)
            });
    }


    render() {
        return (
            <div>
            <ParticularDateTime calculateTotalDay={this.calculateTotalDay}/>
            <InDetailsDateTime/>

            </div>
        )
    }

}

export default CountingDateTime;