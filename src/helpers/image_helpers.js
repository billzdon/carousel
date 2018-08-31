import { addImage } from '../actions/carousel_actions'

export function onImageDrop(component, acceptedFiles) {
  component.setState({dropzoneActive: false})
  var file = acceptedFiles[0]
  const reader = new FileReader();
  reader.onload = (event) => {
    component.context.store.dispatch(addImage(event.target.result))
  };
  reader.readAsDataURL(file);
}
