function toggleCheck() {
        if (document.getElementById("darkModeCheck").checked === true) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark'); // salva preferenza per future visite
        }
        else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light'); // salva preferenza per future visite
        }    
    };
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);

        if (currentTheme === 'dark') {
            var checkBoxes = $("input[name=darkModeCheck]");
            checkBoxes.attr('checked', true);
        }
    }
    
    function toggleWhatsNew() {
      var toggle = document.getElementById("show_whats_new");
      if (toggle.style.display == "block") {
        toggle.style.display = "none";
        $("#WhatsNewText").text("► What's New");
      } else {
        toggle.style.display = "block";
        $("#WhatsNewText").text("▼ What's New:");
      };
    };
    
    function setWindow(current) {
      document.getElementById('welcome').style.display='none';
      document.getElementById('add_window').style.display='none';
      document.getElementById('manage_window').style.display='none';
      document.getElementById('advanced_window').style.display='none';
      document.getElementById('calculate_window').style.display='none';
      document.getElementById('extras_window').style.display='none';

      document.getElementById('settings_window').style.display='none';
      document.getElementById('my_teams_window').style.display='none';
      document.getElementById('raid_map').style.display='none';
      document.getElementById('saved_teams_stats').style.display='none';
      //toolbar
      document.getElementById("icon-bar_add_window").className = "";
      document.getElementById("icon-bar_manage_window").className = "";
      document.getElementById("icon-bar_advanced_window").className = "";
      document.getElementById("icon-bar_calculate_window").className = "";
      document.getElementById("icon-bar_settings_window").className = "";
      switch (current) {
        case 'add_window':
          document.getElementById('add_window').style.display='block';
          document.getElementById("icon-bar_add_window").className = "active-icon-bar";
          break;
        case 'manage_window':
          document.getElementById('manage_window').style.display='block';
          document.getElementById("icon-bar_manage_window").className = "active-icon-bar";
          break;
        case 'advanced_window':
          document.getElementById('advanced_window').style.display='block';
          document.getElementById("icon-bar_advanced_window").className = "active-icon-bar";
          break;
        case 'calculate_window':
          document.getElementById('calculate_window').style.display='block';
          document.getElementById("icon-bar_calculate_window").className = "active-icon-bar";
          break;
        case 'extras_window':
          document.getElementById('extras_window').style.display='block';
          document.getElementById("icon-bar_settings_window").className = "active-icon-bar";
          break;
        case 'settings_window':
          document.getElementById('settings_window').style.display='block';
          document.getElementById("icon-bar_settings_window").className = "active-icon-bar";
          break;
        case 'my_teams_window':
          document.getElementById('my_teams_window').style.display='block';
          document.getElementById("icon-bar_settings_window").className = "active-icon-bar";
          break;
        case 'raid_map':
          document.getElementById('raid_map').style.display='block';
          document.getElementById("icon-bar_settings_window").className = "active-icon-bar";
          break;
        case 'saved_teams_stats':
          document.getElementById('saved_teams_stats').style.display='block';
          document.getElementById("icon-bar_settings_window").className = "active-icon-bar";
          break;
      };
    };

    function welcome_toggle(id,menu) {
      welcome_menu = document.getElementsByName("welcome_element");
      for (var i = 0; i<welcome_menu.length; i++) {
        $(welcome_menu[i]).removeClass('active_welcome');
      };
      $(menu).addClass('active_welcome');

      document.getElementById("welcome_message").style.display = "none";
      document.getElementById("whats_new_content").style.display = "none";
      document.getElementById("instructions_content").style.display = "none";
      document.getElementById("cool_websites_content").style.display = "none";
      document.getElementById("credits_content").style.display = "none";
      switch (id) {
        case 'welcome':
          document.getElementById("welcome_message").style.display = "block";
          break;
        case 'whats_new':
          document.getElementById("whats_new_content").style.display = "block";
          break;
        case 'instructions':
          document.getElementById("instructions_content").style.display = "block";
          break;
        case 'cool_websites':
          document.getElementById("cool_websites_content").style.display = "block";
          break;
        case 'credits':
          document.getElementById("credits_content").style.display = "block";
          break;
      };
    };


  var Notification = window.Notification || window.mozNotification || window.webkitNotification;
  // NOTIFICATION
  function checkNotificationPromise() {
    try {
      Notification.requestPermission().then();
    } catch(e) {
      return false;
    }

    return true;
  }
  var riceviNotifiche = JSON.parse(localStorage.getItem('Settings') ? localStorage.getItem('Settings') : '{"notification":false}').notification;

  if (riceviNotifiche === true) {
    var checkBoxes = $("#notifications_toggle");
    checkBoxes.attr('checked', true);
  };
  function switchNotifiche() {
    if ('permissions' in navigator) {
          if (riceviNotifiche == true) {
            riceviNotifiche = false;
            document.getElementById("notifications_toggle").checked = false;
          } else {
            riceviNotifiche = true;
            document.getElementById("notifications_toggle").checked = true;
          };
          app.writeSettings();
    };
  };

function askNotificationPermission() {
  // Chiedi il permesso
  function handlePermission(permission) {
    // Conserva l'informazione
    if(!('permission' in Notification)) {
      Notification.permission = permission;
    }
    if (permission == "granted") {
      switchNotifiche();
    } else document.getElementById("notifications_toggle").checked = false;
  };

  // Controlla se il browser supporta notifiche
  if (!(Notification)) {
    console.log("This browser does not support notifications.");
  } else {
        if(checkNotificationPromise()) {
          Notification.requestPermission()
          .then((permission) => {
            handlePermission(permission);
          });
        } else {
          Notification.requestPermission(function(permission) {
            handlePermission(permission);
          });
        };
  };
};

    //// context menu
    var showValues = false;
    if (showValues == true) {
      var checkBoxes = $("#showValues_toggle");
      checkBoxes.attr('checked', true);
    };
    function toggleDebugValues() {
      if (showValues == true) {
        showValues = false;
        document.getElementById("showValues_toggle").checked = false;
      } else {
        showValues = true;
        document.getElementById("showValues_toggle").checked = true;
      };
    };
    function getPosition(e) {
      var posx = 0;
      var posy = 0;

      if (!e) var e = window.event;

      if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
      } else if (e.clientX || e.clientY) {
        posx = e.clientX + document.body.scrollLeft + 
                          document.documentElement.scrollLeft;
        posy = e.clientY + document.body.scrollTop + 
                          document.documentElement.scrollTop;
      }

      return {
        x: posx,
        y: posy
      };
    };

if (document.addEventListener) {
  var tastoDestro = 0;
  document.addEventListener('click', function(e) {
    if (tastoDestro != 0) {
      tastoDestro = 0;
      $('#debugHeroInfo').remove();
    }; 
  }); 
  document.addEventListener('contextmenu', function(e) {
    if (showValues == true) {
      if (tastoDestro != 0) {
          $('#debugHeroInfo').remove();
      }; 
      if ((e.target.parentNode.className == "heroImgList" || e.target.parentNode.className == "hero_potrait") && e.target.tagName == "IMG") {
        tastoDestro = 1;
        var posX, posY;
        let clickCoords = getPosition(e);
        let clickCoordsX = clickCoords.x;
        let clickCoordsY = clickCoords.y;

        let menuWidth = 200 + 4;
        let menuHeight = 480 + 4;
        let currentYPosition = e.pageY;
        
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;

        if ( (windowWidth - clickCoordsX - 50) < menuWidth ) {
          posX = clickCoordsX - menuWidth - 15 + "px";
        } else {
          posX = clickCoordsX + "px";
        }

        if ( (windowHeight - e.clientY - 50) < menuHeight ) {
          posY = clickCoordsY + windowHeight - e.clientY - menuHeight - 50 + "px";
        } else {
          posY = clickCoordsY + "px";
        }

        var topics = "";
        for (var key in app.HeroDB[e.target.alt].camping.values) {
          topics += `<div style="border-bottom: 1px solid grey;">` + app.translateTopics(key) + " " + '<span style="float: right;">' + app.HeroDB[e.target.alt].camping.values[key] + '</span></div>'
        };
        $( "#app" ).append(`
        <div id="debugHeroInfo" class="blur" style="width:200px;position:absolute; top:` + posY + `; left:` + posX + `; padding: 10px;">
          ` + "<center>" + app.translatedName[e.target.alt] + "</center>" +
          `<div style="font-size:12px">` +
            app.strings.topics + ": " + app.translateTopics(app.HeroDB[e.target.alt].camping.topics[0]) + ", " +  app.translateTopics(app.HeroDB[e.target.alt].camping.topics[1]) + "<br><br>" +
            topics
          + `</div>
          </div>
        `);
        e.preventDefault(); // hide left click
      };
    };
  }, false);
} else {
  document.attachEvent('oncontextmenu', function() {
    window.event.returnValue = false;
  });
};
function mandaNotificaCompletamento(){
  if (riceviNotifiche == true) {
    if (document.visibilityState != 'visible') {
      var notification = new Notification(app.strings.notification_title, { body: app.strings.notification_ready, icon: "https://cdn.glitch.com/5c21c869-ea9a-48ba-b019-90cd493f45cd%2Fcamp-fire-icon%20small.png?v=1585067234171" }); // manda notifica di completamento
    };
  };
};

function snackbarMessage(text) {
  $( "#snackbar" ).text(text);
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
};

