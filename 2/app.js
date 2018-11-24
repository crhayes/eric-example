var App = (function() {
  function App() {}

  App.prototype.init = function() {
    const tracks = [
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

    this.render(tracks);
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
