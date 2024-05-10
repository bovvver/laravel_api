<template>
    <component :is="tag" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        <slot />
    </component>
</template>
<script setup>
defineProps({
    tag: {
        type: String,
        default: 'button',
        validator: function (value) {
            return ['button', 'a'].includes(value)
        }
    }
})
</script>