import React, {Component} from 'react';

class OldImages extends Component {
    render() {
        let owlDOM = [];
        Object.keys(this.props.owlImages).map((item) => {
            Object.keys(this.props.owlImages[item]).map(key => {
                owlDOM.push(this.props.owlImages[item][key])
            })
        })
        const images = owlDOM.map(item => (
            <div className="item"><h4><img  style={{height: '5vh', width:'5vh'}} src={item} alt={'old images'}/></h4></div>
        ))

        return (
            <div >
                {images}
            </div>
        );
    }
}

export default OldImages;