import React from 'react';
import '../Styles/details.css';
import queryStyring from 'query-string';
import axios from 'axios';
import Modal from 'react-modal';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        height: '500px',
        border: 'black solid 2px',
        backgroundColor: 'brown'
    }
};

class Details extends React.Component {
    constructor() {
        super();
        this.state = {
            restaurant: {},
            galleryModalIsOpen: false,
            orderModalIsOpen: false
        }
    }

    componentDidMount() {
        const qs = queryStyring.parse(this.props.location.search);
        const resId = qs.restaurant;

        axios({
            url: `http://localhost:6503/api/getResById/${resId}`,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                this.setState({ restaurant: res.data.restaurant })
            }).catch(err => console.log(err))
    }

    handleClick = (state, value) => {
        this.setState({ [state]: value })
    }

    render() {
        const { restaurant, galleryModalIsOpen, orderModalIsOpen } = this.state;
        return (
            <div>
                <div>
                    <img src={`../${restaurant.image}`} alt="No Image, Sorry for the Inconvinience" width="100%" height="350" />
                    <button className="button" onClick={() => this.handleClick('galleryModalIsOpen', true)}>Click to see Image Gallery</button>
                </div>
                <div className="heading">{restaurant.name}</div>
                <button className="btn-order" onClick={() => this.handleClick('orderModalIsOpen', true)}>Place Online Order</button>

                <div className="tabs">
                    <div className="tab">
                        <input type="radio" id="tab-1" name="tab-group-1" checked />
                        <label for="tab-1">Overview</label>

                        <div className="content">
                            <div className="about">About this place</div>
                            <div className="head">Cuisine</div>
                            <div className="value">{restaurant && restaurant.cuisine ? restaurant.cuisine.map((item) => `${item.name}, `) : null}</div>
                            <div className="head">Average Cost</div>
                            <div className="value">&#8377; {restaurant.min_price} for two people(approx)</div>
                        </div>
                    </div>

                    <div className="tab">
                        <input type="radio" id="tab-2" name="tab-group-1" />
                        <label for="tab-2">Contact</label>

                        <div className="content">
                            <div className="head">Phone Number</div>
                            <div className="value">{restaurant.contact_number}</div>
                            <div className="head">{restaurant.name}</div>
                            <div className="value">{`${restaurant.locality}, ${restaurant.city}`}</div>
                        </div>
                    </div>
                </div>
                <Modal
                    isOpen={galleryModalIsOpen}
                    style={customStyles}
                >
                    <div>
                        <div style={{ float: 'right' }} onClick={() => this.handleClick('galleryModalIsOpen', false)}>Close</div>
                        <Carousel
                            showThumbs={false}
                            showIndicators={false}>
                            {restaurant && restaurant.thumb ? restaurant.thumb.map((item) => {
                                return <div>
                                    <img src={`../${item}`} />
                                </div>
                            }) : null}
                        </Carousel>
                    </div>
                </Modal>
                <Modal
                    isOpen={orderModalIsOpen}
                    style={customStyles}
                >
                    <div>
                        <div style={{ float: 'right' }} onClick={() => this.handleClick('orderModalIsOpen', false)}>Close</div>
Hello
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Details;