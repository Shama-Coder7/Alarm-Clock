setInterval(setClock, 1000);

const hourHand = document.querySelector('[data-hour-hand]');
const minuteHand = document.querySelector('[data-minute-hand]');
const secondHand = document.querySelector('[data-second-hand]');

function setClock() {
  const currentDate = new Date();
  const secondsRatio = currentDate.getSeconds() / 60;
  const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60;
  const hoursRatio = (minutesRatio + currentDate.getHours()) / 12;
  setRotation(secondHand, secondsRatio);
  setRotation(minuteHand, minutesRatio);
  setRotation(hourHand, hoursRatio);
}

function setRotation(element, rotationRatio) {
  element.style.setProperty('--rotation', rotationRatio * 360);
}

setClock();

var alarmString = null;

const alarmAudio = document.getElementById('alarm-audio');

const createAlarm = document.querySelector('.create-alarm');

const activeAlarm = document.getElementById('active-alarm');
const clearAlarm = document.getElementById('clear-alarm');

const alarmTextContainer = document.getElementById('alarm-text');

const alarmText = (time) => `Alarm set at time ${time}`;

alarmAudio.src = 'http://soundbible.com/grab.php?id=1252&type=mp3';
alarmAudio.load();

const handleSubmit = (event) => {
  event.preventDefault();
  const { date, hour, sec, min, zone } = document.forms[0];
  alarmString = getTimeString({
    dates: date.value,
    hours: hour.value,
    seconds: sec.value,
    minutes: min.value,
    zone: zone.value,
  });
  document.forms[0].reset();
  createAlarm.style.display = 'none';
  activeAlarm.style.display = 'block';
  alarmTextContainer.innerHTML = alarmText(alarmString);
};

const handleClear = () => {
  alarmString = '';
  activeAlarm.style.display = 'none';
  createAlarm.style.display = 'block';
};

clearAlarm.addEventListener('click', handleClear);
document.forms[0].addEventListener('submit', handleSubmit);

const checkAlarm = (timeString) => {
  if (alarmString === timeString) {
    alarmAudio.play();
  }
};

const getTimeString = ({ dates, hours, minutes, seconds, zone }) => {
  if (minutes / 10 < 1) {
    minutes = '0' + minutes;
  }
  if (seconds / 10 < 1) {
    seconds = '0' + seconds;
  }
  return `Date:-${dates}:: Time:- ${hours}:${minutes}:${seconds} ${zone}`;
};

const renderTime = () => {
  var currentTime = document.getElementById('current-time');
  const currentDate = new Date();
  var dates = currentDate.getDate();
  var years = currentDate.getFullYear();
  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var seconds = currentDate.getSeconds();
  var zone = hours >= 12 ? 'PM' : 'AM';
  if (hours > 12) {
    hours = hours % 12;
  }
  const timeString = getTimeString({
    dates,
    years,
    hours,
    minutes,
    seconds,
    zone,
  });
  checkAlarm(timeString);
  currentTime.innerHTML = timeString;
};

setInterval(renderTime, 1000);

