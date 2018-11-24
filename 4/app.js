var App = (function() {
  function App() {}

  App.prototype.init = function() {
    const tracks = this.fetchTracks('rock');

    this.render(tracks);
  }

  App.prototype.fetchTracks = function(genre) {
    switch (genre) {
      case 'rock':
        return [
          {
            name: 'Rock 1',
          },
          {
            name: 'Rock 2',
          },
          {
            name: 'Rock 3',
          },
          {
            name: 'Rock 4',
          },
          {
            name: 'Rock 5',
          },
        ];
        break;
      case 'pop':
        return [
          {
            name: 'Pop 1',
          },
          {
            name: 'Pop 2',
          },
          {
            name: 'Pop 3',
          },
          {
            name: 'Pop 4',
          },
          {
            name: 'Pop 5',
          },
        ];
        break;
      case 'hiphop':
        return [
          {
            name: 'Hiphop 1',
          },
          {
            name: 'Hiphop 2',
          },
          {
            name: 'Hiphop 3',
          },
          {
            name: 'Hiphop 4',
          },
          {
            name: 'Hiphop 5',
          },
        ];
        break;
      case 'soul':
        return [
          {
            name: 'Soul 1',
          },
          {
            name: 'Soul 2',
          },
          {
            name: 'Soul 3',
          },
          {
            name: 'Soul 4',
          },
          {
            name: 'Soul 5',
          },
        ];
        break;
      default:
        return [];
    }
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
