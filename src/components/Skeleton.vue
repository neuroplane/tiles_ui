<template>
  <div class="skeleton" :class="[`skeleton--${variant}`, { 'skeleton--animate': animate }]">
    <template v-if="variant === 'tile'">
      <div class="skeleton-tile" :class="`skeleton-tile--${size}`">
        <div class="skeleton-shimmer"></div>
      </div>
    </template>
    
    <template v-else-if="variant === 'tiles-grid'">
      <div class="skeleton-tiles-grid">
        <div 
          v-for="i in count" 
          :key="i" 
          class="skeleton-tile"
          :class="getTileSize(i)"
        >
          <div class="skeleton-shimmer"></div>
        </div>
      </div>
    </template>
    
    <template v-else-if="variant === 'text'">
      <div class="skeleton-text" :style="{ width: width }">
        <div class="skeleton-shimmer"></div>
      </div>
    </template>
    
    <template v-else-if="variant === 'list'">
      <div class="skeleton-list">
        <div 
          v-for="i in count" 
          :key="i" 
          class="skeleton-list-item"
        >
          <div class="skeleton-list-icon">
            <div class="skeleton-shimmer"></div>
          </div>
          <div class="skeleton-list-text">
            <div class="skeleton-shimmer"></div>
          </div>
          <div class="skeleton-list-value">
            <div class="skeleton-shimmer"></div>
          </div>
        </div>
      </div>
    </template>
    
    <template v-else-if="variant === 'chart'">
      <div class="skeleton-chart">
        <div class="skeleton-chart-title">
          <div class="skeleton-shimmer"></div>
        </div>
        <div class="skeleton-chart-area">
          <div class="skeleton-shimmer"></div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'tile',
    validator: (value) => ['tile', 'tiles-grid', 'text', 'list', 'chart'].includes(value)
  },
  size: {
    type: String,
    default: '1x1',
    validator: (value) => ['1x1', '2x1', '3x1', '1x2', '2x2'].includes(value)
  },
  count: {
    type: Number,
    default: 1
  },
  width: {
    type: String,
    default: '100%'
  },
  animate: {
    type: Boolean,
    default: true
  }
})

// Generate pseudo-random tile sizes for grid
const getTileSize = (index) => {
  const sizes = ['skeleton-tile--1x1', 'skeleton-tile--2x1', 'skeleton-tile--1x2', 'skeleton-tile--2x2']
  // Use seeded random based on index for consistency
  const sizeIndex = (index * 7) % sizes.length
  return sizes[sizeIndex]
}
</script>

<style src="../styles/skeleton.css"></style>
