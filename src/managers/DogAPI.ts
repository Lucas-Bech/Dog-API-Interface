import axios from 'axios';

interface URLs {
  random: string;
  breedList: string;
  ofBreed: any;
}

interface Breed {
  name: string;
  apiValue: string;
}

class DogAPI {
  // Member variables
  private resourceLocations: URLs = {
      random: 'https://dog.ceo/api/breeds/image/random',
      breedList: 'https://dog.ceo/api/breeds/list/all',
      ofBreed: {
        start: 'https://dog.ceo/api/breed/',
        end: '/images/random',
      },
  };

  // Computed variables
  get URLs(): object {
      return this.resourceLocations;
  }

  // Methods
  public async getBreedList() {
    // Includes special option for random breed
    const outBreeds: Breed[] = [{
      name: 'Random',
      apiValue: 'random',
    }];

    // Get list of breeds from API
    const response = await axios.get(this.resourceLocations.breedList);
    const breedList = response.data.message;

    for (const breed in breedList) {
      const baseAPIValue: string = breed;
      const baseName: string = this.capitalizeWord(breed);

      // Some breeds have multiple origins, e.g. French/Boston Bulldog
      const originCount: number = 1 + breedList[breed].length;

      for (let i = 0; i < originCount - 1; ++i) {
        let apiValue: string = baseAPIValue;
        let name: string = baseName;

        if (originCount > 1) {
          const originName: string = breedList[breed][i];
          apiValue = `${baseAPIValue}-${originName}`;
          name = `${this.capitalizeWord(originName)} ${name}`;
        }

        outBreeds.push({
          name,
          apiValue,
        });
      }
    }
    return outBreeds;
  }

  public async getDogImage(breed: string) {
    let resourceLocation = '';
    if (breed === 'random') {
      resourceLocation = this.resourceLocations.random;
    } else {
      resourceLocation =
      this.resourceLocations.ofBreed.start
      + breed
      + this.resourceLocations.ofBreed.end;
    }
    const imageSource = await axios.get(resourceLocation);
    return imageSource.data.message;
  }

  private capitalizeWord(word: string) {
    return word[0].toUpperCase() + word.slice(1);
  }

}
export default DogAPI;
