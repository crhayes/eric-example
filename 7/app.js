const ROCK_GENRE_ID = 7;
const NUM_PAGES = 2;
const NUM_PER_PAGE = 100;

class App {
  /**
   * This method initializes the app. In doing so it fetches a defined number
   * of pages of tracks and then caches them locally. Once all pages have
   * been loaded it delegates to "filterTracksByGenre" in order to
   * render only the Rock genre on the page by default.
   */
  async init() {
    const promises = App.range(NUM_PAGES).map(page => this.fetchTracks(ROCK_GENRE_ID, page, NUM_PER_PAGE));
    const pages = await Promise.all(promises);

    this.tracks = pages.flat();
    this.filteredTracks = [];

    this.filterTracksByGenre('Rock');
  }

  /**
   * Takes a number and returns an array containing the values [1...Number]
   *
   * @param {Number} length
   */
  static range(length) {
    return Array.from({ length }, (v, i) => i + 1);
  }

  /**
   * Accepts a genre name, filters the cached tracks by only the ones that contain
   * the given genre, and then renders only the filtered tracks.
   *
   * @param {String} genre
   */
  filterTracksByGenre(genre) {
    this.filteredTracks = this.tracks.filter(track => track.genres.includes(genre));

    this.render();
  }

  /**
   * Called when the select dropdown value changes. It receives an Event object,
   * from which it extracts the genre value of selected dropdown option,
   * and then delegates to "filterTracksByGenre" to render the selected genre.
   *
   * @param {Event} event
   */
  onGenreChange(event) {
    this.filterTracksByGenre(event.value);
  }

  /**
   * This method fetches tracks that match the passed parameters.
   * After fetching the tracks it maps over them and extracts
   * the data we're interested in and arranges it in a
   * more useful format to us.
   *
   * The data is returned in the following format:
   *
   *  [
   *    {
   *      trackName: 'Dope Track',
   *      albumName: 'Supa Hot Fiya',
   *      artistName: 'McLovin'
   *      genres: ['Rock', 'Flames', 'Fire'],
   *    }
   *  ]
   *
   *
   * @param {Number} genreId The id of the genre we want to fetch
   * @param {Number} pageNumber The current page we're fetching
   * @param {Numner} numberPerPage Number of tracks to include per page
   */
  async fetchTracks(genreId, pageNumber, numberPerPage) {
    const res = await $.ajax({
      url: 'https://api.musixmatch.com/ws/1.1/track.search',
      method: 'GET',
      dataType: 'jsonp',
      data: {
        apikey: '688ba9d21160725fda946f96ac6db6fe',
        format: 'jsonp',
        f_music_genre_id: genreId,
        page_size: numberPerPage,
        page: pageNumber,
        s_track_rating: 'DESC'
      },
    });

    return res.message.body.track_list.map(({ track }) => {
      return {
        trackName: track.track_name,
        albumName: track.album_name,
        artistName: track.artist_name,
        genres: track.primary_genres.music_genre_list.reduce((prev, curr) => {
          prev.push(curr.music_genre.music_genre_name);
          return prev;
        }, []),
      }
    });
  }

  /**
   * Inserts all of the track-related DOM nodes our UI requires.
   * It does this by iterating over all of the filtered tracks,
   * building up the HTML we want for each track via template strings,
   * then sets that as the HTML of our containing element.
   */
  render() {
    const $trackListContainer = $('.track-list');
    const tracks = this.filteredTracks;
    let template;

    if (tracks.length === 0) {
      template = '<div class="alert alert-info">Sorry, no results to display.</div>';
    } else {
      template = '<div class="list-group">';
      template += tracks.map(track => `<div class="list-group-item">${track.trackName} - ${track.artistName}</div>`).join('');
      template += '</div>';
    }

    $trackListContainer.html(template);
  }
}


// Create a new app instance
var app = new App();

// Initialize the app
app.init();
