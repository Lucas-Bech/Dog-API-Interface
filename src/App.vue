<template>
  <div id="app">
    
    <the-header>
    </the-header>

    <dog-interface-fetcher 
    @images-ready="eventImagesReady"
    @more-ready="eventMoreReady"
    :imageGroupCount="imageGroupCount">
    </dog-interface-fetcher>

    <dog-interface-display 
    @load-more="eventLoadMore"
    :image-sources="imageSources">
    </dog-interface-display>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TheHeader from '@/components/TheHeader.vue';
import DogInterfaceDisplay from '@/components/DogInterfaceDisplay.vue';
import DogInterfaceFetcher from '@/components/DogInterfaceFetcher.vue';

@Component({
  components: {
    TheHeader,
    DogInterfaceDisplay,
    DogInterfaceFetcher,
  },
})
export default class App extends Vue {
  private imageSources: string[] = [];
  private imageGroupCount: number = 2;

  private eventImagesReady(newImages: string[]) {
    this.imageSources = newImages;
  }

  private eventLoadMore() {
    this.imageGroupCount++;
  }

  private eventMoreReady(newImages: string[]) {
    this.imageSources = [...this.imageSources, ...newImages];
  }

}
</script>

<style lang="scss">
body {
    margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.button {
  display: inline-block;
  padding: 0.7em 1.7em;
  margin: 1em 0.3em 0.3em 0;
  border-radius: 0.2em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: 'Roboto',sans-serif;
  font-weight: 400;
  color: #FFFFFF;
  background-color: #3369ff;
  box-shadow: inset 0 -0.6em 1em -0.35em rgba(0,0,0,0.17),inset 0 0.6em 2em -0.3em rgba(255,255,255,0.15),inset 0 0 0em 0.05em rgba(255,255,255,0.12);
  text-align: center;
  position: relative;

  &:active {
    box-shadow: inset 0 0.6em 2em -0.3em rgba(0,0,0,0.15),inset 0 0 0em 0.05em rgba(255,255,255,0.12);
  }
}
@media all and (max-width:30em){
  .button {
    display: block;
    margin: 0.4em auto;
  }
}
</style>
