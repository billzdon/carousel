import * as React from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Card from './card'
import { mapAllToProps } from '../mappers/mappers.js'
import { connect } from 'react-redux'
import { reorderImage } from '../actions/carousel_actions'
import PropTypes from 'prop-types'
const update = require('immutability-helper')

const style = {
	width: '100%',
	margin: '12px'
}

export default connect(mapAllToProps)(DragDropContext(HTML5Backend)(class ReorderGrid extends React.Component {
  static contextTypes = {
    store: PropTypes.object
  }

	constructor(props: {}) {
		super(props)
		this.moveCard = this.moveCard.bind(this)
	}

	render() {
    const { carouselState } = this.props

		return (
			<div style={style}>
				{carouselState.images.map((image, i) => (
					<Card
						key={image.id}
						index={i}
						id={image.id}
						image={image}
						moveCard={this.moveCard}
					/>
				))}
			</div>
		)
	}

	moveCard(dragIndex: number, hoverIndex: number) {
    const { carouselState } = this.props
		const dragCard = carouselState.images[dragIndex]

    this.context.store.dispatch(reorderImage(dragCard.id, dragIndex, hoverIndex))
	}
}))
