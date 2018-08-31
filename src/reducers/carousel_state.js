import * as c from '../constants'

function carouselState(state = {
  images: []
}, action) {
  switch (action.type) {
    case c.ADD_IMAGE:
      return {...{state}, ...{images: state.images.concat(action.image)}}
    case c.REMOVE_IMAGE:
      console.log(action)
      return {...{state}, ...{images: state.images.filter(image => image.id != action.imageId)}}
    case c.REORDER_IMAGE:
      let hovered = state.images[action.hoverIndex]
      state.images[action.hoverIndex] = state.images[action.dragIndex]
      state.images[action.dragIndex] = hovered
      return {...{state}, ...{images: state.images}}
    default:
      return state
  }
}

export default carouselState
