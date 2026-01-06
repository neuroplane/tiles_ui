<template>
  <div class="tiles-container" :style="{ maxWidth }">
    <Tile
      v-for="(tile, index) in tiles"
      :key="index"
      :size="tile.size"
      :color="tile.color"
      :type="tile.type"
      :badge="tile.badge"
      :number="tile.number"
      :title="tile.title"
      :value="tile.value"
      :text="tile.text"
      :icon="tile.icon"
      :items="tile.items"
      :clickable="tile.clickable"
      @click="tile.clickable && handleTileClick(tile, index)"
    />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import Tile from './Tile.vue'

defineProps({
  tiles: {
    type: Array,
    required: true
  },
  maxWidth: {
    type: [String, Number],
    default: '100%'
  }
})

const handleTileClick = (tile, index) => {
  if (tile.onClick) {
    tile.onClick(tile, index)
  }
}
</script>

<style scoped>
.tiles-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 140px);
  grid-auto-rows: 140px;
  grid-auto-flow: dense;
  gap: 12px;
  padding: 20px;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  justify-content: center;
}

/* Для адаптивности на больших экранах - больше колонок */
@media (min-width: 1400px) {
  .tiles-container {
    grid-template-columns: repeat(auto-fill, 140px);
  }
}

/* Для маленьких экранов */
@media (max-width: 600px) {
  .tiles-container {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    padding: 10px;
  }
}
</style>
