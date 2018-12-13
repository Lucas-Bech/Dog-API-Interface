class DogAPI {
    constructor(dom_image, dogFilter) {
      this.dom_image = dom_image

      // Filter Form
      this.dogFilter = dogFilter
      this._initFilter()
      $(document).on('submit', '#dogFilter', function() {
          DogFetcher.fetchDog($('#dogFilter > select').val())
          return false;
      })
    }

  async _initFilter() {
      // Random Field
      var option = document.createElement('option')
      option.innerHTML = 'Random'
      option.setAttribute('value', '')
      this.dogFilter.appendChild(option)

      // Append each breed from API to selection
      let response = await this._getBreedList()
      var breeds = response['message']

          for (let breed in breeds) {
              let dog_origins = breeds[breed].length

              if (dog_origins === 0) {
                  option = document.createElement('option')
                  option.setAttribute('value', breed)
                  option.innerHTML = capitalizeWord(breed)
                  this.dogFilter.appendChild(option)
              } else
                  for (let origin = dog_origins - 1; origin > -1; origin--) {
                      option = document.createElement('option')
                      option.setAttribute('value', breed + '-' + breeds[breed][origin])
                      option.innerHTML = capitalizeWord(breeds[breed][origin]) + ' ' + capitalizeWord(breed)
                      this.dogFilter.appendChild(option)
                  }
          }
    }

    async _getBreedList() {
        return await $.ajax({
            type: "GET",
            url: "https://dog.ceo/api/breeds/list/all"
        })
    }

    // AJAX -> PHP -> API
    async fetchDog(breed) {
        DogFetcher._loadImage('images/loading.gif')

        var dogURL = await $.ajax({
            type: 'GET',
            url: 'fetchDog.php',
            data: ({
                breed: breed
            })
        })
        DogFetcher._loadImage(dogURL)
    }

    _loadImage(imgSrc) {
        this.dom_image.attr('src', imgSrc)
    }

}

var DogFetcher = new DogAPI($('#dogFetcher > img'), $('#dogFilter > select')[0])
DogFetcher.fetchDog()
