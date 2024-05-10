<template>
    <li>
        <a class="dropdown-item" v-bind="$attrs">
            <slot />
        </a>
    </li>
</template>
<script setup>
defineOptions({
    inheritAttrs: false
})
</script>