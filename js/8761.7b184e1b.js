"use strict";(self["webpackChunkv3"]=self["webpackChunkv3"]||[]).push([[8761],{4985:function(e,i,n){n.d(i,{Nz:function(){return o},Qf:function(){return s},ZP:function(){return t}});n(560);function t(){return l("#")}function o(e){r("#",e)}function s(){return l("?")}function r(e="#",i){var n=i;Array.isArray(n)||(n=[n]);var t=window.location.href.split(e);t[t.length-1]=t[t.length-1].replace(new RegExp("("+n.join("|")+")[^&,]*","g"),""),window.history.replaceState(history.state,"",t.filter((e=>e)).join(e))}function l(e="#"){var i="",n=window.location.href.split(e);i=n[n.length-1]||"";var t={_stringHash:i};return i.split(/,|&/g).forEach((e=>{var i=e.split("=");t[i[0]]=void 0==i[1]||i[1]})),t}function d(e,i,n){var t=window.location.href.split(e);1===t.length&&t.push(""),n&&"#"===e&&t.length<3&&t.push("");var o=t.pop().split(/,|&/g).map((e=>{var i=e.split("=");return[i[0],void 0==i[1]||i[1]]})).filter((e=>e[0]));for(var s in i){for(var r,l=i[s],d=0;d<o.length;d++)if(o[d][0]===s){o[d][1]=l,r=!0;break}r||o.push([s,l])}t.push(o.map((e=>e.join("="))).join("&")),window.history.replaceState(history.state,"",t.filter((e=>e)).join(e))}window.setURLParams=d},6163:function(e,i,n){function t(e,i){var n=null;return function(){clearTimeout(n);var t=arguments,o=this;n=setTimeout((function(){e.apply(o,t)}),i)}}function o(e,i){var n=!1;return function(){n||(e.apply(this,arguments),n=!0,setTimeout((function(){n=!1}),i))}}function s(e=!1){let i=window.location.href.split("?")[0],n=i.split("#"),t=e&&"#"===e.href.charAt(0)?2:1;while(n.length>t)n.pop();return n.join("#")}n.d(i,{Ds:function(){return t},P2:function(){return o},fA:function(){return s}})},3479:function(e,i,n){n.d(i,{Z:function(){return S}});var t=n(6252),o=n(9963),s=n(3577);const r={class:"min-icon"},l={class:"min-title"},d={class:"floating-content"},a={class:"window-header"},u={class:"header-buttons"},h=(0,t._)("i",{class:"fas fa-window-minimize"},null,-1),w=[h],c=(0,t._)("i",{class:"fas fa-times"},null,-1),f=[c],p={class:"window-body hide-scrollbar"};function m(e,i,n,h,c,m){return(0,t.wg)(),(0,t.iD)(t.HY,null,[((0,t.wg)(),(0,t.j4)(t.lR,{to:c.teleport[1]},[(0,t._)("div",{onClick:i[0]||(i[0]=(...e)=>m.minimizedIconClick&&m.minimizedIconClick(...e)),class:"minimized"},[(0,t._)("div",r,[(0,t.WI)(e.$slots,"icon")]),(0,t._)("div",l,[(0,t.WI)(e.$slots,"title")])])],8,["to"])),((0,t.wg)(),(0,t.j4)(t.lR,{to:c.teleport[0]},[(0,t.wy)((0,t._)("div",(0,t.dG)({ref:"floating-window"},e.$attrs,{class:["floating-window",{"glass-container-2":n.glassWindow,"flat-window":!n.glassWindow,"full-screen":c.isFullScreen}],onFocusin:i[22]||(i[22]=(...e)=>m.onFocus&&m.onFocus(...e)),onBlur:i[23]||(i[23]=(...e)=>m.onBlur&&m.onBlur(...e)),tabindex:"0"}),[(0,t._)("div",d,[(0,t._)("div",a,[(0,t._)("div",{class:"window-title noselect",onMousedown:i[1]||(i[1]=(0,o.iM)(((...e)=>m.moveWindowMouseDown&&m.moveWindowMouseDown(...e)),["prevent"])),onTouchstart:i[2]||(i[2]=(0,o.iM)(((...e)=>m.moveWindowMouseDown&&m.moveWindowMouseDown(...e)),["prevent"]))},[(0,t.WI)(e.$slots,"icon"),(0,t.WI)(e.$slots,"title")],32),(0,t._)("div",u,[(0,t.WI)(e.$slots,"extra-button"),(0,t._)("button",{class:"header-button",onClick:i[3]||(i[3]=(...e)=>m.toggleMinimize&&m.toggleMinimize(...e))},w),(0,t._)("button",{class:"header-button",onClick:i[4]||(i[4]=(...e)=>m.toggleFullScreen&&m.toggleFullScreen(...e))},[(0,t._)("i",{class:(0,s.C_)(["fa",c.isFullScreen?"fa-window-restore":"fa-window-maximize"])},null,2)]),(0,t._)("button",{class:"header-button close",onClick:i[5]||(i[5]=(...e)=>m.close&&m.close(...e))},f)])]),(0,t._)("div",p,[(0,t.WI)(e.$slots,"default")])]),(0,t._)("div",{class:"resizer n",onMousedown:i[6]||(i[6]=(...e)=>m.resizeMouseDown&&m.resizeMouseDown(...e)),onTouchstart:i[7]||(i[7]=(...e)=>m.resizeMouseDown&&m.resizeMouseDown(...e))},null,32),(0,t._)("div",{class:"resizer e",onMousedown:i[8]||(i[8]=(...e)=>m.resizeMouseDown&&m.resizeMouseDown(...e)),onTouchstart:i[9]||(i[9]=(...e)=>m.resizeMouseDown&&m.resizeMouseDown(...e))},null,32),(0,t._)("div",{class:"resizer s",onMousedown:i[10]||(i[10]=(...e)=>m.resizeMouseDown&&m.resizeMouseDown(...e)),onTouchstart:i[11]||(i[11]=(...e)=>m.resizeMouseDown&&m.resizeMouseDown(...e))},null,32),(0,t._)("div",{class:"resizer w",onMousedown:i[12]||(i[12]=(...e)=>m.resizeMouseDown&&m.resizeMouseDown(...e)),onTouchstart:i[13]||(i[13]=(...e)=>m.resizeMouseDown&&m.resizeMouseDown(...e))},null,32),(0,t._)("div",{class:"resizer nw",onMousedown:i[14]||(i[14]=(...e)=>m.resizeMouseDown&&m.resizeMouseDown(...e)),onTouchstart:i[15]||(i[15]=(...e)=>m.resizeMouseDown&&m.resizeMouseDown(...e))},null,32),(0,t._)("div",{class:"resizer sw",onMousedown:i[16]||(i[16]=(...e)=>m.resizeMouseDown&&m.resizeMouseDown(...e)),onTouchstart:i[17]||(i[17]=(...e)=>m.resizeMouseDown&&m.resizeMouseDown(...e))},null,32),(0,t._)("div",{class:"resizer se",onMousedown:i[18]||(i[18]=(...e)=>m.resizeMouseDown&&m.resizeMouseDown(...e)),onTouchstart:i[19]||(i[19]=(...e)=>m.resizeMouseDown&&m.resizeMouseDown(...e))},null,32),(0,t._)("div",{class:"resizer ne",onMousedown:i[20]||(i[20]=(...e)=>m.resizeMouseDown&&m.resizeMouseDown(...e)),onTouchstart:i[21]||(i[21]=(...e)=>m.resizeMouseDown&&m.resizeMouseDown(...e))},null,32)],16),[[o.F8,!c.isMinimized]])],8,["to"]))],64)}n(560);function v(e){var i=e;return!i.clientX&&e.touches&&e.touches.length&&(i=e.touches[0]),{clientX:i.clientX,clientY:i.clientY}}function M(){y.forEach((e=>{e.minimize()}))}function g(){var e=document.getElementById("FloatingWindowsContainer");if(e){var i=document.getElementById("FloatingWindowsIconContainer");return[e,i]}var n=document.createElement("div");n.id="FloatingWindowsContainer",n.style="position: fixed; bottom: 20px; left: 0; z-index: 20;";var t=document.createElement("div");t.tabIndex=-1,t.className="windows-apps-icon",t.style.display="none";var o=document.createElement("div");o.className="minimized",o.innerHTML='<div class="min-icon"><i class="fa fa-th"></i></div>',t.appendChild(o);var s=document.createElement("div");s.id="FloatingWindowsIconContainer",s.className="popup-window-icon-container material-popup";var r=document.createElement("div");return r.className="minimized",r.onclick=M,r.innerHTML='<div class="min-icon"><i class="fa fa-eye-slash"></i></div><div class="min-title">Minimize all</div>',s.appendChild(r),t.appendChild(s),n.appendChild(t),document.body.appendChild(n),[n,s]}var z=g(),y=[],b={emits:["close","minimize","restore","resize"],props:{wid:{required:!0},minheight:{type:Number,required:!1,default:30},minwidth:{type:Number,required:!1,default:130},glassWindow:{type:Boolean,default:!0},openMaximized:{type:Boolean,default:!1},size:{type:Object,required:!1},position:{required:!1}},data(){return{teleport:z,isFullScreen:!1,isMinimized:!1,onMouseMove:[],onMouseUp:[],beforeSnapSize:null}},created(){window.addEventListener("mouseup",this.mouseUp),window.addEventListener("touchend",this.mouseUp),window.addEventListener("touchleave",this.mouseUp),this.openMaximized&&(this.isFullScreen=!0),this.position&&this.position},mounted(){let e=this.$refs["floating-window"],i=this.size&&this.size.width?this.size.width:Math.min(window.innerWidth-30,Math.max(.5*window.innerWidth,900))+"px",n=this.size&&this.size.height?this.size.height:Math.min(window.innerHeight,Math.max(.5*window.innerHeight,500))+"px";var t=i,o=n;("string"===typeof t||t instanceof String)&&(t="%"!==t.slice(-1)?parseFloat(t):parseFloat(t)*window.innerWidth),("string"===typeof o||o instanceof String)&&(o="%"!==o.slice(-1)?parseFloat(o):parseFloat(o)*window.innerHeight);let s=(window.innerWidth-t)/window.innerWidth*100/2+1*y.length+"%",r=(window.innerHeight-o)/window.innerHeight*100/2+1*y.length+"%";e.style.height=n,e.style.width=i;var l=this.position;if(l&&("string"===typeof l||l instanceof String)){var d={};-1!==l.indexOf("top")?d.top="1%":-1!==l.indexOf("bottom")&&(d.bottom="1%"),-1!==l.indexOf("left")?d.left="2%":-1!==l.indexOf("right")&&(d.right="2%"),l=d}l?(l.bottom?e.style.bottom=l.bottom:e.style.top=l.top||r,l.right?e.style.right=l.right:e.style.left=l.left||s):(e.style.top=r,e.style.left=s),y.push(this),z[1].parentNode.style.display="",z[1].parentNode.style.zIndex=y.length+1,e.style.zIndex=y.length},beforeUnmount(){window.removeEventListener("mouseup",this.mouseUp),window.removeEventListener("touchend",this.mouseUp),window.removeEventListener("touchleave",this.mouseUp),this.removeEvents(),y.splice(y.indexOf(this),1),y.length||(z[1].parentNode.style.display="none")},watch:{},methods:{resizeMouseDown(e){e.preventDefault(),e.stopPropagation(),this.removeEvents(),this.$refs["floating-window"].focus();var i=e.target.classList[1],n=this.$refs["floating-window"].getBoundingClientRect();e=v(e),this.beforeSnapSize=null,-1!==i.indexOf("n")?this.onMouseMove.push((i=>this.resize(i,n,1,e))):-1!==i.indexOf("s")&&this.onMouseMove.push((e=>this.resize(e,n,1,!1))),-1!==i.indexOf("w")?this.onMouseMove.push((i=>this.resize(i,n,0,e))):-1!==i.indexOf("e")&&this.onMouseMove.push((e=>this.resize(e,n,0,!1))),this.onMouseMove.forEach((e=>{window.addEventListener("mousemove",e),window.addEventListener("touchmove",e)})),this.$refs["floating-window"].style.boxShadow="#008eff 0px 0px 0px 2px",document.body.style.pointerEvents="none",this.onMouseUp.push((()=>{document.body.style.pointerEvents=null,this.$refs["floating-window"].style.boxShadow=null}))},resize(e,i,n,t){var o,s=["width","height"][n],r=["clientX","clientY"][n],l=["left","top"][n];if(e=v(e),t){if(o=i[s]-(e[r]-t[r]),this["min"+s]>=o)return;this.$refs["floating-window"].style[s]=o+"px",this.$refs["floating-window"].style[l]=Math.max(0,i[l]+(e[r]-t[r]))+"px"}else{if(o=e[r]-i[l]+1,this["min"+s]>=o)return;this.$refs["floating-window"].style[s]=o+"px"}},moveWindowMouseDown(e){this.$refs["floating-window"].focus(),e=v(e);var i=this.$refs["floating-window"].getBoundingClientRect(),n=this.beforeSnapSize?-this.beforeSnapSize.width/2:i.left-e.clientX,t=i.top-e.clientY;this.isFullScreen&&(n=-parseInt(this.$refs["floating-window"].style.width)/2),this.onMouseMove.push((e=>this.moveWindow(e,n,t))),this.onMouseMove.forEach((e=>{window.addEventListener("mousemove",e),window.addEventListener("touchmove",e)})),this.onMouseUp.push(this.snapWindow),document.body.style.pointerEvents="none",this.onMouseUp.push((()=>document.body.style.pointerEvents=null))},moveWindow(e,i,n){e=v(e),this.isFullScreen=!1;var t=this.$refs["floating-window"].style;this.beforeSnapSize&&(t.height=this.beforeSnapSize.height+"px",t.width=this.beforeSnapSize.width+"px",this.beforeSnapSize=null),t.top=Math.max(0,Math.min(window.innerHeight-30,e.clientY+n)/window.innerHeight*100)+"%",t.left=Math.max(0,Math.min(window.innerWidth-30,e.clientX+i)/window.innerWidth*100)+"%"},snapWindow(e){var i=this.$refs["floating-window"],n=e.clientX,t=e.clientY,o=!1,s="100%",r="100%",l=0,d=0;if(n<15?(s="50%",d=0,o=!0):n>window.innerWidth-60&&(s="50%",d="50%",o=!0),t<15?(r="50%",l=0,o=!0):t>window.innerHeight-60&&(r="50%",l="50%",o=!0),!0===o){var a=i.getBoundingClientRect();this.beforeSnapSize={height:a.height,width:a.width},i.style.width=s,i.style.height=r,i.style.top=l,i.style.left=d}},applyMouseUpEvents(e){this.onMouseUp.forEach((i=>{i(e)}))},mouseUp(e){this.applyMouseUpEvents(e),this.removeEvents()},removeEvents(){this.onMouseMove.forEach((e=>{window.removeEventListener("mousemove",e),window.removeEventListener("touchmove",e)})),this.onMouseMove=[],this.onMouseUp=[]},moveToTheTop(){var e=y.indexOf(this);if(-1!==e){y.splice(e,1),y.push(this);for(var i=e;i<y.length;i++)y[i]&&(y[i].$refs["floating-window"].style.zIndex=i)}},onFocus(){this.moveToTheTop()},onBlur(){},toggleFullScreen(){this.isFullScreen=!this.isFullScreen},toggleMinimize(){this.isMinimized?this.resotreFromMinimized():this.minimize()},minimize(){this.$emit("minimize",this.wid),this.isMinimized=!0},resotreFromMinimized(){this.isMinimized=!1,this.moveToTheTop()},minimizedIconClick(){this.isMinimized?(this.$refs["floating-window"].focus(),this.toggleMinimize()):y.slice(-1)[0]!==this?this.$refs["floating-window"].focus():this.minimize()},outsideSetFocus(){this.$refs["floating-window"].focus(),this.isMinimized=!1},close(){this.$emit("close",this.wid)}}},x=n(3744);const D=(0,x.Z)(b,[["render",m]]);var S=D}}]);