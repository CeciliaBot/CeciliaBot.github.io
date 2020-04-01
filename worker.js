importScripts('js-combinatorics@0.5.js');

var AoEHeroes = ["Kawerik","Cerise","Specter Tenebria","Tempest Surin","Pavel","Ambitious Tywin","Alencia","Benevolent Romann","Elena","Cecilia","Vildred","Charlotte","Baal & Sezan","Yufine","Ravi","Kayron","Charles","Yuna","Sez","Haste","Tywin","Lidica","Aramintha","Tenebria","Basar","Tamarinne","Ludwig","Bellona","Luluca","Zeno","Vivian","Lilias","Dizzy","Faithless Lididca","Fallen Cecilia","Judge Kise","Arbiter Vildred","Sage Baal & Sezan","Specimen Sez","Martial Artist Ken","Silver Blade Aramintha","Desert Jewel Basar","Seaside Bellona","Silk","Mercedes","Armin","Zerato","Corvus","Cartuja","Schuri","Dingo","Clarissa","Leo","Purrgis","Crozet","Dominiel","Romann","Khawana","Shadow Rose","Celestial Mercedes","Champion Zerato","Blood Blade Karin","Watcher Schuri","Blaze Dingo","Kitty Clariss","Roaming Warrior Leo","Auxiliary Lots","General Purrgis","Ras","Sven","Church of Ilryos Axe","Rikoris","Adlay","Carrot","Jena","Jecht","Elson","Hurado","Kiris","Celeste","Pearlhorizon","Gloomyrain","Kikirat v2","Chaos Sect Axe","Captain Rikoris","Researcher Carrot","Lena"];


