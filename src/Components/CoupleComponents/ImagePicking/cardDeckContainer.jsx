import React, {Component} from 'react';
import ImagePicking from "./imagePicking";
class CardDeckContainer extends Component {
    render() {
        return (
            <div className={'card-deck-container'}>
                <ImagePicking cards={this.props.cards}/>
            </div>
        );
    }
}

export default CardDeckContainer;