function backendCalculation(camp) {
    $.ajax({
        url: "https://ceciliabotgithub.glitch.me/backend_calculation",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify( camp ),
        success: function (response) {
          app.isLoadingResults = false; // disattiva angelica
          mandaNotificaCompletamento();
          app.risultati = response;
        },
        error: function(jqXHR, textStatus, errorThrown) {
           app.isLoadingResults = false; // disattiva angelica
           console.log(textStatus, errorThrown);
        }
    });
  };

  function sendTeamUsageStatistics(data) {
    $.ajax({
        url: "https://ceciliabotgithub.glitch.me/team_statistics",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify( data ),
        success: function (response) {
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log("could not upload team data");
        }
    });
  };

  function generateUrl(roster) {
    var baseURL = window.location.origin;
    var encodeRoster = btoa(JSON.stringify(Object.keys(roster)));
    return baseURL + window.location.pathname + "?camproster=" + encodeRoster;
  };
  function copyText(id){
    var elm = document.getElementById(id);
    
    if(document.body.createTextRange) {// for Internet Explorer
      var range = document.body.createTextRange();
      range.moveToElementText(elm);
      range.select();
      document.execCommand("Copy");
    }
    else if(window.getSelection) {// other browsers
      var selection = window.getSelection();
      var range = document.createRange();
      range.selectNodeContents(elm);
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("Copy");
    };
  };

    var app = new Vue({
        el: '#app',
        data: function () {
            return {
              strings: {},
              HeroDB: {}, // start the Database with the users heroes already in (to avoid boot errors)
              sortedHeroDB: [], // sort A to Z
              buffList: {
                "stic_debuf_impossible": {"name": "Immunity", "id": 12},
                "stic_att_up": {"name": "Attack up", "id": 1},
                "stic_att_up2": {"name": "Attack up (Greater)", "id": 44},
                "stic_def_up": {"name": "Defense up", "id": 2},
                "stic_speed_up": {"name": "Speed up", "id": 3},
                "stic_dodge_up": {"name": "Evasion", "id": 10},
                "stic_protect": {"name": "Barrier", "id": 5},
                "stic_cri_up": {"name": "Crit chance up", "id": 4},
                "stic_cridmg_up": {"name": "Crit damage up", "id": 9},
                "stic_crires_up": {"name": "Crit Resistance", "id": 40},
                "stic_invincible": {"name": "Invincibility", "id": 6},
                "stic_endure": {"name": "Skill nullifier", "id": 46},
                "stic_heal": {"name": "Continuous Healing", "id": 11},
                "stic_hide": {"name": "Stealth", "id": 15},
                "stic_immortality": {"name": "Immortality", "id": 14},
                "stic_reflect": {"name": "Reflect", "id": 13},
                "stic_counter": {"name": "Counter", "id": 7}
              },
              debuffList: {"stic_def_dn": {"name": "Def down", "id": 18},
                "stic_speed_dn": {"name": "Speed down", "id": 19},
                "stic_att_dn": {"name": "Attack down", "id": 17},
                "stic_blind": {"name": "Blind", "id": 22},
                "stic_target": {"name": "Target", "id": 26},
                "stic_buf_impossible": {"name": "Unbuffable", "id": 29},
                "stic_heal_impossible": {"name": "Unhealable", "id": 27},
                "stic_stun": {"name": "Stun", "id": 20},
                "stic_provoke": {"name": "Provoke", "id": 25},
                "stic_silence": {"name": "Silence", "id": 28},
                "stic_sleep": {"name": "Sleep", "id": 21},
                "stic_blood": {"name": "Bleed", "id": 32},
                "stic_dot": {"name": "Poison", "id": 24},
                "stic_blaze": {"name": "Burn", "id": 31},
                "stic_vampire": {"name": "Vampire", "id": 23},
                "stic_bomb": {"name": "Bomb", "id": 53}
              },
              displayList: [],
              myHeroesList: {},
              displayMyHeroes: [],
              rosterLength: 0,
              locked: [],
              classe: [],
              elemento: [],
              debuffs: [],
              buffs: [],
              AoE: false,
              noS1debuffs: false,
              noDebuffs:  false,
              cartesian_lock: [[],[],[],[]],
              risultati: [],
              savedCamps: JSON.parse(localStorage.getItem('savedCamps') ? localStorage.getItem('savedCamps') : "{}"),
              displaySavedCamps: Object.keys(JSON.parse(localStorage.getItem('savedCamps') ? localStorage.getItem('savedCamps') : "{}")),
              customizedResuts: {numeroMassimo: true, n: 200, minMorale: false, morale: 0, noImmagini: false}, //
	            displayStyle: "grid",
	            isLoadingResults: false,
              inizializzazione: true, //nascondi tutto durante il caricamento iniziale di vue
              numeroCombinazioniPossibili: "/",
              lingua: "en", // Just a placeholder during boot, language is set at line 1701 and 1705
              translatedName:{}
            };
        },
        methods: {
          heroId: function (hero) {
            return this.HeroDB[hero].id;
          },
          thisHeroData: function(hero) {
            return this.HeroDB[hero]
          },
          thisHeroTranslatedName: function(heroid) {
            if (this.translatedName[heroid]) {
              return this.translatedName[heroid]
            } else return this.HeroDB[heroid].name
          },
          capitalize: function(string) {
              return string[0].toUpperCase() + string.slice(1).replace(/-/gi," "); 
          },
          updateUserData: function() { // aggiorna i dati sul server
            localStorage.setItem('Heroes', JSON.stringify(this.myHeroesList) );
          },
          addHero: function (hero) {
            if (!this.myHeroesList[hero]) {
              //this.myHeroesList.push(hero);
              this.myHeroesList[hero] = this.HeroDB[hero]; // aggiunge l'object del nuovo eroe
              this.rosterLength +=1; // usa per indicare a vue che qualcosa è cambiato
              this.filtroTuttiGliEroi({className: "search_hero_filter", name: "", value: ""}); // aggiorna i filtri per evitare bug se l'opzione nascondi eroi già in team è attiva
              this.filtroTuttiGliEroi({className: "search_hero_filter", name: "", value: ""}, "MyHeroes"); // aggiorna i filtri per evitare bug se l'opzione nascondi eroi già in team è attiva
              this.updateUserData();
            }
          },
          removeHero: function (hero) {
            //this.myHeroesList.splice(this.myHeroesList.indexOf(hero), 1);
            delete this.myHeroesList[hero];
            this.rosterLength -=1; // usa per indicare a vue che qualcosa è cambiato
            if (this.locked.includes(hero)) { // lock
               this.locked.splice(this.locked.indexOf(hero), 1)
            };
            this.filtroTuttiGliEroi({className: "search_hero_filter", name: "", value: ""}); // aggiorna i filtri per evitare bug se l'opzione nascondi eroi già in team è attiva
            this.displayMyHeroes.splice(this.displayMyHeroes.indexOf(hero), 1); // rimuovi dalla display list dei miei eroi se presente (sempre presente)
            this.updateUserData();
          },
          isInTeam: function(hero) {
                if (this.myHeroesList[hero]) {
                  return ''
                } else return "none";
          },
          isLocked: function(hero) {
                if (this.locked.includes(hero)) {
                  return ""
                } else return "none";
          },
          lockHero: function(hero) {
             if (!this.locked.includes(hero)) { // lock
               if (this.locked.length < 4) {
                this.locked.push(hero);
               } else {}
            } else { // già locked -> sblocca
              this.locked.splice(this.locked.indexOf(hero), 1)
            };
          },
          writeSettings: function() {
            localStorage.setItem('Settings', JSON.stringify({notification: riceviNotifiche, lingua: this.lingua}) );
          },
          menuLingua: function () {
            $( "#settings_window" ).append(`
              <div id="menu_lingua">
                <div class="modal" style="padding-top: 60px;display:block;">
                  <form class="modal-content animate" id="menu_lingua" style="background-color: var(--search-primary-color);color: var(--font-color);max-width:1080px">
                    <div class="imgcontainer">
                    <center>` + this.strings.language + `</center><br>
                    <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1200px-Flag_of_the_United_Kingdom.svg.png" width="105" height="70" onclick="app.cambiaLingua('en')">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/1200px-Flag_of_South_Korea.svg.png" width="105" height="70"  onclick="app.cambiaLingua('kr')">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/1200px-Flag_of_the_People%27s_Republic_of_China.svg.png" width="105" height="70"  onclick="app.cambiaLingua('cn')">
                    <br><br>
                    <img src="https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/1200px-Flag_of_Japan.svg.png" width="105" height="70"  onclick="app.cambiaLingua('jp')">
                    <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Flag_of_Italy.svg/1200px-Flag_of_Italy.svg.png" width="105" height="70"  onclick="app.cambiaLingua('it')">
                    <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/1200px-Flag_of_France.svg.png" width="105" height="70"  onclick="app.cambiaLingua('fr')">
                    <br><br>
                    <img src="https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Flag_of_Spain.svg/1200px-Flag_of_Spain.svg.png" width="105" height="70"  onclick="app.cambiaLingua('es')">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Portugal.svg/1280px-Flag_of_Portugal.svg.png" width="105" height="70"  onclick="app.cambiaLingua('pt')">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/1200px-Flag_of_Germany.svg.png" width="105" height="70"  onclick="app.cambiaLingua('de')">
                    <br><br>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Flag_of_the_Republic_of_China.svg/1000px-Flag_of_the_Republic_of_China.svg.png" width="105" height="70"  onclick="app.cambiaLingua('zht')">
                    </div>
                    <div class="container">
                      <button type="button" onclick="$('#menu_lingua').remove(); $('body').removeClass('modal-open')" class="button_cancelbtn">` + this.strings.back_btn + `</button>
                    </div>
                  </form>
                </div>
              </div>`
            );
            $("body").addClass("modal-open");
          },
          cambiaLingua: function (n) {
            this.lingua = n;
            this.writeSettings();
            this.inizializzaione();
            this.impostaLingua();
            $('#menu_lingua').remove();
            $('body').removeClass('modal-open')
          },
          showAddCartesian_lock: function (n) {
            var eroiSelezionabili = "";
            self = this;
            var tmpArray = Object.keys(this.myHeroesList);
            var sortBy = document.getElementById("myHeroes_sort_by").value;
            if (sortBy != "date") tmpArray.sort(function (a,b) {return ((self.HeroDB[a][sortBy] < self.HeroDB[b][sortBy]) ? -1 : ((self.HeroDB[a][sortBy] == self.HeroDB[b][sortBy]) ? 0: 1))});
            for (var i = 0; i < tmpArray.length; i++ ) {
              if ( !this.cartesian_lock[0].includes(tmpArray[i]) &&  !this.cartesian_lock[1].includes(tmpArray[i]) &&
              !this.cartesian_lock[2].includes(tmpArray[i]) &&  !this.cartesian_lock[3].includes(tmpArray[i]) 
              ) { // don't show already cartesian locked heroes
                eroiSelezionabili += `
                <input type="checkbox" id="checkbox_cartesian_lock_` + i + `" name="` + tmpArray[i] +`" value="` + tmpArray[i] + `" style="display:none"><label for="checkbox_cartesian_lock_` + i + `" class="label"> <img src="https://assets.epicsevendb.com/_source/face/` + this.HeroDB[tmpArray[i]].id + `_s.png" onerror="this.onerror=null;this.src='https://cdn.glitch.com/97cf5510-4561-4fba-a2bd-849e3aed02ba%2F` + this.HeroDB[tmpArray[i]].id + `_s.png';" style="height:60px;width:60px;" /></label>`
              };
            };
            $( "#advanced_window" ).append(`
              <div id="Cartesian_lock">
                <div class="modal" style="display: block;height:100%; width: 100%; overflow: hidden;">
                  <form class="modal-content animate" id="Cartesian_lock" style="background-color: var(--search-primary-color);color: var(--font-color);max-width:100%;height: 70%;">
                    <div class="noScrollBar" style="height: 85%; overflow-x: scroll;">`
                      +
                      eroiSelezionabili
                      +
                    `</div>
                    <div class="container">
                      <button type="button" onclick="app.addCartesian_lock(` + n  +`)" class="button_login">` + this.strings.add_selection + `</button>
                      <button type="button" onclick="$('#Cartesian_lock').remove(); $('body').removeClass('modal-open')" class="button_cancelbtn">` + this.strings.back_btn + `</button>
                    </div>
                  </form>
                </div>
              </div>`
            );
            $("body").addClass("modal-open");
          },
          addCartesian_lock: function (n) {
            var area = document.getElementById("Cartesian_lock");
            var hero = area.getElementsByTagName("input");
            for(var i = 0; i < hero.length; i++)  
                {  
                    if (hero[i].checked) this.cartesian_lock[n].push(hero[i].value);
                };
            $('#Cartesian_lock').remove();
            $("body").removeClass("modal-open")
          },
          removeCartesian_lock: function ( n, y) {
            this.cartesian_lock[n].splice(this.cartesian_lock[n].indexOf(this.cartesian_lock[n][y]), 1)
          }, 
          mostraSalvaRisultato: function (n) {
            $( "#calculate_window" ).append(`
              <div id="saveCamp" class="modal" style="padding-top: 60px;display:block;overflow-y: scroll;">
                <form class="modal-content animate" id="saveCamp" style="background-color: var(--search-primary-color);color: var(--font-color);max-width:760px">
                  <div class="imgcontainer">
                    <p>` + this.strings.morale + `: ` + this.risultati[n].morale + `</p>
                    <img src="https://assets.epicsevendb.com/_source/face/` + this.HeroDB[this.risultati[n].team[0]].id + `_s.png" onerror="this.onerror=null;this.src='https://cdn.glitch.com/97cf5510-4561-4fba-a2bd-849e3aed02ba%2F` + this.HeroDB[this.risultati[n].team[0]].id + `_s.png';" style="height:55px;width:55px;">
                    <img src="https://assets.epicsevendb.com/_source/face/` + this.HeroDB[this.risultati[n].team[1]].id + `_s.png" onerror="this.onerror=null;this.src='https://cdn.glitch.com/97cf5510-4561-4fba-a2bd-849e3aed02ba%2F` + this.HeroDB[this.risultati[n].team[1]].id + `_s.png';" style="height:55px;width:55px;">
                    <img src="https://assets.epicsevendb.com/_source/face/` + this.HeroDB[this.risultati[n].team[2]].id + `_s.png" onerror="this.onerror=null;this.src='https://cdn.glitch.com/97cf5510-4561-4fba-a2bd-849e3aed02ba%2F` + this.HeroDB[this.risultati[n].team[2]].id + `_s.png';" style="height:55px;width:55px;">
                    <img src="https://assets.epicsevendb.com/_source/face/` + this.HeroDB[this.risultati[n].team[3]].id + `_s.png" onerror="this.onerror=null;this.src='https://cdn.glitch.com/97cf5510-4561-4fba-a2bd-849e3aed02ba%2F` + this.HeroDB[this.risultati[n].team[3]].id + `_s.png';" style="height:55px;width:55px;">
                    <p>` + 
                      this.thisHeroTranslatedName(this.thisHeroData(this.risultati[n].migliorPG1)._id) + `: `+ this.translateTopics(this.risultati[n].opzioneMigliore1) + `<br>` +
                      this.thisHeroTranslatedName(this.thisHeroData(this.risultati[n].migliorPG2)._id) + `: `+ this.translateTopics(this.risultati[n].opzioneMigliore2) +
                    `</p>
                  </div>
                  <div id="campSavingError" style="text-align:center;color:red;"></div>
                  <div class="container">
                    <form id="save_camp_details">
                      <label for="camp_name"><b>` + this.strings.camp_name_field + `</b></label>
                      <input type="text" placeholder="` + this.strings.camp_name_placeholder + `" name="camp_name" id="camp_name" required="">
                      <div style="text-align: center;">
                        <input type="checkbox" id="checkbox_normal" name="raid_difficulty">
                        <label for="checkbox_normal">`+ this.strings.normal + `</label>
                        <input type="checkbox" id="checkbox_hell" name="raid_difficulty">
                        <label for="checkbox_hell">` + this.strings.hell +`</label>
                      </div>
                      <div style="text-align: center;">
                        <input type="checkbox" id="checkbox_queen" name="raid_boss" style="position:relative;top:0px;display:none">
                        <label for="checkbox_queen" class="label" style="position:relative;top:0px;"> <img src="https://cdn.glitch.com/97cf5510-4561-4fba-a2bd-849e3aed02ba%2FQueen-Azumashik-284x300.png?v=1590932065337" style="position:relative;top:0px;height:60px;width:60px;" /><p style="position:relative;text-align:center;">` + this.strings.queen + `</p></label>
                        <input type="checkbox" id="checkbox_karkanis" name="raid_boss" style="position:relative;top:0px;display:none">
                        <label for="checkbox_karkanis" class="label" style="position:relative;top:0px;"> <img src="https://cdn.glitch.com/97cf5510-4561-4fba-a2bd-849e3aed02ba%2FKarkanis-284x300.png?v=1590932065109" style="position:relative;top:0px;height:60px;width:60px;" /><p style="position:relative;text-align:center;">` + this.strings.karkanis + `</p></label>
                        <input type="checkbox" id="checkbox_juleeve" name="raid_boss" style="position:relative;top:0px;display:none">
                        <label for="checkbox_juleeve" class="label" style="position:relative;top:0px;"> <img src="https://cdn.glitch.com/97cf5510-4561-4fba-a2bd-849e3aed02ba%2FJuleeve-284x300.png?v=1590932065054" style="position:relative;top:0px;height:60px;width:60px;" /><p style="position:relative;text-align:center;">` + this.strings.juleeve + `</p></label>
                        <input type="checkbox" id="checkbox_vera" name="raid_boss" style="position:relative;top:0px;display:none">
                        <label for="checkbox_vera" class="label" style="position:relative;top:0px;"> <img src="https://cdn.glitch.com/97cf5510-4561-4fba-a2bd-849e3aed02ba%2FSecretary-Vera-284x300.png?v=1590932064989" style="position:relative;top:0px;height:60px;width:60px;" /><p style="position:relative;text-align:center;">` + this.strings.vera + `</p></label>
                        <input type="checkbox" id="checkbox_arakahan" name="raid_boss" style="position:relative;top:0px;display:none">
                        <label for="checkbox_arakahan" class="label" style="position:relative;top:0px;"> <img src="https://cdn.glitch.com/97cf5510-4561-4fba-a2bd-849e3aed02ba%2FDevourer-Arakahan-284x300.png?v=1590932064956" style="position:relative;top:0px;height:60px;width:60px;" /><p style="position:relative;text-align:center;">` + this.strings.arakahan + `</p></label>
                      </div>
                      <button type=submit onclick="return app.salvaRisultato(` + n + `)" class="button_login">` + this.strings.save + `</button>
                      <button type=button onclick="$('#saveCamp').remove(); $('body').removeClass('modal-open')" class="button_cancelbtn">` + this.strings.canc_btn + `</button>
                    </form>
                  </div>
                </form>
              </div>
            `);
            $("body").addClass("modal-open");
            $('#camp_name').focus();
          },
          salvaRisultato: function (n) {
            try {
              var $form = $("#saveCamp");
              var campName = $('#camp_name', $form).val().replace(/  +/g,"").trim();
              if (campName && campName != "" && campName.indexOf("@_#") == -1) {
                if (!this.savedCamps[campName]) {
                  var normal = false;
                  var hell = false;
                  var queen = false;
                  var karkanis = false;
                  var juleeve = false;
                  var vera = false;
                  var arakahan = false;
                  if (document.getElementById("checkbox_normal").checked === true ) normal = true;
                  if (document.getElementById("checkbox_hell").checked === true ) hell = true;
                  if (document.getElementById("checkbox_queen").checked === true) queen = true;
                  if (document.getElementById("checkbox_karkanis").checked === true ) karkanis = true;
                  if (document.getElementById("checkbox_juleeve").checked === true ) juleeve = true;
                  if (document.getElementById("checkbox_vera").checked === true ) vera = true;
                  if (document.getElementById("checkbox_arakahan").checked === true ) arakahan = true;
                  var save = this.risultati.slice(n,n+1)[0];
                  save.normal = normal;
                  save.hell = hell;
                  save.queen = queen;
                  save.karkanis = karkanis;
                  save.juleeve = juleeve;
                  save.vera = vera;
                  save.arakahan = arakahan;
                  console.log(save);

                  this.savedCamps[campName] = this.risultati[n];
                  var sendData = {morale: this.risultati[n].morale, team: this.risultati[n].team,  normal: normal, hell: hell, queen: queen, karkanis: karkanis, juleeve: juleeve, vera: vera, arakahan: arakahan};
                  console.log(sendData);

                  $('#saveCamp').remove();
                  $('body').removeClass('modal-open');
                  localStorage.setItem('savedCamps', JSON.stringify(this.savedCamps) );
                  this.displaySavedCamps = Object.keys(this.savedCamps); // aggionra la lista da visulizzare
                  sendTeamUsageStatistics({function: "add", data: [sendData]}); // send team comp to server for stats
                  snackbarMessage(campName + ` ` + this.strings.saved_message)
                } else {
                  $("#campSavingError").text(this.strings.error_name_in_use);
                };
              } else if (campName.indexOf("@_#") != -1) {
                $("#campSavingError").text("The sequence @_# can't be used");  
              } else {
                $("#campSavingError").text(this.strings.error_no_name_provided);
              };
            } catch (err) {
              console.log(err)
            }; 
            return false;
          },
          eliminaRisultatoSalvato: function (campName) {
            try {
                campName = campName.replace(/@_#3#9#;/g,"'").replace(/@_#3#4#;/g,'"').replace(/@_#9#6#;/g,'`'); // avoid errors during deletion
                sendTeamUsageStatistics({function: "remove", data: [this.savedCamps[campName]]}); // send team comp to server for stats
                delete this.savedCamps[campName];
                $('#savedCamp').remove();
                $('body').removeClass('modal-open');
                localStorage.setItem('savedCamps', JSON.stringify(this.savedCamps) );
                this.displaySavedCamps = Object.keys(this.savedCamps); // aggionra la lista da visulizzare

                snackbarMessage(campName + ` ` + this.strings.deleted_message);
            } catch (err) {
              console.log("Error while removing camp")
            };
          },
          mostraRisultatoSalvato: function (campName) {
            for (var i in this.savedCamps[campName].team) {
              this.savedCamps[campName].team[i] = this.savedCamps[campName].team[i].toLowerCase().replace(/ /g,"-").replace(/&/g,"").replace(/'/g,"");
            };
            this.savedCamps[campName].migliorPG1 = this.savedCamps[campName].migliorPG1.toLowerCase().replace(/ /g,"-").replace(/&/g,"").replace(/'/g,"");
            this.savedCamps[campName].migliorPG2 = this.savedCamps[campName].migliorPG2.toLowerCase().replace(/ /g,"-").replace(/&/g,"").replace(/'/g,"");
            $( "#my_teams_window" ).append(`
              <div id="savedCamp" class="modal" style="padding-top: 60px;display:block;">
                <form class="modal-content animate" id="savedCamp" style="background-color: var(--search-primary-color);color: var(--font-color);max-width:760px">
                  <div class="imgcontainer">
                    <span onclick="app.eliminaRisultatoSalvato('` + campName.replace(/'/g,"@_#3#9#;").replace(/"/g,'@_#3#4#;').replace(/`/g,'@_#9#6#;') + `')"><i class="fa fa-trash close" style="color: var(--font-color);"></i></span>
                    <p>` + this.strings.morale + `: ` + this.savedCamps[campName].morale + `</p>
                    <img src="https://assets.epicsevendb.com/_source/face/` + this.HeroDB[ this.savedCamps[campName].team[0] ].id + `_s.png" onerror="this.onerror=null;this.src='https://cdn.glitch.com/97cf5510-4561-4fba-a2bd-849e3aed02ba%2F` + this.HeroDB[ this.savedCamps[campName].team[0] ].id + `_s.png';" style="height:55px;width:55px;">
                    <img src="https://assets.epicsevendb.com/_source/face/` + this.HeroDB[ this.savedCamps[campName].team[1] ].id + `_s.png" onerror="this.onerror=null;this.src='https://cdn.glitch.com/97cf5510-4561-4fba-a2bd-849e3aed02ba%2F` + this.HeroDB[ this.savedCamps[campName].team[1] ].id + `_s.png';" style="height:55px;width:55px;">
                    <img src="https://assets.epicsevendb.com/_source/face/` + this.HeroDB[ this.savedCamps[campName].team[2] ].id + `_s.png" onerror="this.onerror=null;this.src='https://cdn.glitch.com/97cf5510-4561-4fba-a2bd-849e3aed02ba%2F` + this.HeroDB[ this.savedCamps[campName].team[2] ].id + `_s.png';" style="height:55px;width:55px;">
                    <img src="https://assets.epicsevendb.com/_source/face/` + this.HeroDB[ this.savedCamps[campName].team[3] ].id + `_s.png" onerror="this.onerror=null;this.src='https://cdn.glitch.com/97cf5510-4561-4fba-a2bd-849e3aed02ba%2F` + this.HeroDB[ this.savedCamps[campName].team[3] ].id + `_s.png';" style="height:55px;width:55px;">
                    <p>` + 
                      this.thisHeroTranslatedName(this.thisHeroData(this.savedCamps[campName].migliorPG1)._id) + `: `+ this.translateTopics(this.savedCamps[campName].opzioneMigliore1) + `<br>` +
                      this.thisHeroTranslatedName(this.thisHeroData(this.savedCamps[campName].migliorPG2)._id) + `: `+ this.translateTopics(this.savedCamps[campName].opzioneMigliore2) +
                    `</p>
                  </div>
                  <div class="container">
                    <button type="button" onclick="$('#savedCamp').remove(); $('body').removeClass('modal-open');" class="button_cancelbtn">` + this.strings.back_btn + `</button>
                  </div>
                </form>
              </div>
            `);
            $("body").addClass("modal-open");
          },
          modalGenerateURL: function (campName) {
            $( "#settings_window" ).append(`
              <div id="url_generator" class="modal" style="padding-top: 60px;display:block;">
                <div class="modal-content animate" style="background-color: var(--search-primary-color);color: var(--font-color);max-width:760px">
                  <div class="imgcontainer">
                    <div id="url_container" class="box_advanced_settings noScrollBar" style="display: block; width:90%; padding-left: 5%; padding-right: 5%; position: relative; overflow-x: auto; font-size: 16px; white-space: nowrap;">` + 
                      generateUrl(this.myHeroesList) + 
                   `</div>
                    <button type="button" onclick="copyText('url_container')" class="button_login">` + this.strings.copia + `</button>
                    <br>` + this.strings.url_usage_help + `<br><br>
                  </div>
                  <div class="container">
                    <button type="button" onclick="$('#url_generator').remove(); $('body').removeClass('modal-open');" class="button_cancelbtn" style="width:100%">` + this.strings.back_btn + `</button>
                  </div>
                </div>
              </div>
            `);
            $("body").addClass("modal-open");
          },
          getSavedTeamsStats: function() {
            self = this;
            var refreshButton = document.getElementById("refreshStats");
            refreshButton.style.display = "none";
            if (document.getElementById("stats_table")) $("#stats_table").remove();
            $.ajax({
              url: "https://ceciliabotgithub.glitch.me/team_statistics",
              type: 'GET',
              contentType: 'application/json',
              success: function (response) {
                var toPrint = "";
                var toPrintChar = "";
                if (response.data.length>0) {
                  for (var i = 0; i < response.data.length; i++) {
                    toPrint += "<tr>" +  
                      `<td style='padding-top: 15px; padding-bottom:10px'><img src="https://assets.epicsevendb.com/_source/face/` + self.HeroDB[response.data[i].team[0]].id + `_s.png" onerror="this.onerror=null;this.src='https://cdn.glitch.com/97cf5510-4561-4fba-a2bd-849e3aed02ba%2F` + self.HeroDB[response.data[i].team[0]].id + `_s.png';" style="height:55px;width:55px;"></td>` +
                      `<td style='padding-top: 15px; padding-bottom:10px'><img src="https://assets.epicsevendb.com/_source/face/` + self.HeroDB[response.data[i].team[1]].id + `_s.png" onerror="this.onerror=null;this.src='https://cdn.glitch.com/97cf5510-4561-4fba-a2bd-849e3aed02ba%2F` + self.HeroDB[response.data[i].team[1]].id + `_s.png';" style="height:55px;width:55px;"></td>` +
                      `<td style='padding-top: 15px; padding-bottom:10px'><img src="https://assets.epicsevendb.com/_source/face/` + self.HeroDB[response.data[i].team[2]].id + `_s.png" onerror="this.onerror=null;this.src='https://cdn.glitch.com/97cf5510-4561-4fba-a2bd-849e3aed02ba%2F` + self.HeroDB[response.data[i].team[2]].id + `_s.png';" style="height:55px;width:55px;"></td>` +
                      `<td style='padding-top: 15px; padding-bottom:10px'><img src="https://assets.epicsevendb.com/_source/face/` + self.HeroDB[response.data[i].team[3]].id + `_s.png" onerror="this.onerror=null;this.src='https://cdn.glitch.com/97cf5510-4561-4fba-a2bd-849e3aed02ba%2F` + self.HeroDB[response.data[i].team[3]].id + `_s.png';" style="height:55px;width:55px;"></td>` +
                      "<td style='width:50vw; padding-top: 15px; padding-bottom:10px'> <div class='histogram_bar' style='width:" + response.data[i].usi/response.totale*100 + "%;'><span>" + Math.round(( (response.data[i].usi/response.totale*100)+ Number.EPSILON) * 100) / 100 + " %</span></div></td>" +
                      "<td style='text-align: center; padding-top: 15px; padding-bottom:10px; border-right: thin;'>" + response.data[i].morale + "</td>" +
                      "<td style='text-align: center; padding-top: 15px; padding-bottom:10px'>" + response.data[i].usi + "</td></tr>";
                  };
                  for (var i = 0; i < response.characters.length; i++) {
                    toPrintChar += "<tr>" +  
                      `<td style='padding-top: 15px; padding-bottom:10px'><img src="https://assets.epicsevendb.com/_source/face/` + self.HeroDB[response.characters[i].character].id + `_s.png" onerror="this.onerror=null;this.src='https://cdn.glitch.com/97cf5510-4561-4fba-a2bd-849e3aed02ba%2F` + self.HeroDB[response.characters[i].character].id + `_s.png';" style="height:55px;width:55px;"></td>` +
                      "<td style='width: 80vw; padding-top: 15px; padding-bottom:10px'> <div class='histogram_bar' style='width:" + response.characters[i].usi/response.totale*100 + "%;'><span>" + Math.round((( response.characters[i].usi/response.totale*100)+ Number.EPSILON) * 100) / 100 + " %</span></div></td>" +
                      "<td style='text-align: center; padding-top: 15px; padding-bottom:10px'>" + response.characters[i].usi +"</td></tr>";
                  };
                } else {
                  toPrint = "<td>No data</td>";
                  toPrintChar = "";
                };
                refreshButton.style.display = "";
                $('#char_tab_stats').removeClass('activetab');
                $('#team_tab_stats').addClass('activetab');
                $( "#saved_teams_stats").append(`<table id="stats_table" style="width: 100%; background-color: var(--search-primary-color); padding: 10px; border-radius: 0 0 12px 12px;"><tbody id="teams_stats_tbody">
                  <th colspan="4">${self.strings.team}</th>
                  <th></th>
                  <th style="white-space: nowrap;">${self.strings.morale}</th>
                  <th style="white-space: nowrap;">${self.strings.teams}</th>
                  ` + toPrint + `</tbody>
                  <tbody id="char_stats_tbody" style="display: none;">
                  <th></th>
                  <th></th>
                  <th style="white-space: nowrap;">${self.strings.teams}</th>
                  ` + toPrintChar + `</tbody></table>`);
              },
              error: function(jqXHR, textStatus, errorThrown) {
                refreshButton.style.display = "";
                $( "#saved_teams_stats").append(`<table id="stats_table"><td style="text-align: center;">Error while retirving data.<br> Please retry.</td></table>`);
                snackbarMessage(`failed to retrive data`);
              }
            });
          },
          helpWindow: function (sezione, argomento) {
            var titolo, contenuto;
            switch (argomento) { //HTML code is allowed
              case 'add_heroes_help':
                if (this.lingua == "cn") { // translations should be moved where the other strings are
                  titolo = "添加英雄";
                  contenuto = `点击英雄头像将英雄添加到你的英雄列表.<br>
                             你的英雄列表里的所有英雄将会用于计算可能的排列组合并给出心情最高的前200个结果.<br>
                             可添加的英雄没有数量限制，添加英雄越多计算越慢.<br>
                             你的英雄将会自动保存，不需要每次打开页面都重新选择，但是清除页面Cookie将会丢失你保存的设置和英雄列表!<br>
                             <br>
                             如果你使用的是"列表"视图(可在搜索框右方切换) 点击 "+" 号添加英雄至你的英雄列表
                            `;
                } else if (this.lingua == "zht") { // translations should be moved where the other strings are
                  titolo = "添加英雄";
                  contenuto = `點擊英雄頭像將英雄添加到你的英雄列表.<br>
                             你的英雄列表裏的所有英雄將會用於計算可能的排列組合並給出心情最高的前200個結果.<br>
                             可添加的英雄沒有數量限制，添加英雄越多計算越慢.<br>
                             你的英雄將會自動保存，不需要每次打開頁面都重新選擇，但是清除頁面Cookie將會丟失你保存的設定和英雄列表!<br>
                             <br>
                             如果你使用的是"列表"視圖(可在搜索框右方切換) 點擊 "+" 號添加英雄至你的英雄列表
                            `;
                } else {
                  titolo = "Add Heroes";
                  contenuto = `Tap or click the portrait of a hero to add that hero to your roster.<br>
                              Heroes in your roster will be used to calculate all possible combinations and return the best 200 combinations.<br>
                              You can add as many heroes as you wish but the time needed to calculate all possible combinations will also increase.<br>
                              Your roster will be saved and can be used everytime you visit this page without the need to add each hero everytime!<br>
                              <br>
                              If you are using the "List" display mode tap the "+" symbol to add a hero to your roster
                              `;
                };
                break;
              case 'manage_heroes_help':
                if (this.lingua == "cn") {
                  titolo = "英雄列表管理";
                  contenuto = `在这个界面你可以查看所有保存的英雄.<br>
                             点击英雄头像上的 "x" 就可以删除英雄.<br>
                             点击英雄头像可以锁定英雄，被锁定的英雄将会出现在所有的计算结果中.<br>
                             你可以点击下方的篝火图标计算露营心情，或者点击记事本图标添加高级选项.
                            `;                  
                } else if (this.lingua == "zht") {
                  titolo = "英雄列表管理";
                  contenuto = `在這個界面你可以查看所有保存的英雄.<br>
                             點擊英雄頭像上的 "x" 就可以刪除英雄.<br>
                             點擊英雄頭像可以鎖定英雄，被鎖定的英雄將會出現在所有的計算結果中.<br>
                             你可以點擊下方的篝火圖標計算露營心情，或者點擊記事本圖標添加高級選項.
                            `;                  
                } else {
                  titolo = "Manage Heroes";
                  contenuto = `In this window you can view all the heroes currently in your roster.<br>
                              You can remove a hero by clicking the "x" at the bottom of the hero's portrait.<br>
                              You can lock a hero by clicking he's portrait, a lock symbol will appear near the portrait. A locked hero will appear in every team in the results page.<br>
                              You can calculate all the camping results for the current roster by clicking the bonfire icon in the toolbar or click the book icon to add advance settings.
                              `;
                }; 
                break
              case 'advanced_settings':
                if (this.lingua == "cn") {
                  titolo = "高级设置";
                  contenuto = `这里可以进行高级设置.<br>
                            <b style="color:red">被锁定的英雄不受高级设置影响</b><br><br>
                            你可以选择任意数量的选项，但是某些选项有特殊的限制.<br>
                            例如你在职业一栏勾选超过4个职业就会报错，因为一个队伍最多不超过4个人.<br>
                            因为被锁定的英雄无视高级设置限制，所以如果你锁定了 "塔瑪林爾(偶像)" 然后在高级设置的职业一栏选中了精灵师，那么在计算结果中 除了偶像还会再添加一个精灵师. 对于Buff和Debuff也是同理<br>
                            `;                 
                } else if (this.lingua == "zht") {
                  titolo = "高級設定";
                  contenuto = `這裏可以進行高級設定.<br>
                            <b style="color:red">被鎖定的英雄不受高級設定影響</b><br><br>
                            你可以選擇任意數量的選項，但是某些選項有特殊的限制.<br>
                            例如你在職階一欄勾選超過4個職階就會報錯，因為一個隊伍最多不超過4個人.<br>
                            因為被鎖定的英雄無視高級設定限制，所以如果你鎖定了 "塔瑪林爾(偶像)" 然後在高級設定的職階一欄選中了精靈師，那麽在計算結果中 除了偶像還會再添加一個精靈師. 對於Buff和Debuff也是同理<br>
                            `;                 
                } else {
                  titolo = "Advanced settings";
                  contenuto = `Here you can costumize your camp results.<br>
                              <b style="color:red">Locked heroes are not subject to these restrictions</b><br><br>
                              You can select as many as you want but keep in mind time size while doing so.<br>
                              For example if you lock 5 classes or 5 elements you will get a team size error.<br>
                              Because locked heroes ignore advanced settings if you lock "Tamarinne" and select Soul weaver as a class you will get "Tamarinne" + another Soul weaver in every team. The same thing applies to Buffs and Debuffs<br>
                              `;
                };
                break;
              case 'multi-lock':
                if (this.lingua == "cn") {
                  titolo = "锁定多人 帮助";
                  contenuto = `每个栏位代表队伍里的一个位置, 每个栏位可以添加任意数量的英雄.<br>
                             计算结果中的每一个位置，只会出现对应栏位中的英雄. 同一个英雄不能被添加到多个栏位中.<br>
                             空白的栏位对应你的英雄列表中剩余的全部英雄.<br>
                             如果你将所有的英雄加到前三个栏位中将会出现 "所有英雄添加完毕，已无英雄可添加至下一个栏位!" 的错误信息.<br>
                             空白的栏位将会受到高级设置的影响.<br><br>
                             每个栏位中被锁定的英雄将无视高级设置的影响.<br>
                             如果你所有栏位都放入了英雄，同时又选择了任意一个高级设置， 将会报错 "队伍人数超过上限!" 并返回 0 个计算结果.<br>
                             这个选项有助于创建自定义队伍, 比如你将你所有的骑士放在一个栏位中，那么你所有的计算结果里就必定会出现一个骑士!
                             `;                  
                } else if (this.lingua == "zht") {
                  titolo = "鎖定多人 幫助";
                  contenuto = `每個欄位代表隊伍裏的一個位置, 每個欄位可以添加任意數量的英雄.<br>
                             計算結果中的每一個位置，只會出現對應欄位中的英雄. 同一個英雄不能被添加到多個欄位中.<br>
                             空白的欄位對應你的英雄列表中剩余的全部英雄.<br>
                             如果你將所有的英雄加到前三個欄位中將會出現 "所有英雄添加完畢，已無英雄可添加至下一個欄位!" 的錯誤信息.<br>
                             空白的欄位將會受到高級設定的影響.<br><br>
                             每個欄位中被鎖定的英雄將無視高級設定的影響.<br>
                             如果你所有欄位都放入了英雄，同時又選擇了任意一個高級設定， 將會報錯 "隊伍人數超過上限!" 並返回 0 個計算結果.<br>
                             這個選項有助於創建自定義隊伍, 比如你將你所有的騎士放在一個欄位中，那麽你所有的計算結果裏就必定會出現一個騎士!
                             `;                  
                } else {
                  titolo = "Multi lock help";
                  contenuto = `Each slot is a space in your team, on each slot you can add as many heroes as you wish.<br>
                              Only one of the Heroes locked for each slot will be in the results. The same hero can't be added on multiple slots.<br>
                              Empty slots will be filled with the remaining heroes in your roster.<br>
                              If you use all your heroes to fill 3 or less slots and no heroes are left to fill the remaining slots you will get a "not enough heroes left" error.<br>
                              Slots that are left empty will be subject of restrictions from advanced settings.<br><br>
                              Locked heroes in one of the slots will ignore advanced settings.<br>
                              If you fill all the slots and select any advanced settings you will get a "team size exceeded" error or 0 results.<br>
                              This option is useful to create costum rules, for example you can put all your knights in 1 slot and you will get a knight for each team in the results!
                              `;
                }; 
                break;
              case 'results_help':
                if (this.lingua == "cn") {
                  titolo = "计算结果";
                  contenuto = `这里会出现根据你的设置筛选出的心情最高的前200个结果.<br>
                             你的英雄列表里至少要有4个英雄才能显示结果.<br>
                             你可以点击每个结果前面的图标保存对应的队伍 (会弹出一个窗口要求你自定义队伍名称), 你保存的队伍会出现在右下方齿轮图标的"设置"一栏里.
                             `;                 
                } else if (this.lingua == "zht") {
                  titolo = "計算結果";
                  contenuto = `這裏會出現根據你的設定篩選出的心情最高的前200個結果.<br>
                             你的英雄列表裏至少要有4個英雄才能顯示結果.<br>
                             你可以點擊每個結果前面的圖標保存對應的隊伍 (會彈出一個窗口要求你自定義隊伍名稱), 你保存的隊伍會出現在右下方齒輪圖標的"設定"一欄裏.
                             `;                 
                } else {
                  titolo = "Results";
                  contenuto = `Here are displayed the best 200 combinations for your roster and current advanced settings.<br>
                              You need at least 4 heroes in your current roster for any result to be displayed.<br>
                              You can click the floppy disk icon to save a specific team composition (you will be prompted to input a name for that team), your saved teams will be displayed in the settings window.
                              `;
                };
                break;
              default:
                titolo = "";
                contenuto = "";
            };

            $( "#" + sezione).append(`
              <div id="help_menu" class="modal" style="padding-top: 60px;display:block;">
                <form class="modal-content animate" id="savedCamp" style="background-color: var(--search-primary-color);color: var(--font-color);max-width:760px">
                  <div class="imgcontainer">` + titolo + `
                  </div>
                  <div style="padding:15px">` + contenuto + `
                  </div>
                  <div class="container">
                    <button type="button" onclick="$('#help_menu').remove(); $('body').removeClass('modal-open');" class="button_cancelbtn">` + this.strings.back_btn + `</button>
                  </div>
                </form>
              </div>
            `);
            $("body").addClass("modal-open"); //prevent body from scrolling while modal is open
          },
          setDisplayStyle: function(layout, sezione) {
                  var add_window = document.getElementById("pulsanti_display_add_window").getElementsByClassName("search_hero_filter");
                  add_window[0].className = "search_hero_filter";
                  add_window[1].className = "search_hero_filter";
                  var manage_window = document.getElementById("pulsanti_display_manage_window").getElementsByClassName("search_hero_filter");
                  manage_window[0].className = "search_hero_filter";
                  manage_window[1].className = "search_hero_filter";
                  if (layout.value == "grid") {
                     add_window[0].className += " active";
                     manage_window[0].className += " active";
                  } else if (layout.value == "list") {
                     add_window[1].className += " active";
                     manage_window[1].className += " active";
                  };
                  this.displayStyle = layout.value;
                },
          filtroTuttiGliEroi: function (button, listToModify) { 
            self = this;
            var tmpArray, pulsantiIn, filtro = {};
            if (listToModify === "AllHeroes" || listToModify == undefined)  { 
              tmpArray = this.sortedHeroDB.slice(); // slice per creare una copia e non modificare l'originale
              pulsantiIn = document.getElementById("add_window"); // determina in che sezione sono i pulsanti
              //if (button.className == "search_hero_filter") 
              filtro["ricerca"] = document.getElementById("inputInTuttiGliEroi").value; // ottieni il testo digitato nella casella
            } else if (listToModify === "MyHeroes")  { 
              tmpArray = Object.keys(this.myHeroesList);
              var sortBy = document.getElementById("myHeroes_sort_by").value;
              if (sortBy != "date") tmpArray.sort(function (a,b) {return ((self.HeroDB[a][sortBy] < self.HeroDB[b][sortBy]) ? -1 : ((self.HeroDB[a][sortBy] == self.HeroDB[b][sortBy]) ? 0: 1))});
              //if (button.className == "search_hero_filter") 
              filtro["ricerca"] =  document.getElementById("inputInMyHeroes").value; // ottieni il testo digitato nella casella
              pulsantiIn = document.getElementById("manage_window"); // determina in che sezione sono i pulsanti
            };
            if (filtro.ricerca == undefined) filtro.ricerca = "";
            var pulsanti = pulsantiIn.getElementsByClassName(button.className);
            for (var i = 0; i < pulsanti.length; i++) {
              if (pulsanti[i].className.indexOf("active") != -1) {
                filtro[pulsanti[i].name] = pulsanti[i].value;
                if (pulsanti[i].name == button.name) pulsanti[i].className = button.className; // rimuove la class "active"
              };
            };
            button.className = button.className.replace(/active/gi,"");
            button.className += " active"; // attiva questo pulsante
            filtro[button.name] = button.value; // attualizza il filtro
            //imposta la nuova array da visualizzare
            for (var i = 0; i < tmpArray.length;i++) {
              if ((this.HeroDB[tmpArray[i]].role != filtro.filter_class && filtro.filter_class != "*") || 
                  (this.HeroDB[tmpArray[i]].attribute != filtro.filter_element && filtro.filter_element != "*") || 
                  (this.HeroDB[tmpArray[i]].rarity != filtro.filter_rarity && filtro.filter_rarity != "*") ||
                  (filtro.filter_gia_aggiunti == "true" && this.myHeroesList[tmpArray[i]] ) ||
                  (this.thisHeroTranslatedName(this.thisHeroData(tmpArray[i])._id).toLowerCase().indexOf(filtro.ricerca.toLowerCase()) == -1)
              ) {
                 tmpArray.splice(tmpArray.indexOf(tmpArray[i]), 1);
                 i--
              };
            };
            if (listToModify === "AllHeroes" || listToModify == undefined)  { 
                this.displayList = tmpArray;
                //tmpArray.length = 0;
            } else if (listToModify === "MyHeroes")  { 
                if (filtro["filter_locked_only"] == "true") tmpArray = this.locked;
                this.displayMyHeroes = tmpArray;
                //tmpArray.length = 0;
            };
          },
          personalizzaRisultati: function () {
            var risultati = { numeroMassimo: true, n: 200, noImmagini: false, minMorale: false, morale: 0 }
            checkNumeroMassimo = document.getElementById("numeroRisultatiMassimo");
            valoreRisultatiMassimo = document.getElementById("n_risultati");
            checkMoraleMinimo = document.getElementById("moraleMinimo");
            valoreMoraleMinimo = document.getElementById("n_moraleMinimo");
            //checkImmagini = document.getElementById("disattivaImmaingiRisultati");
            if (checkNumeroMassimo.checked) {
              risultati.numeroMassimo = true;
              valoreRisultatiMassimo.disabled = false;
            } else {
              risultati.numeroMassimo = false;
              valoreRisultatiMassimo.disabled = true;
            };
            if (checkMoraleMinimo.checked) {
              risultati.minMorale = true;
              valoreMoraleMinimo.disabled = false;
            } else {
              risultati.minMorale = false;
              valoreMoraleMinimo.disabled = true;
            };
            //if (checkImmagini.checked) {
            //  risultati.noImmagini = true;
            //};
            if (!isNaN(parseInt(valoreRisultatiMassimo.value))) {
              risultati.n = parseInt(valoreRisultatiMassimo.value)
            } else {
              risultati.n = 200
            };
            if (!isNaN(parseInt(valoreMoraleMinimo.value))) {
              risultati.morale = parseInt(valoreMoraleMinimo.value)
            } else {
              risultati.morale = 0
            };
            if (risultati.numeroMassimo === false && risultati.minMorale === false) {risultati.numeroMassimo = true; risultati.n = 200;}

            this.customizedResuts = risultati;
          },
          aggiornaImposatazioniAvanzate: function () {
                this.classe = [];
                this.elemento = [];
                this.debuffs = [];
                this.buffs = [];

                //Raccogli le impostazioni avanzate
                var classi = document.getElementsByName("classe");
                var elemento_checkbox = document.getElementsByName("elemento");
                var debuffs_checkbox = document.getElementsByName("debuff");
                var buffs_checkbox = document.getElementsByName("buff");
                for(var i = 0; i < classi.length; i++)  
                {  
                    if (classi[i].checked) this.classe.push(classi[i].value);
                }; 
                for(var i = 0; i < elemento_checkbox.length; i++)  
                {  
                    if (elemento_checkbox[i].checked) this.elemento.push(elemento_checkbox[i].value);
                }; 
                for(var i = 0; i < debuffs_checkbox.length; i++)  
                {  
                    if (debuffs_checkbox[i].checked) this.debuffs.push(parseInt(debuffs_checkbox[i].value));
                }; 
                for(var i = 0; i < buffs_checkbox.length; i++)  
                {  
                    if (buffs_checkbox[i].checked) this.buffs.push(parseInt(buffs_checkbox[i].value));
                }; 

                if ($('#AoE').is(":checked"))
                {
                    this.AoE = true;
                } else this.AoE = false;

                if ($('#noS1debuffs').is(":checked"))
                {
                    this.noS1debuffs = true;
                } else this.noS1debuffs = false;

                if ($('#noDebuffs').is(":checked"))
                {
                    this.noDebuffs = true;
                } else this.noDebuffs = false;
            },
            impostaLingua: function () {
              var lingua = JSON.parse(localStorage.getItem('Settings') ? localStorage.getItem('Settings') : '{"lingua":"*"}').lingua;
              if (lingua == undefined) lingua = "*";
              try {
                if (lingua === "*") { // detect browser language
                  switch ( (navigator.language || navigator.userLanguage).split("-")[0] ) { // check browser setting and select language
                    case 'it':
                      lingua = "it";
                      break;
                    case 'fr':
                      lingua = "fr";
                      break;
                    case 'de':
                      lingua = "de";
                      break;
                    case 'pt':
                      lingua = "pt";
                      break;
                    case 'es':
                      lingua = "es";
                      break;
                    case 'ja':
                      lingua = "jp";
                      break;
                    case 'ko':
                      lingua = "kr";
                      break;
                    case 'zh':
		      var langCode = navigator.language || navigator.userLanguage;
		      if (langCode === "zh-TW" || langCode === "zh-HK" || langCode === "zh-MO") lingua = "zht"
		      else lingua = "cn";
                      break;
                    default:
                      lingua = "en";
                  };
                };
              } catch (err) {
                lingua = "en"
              };
              this.lingua = lingua;
              
              //change raid map language
              if (this.lingua == "zht") {
                var mapnormal = document.getElementById("map_normal");
                var maphell = document.getElementById("map_hell");
                mapnormal.setAttribute("src", "./img/Raid-Normal_zht.png");               
                maphell.setAttribute("src", "./img/Raid-Hell_zht.png");
                } else if (this.lingua == "cn") {
                var mapnormal = document.getElementById("map_normal");
                var maphell = document.getElementById("map_hell");
                mapnormal.setAttribute("src", "./img/Raid-Normal_zht.png");               
                maphell.setAttribute("src", "./img/Raid-Hell_zht.png");
               } else {
                var mapnormal = document.getElementById("map_normal");
                var maphell = document.getElementById("map_hell");
                mapnormal.setAttribute("src", "./img/Raid-Normal_en.png");               
                maphell.setAttribute("src", "./img/Raid-Hell_en.png");
               }
               
              if (this.lingua == "it") {
                this.strings = {
                  welcome: "Benvenuto",
                  whats_new: "Novità",
                  websites: "Pagine",
                  credits: "Credits",
                  messaggio_di_benvenuto: "Benvenuto su Epic Seven Camp simulator",
                  data_by: "Data by EpicSevenDB",
                  all: "All",
                  sort: "Ordina",
                  modified: "Modifica",
                  name: "Nome",
                  ingame_id: "ID gioco",
                  aggiungi: "Aggiungi eroe",
                  i_tuoi_eroi: "I tuoi eroi",
                  cerca_eroe: "Cerca eroe..",
                  impostazioni_avanzate: "Impostazioni Avanzate",
                  numero_massimo_risultati: "Numero massimo di risultati",
                  morale_minimo_risultati: "Morale minimo",
                  disabilita_immagini_in_risultati: "Disabilita avatar dei personaggi nei risultati (consigliato se si richiedono tanti risultati)",
                  deve_contenere_AoE: "Team deve contenere AoE",
                  no_s1_debuffs: "No S1 Debuffs (Esclusi: Provoke, Sleep, Stun e Poison)",
                  no_debuffs: "No Debuffs (Esclusi: Provoke, Sleep, Stun e Poison)",
                  classe: "Classe",
                  knight: "Knight",
                  warrior: "Warrior",
                  thief: "Thief",
                  ranger: "Ranger",
                  mage: "Mage",
                  "soul-weaver": "Soul Weaver",
                  fire: "Fire",
                  ice: "Ice",
                  earth: "Earth",
                  light: "Light",
                  dark: "Dark",
                  elemento: "Elemento",
                  buff: "Buff",
                  debuff: "Debuff",
                  combinations: "Combinazioni possibili",
                  multilock: "Multi-lock (Cartesian Product)",
                  multilock_slot: "Slot",
                  add_to_slot: "Aggiungi a questo slot",
                  add_selection: "Aggiungi selezionati",
                  possibili_combinazioni: "Combinazioni:",

                  //Results window
                  risultati: "Risultati",
                  morale: "Morale",
                  team: "Team",
                  topics: "Topics",
                  notification_title: "E7 Camp Simulator",
                  notification_ready: "I tuoi team sono pronti!",
                  results_error: "Errore",
                  team_size_exceeded: "Dimensione team superata!",
                  not_enough_heroes: "Nessun eroe rimanente da inserire nei rimanenti slot!",

                  ///Result saving window:
                  camp_name_field: "Nome camp",
                  camp_name_placeholder: "Inserisci il nome del tuo camp",
                  normal: "Normale",
                  hell: "Hell",
                  queen: "Queen",
                  arakahan: "Arakahan",
                  karkanis: "Karkanis",
                  vera: "Vera",
                  juleeve: "Juleeve",
                  save: "Salva",
                  canc_btn: "Annulla",
                  back_btn: "Indietro",
                  error_no_name_provided: "Nome richiesto!",
                  error_name_in_use: "Stai già utilizzando questo nome!",
                  saved_message: "salvato con successo!",
                  deleted_message: "eliminato!",

                  impostazioni: "Impostazioni",
                  my_teams: "Le mie squadre",
                  most_saved_teams: "Squadre più popolari",
                  refresh_team_stats: "Aggiorna",
                  heroes: "Eroi",
                  teams: "Squadre",
                  extras_map: "Miglior percorso",
                  tema_notturno: "Tema notturno",
                  notifiche: "Notifiche",
                  debug_camping_values: "Debug: Mostra i valori delle opzioni",
                  genera_url: "Genera URL",
                  url_usage_help: "Copia e incolla questo URL nel browser o dispositivo desiderato per generare una copia dei tuoi eroi attuali.",
                  copia: "Copia",
                  language: "Lingua"
                };
              } else if (this.lingua == "cn") {
                this.strings = {
                  welcome: "欢迎",
                  whats_new: "更新日志",
                  websites: "实用链接",
                  credits: "作者",
                  messaggio_di_benvenuto: "欢迎使用第七史诗露营模拟器",
                  data_by: "数据来源 EpicSevenDB",
                  all: "全部",
                  sort: "排序",
                  modified: "按添加日期",
                  name: "按英雄名称",
                  ingame_id: "按英雄ID",
                  aggiungi: "添加英雄 ",
                  i_tuoi_eroi: "我的英雄",
                  cerca_eroe: "搜索..",
                  impostazioni_avanzate: "高级设置",
                  numero_massimo_risultati: "显示结果数量",
                  morale_minimo_risultati: "最低心情限制",
                  disabilita_immagini_in_risultati: "结果页不显示英雄头像 (如果你设定的显示结果数量非常大，关闭英雄头像显示有助于提升性能)",
                  deve_contenere_AoE: "队伍必须包含 AoE",
                  no_s1_debuffs: "S1不带Debuff (挑衅, 睡眠, 晕眩 和中毒除外)",
                  no_debuffs: "技能不带Debuff (挑衅, 睡眠, 晕眩 和中毒除外)",
                  classe: "职业",
                  knight: "骑士",
                  warrior: "战士",
                  thief: "盗贼",
                  ranger: "射手",
                  mage: "魔导士",
                  "soul-weaver": "精灵师",
                  fire: "火焰属性",
                  ice: "寒气属性",
                  earth: "自然属性",
                  light: "光明属性",
                  dark: "黑暗属性",
                  elemento: "属性",
                  buff: "Buff",
                  debuff: "Debuff",
                  combinations: "可能的组合",
                  multilock: "锁定多人 (笛卡尔 出品)",
                  multilock_slot: "栏位",
                  add_to_slot: "添加到这个位置",
                  add_selection: "添加",
                  possibili_combinazioni: "可能的组合:",

                  //Results window
                  risultati: "结果",
                  morale: "心情",
                  team: "队伍",
                  topics: "对话",
                  notification_title: "E7 露营模拟器",
                  notification_ready: "结果计算完毕!",
                  results_error: "错误",
                  team_size_exceeded: "队伍人数超过上限!",
                  not_enough_heroes: "所有英雄添加完毕，已无英雄可添加至下一个栏位!",

                  ///Result saving window:
                  camp_name_field: "队伍名称",
                  camp_name_placeholder: "你的队伍名称",
                  normal: "普通",
                  hell: "地狱",
                  queen: "阿吉曼夏洛斯女王",
                  arakahan: "捕食者阿拉哈坎",
                  karkanis: "执行者卡尔卡努斯",
                  vera: "侍从官培拉",
                  juleeve: "乔里夫议会",
                  save: "保存",
                  canc_btn: "取消",
                  back_btn: "返回",
                  error_no_name_provided: "队伍名称不能为空!",
                  error_name_in_use: "该名称已经被使用!",
                  saved_message: "保存成功!",
                  deleted_message: "删除成功!",

                  impostazioni: "设置",
                  my_teams: "我的队伍",
                  most_saved_teams: "常用队伍&英雄",
                  refresh_team_stats: "刷新",
                  heroes: "英雄",
                  teams: "队伍",
                  extras_map: "迷宫最佳路线",

                  tema_notturno: "夜间模式",
                  notifiche: "启用通知",
                  debug_camping_values: "调试: 显示所有对话心情值",
                  genera_url: "生成URL链接",
                  url_usage_help: "复制这个链接到新设备来导入你的英雄列表. <br>设备间并不会自动同步, 如果你修改了英雄列表，下次导入前需要重新生成URL链接.",
                  copia: "复制",
                  language: "语言"
                };
              } else if (this.lingua == "zht") {
                this.strings = {
                  welcome: "歡迎",
                  whats_new: "更新日誌",
                  websites: "實用鏈接",
                  credits: "作者",
                  messaggio_di_benvenuto: "歡迎使用第七史詩露營模擬器",
                  data_by: "數據來源 EpicSevenDB",
                  all: "全部",
                  sort: "排序",
                  modified: "按添加日期",
                  name: "按英雄名稱",
                  ingame_id: "按英雄ID",
                  aggiungi: "添加英雄 ",
                  i_tuoi_eroi: "我的英雄",
                  cerca_eroe: "搜索..",
                  impostazioni_avanzate: "高級設定",
                  numero_massimo_risultati: "顯示結果數量",
                  morale_minimo_risultati: "最低心情限制",
                  disabilita_immagini_in_risultati: "結果頁不顯示英雄頭像 (如果你設定的顯示結果數量非常大，關閉英雄頭像顯示有助於提升性能)",
                  deve_contenere_AoE: "隊伍必須包含 AoE",
                  no_s1_debuffs: "S1不帶Debuff (挑釁, 睡眠，暈眩 和中毒除外)",
                  no_debuffs: "技能不帶Debuff (挑釁, 睡眠，暈眩 和中毒除外)",
                  classe: "職階",
                  knight: "騎士",
                  warrior: "戰士",
                  thief: "盜賊",
                  ranger: "射手",
                  mage: "魔導士",
                  "soul-weaver": "精靈師",
                  fire: "火焰屬性",
                  ice: "寒氣屬性",
                  earth: "自然屬性",
                  light: "光明屬性",
                  dark: "黑暗屬性",
                  elemento: "屬性",
                  buff: "Buff",
                  debuff: "Debuff",
                  combinations: "可能的組合",
                  multilock: "鎖定多人 (笛卡兒 出品)",
                  multilock_slot: "欄位",
                  add_to_slot: "添加到這個位置",
                  add_selection: "添加",
                  possibili_combinazioni: "可能的組合:",

                  //Results window
                  risultati: "結果",
                  morale: "心情",
                  team: "隊伍",
                  topics: "對話",
                  notification_title: "E7 露營模擬器",
                  notification_ready: "結果計算完畢!",
                  results_error: "錯誤",
                  team_size_exceeded: "隊伍人數超過上限!",
                  not_enough_heroes: "所有英雄添加完畢，已無英雄可添加至下一個欄位!",

                  ///Result saving window:
                  camp_name_field: "隊伍名稱",
                  camp_name_placeholder: "你的隊伍名稱",
                  normal: "普通",
                  hell: "地獄",
                  queen: "阿吉曼夏洛斯女王",
                  arakahan: "捕食者阿拉哈坎",
                  karkanis: "執行者卡爾卡努斯",
                  vera: "侍從官培拉",
                  juleeve: "喬裏夫議會",
                  save: "保存",
                  canc_btn: "取消",
                  back_btn: "返回",
                  error_no_name_provided: "隊伍名稱不能為空!",
                  error_name_in_use: "該名稱已經被使用!",
                  saved_message: "保存成功!",
                  deleted_message: "刪除成功!",

                  impostazioni: "設定",
                  my_teams: "我的隊伍",
                  most_saved_teams: "常用隊伍&英雄",
                  refresh_team_stats: "刷新",
                  heroes: "英雄",
                  teams: "隊伍",
                  extras_map: "迷宮最佳路線",

                  tema_notturno: "夜間模式",
                  notifiche: "啟用通知",
                  debug_camping_values: "調試: 顯示所有對話心情值",
                  genera_url: "生成URL鏈接",
                  url_usage_help: "復制這個鏈接到新設備來導入你的英雄列表. <br>設備間並不會自動同步, 如果你修改了英雄列表，下次導入前需要重新生成URL鏈接.",
                  copia: "復制",
                  language: "語言"
                };
              }else if (this.lingua == "fr") {
                this.strings = {
                  welcome: "Bienvenue",
                  whats_new: "Quoi de neuf",
                  websites: "Sites web",
                  credits: "Crédits",
                  messaggio_di_benvenuto: "Bienvenue à E7 Camp Simulateur",
                  data_by: "Source EpicSevenDB",
                  all: "Tous",
                  sort: "Trier par",
                  modified: "Date",
                  name: "Nom",
                  ingame_id: "ID",
                  aggiungi: "Ajouter un héro ",
                  i_tuoi_eroi: "Votre héros",
                  cerca_eroe: "Rechercher..",
                  impostazioni_avanzate: "Paramètre avancé",
                  numero_massimo_risultati: "Nombre maximum de résultats de camping",
                  morale_minimo_risultati: "Minimum morale",
                  disabilita_immagini_in_risultati: "Désactiver l'avatar du héro dans l'écran des résultats (Améliorer les performances si vous demandez trop de résultats)",
                  deve_contenere_AoE: "Equipe doit contenir AoE",
                  no_s1_debuffs: "S1 sans Debuff (Sauf: Provoquer, Sommeil, Etourdir et Poison)",
                  no_debuffs: "Non Debuff (Sauf: Provoquer, Sommeil, Etourdir et Poison)",
                  classe: "Classe",
                  elemento: "Elément",
                  buff: "Buff",
                  debuff: "Debuff",
                  combinations: "Combinaisons",
                  multilock: "Verrouillage multi",
                  multilock_slot: "Slot",
                  add_to_slot: "Ajouter dans ce slot",
                  add_selection: "Ajouter",
                  possibili_combinazioni: "Combinaisons possibles:",

                  //Results window
                  risultati: "Résultat",
                  morale: "Morale",
                  team: "Equipe",
                  topics: "Conversations",
                  notification_title: "E7 Camp Simulateur",
                  notification_ready: "Calcul terminé!",
                  results_error: "Erreur",
                  team_size_exceeded: "Le nombre maximum de héros dans l'équipe dépassé!",
                  not_enough_heroes: "Il n'y aura plus de héro disponible pour la prochaine slot!",

                  ///Result saving window:
                  camp_name_field: "Nom",
                  camp_name_placeholder: "Nom de votre equipe",
                  normal: "Normal",
                  hell: "Hell",
                  queen: "La Reine",
                  arakahan: "Arakahan",
                  karkanis: "Karkanis",
                  vera: "Vera",
                  juleeve: "Juleeve",
                  save: "Sauvgarde",
                  canc_btn: "Annuler",
                  back_btn: "Retour",
                  error_no_name_provided: "Le nom ne peut pas être vide!",
                  error_name_in_use: "Ce nom est déjà pris!",
                  saved_message: "Sauvgardée!",
                  deleted_message: "Supprimée!",

                  impostazioni: "Paramètres",
                  my_teams: "Mes équipes",
                  most_saved_teams: "Équipes & Héros les plus utilisés",
                  refresh_team_stats: "Rafraîchir",
                  heroes: "Héros",
                  teams: "Équipes",
                  extras_map: "Meilleur itinéraire pour Raid hell",

                  tema_notturno: "Mode nuit",
                  notifiche: "Notification",
                  debug_camping_values: "Debug: Afficher tous les valeurs de conversation",
                  genera_url: "Générer une URL",
                  url_usage_help: "Copiez et collez cette URL sur un nouvel appareil ou navigateur pour générer une copie de votre liste de héros actuelle. <br>Les modifications ne sont pas synchronisées, si vous changez votre liste, vous devrez générer une nouvelle URL.",
                  copia: "Copier",
                  language: "Langue"
                };
              } else {
                //this.lingua = "en";
                this.strings = {
                  welcome: "Welcome",
                  whats_new: "What's new",
                  websites: "Websites",
                  credits: "Credits",
                  messaggio_di_benvenuto: "Welcome to Epic Seven Camp simulator",
                  data_by: "Data by EpicSevenDB",
                  all: "All",
                  sort: "Sort by",
                  modified: "Date",
                  name: "Name",
                  ingame_id: "In-game ID",
                  aggiungi: "Add hero ",
                  i_tuoi_eroi: "Your heroes",
                  cerca_eroe: "Search..",
                  impostazioni_avanzate: "Advanced settings",
                  numero_massimo_risultati: "Maximum number of camping results",
                  morale_minimo_risultati: "Minimum morale",
                  disabilita_immagini_in_risultati: "Disable character's avatar in results screen (better performance for your browser if you request too many results)",
                  deve_contenere_AoE: "Team must have AoE",
                  no_s1_debuffs: "No S1 Debuffs (Except: Provoke, Sleep, Stun and Poison)",
                  no_debuffs: "No Debuffs (Except: Provoke, Sleep, Stun and Posion)",
                  classe: "Class",
                  knight: "Knight",
                  warrior: "Warrior",
                  thief: "Thief",
                  ranger: "Ranger",
                  mage: "Mage",
                  "soul-weaver": "Soul Weaver",
                  fire: "Fire",
                  ice: "Ice",
                  earth: "Earth",
                  light: "Light",
                  dark: "Dark",
                  elemento: "Element",
                  buff: "Buff",
                  debuff: "Debuff",
                  combinations: "Possible combinations",
                  multilock: "Multi-lock (Cartesian Product)",
                  multilock_slot: "Slot",
                  add_to_slot: "Add to this slot",
                  add_selection: "Add selection",
                  possibili_combinazioni: "Combinations:",

                  //Results window
                  risultati: "Results",
                  morale: "Morale",
                  team: "Team",
                  topics: "Topics",
                  notification_title: "E7 Camp Simulator",
                  notification_ready: "Your results are ready!",
                  results_error: "Error",
                  team_size_exceeded: "Team size exceeded!",
                  not_enough_heroes: "No heroes to fill the remaining slots!",

                  ///Result saving window:
                  camp_name_field: "Camp name",
                  camp_name_placeholder: "Your camp's name",
                  normal: "Normal",
                  hell: "Hell",
                  queen: "Queen",
                  arakahan: "Arakahan",
                  karkanis: "Karkanis",
                  vera: "Vera",
                  juleeve: "Juleeve",
                  save: "Save",
                  canc_btn: "Cancel",
                  back_btn: "Back",
                  error_no_name_provided: "Name is required!",
                  error_name_in_use: "You are already using this name!",
                  saved_message: "saved successfully!",
                  deleted_message: "deleted!",

                  impostazioni: "Settings",
                  my_teams: "My teams",
                  most_saved_teams: "Most common teams",
                  refresh_team_stats: "Refresh",
                  heroes: "Heroes",
                  teams: "Teams",
                  extras_map: "Best hell raid route",

                  tema_notturno: "Night theme",
                  notifiche: "Enable notifications",
                  debug_camping_values: "Debug: Display camping values",
                  genera_url: "Generate URL",
                  url_usage_help: "Copy and paste this URL to a new device or browser to generate a copy of your current roster. <br>Changes are not synchronized, if you change your roster you will have to generate a new URL.",
                  copia: "Copy",
                  language: "Language"
                };
              };


              if (this.lingua == "fr") {
                this.buffList["stic_debuf_impossible"].name = "Immunité";
                this.buffList["stic_att_up"].name = "Attaque augmentée";
                this.buffList["stic_att_up2"].name = "Attaque augmentée (sup.)";
                this.buffList["stic_def_up"].name = "Augmentation de défense";
                this.buffList["stic_speed_up"].name = "Vitesse augmentée";
                this.buffList["stic_dodge_up"].name = "Esquive augmentée";
                this.buffList["stic_protect"].name = "Barrière";
                this.buffList["stic_cri_up"].name = "Augm. Chances Coup Crit.";
                this.buffList["stic_cridmg_up"].name = "Augm. Dégâts Coup Crit.";
                this.buffList["stic_crires_up"].name = "Résistance Coups Critiques";
                this.buffList["stic_invincible"].name = "Invincibilité";
                this.buffList["stic_endure"].name = "Annulateur de compétence";
                this.buffList["stic_heal"].name = "Soin continu";
                this.buffList["stic_hide"].name = "Furtivité";
                this.buffList["stic_immortality"].name = "Immortalité";
                this.buffList["stic_reflect"].name = "Réflexion";
                this.buffList["stic_counter"].name = "Contre-attaque";

                this.debuffList["stic_def_dn"].name = "Réduction de la défense";
                this.debuffList["stic_speed_dn"].name = "Vitesse réduite";
                this.debuffList["stic_att_dn"].name = "Réduction de l'attaque";
                this.debuffList["stic_blind"].name = "Réduc. Chances Coup réussi";
                this.debuffList["stic_target"].name = "Cible";
                this.debuffList["stic_buf_impossible"].name = "Bonus impossible";
                this.debuffList["stic_heal_impossible"].name = "Inguérissable";
                this.debuffList["stic_stun"].name = "Étourdissement";
                this.debuffList["stic_provoke"].name = "Provocation";
                this.debuffList["stic_silence"].name = "Silence";
                this.debuffList["stic_sleep"].name = "Sommeil";
                this.debuffList["stic_blood"].name = "Hémorragie";
                this.debuffList["stic_dot"].name = "Poison";
                this.debuffList["stic_blaze"].name = "Brûlure";
                this.debuffList["stic_vampire"].name = "Toucher vampirique";
                this.debuffList["stic_bomb"].name = "Bombe";

                this.strings["knight"] = "Chevalier";
                this.strings["warrior"] = "Guerrier";
                this.strings["thief"] = "Assassin";
                this.strings["ranger"] = "Tireur";
                this.strings["mage"] = "Mage";
                this.strings["soul-weaver"] = "Tisseur d'âme";
                this.strings["fire"] = "Feu";
                this.strings["ice"] = "Glace";
                this.strings["earth"] = "Terre";
                this.strings["light"] = "Lumière";
                this.strings["dark"] = "Ténèbres";
              } else if (this.lingua == "jp") {
                this.buffList["stic_debuf_impossible"].name = "弱体効果免疫";
                this.buffList["stic_att_up"].name = "攻撃力UP";
                this.buffList["stic_att_up2"].name = "攻撃力UP(大)";
                this.buffList["stic_def_up"].name = "防御力UP";
                this.buffList["stic_speed_up"].name = "スピードUP";
                this.buffList["stic_dodge_up"].name = "回避率UP";
                this.buffList["stic_protect"].name = "シールド";
                this.buffList["stic_cri_up"].name = "クリティカル発生率UP";
                this.buffList["stic_cridmg_up"].name = "クリティカルダメージUP";
                this.buffList["stic_crires_up"].name = "クリティカル抵抗率UP";
                this.buffList["stic_invincible"].name = "無敵";
                this.buffList["stic_endure"].name = "スキルダメージ無効";
                this.buffList["stic_heal"].name = "持続回復";
                this.buffList["stic_hide"].name = "潜伏";
                this.buffList["stic_immortality"].name = "不死";
                this.buffList["stic_reflect"].name = "反射";
                this.buffList["stic_counter"].name = "反撃";

                this.debuffList["stic_def_dn"].name = "防御力DOWN";
                this.debuffList["stic_speed_dn"].name = "スピードDOWN";
                this.debuffList["stic_att_dn"].name = "攻撃力DOWN";
                this.debuffList["stic_blind"].name = "命中率DOWN";
                this.debuffList["stic_target"].name = "標的";
                this.debuffList["stic_buf_impossible"].name = "強化不可";
                this.debuffList["stic_heal_impossible"].name = "回復不可";
                this.debuffList["stic_stun"].name = "スタン";
                this.debuffList["stic_provoke"].name = "挑発";
                this.debuffList["stic_silence"].name = "沈黙";
                this.debuffList["stic_sleep"].name = "睡眠";
                this.debuffList["stic_blood"].name = "出血";
                this.debuffList["stic_dot"].name = "毒";
                this.debuffList["stic_blaze"].name = "火傷";
                this.debuffList["stic_vampire"].name = "吸血";
                this.debuffList["stic_bomb"].name = "爆弾";

                this.strings["knight"] = "ナイト";
                this.strings["warrior"] = "ウォリアー";
                this.strings["thief"] = "アサシン";
                this.strings["ranger"] = "アーチャー";
                this.strings["mage"] = "メイジ";
                this.strings["soul-weaver"] = "プリースト";
                this.strings["fire"] = "火属性";
                this.strings["ice"] = "氷属性";
                this.strings["earth"] = "木属性";
                this.strings["light"] = "光属性";
                this.strings["dark"] = "闇属性";
              } else if (this.lingua == "kr") {
                this.buffList["stic_debuf_impossible"].name = "면역";
                this.buffList["stic_att_up"].name = "공격력 증가";
                this.buffList["stic_att_up2"].name = "공격력 증가 (대)";
                this.buffList["stic_def_up"].name = "방어력 증가";
                this.buffList["stic_speed_up"].name = "속도 증가";
                this.buffList["stic_dodge_up"].name = "회피 증가";
                this.buffList["stic_protect"].name = "보호막";
                this.buffList["stic_cri_up"].name = "치명확률 증가";
                this.buffList["stic_cridmg_up"].name = "치명피해 증가";
                this.buffList["stic_crires_up"].name = "치명저항 증가";
                this.buffList["stic_invincible"].name = "무적";
                this.buffList["stic_endure"].name = "스킬 대미지 무효";
                this.buffList["stic_heal"].name = "지속 회복";
                this.buffList["stic_hide"].name = "은신";
                this.buffList["stic_immortality"].name = "불사";
                this.buffList["stic_reflect"].name = "반사";
                this.buffList["stic_counter"].name = "반격";

                this.debuffList["stic_def_dn"].name = "방어력 감소";
                this.debuffList["stic_speed_dn"].name = "속도 감소";
                this.debuffList["stic_att_dn"].name = "공격력 감소";
                this.debuffList["stic_blind"].name = "명중 감소";
                this.debuffList["stic_target"].name = "표적";
                this.debuffList["stic_buf_impossible"].name = "강화 불가";
                this.debuffList["stic_heal_impossible"].name = "회복 불가";
                this.debuffList["stic_stun"].name = "기절";
                this.debuffList["stic_provoke"].name = "도발";
                this.debuffList["stic_silence"].name = "침묵";
                this.debuffList["stic_sleep"].name = "수면";
                this.debuffList["stic_blood"].name = "출혈";
                this.debuffList["stic_dot"].name = "중독";
                this.debuffList["stic_blaze"].name = "화상";
                this.debuffList["stic_vampire"].name = "흡혈의 손길";
                this.debuffList["stic_bomb"].name = "폭탄";

                this.strings["knight"] = "기사";
                this.strings["warrior"] = "전사";
                this.strings["thief"] = "도적";
                this.strings["ranger"] = "사수";
                this.strings["mage"] = "마도사";
                this.strings["soul-weaver"] = "정령사";
                this.strings["fire"] = "화염속성";
                this.strings["ice"] = "냉기속성";
                this.strings["earth"] = "자연속성";
                this.strings["light"] = "광속성";
                this.strings["dark"] = "암속성";
              } else if (lingua == "cn") {
                this.buffList["stic_debuf_impossible"].name = "免疫";
                this.buffList["stic_att_up"].name = "攻击力增加";
                this.buffList["stic_att_up2"].name = "攻击力大幅增加";
                this.buffList["stic_def_up"].name = "防御力增加";
                this.buffList["stic_speed_up"].name = "速度提升";
                this.buffList["stic_dodge_up"].name = "增加回避";
                this.buffList["stic_protect"].name = "防护罩";
                this.buffList["stic_cri_up"].name = "暴击率增加";
                this.buffList["stic_cridmg_up"].name = "增加暴击伤害";
                this.buffList["stic_crires_up"].name = "暴击抗性增加";
                this.buffList["stic_invincible"].name = "无敌";
                this.buffList["stic_endure"].name = "技能伤害无效";
                this.buffList["stic_heal"].name = "持续恢复";
                this.buffList["stic_hide"].name = "隐身";
                this.buffList["stic_immortality"].name = "不死";
                this.buffList["stic_reflect"].name = "反射";
                this.buffList["stic_counter"].name = "反击";

                this.debuffList["stic_def_dn"].name = "防御力减少";
                this.debuffList["stic_speed_dn"].name = "速度下降";
                this.debuffList["stic_att_dn"].name = "攻击力减少";
                this.debuffList["stic_blind"].name = "命中减少";
                this.debuffList["stic_target"].name = "标靶";
                this.debuffList["stic_buf_impossible"].name = "无法强化";
                this.debuffList["stic_heal_impossible"].name = "无法恢复";
                this.debuffList["stic_stun"].name = "晕眩";
                this.debuffList["stic_provoke"].name = "挑衅";
                this.debuffList["stic_silence"].name = "沉默";
                this.debuffList["stic_sleep"].name = "睡眠";
                this.debuffList["stic_blood"].name = "出血";
                this.debuffList["stic_dot"].name = "中毒";
                this.debuffList["stic_blaze"].name = "烧伤";
                this.debuffList["stic_vampire"].name = "吸血之手";
                this.debuffList["stic_bomb"].name = "炸弹";
              } else if (lingua == "zht") {
                this.buffList["stic_debuf_impossible"].name = "免疫";
                this.buffList["stic_att_up"].name = "攻擊力增加";
                this.buffList["stic_att_up2"].name = "攻擊力大幅增加";
                this.buffList["stic_def_up"].name = "防禦力增加";
                this.buffList["stic_speed_up"].name = "速度提升";
                this.buffList["stic_dodge_up"].name = "增加迴避";
                this.buffList["stic_protect"].name = "防護罩";
                this.buffList["stic_cri_up"].name = "暴擊率增加";
                this.buffList["stic_cridmg_up"].name = "增加暴擊傷害";
                this.buffList["stic_crires_up"].name = "暴擊抗性增加";
                this.buffList["stic_invincible"].name = "無敵";
                this.buffList["stic_endure"].name = "技能傷害無效";
                this.buffList["stic_heal"].name = "持續恢復";
                this.buffList["stic_hide"].name = "隱身";
                this.buffList["stic_immortality"].name = "不死";
                this.buffList["stic_reflect"].name = "反射";
                this.buffList["stic_counter"].name = "反擊";

                this.debuffList["stic_def_dn"].name = "防禦力減少";
                this.debuffList["stic_speed_dn"].name = "速度下降";
                this.debuffList["stic_att_dn"].name = "攻擊力減少";
                this.debuffList["stic_blind"].name = "命中減少";
                this.debuffList["stic_target"].name = "標靶";
                this.debuffList["stic_buf_impossible"].name = "無法強化";
                this.debuffList["stic_heal_impossible"].name = "無法恢復";
                this.debuffList["stic_stun"].name = "暈眩";
                this.debuffList["stic_provoke"].name = "挑釁";
                this.debuffList["stic_silence"].name = "沉默";
                this.debuffList["stic_sleep"].name = "睡眠";
                this.debuffList["stic_blood"].name = "出血";
                this.debuffList["stic_dot"].name = "中毒";
                this.debuffList["stic_blaze"].name = "燒傷";
                this.debuffList["stic_vampire"].name = "吸血之手";
                this.debuffList["stic_bomb"].name = "炸彈";
              } else if (lingua == "es") {
                this.buffList["stic_debuf_impossible"].name = "Inmunidad";
                this.buffList["stic_att_up"].name = "Aumenta el ataque";
                this.buffList["stic_att_up2"].name = "Aumenta el ataque (mayor)";
                this.buffList["stic_def_up"].name = "Aumenta la defensa";
                this.buffList["stic_speed_up"].name = "Aumenta la velocidad";
                this.buffList["stic_dodge_up"].name = "Aumenta la evasión";
                this.buffList["stic_protect"].name = "Barrera";
                this.buffList["stic_cri_up"].name = "Aumenta la probabilidad de golpe crítico";
                this.buffList["stic_cridmg_up"].name = "Aumenta el daño de golpe crítico";
                this.buffList["stic_crires_up"].name = "Aumenta la resistencia a golpes críticos";
                this.buffList["stic_invincible"].name = "Invencible";
                this.buffList["stic_endure"].name = "Anulador de habilidades";
                this.buffList["stic_heal"].name = "Curación continua";
                this.buffList["stic_hide"].name = "Sigilo";
                this.buffList["stic_immortality"].name = "Inmortalidad";
                this.buffList["stic_reflect"].name = "Reflejar";
                this.buffList["stic_counter"].name = "Contraataque";

                this.debuffList["stic_def_dn"].name = "Disminuye la defensa";
                this.debuffList["stic_speed_dn"].name = "Disminuye la velocidad";
                this.debuffList["stic_att_dn"].name = "Disminuye el ataque";
                this.debuffList["stic_blind"].name = "Disminuir probabilidad de golpe";
                this.debuffList["stic_target"].name = "Blanco";
                this.debuffList["stic_buf_impossible"].name = "No se puede potenciar";
                this.debuffList["stic_heal_impossible"].name = "Incurable";
                this.debuffList["stic_stun"].name = "Aturdimiento";
                this.debuffList["stic_provoke"].name = "Provocación";
                this.debuffList["stic_silence"].name = "Silencio";
                this.debuffList["stic_sleep"].name = "Sueño";
                this.debuffList["stic_blood"].name = "Hemorragia";
                this.debuffList["stic_dot"].name = "Veneno";
                this.debuffList["stic_blaze"].name = "Quemadura";
                this.debuffList["stic_vampire"].name = "Toque vampírico";
                this.debuffList["stic_bomb"].name = "Bomba";
              } else if (lingua == "pt") {
                this.buffList["stic_debuf_impossible"].name = "Imune";
                this.buffList["stic_att_up"].name = "Aumentar Ataque";
                this.buffList["stic_att_up2"].name = "Aumentar Ataque (Superior)";
                this.buffList["stic_def_up"].name = "Aumentar Defesa";
                this.buffList["stic_speed_up"].name = "Aumentar Velocidade";
                this.buffList["stic_dodge_up"].name = "Aumentar Evasão";
                this.buffList["stic_protect"].name = "Barreira";
                this.buffList["stic_cri_up"].name = "Aumentar Chance de Crítico";
                this.buffList["stic_cridmg_up"].name = "Aumentar Dano Crítico";
                this.buffList["stic_crires_up"].name = "Aumentar Resistência a Crítico";
                this.buffList["stic_invincible"].name = "Invencível";
                this.buffList["stic_endure"].name = "Anulador de Habilidades";
                this.buffList["stic_heal"].name = "Cura Contínua";
                this.buffList["stic_hide"].name = "Furtividade";
                this.buffList["stic_immortality"].name = "Imortal";
                this.buffList["stic_reflect"].name = "Refletir";
                this.buffList["stic_counter"].name = "Contra-Ataque";

                this.debuffList["stic_def_dn"].name = "Diminuir Defesa";
                this.debuffList["stic_speed_dn"].name = "Diminuir Velocidade";
                this.debuffList["stic_att_dn"].name = "Diminuir Ataque";
                this.debuffList["stic_blind"].name = "Diminuir Chance de Acerto";
                this.debuffList["stic_target"].name = "Alvo";
                this.debuffList["stic_buf_impossible"].name = "Bloqueio de Reforço";
                this.debuffList["stic_heal_impossible"].name = "Incurável";
                this.debuffList["stic_stun"].name = "Atordoamento";
                this.debuffList["stic_provoke"].name = "Provocação";
                this.debuffList["stic_silence"].name = "Silêncio";
                this.debuffList["stic_sleep"].name = "Dormindo";
                this.debuffList["stic_blood"].name = "Sangramento";
                this.debuffList["stic_dot"].name = "Veneno";
                this.debuffList["stic_blaze"].name = "Queimar";
                this.debuffList["stic_vampire"].name = "Toque Vampiresco";
                this.debuffList["stic_bomb"].name = "Bomba";
              } else if (lingua == "de") {
                this.buffList["stic_debuf_impossible"].name = "Immun";
                this.buffList["stic_att_up"].name = "Angriff erhöhen";
                this.buffList["stic_att_up2"].name = "Angriff erhöhen (stark)";
                this.buffList["stic_def_up"].name = "Verteidigung erhöhen";
                this.buffList["stic_speed_up"].name = "Geschwindigkeit erhöhen";
                this.buffList["stic_dodge_up"].name = "Ausweichen erhöhen";
                this.buffList["stic_protect"].name = "Barriere";
                this.buffList["stic_cri_up"].name = "Kritische Trefferquote erhöhen";
                this.buffList["stic_cridmg_up"].name = "Kritischen Schaden erhöhen";
                this.buffList["stic_crires_up"].name = "Kritischen Widerstand erhöhen";
                this.buffList["stic_invincible"].name = "Unbesiegbar";
                this.buffList["stic_endure"].name = "Fertigkeit-Aufhebung";
                this.buffList["stic_heal"].name = "Kontinuierliche Heilung";
                this.buffList["stic_hide"].name = "Tarnung";
                this.buffList["stic_immortality"].name = "Unsterblich";
                this.buffList["stic_reflect"].name = "Reflektieren";
                this.buffList["stic_counter"].name = "Gegenangriff";

                this.debuffList["stic_def_dn"].name = "Verteidigung verringern";
                this.debuffList["stic_speed_dn"].name = "Geschwindigkeit verringern";
                this.debuffList["stic_att_dn"].name = "Angriff verringern";
                this.debuffList["stic_blind"].name = "Trefferquote verringern";
                this.debuffList["stic_target"].name = "Ziel";
                this.debuffList["stic_buf_impossible"].name = "Buffblockade";
                this.debuffList["stic_heal_impossible"].name = "Unheilbar";
                this.debuffList["stic_stun"].name = "Betäubung";
                this.debuffList["stic_provoke"].name = "Provozieren";
                this.debuffList["stic_silence"].name = "Stille";
                this.debuffList["stic_sleep"].name = "Schlaf";
                this.debuffList["stic_blood"].name = "Bluten";
                this.debuffList["stic_dot"].name = "Gift";
                this.debuffList["stic_blaze"].name = "Verbrennen";
                this.debuffList["stic_vampire"].name = "Vampirische Berührung";
                this.debuffList["stic_bomb"].name = "Bombe";
              } else { // eng or ita
                this.buffList["stic_debuf_impossible"].name = "Immunity";
                this.buffList["stic_att_up"].name = "Attack up";
                this.buffList["stic_att_up2"].name = "Attack up (Greater)";
                this.buffList["stic_def_up"].name = "Defense up";
                this.buffList["stic_speed_up"].name = "Speed up";
                this.buffList["stic_dodge_up"].name = "Evasion";
                this.buffList["stic_protect"].name = "Barrier";
                this.buffList["stic_cri_up"].name = "Crit chance up";
                this.buffList["stic_cridmg_up"].name = "Crit damage up";
                this.buffList["stic_crires_up"].name = "Crit Resistance";
                this.buffList["stic_invincible"].name = "Invincibility";
                this.buffList["stic_endure"].name = "Skill nullifier";
                this.buffList["stic_heal"].name = "Continuous Healing";
                this.buffList["stic_hide"].name = "Stealth";
                this.buffList["stic_immortality"].name = "Immortality";
                this.buffList["stic_reflect"].name = "Reflect";
                this.buffList["stic_counter"].name = "Counter";

                this.debuffList["stic_def_dn"].name = "Def down";
                this.debuffList["stic_speed_dn"].name = "Speed down";
                this.debuffList["stic_att_dn"].name = "Attack down";
                this.debuffList["stic_blind"].name = "Blind";
                this.debuffList["stic_target"].name = "Target";
                this.debuffList["stic_buf_impossible"].name = "Unbuffable";
                this.debuffList["stic_heal_impossible"].name = "Unhealable";
                this.debuffList["stic_stun"].name = "Stun";
                this.debuffList["stic_provoke"].name = "Provoke";
                this.debuffList["stic_silence"].name = "Silence";
                this.debuffList["stic_sleep"].name = "Sleep";
                this.debuffList["stic_blood"].name = "Bleed";
                this.debuffList["stic_dot"].name = "Poison";
                this.debuffList["stic_blaze"].name = "Burn";
                this.debuffList["stic_vampire"].name = "Vampire";
                this.debuffList["stic_bomb"].name = "Bomb";
              };
            },
      translateTopics: function (n) {
          if (this.lingua == "jp") {
            switch (n) {
              case 'Criticism':
                return '世界批判';
                break;
              case 'Reality Check':
                return '現実的な話題';
                break;
              case 'Heroic Tale':
                return '武勇伝';
                break;
              case 'Comforting Cheer':
                return '励まし';
                break;
              case 'Cute Cheer':
                return '応援';
                break;
              case 'Heroic Cheer':
                return '英雄応援';
                break;
              case 'Sad Memory':
                return '悲しい思い出';
                break;
              case 'Joyful Memory':
                return '楽しい思い出';
                break;
              case 'Happy Memory':
                return '幸せな思い出';
                break;
              case 'Unique Comment':
                return '不思議ちゃん';
                break;
              case 'Self-Indulgent':
                return '自己愛';
                break;
              case 'Occult':
                return 'オカルト';
                break;
              case 'Myth':
                return '神話';
                break;
              case 'Bizarre Story':
                return '猟奇的な話';
                break;
              case 'Food Story':
                return 'グルメ';
                break;
              case 'Horror Story':
                return 'ホラー';
                break;
              case 'Gossip':
                return 'ゴシップ';
                break;
              case 'Dream':
                return '夢';
                break;
              case 'Advice':
                return '悩み相談';
                break;
              case 'Complain':
                return '愚痴';
                break;
              case 'Belief':
                return '信念';
                break;
              case 'Interesting Story':
                return '冒険話';
                break;
              default:
                return n;
                break;
            };
          } else if (this.lingua == "cn") {
            switch (n) {
              case 'Criticism':
                return '批判世界';
                break;
              case 'Reality Check':
                return '正视现实';
                break;
              case 'Heroic Tale':
                return '英雄故事';
                break;
              case 'Comforting Cheer':
                return '安慰助阵';
                break;
              case 'Cute Cheer':
                return '撒娇助阵';
                break;
              case 'Heroic Cheer':
                return '英雄式助阵';
                break;
              case 'Sad Memory':
                return '伤心回忆';
                break;
              case 'Joyful Memory':
                return '愉快回忆';
                break;
              case 'Happy Memory':
                return '幸福回忆';
                break;
              case 'Unique Comment':
                return '4次元的发言';
                break;
              case 'Self-Indulgent':
                return '自我陶醉';
                break;
              case 'Occult':
                return '秘术';
                break;
              case 'Myth':
                return '神话';
                break;
              case 'Bizarre Story':
                return '猎奇的故事';
                break;
              case 'Food Story':
                return '食物故事';
                break;
              case 'Horror Story':
                return '恐怖故事';
                break;
              case 'Gossip':
                return '八卦';
                break;
              case 'Dream':
                return '梦';
                break;
              case 'Advice':
                return '烦恼谘询';
                break;
              case 'Complain':
                return '耍赖';
                break;
              case 'Belief':
                return '信念';
                break;
              case 'Interesting Story':
                return '冒险故事';
                break;
              default:
                return n;
                break;
            };
          } else if (this.lingua == "zht") {
            switch (n) {
              case 'Criticism':
                return '批判世界';
                break;
              case 'Reality Check':
                return '正視現實';
                break;
              case 'Heroic Tale':
                return '英雄故事';
                break;
              case 'Comforting Cheer':
                return '安慰助陣';
                break;
              case 'Cute Cheer':
                return '撒嬌助陣';
                break;
              case 'Heroic Cheer':
                return '英雄式助陣';
                break;
              case 'Sad Memory':
                return '傷心回憶';
                break;
              case 'Joyful Memory':
                return '愉快回憶';
                break;
              case 'Happy Memory':
                return '幸福回憶';
                break;
              case 'Unique Comment':
                return '4次元的發言';
                break;
              case 'Self-Indulgent':
                return '自我陶醉';
                break;
              case 'Occult':
                return '秘術';
                break;
              case 'Myth':
                return '神話';
                break;
              case 'Bizarre Story':
                return '獵奇的故事';
                break;
              case 'Food Story':
                return '食物故事';
                break;
              case 'Horror Story':
                return '恐怖故事';
                break;
              case 'Gossip':
                return '八卦';
                break;
              case 'Dream':
                return '夢';
                break;
              case 'Advice':
                return '煩惱諮詢';
                break;
              case 'Complain':
                return '耍賴';
                break;
              case 'Belief':
                return '信念';
                break;
              case 'Interesting Story':
                return '冒險故事';
                break;
              default:
                return n;
                break;
            };
          } else if (this.lingua == "fr") {
            switch (n) {
              case 'Criticism':
                return 'Critique';
                break;
              case 'Reality Check':
                return 'Rappel à la réalité';
                break;
              case 'Heroic Tale':
                return 'Histoire héroïque';
                break;
              case 'Comforting Cheer':
                return 'Encouragement consolant';
                break;
              case 'Cute Cheer':
                return 'Encouragement adorable';
                break;
              case 'Heroic Cheer':
                return 'Encouragement héroïque';
                break;
              case 'Sad Memory':
                return 'Souvenir triste';
                break;
              case 'Joyful Memory':
                return 'Souvenir joyeux';
                break;
              case 'Happy Memory':
                return 'Souvenir heureux';
                break;
              case 'Unique Comment':
                return 'Commentaire particulier';
                break;
              case 'Self-Indulgent':
                return 'Complaisant';
                break;
              case 'Occult':
                return 'Occulte';
                break;
              case 'Myth':
                return 'Mythe';
                break;
              case 'Bizarre Story':
                return 'Histoire bizarre';
                break;
              case 'Food Story':
                return 'Histoire appétissante';
                break;
              case 'Horror Story':
                return 'Histoire lugubre';
                break;
              case 'Gossip':
                return 'Potin';
                break;
              case 'Dream':
                return 'Rêve';
                break;
              case 'Advice':
                return 'Conseil';
                break;
              case 'Complain':
                return 'Plainte';
                break;
              case 'Belief':
                return 'Croyance';
                break;
              case 'Interesting Story':
                return 'Anecdote';
                break;
              default:
                return n;
                break;
            };

          } else if (this.lingua == "kr") {
            switch (n) {
              case 'Criticism':
                return '세계 비판';
                break;
              case 'Reality Check':
                return '현실직시';
                break;
              case 'Heroic Tale':
                return '무용담';
                break;
              case 'Comforting Cheer':
                return '위로 응원';
                break;
              case 'Cute Cheer':
                return '애교 응원';
                break;
              case 'Heroic Cheer':
                return '영웅적 응원';
                break;
              case 'Sad Memory':
                return '슬픈 추억';
                break;
              case 'Joyful Memory':
                return '즐거운 추억';
                break;
              case 'Happy Memory':
                return '행복한 추억';
                break;
              case 'Unique Comment':
                return '차원 발언';
                break;
              case 'Self-Indulgent':
                return '자아도취';
                break;
              case 'Occult':
                return '오컬트';
                break;
              case 'Myth':
                return '신화';
                break;
              case 'Bizarre Story':
                return '엽기적 이야기';
                break;
              case 'Food Story':
                return '음식 이야기';
                break;
              case 'Horror Story':
                return '공포 이야기';
                break;
              case 'Gossip':
                return '가십';
                break;
              case 'Dream':
                return '꿈';
                break;
              case 'Advice':
                return '고민 상담';
                break;
              case 'Complain':
                return '투정';
                break;
              case 'Belief':
                return '신념';
                break;
              case 'Interesting Story':
                return '모험이야기';
                break;
              default:
                return n;
                break;
            };
          } else if (this.lingua == "es") {
            switch (n) {
              case 'Criticism':
                return 'Crítica';
                break;
              case 'Reality Check':
                return 'Asume la realidad';
                break;
              case 'Heroic Tale':
                return 'Relato heroico';
                break;
              case 'Comforting Cheer':
                return 'Vitoreo reconfortante';
                break;
              case 'Cute Cheer':
                return 'Vitoreo tierno';
                break;
              case 'Heroic Cheer':
                return 'Vitoreo heroico';
                break;
              case 'Sad Memory':
                return 'Recuerdo triste';
                break;
              case 'Joyful Memory':
                return 'Recuerdo feliz';
                break;
              case 'Happy Memory':
                return 'Recuerdo alegre';
                break;
              case 'Unique Comment':
                return 'Comentario único';
                break;
              case 'Self-Indulgent':
                return 'Hedonista';
                break;
              case 'Occult':
                return 'Místico';
                break;
              case 'Myth':
                return 'Mito';
                break;
              case 'Bizarre Story':
                return 'Historia extraña';
                break;
              case 'Food Story':
                return 'Historia sobre comida';
                break;
              case 'Horror Story':
                return 'Historia de terror';
                break;
              case 'Gossip':
                return 'Rumor';
                break;
              case 'Dream':
                return 'Sueño';
                break;
              case 'Advice':
                return 'Consejo';
                break;
              case 'Complain':
                return 'Queja';
                break;
              case 'Belief':
                return 'Creencia';
                break;
              case 'Interesting Story':
                return 'Historia interesante';
                break;
              default:
                return n;
                break;
            };
          } else if (this.lingua == "pt") {
            switch (n) {
              case 'Criticism':
                return 'Crítica';
                break;
              case 'Reality Check':
                return 'Papo Realista';
                break;
              case 'Heroic Tale':
                return 'Conto Heroico';
                break;
              case 'Comforting Cheer':
                return 'Consolar';
                break;
              case 'Cute Cheer':
                return 'Animar';
                break;
              case 'Heroic Cheer':
                return 'Encorajar';
                break;
              case 'Sad Memory':
                return 'Lembrança Triste';
                break;
              case 'Joyful Memory':
                return 'Lembrança Animada';
                break;
              case 'Happy Memory':
                return 'Lembrança Feliz';
                break;
              case 'Unique Comment':
                return 'Comentário Singular';
                break;
              case 'Self-Indulgent':
                return 'Complacência';
                break;
              case 'Occult':
                return 'Ocultismo';
                break;
              case 'Myth':
                return 'Mito';
                break;
              case 'Bizarre Story':
                return 'História Bizarra';
                break;
              case 'Food Story':
                return 'História de Comida';
                break;
              case 'Horror Story':
                return 'História de Terror';
                break;
              case 'Gossip':
                return 'Fofoca';
                break;
              case 'Dream':
                return 'Sonho';
                break;
              case 'Advice':
                return 'Conselho';
                break;
              case 'Complain':
                return 'Reclamação';
                break;
              case 'Belief':
                return 'Crença';
                break;
              case 'Interesting Story':
                return 'História Interessante';
                break;
              default:
                return n;
                break;
            };
          } else if (this.lingua == "de") {
            switch (n) {
              case 'Criticism':
                return 'Kritik';
                break;
              case 'Reality Check':
                return 'Realitäts-Check';
                break;
              case 'Heroic Tale':
                return 'Heroische Erzählung';
                break;
              case 'Comforting Cheer':
                return 'Tröstlicher Jubel';
                break;
              case 'Cute Cheer':
                return 'Niedlicher Jubel';
                break;
              case 'Heroic Cheer':
                return 'Heroischer Jubel';
                break;
              case 'Sad Memory':
                return 'Traurige Erinnerung';
                break;
              case 'Joyful Memory':
                return 'Fröhliche Erinnerung';
                break;
              case 'Happy Memory':
                return 'Glückliche Erinnerung';
                break;
              case 'Unique Comment':
                return 'Einzigartiger Kommentar';
                break;
              case 'Self-Indulgent':
                return 'Ausschweifend';
                break;
              case 'Occult':
                return 'Okkult';
                break;
              case 'Myth':
                return 'Mythos';
                break;
              case 'Bizarre Story':
                return 'Bizarre Geschichte';
                break;
              case 'Food Story':
                return 'Nahrungsgeschichte';
                break;
              case 'Horror Story':
                return 'Horrorgeschichte';
                break;
              case 'Gossip':
                return 'Tratsch';
                break;
              case 'Dream':
                return 'Traum';
                break;
              case 'Advice':
                return 'Rat';
                break;
              case 'Complain':
                return 'Beschwerde';
                break;
              case 'Belief':
                return 'Glaube';
                break;
              case 'Interesting Story':
                return 'Interessante Geschichte';
                break;
              default:
                return n;
                break;
            };
          } else {
            return n;
          };
      },
      sendAllTeams: function() {
        var uploaded = localStorage.getItem('UploadedTeams') ? localStorage.getItem('Heroes') : false;
        if (!uploaded) {
          var campObj = JSON.parse(localStorage.getItem('savedCamps') ? localStorage.getItem('savedCamps') : "{}");
          var camp = Object.values(campObj);
          if (camp.length > 0 ) {
            console.log("sending old camping teams data");
            var data = [];
            for (var i = 0; i < camp.length; i++) {
              data.push(camp[i]);
            };
            sendTeamUsageStatistics({function: "add", data: data}); // send teams created before team stats were a thing
          };
          localStorage.setItem("UploadedTeams","true"); // se to true so this function is performed only once
        };
      },
      getUserHeroesBoot: function () { // read user's local storage team
        var tmp = localStorage.getItem('Heroes') ? localStorage.getItem('Heroes') : '{}';
        tmp = JSON.parse(tmp);
        if (tmp.constructor === Array) tmp = {};
        if (Object.keys(tmp).length > 0 && Object.keys(this.HeroDB).length) {
          for (var key in tmp) {
            if (!this.HeroDB[key] ) { // Check if heroes exist in the database
              if (this.HeroDB[tmp[key]._id]) { //convert to _id as key
                tmp[tmp[key]._id] = tmp[key];
                delete tmp[key];
              } else { // hero _id does not exist -> remove hero from user's roster to avoid boot problems
                delete tmp[key];
              };
            };
          };
        };
        this.myHeroesList = tmp;
        this.displayMyHeroes = Object.keys(tmp);
        this.rosterLength = Object.keys(tmp).length;
        //this.updateUserData(); // write data to local storage
      }, 
      getUserHeroesURL(e) {
        try {
          var roster = JSON.parse(atob(e));
          for (var i = 0; i < roster.length; i++) {
            if (this.HeroDB[roster[i]]) {
              this.myHeroesList[roster[i]] = this.HeroDB[roster[i]];
            };
          };
          this.displayMyHeroes = Object.keys(this.myHeroesList);
          this.rosterLength = Object.keys(this.myHeroesList).length;
          this.updateUserData();
        } catch (err) { // if URL is corrupted
          console.log("Error: corrupted URL");
          this.getUserHeroesBoot(); // get heroes list from file
        };
      },
      boot: function () {
        var urlParams = new URLSearchParams(window.location.search);
        var getDbEng = new XMLHttpRequest();
        getDbEng.open( "GET", "./HeroDatabase.json", false ); // false for synchronous request
        getDbEng.send( null );
        this.HeroDB = JSON.parse(getDbEng.response);
        this.sortedHeroDB = Object.keys(this.HeroDB).sort(function (a,b) {return ((a < b) ? -1 : ((a == b) ? 0: 1))});
        if (!urlParams.get("camproster")) { // get roster from file
          this.getUserHeroesBoot();
        } else {// get roster from url
          this.getUserHeroesURL(urlParams.get("camproster"));
          window.history.pushState("", "", window.location.pathname); // remove ?camproster= from the URL to avoid accidental refreshes replacing your current team
        };
        this.sendAllTeams();
        this.impostaLingua();
        this.inizializzaione();
        this.filtroTuttiGliEroi({tipo:'refresh',casella:'',value:'',className: 'search_hero_filter', name: 'bodyLoad'},'AllHeroes');
        this.inizializzazione = false;
      },
      inizializzaione: function () {
	self = this;
        //Get characters names translated
	try {
		var getDb = new XMLHttpRequest();
		getDb.open( "GET", "https://api.epicsevendb.com/hero?lang=" + this.lingua, false ); // false for synchronous request
		getDb.send( null );
		JSON.parse(getDb.response).results.forEach(function(item) {
		  self.translatedName[item._id] = item.name;
		});
	} catch (err) {
		console.log(err);
		for (var _id in self.HeroDB) {
			self.translatedName[_id] = self.HeroDB[_id].name;
		};
		snackbarMessage("Cannot connect to EpicSevenDB API. Using english gamedata.");
	}
      }
    },
    computed: {
        computedGetSavedTeamsStats: function () {
          this.getSavedTeamsStats();
        },
        calcolaRisultati: function () { // in computed per evitare di calcolare 2 volte il risultato se non si è cambiato niente
            //resetta per un nuovo calcolo
            this.risultati = [];
            //Richiama questi valori per far capire a vue di ricalcolare se sono cambiati
            this.rosterLength;
            this.classe;
            this.elemento;
            this.debuffs;
            this.buffs;
            this.AoE;
            this.noS1debuffs;
            this.noDebuffs;
            this.customizedResuts;
           if (Object.keys(this.myHeroesList).length > 3) {
            this.isLoadingResults = true; // mostra animazione di caricamento

            var campList = Object.keys(this.myHeroesList);
            if (this.locked.length > 0 ) {
              for (var i = 0; i< this.locked.length; i++){
                  campList.splice( campList.indexOf(this.locked[i]),1);
                };
            };
            try {
              var backendDev = false;
              if (backendDev && document.getElementById("showValues_toggle").checked === true ) {
                snackbarMessage("using backend");
                backendCalculation({campList: Object.keys(this.myHeroesList), locked: this.locked, classe: this.classe, elemento: this.elemento, debuffs: this.debuffs, buffs: this.buffs, AoE: this.AoE, noS1debuffs: this.noS1debuffs, noDebuffs: this.noDebuffs, cartesianLock: this.cartesian_lock, preferenzeRisultati: this.customizedResuts, risultati: []});
              } else {
                this.numeroCombinazioniPossibili = Combinatorics.bigCombination(campList,4-this.locked.length).length;
                camperino.postMessage({HeroDB: this.HeroDB, myHeroesList: this.myHeroesList, campList: campList, locked: this.locked, classe: this.classe, elemento: this.elemento, debuffs: this.debuffs, buffs: this.buffs, AoE: this.AoE, noS1debuffs: this.noS1debuffs, noDebuffs: this.noDebuffs, cartesianLock: this.cartesian_lock, preferenzeRisultati: this.customizedResuts, risultati: []});
              }
            } catch (err) {
              this.isLoadingResults = false; // remove angelica loading
              snackbarMessage(`Error: ` + err);
            };
          };
      }
  }, // computed
  watcher: {
    HeroDB: {
      deep: true
    }
  },
  mounted () {
	  this.boot();
  }
});


  // Genera un worker per eseguire i calcoli del camp
  var camperino = new Worker('./worker.js');
  camperino.onmessage = function(e) {
     app.isLoadingResults = false; // disattiva angelica
     if (riceviNotifiche == true) {
      if (document.visibilityState != 'visible') {
        var notification = new Notification(app.strings.notification_title, { body: app.strings.notification_ready, icon: "https://cdn.glitch.com/5c21c869-ea9a-48ba-b019-90cd493f45cd%2Fcamp-fire-icon%20small.png?v=1585067234171" }); // manda notifica di completamento
      };
    };
    if (e.data.code == 200 ) app.risultati = e.data.risultati
    else if (e.data.code == 400 ) {
      snackbarMessage(app.strings["results_error"] + `: ` + app.strings[e.data.risultati[0]]);
    };
  }  