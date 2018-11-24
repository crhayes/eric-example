var App = (function() {
  function App() {}

  App.prototype.init = function() {
    const tracks = this.fetchTracks();

    this.render(tracks);
  }

  App.prototype.fetchTracks = function() {
    return [
      {
        name: 'Scorpion',
      },
      {
        name: 'The Last Rocket',
      },
      {
        name: 'Californiacation',
      },
      {
        name: 'Take Care',
      },
      {
        name: 'Section 80',
      },
    ];
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
