import React, {Component} from 'react';
import { VerticalTimelineElement} from 'react-vertical-timeline-component'
import {ClockCircleOutlined} from '@ant-design/icons'
import Gallery from "react-photo-gallery";

function randomInt(min, max) {
    return min + Math.floor((max - min) * Math.random());
}
function columns(containerWidth) {
    let columns = 1;
    if (containerWidth >= 500) columns = 2;
    if (containerWidth >= 900) columns = 3;
    if (containerWidth >= 1500) columns = 4;
    return columns;
}

class ParticularMemoryCard extends Component {
    render() {
        let imageArr = [];
        let imageSource;
        if (this.props.image) {
            let index = 0
            imageSource = this.props.image;
            for (let image in imageSource) {
                imageArr.push({
                    src: this.props.image[image],
                    width: randomInt(2, 3),
                    height: randomInt(2, 5),
                    sizes: ["(min-width: 480px) 8vw,(min-width: 1024px) 8vw,30vw"],
                    onClick: () => console.log(1),
                    key: index
                })
                index += 1
            }
        }

        return (
                <VerticalTimelineElement
                    className="vertical-timeline-element--work mb-4"
                    contentArrowStyle={{borderRight: '7px solid  #89A894'}}
                    date={'Hôm ' + this.props.date}
                    dateStyle={{fontSize: '2rem'}}
                    iconStyle={{background: 'rgb(33, 150, 243)', color: '#fff', marginTop: '10px'}}
                    icon={<ClockCircleOutlined style={{fontSize: '3rem'}}/>}
                >
                    <h3 className="vertical-timeline-element-title">{this.props.title}</h3>
                    <hr/>
                    <p>
                        {this.props.content}
                    </p>
                    <Gallery photos={imageArr} columns={columns}/>

                </VerticalTimelineElement>
        );
    }
}

export default ParticularMemoryCard;