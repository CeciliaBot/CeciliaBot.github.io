"use strict";(self["webpackChunkv3"]=self["webpackChunkv3"]||[]).push([[8667],{6004:function(t,a,e){e.d(a,{Z:function(){return p}});var s=e(6252),n=e(3577);const r={class:"page-path-title"},o=(0,s._)("span",null," / ",-1);function l(t,a,e,l,i,u){const c=(0,s.up)("router-link");return(0,s.wg)(),(0,s.iD)("div",r,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(i.path,(t=>((0,s.wg)(),(0,s.iD)("span",{key:t[1]},[(0,s.Wm)(c,{to:t[1],class:"router-restore"},{default:(0,s.w5)((()=>[(0,s.Uk)((0,n.zw)(t[0]),1)])),_:2},1032,["to"]),o])))),128)),(0,s.WI)(t.$slots,"default")])}const i={database:"Database",hero:"Heroes",artifacts:"Artifacts","hero-stats-table":"Hero Stats Table",guides:"Guides","voice-actors":"Voice Actors",buffs:"Buffs",common:"Common",debuffs:"Debuffs","official-info":"Official Links"};var u={props:{location:{type:String,default:""}},data(){return{path:[]}},created(){var t="",a=window.location.href.toLowerCase().split("#")[1].replace(/\?.*/,"").split("/").filter(((t,a)=>""!==t||0===a));a.splice(-1,1),this.path=a.map(((e,s)=>{var n=i[e];return n||(0===s?n="Home":s===a.length-1&&(n=this.current)),t+=e+"/",[n,t]}))}},c=e(3744);const f=(0,c.Z)(u,[["render",l]]);var p=f},222:function(t,a,e){e.d(a,{Z:function(){return u}});var s=e(6252);const n={class:"page-title-box flex flex-col"};function r(t,a){return(0,s.wg)(),(0,s.iD)("div",n,[(0,s.WI)(t.$slots,"default")])}var o=e(3744);const l={},i=(0,o.Z)(l,[["render",r]]);var u=i},8667:function(t,a,e){e.r(a),e.d(a,{default:function(){return d}});var s=e(6252),n=e(3577);const r=(0,s._)("h2",null,"Database",-1),o={class:"flex flex-wrap"};function l(t,a,e,l,i,u){const c=(0,s.up)("PagePath"),f=(0,s.up)("PageTitle"),p=(0,s.up)("router-link");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s.Wm)(f,null,{default:(0,s.w5)((()=>[(0,s.Wm)(c),r])),_:1}),(0,s._)("div",o,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(i.list,(t=>((0,s.wg)(),(0,s.iD)("div",{class:"pad-5 col-2 col-4 overflow-hidden",key:t.path},[(0,s.Wm)(p,{to:t.path,class:"datbase-buttons pad-5 normalize-link"},{default:(0,s.w5)((()=>[(0,s._)("span",null,(0,n.zw)(t.name),1)])),_:2},1032,["to"])])))),128))])],64)}var i=e(6004),u=e(222),c={name:"DatabasePage",components:{PagePath:i.Z,PageTitle:u.Z},data(){return{list:[{name:"Hero",path:"/hero/"},{name:"Artifact",path:"/artifacts/"},{name:"Buffs",path:"/database/buffs/"},{name:"Debuffs",path:"/database/debuffs/"},{name:"Voice actors",path:"/database/voice-actors/"},{name:"Skill Multiplier Spreadsheet",path:"/database/google-doc-multiplier-spreadsheet/"}]}}},f=e(3744);const p=(0,f.Z)(c,[["render",l]]);var d=p}}]);