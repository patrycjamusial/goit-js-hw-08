import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player('vimeo-player');

const onPlay = function (data) {
  localStorage.setItem('videoplayer-current-time', data.seconds);
};

player.on('timeupdate', throttle(onPlay, 1000));

const currentTime = Number(localStorage.getItem('videoplayer-current-time'));

player.setCurrentTime(currentTime);

function checkSavedTime() {
  player.getDuration().then(function (duration) {
    if (currentTime === null || currentTime > duration) {
      player.setCurrentTime(0);
    }
  });
}
player.on('loaded', function () {
  checkSavedTime();
});

player.on('play', function () {
  checkSavedTime();
});

player.on('ended', function () {
  player.setCurrentTime(0);
});
