const target = document.body;

target.addEventListener('wheel', event => {
  const toLeft  = event.deltaY < 0 && target.scrollLeft > 0
  const toRight = event.deltaY > 0 && target.scrollLeft < target.scrollWidth - target.clientWidth

  if (toLeft || toRight) {
    if (target.classList.contains('modal-open')) return;
    event.preventDefault();
    target.scrollLeft += event.deltaY
  }
});


function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.bottom >= 0 &&
    rect.left >= 0 &&
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};
function debounce(func, wait, immediate) {
  var timeout;

  return function executedFunction() {
    var context = this;
    var args = arguments;
	    
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
	
    clearTimeout(timeout);

    timeout = setTimeout(later, wait);
	
    if (callNow) func.apply(context, args);
  };
};

var callbackFunc = debounce(function(items) {
  var items = document.querySelectorAll(".timeline li");
  for (var i = 0; i < items.length; i++) {
    if (isElementInViewport(items[i])) {
      if(!items[i].classList.contains("in-view")){
        items[i].classList.add("in-view");
      };
    } else if(items[i].classList.contains("in-view")) {
        items[i].classList.remove("in-view");
    };
  };
}, 100);

/*window.addEventListener("load", callbackFunc);
window.addEventListener("scroll", callbackFunc);  
window.addEventListener('resize', callbackFunc);*/

function overlaps(a, b) {
  const rect1 = a.getBoundingClientRect();
  const rect2 = b.getBoundingClientRect();
  const isInHoriztonalBounds =
    rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x;
  const isInVerticalBounds =
    rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
  const isOverlapping = isInHoriztonalBounds && isInVerticalBounds;
  return isOverlapping;
}


