# carousel

Drag an image anywhere on the homepage to upload an image.
Hompage has carousel of images.
Click the reorder grid icon in the top right to go to the reorder page.
You can drag and drop reorder the images or delete them from the reorder page.
Carousel is built with react-slick.  Drag and drop is built with React-dnd.  UI is built with material-ui.
Images are saved into localstorage with react-persist and redux.

Notes:
Local storage is quite limited so larger images or too many images will eventually break the frontend-cache system.
