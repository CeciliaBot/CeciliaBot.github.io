(function(){"use strict";var e={871:function(e,t,i){var n=i(9963),a=i(6252),o=i(3577);const s={class:"container",style:{"font-family":"'Titillium Web', 'Roboto', sans-serif"}},r={class:"flex full-h full-w"},l={id:"main-content-wrapper",class:"flex-fill overflow-auto relative",style:{}},c=(0,a._)("img",{style:{height:"100px"},src:"https://cdn.glitch.com/6c14ca82-3bcb-4fd6-afa7-815b95e04a14%2Fras-run-slow.gif?v=1632241290215"},null,-1),d={class:"mobile-headbar glass-container"},f=(0,a._)("i",{class:"fa fa-bars"},null,-1),u=[f],m=(0,a._)("span",null," CeciliaBot ",-1),p=(0,a._)("div",{class:"invisible-background"},null,-1),h={id:"app_content",class:"full-h full-w main-content"};function b(e,t,i,f,b,g){const v=(0,a.up)("SideMenu"),_=(0,a.up)("router-view"),y=(0,a.Q2)("ripple-effect");return(0,a.wg)(),(0,a.iD)("div",s,[(0,a._)("div",r,[(0,a.Wm)(v,{ref:"side-menu","current-path":g.currentPage},null,8,["current-path"]),(0,a._)("div",l,[(0,a.wy)((0,a._)("div",{id:"loading",class:"noselect loading-container animatefade absolute full-h full-w",onContextmenu:t[0]||(t[0]=(0,n.iM)((()=>{}),["prevent"]))},[c,(0,a.Wm)(n.uT,{name:"slide-fade",mode:"out-in"},{default:(0,a.w5)((()=>[((0,a.wg)(),(0,a.iD)("div",{key:g.loadingText,style:{"font-size":"32px",color:"white","text-shadow":"0px 0px 3px grey, 0 0 10px black, 0 0 10px black","line-height":"30px","padding-top":"12px","margin-left":"20px"}},(0,o.zw)(g.loadingText),1))])),_:1})],544),[[n.F8,g.loading]]),(0,a._)("div",d,[(0,a.wy)(((0,a.wg)(),(0,a.iD)("button",{class:"material-button basic basic",name:"Menu",style:{height:"45px",width:"45px"},onClick:t[1]||(t[1]=(...e)=>g.openSideMenu&&g.openSideMenu(...e))},u)),[[y]]),m]),p,(0,a._)("div",h,[(0,a.Wm)(_)])])])])}var g=i(8753),v=i(2177);const _={class:"pad-5 side-website-title-block"},y=(0,a._)("i",{class:"fa fa-times",style:{"font-size":"0.9em"}},null,-1),w=[y],k={class:"no-flex-shrink side-icon pad-5 text-center menu-option-icon"},x={"data-src":"/favicons/android-chrome-192x192.png",style:{height:"1.5em","vertical-align":"middle"},alt:"website-icon"},j={class:"hide-collapsed flex-fill pad-5 text-ellipsis side-text text-black-stroke"},C=(0,a._)("div",{class:"separator margin-5 round-s"},null,-1),P={class:"flex-fill hide-scrollbar overflow-auto pad-5"},E={class:"flex flex-col flex-fill"},S=["innerHTML"],T={class:"hide-collapsed no-flex-shrink flex-fill pad-5 text-ellipsis side-text"},O={key:0,class:"beta-label"},M=(0,a._)("div",{class:"hide-collapsed no-flex-shrink pad-5 side-text"},null,-1),A=(0,a._)("div",{class:"separator margin-5 round-s hide-mobile-side"},null,-1),B={class:"pad-5 hide-mobile-side"},D={class:"no-flex-shrink side-icon pad-5 text-center menu-option-icon"},L=(0,a._)("polyline",{fill:"none",id:"Down",points:"17.9 5 10.9 12 17.9 19",stroke:"inherit","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2"},null,-1),$=(0,a._)("line",{fill:"none",stroke:"inherit","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",x1:"6.1",x2:"6.1",y1:"5",y2:"19"},null,-1),z=[L,$],H=(0,a._)("div",{class:"hide-collapsed no-flex-shrink flex-fill pad-5 text-ellipsis side-text"}," Collapse menu ",-1),Z=(0,a._)("div",{class:"mobile-menu-background"},null,-1);function I(e,t,i,s,r,l){const c=(0,a.up)("router-link"),d=(0,a.Q2)("lazyloader"),f=(0,a.Q2)("tooltip");return(0,a.wg)(),(0,a.iD)(a.HY,null,[(0,a._)("div",{ref:"main-menu",class:(0,o.C_)(["main-side-menu flex flex-col justify-center noselect overflow-hidden",{collapsed:e.isClosed}]),tabindex:"-1"},[(0,a._)("div",_,[(0,a._)("div",{class:"close-side-menu-button text-center pointer",onClick:t[0]||(t[0]=(...e)=>l.loseFocus&&l.loseFocus(...e))},w),(0,a.Wm)(c,{to:"/",class:"home-button flex normalize-link relative items-center justify-between font-bold",onClick:l.loseFocus},{default:(0,a.w5)((()=>[(0,a._)("div",k,[(0,a.wy)((0,a._)("img",x,null,512),[[d]])]),(0,a._)("div",j,(0,o.zw)(e.$t("strings.app_title")),1)])),_:1},8,["onClick"])]),C,(0,a._)("div",P,[(0,a._)("div",E,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(e.options,(t=>(0,a.wy)(((0,a.wg)(),(0,a.j4)(c,{key:t,to:t.link,onClick:l.handleOption,class:(0,o.C_)(["side-option flex normalize-link relative items-center justify-between margin-5 round-s pointer",{disabled:t.disabled,"active-path":l.activeMainPath==t}])},{default:(0,a.w5)((()=>[(0,a._)("div",{class:"no-flex-shrink side-icon pad-5 text-center no-events menu-option-icon",innerHTML:t.icon},null,8,S),(0,a._)("div",T,[(0,a._)("span",null,(0,o.zw)(t.name()),1),t.beta?((0,a.wg)(),(0,a.iD)("span",O," BETA ")):(0,a.kq)("",!0)]),M])),_:2},1032,["to","onClick","class"])),[[n.F8,!t.beta||e.isBeta],[f,()=>l.optionTooltip(t),"right"]]))),128))])]),A,(0,a._)("div",B,[(0,a.wy)(((0,a.wg)(),(0,a.iD)("div",{class:"side-option flex relative items-center justify-between margin-5 round-s pointer",onClick:t[1]||(t[1]=(...e)=>l.collapseMenu&&l.collapseMenu(...e))},[(0,a._)("div",D,[((0,a.wg)(),(0,a.iD)("svg",{style:(0,o.j5)(["vertical-align: text-top; transition: transform .2s ease;",{transform:e.isClosed?"scale(-1)":""}]),width:"1.3em",height:"1.3em",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},z,4))]),H])),[[f,()=>l.optionTooltip({name:"Expand menu"}),"right"]])])],2),Z],64)}var N=i(6468),F={props:{currentPath:{type:String,default:""},pwa:{default:!0}},watch:{},computed:{activeMainPath(){var e,t="/"+this.currentPath;for(e=0;e<this.options.length;e++){let i=this.options[e];if(-1!=i.link.indexOf(t))return this.handleAutoCollapse(i),i}return this.handleAutoCollapse(this.options[0]),this.options[0]}},created(){this.isBeta=!0},data:function(){return{campImage:N,isClosed:!1,isBeta:!1,wasManuallyCollapsed:!1,options:[{icon:'<i class="fas fa-home"></i>',name:()=>"Home",link:"/"},{icon:'<i class="fas fa-info-circle"></i>',name:()=>this.$t("strings.app_official_game_info"),link:"/official-info/"},{icon:'<i class="fa fa-users"></i>',name:()=>"Heroes",link:"/hero/",beta:!0},{icon:'<i class="fa fa-bolt"></i>',name:()=>"Artifacts",link:"/artifacts/",beta:!0},{icon:'<i class="fa fa-table"></i>',name:()=>"Hero Stats Table",link:"/hero-stats-table/",beta:!0},{icon:'<i class="fas fa-database"></i>',name:()=>"Database",link:"/database/",beta:!0},{icon:'<i class="fa fa-history"></i>',name:()=>this.$t("strings.app_timeline"),link:"/timeline/",shrink:!0},{icon:'<i class="fa fa-history"></i>',name:()=>this.$t("strings.app_ultimate_timeline"),link:"/ultimate-timeline/",shrink:!0},{icon:'<svg viewBox="0 0 200 240" style="display: inline-block; vertical-align: top; height: 28px;"><use href="'+i(6468)+'#root" /></svg>',name:()=>this.$t("strings.app_camp_simulator"),link:"/camping-simulator/",shrink:!0},{icon:'<i class="fa fa-star-and-crescent"></i>',name:()=>"Summon Simulator",link:"/summon-simulator/"},{icon:'<i class="fa fa-trophy"></i>',name:()=>this.$t("strings.app_tier_list_maker"),link:"/tierlist-maker/",shrink:!0},{icon:'<i class="fa fa-id-card"></i>',name:()=>this.$t("strings.credits"),link:"/credits/"}]}},methods:{collapseMenu(){this.wasManuallyCollapsed=!this.isClosed,this.isClosed=!this.isClosed},loseFocus(){document.activeElement.blur()},handleAutoCollapse(e){e.shrink?this.isClosed=!0:this.wasManuallyCollapsed||(this.isClosed=!1)},focus(){this.$refs["main-menu"].focus()},handleOption(){this.loseFocus()},optionTooltip(e){return{value:e.name,disabled:!this.isClosed}}}},V=i(3744);const W=(0,V.Z)(F,[["render",I]]);var R=W,U={provide:{cdn:g.cK,api:g.hi,setMeta:v.Z,mainContainerWrapper:function(){return document.getElementById("main-content-wrapper")}},components:{SideMenu:R},data:function(){return{VERSION:1}},methods:{setLoading:function(e,t){this.$store.commit("loading",[e,t])},openSideMenu(){this.$refs["side-menu"].focus()}},computed:{currentPage(){return this.$route.path.split("/").filter((e=>e))[0]},loading:function(){return this.$store.state.loading[0]},loadingText:function(){return this.$store.state.loading[1]}},created:async function(){console.log("%c!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n\n! DO NOT USE / COPY THE CECILIABOT API WITHOUT PERMISSION !\n\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!","font-size: 24px; color: red;"),console.log("%cCeciliaBot","font-size: 30px"),console.log(`%cVersion: ${this.VERSION}`,"color: red"),console.log("Mobile:",this.$store.state.isMobile)}};const q=(0,V.Z)(U,[["render",b]]);var G=q,K=i(5217),Q=i(2201);const Y=[{path:"/",name:"home",component:()=>i.e(5177).then(i.bind(i,7088)),meta:{name:"Home",description:"A collection of tools for Epic Seven. Hero and Artifact database, Camping Simulator, Timeline, Tier List Maker.",social_img:""}},{path:"/home.beta",title:"Home",name:"home_beta",component:()=>i.e(2128).then(i.bind(i,993))},{path:"/official-info/",name:"app_official_game_info",component:()=>i.e(8585).then(i.bind(i,9883)),meta:{name:"Official Links",description:"Links to official Epic Seven resources.",social_img:""}},{path:"/hero/:id",title:"Hero Details",name:"details",component:()=>Promise.all([i.e(5340),i.e(2279)]).then(i.bind(i,8865)),meta:{name:"Hero Details",description:"View details for a specific hero.",social_img:""}},{path:"/hero",name:"hero",component:()=>Promise.all([i.e(5135),i.e(8833),i.e(4892)]).then(i.bind(i,6239)),meta:{name:"Heroes",description:"Database of all the units available in Epic Seven.",social_img:""}},{path:"/hero-stats-table",name:"hero-stats-table",component:()=>Promise.all([i.e(5135),i.e(8833),i.e(6781)]).then(i.bind(i,7013)),meta:{name:"Hero Stats",description:"Table of character stats.",social_img:""}},{path:"/artifacts/:id",name:"art-details",component:()=>Promise.all([i.e(7710),i.e(7457)]).then(i.bind(i,7710)),meta:{name:"Artifact Details",description:"View details for a specific artifact.",social_img:""}},{path:"/artifacts",name:"artifacts",component:()=>Promise.all([i.e(5135),i.e(8833),i.e(5818),i.e(8017)]).then(i.bind(i,34)),meta:{name:"Artifacts",description:"Database of all the artifacts available in Epic Seven.",social_img:""}},{path:"/database/voice-actors/:id",name:"voice-actor",component:()=>i.e(7553).then(i.bind(i,7553)),meta:{name:"Voice Actor",description:"Epic Seven voice actor details.",social_img:""}},{path:"/database/voice-actors",title:"Voice Actors",name:"voice-actors",component:()=>i.e(2924).then(i.bind(i,2924)),meta:{name:"Voice Actors",description:"List of voice actors and their roles in Epic Seven.",social_img:""}},{path:"/database/buffs/:id",name:"buff",component:()=>i.e(901).then(i.bind(i,901)),meta:{name:"Buff",description:"Buff details.",social_img:""}},{path:"/database/buffs",name:"buffs",component:()=>i.e(9526).then(i.bind(i,9526)),meta:{name:"Buffs",description:"List of positive skill effects in Epic Seven.",social_img:""}},{path:"/database/debuffs/:id",name:"debuff",component:()=>i.e(2988).then(i.bind(i,2988)),meta:{name:"Debuffs",description:"Debuff details.",social_img:""}},{path:"/database/debuffs",name:"debuffs",component:()=>i.e(3404).then(i.bind(i,3404)),meta:{name:"Buffs",description:"List of negative skill effects in Epic Seven.",social_img:""}},{path:"/database/google-doc-multiplier-spreadsheet",name:"multi-doc-spreadsheet",component:()=>i.e(6350).then(i.bind(i,6350)),meta:{name:"Multiplier Spreadsheet",description:"Document containing all the skill multipliers.",social_img:""}},{path:"/database",name:"database",component:()=>i.e(8667).then(i.bind(i,8667)),meta:{name:"Database",description:"Databases for Heroes, Artifacts, Buffs, Debuffs and Voice Actors in Epic Seven.",social_img:""}},{path:"/guides/:id",name:"guide_read",component:()=>Promise.all([i.e(322),i.e(601)]).then(i.bind(i,3756)),meta:{name:"Read Guide",description:"Read guide.",social_img:""}},{path:"/guides",name:"guides",component:()=>i.e(5752).then(i.bind(i,1898)),meta:{name:"Guides",description:"Various Epic Seven guides for new players.",social_img:""}},{path:"/summon-simulator",name:"app_summon_simulator",component:()=>i.e(5582).then(i.bind(i,9168)),meta:{name:"Summon Simulator",description:"Test your luck in the Epic Seven summon simulator!",social_img:""}},{path:"/db-editor",title:"Database Editor",name:"Database Editor",component:()=>Promise.all([i.e(5135),i.e(8833),i.e(5340),i.e(322),i.e(7710),i.e(5818),i.e(8761),i.e(1670)]).then(i.bind(i,6295))},{path:"/draft-build",title:"draft-build",name:"Draft Builder",component:()=>Promise.all([i.e(5135),i.e(8833),i.e(5340),i.e(322),i.e(7710),i.e(5818),i.e(8761),i.e(1670)]).then(i.bind(i,9997))},{path:"/ultimate-timeline",name:"app_ultimate_timeline",component:()=>Promise.all([i.e(8761),i.e(8485)]).then(i.bind(i,834)),meta:{name:"Ultimate Timeline",description:"Detailed Timeline of all the Events and Banners in Epic Seven.",social_img:""}},{path:"/timeline",name:"app_timeline",component:()=>i.e(3831).then(i.bind(i,4263)),meta:{name:"Timeline",description:"Mobile friendly Timeline of Banners and Mystic Banners for Epic Seven.",social_img:""}},{path:"/camping-simulator",name:"app_camp_simulator",component:()=>Promise.all([i.e(9124),i.e(8297)]).then(i.bind(i,5432)),meta:{name:"Camping Simulator",description:"Optimize your labyrinth runs with the Camping Simulator and find the best morale for your heroes.",social_img:""}},{path:"/tierlist-maker",name:"app_tier_list_maker",component:()=>Promise.all([i.e(9124),i.e(3853),i.e(6659)]).then(i.bind(i,7354)),meta:{name:"Tier List Maker",description:"Build your Tier List with this easy to use Tier List Maker optimized for Epic Seven, for both Heroes and Artifacts always updated.",social_img:""}},{path:"/tierlist-maker-2",name:"app_tier_list_maker_2",component:()=>Promise.all([i.e(9124),i.e(3853),i.e(3644)]).then(i.bind(i,7832)),meta:{name:"Tier List Maker",description:"Build your Tier List with this easy to use Tier List Maker optimized for Epic Seven, for both Heroes and Artifacts always updated.",social_img:""}},{path:"/credits",name:"credits",component:()=>Promise.all([i.e(9124),i.e(3853),i.e(6659)]).then(i.bind(i,5164)),meta:{name:"Credits",description:"About CeciliaBot.",social_img:""}},{path:"/:pathMatch(.*)*",name:"app_not_found",component:()=>i.e(2772).then(i.bind(i,7966)),meta:{name:"Page not found",description:"Error 404.",social_img:""}}];var J=Y;const X=(0,Q.p7)({history:(0,Q.r5)(),routes:J});X.beforeEach(((e,t,i)=>{window.$loadingPageProgress(15),K.Z.commit("loading",!0),i()})),X.afterEach(((e,t,i)=>{K.Z.commit("loading",!1),i||((0,v.Z)({title:e.params.id||e.meta.name,description:e.meta.description}),window.gtag&&(window.gtag("set","page_path",window.location.pathname+"#"+e.path),window.gtag("event","page_view")),window.$loadingPageProgress(100))}));var ee=i(9234),te=i(5089),ie=i(2229),ne=i(1830),ae=i(2710),oe=i(2784);const se={};function re(e){return Array.isArray(e)?e.reduce(((e,t,i)=>({...e,[i]:t})),{}):e}function le(e,t){return t.json&&(e=JSON.parse(e)),t.objectify&&(e=re(e)),e}function ce(e,t={json:!0,objectify:!1}){return new Promise(((i,n)=>{if(se[e])return i(le(se[e],t));(0,oe.Z)(e).then((n=>{se[e]=n,i(le(n,t))})).catch((e=>{n(e)}))}))}var de={install:function(e){e.config.globalProperties.$gameData={hero:{list:()=>ce(g.hi+"/getList?list=hero"),get:e=>ce(g.hi+"/getItem?list=hero&id="+e)},artifact:{list:()=>ce(g.hi+"/getList?list=artifact"),get:e=>ce(g.hi+"/getItem?list=artifact&id="+e)},buff:{list:()=>ce(g.hi+"/getList?list=buff"),get:e=>ce(g.hi+"/getItem?list=buff&id="+e)},debuff:{list:()=>ce(g.hi+"/getList?list=debuff"),get:e=>ce(g.hi+"/getItem?list=debuff&id="+e)},common:{list:()=>ce(g.hi+"/getList?list=common"),get:e=>ce(g.hi+"/getItem?list=common&id="+e)},voiceActors:{list:()=>ce(g.hi+"/getList?list=va"),get:e=>ce(g.hi+"/getItem?list=va&id="+e)},skin:{list:()=>ce(g.hi+"/getList?list=skin"),get:e=>ce(g.hi+"/getItem?list=skin&id="+e)},guides:{list:()=>ce(g.hi+"/getGuide"),get:e=>ce(g.hi+"/getGuide?id="+e)}}}},fe=i(5845),ue=i(5134),me=i(7482),pe=i(4474),he=i(9117),be=i(5561),ge=document.createElement("div");ge.style.cssText="z-index: 999; position: fixed; top: 0; left: 0; opacity: 0; height: .3rem; background: var(--font-color-primary); width: 0; transition: all ease .3s",document.body.appendChild(ge);const ve=function(e){ge.style.opacity="1",ge.style.width=e+"%",e>=100&&setTimeout((()=>{ge.style.opacity="0",setTimeout((()=>ge.style.width=0),200)}),200)};var _e={install(e){e.config.globalProperties.$loadingPageProgress=ve,window.$loadingPageProgress=ve}};window.i18n=ee.ZP,(0,n.ri)(G).use(X).use(ee.ZP).use(K.Z).use(de).use(fe.Z).use(ue.Z).use(me.Z).use(ae.Z).use(pe.Z).use(_e).directive("tooltip",te.Z).directive("lazyloader",ie.ZP).directive("ripple-effect",ne.Z).component("HeroIcon",he.Z).component("MobileFloatingMenu",be.Z).mount("#app")},2177:function(e,t,i){function n(e={}){document.title=e.title?e.title+" | CeciliaBot":"CeciliaBot",document.querySelector('meta[name="description"]').setAttribute("content",e.description)}i.d(t,{Z:function(){return n}})},8753:function(e,t,i){i.d(t,{cK:function(){return a},hi:function(){return n},ot:function(){return o}});const n="https://cecilia-bot-api.vercel.app/api/v1",a="https://raw.githubusercontent.com/CeciliaBot/E7Assets-Temp/main/assets/",o=["max_hp_rate","max_hp","att_rate","att","def_rate","def","speed","acc","res","cri","cri_dmg","coop"]},6468:function(e,t,i){e.exports=i.p+"img/campfire.0cdd667a.svg"}},t={};function i(n){var a=t[n];if(void 0!==a)return a.exports;var o=t[n]={id:n,loaded:!1,exports:{}};return e[n].call(o.exports,o,o.exports,i),o.loaded=!0,o.exports}i.m=e,function(){var e=[];i.O=function(t,n,a,o){if(!n){var s=1/0;for(d=0;d<e.length;d++){n=e[d][0],a=e[d][1],o=e[d][2];for(var r=!0,l=0;l<n.length;l++)(!1&o||s>=o)&&Object.keys(i.O).every((function(e){return i.O[e](n[l])}))?n.splice(l--,1):(r=!1,o<s&&(s=o));if(r){e.splice(d--,1);var c=a();void 0!==c&&(t=c)}}return t}o=o||0;for(var d=e.length;d>0&&e[d-1][2]>o;d--)e[d]=e[d-1];e[d]=[n,a,o]}}(),function(){i.F={},i.E=function(e){Object.keys(i.F).map((function(t){i.F[t](e)}))}}(),function(){i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,{a:t}),t}}(),function(){var e,t=Object.getPrototypeOf?function(e){return Object.getPrototypeOf(e)}:function(e){return e.__proto__};i.t=function(n,a){if(1&a&&(n=this(n)),8&a)return n;if("object"===typeof n&&n){if(4&a&&n.__esModule)return n;if(16&a&&"function"===typeof n.then)return n}var o=Object.create(null);i.r(o);var s={};e=e||[null,t({}),t([]),t(t)];for(var r=2&a&&n;"object"==typeof r&&!~e.indexOf(r);r=t(r))Object.getOwnPropertyNames(r).forEach((function(e){s[e]=function(){return n[e]}}));return s["default"]=function(){return n},i.d(o,s),o}}(),function(){i.d=function(e,t){for(var n in t)i.o(t,n)&&!i.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){i.f={},i.e=function(e){return Promise.all(Object.keys(i.f).reduce((function(t,n){return i.f[n](e,t),t}),[]))}}(),function(){i.u=function(e){return"js/"+({36:"changelog/views-timeline2---Copia-changelog-en-json",78:"locales/en-strings-json",251:"locales/th-heroes-json",320:"en-json",348:"locales/pt-heroes-json",601:"guides-read",1534:"locales/ja-artifacts-json",1670:"de2",1909:"PhotogalleryPlugin",2057:"changelog/views-tierlist-maker-changelog-en-json",2128:"hb",2279:"hero",2317:"changelog/views-tierlist-maker-sub-changelog-en-json",2737:"locales/es-strings-json",2772:"wiki404",3359:"locales/th-artifacts-json",3644:"tier-list-maker-test",3708:"locales/zh-CN-artifacts-json",3770:"locales/zh-CN-strings-json",3831:"timeline",4378:"locales/pt-strings-json",4787:"locales/ko-artifacts-json",4892:"heroes",5177:"home",5582:"summon-simulator",5719:"locales/zh-CN-heroes-json",5734:"html2canvas.patched",5752:"guides",5941:"locales/fr-heroes-json",6091:"locales/ko-heroes-json",6233:"locales/ja-heroes-json",6635:"locales/es-heroes-json",6659:"tier-list-maker",6781:"hero-sheet",6856:"locales/ko-strings-json",6921:"locales/es-artifacts-json",6977:"locales/ja-strings-json",7457:"artifact",7950:"locales/pt-artifacts-json",8017:"artifacts",8028:"locales/zh-TW-artifacts-json",8297:"camping",8485:"timeline2",8516:"locales/th-strings-json",8585:"official-game-info",9393:"changelog/views-timeline2-changelog-en-json",9402:"changelog/views-camping-simulator-changelog-en-json",9483:"changelog/views-timeline-changelog-en-json",9726:"locales/it-strings-json",9813:"locales/zh-TW-strings-json",9913:"locales/zh-TW-heroes-json"}[e]||e)+"."+{36:"3dda279e",78:"24b5e9a5",251:"72ff6e20",320:"f7fa2e27",322:"7483f4f5",336:"2a1a5d7d",348:"2fa32ba6",601:"6126e132",807:"167a04f0",901:"8676b8f7",1515:"433a9000",1534:"7199cb53",1560:"217ca1cb",1670:"d99cfc20",1909:"23f9ce81",2057:"ac054f25",2128:"a7caad16",2279:"4aed2f1d",2293:"e9bfc047",2317:"3689ff00",2429:"c8ff26ec",2665:"222005e5",2737:"493c1cca",2772:"c0729065",2924:"a190a1f7",2988:"ceb2913c",3359:"6d8857e8",3404:"0c6b03ce",3636:"3d5ac27b",3641:"babd463d",3644:"183e91cb",3708:"e7a855eb",3770:"33249bdb",3831:"4ad7201f",3853:"7af3cb6b",4378:"65ad1527",4787:"78ecf32f",4892:"13de31d9",5070:"1e8af833",5135:"92f5b3f4",5177:"7cae6f69",5236:"0767bfdb",5340:"783dd0ea",5582:"66600484",5719:"aa67d44f",5734:"21223f21",5752:"ffbcd478",5818:"4a10e8d3",5941:"d7d94770",6091:"daa33008",6233:"e1349ffa",6341:"446428af",6350:"d7e1a5dd",6635:"cc384842",6659:"fc8403a3",6781:"403451ba",6856:"e26a351d",6921:"4a55d485",6929:"b57dabb8",6977:"f2ea5245",7457:"3f3a826e",7553:"53411f63",7710:"61ecab13",7950:"875c3b34",8017:"143e00fe",8028:"32b112c2",8297:"2487bf65",8485:"5ecfb15c",8516:"e983abe0",8585:"1e387560",8667:"62bfba30",8758:"f0ab2264",8761:"7b184e1b",8833:"2b6cbaf1",9124:"a3a96245",9393:"932dc615",9402:"ab54181e",9443:"8b0d9bd2",9483:"1c9d44f9",9526:"f7e691dd",9726:"09b212d2",9745:"6a3687fd",9813:"4039d72d",9913:"4951c9f3"}[e]+".js"}}(),function(){i.miniCssF=function(e){return"css/"+({1670:"de2",1909:"PhotogalleryPlugin",2128:"hb",2279:"hero",3644:"tier-list-maker-test",3831:"timeline",4892:"heroes",5177:"home",5582:"summon-simulator",5752:"guides",6659:"tier-list-maker",6781:"hero-sheet",7457:"artifact",8017:"artifacts",8297:"camping",8485:"timeline2",8585:"official-game-info"}[e]||e)+"."+{322:"e68beff5",336:"3677b4ca",901:"df189ae1",1515:"459f0784",1560:"3677b4ca",1670:"89e2aaff",1909:"2820b156",2128:"d36bea3b",2279:"46e00154",2293:"3677b4ca",2429:"3677b4ca",2665:"dccea557",2924:"aa8b6136",2988:"df189ae1",3404:"aa8b6136",3636:"8d59b828",3641:"459f0784",3644:"fe1b8d46",3831:"ca49949b",4892:"6f983519",5177:"f5006742",5236:"3677b4ca",5582:"8eb25017",5752:"c1d6ed3e",5818:"4fe8b5c7",6341:"459f0784",6659:"128bbe25",6781:"bfb19d3a",6929:"459f0784",7457:"2c25d718",7553:"aa02e69d",8017:"fc9246f1",8297:"ef405655",8485:"cc1ba6b2",8585:"f1f21256",8667:"b932e38a",8758:"3677b4ca",9443:"e598c414",9526:"aa8b6136",9745:"66f82303"}[e]+".css"}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){i.hmd=function(e){return e=Object.create(e),e.children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:function(){throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e}}(),function(){i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="v3:";i.l=function(n,a,o,s){if(e[n])e[n].push(a);else{var r,l;if(void 0!==o)for(var c=document.getElementsByTagName("script"),d=0;d<c.length;d++){var f=c[d];if(f.getAttribute("src")==n||f.getAttribute("data-webpack")==t+o){r=f;break}}r||(l=!0,r=document.createElement("script"),r.charset="utf-8",r.timeout=120,i.nc&&r.setAttribute("nonce",i.nc),r.setAttribute("data-webpack",t+o),r.src=n),e[n]=[a];var u=function(t,i){r.onerror=r.onload=null,clearTimeout(m);var a=e[n];if(delete e[n],r.parentNode&&r.parentNode.removeChild(r),a&&a.forEach((function(e){return e(i)})),t)return t(i)},m=setTimeout(u.bind(null,void 0,{type:"timeout",target:r}),12e4);r.onerror=u.bind(null,r.onerror),r.onload=u.bind(null,r.onload),l&&document.head.appendChild(r)}}}(),function(){i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){i.j=4826}(),function(){i.p=""}(),function(){if("undefined"!==typeof document){var e=function(e,t,i,n,a){var o=document.createElement("link");o.rel="stylesheet",o.type="text/css";var s=function(i){if(o.onerror=o.onload=null,"load"===i.type)n();else{var s=i&&i.type,r=i&&i.target&&i.target.href||t,l=new Error("Loading CSS chunk "+e+" failed.\n("+s+": "+r+")");l.name="ChunkLoadError",l.code="CSS_CHUNK_LOAD_FAILED",l.type=s,l.request=r,o.parentNode&&o.parentNode.removeChild(o),a(l)}};return o.onerror=o.onload=s,o.href=t,i?i.parentNode.insertBefore(o,i.nextSibling):document.head.appendChild(o),o},t=function(e,t){for(var i=document.getElementsByTagName("link"),n=0;n<i.length;n++){var a=i[n],o=a.getAttribute("data-href")||a.getAttribute("href");if("stylesheet"===a.rel&&(o===e||o===t))return a}var s=document.getElementsByTagName("style");for(n=0;n<s.length;n++){a=s[n],o=a.getAttribute("data-href");if(o===e||o===t)return a}},n=function(n){return new Promise((function(a,o){var s=i.miniCssF(n),r=i.p+s;if(t(s,r))return a();e(n,r,null,a,o)}))},a={4826:0};i.f.miniCss=function(e,t){var i={322:1,336:1,901:1,1515:1,1560:1,1670:1,1909:1,2128:1,2279:1,2293:1,2429:1,2665:1,2924:1,2988:1,3404:1,3636:1,3641:1,3644:1,3831:1,4892:1,5177:1,5236:1,5582:1,5752:1,5818:1,6341:1,6659:1,6781:1,6929:1,7457:1,7553:1,8017:1,8297:1,8485:1,8585:1,8667:1,8758:1,9443:1,9526:1,9745:1};a[e]?t.push(a[e]):0!==a[e]&&i[e]&&t.push(a[e]=n(e).then((function(){a[e]=0}),(function(t){throw delete a[e],t})))}}}(),function(){i.b=document.baseURI||self.location.href;var e={4826:0};i.f.j=function(t,n){var a=i.o(e,t)?e[t]:void 0;if(0!==a)if(a)n.push(a[2]);else if(/^(1560|5818)$/.test(t))e[t]=0;else{var o=new Promise((function(i,n){a=e[t]=[i,n]}));n.push(a[2]=o);var s=i.p+i.u(t),r=new Error,l=function(n){if(i.o(e,t)&&(a=e[t],0!==a&&(e[t]=void 0),a)){var o=n&&("load"===n.type?"missing":n.type),s=n&&n.target&&n.target.src;r.message="Loading chunk "+t+" failed.\n("+o+": "+s+")",r.name="ChunkLoadError",r.type=o,r.request=s,a[1](r)}};i.l(s,l,"chunk-"+t,t)}},i.F.j=function(t){if((!i.o(e,t)||void 0===e[t])&&!/^(1560|5818)$/.test(t)){e[t]=null;var n=document.createElement("link");i.nc&&n.setAttribute("nonce",i.nc),n.rel="prefetch",n.as="script",n.href=i.p+i.u(t),document.head.appendChild(n)}},i.O.j=function(t){return 0===e[t]};var t=function(t,n){var a,o,s=n[0],r=n[1],l=n[2],c=0;if(s.some((function(t){return 0!==e[t]}))){for(a in r)i.o(r,a)&&(i.m[a]=r[a]);if(l)var d=l(i)}for(t&&t(n);c<s.length;c++)o=s[c],i.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return i.O(d)},n=self["webpackChunkv3"]=self["webpackChunkv3"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}(),function(){var e={336:[5734],1560:[5734],2293:[5734],2429:[5734],3644:[5734],5236:[5734],6659:[5734],8758:[5734]};i.f.prefetch=function(t,n){Promise.all(n).then((function(){var n=e[t];Array.isArray(n)&&n.map(i.E)}))}}();var n=i.O(void 0,[4998,3064],(function(){return i(871)}));n=i.O(n)})();