import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { mapAllToProps } from '../mappers/mappers.js'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import { onImageDrop } from '../helpers/image_helpers'

const styles = {
  overlayStyle: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    padding: '2.5em 0',
    textAlign: 'center',
    color: '#fff'
  },
  dropzone: {
    position: 'relative'
  }
}

export default connect(mapAllToProps)(class PageUploader extends Component {
  static contextTypes = {
    store: PropTypes.object
  }

  state = {
    dropzoneActive: false
  }

  onDragEnter = () => {
    this.setState({
      dropzoneActive: true
    });
  }

  onDragLeave = () => {
    this.setState({
      dropzoneActive: false
    });
  }

  onDrop = acceptedFiles => {
    onImageDrop(this, acceptedFiles)
  }

  render() {
    const {carouselState, children} = this.props
    const {dropzoneActive} = this.state

    return (
      <Dropzone
        disableClick
        style={styles.dropzone}
        onDrop={this.onDrop}
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
      >
        { dropzoneActive && <div style={styles.overlayStyle}></div> }
        {children}
      </Dropzone>
    )
  }
})
