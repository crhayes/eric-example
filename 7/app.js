class App {
  async init() {
    const tracks = await this.fetchTracks('rock');

    this.render(tracks);
  }

  async onGenreChange(event) {
    const tracks = await this.fetchTracks(event.value);

    this.render(tracks);
  }

  async fetchTracks(genreSlug) {
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
        apikey: '688ba9d21160725fda946f96ac6db6fe',
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
        genres: item.track.primary_genres,
      }
    });
  }

  render(tracks) {
    const $trackListContainer = $('.track-list');

    $trackListContainer.empty();

    tracks.forEach(track => {
      $trackListContainer.append(`
        <div class="list-group-item">${track.name}</div>
      `);
    })
  }
}

var app = new App();

app.init();
