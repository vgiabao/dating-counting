import React, {Component} from 'react';
import ReactInteractableSlider from 'react-interactable-slider';

class MobileImageCard extends Component {
    render() {
        return (
            <ReactInteractableSlider cellAlign="left"
                                     navigationType="dots"
                                     marginGapsPerSlide={4}
                                     debug={true} fullWidthPerSlide={true} dragEnabled={true}
            >
                <div> element 1 </div>
                <div> element 2 </div>
                <div> element 3 </div>
            </ReactInteractableSlider>
        );
    }
}

export default MobileImageCard;