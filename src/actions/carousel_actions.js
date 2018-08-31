import uuid from 'uuid'
import * as c from '../constants';

export const addImage = (data) => {
  return {
    type: c.ADD_IMAGE,
    image: { id: uuid.v4(), data: data }
  }
}

export const removeImage = (imageId) => {
  return {
    type: c.REMOVE_IMAGE,
    imageId
  }
}

export const reorderImage = (imageId, dragIndex, hoverIndex) => {
  return {
    type: c.REORDER_IMAGE,
    imageId,
    dragIndex,
    hoverIndex
  }
}
