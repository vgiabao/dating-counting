import React, {Component} from 'react';
import {Carousel} from "antd";

class BackgroundCarousel extends Component {
    render() {
        return (
            <div>
                <Carousel autoplay style={{height: '100vh'}} effect="fade">
                    <div
                        style={{backgroundImage: 'url(https://lh3.google.com/u/0/d/18zrH-zCKDEgdUupvXQzLwCjXwwGHjH0j=w200-h190-p-k-nu-iv1)'}}>
                        <h3>1</h3>
                    </div>
                    <div>
                        <h3>2</h3>
                    </div>
                    <div>
                        <h3>3</h3>


                    </div>
                    <div>
                        <h3>4</h3>
                    </div>
                </Carousel>
            </div>
        );
    }
}

export default BackgroundCarousel;