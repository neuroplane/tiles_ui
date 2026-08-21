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
      :chart-data="tile.chartData"
      :chart-value="tile.chartValue"
      :progress-percent="tile.progressPercent"
      :image-url="tile.imageUrl"
      :timer-target="tile.timerTarget"
      :indicators="tile.indicators"
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

<style src="../styles/tiles-container.css"></style>
