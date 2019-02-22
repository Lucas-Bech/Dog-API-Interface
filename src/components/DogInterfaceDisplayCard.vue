<template>
    <div class="card">
        <img :src="imageSource">
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class DogInterfaceDisplayCard extends Vue {
    @Prop(String) private imageSource!: string;
}
</script>

<style lang="scss" scoped>
.card {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    height: 300px;
    width: 350px;
    padding: 17px;
    box-shadow: 7px 8px 11px -6px #adabab;
    img {
        max-width: 100%;
        max-height: 100%;
        object-fit: scale-down;
    }
}
</style>
