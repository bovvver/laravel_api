<script setup>
import IconCheck from "../../icons/IconCheck.vue";

defineProps({
  text: {
    type: String,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <span
    class="d-flex justify-content-center align-items-center"
    :class="{ 'text-primary': selected }"
  >
    {{ text }}
    <IconCheck v-show="selected" />
  </span>
</template>
