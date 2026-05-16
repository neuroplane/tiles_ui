<template>
  <div class="input-wrapper" :class="{ 'input-wrapper--error': error }">
    <label v-if="label" class="input-label" :for="inputId">
      {{ label }}
      <span v-if="required" class="input-required">*</span>
    </label>
    <div class="input-container">
      <span v-if="$slots.prefix" class="input-prefix">
        <slot name="prefix"></slot>
      </span>
      <input
        :id="inputId"
        ref="inputRef"
        class="input"
        :class="{
          'input--with-prefix': $slots.prefix,
          'input--with-suffix': $slots.suffix,
          'input--error': error
        }"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :min="min"
        :max="max"
        :step="step"
        :autocomplete="autocomplete"
        @input="handleInput"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
        @keydown="$emit('keydown', $event)"
      />
      <span v-if="$slots.suffix" class="input-suffix">
        <slot name="suffix"></slot>
      </span>
    </div>
    <div v-if="error" class="input-error">{{ error }}</div>
    <div v-else-if="hint" class="input-hint">{{ hint }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text',
    validator: (value) => ['text', 'password', 'email', 'number', 'tel', 'url', 'search'].includes(value)
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  },
  hint: {
    type: String,
    default: ''
  },
  min: {
    type: [String, Number],
    default: undefined
  },
  max: {
    type: [String, Number],
    default: undefined
  },
  step: {
    type: [String, Number],
    default: undefined
  },
  autocomplete: {
    type: String,
    default: undefined
  }
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus', 'keydown'])

const inputRef = ref(null)
let inputIdCounter = 0
const inputId = computed(() => `input-${++inputIdCounter}`)

const handleInput = (event) => {
  let value = event.target.value
  
  if (props.type === 'number') {
    value = value === '' ? '' : Number(value)
  }
  
  emit('update:modelValue', value)
}

const focus = () => inputRef.value?.focus()
const blur = () => inputRef.value?.blur()
const select = () => inputRef.value?.select()

defineExpose({
  focus,
  blur,
  select,
  inputRef
})
</script>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}

.input-wrapper--error .input {
  border-color: #c9283a;
}

.input-label {
  font-size: 12px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.input-required {
  color: #c9283a;
  margin-left: 2px;
}

.input-container {
  display: flex;
  align-items: center;
  position: relative;
}

.input {
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  font-family: inherit;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  outline: none;
  transition: border-color 0.2s, background 0.2s;
}

.input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.input:hover:not(:disabled) {
  border-color: rgba(255, 255, 255, 0.3);
}

.input:focus {
  border-color: #4a5fc7;
  background: rgba(255, 255, 255, 0.15);
}

.input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.input--with-prefix {
  padding-left: 40px;
}

.input--with-suffix {
  padding-right: 40px;
}

.input-prefix,
.input-suffix {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.5);
  pointer-events: none;
}

.input-prefix {
  left: 12px;
}

.input-suffix {
  right: 12px;
}

.input-error {
  font-size: 12px;
  color: #c9283a;
  margin-top: 2px;
}

.input-hint {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 2px;
}

/* Number input arrows */
.input[type="number"]::-webkit-inner-spin-button,
.input[type="number"]::-webkit-outer-spin-button {
  opacity: 1;
  height: 30px;
  cursor: pointer;
}
</style>
