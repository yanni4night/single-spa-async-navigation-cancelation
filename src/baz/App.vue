<template>
    <div class="baz">
        baz
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { start } from 'single-spa';

export default defineComponent({
    name: 'baz',
    mounted() {
        start();
    },
})
</script>