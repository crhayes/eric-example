var App = (function() {
  function App() {}

  App.prototype.init = async function() {
    const tracks = await this.fetchTracks('rock');

    this.render(tracks);
  }

  App.prototype.onGenreChange = async function(event) {
    const tracks = await this.fetchTracks(event.value);

    this.render(tracks);
  }

  App.prototype.fetchTracks = async function(genreSlug) {
    const genreSlugToIdMap = {
      'rock': 7,
      'pop': 8,
      'hiphop': 9,
      'soul': 10,
    };

    const genreId = genreSlugToIdMap[genreSlug];

    const res = await $.ajax({
      url: 'https://api.musixmatch.com/ws/1.1/track.search',
      method: 'GET',
      dataType: 'jsonp',
      data: {
        apikey: '3ab5684680f38c7ad48e5a3d9078a81c',
        format: 'jsonp',
        f_music_genre_id: genreId,
        page_size: '5',
        page: 1,
        s_track_rating: 'DESC'
      },
    });

    return res.message.body.track_list.map(item => {
      return {
        name: item.track.album_name,
      }
    });
  }

  App.prototype.render = function(tracks) {
    const $trackListContainer = $('.track-list');

    $trackListContainer.empty();

    tracks.forEach(track => {
      $trackListContainer.append(`
        <div class="list-group-item">${track.name}</div>
      `);
    })
  }

  return App;
}());

var app = new App();

app.init();
