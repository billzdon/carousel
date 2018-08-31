import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { mapAllToProps } from '../mappers/mappers.js'
import { connect } from 'react-redux'
import Slider from "react-slick";
import PageUploader from './page_uploader'

const styles = {
  image: {
    height: '350px',
    margin: 'auto'
  },
  container: {
    marginTop: '24px',
    minHeight: '500px'
  },
  instructions: {
    fontSize: '1.4em',
    color: 'rgba(0, 0, 0, 0.8)',
    marginLeft: '24px'
  }
}

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true
};

export default connect(mapAllToProps)(class Carousel extends Component {
  render() {
    const {carouselState} = this.props

    const imagePanels = carouselState.images.map(function(image) {
      return <div key={image.id}>
        <img style={styles.image} src={image.data} />
      </div>
    })

    return (
      <PageUploader>
        <div style={styles.container}>
          <div style={styles.instructions}>
            Drag images onto the page!
          </div>
          <Slider {...settings}>
            {imagePanels}
          </Slider>
        </div>
      </PageUploader>
    )
  }
})