var app = new Vue ({
  el: "#app",
  data: function () {
    return {
      VERSION: 1.0,
      daySize: 50, // 50px
      userLang: navigator.language || navigator.userLanguage,
      settings: {dev: false, showEvents: true, hideUserPull: false, reverse: false},
      userPulls: {},
      devMenu: false,
      generalStats: {},
      sortedDates: [],
      filter: {character: false, showEvents: true, year: false, month: false},
      bannerOpen: false, //banner obj when open
      banners: [
        {
          type: 'covenant',
          start: '2018-11-11',
          end: '2018-11-18',
          title: 'Destina',
          subtitle: 'Rate Up',
          c: ['c2022'],
          a: []
        },
        {
          type: 'covenant',
          start: '2018-11-14',
          end: '2018-11-28',
          title: 'Cecilia',
          subtitle: 'Rate Up',
          c: ['c1002'],
          a: []
        },
        {
          type: 'covenant',
          start: '2018-11-22',
          end: '2018-11-28',
          title: 'Vildred',
          subtitle: 'Rate Up', 
          c: ['c1007'],
          a: []
        },
        {
          type: 'limited',
          start: '2018-11-29',
          end: '2018-12-12',
          title: 'Diene',
          subtitle: 'Limited', 
          c: ['c1076'],
          a: []
        },
        {
          type: 'covenant',
          start: '2018-12-14',
          end: '2018-12-26',
          title: 'Kayron',
          subtitle: 'Rate Up',
          c: ['c1023'],
          a: []
        },
        {
          type: 'mystic',
          start: '2018-12-14',
          end: '2019-01-30',
          title: 'Mystic',
          subtitle: '1st Rotation',
          c: ['c2049','c2014'],
          a: []
        },
        {
          type: 'covenant',
          start: '2018-12-26',
          end: '2019-01-09',
          title: 'Kise',
          subtitle: 'Rate Up',
          c: ['c1006'],
          a: ['Alexa\'s Basket']
        },
        {
          type: 'covenant',
          start: '2019-01-09',
          end: '2019-01-23',
          title: 'Bellona',
          subtitle: 'Rate Up',
          c: ['c1071'],
          a: ['Iron Fan']
        },
        {
          type: 'covenant',
          start: '2019-01-23',
          end: '2019-02-06',
          title: 'Violet',
          subtitle: 'Rate Up',
          c: ['c1074'],
          a: ['Violet Talisman']
        },
        {
          type: 'mystic',
          start: '2019-01-30',
          end: '2019-03-13',
          title: 'Mystic',
          subtitle: '2nd Rotation',
          c: ['c2038','c2028'],
          a: []
        },
        {
          type: 'covenant',
          start: '2019-02-06',
          end: '2019-02-20',
          title: 'Tamarinne',
          subtitle: 'Rate Up',
          c: ['c1067'],
          a: ['Idol\'s Cheer']
        },
        {
          type: 'limited',
          start: '2019-02-13',
          end: '2019-02-27',
          title: 'Luna',
          subtitle: 'Limited',
          c: ['c1066'],
          a: []
        },
        {
          type: 'covenant',
          start: '2019-02-20',
          end: '2019-03-06',
          title: 'Lidica',
          subtitle: 'Rate Up',
          c: ['c1046'],
          a: ['Sword of Judgment']
        },
        {
          type: 'covenant',
          start: '2019-03-06',
          end: '2019-03-20',
          title: 'Charles',
          subtitle: 'Rate Up',
          c: ['c1027'],
          a: ['Justice for All']
        },
        {
          type: 'mystic',
          start: '2019-03-13',
          end: '2019-04-24',
          title: 'Mystic',
          subtitle: '3rd Rotation',
          c: ['c2048','c2021'],
          a: []
        },
        {
          type: 'covenant',
          start: '2019-03-20',
          end: '2019-04-03',
          title: 'Cermia',
          subtitle: 'Rate Up',
          c: ['c1079'],
          a: ['Border Coin']
        },
        {
          type: 'covenant',
          start: '2019-04-03',
          end: '2019-04-10',
          title: 'Duble',
          subtitle: 'Rate Up',
          c: ['c1070','c1050'],
          a: []
        },
        {
          type: 'covenant',
          start: '2019-04-10',
          end: '2019-04-17',
          title: 'Iseria',
          subtitle: 'Rate Up',
          c: ['c1024'],
          a: []
        },
        {
          type: 'covenant',
          start: '2019-04-17',
          end: '2019-04-24',
          title: 'Duble',
          subtitle: 'Rate Up',
          c: ['c1047','c1039'],
          a: []
        },
        {
          type: 'mystic',
          start: '2019-04-24',
          end: '2019-06-12',
          title: 'Mystic',
          subtitle: '4th Rotation',
          c: ['c2015','c2054'],
          a: []
        },
        {
          type: 'limited',
          start: '2019-04-24',
          end: '2019-05-08',
          title: 'Baiken',
          subtitle: 'Limited',
          c: ['c1093'],
          a: ['Torn Sleeve']
        },
        {
          type: 'limited',
          start: '2019-05-08',
          end: '2019-05-22',
          title: 'Dizzy',
          subtitle: 'Limited',
          c: ['c1094'],
          a: ['Necro & Undine']
        },
        {
          type: 'covenant',
          start: '2019-05-22',
          end: '2019-05-29',
          title: 'Destina',
          subtitle: 'Rate Up',
          c: ['c2022'],
          a: []
        },
        {
          type: 'covenant',
          start: '2019-05-29',
          end: '2019-06-05',
          title: 'Aramintha',
          subtitle: 'Rate Up',
          c: ['c1048'],
          a: []
        },
        {
          type: 'covenant',
          start: '2019-06-06',
          end: '2019-06-19',
          title: 'Luluca',
          subtitle: 'Rate Up',
          c: ['c1082'],
          a: ['Spirit\'s Breath']
        },
        {
          type: 'mystic',
          start: '2019-06-12',
          end: '2019-06-26',
          title: 'Mystic',
          subtitle: '5th Rotation',
          c: ['c2002','c2054'],
          a: []
        },
        {
          type: 'mystic',
          start: '2019-06-26',
          end: '2019-08-07',
          title: 'Mystic',
          subtitle: '5th Rotation',
          c: ['c2002','c2010'],
          a: []
        },
        {
          type: 'covenant',
          start: '2019-06-19',
          end: '2019-06-26',
          title: 'Tywin',
          subtitle: 'Rate Up',
          c: ['c1042'],
          a: []
        },
        {
          type: 'covenant',
          start: '2019-06-26',
          end: '2019-07-03',
          title: 'Kise',
          subtitle: 'Rate Up',
          c: ['c1006'],
          a: []
        },
        {
          type: 'covenant',
          start: '2019-07-03',
          end: '2019-07-17',
          title: 'Lilibet',
          subtitle: 'Rate Up',
          c: ['c1095'],
          a: ['Creation & Destruction']
        },
        {
          type: 'covenant',
          start: '2019-07-17',
          end: '2019-07-24',
          title: 'Charlotte',
          subtitle: 'Rate Up',
          c: ['c1009'],
          a: []
        },
        {
          type: 'covenant',
          start: '2019-07-24',
          end: '2019-07-31',
          title: 'Sigret',
          subtitle: 'Rate Up',
          c: ['c1072'],
          a: []
        },
        {
          type: 'limited',
          start: '2019-07-31',
          end: '2019-08-14',
          title: 'Seaside Bellona',
          subtitle: 'Limited',
          c: ['c5071'],
          a: ['Reingar\'s Special Drink']
        },
        {
          type: 'mystic',
          start: '2019-08-07',
          end: '2019-09-05',
          title: 'Mystic',
          subtitle: '6th Rotation',
          c: ['c2019','c2004'],
          a: []
        },
        {
          type: 'covenant',
          start: '2019-08-14',
          end: '2019-08-21',
          title: 'Kayron',
          subtitle: 'Rate Up',
          c: ['c1023'],
          a: []
        },
        {
          type: 'covenant',
          start: '2019-08-22',
          end: '2019-09-05',
          title: 'Vivian',
          subtitle: 'Rate Up',
          c: ['c1088'],
          a: []
        },
        {
          type: 'covenant',
          start: '2019-09-05',
          end: '2019-09-11',
          title: 'Yufine',
          subtitle: 'Rate Up',
          c: ['c1016'],
          a: []
        },
        {
          type: 'mystic',
          start: '2019-09-05',
          end: '2019-10-03',
          title: 'Mystic',
          subtitle: '7th Rotation',
          c: ['c2006','c2029'],
          a: []
        },
        {
          type: 'covenant',
          start: '2019-09-12',
          end: '2019-09-19',
          title: 'Tamarinne',
          subtitle: 'Rate Up',
          c: ['c1067'],
          a: []
        },
        {
          type: 'covenant',
          start: '2019-09-19',
          end: '2019-09-26',
          title: 'Tenebria',
          subtitle: 'Rate Up',
          c: ['c1050'],
          a: []
        },
        {
          type: 'covenant',
          start: '2019-09-26',
          end: '2019-10-10',
          title: 'Lilias',
          subtitle: 'Rate Up',
          c: ['c1089'],
          a: ['Bastion of Perlutia']
        },
        

        {
          type: 'mystic',
          start: '2019-10-03',
          end: '2019-10-31',
          title: 'Mystic',
          subtitle: '8th Rotation',
          c: ['c2053','c2011'],
          a: []
        },
	      {
          type: 'covenant',
          start: '2019-10-10',
          end: '2019-10-17',
          title: 'Vildred',
          subtitle: 'Rate Up',
          c: ['c1007'],
          a: []
        },
	      {
          type: 'covenant',
          start: '2019-10-17',
          end: '2019-10-24',
          title: 'Sez',
          subtitle: 'Rate Up',
          c: ['c1038'],
          a: []
        },
	      {
          type: 'covenant',
          start: '2019-10-24',
          end: '2019-10-31',
          title: 'Cecilia',
          subtitle: 'Rate Up',
          c: ['c1002'],
          a: []
        },
	      {
          type: 'mystic',
          start: '2019-10-31',
          end: '2019-11-28',
          title: 'Mystic',
          subtitle: '9th Rotation',
          c: ['c2049','c2036'],
          a: []
        },
	      {
          type: 'limited',
          start: '2019-10-31',
          end: '2019-11-14',
          title: 'Luna',
          subtitle: 'Limited',
          c: ['c1066'],
          a: ['Draco Plate']
        },
	      {
          type: 'covenant',
          start: '2019-11-07',
          end: '2019-11-21',
          title: 'Melissa',
          subtitle: 'Rate Up',
          c: ['c1096'],
          a: ['Bloody Rose']
        },
	      {
          type: 'covenant',
          start: '2019-11-21',
          end: '2019-11-28',
          title: 'Basar',
          subtitle: 'Rate Up',
          c: ['c1053'],
          a: []
        },
	      {
          type: 'mystic',
          start: '2019-11-28',
          end: '2019-12-26',
          title: 'Mystic',
          subtitle: '10th Rotation',
          c: ['c2046','c2017'],
          a: []
        },
	      {
          type: 'covenant',
          start: '2019-11-28',
          end: '2019-12-05',
          title: 'Ravi',
          subtitle: 'Rate Up',
          c: ['c1019'],
          a: []
        },
	      {
          type: 'covenant',
          start: '2019-12-05',
          end: '2019-12-19',
          title: 'Elena',
          subtitle: 'Rate Up',
          c: ['c1091'],
          a: ['Stella Harpa']
        },
	      {
          type: 'covenant',
          start: '2019-12-12',
          end: '2019-12-19',
          title: 'Violet',
          subtitle: 'Rate Up',
          c: ['c1074'],
          a: ['Violet Talisman']
        },
	      {
          type: 'covenant',
          start: '2019-12-19',
          end: '2019-12-26',
          title: 'Iseria',
          subtitle: 'Rate Up',
          c: ['c1024'],
          a: ['Song of Stars']
        },
	      {
          type: 'mystic',
          start: '2019-12-26',
          end: '2020-01-23',
          title: 'Mystic',
          subtitle: '11th Rotation',
          c: ['c2002','c1043'],
          a: []
        },
	      {
          type: 'limited',
          start: '2019-12-24',
          end: '2020-01-02',
          title: 'Diene',
          subtitle: 'Limited',
          c: ['c1076'],
          a: []
        },
	      {
          type: 'covenant',
          start: '2019-12-26',
          end: '2020-01-02',
          title: 'Krau',
          subtitle: 'Rate Up',
          c: ['c1070'],
          a: ['Noble Oath']
        },
	      {
          type: 'covenant',
          start: '2020-01-02',
          end: '2020-01-16',
          title: 'Alencia',
          subtitle: 'Rate Up',
          c: ['c1100'],
          a: ['Alencinox\'s Wrath']
        },
	      {
          type: 'covenant',
          start: '2020-01-09',
          end: '2020-01-16',
          title: 'Charles',
          subtitle: 'Rate Up',
          c: ['c1027'],
          a: ['Justice for All']
        },
	      {
          type: 'covenant',
          start: '2020-01-16',
          end: '2020-01-23',
          title: 'Yufine',
          subtitle: 'Rate Up',
          c: ['c1016'],
          a: ['Merciless Glutton']
        },
	      {
          type: 'covenant',
          start: '2020-01-23',
          end: '2020-01-30',
          title: 'Bellona',
          subtitle: 'Rate Up',
          c: ['c1071'],
          a: ['Iron Fan']
        },
	      {
          type: 'mystic',
          start: '2020-01-23',
          end: '2020-02-20',
          title: 'Mystic',
          subtitle: '12th Rotation',
          c: ['c2042','c2011'],
          a: []
        },
	      {
          type: 'covenant',
          start: '2020-01-30',
          end: '2020-02-13',
          title: 'Pavel',
          subtitle: 'Rate Up',
          c: ['c1080'],
          a: ['Dux Noctis']
        },
	      {
          type: 'covenant',
          start: '2020-02-06',
          end: '2020-02-13',
          title: 'Cermia',
          subtitle: 'Rate Up',
          c: ['c1079'],
          a: ['Border Coin']
        },
	      {
          type: 'covenant',
          start: '2020-02-13',
          end: '2020-02-20',
          title: 'Basar',
          subtitle: 'Rate Up',
          c: ['c1053'],
          a: ['Abyssal Crown']
        },
	      {
          type: 'covenant',
          start: '2020-02-20',
          end: '2020-02-27',
          title: 'Lidica',
          subtitle: 'Rate Up',
          c: ['c1046'],
          a: ['Sword of Judgment']
        },
	      {
          type: 'covenant',
          start: '2020-02-20',
          end: '2020-02-27',
          title: 'Lilibet',
          subtitle: 'Rate Up',
          c: ['c1095'],
          a: ['Creation & Destruction']
        },
	      {
          type: 'mystic',
          start: '2020-02-20',
          end: '2020-03-29',
          title: 'Mystic',
          subtitle: '13th Rotation',
          c: ['c2047','c2065'],
          a: []
        },
	      {
          type: 'limited',
          start: '2020-02-27',
          end: '2020-03-12',
          title: 'Cerise',
          subtitle: 'Limited',
          c: ['c1081'],
          a: ['Guiding Light']
        },
	      {
          type: 'covenant',
          start: '2020-03-05',
          end: '2020-03-12',
          title: 'Charlotte',
          subtitle: 'Rate Up',
          c: ['c1009'],
          a: ['Holy Sacrifice']
        },
	      {
          type: 'covenant',
          start: '2020-03-12',
          end: '2020-03-26',
          title: 'Kawerik',
          subtitle: 'Rate Up',
          c: ['c1073'],
          a: ['Black Hand of the Goddess']
        },
	      {
          type: 'covenant',
          start: '2020-03-19',
          end: '2020-03-26',
          title: 'Tenebria',
          subtitle: 'Rate Up',
          c: ['c1050'],
          a: ['Time Matter']
        },
	      {
          type: 'covenant',
          start: '2020-03-19',
          end: '2020-03-26',
          title: 'Vivian',
          subtitle: 'Rate Up',
          c: ['c1088'],
          a: ['Dingus Orb']
        },
	      {
          type: 'mystic',
          start: '2020-03-29',
          end: '2020-04-16',
          title: 'Mystic',
          subtitle: '14th Rotation',
          c: ['c2009','c2031'],
          a: []
        },
	      {
          type: 'covenant',
          start: '2020-03-26',
          end: '2020-04-02',
          title: 'Iseria',
          subtitle: 'Rate Up',
          c: ['c1024'],
          a: ['Song of Stars']
        },
	      {
          type: 'covenant',
          start: '2020-03-26',
          end: '2020-04-02',
          title: 'Iseria',
          subtitle: 'Rate Up',
          c: ['c1089'],
          a: ['Bastion of Perlutia']
        },
	      {
          type: 'covenant',
          start: '2020-04-02',
          end: '2020-04-09',
          title: 'Kise',
          subtitle: 'Rate Up',
          c: ['c1006'],
          a: ['Alabastron']
        },
	      {
          type: 'covenant',
          start: '2020-04-09',
          end: '2020-04-23',
          title: 'Roana',
          subtitle: 'Rate Up',
          c: ['c1102'],
          a: ['Touch of Rekos']
        },
	      {
          type: 'covenant',
          start: '2020-04-16',
          end: '2020-04-23',
          title: 'Kayron',
          subtitle: 'Rate Up',
          c: ['c1023'],
          a: ['Alexa\'s Basket']
        },
	      {
          type: 'covenant',
          start: '2020-04-16',
          end: '2020-04-23',
          title: 'Krau',
          subtitle: 'Rate Up',
          c: ['c1070'],
          a: ['Holy Sacrifice']
        },
	      {
          type: 'mystic',
          start: '2020-04-16',
          end: '2020-05-14',
          title: 'Mystic',
          subtitle: '15th Rotation',
          c: ['c2050','c2062'],
          a: []
        },
	      {
          type: 'covenant',
          start: '2020-04-23',
          end: '2020-04-30',
          title: 'Luluca',
          subtitle: 'Rate Up',
          c: ['c1070'],
          a: ['Spirit\'s Breath']
        },
	      {
          type: 'covenant',
          start: '2020-04-23',
          end: '2020-04-30',
          title: 'Melissa',
          subtitle: 'Rate Up',
          c: ['c1096'],
          a: ['Bloody Rose']
        },
	      {
          type: 'covenant',
          start: '2020-04-30',
          end: '2020-05-07',
          title: 'Destina',
          subtitle: 'Rate Up',
          c: ['c1096'],
          a: ['Shimandra Staff']
        },
	      {
          type: 'limited',
          start: '2020-04-30',
          end: '2020-05-14',
          title: 'Baiken',
          subtitle: 'Limited',
          c: ['c1093'],
          a: ['Torn Sleeve']
        },
	      {
          type: 'limited',
          start: '2020-05-07',
          end: '2020-05-21',
          title: 'Dizzy',
          subtitle: 'Limited',
          c: ['c1094'],
          a: ['Necro & Undine']
        },
	      {
          type: 'limited',
          start: '2020-05-14',
          end: '2020-05-21',
          title: 'Elphelt',
          subtitle: 'Limited',
          c: ['c1105'],
          a: ['Ms. Confille']
        },
        {
          type: 'mystic',
          start: '2020-05-14',
          end: '2020-06-11',
          title: 'Mystic',
          subtitle: '16th Rotation',
          c: ['c2039','c2003'],
          a: []
        },
	      {
          type: 'covenant',
          start: '2020-05-21',
          end: '2020-06-04',
          title: 'Ray',
          subtitle: 'Rate Up',
          c: ['c1090'],
          a: ['Doctor\'s Bag']
        },
	      {
          type: 'covenant',
          start: '2020-05-28',
          end: '2020-06-04',
          title: 'Elena',
          subtitle: 'Rate Up',
          c: ['c1091'],
          a: ['Stella Harpa']
        },
	      {
          type: 'covenant',
          start: '2020-05-28',
          end: '2020-06-04',
          title: 'Ludwig',
          subtitle: 'Rate Up',
          c: ['c1069'],
          a: ['Time Matter']
        },
	      {
          type: 'covenant',
          start: '2020-06-04',
          end: '2020-06-11',
          title: 'Sigret',
          subtitle: 'Rate Up',
          c: ['c1072'],
          a: ['Cradle of Life']
        },
	      {
          type: 'covenant',
          start: '2020-06-04',
          end: '2020-06-11',
          title: 'Vildred',
          subtitle: 'Rate Up',
          c: ['c1007'],
          a: ['Wind Rider']
        },
        {
          type: 'mystic',
          start: '2020-06-11',
          end: '2020-06-25',
          title: 'Mystic',
          subtitle: '17th Rotation',
          c: ['c1022','c2035'],
          a: []
        },
	      {
          type: 'covenant',
          start: '2020-06-11',
          end: '2020-06-18',
          title: 'Tamarinne',
          subtitle: 'Rate Up',
          c: ['c1067'],
          a: ['Idol\'s Cheer']
        },
	      {
          type: 'covenant',
          start: '2020-06-18',
          end: '2020-07-02',
          title: 'Celine',
          subtitle: 'Rate Up',
          c: ['c1103'],
          a: ['Secret Art - Storm Sword']
        },
	      {
          type: 'limited',
          start: '2020-06-25',
          end: '2020-07-09',
          title: 'Seaside Bellona',
          subtitle: 'Limited',
          c: ['c5071'],
          a: ['Reingar\'s Special Drink']
        },
        {
          type: 'mystic',
          start: '2020-06-25',
          end: '2020-07-16',
          title: 'Mystic',
          subtitle: '18th Rotation',
          c: ['c2074','c2008'],
          a: []
        },
	      {
          type: 'covenant',
          start: '2020-06-25',
          end: '2020-07-02',
          title: 'Lilibet',
          subtitle: 'Rate Up',
          c: ['c1095'],
          a: ['Creation & Destruction']
        },
	      {
          type: 'covenant',
          start: '2020-07-02',
          end: '2020-07-09',
          title: 'Lilias',
          subtitle: 'Rate Up',
          c: ['c1089'],
          a: ['Bastion of Perlutia']
        },
	      {
          type: 'covenant',
          start: '2020-07-02',
          end: '2020-07-09',
          title: 'Haste',
          subtitle: 'Rate Up',
          c: ['c1039'],
          a: ['Rhianna & Luciella']
        },
	      {
          type: 'covenant',
          start: '2020-07-09',
          end: '2020-07-19',
          title: 'Aramintha',
          subtitle: 'Rate Up',
          c: ['c1048'],
          a: ['Rhianna & Luciella']
        },
	      {
          type: 'covenant',
          start: '2020-07-09',
          end: '2020-07-19',
          title: 'Ravi',
          subtitle: 'Rate Up',
          c: ['c1019'],
          a: ['Durandal']
        },
        {
          type: 'mystic',
          start: '2020-07-16',
          end: '2020-08-06',
          title: 'Mystic',
          subtitle: '19th Rotation',
          c: ['c2007','c2020'],
          a: []
        },
	      {
          type: 'covenant',
          start: '2020-07-16',
          end: '2020-07-30',
          title: 'Mui',
          subtitle: 'Rate Up',
          c: ['c1044'],
          a: ['Circus Fantasia']
        },
	      {
          type: 'covenant',
          start: '2020-07-23',
          end: '2020-07-30',
          title: 'Bellona',
          subtitle: 'Rate Up',
          c: ['c1071'],
          a: ['Iron Fan']
        },
	      {
          type: 'covenant',
          start: '2020-07-23',
          end: '2020-07-30',
          title: 'Violet',
          subtitle: 'Rate Up',
          c: ['c1074'],
          a: ['Violet Talisman']
        },
	      {
          type: 'limited',
          start: '2020-07-30',
          end: '2020-08-13',
          title: 'Holiday Yufine',
          subtitle: 'Limited',
          c: ['c5016'],
          a: ['Champion\'s Trophy']
        },
	      {
          type: 'covenant',
          start: '2020-08-06',
          end: '2020-08-13',
          title: 'Cermia',
          subtitle: 'Rate Up',
          c: ['c1079'],
          a: ['Border Coin']
        },
        {
          type: 'mystic',
          start: '2020-08-06',
          end: '2020-08-27',
          title: 'Mystic',
          subtitle: '20th Rotation',
          c: ['c2024','c2032'],
          a: []
        },
	      {
          type: 'covenant',
          start: '2020-08-13',
          end: '2020-08-20',
          title: 'Cecilia',
          subtitle: 'Rate Up',
          c: ['c1002'],
          a: ['Rise of a Monarch']
        },
	      {
          type: 'covenant',
          start: '2020-08-13',
          end: '2020-08-20',
          title: 'Kise',
          subtitle: 'Rate Up',
          c: ['c1006'],
          a: ['Alabastron']
        },
	      {
          type: 'covenant',
          start: '2020-08-20',
          end: '2020-08-27',
          title: 'Lidica',
          subtitle: 'Rate Up',
          c: ['c1046'],
          a: ['Sword of Judgment']
        },
	      {
          type: 'covenant',
          start: '2020-08-20',
          end: '2020-08-27',
          title: 'Tywin',
          subtitle: 'Rate Up',
          c: ['c1042'],
          a: ['Crown of Glory']
        },
	      {
          type: 'covenant',
          start: '2020-08-27',
          end: '2020-09-10',
          title: 'Choux',
          subtitle: 'Rate Up',
          c: ['c1101'],
          a: ['Snow Crystal']
        },
        {
          type: 'mystic',
          start: '2020-08-27',
          end: '2020-09-17',
          title: 'Mystic',
          subtitle: '21st Rotation',
          c: ['c2012','c2037'],
          a: []
        },
      	{
          type: 'covenant',
          start: '2020-09-03',
          end: '2020-09-10',
          title: 'Vivian',
          subtitle: 'Rate Up',
          c: ['c1088'],
          a: ['Dingus Orb']
        },
	      {
          type: 'covenant',
          start: '2020-09-03',
          end: '2020-09-10',
          title: 'Kawerik',
          subtitle: 'Rate Up',
          c: ['c1073'],
          a: ['Black Hand of th Goddess']
        },
	      {
          type: 'covenant',
          start: '2020-09-10',
          end: '2020-09-17',
          title: 'Chloe',
          subtitle: 'Rate Up',
          c: ['c1073'],
          a: ['A Littls Queen\'s Huge Crown']
        },
	      {
          type: 'covenant',
          start: '2020-09-10',
          end: '2020-09-17',
          title: 'Kayron',
          subtitle: 'Rate Up',
          c: ['c1023'],
          a: ['Sepherd of the Hollow']
        },
	      {
          type: 'covenant',
          start: '2020-09-17',
          end: '2020-09-24',
          title: 'Sez',
          subtitle: 'Rate Up',
          c: ['c1038'],
          a: ['Manica of Control']
        },
	      {
          type: 'covenant',
          start: '2020-09-17',
          end: '2020-09-24',
          title: 'Ludwig',
          subtitle: 'Rate Up',
          c: ['c1069'],
          a: ['Time Matter']
        },
        {
          type: 'mystic',
          start: '2020-09-17',
          end: '2020-10-08',
          title: 'Mystic',
          subtitle: '22nd Rotation',
          c: ['c2070','c2005'],
          a: []
        },
	      {
          type: 'limited',
          start: '2020-09-24',
          end: '2020-10-08',
          title: 'Landy',
          subtitle: 'Limited',
          c: ['c1109'],
          a: ['Wall of Order']
        },
      	{
          type: 'covenant',
          start: '2020-10-01',
          end: '2020-10-08',
          title: 'Tenebria',
          subtitle: 'Rate Up',
          c: ['c1050'],
          a: ['Crimson Moon of Nightmares']
        },
	      {
          type: 'covenant',
          start: '2020-10-01',
          end: '2020-10-08',
          title: 'Ken',
          subtitle: 'Rate Up',
          c: ['c1047'],
          a: ['Samsara Prayer Beads']
        },
	      {
          type: 'covenant',
          start: '2020-10-08',
          end: '2020-10-15',
          title: 'Baal &  Sezan',
          subtitle: 'Rate Up',
          c: ['c1015'],
          a: ['Last Teatime']
        },
	      {
          type: 'covenant',
          start: '2020-10-08',
          end: '2020-10-15',
          title: 'Yufine',
          subtitle: 'Rate Up',
          c: ['c1016'],
          a: ['Merciless Glutton']
        },
        {
          type: 'mystic',
          start: '2020-10-08',
          end: '2020-10-29',
          title: 'Mystic',
          subtitle: '23rd Rotation',
          c: ['c2046','c2033'],
          a: []
        },
	      {
          type: 'covenant',
          start: '2020-10-15',
          end: '2020-10-22',
          title: 'Krau',
          subtitle: 'Rate Up',
          c: ['c1070'],
          a: ['Holy Sacrifice']
        },
	      {
          type: 'covenant',
          start: '2020-10-15',
          end: '2020-10-29',
          title: 'Ervalen',
          subtitle: 'Rate Up',
          c: ['c1108'],
          a: ['Double-Edged Decrescent']
        },
	      {
          type: 'covenant',
          start: '2020-10-22',
          end: '2020-10-29',
          title: 'Charles',
          subtitle: 'Rate Up',
          c: ['c1027'],
          a: ['Justice for All']
        },
	      {
          type: 'covenant',
          start: '2020-10-22',
          end: '2020-10-29',
          title: 'Roana',
          subtitle: 'Rate Up',
          c: ['c1102'],
          a: ['Touch of Rekos']
        },
	      {
          type: 'limited',
          start: '2020-10-29',
          end: '2020-11-12',
          title: 'Luna',
          subtitle: 'Limited',
          c: ['c1066'],
          a: ['Draco Plate']
        },
	      {
          type: 'covenant',
          start: '2020-10-29',
          end: '2020-11-05',
          title: 'Haste',
          subtitle: 'Rate Up',
          c: ['c1039'],
          a: ['Rihanna & Luciella']
        },
        {
          type: 'mystic',
          start: '2020-10-29',
          end: '2020-11-19',
          title: 'Mystic',
          subtitle: '24th Rotation',
          c: ['c2082','c2014'],
          a: []
        },
	      {
          type: 'covenant',
          start: '2020-11-05',
          end: '2020-11-12',
          title: 'Melissa',
          subtitle: 'Rate Up',
          c: ['c1096'],
          a: ['Bloody Rose']
        },
	      {
          type: 'covenant',
          start: '2020-11-05',
          end: '2020-11-12',
          title: 'Tamarinne',
          subtitle: 'Rate Up',
          c: ['c1067'],
          a: ['Idol\'s Cheer']
        },
        {
          type: 'covenant',
          start: '2020-11-12',
          end: '2020-11-19',
          title: 'Pavel',
          subtitle: 'Rate Up',
          c: ['c1080'],
          a: ['Dux Noctis']
        },
	      {
          type: 'covenant',
          start: '2020-11-12',
          end: '2020-11-19',
          title: 'Vildred',
          subtitle: 'Rate Up',
          c: ['c1007'],
          a: ['Sword of Summer Twilight'] // new
        },
	      {
          type: 'covenant',
          start: '2020-11-19',
          end: '2020-12-03',
          title: 'Flan',
          subtitle: 'Rate Up',
          c: ['c1110'], // new
          a: ['Unseen Observer'] // new
        },
        {
          type: 'mystic',
          start: '2020-11-19',
          end: '2020-12-10',
          title: 'Mystic',
          subtitle: '25th Rotation',
          c: ['c2049','c2013'],
          a: []
        },
	      {
          type: 'covenant',
          start: '2020-11-26',
          end: '2020-12-03',
          title: 'Bellona',
          subtitle: 'Rate Up',
          c: ['c1071'],
          a: ['Iron Fan']
        },
	      {
          type: 'covenant',
          start: '2020-11-26',
          end: '2020-12-03',
          title: 'Charlotte',
          subtitle: 'Rate Up',
          c: ['c1009'],
          a: ['Noble Oath']
        },
        {
          type: 'covenant',
          start: '2020-12-03',
          end: '2020-12-10',
          title: 'Basar',
          subtitle: 'Rate Up',
          c: ['c1053'],
          a: ['Abyssal Crown']
        },
	      {
          type: 'covenant',
          start: '2020-12-03',
          end: '2020-12-10',
          title: 'Lidica',
          subtitle: 'Rate Up',
          c: ['c1046'],
          a: ['Sword of Judgment']
        },
	      {
          type: 'covenant',
          start: '2020-12-10',
          end: '2020-12-17',
          title: 'Ravi',
          subtitle: 'Rate Up',
          c: ['c1019'],
          a: ['Sigurd Scythe']
        },
	      {
          type: 'covenant',
          start: '2020-12-10',
          end: '2020-12-17',
          title: 'Lilias',
          subtitle: 'Rate Up',
          c: ['c1089'],
          a: ['Bastion of Perlutia']
        },
        {
          type: 'mystic',
          start: '2020-12-10',
          end: '2020-12-31',
          title: 'Mystic',
          subtitle: '26th Rotation',
          c: ['c2072' /*new*/,'c2021'],
          a: []
        },
	      {
          type: 'covenant',
          start: '2020-12-17',
          end: '2020-12-24',
          title: 'Elena',
          subtitle: 'Rate Up',
          c: ['c1091'],
          a: ['Stella Harpa']
        },
	      {
          type: 'covenant',
          start: '2020-12-17',
          end: '2020-12-31',
          title: 'Mort',
          subtitle: 'Rate Up',
          c: ['c1104'], // new
          a: ['Ancient Dragon\'s Legacy'] //new
        },
	      {
          type: 'limited',
          start: '2020-12-24',
          end: '2021-01-07',
          title: 'Fairytale Tenebria',
          subtitle: 'Limited',
          c: ['c5050'], // new
          a: ['Fairy Tale for a Nightmare'] //new
        },
	      {
          type: 'covenant',
          start: '2020-12-31',
          end: '2021-01-07',
          title: 'Sigret',
          subtitle: 'Rate Up',
          c: ['c1072'],
          a: ['Cradle of Life']
        },
	      {
          type: 'covenant',
          start: '2020-12-31',
          end: '2021-01-07',
          title: 'Lilibet',
          subtitle: 'Rate Up',
          c: ['c1095'],
          a: ['Creation & Destruction']
        },
        {
          type: 'mystic',
          start: '2020-12-31',
          end: '2021-01-21',
          title: 'Mystic',
          subtitle: '27th Rotation',
          c: ['c2048','c2028'],
          a: []
        },
	      {
          type: 'covenant',
          start: '2021-01-07',
          end: '2021-01-14',
          title: 'Cermia',
          subtitle: 'Rate Up',
          c: ['c1079'],
          a: ['Border Coin']
        },
	      {
          type: 'covenant',
          start: '2021-01-07',
          end: '2021-01-14',
          title: 'Celine',
          subtitle: 'Rate Up',
          c: ['c1103'],
          a: ['Secret Art - Storm Sword']
        },
	      {
          type: 'covenant',
          start: '2021-01-14',
          end: '2021-01-21',
          title: 'Alencia',
          subtitle: 'Rate Up',
          c: ['c1100'],
          a: ['Alencinox\'s Wrath']
        },
	      {
          type: 'covenant',
          start: '2021-01-14',
          end: '2021-01-21',
          title: 'Vivian',
          subtitle: 'Rate Up',
          c: ['c1088'],
          a: ['Dingus Orb']
        },
	      {
          type: 'covenant',
          start: '2021-01-21',
          end: '2021-01-28',
          title: 'Cecilia',
          subtitle: 'Rate Up',
          c: ['c1002'],
          a: ['Rise of a Monarch']
        },
	      {
          type: 'covenant',
          start: '2021-01-21',
          end: '2021-01-28',
          title: 'Ludwig',
          subtitle: 'Rate Up',
          c: ['c1069'],
          a: ['Time Matter']
        },
        {
          type: 'mystic',
          start: '2021-01-21',
          end: '2021-02-11',
          title: 'Mystic',
          subtitle: '28th Rotation',
          c: ['c5004'/*new*/,'c2054'],
          a: []
        },
	      {
          type: 'covenant',
          start: '2021-01-28',
          end: '2021-02-11',
          title: 'Politis',
          subtitle: 'Rate Up',
          c: ['c1112'], //new
          a: ['Knowledge Seed'] //new
        },
	      {
          type: 'covenant',
          start: '2021-01-28',
          end: '2021-02-04',
          title: 'Tywin',
          subtitle: 'Rate Up',
          c: ['c1042'],
          a: ['Crown of Glory']
        },
	      {
          type: 'covenant',
          start: '2021-02-04',
          end: '2021-02-11',
          title: 'Luluca',
          subtitle: 'Rate Up',
          c: ['c1082'],
          a: ['Spirit\'s Breath']
        },
	      {
          type: 'covenant',
          start: '2021-02-11',
          end: '2021-02-18',
          title: 'Kise',
          subtitle: 'Rate Up',
          c: ['c1006'],
          a: ['Alabastron']
        },
	      {
          type: 'limited',
          start: '2021-02-11',
          end: '2021-02-25',
          title: 'Landy, Diene, Cerise',
          subtitle: 'Triple Banner',
          c: ['c1109','c1076','c1081'],
          a: ['Wall of Order','Guiding Light','Unfaiding Memories']
        },
        {
          type: 'mystic',
          start: '2021-02-11',
          end: '2021-03-04',
          title: 'Mystic',
          subtitle: '29th Rotation',
          c: ['c2002','c2010'],
          a: []
        },
	      {
          type: 'covenant',
          start: '2021-02-18',
          end: '2021-02-25',
          title: 'Tenebria',
          subtitle: 'Rate Up',
          c: ['c1050'],
          a: ['Crimson Moon of Nightmares']
        },
	      {
          type: 'covenant',
          start: '2021-02-25',
          end: '2021-03-04',
          title: 'Kayron',
          subtitle: 'Rate Up',
          c: ['c1023'],
          a: ['Alexa\'s Basket']
        },
	      {
          type: 'covenant',
          start: '2021-02-25',
          end: '2021-03-04',
          title: 'Pavel',
          subtitle: 'Rate Up',
          c: ['c1080'],
          a: ['Dux Noctis']
        },
	      {
          type: 'mystic',
          start: '2021-03-04',
          end: '2021-03-25',
          title: 'Mystic',
          subtitle: '30st Rotation',
          c: ['c2095' /*new*/,'c2029','c1108'],
          a: ['Bloody Rose']
        },
	      {
          type: 'covenant',
          start: '2021-03-04',
          end: '2021-03-11',
          title: 'Chloe',
          subtitle: 'Rate Up',
          c: ['c1080'],
          a: ['A Little Queen\'s Huge Crown']
        },
	      {
          type: 'covenant',
          start: '2021-03-04',
          end: '2021-03-11',
          title: 'Ray',
          subtitle: 'Rate Up',
          c: ['c1090'],
          a: ['Doctor\'s Bag']
        },
	      {
          type: 'covenant',
          start: '2021-03-11',
          end: '2021-03-18',
          title: 'Violet',
          subtitle: 'Rate Up',
          c: ['c1074'],
          a: ['Violet Talisman']
        },
	      {
          type: 'covenant',
          start: '2021-03-11',
          end: '2021-03-25',
          title: 'Eda',
          subtitle: 'Rate Up',
          c: ['c1111'],//new
          a: ['Twilight Calamity']//new
        },
	      {
          type: 'covenant',
          start: '2021-03-18',
          end: '2021-03-25',
          title: 'Charles',
          subtitle: 'Rate Up',
          c: ['c1027'],
          a: ['Justice for All']
        },
	      {
          type: 'mystic',
          start: '2021-03-25',
          end: '2021-04-15',
          title: 'Mystic',
          subtitle: '31st Rotation',
          c: ['c2053','c2086' /*new*/],
          a: []
        },
	      {
          type: 'covenant',
          start: '2021-03-25',
          end: '2021-04-01',
          title: 'Vivian',
          subtitle: 'Rate Up',
          c: ['c1088'],
          a: ['Dingus Orb']
        },
	      {
          type: 'covenant',
          start: '2021-03-25',
          end: '2021-04-01',
          title: 'Tamarinne',
          subtitle: 'Rate Up',
          c: ['c1067'],
          a: ['Idol\'s cheer']
        },
	      {
          type: 'limited',
          start: '2021-03-31',
          end: '2021-04-15',
          title: 'Baiken, Dizzy, Elphelt',
          subtitle: 'Group Rate Up',
          c: ['c1093','c1094','c1105'],
          a: ['Torn Sleeve','Necro & Undine','Ms. Confille']
        },
	      {
          type: 'covenant',
          start: '2021-04-08',
          end: '2021-04-22',
          title: 'Bomb Model Kanna',
          subtitle: 'Rate Up',
          c: ['c1097'], //new /* Missing Avatar */
          a: ['Air-to-Surface Missile: MISHA'] //new
        },
	      {
          type: 'mystic',
          start: '2021-04-15',
          end: '2021-05-06',
          title: 'Mystic',
          subtitle: '32nd Rotation',
          c: ['c2111'/*new*/,'c2036','c1110','c1073'],
          a: ['Elbris Ritual Sword','Bloodstone']
        },
	      {
          type: 'covenant',
          start: '2021-04-15',
          end: '2021-04-22',
          title: 'Elena',
          subtitle: 'Rate Up',
          c: ['c1091'],
          a: ['Stella Harpa']
        },
	      {
          type: 'covenant',
          start: '2021-04-22',
          end: '2021-04-29',
          title: 'Roana',
          subtitle: 'Rate Up',
          c: ['c1102'],
          a: ['Touch of Rekos']
        },
	      {
          type: 'covenant',
          start: '2021-04-22',
          end: '2021-04-29',
          title: 'Yufine',
          subtitle: 'Rate Up',
          c: ['c1016'],
          a: ['Merciless Glutton']
        },
	      {
          type: 'covenant',
          start: '2021-04-29',
          end: '2021-05-06',
          title: 'Lilias',
          subtitle: 'Rate Up',
          c: ['c1089'],
          a: ['Bastion of Perlutia']
        },
	      {
          type: 'covenant',
          start: '2021-04-29',
          end: '2021-05-06',
          title: 'Vildred',
          subtitle: 'Rate Up',
          c: ['c1007'],
          a: ['Sword of Summer Twilight']
        },
	      {
          type: 'mystic',
          start: '2021-05-06',
          end: '2021-05-27',
          title: 'Mystic',
          subtitle: '33rd Rotation',
          c: ['c2009','c2004','c1019','c1070'],
          a: ['Wind Rider','Song of Stars']
        },
	      {
          type: 'covenant',
          start: '2021-05-06',
          end: '2021-05-20',
          title: 'Senya',
          subtitle: 'Rate Up',
          c: ['c1106'],
          a: ['Spear of a New Dawn']
        },
	      {
          type: 'covenant',
          start: '2021-05-06',
          end: '2021-05-13',
          title: 'Ervalen',
          subtitle: 'Rate Up',
          c: ['c1108'],
          a: ['Double-Edged Decrescent']
        },
	      {
          type: 'covenant',
          start: '2021-05-13',
          end: '2021-05-20',
          title: 'Kawerik',
          subtitle: 'Rate Up',
          c: ['c1073'],
          a: ['Black Hand of the Goddess']
        },
	      {
          type: 'covenant',
          start: '2021-05-20',
          end: '2021-05-27',
          title: 'Choux',
          subtitle: 'Rate Up',
          c: ['c1101'],
          a: ['Snow Crystal']
        },
	      {
          type: 'covenant',
          start: '2021-05-20',
          end: '2021-05-27',
          title: 'Sigret',
          subtitle: 'Rate Up',
          c: ['c1072'],
          a: ['Cradle of Life']
        },
	      {
          type: 'mystic',
          start: '2021-05-27',
          end: '2021-06-17',
          title: 'Mystic',
          subtitle: '34th Rotation',
          c: ['c2073'/*new*/,'c2017'],
          a: []
        },
	      {
          type: 'covenant',
          start: '2021-05-27',
          end: '2021-06-03',
          title: 'Celine',
          subtitle: 'Rate Up',
          c: ['c1103'],
          a: ['Secret Art – Storm Sword']
        },
	      {
          type: 'covenant',
          start: '2021-05-27',
          end: '2021-06-03',
          title: 'Flan',
          subtitle: 'Rate Up',
          c: ['c1110'],
          a: ['Unseen Observer']
        },
	      {
          type: 'covenant',
          start: '2021-06-03',
          end: '2021-06-10',
          title: 'Mort',
          subtitle: 'Rate Up',
          c: ['c1104'],
          a: ['Ancient Dragon\'s Legacy']
        },
	      {
          type: 'covenant',
          start: '2021-06-03',
          end: '2021-06-17',
          title: 'Ilynav',
          subtitle: 'Rate Up',
          c: ['c1113'],
          a: ['Wings of Light and Shadow']
        },
	      {
          type: 'covenant',
          start: '2021-06-10',
          end: '2021-06-17',
          title: 'Kayron',
          subtitle: 'Rate Up',
          c: ['c1023'],
          a: ['Shepherd of the Hollow']
        },
	      {
          type: 'mystic',
          start: '2021-06-17',
          end: '2021-07-08',
          title: 'Mystic',
          subtitle: '35th Rotation',
          c: ['c1022','c2085' /*new*/,'c1071'],
          a: ['Merciless Glutton']
        },
	      {
          type: 'covenant',
          start: '2021-06-17',
          end: '2021-06-24',
          title: 'Iseria',
          subtitle: 'Rate Up',
          c: ['c1024'],
          a: ['Song of Stars']
        },
	      {
          type: 'covenant',
          start: '2021-06-17',
          end: '2021-06-24',
          title: 'Melissa',
          subtitle: 'Rate Up',
          c: ['c1096'],
          a: ['Bloody Rose']
        },
	      {
          type: 'covenant',
          start: '2021-06-24',
          end: '2021-07-01',
          title: 'Ravi',
          subtitle: 'Rate Up',
          c: ['c1019'],
          a: ['Sigurd Scythe']
        },
	      {
          type: 'covenant',
          start: '2021-06-24',
          end: '2021-07-01',
          title: 'Krau',
          subtitle: 'Rate Up',
          c: ['c1070'],
          a: ['Holy Sacrifice']
        },
	      {
          type: 'limited',
          start: '2021-07-01',
          end: '2021-07-15',
          title: 'Seaside Bellona',
          subtitle: 'Limited',
          c: ['c5071'],
          a: ['Reingar\'s Special Drink']
        },
	      {
          type: 'covenant',
          start: '2021-07-01',
          end: '2021-07-08',
          title: 'Sez',
          subtitle: 'Rate Up',
          c: ['c1038'],
          a: ['Manica of Control']
        },
	      {
          type: 'mystic',
          start: '2021-07-08',
          end: '2021-07-29',
          title: 'Mystic',
          subtitle: '36th Rotation',
          c: ['c1034','c2043'],
          a: []
        },
	      {
          type: 'covenant',
          start: '2021-07-08',
          end: '2021-07-15',
          title: 'Lidica',
          subtitle: 'Rate Up',
          c: ['c1046'],
          a: ['Sword of Judgment']
        },
	      {
          type: 'limited',
          start: '2021-07-22',
          end: '2021-08-05',
          title: 'Holiday Yufine',
          subtitle: 'Limited',
          c: ['c5016'],
          a: ['Champion\'s Trophy']
        },
        
        /* rta seasons */
        {
          type: 'event',
          start: '2020-04-16',
          ref: '2020-07-09',
          name: 'RTA Season 1 Start',
          alt:  'RTA Showdown - START -'
        },
        {
          type: 'event',
          start: '2020-07-09',
          ref: '2020-04-16',
          name: 'RTA Season 1 End',
          alt: "RTA Showdown - END -"
        },
        {
          type: 'event',
          start: '2020-09-04',
          ref: '2020-11-26',
          name: 'RTA Season 2 Start',
          alt: 'RTA Endeavor - START -'
        },
        {
          type: 'event',
          start: '2020-11-26',
          ref: '2020-09-04',
          name: 'RTA Season 2 End',
          alt: 'RTA Endeavor - START -'
        },
        {
          type: 'event',
          start: '2020-12-25',
          ref: '2021-03-18',
          name: 'RTA Season 3 Start',
          alt: 'RTA Ardor - START -'
        },
        {
          type: 'event',
          start: '2021-03-18',
          ref: '2020-12-25',
          name: 'RTA Season 3 End',
          alt: 'RTA Ardor - END -'
        },
        {
          type: 'event',
          start: '2021-04-16',
          ref: '2021-07-08',
          name: 'RTA Season 4 Start',
          alt: 'RTA Skyward - START -'
        },
        {
          type: 'event',
          start: '2021-07-08',
          ref: '2021-04-16',
          name: 'RTA Season 4 End',
          alt: 'RTA Skyward - END -'
        },
        
        /* Other events*/
        {
          type: 'event',
          start: '2018-11-11',
          name: 'Global release!',
          alt: 'Global server open'
        }
      ]
    }
  },
  methods: {
    saveUserData: function () {
      localStorage.setItem('CeciTimeline', JSON.stringify({VERSION: this.VERSION, settings: this.settings, userPulls: this.userPulls}));
    },
    loadUserData: function () {
      let l = JSON.parse(localStorage.getItem('CeciTimeline')||'{}');
      this.settings=l.settings || {dev:false, showEvents: true, hideUserPull: true};
      this.userPulls=l.userPulls || {};
      return l;
    },
    checkNewBanner: function (b) {
      if (!b.type) {console.log('No banner type  specified'); return false;}
      if (!b.end || !b.end) {console.log('Dates are missing!'); return false};
      if (b.end.length !== 10 || b.start.length !== 10 || b.end.split('-').length!==3 || b.start.split('-').length!==3) {console.log('Dates format is wrong!\nUse YYYY-MM-DD\nExample: 2021-01-01'); return false};
      if (!b.c || b.c.length<1) {console.log('Banner Character is missing'); return false};
      if (!b.type) {console.log('No banner type  specified'); return false;}
      if (!b.title || !b.subtitle) {console.log('No title or subtitle specified!'); return false;}
      if (!b.a) b.a = [];
      return true;
    },
    createNewBanner: function (b) {
      if (!this.checkNewBanner(b)) return;
      this.banners.push(b);
    },
    bannerId: function (b)  {
      return (b.type.slice(0,1)+b.start.replace(/-/g,'')+b.c[0].slice(-4)).toUpperCase();
    },
    userBannerData: function (b) {
      return this.userPulls[this.bannerId(b)] || {};
    },
    getDatesArray: function () {
      var s=[];
      for (var i=0;i<this.banners.length;i++) {
        if (!this.filterBanner(this.banners[i])) continue;
        if (this.banners[i].start && !s.includes(this.banners[i].start)) s.push(this.banners[i].start);
        if (this.banners[i].end && !s.includes(this.banners[i].end)) s.push(this.banners[i].end);
      };
      s.sort((a,b) => {
        return a>b?1:a===b?0:-1;
      });
      this.sortedDates=s;
    },
    displayDate: function (date,event) {
      //@param date must be string
      var d=date.split(/-/g);
      var day=d[2], month=['January','February','March','April','May','June','July','August','September','October','November','December'][Number(d[1])-1], year=d[0];
      return Number(day) + ' ' + month.slice(0,3) + ' ' + year + (event?' - ' + event:'');
    },
    dateDiff: function (a,b) {
      if (!a||!b) return 1;
      return (new Date(b).getTime()-new Date(a).getTime())/(1000 * 3600 * 24);
    },
    dateIndexDiff: function (index,date) {
      if (isNaN(index)) index=Object.keys(this.renderList).indexOf(index)||0;
      return (Object.keys(this.renderList).indexOf(date)||1)-index;
    },
    bannerLength: function (a,b) {
      return this.daySize*this.dateDiff(a,b)+10*(this.dateIndexDiff(b,a))-10;
    },
    filterBanner: function (b) {
      let f = this.filter;
      if (!f.showEvents && b.type==='event') return false;
      if (f.date&&(f.date!=b.start && f.date!=b.end)) return false;
      if (f.character && b.type!='event' && !b.c.includes(f.character)) return false;
      if (f.type && f.type!=b.type) return false;
      if (f.year && b.type!='event' && !(b.start.slice(0,4)==f.year || b.end.slice(0,4)==f.year)) return false;
      return true;
    },
    openThisBanner: function (e) {
      if (this.settings.dev) {
        document.body.classList.add("modal-open");
        this.devMenu = ['editBanner',e];
        return;
      }
      return;
      this.bannerOpen = e;
      document.body.classList.add("modal-open");
    },
    devSaveBanner: function (e) {
      var input = document.getElementById('devModal').getElementsByTagName('input');
      var b=this.devMenu[1]||{};
      var tmp = {type: input[0].value, start: input[1].value, end: input[2].value, title: input[3].value, subtitle: input[4].value, c: input[5].value.split(','), a: input[6].value.split(',')};
      console.log(tmp);
      if (this.checkNewBanner(tmp)) {
        if (this.devMenu[0]==='editBanner') this.devMenu[1] = tmp;
        else this.banners.push(tmp);
        this.devMenu=false;
        this.closeBanner(e);
      };
    },
    saveBannerEdit: function (e,banner) {
      var tmp={};
      tmp.pulls=this.$refs.pulls.value;
      tmp.pity=this.$refs.pity.value;
      banner.c.forEach( (x,i) => tmp[x] = this.$refs.cinput[i].value);
      this.userPulls[this.bannerId(banner)] = tmp;
      this.saveUserData();
      this.closeBanner(e);
    },
    closeBanner: function (e,banner) {
      e.preventDefault();
      this.bannerOpen = false;
      document.body.classList.remove("modal-open");
    },
    getGeneralStats: function () {
      if (this.generalStats!= {}) return;
      var pCount = {}, cCount = {};
      
    }
  },
  computed: {
    goto: function () {
      if (!this.$refs.goto_input) return '#';
      return '#'+this.$refs.goto_input.value;
    },
    renderList: function () {
      var ev=this.filter.showEvents, o=this.banners, d=this.sortedDates.slice().reverse(), x={};
      var tmp={};
      for (var i=0;i<d.length;i++) {
        for (var j=0;j<o.length;j++) {
          if (!this.filterBanner(o[j])) continue;
          if (o[j].type==="event") {
            if (!ev) continue;
            if (d[i]!=o[j].start) continue;
            if (!x[d[i]]) x[d[i]] = {};
            x[d[i]].event = o[j];
            continue;
          };
          if (!x[d[i]] || !x[d[i]].m ) x[d[i]]={m:[],n:[]};
          var pos=-1;
          if (d[i] === o[j].end) {
            if (o[j].type==='mystic') x[d[i]].m.push(o[j]); else x[d[i]].n.push(o[j]), pos=x[d[i]].n.length-1;
          } else continue;
          if (o[j].type==='mystic') continue;
          var z=d.indexOf(o[j].start)||1;
          var diff = z-i;
          if (z-i <2) continue;
          for (var k=i;k<z;k++) {
            if (!x[d[k]]) x[d[k]]={m:[],n:[]};
            x[d[k]].n[pos] = o[j];
          };
        };
      };
      return x;
    },
    renderList1: function () {
      this.updateRender;
      var o=this.fullTimeline, f=this.filter, x={};
      Object.keys(o).forEach( (date) => {
        console.log(o[date])
        if (this.filter.year && date.slice(0,4) != this.filter.year) return;
        x[date] = o[date];
      });
      return x;
    },
  },
  watch: {
    filter: {
      handler: function () {this.getDatesArray()},
      deep: true
    },
    settings: function (val) {
    },
    banners: function () {
      this.getDatesArray();
    }
  },
  mounted: function () {

  },
  created: function () {
    console.log('CeciliaBot Timeline is booting...');
    var today = new Date();
    function pad(d) {return (d < 10) ? '0' + d.toString() : d.toString();}
    this.banners.push({type: 'event', name: 'Today', start: today.getUTCFullYear() + '-' + pad(today.getUTCMonth()+1) + '-' + pad(today.getUTCDate()) });
    this.loadUserData();
    this.getDatesArray();
  }
});
