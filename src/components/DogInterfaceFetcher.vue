<template>
<div id="dog-interface-fetcher">
  <form id="form-dog-filter" @submit.prevent="serveBatch()">
    
    <label>Breed</label>
    <v-select 
    class="dropdown" 
    label="name" 
    :options="breedList" 
    v-model="selectedBreed">
    </v-select>
    
    <label for="images-per-load">Images per load (1 - 30)</label>
    <input id="images-per-load" v-model="imagesPerRequest" type="number" min="1" max="30">
    
    <button type="submit" class="button">Fetch Dogs</button>
  </form>
</div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue, Emit } from 'vue-property-decorator';
import DogAPI from '../managers/DogAPI';

interface Breed {
  name: string;
  apiValue: string;
}

@Component
export default class DogInterfaceFetcher extends Vue {
  // Handles API requests
  private dogAPI = new DogAPI();
  private selectedBreed = { name: 'Random', apiValue: 'random' }; // Default selection
  private imagesPerRequest: number = 12;
  private breedList: Breed[] = [];
  @Prop(Number) private imageGroupCount!: number;
  @Watch('imageGroupCount')
  private async onGroupCountChanged(newVal: number, oldVal: number) {
    const newBatch = await this.requestImageSources();
    this.$emit('more-ready', newBatch);
  }
  private created() {
    this.initBreedSelection();
    this.requestImages();
  }

  private async requestImages() {
    const newImageSources = await this.requestImageSources();
    this.serveBatch();
  }

  private async serveBatch() {
    const newBatch = await this.requestImageSources();
    this.$emit('images-ready', newBatch);
  }

  private async initBreedSelection() {
    this.breedList = await this.dogAPI.getBreedList();
  }

  private async requestImageSources() {

    // Send requests
    const imageSourcePromises: Array< Promise<string> > = [];
    for (let i: number = 0; i < this.imagesPerRequest; ++i) {
      imageSourcePromises.push(this.dogAPI.getDogImage(this.selectedBreed.apiValue));
    }

    // Receive responses
    const imageSources = await Promise.all(imageSourcePromises);

    // Filter duplicates
    for (let i: number = 0; i < imageSources.length - 1; ++i) {
      for (let j: number = i + 1; j < imageSources.length; ++j) {
        if (imageSources[i] === imageSources[j]) {
          imageSources.splice(j, 1);
        }
      }
    }
    return imageSources;
  }

}
</script>

<style scoped lang="scss">
#dog-interface-fetcher {
  display: flex;
  justify-content: center;
  padding: 6em;
  > #form-dog-filter {
    > * {
      margin: 1em .4em 1em .4em;
    }
  }
}
button {
  margin: 1em;
}
#images-per-load {
  border: 1px solid rgba(60,60,60,.26);
  border-radius: 4px;
  -webkit-appearance: none; 
  -moz-appearance: none;
  margin: 0;
  appearance: none; 
}
</style>
