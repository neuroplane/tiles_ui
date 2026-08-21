import Tile from './components/Tile.vue'
import TilesContainer from './components/TilesContainer.vue'
import Button from './components/Button.vue'
import Dialog from './components/Dialog.vue'
import Input from './components/Input.vue'
import Toast from './components/Toast.vue'
import Skeleton from './components/Skeleton.vue'

export {
  Tile,
  TilesContainer,
  Button,
  Dialog,
  Input,
  Toast,
  Skeleton
}

const TilesUI = {
  install(app) {
    app.component('Tile', Tile)
    app.component('TilesContainer', TilesContainer)
    app.component('TilesButton', Button)
    app.component('TilesDialog', Dialog)
    app.component('TilesInput', Input)
    app.component('TilesToast', Toast)
    app.component('TilesSkeleton', Skeleton)
  }
}

export default TilesUI
