import React, {Component} from 'react';
import Deck from "./imagePicking";
class CardDeckContainer extends Component {
    render() {
        return (
            <div className={'card-deck-container'}>
                <Deck cards={this.props.cards}/>
            </div>
        );
    }
}

export default CardDeckContainer;