///replace this. -> e.
onmessage = function(e) {
         let isCartesian = false;
         var e = e.data;
         var HeroDB = e.HeroDB;
         var campList = e.campList;
         if (e.cartesianLock.flat().length>0) isCartesian = true;
         console.log("Is cartesian product? " + isCartesian)

         const nuovoCampSimulatorTeam2 = function(inputTeam) {
              let pg1 = inputTeam[0];
              let pg2 = inputTeam[1];
              let pg3 = inputTeam[2];
              let pg4 = inputTeam[3];

              var tabConTagNome = [
              {personaggio: HeroDB[pg1].name, opzione: HeroDB[pg1].camping.topics[0],risultato: HeroDB[pg2].camping.values[HeroDB[pg1].camping.topics[0]]+HeroDB[pg3].camping.values[HeroDB[pg1]. camping.topics[0]]+HeroDB[pg4].camping.values[HeroDB[pg1].camping.topics[0]]},
                    {personaggio: HeroDB[pg1].name, opzione: HeroDB[pg1].camping.topics[1],risultato: HeroDB[pg2].camping.values[HeroDB[pg1].camping.topics[1]]+HeroDB[pg3].camping.values[HeroDB[pg1].camping.topics[1]]+HeroDB[pg4].camping.values[HeroDB[pg1].camping.topics[1]]},
                    {personaggio: HeroDB[pg2].name, opzione: HeroDB[pg2].camping.topics[0],risultato: HeroDB[pg1].camping.values[HeroDB[pg2].camping.topics[0]]+HeroDB[pg3].camping.values[HeroDB[pg2].camping.topics[0]]+HeroDB[pg4].camping.values[HeroDB[pg2].camping.topics[0]]},
                    {personaggio: HeroDB[pg2].name, opzione: HeroDB[pg2].camping.topics[1],risultato: HeroDB[pg1].camping.values[HeroDB[pg2].camping.topics[1]]+HeroDB[pg3].camping.values[HeroDB[pg2].camping.topics[1]]+HeroDB[pg4].camping.values[HeroDB[pg2].camping.topics[1]]},
                    {personaggio: HeroDB[pg3].name, opzione: HeroDB[pg3].camping.topics[0],risultato: HeroDB[pg1].camping.values[HeroDB[pg3].camping.topics[0]]+HeroDB[pg2].camping.values[HeroDB[pg3].camping.topics[0]]+HeroDB[pg4].camping.values[HeroDB[pg3].camping.topics[0]]},
                    {personaggio: HeroDB[pg3].name, opzione: HeroDB[pg3].camping.topics[1],risultato: HeroDB[pg1].camping.values[HeroDB[pg3].camping.topics[1]]+HeroDB[pg2].camping.values[HeroDB[pg3].camping.topics[1]]+HeroDB[pg4].camping.values[HeroDB[pg3].camping.topics[1]]},
                    {personaggio: HeroDB[pg4].name, opzione: HeroDB[pg4].camping.topics[0],risultato: HeroDB[pg1].camping.values[HeroDB[pg4].camping.topics[0]]+HeroDB[pg2].camping.values[HeroDB[pg4].camping.topics[0]]+HeroDB[pg3].camping.values[HeroDB[pg4].camping.topics[0]]},
                    {personaggio: HeroDB[pg4].name, opzione: HeroDB[pg4].camping.topics[1],risultato: HeroDB[pg1].camping.values[HeroDB[pg4].camping.topics[1]]+HeroDB[pg2].camping.values[HeroDB[pg4].camping.topics[1]]+HeroDB[pg3].camping.values[HeroDB[pg4].camping.topics[1]]}
              ];


              //Ordina per risultato				   
              tabConTagNome.sort(function(a, b) {
                  return ((a.risultato > b.risultato) ? -1 : ((a.risultato == b.risultato) ? 0 : 1));
              });   

               while (tabConTagNome[0].opzione === tabConTagNome[1].opzione) {
                  tabConTagNome.splice(1, 1);
               };
                var campMiglioreRisultato1 = tabConTagNome[0].risultato;
                var campNomeMigliorScelta1 = tabConTagNome[0].opzione;
                var campMigliorePG1 = tabConTagNome[0].personaggio;

                var campMiglioreRisultato2 = tabConTagNome[1].risultato;
                var campNomeMigliorScelta2 = tabConTagNome[1].opzione;
                var campMigliorePG2 = tabConTagNome[1].personaggio;

                 var moraleTotaleGuadagnato = campMiglioreRisultato1 + campMiglioreRisultato2;

              let soluzioni = {}; 
                  soluzioni.morale = moraleTotaleGuadagnato;
                  soluzioni.opzioneMigliore1 = campNomeMigliorScelta1;
                  soluzioni.risultatoScelta1 = campMiglioreRisultato1;
                  soluzioni.opzioneMigliore2 = campNomeMigliorScelta2;
                  soluzioni.risultatoScelta2 = campMiglioreRisultato2;
                  soluzioni.migliorPG1 = campMigliorePG1;
                  soluzioni.migliorPG2 = campMigliorePG2;
                  soluzioni.team = [HeroDB[pg1].name,HeroDB[pg2].name,HeroDB[pg3].name,HeroDB[pg4].name];
              return soluzioni;
            };
               e.risultati = [];

               if (isCartesian == false) {
                    if (campList.length-e.locked.length = 0) campList.push("1placeholder"); // fix minor bug: rangeError if you have 4 heroes in your roster and you lock all of them
                    Combinatorics.bigCombination(campList,4-e.locked.length).forEach(teamComb => {
                                if (teamComb.length>4) teamComb = []; // Se locked = 4 allora team deve riportare array vuota
                                var team = [].concat(teamComb, e.locked);
                                let elementoFiltro = teamComb;
                                let elementoRisultati = elementoFiltro.map(function (hero, i) { return HeroDB[hero].attribute }).flat();
                                let buffsRisultati = elementoFiltro.map(function (hero, i) { return HeroDB[hero].buffs }).flat();
                                let debuffsRisultati = elementoFiltro.map(function (hero, i) { return HeroDB[hero].debuffs }).flat();
                                let S1debuffsRisultati = elementoFiltro.map(function (hero, i) { return HeroDB[hero].skills[0].debuff }).flat();
                                let classeRisultati = elementoFiltro.map(function (hero, i) { return HeroDB[hero].role }).flat();
                                let AoE_inTeam = AoEHeroes.some(i => elementoFiltro.includes(i));
                                if (e.locked.every(i => team.includes(i)) &&
                                    e.classe.every(i => classeRisultati.includes(i)) && 
                                    e.elemento.every(i => elementoRisultati.includes(i)) &&
                                    e.debuffs.every(i => debuffsRisultati.includes(i)) &&
                                    e.buffs.every(i => buffsRisultati.includes(i)) &&
                                    (e.AoE === false || (e.AoE === true && AoE_inTeam )) &&
                                    (e.noS1debuffs === false || (e.noS1debuffs === true &&  S1debuffsRisultati.filter(function (team) {return team != "20" && team != "25" && team != "21"}).length === 0)) &&
                                    (e.noDebuffs === false || (e.noDebuffs === true && debuffsRisultati.filter(function (team) {return team != "20" && team != "25" && team != "21"}).length === 0)  )
                                ){
                                    if (e.risultati.length < 200) {
                                    e.risultati.push(nuovoCampSimulatorTeam2(team));
                                    e.risultati.sort(function(a, b)  {return ((a.morale > b.morale) ? -1 : ((a.morale == b.morale) ? 0 : 1));});
                                    } else {
                                        let risultatoDiQuestoTeam = nuovoCampSimulatorTeam2(team)
                                        e.risultati.sort(function(a, b) {return ((a.morale > b.morale) ? -1 : ((a.morale == b.morale) ? 0 : 1));});	 
                                        if  (risultatoDiQuestoTeam.morale > e.risultati[e.risultati.length-1].morale) e.risultati.unshift(risultatoDiQuestoTeam),e.risultati.splice(200);
                                    };
                                };
                    });
                } else if (isCartesian == true) {
                    function printCombos(array) {
                        var results = [[]];for (var i = 0; i < array.length; i++) {
                          var currentSubArray = array[i];
                          var temp = [];
                          for (var j = 0; j < results.length; j++) {
                            for (var k = 0; k < currentSubArray.length; k++) {
                              temp.push(results[j].concat(currentSubArray[k]));
                            }
                          }
                          results = temp;
                        }
                        return results;
                      }
                        for (var i=0; i < e.cartesianLock.length; i++){
                            if (!e.cartesianLock[i].length) {e.cartesianLock.splice(i, 1);i--}
                        };
                        for (var i = 0; i < campList.length; i++){
                            var tmp = e.cartesianLock.flat();
                            if (tmp.includes(campList[i]) ) {campList.splice(i, 1);i--}
                        };
                        if ( (e.cartesianLock.length + e.locked.length) < 5 ) {
                            if (campList.length < 1 ) campList = ["1"]; // evita errore RangeError
                            c = printCombos(e.cartesianLock);
                            c.forEach( (cartesianLocked) => {
                                    Combinatorics.bigCombination(campList,4-e.locked.length-cartesianLocked.length).forEach(teamComb => {
                                        var teamComb = teamComb;
                                        if (e.cartesianLock.length + e.locked.length>3) teamComb = []; // Se locked = 4 allora team deve riportare array vuota
                                        teamComb = teamComb.concat(cartesianLocked);
                                        var team = [].concat(teamComb, e.locked);
                                        let elementoFiltro = teamComb;
                                        let elementoRisultati = elementoFiltro.map(function (hero, i) { return HeroDB[hero].attribute }).flat();
                                        let buffsRisultati = elementoFiltro.map(function (hero, i) { return HeroDB[hero].buffs }).flat();
                                        let debuffsRisultati = elementoFiltro.map(function (hero, i) { return HeroDB[hero].debuffs }).flat();
                                        let S1debuffsRisultati = elementoFiltro.map(function (hero, i) { return HeroDB[hero].skills[0].debuff }).flat();
                                        let classeRisultati = elementoFiltro.map(function (hero, i) { return HeroDB[hero].role }).flat();
                                        let AoE_inTeam = AoEHeroes.some(i => elementoFiltro.includes(i));
                                        if (e.locked.every(i => team.includes(i)) &&
                                            e.classe.every(i => classeRisultati.includes(i)) && 
                                            e.elemento.every(i => elementoRisultati.includes(i)) &&
                                            e.debuffs.every(i => debuffsRisultati.includes(i)) &&
                                            e.buffs.every(i => buffsRisultati.includes(i)) &&
                                            (e.AoE === false || (e.AoE === true && AoE_inTeam )) &&
                                            (e.noS1debuffs === false || (e.noS1debuffs === true &&  S1debuffsRisultati.filter(function (team) {return team != "20" && team != "25" && team != "21"}).length === 0)) &&
                                            (e.noDebuffs === false || (e.noDebuffs === true && debuffsRisultati.filter(function (team) {return team != "20" && team != "25" && team != "21"}).length === 0)  )
                                        ){
                                            if (e.risultati.length < 200) {
                                            e.risultati.push(nuovoCampSimulatorTeam2(team));
                                            e.risultati.sort(function(a, b)  {return ((a.morale > b.morale) ? -1 : ((a.morale == b.morale) ? 0 : 1));});
                                            } else {
                                                let risultatoDiQuestoTeam = nuovoCampSimulatorTeam2(team)
                                                e.risultati.sort(function(a, b) {return ((a.morale > b.morale) ? -1 : ((a.morale == b.morale) ? 0 : 1));});	 
                                                if  (risultatoDiQuestoTeam.morale > e.risultati[e.risultati.length-1].morale) e.risultati.unshift(risultatoDiQuestoTeam),e.risultati.splice(200);
                                            };
                                        };
                                    });
                            });
                        };
                };

            e.risultati.sort(function (a,b) {return ((a.morale > b.morale) ? -1 : ((a.morale == b.morale) ? 0: 1))}); // riordina l'ultimo elemento aggiunto
            postMessage(e.risultati);
}
