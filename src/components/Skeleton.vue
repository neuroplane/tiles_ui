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

<style scoped>
.skeleton {
  width: 100%;
}

.skeleton-shimmer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.03) 0%,
    rgba(255, 255, 255, 0.08) 50%,
    rgba(255, 255, 255, 0.03) 100%
  );
  background-size: 200% 100%;
}

.skeleton--animate .skeleton-shimmer {
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* Tile variant */
.skeleton-tile {
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  overflow: hidden;
}

.skeleton-tile--1x1 {
  grid-column: span 1;
  grid-row: span 1;
}

.skeleton-tile--2x1 {
  grid-column: span 2;
  grid-row: span 1;
}

.skeleton-tile--3x1 {
  grid-column: span 3;
  grid-row: span 1;
}

.skeleton-tile--1x2 {
  grid-column: span 1;
  grid-row: span 2;
}

.skeleton-tile--2x2 {
  grid-column: span 2;
  grid-row: span 2;
}

.skeleton-tiles-grid {
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

@media (max-width: 600px) {
  .skeleton-tiles-grid {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: calc((100vw - 40px - 24px) / 3);
    padding: 10px;
    gap: 8px;
  }
  
  .skeleton-tile--2x1,
  .skeleton-tile--3x1,
  .skeleton-tile--2x2 {
    grid-column: span 3;
  }
}

/* Text variant */
.skeleton-text {
  height: 16px;
  background: rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  border-radius: 2px;
}

/* List variant */
.skeleton-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.skeleton-list-item {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 32px;
}

.skeleton-list-icon {
  width: 16px;
  height: 16px;
  background: rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  border-radius: 50%;
}

.skeleton-list-text {
  flex: 1;
  height: 14px;
  background: rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  border-radius: 2px;
}

.skeleton-list-value {
  width: 60px;
  height: 14px;
  background: rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  border-radius: 2px;
}

/* Chart variant */
.skeleton-chart {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
  height: 100%;
}

.skeleton-chart-title {
  height: 12px;
  width: 60%;
  background: rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  border-radius: 2px;
}

.skeleton-chart-area {
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  border-radius: 2px;
}
</style>
