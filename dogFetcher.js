function DogAPI(_dom_image) {
    this.dom_image = _dom_image

    $(document).on('submit', '#dogFilter', function() {
        DogFetcher.fetchDog($('#dogFilter > select').val())
        return false;
    })

    // AJAX -> PHP -> API
    this.fetchDog = function(breed) {

        DogFetcher.loadImage('images/loading.gif');

        var request = $.ajax({
            type: 'GET',
            url: 'fetchDog.php',
            data: ({
                breed: breed
            })
        })

        request.done(function(data) {
            DogFetcher.loadImage(data)
        })
    }

    this.loadImage = function(imgSrc) {
        this.dom_image.attr('src', imgSrc)
    }

    this.initFilter = function() {

        var breedList_promise = getBreedList()

        var filter = document.getElementById('dogFilter').getElementsByTagName('select')[0]

        breedList_promise.then(function(data) {

            breeds = data['message']

            for (var breed in breeds) {

                var dog_origins = breeds[breed].length

                if (dog_origins === 0) {
                    var option = document.createElement('option')
                    option.innerHTML = breed
                    option.setAttribute('value', breed)
                    filter.appendChild(option)
                } else
                    for (var i = dog_origins - 1; i > -1; i--) {
                        var option = document.createElement('option')
                        option.innerHTML = breeds[breed][i] + ' ' + breed
                        option.setAttribute('value', breed + '-' + breeds[breed][i])
                        filter.appendChild(option)
                    }
            }
        })
    }
}

var DogFetcher = new DogAPI($('#dogFetcher > img'))

function getBreedList() {

    var promise = $.ajax({
        type: "GET",
        url: "https://dog.ceo/api/breeds/list/all"
    })
    return promise
}

// Init
DogFetcher.fetchDog()
DogFetcher.initFilter()
