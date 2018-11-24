var App = (function() {
  function App() {}

  App.prototype.init = function() {
    this.render();
  }

  App.prototype.render = function() {
    const $trackListContainer = $('.track-list');

    $trackListContainer.empty();

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
