<template>
  <div id="dog-interface-display">
    <div class="grid">
      <dog-interface-display-card 
      v-for="imageSource in imageSources" :key="imageSource"
      :imageSource="imageSource">
      </dog-interface-display-card>
    </div>
    <button @click="loadMore" class="button">Load more</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import DogInterfaceDisplayCard from '@/components/DogInterfaceDisplayCard.vue';

@Component ({
  components: {
    DogInterfaceDisplayCard,
  },
})
export default class DogInterfaceDisplay extends Vue {
  @Prop(Array) private imageSources!: string[];

  private loadMore(): void {
    this.$emit('load-more');
  }

}
</script>

<style lang="scss" scoped>
#dog-interface-display {
  background: whitesmoke;
  padding-top: 2em;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, 400px);
  grid-auto-rows: repeat(auto-fit, 150px);
  grid-gap: 1em;
  justify-content: center;
  justify-items: center;
}
</style>