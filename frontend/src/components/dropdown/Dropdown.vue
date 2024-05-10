<template>
    <div class="dropdown" v-click-out-side="handleClickOutside">
      <slot name="trigger" :toggleClass="toggleClass" :toggle="toggle" />
      <ul class="dropdown-menu" :class="toggleClass" :style="menuStyles">
        <slot name="menu" :toggle="toggle" />
      </ul>
    </div>
</template>
<script setup>
import { computed, ref } from 'vue';
import { clickOutSide as vClickOutSide } from '@mahdikhashan/vue3-click-outside'

const isOpen = ref(false)

const toggle = () => {
    isOpen.value = !isOpen.value
}

const handleClickOutside = () => {
    isOpen.value = false
}

const menuStyles = computed(() => {
    return {
        position: 'absolute', 
        inset: '0px auto auto 0px',
        margin: '0px',
        transform: 'translate(0px, 40px)'
    }
})

const toggleClass = computed(() => {
    return isOpen.value ? 'show' : ''
})
</script>