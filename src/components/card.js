import * as React from 'react'
import { findDOMNode } from 'react-dom'
import {
	DragSource,
	DropTarget,
	ConnectDropTarget,
	ConnectDragSource,
	DropTargetMonitor,
	DropTargetConnector,
	DragSourceConnector,
	DragSourceMonitor,
} from 'react-dnd'
import ItemTypes from './item_types'
import { XYCoord } from 'dnd-core'
import {removeImage} from '../actions/carousel_actions'
import PropTypes from 'prop-types'
import { mapAllToProps } from '../mappers/mappers.js'
import { connect } from 'react-redux'
import Delete from '@material-ui/icons/Delete';

const cardSource = {
	beginDrag(props: CardProps) {
		return {
			id: props.id,
			index: props.index,
		}
	},
}

const cardTarget = {
	hover(props: CardProps, monitor: DropTargetMonitor, component: Card | null) {
		if (!component) {
			return null
		}
		const dragIndex = monitor.getItem().index
		const hoverIndex = props.index

		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return
		}

		// Determine rectangle on screen
		const hoverBoundingRect = (findDOMNode(
			component,
		)).getBoundingClientRect()

		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
		const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2

		// Determine mouse position
		const clientOffset = monitor.getClientOffset()

		// Get pixels to the top
		const hoverClientY = clientOffset.y - hoverBoundingRect.top
		const hoverClientX = clientOffset.x - hoverBoundingRect.left

		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%
		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
		//	if (dragIndex < hoverIndex && hoverClientX < hoverClientX) {
				return
		//	}
		}

		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			//if (dragIndex > hoverIndex && hoverClientX > hoverClientX) {
				return
			//}
		}

		// Time to actually perform the action
		props.moveCard(dragIndex, hoverIndex)

		// Note: we're mutating the monitor item here!
		// Generally it's better to avoid mutations,
		// but it's good here for the sake of performance
		// to avoid expensive index searches.
		monitor.getItem().index = hoverIndex
	},
}

const styles = {
	image: {
		width: '200px'
	},
	close:  {
	  position: 'absolute',
	  top: 0,
	  right: 0,
		zIndex: 99999,
		color: 'rgba(0, 0, 0, 0.5)',
		cursor: 'pointer'
	},
	card: {
		padding: '0.5rem 1rem',
		marginBottom: '.5rem',
		//backgroundColor: 'white',
		cursor: 'move',
		display: 'inline-block',
		float: 'left',
		position: 'relative'
	}
}

export default connect(mapAllToProps)(DropTarget(ItemTypes.CARD, cardTarget, (connect: DropTargetConnector) => ({
	connectDropTarget: connect.dropTarget(),
}))(DragSource(
	ItemTypes.CARD,
	cardSource,
	(connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
	}),
)(class Card extends React.Component {
	static contextTypes = {
    store: PropTypes.object
  }

	removeImage = (id, event) => {
		event.preventDefault()
		this.context.store.dispatch(removeImage(id))
	}

	render() {
		const {
			image,
			isDragging,
			connectDragSource,
			connectDropTarget,
		} = this.props
		const opacity = isDragging ? 0 : 1

		return (
			connectDragSource &&
			connectDropTarget &&
			connectDragSource(
				connectDropTarget(<div style={{ ...styles.card, opacity }}><img style={styles.image} src={image.data}/><Delete onClick={this.removeImage.bind(this, image.id)} style={styles.close}/></div>),
			)
		)
	}
})))
