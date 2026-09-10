(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))t(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&t(r)}).observe(document,{childList:!0,subtree:!0});function i(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(n){if(n.ep)return;n.ep=!0;const o=i(n);fetch(n.href,o)}})();const H={organization:"HIPMI Telkom University",subOrganization:"BPC HIPMI PT TELKOM UNIVERSITY",eventName:"Entrepreneur Summit 2026",eventTagline:"Ignite Passion, Build Future",year:"2026",dateText:"BANDUNG, 2026",logoHipmi:"/assets/logo-hipmi.png",logoTelu:"/assets/logo-telu.png",colors:{bg:"#FFFFFF",bgDark:"#0B0C0E",primary:"#111111",secondary:"#6B6B6B",muted:"#F5F5F5",border:"#E8E8E8",accent:"#C8A84B",accentDark:"#A88A30",accentLight:"#EAD79B"},photoCount:4,countdownSeconds:3,autoResetSeconds:15,shutterSoundEnabled:!0,mirrorCamera:!0,selectedCameraId:"",hostingUrl:"",cloudProvider:"none",imgbbApiKey:"",customUploadEndpoint:"",qrTarget:"viewer"},st="hipmi_photobooth_v1_config";function yt(){try{const l=localStorage.getItem(st);if(l){const e=JSON.parse(l);if(e&&typeof e=="object"&&!Array.isArray(e))return{...H,organization:typeof e.organization=="string"&&e.organization.trim()?e.organization.trim():H.organization,subOrganization:typeof e.subOrganization=="string"&&e.subOrganization.trim()?e.subOrganization.trim():H.subOrganization,eventName:typeof e.eventName=="string"&&e.eventName.trim()?e.eventName.trim():H.eventName,year:typeof e.year=="string"&&e.year.trim()?e.year.trim():H.year,photoCount:Number.isInteger(e.photoCount)&&e.photoCount>=1&&e.photoCount<=6?e.photoCount:H.photoCount,countdownSeconds:Number.isInteger(e.countdownSeconds)&&e.countdownSeconds>=1&&e.countdownSeconds<=10?e.countdownSeconds:H.countdownSeconds,autoResetSeconds:Number.isInteger(e.autoResetSeconds)&&e.autoResetSeconds>=0&&e.autoResetSeconds<=120?e.autoResetSeconds:H.autoResetSeconds,mirrorCamera:typeof e.mirrorCamera=="boolean"?e.mirrorCamera:!0,selectedCameraId:typeof e.selectedCameraId=="string"?e.selectedCameraId:"",hostingUrl:typeof e.hostingUrl=="string"?e.hostingUrl.trim():"",cloudProvider:["none","imgbb","custom"].includes(e.cloudProvider)?e.cloudProvider:"none",imgbbApiKey:typeof e.imgbbApiKey=="string"?e.imgbbApiKey.trim():"",customUploadEndpoint:typeof e.customUploadEndpoint=="string"?e.customUploadEndpoint.trim():"",qrTarget:["viewer","direct"].includes(e.qrTarget)?e.qrTarget:"viewer"}}}catch(l){console.warn("Could not load stored event configuration, using defaults.",l)}return{...H}}function vt(l){try{if(!l||typeof l!="object")return;localStorage.setItem(st,JSON.stringify(l))}catch(e){console.warn("Could not save event configuration (e.g. storage quota or private mode).",e)}}const J=[{id:"signature",name:"Signature Minimal",category:"Editorial",description:"Pristine white canvas with official HIPMI branding and clean typography.",badge:"Official",width:1200,height:1600,background:"#FFFFFF",textColor:"#111111",accentColor:"#C8A84B",header:{showLogo:!0,height:140,title:"HIPMI TELKOM UNIVERSITY",subtitle:"PHOTOBOOTH EXPERIENCE"},footer:{height:140,showDualLogo:!0,text:"BANDUNG • INDONESIA",showDate:!0},getSlots:l=>l===1?[{id:0,x:80,y:160,width:1040,height:1260,borderRadius:12,objectFit:"cover",border:"1px solid #EBEBEB"}]:l===2?[{id:0,x:80,y:160,width:1040,height:615,borderRadius:10,objectFit:"cover",border:"1px solid #EBEBEB"},{id:1,x:80,y:805,width:1040,height:615,borderRadius:10,objectFit:"cover",border:"1px solid #EBEBEB"}]:l===4?[{id:0,x:80,y:160,width:505,height:615,borderRadius:10,objectFit:"cover",border:"1px solid #EBEBEB"},{id:1,x:615,y:160,width:505,height:615,borderRadius:10,objectFit:"cover",border:"1px solid #EBEBEB"},{id:2,x:80,y:805,width:505,height:615,borderRadius:10,objectFit:"cover",border:"1px solid #EBEBEB"},{id:3,x:615,y:805,width:505,height:615,borderRadius:10,objectFit:"cover",border:"1px solid #EBEBEB"}]:[{id:0,x:80,y:160,width:1040,height:690,borderRadius:10,objectFit:"cover",border:"1px solid #EBEBEB"},{id:1,x:80,y:880,width:505,height:550,borderRadius:10,objectFit:"cover",border:"1px solid #EBEBEB"},{id:2,x:615,y:880,width:505,height:550,borderRadius:10,objectFit:"cover",border:"1px solid #EBEBEB"}]},{id:"bold",name:"Bold Editorial",category:"Typography",description:"High-contrast editorial layout with bold HIPMI typography and gold accents.",badge:"Trending",width:1200,height:1600,background:"#0E0E10",textColor:"#FFFFFF",accentColor:"#C8A84B",header:{showLogo:!0,height:180,boldEditorial:!0,title:"HIPMI",subheadline:"PT TELKOM UNIVERSITY"},footer:{height:150,showDualLogo:!1,text:"ENTREPRENEURIAL MOMENT",showDate:!0},getSlots:l=>l===1?[{id:0,x:60,y:200,width:1080,height:1220,borderRadius:8,objectFit:"cover",border:"2px solid #C8A84B"}]:l===2?[{id:0,x:60,y:200,width:1080,height:595,borderRadius:8,objectFit:"cover",border:"1px solid rgba(200,168,75,0.4)"},{id:1,x:60,y:825,width:1080,height:595,borderRadius:8,objectFit:"cover",border:"1px solid rgba(200,168,75,0.4)"}]:l===4?[{id:0,x:60,y:200,width:525,height:595,borderRadius:8,objectFit:"cover",border:"1px solid rgba(200,168,75,0.4)"},{id:1,x:615,y:200,width:525,height:595,borderRadius:8,objectFit:"cover",border:"1px solid rgba(200,168,75,0.4)"},{id:2,x:60,y:825,width:525,height:595,borderRadius:8,objectFit:"cover",border:"1px solid rgba(200,168,75,0.4)"},{id:3,x:615,y:825,width:525,height:595,borderRadius:8,objectFit:"cover",border:"1px solid rgba(200,168,75,0.4)"}]:[{id:0,x:60,y:200,width:1080,height:680,borderRadius:8,objectFit:"cover",border:"2px solid #C8A84B"},{id:1,x:60,y:910,width:525,height:510,borderRadius:8,objectFit:"cover",border:"1px solid rgba(200,168,75,0.4)"},{id:2,x:615,y:910,width:525,height:510,borderRadius:8,objectFit:"cover",border:"1px solid rgba(200,168,75,0.4)"}]},{id:"business",name:"Executive Summit",category:"Formal",description:"Sleek formal design suited for business talks, conferences, and summits.",badge:"Formal",width:1200,height:1600,background:"#12141A",textColor:"#FFFFFF",accentColor:"#D4AF37",header:{showLogo:!0,height:150,title:"SUMMIT & BUSINESS FORUM",subtitle:"HIPMI PT TELKOM UNIVERSITY"},footer:{height:140,showDualLogo:!0,text:"NETWORKING & LEADERSHIP",showDate:!0},getSlots:l=>l===1?[{id:0,x:90,y:170,width:1020,height:1240,borderRadius:4,objectFit:"cover",border:"2px solid #D4AF37"}]:l===2?[{id:0,x:90,y:170,width:1020,height:600,borderRadius:4,objectFit:"cover",border:"1.5px solid #D4AF37"},{id:1,x:90,y:800,width:1020,height:600,borderRadius:4,objectFit:"cover",border:"1.5px solid #D4AF37"}]:l===4?[{id:0,x:90,y:170,width:495,height:600,borderRadius:4,objectFit:"cover",border:"1.5px solid #D4AF37"},{id:1,x:615,y:170,width:495,height:600,borderRadius:4,objectFit:"cover",border:"1.5px solid #D4AF37"},{id:2,x:90,y:800,width:495,height:600,borderRadius:4,objectFit:"cover",border:"1.5px solid #D4AF37"},{id:3,x:615,y:800,width:495,height:600,borderRadius:4,objectFit:"cover",border:"1.5px solid #D4AF37"}]:[{id:0,x:90,y:170,width:1020,height:390,borderRadius:4,objectFit:"cover",border:"1.5px solid #D4AF37"},{id:1,x:90,y:585,width:1020,height:390,borderRadius:4,objectFit:"cover",border:"1.5px solid #D4AF37"},{id:2,x:90,y:1e3,width:1020,height:390,borderRadius:4,objectFit:"cover",border:"1.5px solid #D4AF37"}]},{id:"youth",name:"Youth Innovation",category:"Contemporary",description:"Modern asymmetrical rhythm, clean geometric accents, and bold youth energy.",badge:"Creative",width:1200,height:1600,background:"#F8F8F6",textColor:"#111111",accentColor:"#C8A84B",header:{showLogo:!0,height:140,title:"YOUTH FOUNDERS",subtitle:"HIPMI TELKOM UNIVERSITY"},footer:{height:140,showDualLogo:!0,text:"IDEATE • VALIDATE • SCALE",showDate:!0},getSlots:l=>l===1?[{id:0,x:70,y:160,width:1060,height:1260,borderRadius:16,objectFit:"cover",border:"3px solid #111111"}]:l===2?[{id:0,x:70,y:160,width:1060,height:610,borderRadius:16,objectFit:"cover",border:"3px solid #111111"},{id:1,x:70,y:800,width:1060,height:610,borderRadius:16,objectFit:"cover",border:"3px solid #C8A84B"}]:l===4?[{id:0,x:70,y:160,width:515,height:610,borderRadius:16,objectFit:"cover",border:"3px solid #111111"},{id:1,x:615,y:160,width:515,height:610,borderRadius:16,objectFit:"cover",border:"3px solid #C8A84B"},{id:2,x:70,y:800,width:515,height:610,borderRadius:16,objectFit:"cover",border:"3px solid #C8A84B"},{id:3,x:615,y:800,width:515,height:610,borderRadius:16,objectFit:"cover",border:"3px solid #111111"}]:[{id:0,x:70,y:160,width:610,height:1250,borderRadius:16,objectFit:"cover",border:"3px solid #111111"},{id:1,x:710,y:160,width:420,height:610,borderRadius:16,objectFit:"cover",border:"3px solid #C8A84B"},{id:2,x:710,y:800,width:420,height:610,borderRadius:16,objectFit:"cover",border:"3px solid #111111"}]},{id:"strip",name:"Classic Strip",category:"Photobooth",description:"Authentic vertical photobooth strip with signature HIPMI branding footer.",badge:"Classic",width:800,height:2e3,background:"#FFFFFF",textColor:"#111111",accentColor:"#C8A84B",header:{showLogo:!0,height:130,title:"HIPMI TEL-U",subtitle:"MEMORIES"},footer:{height:220,showDualLogo:!0,text:"HIPMI TELKOM UNIVERSITY",subtext:"2026 EDITION",showDate:!0},getSlots:l=>{if(l===1)return[{id:0,x:50,y:140,width:700,height:1600,borderRadius:4,objectFit:"cover",border:"1px solid #EEEEEE"}];if(l===2)return[{id:0,x:50,y:140,width:700,height:790,borderRadius:4,objectFit:"cover",border:"1px solid #EEEEEE"},{id:1,x:50,y:955,width:700,height:790,borderRadius:4,objectFit:"cover",border:"1px solid #EEEEEE"}];if(l===4)return[{id:0,x:50,y:140+0*410,width:700,height:390,borderRadius:4,objectFit:"cover",border:"1px solid #EEEEEE"},{id:1,x:50,y:140+1*410,width:700,height:390,borderRadius:4,objectFit:"cover",border:"1px solid #EEEEEE"},{id:2,x:50,y:140+2*410,width:700,height:390,borderRadius:4,objectFit:"cover",border:"1px solid #EEEEEE"},{id:3,x:50,y:140+3*410,width:700,height:390,borderRadius:4,objectFit:"cover",border:"1px solid #EEEEEE"}];const e=515,i=25;return[{id:0,x:50,y:140+0*(e+i),width:700,height:e,borderRadius:4,objectFit:"cover",border:"1px solid #E5E5E5"},{id:1,x:50,y:140+1*(e+i),width:700,height:e,borderRadius:4,objectFit:"cover",border:"1px solid #E5E5E5"},{id:2,x:50,y:140+2*(e+i),width:700,height:e,borderRadius:4,objectFit:"cover",border:"1px solid #E5E5E5"}]}},{id:"polaroid",name:"Modern Polaroid",category:"Physical",description:"Instant physical print aesthetic with wide bottom bezel for handwritten note.",badge:"Retro",width:1200,height:1500,background:"#FFFFFF",textColor:"#111111",accentColor:"#C8A84B",header:{showLogo:!1,height:40},footer:{height:250,showDualLogo:!0,text:"HIPMI Telkom University",showDate:!0},getSlots:l=>l===1?[{id:0,x:80,y:80,width:1040,height:1080,borderRadius:2,objectFit:"cover",border:"1px solid #ECECEC"}]:l===2?[{id:0,x:80,y:80,width:505,height:1080,borderRadius:2,objectFit:"cover",border:"1px solid #ECECEC"},{id:1,x:615,y:80,width:505,height:1080,borderRadius:2,objectFit:"cover",border:"1px solid #ECECEC"}]:l===4?[{id:0,x:80,y:80,width:505,height:525,borderRadius:2,objectFit:"cover",border:"1px solid #ECECEC"},{id:1,x:615,y:80,width:505,height:525,borderRadius:2,objectFit:"cover",border:"1px solid #ECECEC"},{id:2,x:80,y:635,width:505,height:525,borderRadius:2,objectFit:"cover",border:"1px solid #ECECEC"},{id:3,x:615,y:635,width:505,height:525,borderRadius:2,objectFit:"cover",border:"1px solid #ECECEC"}]:[{id:0,x:80,y:80,width:1040,height:640,borderRadius:2,objectFit:"cover",border:"1px solid #ECECEC"},{id:1,x:80,y:745,width:505,height:420,borderRadius:2,objectFit:"cover",border:"1px solid #ECECEC"},{id:2,x:615,y:745,width:505,height:420,borderRadius:2,objectFit:"cover",border:"1px solid #ECECEC"}]}];function bt(l){return J.find(e=>e.id===l)||J[0]}class wt{constructor(){this.imageCache=new Map}clearCache(e=!0){if(!e){this.imageCache.clear();return}for(const i of this.imageCache.keys())(i.startsWith("blob:")||i.startsWith("data:"))&&this.imageCache.delete(i)}async loadImage(e){if(!e){const i=new Image;return i.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",i}return this.imageCache.has(e)?this.imageCache.get(e):new Promise(i=>{const t=new Image;t.crossOrigin="anonymous",t.onload=()=>{this.imageCache.set(e,t),i(t)},t.onerror=n=>{console.warn(`Failed to load image: ${e}`,n);const o=new Image;o.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",i(o)},t.src=e})}drawFittedText(e,i,t,n,o,r=24,s="700",a="left",d="#111111"){if(i==null)return;const c=String(i).trim();if(!c)return;e.save(),e.textAlign=a,e.fillStyle=d;let h=r;const g=12,u='-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif';e.font=`${s} ${h}px ${u}`;let m=e.measureText(c).width;for(;m>o&&h>g;)h-=1,e.font=`${s} ${h}px ${u}`,m=e.measureText(c).width;if(m>o){const f=Array.from(c);for(;f.length>2&&e.measureText(f.join("")+"…").width>o;)f.pop();e.fillText(f.join("")+"…",t,n)}else e.fillText(c,t,n);e.restore()}drawImageCover(e,i,t,n,o,r,s=0){e.save(),s>0&&(e.beginPath(),e.moveTo(t+s,n),e.lineTo(t+o-s,n),e.quadraticCurveTo(t+o,n,t+o,n+s),e.lineTo(t+o,n+r-s),e.quadraticCurveTo(t+o,n+r,t+o-s,n+r),e.lineTo(t+s,n+r),e.quadraticCurveTo(t,n+r,t,n+r-s),e.lineTo(t,n+s),e.quadraticCurveTo(t,n,t+s,n),e.closePath(),e.clip());const a=i.naturalWidth||i.width||1,d=i.naturalHeight||i.height||1,c=a/d,h=o/r;let g,u,m,f;c>h?(f=d,m=d*h,g=(a-m)/2,u=0):(m=a,f=a/h,g=0,u=Math.max(0,(d-f)*.3)),e.drawImage(i,g,u,m,f,t,n,o,r),e.restore()}async renderComposition({photos:e=[],templateId:i="signature",customization:t={},eventConfig:n={},targetCanvas:o=null}){if(typeof document<"u"&&document.fonts&&document.fonts.ready)try{await document.fonts.ready}catch{}const r=bt(i),s=r.width,a=r.height,d=o||document.createElement("canvas");d.width=s,d.height=a;const c=d.getContext("2d");c.fillStyle=r.background,c.fillRect(0,0,s,a),r.id==="bold"?(c.fillStyle="rgba(200, 168, 75, 0.03)",c.fillRect(0,0,s,a),c.fillStyle="#C8A84B",c.fillRect(0,0,s,6),c.fillRect(0,a-6,s,6)):r.id==="business"?(c.strokeStyle="rgba(212, 175, 55, 0.35)",c.lineWidth=1,c.strokeRect(30,30,s-60,a-60)):r.id==="signature"&&(c.strokeStyle="#F0F0F0",c.lineWidth=1,c.strokeRect(40,40,s-80,a-80));const h=await this.loadImage(n.logoHipmi||"/assets/logo-hipmi.png"),g=await this.loadImage(n.logoTelu||"/assets/logo-telu.png"),u=await Promise.all(e.map(p=>this.loadImage(p.objectUrl||p.dataUrl))),m=e.length||n.photoCount||3;return r.getSlots(m).forEach((p,v)=>{const k=u[v]||u[0];if(k){if(this.drawImageCover(c,k,p.x,p.y,p.width,p.height,p.borderRadius),p.border){if(c.save(),c.strokeStyle=p.border.split(" ")[2]||r.accentColor,c.lineWidth=parseInt(p.border.split(" ")[0],10)||1,p.borderRadius>0){c.beginPath();const S=p.borderRadius,b=p.x,F=p.y,y=p.width,E=p.height;c.moveTo(b+S,F),c.lineTo(b+y-S,F),c.quadraticCurveTo(b+y,F,b+y,F+S),c.lineTo(b+y,F+E-S),c.quadraticCurveTo(b+y,F+E,b+y-S,F+E),c.lineTo(b+S,F+E),c.quadraticCurveTo(b,F+E,b,F+E-S),c.lineTo(b,F+S),c.quadraticCurveTo(b,F,b+S,F),c.closePath(),c.stroke()}else c.strokeRect(p.x,p.y,p.width,p.height);c.restore()}}else c.fillStyle="#E5E5E5",c.fillRect(p.x,p.y,p.width,p.height)}),this._renderHeader(c,r,n,t,h,g,s),this._renderFooter(c,r,n,t,h,g,s,a),d}_calcLogoWidth(e,i){const t=e&&(e.naturalHeight||e.height)||1,n=e&&(e.naturalWidth||e.width)||1;return Math.max(1,Math.round(n/t*i))}_renderHeader(e,i,t,n,o,r,s){const a=i.background==="#0E0E10"||i.background==="#12141A",d=i.textColor||(a?"#FFFFFF":"#111111"),c=i.accentColor||"#C8A84B";if(i.id==="signature"){const g=this._calcLogoWidth(o,65);e.drawImage(o,80,65,g,65);const u=Math.max(50,s-80-(80+g+40));this.drawFittedText(e,t.organization.toUpperCase(),s-80,90,u,24,"700","right",d),this.drawFittedText(e,n.eventName||t.eventName,s-80,115,u,15,"500","right","#8E8E93")}else if(i.id==="bold"){const g=this._calcLogoWidth(o,75);e.drawImage(o,60,60,g,75),e.textAlign="left",e.fillStyle=d,e.font='900 48px -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif',e.fillText("HIPMI",60+g+20,102),e.fillStyle=c,e.font='700 20px -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif',e.fillText("TELKOM UNIVERSITY",60+g+24,130),e.textAlign="right",e.fillStyle="#FFFFFF",e.font='600 16px -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif',e.fillText(t.year,s-60,95),e.fillStyle="#888888",e.font='500 13px -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif',e.fillText("OFFICIAL ARCHIVE",s-60,120)}else if(i.id==="business"){const g=this._calcLogoWidth(o,60);e.drawImage(o,90,65,g,60);const u=Math.max(50,s-(90+g+40)-90);this.drawFittedText(e,"EXECUTIVE FORUM & NETWORKING",90+g+25,90,u,18,"700","left",c),this.drawFittedText(e,"BPC HIPMI PT TELKOM UNIVERSITY",90+g+25,115,u,15,"500","left","#CCCCCC"),e.fillStyle=c,e.fillRect(90,145,s-180,1)}else if(i.id==="youth"){const g=this._calcLogoWidth(o,58);e.drawImage(o,70,65,g,58);const u=Math.max(50,s-(70+g+40)-70);this.drawFittedText(e,"FUTURE ENTREPRENEURS",70+g+20,95,u,28,"900","left","#111111"),this.drawFittedText(e,"HIPMI TELKOM UNIVERSITY • 2026",70+g+20,120,u,15,"700","left",c)}else if(i.id==="strip"){const g=this._calcLogoWidth(o,50),u=(s-g)/2;e.drawImage(o,u,45,g,50),this.drawFittedText(e,"HIPMI TELKOM UNIVERSITY",s/2,115,s-100,16,"800","center","#111111")}}_renderFooter(e,i,t,n,o,r,s,a){const d=i.background==="#0E0E10"||i.background==="#12141A",c=i.textColor||(d?"#FFFFFF":"#111111"),h=d?"#9E9E9E":"#6E6E73",g=i.accentColor||"#C8A84B";if(i.id==="signature"){const u=a-100,m=42,f=this._calcLogoWidth(r,m);e.drawImage(r,80,u-5,f,m);const p=Math.max(50,s-80-(80+f+40)),v=n.name?n.name.toUpperCase():"HIPMI TELKOM UNIVERSITY",k=n.message||t.dateText;this.drawFittedText(e,v,s-80,u+5,p,24,"700","right",c),this.drawFittedText(e,k,s-80,u+30,p,15,"500","right",h)}else if(i.id==="bold"){const u=a-100,m=40,f=this._calcLogoWidth(r,m);e.drawImage(r,s-60-f,u-5,f,m);const p=Math.max(50,s-60-f-40-60),v=n.name?n.name.toUpperCase():"ENTREPRENEURIAL SPIRIT",k=n.message||"MAKE A MOMENT. BUILD THE FUTURE.";this.drawFittedText(e,v,60,u+10,p,22,"800","left",g),this.drawFittedText(e,k,60,u+35,p,15,"500","left","#777777")}else if(i.id==="business"){const u=a-105;e.fillStyle=g,e.fillRect(90,u-20,s-180,1);const m=38,f=this._calcLogoWidth(r,m);e.drawImage(r,s-90-f,u-2,f,m);const p=Math.max(50,s-90-f-40-90),v=n.name?n.name.toUpperCase():"PARTICIPANT OF EXCELLENCE",k=n.eventName||t.eventName;this.drawFittedText(e,v,90,u+15,p,20,"700","left","#FFFFFF"),this.drawFittedText(e,k,90,u+38,p,14,"500","left",g)}else if(i.id==="youth"){const u=a-100,m=40,f=this._calcLogoWidth(r,m);e.drawImage(r,s-70-f,u-5,f,m);const p=Math.max(50,s-70-f-40-70),v=n.name?n.name:"YOUNG ENTREPRENEUR",k=n.message||"#PENGUSAHAMUDA • TELKOM UNIVERSITY";this.drawFittedText(e,v,70,u+10,p,24,"800","left","#111111"),this.drawFittedText(e,k,70,u+35,p,15,"600","left",g)}else if(i.id==="strip"){const u=a-150;e.fillStyle=g,e.fillRect((s-80)/2,u,80,3);const m=n.name?n.name.toUpperCase():"HIPMI TEL-U",f=n.eventName||t.eventName;this.drawFittedText(e,m,s/2,u+35,s-100,22,"800","center","#111111"),this.drawFittedText(e,f,s/2,u+60,s-100,14,"600","center","#777777");const p=32,v=this._calcLogoWidth(r,p);e.drawImage(r,(s-v)/2,u+75,v,p)}else if(i.id==="polaroid"){const u=a-180,m=45,f=this._calcLogoWidth(o,m);e.drawImage(o,s-80-f,u+25,f,m);const p=Math.max(50,s-80-(80+f+40)),v=n.name?n.name:"HIPMI Telkom University",k=n.message||t.dateText;this.drawFittedText(e,v,80,u+40,p,26,"700","left","#111111"),this.drawFittedText(e,k,80,u+70,p,16,"500","left","#8E8E93")}}async exportBlob(e,i="image/png",t=.95){return new Promise(n=>{e.toBlob(o=>n(o),i,t)})}}const Y=new wt;class Et{constructor(){this.currentSession=null,this.createdObjectUrls=new Set,this.activeTimers=new Set,this.listeners=new Set}startNewSession(e){this.cleanupCurrentSession();const i=Date.now(),t=Math.random().toString(36).substring(2,7).toUpperCase(),n=`HIPMI-${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${t}`;return this.currentSession={sessionId:n,startedAt:i,totalSlots:e.photoCount||4,currentCaptureIndex:0,photos:[],selectedTemplateId:"signature",customization:{name:"",eventName:e.eventName||"Entrepreneur Summit 2026",message:""},finalBlob:null,finalObjectUrl:null,finalDataUrl:null,isCompleted:!1},this._notify(),this.currentSession}getSession(){return this.currentSession}addPhoto(e,i,t){if(!this.currentSession)return;const n=URL.createObjectURL(i);this.createdObjectUrls.add(n);const o=this.currentSession.photos.findIndex(r=>r.index===e);if(o!==-1){const r=this.currentSession.photos[o];r.objectUrl&&(URL.revokeObjectURL(r.objectUrl),this.createdObjectUrls.delete(r.objectUrl)),this.currentSession.photos[o]={index:e,blob:i,objectUrl:n,dataUrl:t}}else this.currentSession.photos.push({index:e,blob:i,objectUrl:n,dataUrl:t}),this.currentSession.photos.sort((r,s)=>r.index-s.index);this._notify()}getPhoto(e){return this.currentSession&&this.currentSession.photos.find(i=>i.index===e)||null}setTemplate(e){this.currentSession&&(this.currentSession.selectedTemplateId=e,this._notify())}setCustomization(e){this.currentSession&&(this.currentSession.customization={...this.currentSession.customization,...e},this._notify())}setFinalResult(e,i){if(!this.currentSession)return;this.currentSession.finalObjectUrl&&(URL.revokeObjectURL(this.currentSession.finalObjectUrl),this.createdObjectUrls.delete(this.currentSession.finalObjectUrl));const t=URL.createObjectURL(e);this.createdObjectUrls.add(t),this.currentSession.finalBlob=e,this.currentSession.finalObjectUrl=t,this.currentSession.finalDataUrl=i,this.currentSession.isCompleted=!0,this._notify()}registerTimer(e,i=!1){return this.activeTimers.add({id:e,isInterval:i}),e}unregisterTimer(e){for(const i of this.activeTimers)if(i.id===e){this.activeTimers.delete(i);break}}clearAllTimers(){this.activeTimers.forEach(e=>{try{e.isInterval?clearInterval(e.id):clearTimeout(e.id)}catch{}}),this.activeTimers.clear()}cleanupCurrentSession(){this.clearAllTimers(),this.createdObjectUrls.forEach(e=>{try{URL.revokeObjectURL(e)}catch{}}),this.createdObjectUrls.clear();try{Y.clearCache(!0)}catch{}this.currentSession=null,this._notify()}resetSession(){this.cleanupCurrentSession()}subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}_notify(){this.listeners.forEach(e=>{try{e(this.currentSession)}catch(i){console.error("Session listener error:",i)}})}}const C=new Et;class St{constructor(){this.stream=null,this.currentDeviceId=null,this.devices=[],this.videoElement=null,this.isSimulated=!1,this._simulationInterval=null,this.isMirror=!0,this.isStopping=!1,this.disconnectCallbacks=new Set,typeof navigator<"u"&&navigator.mediaDevices&&navigator.mediaDevices.addEventListener&&navigator.mediaDevices.addEventListener("devicechange",async()=>{if([...this.devices],await this.getDevices(),this.stream&&!this.isSimulated){const e=this.stream.getVideoTracks()[0];(!e||e.readyState==="ended")&&this._notifyDisconnect()}})}onDisconnect(e){return this.disconnectCallbacks.add(e),()=>this.disconnectCallbacks.delete(e)}_notifyDisconnect(){this.isStopping||this.disconnectCallbacks.forEach(e=>{try{e()}catch(i){console.warn("Error in disconnect callback:",i)}})}async getDevices(){if(!navigator.mediaDevices||!navigator.mediaDevices.enumerateDevices)return this.devices=[{deviceId:"simulated",label:"Virtual Test Camera (HIPMI Studio Simulation)"}],this.devices;try{const i=(await navigator.mediaDevices.enumerateDevices()).filter(t=>t.kind==="videoinput");return this.devices=[...i],this.devices.push({deviceId:"simulated",label:"Virtual Test Camera (HIPMI Studio Simulation)"}),this.devices}catch(e){return console.warn("Could not enumerate camera devices:",e),this.devices=[{deviceId:"simulated",label:"Virtual Test Camera (HIPMI Studio Simulation)"}],this.devices}}async getPhysicalDevices(){return await this.getDevices(),this.devices.filter(e=>e.deviceId!=="simulated")}async startCamera(e,i=null,t=null){this.videoElement=e,this.isStopping=!1,this.stopCamera();const n=new URLSearchParams(window.location.search);if(i==="simulated"||n.get("simulated")==="true"||n.get("camera")==="mock"||n.get("mock")==="true")return this.isMirror=t!==null?t:!1,this._startSimulatedCamera(e);t!==null?this.isMirror=t:this.isMirror=!0;const o={audio:!1,video:{width:{ideal:1920},height:{ideal:1080},facingMode:i?void 0:"user"}};i&&(o.video.deviceId={ideal:i});try{if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)throw new Error("NOT_SUPPORTED");try{this.stream=await navigator.mediaDevices.getUserMedia(o)}catch(s){if(s.name==="OverconstrainedError"||s.name==="ConstraintNotSatisfiedError")console.warn("Camera overconstrained with ideal resolution, retrying with generic constraints:",s),this.stream=await navigator.mediaDevices.getUserMedia({video:!0,audio:!1});else throw s}if(this.isSimulated=!1,this.videoElement){this.videoElement.srcObject=this.stream,this.videoElement.style.transform=this.isMirror?"scaleX(-1)":"none";try{await this.videoElement.play()}catch(s){console.warn("video.play() was interrupted or waiting for user gesture:",s)}}const r=this.stream.getVideoTracks();if(r.length>0){const s=r[0].getSettings?r[0].getSettings():{};if(this.currentDeviceId=s.deviceId||i,t===null){const a=(r[0].label||"").toLowerCase();(s.facingMode||"")==="environment"||a.includes("back")||a.includes("rear")?this.setMirror(!1):this.setMirror(!0)}r[0].onended=()=>{this.isStopping||(console.warn("Camera track ended unexpectedly"),this._notifyDisconnect())}}return await this.getDevices(),{success:!0,isSimulated:!1}}catch(r){if(console.warn("Real camera access failed, checking fallback:",r),r.name==="NotAllowedError"||r.name==="PermissionDeniedError"||r.message==="PERMISSION_DENIED")throw new Error("PERMISSION_DENIED");return this._startSimulatedCamera(e)}}_startSimulatedCamera(e){this.isSimulated=!0;const i=document.createElement("canvas");i.width=1280,i.height=720;const t=i.getContext("2d");let n=0;const o=()=>{n++;const s=t.createLinearGradient(0,0,1280,720);s.addColorStop(0,"#1E222B"),s.addColorStop(1,"#0D0F12"),t.fillStyle=s,t.fillRect(0,0,1280,720),t.fillStyle="rgba(200, 168, 75, 0.08)",t.beginPath(),t.arc(640+Math.sin(n*.02)*80,320,260,0,Math.PI*2),t.fill(),t.fillStyle="#2A2E39",t.beginPath(),t.arc(640,280,100,0,Math.PI*2),t.fill(),t.beginPath(),t.ellipse(640,520,220,160,0,0,Math.PI),t.fill(),t.fillStyle="#C8A84B",t.font='bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',t.textAlign="center",t.fillText("SIMULATED CAMERA • HIPMI BOOTH TEST MODE",640,80),t.fillStyle="#A0A0A0",t.font='16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',t.fillText(new Date().toLocaleTimeString(),640,115)};o(),this._simulationInterval=setInterval(o,1e3/30);const r=i.captureStream(30);return this.stream=r,e&&(e.srcObject=r,e.style.transform="none",e.play().catch(()=>{})),{success:!0,isSimulated:!0}}setMirror(e){this.isMirror=e,this.videoElement&&(this.videoElement.style.transform=e&&!this.isSimulated?"scaleX(-1)":"none")}async switchCamera(){if(this.isSwitching)return this.currentDeviceId;this.isSwitching=!0;try{const e=await this.getPhysicalDevices();if(e.length<=1)return this.currentDeviceId;const i=e.findIndex(a=>a.deviceId===this.currentDeviceId),t=i===-1?0:(i+1)%e.length,n=e[t],o=(n.label||"").toLowerCase(),s=!(o.includes("back")||o.includes("rear")||o.includes("environment"));return await this.startCamera(this.videoElement,n.deviceId,s),n.deviceId}finally{this.isSwitching=!1}}async waitForVideoReady(e=1500){if(!this.videoElement)throw new Error("NO_VIDEO_ELEMENT");if(!this.stream&&!this.isSimulated)throw new Error("NO_ACTIVE_STREAM");const i=this.videoElement;return i.videoWidth>0&&i.videoHeight>0&&i.readyState>=2?!0:new Promise((t,n)=>{const o=setTimeout(()=>{s(),i.videoWidth>0&&i.videoHeight>0?t(!0):n(new Error("VIDEO_NOT_READY"))},e),r=()=>{i.videoWidth>0&&i.videoHeight>0&&(s(),t(!0))},s=()=>{clearTimeout(o),i.removeEventListener("loadedmetadata",r),i.removeEventListener("canplay",r)};i.addEventListener("loadedmetadata",r),i.addEventListener("canplay",r)})}async capturePhoto(){if(!this.videoElement)throw new Error("NO_VIDEO_ELEMENT");await this.waitForVideoReady(1500);const e=this.videoElement,i=e.videoWidth||1280,t=e.videoHeight||720;if(i<=0||t<=0)throw new Error("INVALID_VIDEO_DIMENSIONS");const n=document.createElement("canvas");n.width=i,n.height=t;const o=n.getContext("2d");if(!o)throw new Error("CANVAS_CONTEXT_FAILED");return this.isMirror&&!this.isSimulated&&(o.translate(i,0),o.scale(-1,1)),o.drawImage(e,0,0,i,t),new Promise((r,s)=>{n.toBlob(a=>{if(!a){s(new Error("CANVAS_TO_BLOB_FAILED"));return}const d=n.toDataURL("image/jpeg",.95);r({blob:a,dataUrl:d,width:i,height:t})},"image/jpeg",.95)})}stopCamera(){this.isStopping=!0,this._simulationInterval&&(clearInterval(this._simulationInterval),this._simulationInterval=null),this.stream&&(this.stream.getTracks().forEach(e=>{try{e.stop()}catch{}}),this.stream=null),this.videoElement&&(this.videoElement.srcObject=null,this.videoElement.onloadedmetadata=null,this.videoElement.oncanplay=null),this.isStopping=!1}}const D=new St;function Ct(l){return l&&l.__esModule&&Object.prototype.hasOwnProperty.call(l,"default")?l.default:l}var W={},oe,Fe;function xt(){return Fe||(Fe=1,oe=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),oe}var re={},q={},Me;function j(){if(Me)return q;Me=1;let l;const e=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return q.getSymbolSize=function(t){if(!t)throw new Error('"version" cannot be null or undefined');if(t<1||t>40)throw new Error('"version" should be in range from 1 to 40');return t*4+17},q.getSymbolTotalCodewords=function(t){return e[t]},q.getBCHDigit=function(i){let t=0;for(;i!==0;)t++,i>>>=1;return t},q.setToSJISFunction=function(t){if(typeof t!="function")throw new Error('"toSJISFunc" is not a valid function.');l=t},q.isKanjiModeEnabled=function(){return typeof l<"u"},q.toSJIS=function(t){return l(t)},q}var se={},Pe;function Ae(){return Pe||(Pe=1,(function(l){l.L={bit:1},l.M={bit:0},l.Q={bit:3},l.H={bit:2};function e(i){if(typeof i!="string")throw new Error("Param is not a string");switch(i.toLowerCase()){case"l":case"low":return l.L;case"m":case"medium":return l.M;case"q":case"quartile":return l.Q;case"h":case"high":return l.H;default:throw new Error("Unknown EC Level: "+i)}}l.isValid=function(t){return t&&typeof t.bit<"u"&&t.bit>=0&&t.bit<4},l.from=function(t,n){if(l.isValid(t))return t;try{return e(t)}catch{return n}}})(se)),se}var ae,De;function Tt(){if(De)return ae;De=1;function l(){this.buffer=[],this.length=0}return l.prototype={get:function(e){const i=Math.floor(e/8);return(this.buffer[i]>>>7-e%8&1)===1},put:function(e,i){for(let t=0;t<i;t++)this.putBit((e>>>i-t-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(e){const i=Math.floor(this.length/8);this.buffer.length<=i&&this.buffer.push(0),e&&(this.buffer[i]|=128>>>this.length%8),this.length++}},ae=l,ae}var le,Le;function kt(){if(Le)return le;Le=1;function l(e){if(!e||e<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=e,this.data=new Uint8Array(e*e),this.reservedBit=new Uint8Array(e*e)}return l.prototype.set=function(e,i,t,n){const o=e*this.size+i;this.data[o]=t,n&&(this.reservedBit[o]=!0)},l.prototype.get=function(e,i){return this.data[e*this.size+i]},l.prototype.xor=function(e,i,t){this.data[e*this.size+i]^=t},l.prototype.isReserved=function(e,i){return this.reservedBit[e*this.size+i]},le=l,le}var ce={},Ne;function At(){return Ne||(Ne=1,(function(l){const e=j().getSymbolSize;l.getRowColCoords=function(t){if(t===1)return[];const n=Math.floor(t/7)+2,o=e(t),r=o===145?26:Math.ceil((o-13)/(2*n-2))*2,s=[o-7];for(let a=1;a<n-1;a++)s[a]=s[a-1]-r;return s.push(6),s.reverse()},l.getPositions=function(t){const n=[],o=l.getRowColCoords(t),r=o.length;for(let s=0;s<r;s++)for(let a=0;a<r;a++)s===0&&a===0||s===0&&a===r-1||s===r-1&&a===0||n.push([o[s],o[a]]);return n}})(ce)),ce}var de={},Ue;function It(){if(Ue)return de;Ue=1;const l=j().getSymbolSize,e=7;return de.getPositions=function(t){const n=l(t);return[[0,0],[n-e,0],[0,n-e]]},de}var ue={},He;function Rt(){return He||(He=1,(function(l){l.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const e={N1:3,N2:3,N3:40,N4:10};l.isValid=function(n){return n!=null&&n!==""&&!isNaN(n)&&n>=0&&n<=7},l.from=function(n){return l.isValid(n)?parseInt(n,10):void 0},l.getPenaltyN1=function(n){const o=n.size;let r=0,s=0,a=0,d=null,c=null;for(let h=0;h<o;h++){s=a=0,d=c=null;for(let g=0;g<o;g++){let u=n.get(h,g);u===d?s++:(s>=5&&(r+=e.N1+(s-5)),d=u,s=1),u=n.get(g,h),u===c?a++:(a>=5&&(r+=e.N1+(a-5)),c=u,a=1)}s>=5&&(r+=e.N1+(s-5)),a>=5&&(r+=e.N1+(a-5))}return r},l.getPenaltyN2=function(n){const o=n.size;let r=0;for(let s=0;s<o-1;s++)for(let a=0;a<o-1;a++){const d=n.get(s,a)+n.get(s,a+1)+n.get(s+1,a)+n.get(s+1,a+1);(d===4||d===0)&&r++}return r*e.N2},l.getPenaltyN3=function(n){const o=n.size;let r=0,s=0,a=0;for(let d=0;d<o;d++){s=a=0;for(let c=0;c<o;c++)s=s<<1&2047|n.get(d,c),c>=10&&(s===1488||s===93)&&r++,a=a<<1&2047|n.get(c,d),c>=10&&(a===1488||a===93)&&r++}return r*e.N3},l.getPenaltyN4=function(n){let o=0;const r=n.data.length;for(let a=0;a<r;a++)o+=n.data[a];return Math.abs(Math.ceil(o*100/r/5)-10)*e.N4};function i(t,n,o){switch(t){case l.Patterns.PATTERN000:return(n+o)%2===0;case l.Patterns.PATTERN001:return n%2===0;case l.Patterns.PATTERN010:return o%3===0;case l.Patterns.PATTERN011:return(n+o)%3===0;case l.Patterns.PATTERN100:return(Math.floor(n/2)+Math.floor(o/3))%2===0;case l.Patterns.PATTERN101:return n*o%2+n*o%3===0;case l.Patterns.PATTERN110:return(n*o%2+n*o%3)%2===0;case l.Patterns.PATTERN111:return(n*o%3+(n+o)%2)%2===0;default:throw new Error("bad maskPattern:"+t)}}l.applyMask=function(n,o){const r=o.size;for(let s=0;s<r;s++)for(let a=0;a<r;a++)o.isReserved(a,s)||o.xor(a,s,i(n,a,s))},l.getBestMask=function(n,o){const r=Object.keys(l.Patterns).length;let s=0,a=1/0;for(let d=0;d<r;d++){o(d),l.applyMask(d,n);const c=l.getPenaltyN1(n)+l.getPenaltyN2(n)+l.getPenaltyN3(n)+l.getPenaltyN4(n);l.applyMask(d,n),c<a&&(a=c,s=d)}return s}})(ue)),ue}var Z={},Oe;function at(){if(Oe)return Z;Oe=1;const l=Ae(),e=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],i=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return Z.getBlocksCount=function(n,o){switch(o){case l.L:return e[(n-1)*4+0];case l.M:return e[(n-1)*4+1];case l.Q:return e[(n-1)*4+2];case l.H:return e[(n-1)*4+3];default:return}},Z.getTotalCodewordsCount=function(n,o){switch(o){case l.L:return i[(n-1)*4+0];case l.M:return i[(n-1)*4+1];case l.Q:return i[(n-1)*4+2];case l.H:return i[(n-1)*4+3];default:return}},Z}var he={},Q={},qe;function Bt(){if(qe)return Q;qe=1;const l=new Uint8Array(512),e=new Uint8Array(256);return(function(){let t=1;for(let n=0;n<255;n++)l[n]=t,e[t]=n,t<<=1,t&256&&(t^=285);for(let n=255;n<512;n++)l[n]=l[n-255]})(),Q.log=function(t){if(t<1)throw new Error("log("+t+")");return e[t]},Q.exp=function(t){return l[t]},Q.mul=function(t,n){return t===0||n===0?0:l[e[t]+e[n]]},Q}var $e;function Ft(){return $e||($e=1,(function(l){const e=Bt();l.mul=function(t,n){const o=new Uint8Array(t.length+n.length-1);for(let r=0;r<t.length;r++)for(let s=0;s<n.length;s++)o[r+s]^=e.mul(t[r],n[s]);return o},l.mod=function(t,n){let o=new Uint8Array(t);for(;o.length-n.length>=0;){const r=o[0];for(let a=0;a<n.length;a++)o[a]^=e.mul(n[a],r);let s=0;for(;s<o.length&&o[s]===0;)s++;o=o.slice(s)}return o},l.generateECPolynomial=function(t){let n=new Uint8Array([1]);for(let o=0;o<t;o++)n=l.mul(n,new Uint8Array([1,e.exp(o)]));return n}})(he)),he}var ge,_e;function Mt(){if(_e)return ge;_e=1;const l=Ft();function e(i){this.genPoly=void 0,this.degree=i,this.degree&&this.initialize(this.degree)}return e.prototype.initialize=function(t){this.degree=t,this.genPoly=l.generateECPolynomial(this.degree)},e.prototype.encode=function(t){if(!this.genPoly)throw new Error("Encoder not initialized");const n=new Uint8Array(t.length+this.degree);n.set(t);const o=l.mod(n,this.genPoly),r=this.degree-o.length;if(r>0){const s=new Uint8Array(this.degree);return s.set(o,r),s}return o},ge=e,ge}var fe={},pe={},me={},je;function lt(){return je||(je=1,me.isValid=function(e){return!isNaN(e)&&e>=1&&e<=40}),me}var L={},ze;function ct(){if(ze)return L;ze=1;const l="[0-9]+",e="[A-Z $%*+\\-./:]+";let i="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";i=i.replace(/u/g,"\\u");const t="(?:(?![A-Z0-9 $%*+\\-./:]|"+i+`)(?:.|[\r
]))+`;L.KANJI=new RegExp(i,"g"),L.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),L.BYTE=new RegExp(t,"g"),L.NUMERIC=new RegExp(l,"g"),L.ALPHANUMERIC=new RegExp(e,"g");const n=new RegExp("^"+i+"$"),o=new RegExp("^"+l+"$"),r=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return L.testKanji=function(a){return n.test(a)},L.testNumeric=function(a){return o.test(a)},L.testAlphanumeric=function(a){return r.test(a)},L}var Ve;function z(){return Ve||(Ve=1,(function(l){const e=lt(),i=ct();l.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},l.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},l.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},l.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},l.MIXED={bit:-1},l.getCharCountIndicator=function(o,r){if(!o.ccBits)throw new Error("Invalid mode: "+o);if(!e.isValid(r))throw new Error("Invalid version: "+r);return r>=1&&r<10?o.ccBits[0]:r<27?o.ccBits[1]:o.ccBits[2]},l.getBestModeForData=function(o){return i.testNumeric(o)?l.NUMERIC:i.testAlphanumeric(o)?l.ALPHANUMERIC:i.testKanji(o)?l.KANJI:l.BYTE},l.toString=function(o){if(o&&o.id)return o.id;throw new Error("Invalid mode")},l.isValid=function(o){return o&&o.bit&&o.ccBits};function t(n){if(typeof n!="string")throw new Error("Param is not a string");switch(n.toLowerCase()){case"numeric":return l.NUMERIC;case"alphanumeric":return l.ALPHANUMERIC;case"kanji":return l.KANJI;case"byte":return l.BYTE;default:throw new Error("Unknown mode: "+n)}}l.from=function(o,r){if(l.isValid(o))return o;try{return t(o)}catch{return r}}})(pe)),pe}var We;function Pt(){return We||(We=1,(function(l){const e=j(),i=at(),t=Ae(),n=z(),o=lt(),r=7973,s=e.getBCHDigit(r);function a(g,u,m){for(let f=1;f<=40;f++)if(u<=l.getCapacity(f,m,g))return f}function d(g,u){return n.getCharCountIndicator(g,u)+4}function c(g,u){let m=0;return g.forEach(function(f){const p=d(f.mode,u);m+=p+f.getBitsLength()}),m}function h(g,u){for(let m=1;m<=40;m++)if(c(g,m)<=l.getCapacity(m,u,n.MIXED))return m}l.from=function(u,m){return o.isValid(u)?parseInt(u,10):m},l.getCapacity=function(u,m,f){if(!o.isValid(u))throw new Error("Invalid QR Code version");typeof f>"u"&&(f=n.BYTE);const p=e.getSymbolTotalCodewords(u),v=i.getTotalCodewordsCount(u,m),k=(p-v)*8;if(f===n.MIXED)return k;const S=k-d(f,u);switch(f){case n.NUMERIC:return Math.floor(S/10*3);case n.ALPHANUMERIC:return Math.floor(S/11*2);case n.KANJI:return Math.floor(S/13);case n.BYTE:default:return Math.floor(S/8)}},l.getBestVersionForData=function(u,m){let f;const p=t.from(m,t.M);if(Array.isArray(u)){if(u.length>1)return h(u,p);if(u.length===0)return 1;f=u[0]}else f=u;return a(f.mode,f.getLength(),p)},l.getEncodedBits=function(u){if(!o.isValid(u)||u<7)throw new Error("Invalid QR Code version");let m=u<<12;for(;e.getBCHDigit(m)-s>=0;)m^=r<<e.getBCHDigit(m)-s;return u<<12|m}})(fe)),fe}var ye={},Ke;function Dt(){if(Ke)return ye;Ke=1;const l=j(),e=1335,i=21522,t=l.getBCHDigit(e);return ye.getEncodedBits=function(o,r){const s=o.bit<<3|r;let a=s<<10;for(;l.getBCHDigit(a)-t>=0;)a^=e<<l.getBCHDigit(a)-t;return(s<<10|a)^i},ye}var ve={},be,Ye;function Lt(){if(Ye)return be;Ye=1;const l=z();function e(i){this.mode=l.NUMERIC,this.data=i.toString()}return e.getBitsLength=function(t){return 10*Math.floor(t/3)+(t%3?t%3*3+1:0)},e.prototype.getLength=function(){return this.data.length},e.prototype.getBitsLength=function(){return e.getBitsLength(this.data.length)},e.prototype.write=function(t){let n,o,r;for(n=0;n+3<=this.data.length;n+=3)o=this.data.substr(n,3),r=parseInt(o,10),t.put(r,10);const s=this.data.length-n;s>0&&(o=this.data.substr(n),r=parseInt(o,10),t.put(r,s*3+1))},be=e,be}var we,Ge;function Nt(){if(Ge)return we;Ge=1;const l=z(),e=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function i(t){this.mode=l.ALPHANUMERIC,this.data=t}return i.getBitsLength=function(n){return 11*Math.floor(n/2)+6*(n%2)},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(n){let o;for(o=0;o+2<=this.data.length;o+=2){let r=e.indexOf(this.data[o])*45;r+=e.indexOf(this.data[o+1]),n.put(r,11)}this.data.length%2&&n.put(e.indexOf(this.data[o]),6)},we=i,we}var Ee,Qe;function Ut(){if(Qe)return Ee;Qe=1;const l=z();function e(i){this.mode=l.BYTE,typeof i=="string"?this.data=new TextEncoder().encode(i):this.data=new Uint8Array(i)}return e.getBitsLength=function(t){return t*8},e.prototype.getLength=function(){return this.data.length},e.prototype.getBitsLength=function(){return e.getBitsLength(this.data.length)},e.prototype.write=function(i){for(let t=0,n=this.data.length;t<n;t++)i.put(this.data[t],8)},Ee=e,Ee}var Se,Je;function Ht(){if(Je)return Se;Je=1;const l=z(),e=j();function i(t){this.mode=l.KANJI,this.data=t}return i.getBitsLength=function(n){return n*13},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(t){let n;for(n=0;n<this.data.length;n++){let o=e.toSJIS(this.data[n]);if(o>=33088&&o<=40956)o-=33088;else if(o>=57408&&o<=60351)o-=49472;else throw new Error("Invalid SJIS character: "+this.data[n]+`
Make sure your charset is UTF-8`);o=(o>>>8&255)*192+(o&255),t.put(o,13)}},Se=i,Se}var Ce={exports:{}},Xe;function Ot(){return Xe||(Xe=1,(function(l){var e={single_source_shortest_paths:function(i,t,n){var o={},r={};r[t]=0;var s=e.PriorityQueue.make();s.push(t,0);for(var a,d,c,h,g,u,m,f,p;!s.empty();){a=s.pop(),d=a.value,h=a.cost,g=i[d]||{};for(c in g)g.hasOwnProperty(c)&&(u=g[c],m=h+u,f=r[c],p=typeof r[c]>"u",(p||f>m)&&(r[c]=m,s.push(c,m),o[c]=d))}if(typeof n<"u"&&typeof r[n]>"u"){var v=["Could not find a path from ",t," to ",n,"."].join("");throw new Error(v)}return o},extract_shortest_path_from_predecessor_list:function(i,t){for(var n=[],o=t;o;)n.push(o),i[o],o=i[o];return n.reverse(),n},find_path:function(i,t,n){var o=e.single_source_shortest_paths(i,t,n);return e.extract_shortest_path_from_predecessor_list(o,n)},PriorityQueue:{make:function(i){var t=e.PriorityQueue,n={},o;i=i||{};for(o in t)t.hasOwnProperty(o)&&(n[o]=t[o]);return n.queue=[],n.sorter=i.sorter||t.default_sorter,n},default_sorter:function(i,t){return i.cost-t.cost},push:function(i,t){var n={value:i,cost:t};this.queue.push(n),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};l.exports=e})(Ce)),Ce.exports}var Ze;function qt(){return Ze||(Ze=1,(function(l){const e=z(),i=Lt(),t=Nt(),n=Ut(),o=Ht(),r=ct(),s=j(),a=Ot();function d(v){return unescape(encodeURIComponent(v)).length}function c(v,k,S){const b=[];let F;for(;(F=v.exec(S))!==null;)b.push({data:F[0],index:F.index,mode:k,length:F[0].length});return b}function h(v){const k=c(r.NUMERIC,e.NUMERIC,v),S=c(r.ALPHANUMERIC,e.ALPHANUMERIC,v);let b,F;return s.isKanjiModeEnabled()?(b=c(r.BYTE,e.BYTE,v),F=c(r.KANJI,e.KANJI,v)):(b=c(r.BYTE_KANJI,e.BYTE,v),F=[]),k.concat(S,b,F).sort(function(E,A){return E.index-A.index}).map(function(E){return{data:E.data,mode:E.mode,length:E.length}})}function g(v,k){switch(k){case e.NUMERIC:return i.getBitsLength(v);case e.ALPHANUMERIC:return t.getBitsLength(v);case e.KANJI:return o.getBitsLength(v);case e.BYTE:return n.getBitsLength(v)}}function u(v){return v.reduce(function(k,S){const b=k.length-1>=0?k[k.length-1]:null;return b&&b.mode===S.mode?(k[k.length-1].data+=S.data,k):(k.push(S),k)},[])}function m(v){const k=[];for(let S=0;S<v.length;S++){const b=v[S];switch(b.mode){case e.NUMERIC:k.push([b,{data:b.data,mode:e.ALPHANUMERIC,length:b.length},{data:b.data,mode:e.BYTE,length:b.length}]);break;case e.ALPHANUMERIC:k.push([b,{data:b.data,mode:e.BYTE,length:b.length}]);break;case e.KANJI:k.push([b,{data:b.data,mode:e.BYTE,length:d(b.data)}]);break;case e.BYTE:k.push([{data:b.data,mode:e.BYTE,length:d(b.data)}])}}return k}function f(v,k){const S={},b={start:{}};let F=["start"];for(let y=0;y<v.length;y++){const E=v[y],A=[];for(let w=0;w<E.length;w++){const R=E[w],x=""+y+w;A.push(x),S[x]={node:R,lastCount:0},b[x]={};for(let I=0;I<F.length;I++){const T=F[I];S[T]&&S[T].node.mode===R.mode?(b[T][x]=g(S[T].lastCount+R.length,R.mode)-g(S[T].lastCount,R.mode),S[T].lastCount+=R.length):(S[T]&&(S[T].lastCount=R.length),b[T][x]=g(R.length,R.mode)+4+e.getCharCountIndicator(R.mode,k))}}F=A}for(let y=0;y<F.length;y++)b[F[y]].end=0;return{map:b,table:S}}function p(v,k){let S;const b=e.getBestModeForData(v);if(S=e.from(k,b),S!==e.BYTE&&S.bit<b.bit)throw new Error('"'+v+'" cannot be encoded with mode '+e.toString(S)+`.
 Suggested mode is: `+e.toString(b));switch(S===e.KANJI&&!s.isKanjiModeEnabled()&&(S=e.BYTE),S){case e.NUMERIC:return new i(v);case e.ALPHANUMERIC:return new t(v);case e.KANJI:return new o(v);case e.BYTE:return new n(v)}}l.fromArray=function(k){return k.reduce(function(S,b){return typeof b=="string"?S.push(p(b,null)):b.data&&S.push(p(b.data,b.mode)),S},[])},l.fromString=function(k,S){const b=h(k,s.isKanjiModeEnabled()),F=m(b),y=f(F,S),E=a.find_path(y.map,"start","end"),A=[];for(let w=1;w<E.length-1;w++)A.push(y.table[E[w]].node);return l.fromArray(u(A))},l.rawSplit=function(k){return l.fromArray(h(k,s.isKanjiModeEnabled()))}})(ve)),ve}var et;function $t(){if(et)return re;et=1;const l=j(),e=Ae(),i=Tt(),t=kt(),n=At(),o=It(),r=Rt(),s=at(),a=Mt(),d=Pt(),c=Dt(),h=z(),g=qt();function u(y,E){const A=y.size,w=o.getPositions(E);for(let R=0;R<w.length;R++){const x=w[R][0],I=w[R][1];for(let T=-1;T<=7;T++)if(!(x+T<=-1||A<=x+T))for(let B=-1;B<=7;B++)I+B<=-1||A<=I+B||(T>=0&&T<=6&&(B===0||B===6)||B>=0&&B<=6&&(T===0||T===6)||T>=2&&T<=4&&B>=2&&B<=4?y.set(x+T,I+B,!0,!0):y.set(x+T,I+B,!1,!0))}}function m(y){const E=y.size;for(let A=8;A<E-8;A++){const w=A%2===0;y.set(A,6,w,!0),y.set(6,A,w,!0)}}function f(y,E){const A=n.getPositions(E);for(let w=0;w<A.length;w++){const R=A[w][0],x=A[w][1];for(let I=-2;I<=2;I++)for(let T=-2;T<=2;T++)I===-2||I===2||T===-2||T===2||I===0&&T===0?y.set(R+I,x+T,!0,!0):y.set(R+I,x+T,!1,!0)}}function p(y,E){const A=y.size,w=d.getEncodedBits(E);let R,x,I;for(let T=0;T<18;T++)R=Math.floor(T/3),x=T%3+A-8-3,I=(w>>T&1)===1,y.set(R,x,I,!0),y.set(x,R,I,!0)}function v(y,E,A){const w=y.size,R=c.getEncodedBits(E,A);let x,I;for(x=0;x<15;x++)I=(R>>x&1)===1,x<6?y.set(x,8,I,!0):x<8?y.set(x+1,8,I,!0):y.set(w-15+x,8,I,!0),x<8?y.set(8,w-x-1,I,!0):x<9?y.set(8,15-x-1+1,I,!0):y.set(8,15-x-1,I,!0);y.set(w-8,8,1,!0)}function k(y,E){const A=y.size;let w=-1,R=A-1,x=7,I=0;for(let T=A-1;T>0;T-=2)for(T===6&&T--;;){for(let B=0;B<2;B++)if(!y.isReserved(R,T-B)){let O=!1;I<E.length&&(O=(E[I]>>>x&1)===1),y.set(R,T-B,O),x--,x===-1&&(I++,x=7)}if(R+=w,R<0||A<=R){R-=w,w=-w;break}}}function S(y,E,A){const w=new i;A.forEach(function(B){w.put(B.mode.bit,4),w.put(B.getLength(),h.getCharCountIndicator(B.mode,y)),B.write(w)});const R=l.getSymbolTotalCodewords(y),x=s.getTotalCodewordsCount(y,E),I=(R-x)*8;for(w.getLengthInBits()+4<=I&&w.put(0,4);w.getLengthInBits()%8!==0;)w.putBit(0);const T=(I-w.getLengthInBits())/8;for(let B=0;B<T;B++)w.put(B%2?17:236,8);return b(w,y,E)}function b(y,E,A){const w=l.getSymbolTotalCodewords(E),R=s.getTotalCodewordsCount(E,A),x=w-R,I=s.getBlocksCount(E,A),T=w%I,B=I-T,O=Math.floor(w/I),G=Math.floor(x/I),ft=G+1,Ie=O-G,pt=new a(Ie);let ee=0;const X=new Array(I),Re=new Array(I);let te=0;const mt=new Uint8Array(y.buffer);for(let V=0;V<I;V++){const ne=V<B?G:ft;X[V]=mt.slice(ee,ee+ne),Re[V]=pt.encode(X[V]),ee+=ne,te=Math.max(te,ne)}const ie=new Uint8Array(w);let Be=0,N,U;for(N=0;N<te;N++)for(U=0;U<I;U++)N<X[U].length&&(ie[Be++]=X[U][N]);for(N=0;N<Ie;N++)for(U=0;U<I;U++)ie[Be++]=Re[U][N];return ie}function F(y,E,A,w){let R;if(Array.isArray(y))R=g.fromArray(y);else if(typeof y=="string"){let O=E;if(!O){const G=g.rawSplit(y);O=d.getBestVersionForData(G,A)}R=g.fromString(y,O||40)}else throw new Error("Invalid data");const x=d.getBestVersionForData(R,A);if(!x)throw new Error("The amount of data is too big to be stored in a QR Code");if(!E)E=x;else if(E<x)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+x+`.
`);const I=S(E,A,R),T=l.getSymbolSize(E),B=new t(T);return u(B,E),m(B),f(B,E),v(B,A,0),E>=7&&p(B,E),k(B,I),isNaN(w)&&(w=r.getBestMask(B,v.bind(null,B,A))),r.applyMask(w,B),v(B,A,w),{modules:B,version:E,errorCorrectionLevel:A,maskPattern:w,segments:R}}return re.create=function(E,A){if(typeof E>"u"||E==="")throw new Error("No input text");let w=e.M,R,x;return typeof A<"u"&&(w=e.from(A.errorCorrectionLevel,e.M),R=d.from(A.version),x=r.from(A.maskPattern),A.toSJISFunc&&l.setToSJISFunction(A.toSJISFunc)),F(E,R,w,x)},re}var xe={},Te={},tt;function dt(){return tt||(tt=1,(function(l){function e(i){if(typeof i=="number"&&(i=i.toString()),typeof i!="string")throw new Error("Color should be defined as hex string");let t=i.slice().replace("#","").split("");if(t.length<3||t.length===5||t.length>8)throw new Error("Invalid hex color: "+i);(t.length===3||t.length===4)&&(t=Array.prototype.concat.apply([],t.map(function(o){return[o,o]}))),t.length===6&&t.push("F","F");const n=parseInt(t.join(""),16);return{r:n>>24&255,g:n>>16&255,b:n>>8&255,a:n&255,hex:"#"+t.slice(0,6).join("")}}l.getOptions=function(t){t||(t={}),t.color||(t.color={});const n=typeof t.margin>"u"||t.margin===null||t.margin<0?4:t.margin,o=t.width&&t.width>=21?t.width:void 0,r=t.scale||4;return{width:o,scale:o?4:r,margin:n,color:{dark:e(t.color.dark||"#000000ff"),light:e(t.color.light||"#ffffffff")},type:t.type,rendererOpts:t.rendererOpts||{}}},l.getScale=function(t,n){return n.width&&n.width>=t+n.margin*2?n.width/(t+n.margin*2):n.scale},l.getImageWidth=function(t,n){const o=l.getScale(t,n);return Math.floor((t+n.margin*2)*o)},l.qrToImageData=function(t,n,o){const r=n.modules.size,s=n.modules.data,a=l.getScale(r,o),d=Math.floor((r+o.margin*2)*a),c=o.margin*a,h=[o.color.light,o.color.dark];for(let g=0;g<d;g++)for(let u=0;u<d;u++){let m=(g*d+u)*4,f=o.color.light;if(g>=c&&u>=c&&g<d-c&&u<d-c){const p=Math.floor((g-c)/a),v=Math.floor((u-c)/a);f=h[s[p*r+v]?1:0]}t[m++]=f.r,t[m++]=f.g,t[m++]=f.b,t[m]=f.a}}})(Te)),Te}var it;function _t(){return it||(it=1,(function(l){const e=dt();function i(n,o,r){n.clearRect(0,0,o.width,o.height),o.style||(o.style={}),o.height=r,o.width=r,o.style.height=r+"px",o.style.width=r+"px"}function t(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}l.render=function(o,r,s){let a=s,d=r;typeof a>"u"&&(!r||!r.getContext)&&(a=r,r=void 0),r||(d=t()),a=e.getOptions(a);const c=e.getImageWidth(o.modules.size,a),h=d.getContext("2d"),g=h.createImageData(c,c);return e.qrToImageData(g.data,o,a),i(h,d,c),h.putImageData(g,0,0),d},l.renderToDataURL=function(o,r,s){let a=s;typeof a>"u"&&(!r||!r.getContext)&&(a=r,r=void 0),a||(a={});const d=l.render(o,r,a),c=a.type||"image/png",h=a.rendererOpts||{};return d.toDataURL(c,h.quality)}})(xe)),xe}var ke={},nt;function jt(){if(nt)return ke;nt=1;const l=dt();function e(n,o){const r=n.a/255,s=o+'="'+n.hex+'"';return r<1?s+" "+o+'-opacity="'+r.toFixed(2).slice(1)+'"':s}function i(n,o,r){let s=n+o;return typeof r<"u"&&(s+=" "+r),s}function t(n,o,r){let s="",a=0,d=!1,c=0;for(let h=0;h<n.length;h++){const g=Math.floor(h%o),u=Math.floor(h/o);!g&&!d&&(d=!0),n[h]?(c++,h>0&&g>0&&n[h-1]||(s+=d?i("M",g+r,.5+u+r):i("m",a,0),a=0,d=!1),g+1<o&&n[h+1]||(s+=i("h",c),c=0)):a++}return s}return ke.render=function(o,r,s){const a=l.getOptions(r),d=o.modules.size,c=o.modules.data,h=d+a.margin*2,g=a.color.light.a?"<path "+e(a.color.light,"fill")+' d="M0 0h'+h+"v"+h+'H0z"/>':"",u="<path "+e(a.color.dark,"stroke")+' d="'+t(c,d,a.margin)+'"/>',m='viewBox="0 0 '+h+" "+h+'"',p='<svg xmlns="http://www.w3.org/2000/svg" '+(a.width?'width="'+a.width+'" height="'+a.width+'" ':"")+m+' shape-rendering="crispEdges">'+g+u+`</svg>
`;return typeof s=="function"&&s(null,p),p},ke}var ot;function zt(){if(ot)return W;ot=1;const l=xt(),e=$t(),i=_t(),t=jt();function n(o,r,s,a,d){const c=[].slice.call(arguments,1),h=c.length,g=typeof c[h-1]=="function";if(!g&&!l())throw new Error("Callback required as last argument");if(g){if(h<2)throw new Error("Too few arguments provided");h===2?(d=s,s=r,r=a=void 0):h===3&&(r.getContext&&typeof d>"u"?(d=a,a=void 0):(d=a,a=s,s=r,r=void 0))}else{if(h<1)throw new Error("Too few arguments provided");return h===1?(s=r,r=a=void 0):h===2&&!r.getContext&&(a=s,s=r,r=void 0),new Promise(function(u,m){try{const f=e.create(s,a);u(o(f,r,a))}catch(f){m(f)}})}try{const u=e.create(s,a);d(null,o(u,r,a))}catch(u){d(u)}}return W.create=e.create,W.toCanvas=n.bind(null,i.render),W.toDataURL=n.bind(null,i.renderToDataURL),W.toString=n.bind(null,function(o,r,s){return t.render(o,s)}),W}var Vt=zt();const rt=Ct(Vt);class ${static async renderToCanvas(e,i,t={}){const n={width:t.width||320,margin:2,color:{dark:"#111111",light:"#FFFFFF"},errorCorrectionLevel:"M"};try{return await rt.toCanvas(e,i,n),e}catch(o){throw console.error("QR Code rendering failed:",o),o}}static async toDataURL(e,i={}){const t={width:i.width||320,margin:2,color:{dark:"#111111",light:"#FFFFFF"},errorCorrectionLevel:"M"};return rt.toDataURL(e,t)}static getSessionPhotoUrl(e,i="",t={}){if(i&&t.qrTarget==="direct")return i;let n="";t.hostingUrl&&typeof t.hostingUrl=="string"&&t.hostingUrl.trim()?n=t.hostingUrl.trim().replace(/\/$/,""):typeof window<"u"&&window.location?n=`${window.location.origin}${window.location.pathname}`.replace(/\/$/,""):n="https://photobooth.hipmitelku.com";let o=`${n}?session=${encodeURIComponent(e)}&action=view`;return i&&typeof i=="string"&&i.trim()&&(o+=`&photo=${encodeURIComponent(i.trim())}`),o}}async function ut(l=50,e=console.log){e(`
🚀 Starting HIPMI Photobooth Stress Test: ${l} sessions...
`);const i=performance.now(),t={totalSessions:l,completedSessions:0,failedSessions:0,errors:[],maxMemoryHeap:0,minMemoryHeap:1/0,avgSessionTimeMs:0,trackLeakDetected:!1,urlLeakDetected:!1},n=(a,d=1280,c=720)=>{const h=document.createElement("canvas");h.width=d,h.height=c;const g=h.getContext("2d");return g.fillStyle="#1A1D24",g.fillRect(0,0,d,c),g.fillStyle="#C8A84B",g.font="bold 36px sans-serif",g.textAlign="center",g.fillText(a,d/2,c/2),new Promise(u=>{h.toBlob(m=>{const f=h.toDataURL("image/jpeg",.85);u({blob:m,dataUrl:f})},"image/jpeg",.85)})},o=[await n("STRESS TEST SHOT 01"),await n("STRESS TEST SHOT 02"),await n("STRESS TEST SHOT 03")],r={organization:"HIPMI Telkom University",eventName:"Entrepreneur Summit 2026",photoCount:3,logoHipmi:"/assets/logo-hipmi.png",logoTelu:"/assets/logo-telu.png",dateText:"BANDUNG, 2026"};for(let a=1;a<=l;a++){const d=performance.now();try{const c=C.startNewSession(r);if(!c||!c.sessionId)throw new Error(`Session initialization failed at session ${a}`);for(let p=0;p<3;p++)C.addPhoto(p,o[p].blob,o[p].dataUrl);const h=await n(`RETAKE SHOT 02 - SES ${a}`);if(C.addPhoto(1,h.blob,h.dataUrl),C.getSession().photos.length!==3)throw new Error(`Invalid photo count after retake in session ${a}`);for(const p of J)C.setTemplate(p.id);C.setTemplate("signature"),C.setCustomization({name:`Participant #${a}`,eventName:"HIPMI Business Summit",message:"Building Future Ventures"});const g=await Y.renderComposition({photos:C.getSession().photos,templateId:C.getSession().selectedTemplateId,customization:C.getSession().customization,eventConfig:r}),u=await Y.exportBlob(g,"image/png",.9),m=g.toDataURL("image/png",.9);C.setFinalResult(u,m);const f=document.createElement("canvas");if(await $.renderToCanvas(f,$.getSessionPhotoUrl(c.sessionId),{width:220}),performance.memory){const p=performance.memory.usedJSHeapSize/1048576;t.maxMemoryHeap=Math.max(t.maxMemoryHeap,p),t.minMemoryHeap=Math.min(t.minMemoryHeap,p)}if(C.cleanupCurrentSession(),C.createdObjectUrls.size!==0)throw t.urlLeakDetected=!0,new Error(`Object URLs not cleanly revoked in session ${a}`);if(t.completedSessions++,a%10===0||a===l){const p=performance.now();e(`✅ Session ${a}/${l} passed (${(p-d).toFixed(1)}ms)`)}}catch(c){t.failedSessions++,t.errors.push({session:a,message:c.message}),e(`❌ Session ${a} failed: ${c.message}`)}}const s=((performance.now()-i)/1e3).toFixed(2);return t.avgSessionTimeMs=(performance.now()-i)/l,e(`
📊 STRESS TEST SUMMARY:`),e(`Total Sessions Run: ${t.totalSessions}`),e(`Completed Successfully: ${t.completedSessions}`),e(`Failed: ${t.failedSessions}`),e(`Total Duration: ${s}s`),e(`Average per session: ${t.avgSessionTimeMs.toFixed(1)}ms`),t.maxMemoryHeap>0&&e(`Memory Heap Peak: ${t.maxMemoryHeap.toFixed(2)} MB`),e(`Object URL Leak Check: ${t.urlLeakDetected?"FAIL ❌":"PASS (0 leaks) ✅"}`),t}class Wt{constructor(){this.ctx=null,this.enabled=!0}_initContext(){if(!this.ctx){const e=window.AudioContext||window.webkitAudioContext;e&&(this.ctx=new e)}this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume().catch(()=>{})}unlock(){try{this._initContext(),this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume().catch(()=>{})}catch{}}playBeep(e=!1){if(this.enabled)try{if(this._initContext(),!this.ctx)return;const i=this.ctx.createOscillator(),t=this.ctx.createGain();i.type="sine",i.frequency.setValueAtTime(e?1320:880,this.ctx.currentTime),t.gain.setValueAtTime(.25,this.ctx.currentTime),t.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.12),i.connect(t),t.connect(this.ctx.destination),i.start(),i.stop(this.ctx.currentTime+.12)}catch{}}playShutter(){if(this.enabled)try{if(this._initContext(),!this.ctx)return;const e=this.ctx.currentTime,i=Math.floor(this.ctx.sampleRate*.08),t=this.ctx.createBuffer(1,i,this.ctx.sampleRate),n=t.getChannelData(0);for(let c=0;c<i;c++)n[c]=(Math.random()*2-1)*Math.exp(-c/(i*.25));const o=this.ctx.createBufferSource();o.buffer=t;const r=this.ctx.createBiquadFilter();r.type="bandpass",r.frequency.setValueAtTime(1800,e),r.Q.setValueAtTime(3,e);const s=this.ctx.createGain();s.gain.setValueAtTime(.7,e),s.gain.exponentialRampToValueAtTime(.01,e+.08),o.connect(r),r.connect(s),s.connect(this.ctx.destination),o.start(e);const a=this.ctx.createOscillator(),d=this.ctx.createGain();a.type="triangle",a.frequency.setValueAtTime(340,e+.045),a.frequency.exponentialRampToValueAtTime(80,e+.09),d.gain.setValueAtTime(0,e),d.gain.setValueAtTime(.4,e+.045),d.gain.exponentialRampToValueAtTime(.001,e+.1),a.connect(d),d.connect(this.ctx.destination),a.start(e+.045),a.stop(e+.1)}catch{}}playSuccess(){if(this.enabled)try{if(this._initContext(),!this.ctx)return;const e=this.ctx.currentTime;[523.25,659.25,783.99,1046.5].forEach((t,n)=>{const o=this.ctx.createOscillator(),r=this.ctx.createGain(),s=e+n*.06;o.type="sine",o.frequency.setValueAtTime(t,s),r.gain.setValueAtTime(.18,s),r.gain.exponentialRampToValueAtTime(.001,s+.25),o.connect(r),r.connect(this.ctx.destination),o.start(s),o.stop(s+.25)})}catch{}}}const K=new Wt;function M(l){return l==null?"":String(l).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function ht(l,e=30){return l?String(l).trim().toLowerCase().replace(/[^a-z0-9]/g,"_").replace(/_+/g,"_").replace(/^_|_$/g,"").slice(0,e):""}class Kt{constructor({eventConfig:e,onStart:i,onOpenSettings:t,onOpenHistory:n,onToggleFullscreen:o}){this.eventConfig=e,this.onStart=i,this.onOpenSettings=t,this.onOpenHistory=n,this.onToggleFullscreen=o,this.container=null,this.isStarting=!1}render(){const e=document.createElement("div");e.className="view-container view-enter",this.container=e;const i=M(this.eventConfig.organization),t=M(this.eventConfig.eventName),n=M(this.eventConfig.subOrganization||this.eventConfig.organization),o=M(this.eventConfig.year);e.innerHTML=`
      <!-- Top Header Controls -->
      <header class="booth-header">
        <div class="brand-badge">
          <img src="${this.eventConfig.logoHipmi}" alt="HIPMI" class="brand-logo-mini" />
          <div class="brand-text-mini">
            <span class="brand-org">${i}</span>
            <span class="brand-event-name">${t}</span>
          </div>
        </div>
        <div class="header-actions">
          <button class="icon-btn" id="btn-history" title="Riwayat Foto (Gallery)" aria-label="Riwayat Foto">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          </button>
          <button class="icon-btn" id="btn-fullscreen" title="Toggle Fullscreen" aria-label="Toggle Fullscreen">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
            </svg>
          </button>
          <button class="icon-btn" id="btn-settings" title="Operator Settings" aria-label="Operator Settings">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </button>
        </div>
      </header>

      <!-- Welcome Main Content -->
      <main class="welcome-screen">
        <div class="welcome-content">
          <!-- Official Dual Logo Lockup -->
          <div class="welcome-logo-lockup">
            <img src="${this.eventConfig.logoHipmi}" alt="HIPMI Telkom University" class="welcome-logo-hipmi" />
            <div class="welcome-logo-divider"></div>
            <img src="${this.eventConfig.logoTelu}" alt="Telkom University" class="welcome-logo-telu" />
          </div>

          <!-- Small Pill Label -->
          <div class="welcome-tag">
            <span class="welcome-tag-dot"></span>
            PHOTOBOOTH EXPERIENCE
          </div>

          <!-- Confident Headline -->
          <h1 class="welcome-headline">
            Capture Your <span>Moment.</span>
          </h1>

          <!-- Restrained Editorial Subheadline -->
          <p class="welcome-subheadline">
            Make a moment. Keep the memory.<br/>
            Official interactive photobooth for ${i}.
          </p>

          <!-- Primary CTA Button -->
          <div class="welcome-cta-group">
            <button class="btn-primary welcome-start-btn" id="btn-start-session" aria-label="Start Photo Session">
              START PHOTO
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
            <span class="welcome-instruction">Tap to begin</span>
          </div>
        </div>

        <!-- Footer Event Tag -->
        <footer class="welcome-footer-info">
          <span>${n}</span>
          <span>•</span>
          <span>${o}</span>
        </footer>
      </main>
    `;const r=e.querySelector("#btn-start-session");r.addEventListener("click",c=>{c.preventDefault(),!this.isStarting&&(this.isStarting=!0,K.unlock(),r.classList.add("btn-disabled"),r.disabled=!0,this.onStart())});const s=e.querySelector("#btn-history");return s&&s.addEventListener("click",c=>{c.preventDefault(),this.onOpenHistory&&this.onOpenHistory()}),e.querySelector("#btn-settings").addEventListener("click",()=>{this.onOpenSettings&&this.onOpenSettings()}),e.querySelector("#btn-fullscreen").addEventListener("click",()=>{this.onToggleFullscreen&&this.onToggleFullscreen()}),e}destroy(){this.isStarting=!1,this.container&&this.container.parentNode&&this.container.parentNode.removeChild(this.container)}}class Yt{constructor({targetSlotIndex:e=null,totalSlots:i=3,countdownSeconds:t=3,eventConfig:n,onPhotoCaptured:o,onAllPhotosCompleted:r,onCancel:s,onCameraError:a}){this.targetSlotIndex=e,this.totalSlots=i,this.countdownSeconds=t,this.eventConfig=n,this.onPhotoCaptured=o,this.onAllPhotosCompleted=r,this.onCancel=s,this.onCameraError=a,this.currentSlot=e!==null?e:0,this.isCountingDown=!1,this.isCapturing=!1,this.isAutoShooting=!1,this.isDestroyed=!1,this.countdownTimer=null,this.transitionTimer=null,this.completionTimer=null,this.container=null,this.videoEl=null,this.removeDisconnectListener=null,this.keyHandler=null}async render(){const e=document.createElement("div");e.className="view-container view-enter camera-view",this.container=e;const i=this.targetSlotIndex!==null,t=String(this.currentSlot+1).padStart(2,"0"),n=String(this.totalSlots).padStart(2,"0"),o=i?`RETAKE PHOTO ${t}`:`PHOTO ${t} / ${n}`;(await D.getPhysicalDevices()).length>1,e.innerHTML=`
      <!-- Camera Viewfinder -->
      <div class="camera-container">
        <video class="camera-video" id="camera-feed" autoplay playsinline muted></video>

        <!-- Framing Guide & Safe Zone -->
        <div class="framing-guide" id="framing-guide">
          <div class="corner-bracket corner-tl"></div>
          <div class="corner-bracket corner-tr"></div>
          <div class="corner-bracket corner-bl"></div>
          <div class="corner-bracket corner-br"></div>
          <div class="face-target"></div>
        </div>

        <!-- Photo Counter Pill -->
        <div class="counter-pill" id="counter-pill">
          <span class="counter-dot pulse-indicator"></span>
          <span id="counter-text">${o}</span>
        </div>

        <!-- Countdown Overlay (Hidden by default) -->
        <div class="countdown-overlay" id="countdown-overlay" style="display: none;">
          <div class="countdown-digits countdown-number" id="countdown-digits">3</div>
          <div class="countdown-subtext" id="countdown-subtext" style="display: none;"></div>
        </div>

        <!-- Shutter Flash Overlay -->
        <div class="flash-overlay" id="flash-overlay"></div>

        <!-- Bottom Controls Bar -->
        <div class="camera-bottom-bar">
          <!-- Cancel / Back button -->
          <button class="camera-tool-btn" id="btn-camera-cancel" title="${i?"Cancel Retake":"Back"}" aria-label="${i?"Cancel Retake":"Back"}">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <!-- Circular Shutter Trigger (Initially disabled until stream is ready) -->
          <button class="shutter-btn btn-disabled" id="btn-shutter" title="Take Photo" aria-label="Take Photo" disabled>
            <div class="shutter-inner"></div>
          </button>

          <!-- Mirror Toggle Button -->
          <button class="camera-tool-btn" id="btn-camera-mirror" title="Toggle Mirror (Flip)" aria-label="Toggle Mirror (Flip)">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 3v18"></path>
              <path d="M16 7l4 5-4 5"></path>
              <path d="M8 17l-4-5 4-5"></path>
            </svg>
          </button>

          <!-- Camera Switcher (Dynamically toggled based on physical camera count) -->
          <button class="camera-tool-btn" id="btn-camera-switch" title="Switch Camera Device" aria-label="Switch Camera Device" style="display: none;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M23 4v6h-6"></path>
              <path d="M1 20v-6h6"></path>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 1 20.49 15"></path>
            </svg>
          </button>
        </div>
      </div>
    `,this.videoEl=e.querySelector("#camera-feed");const s=e.querySelector("#btn-shutter"),a=e.querySelector("#btn-camera-switch"),d=e.querySelector("#btn-camera-cancel"),c=e.querySelector("#btn-camera-mirror");this.enableShutterIfReady=()=>{this.isDestroyed||this.videoEl&&this.videoEl.videoWidth>0&&!this.isCountingDown&&!this.isCapturing&&!this.isAutoShooting&&(s.classList.remove("btn-disabled"),s.disabled=!1)},this.videoEl.addEventListener("loadedmetadata",this.enableShutterIfReady),this.videoEl.addEventListener("canplay",this.enableShutterIfReady),s.addEventListener("click",h=>{h.preventDefault(),K.unlock(),this.startAutoSequence()}),this.keyHandler=h=>{(h.code==="Space"||h.key==="Enter")&&!this.isAutoShooting&&!this.isCountingDown&&!this.isCapturing&&(h.preventDefault(),K.unlock(),this.startAutoSequence())},window.addEventListener("keydown",this.keyHandler),c.addEventListener("click",h=>{h.preventDefault(),D.setMirror(!D.isMirror)}),a.addEventListener("click",async h=>{if(h.preventDefault(),!(this.isDestroyed||this.isCountingDown||this.isCapturing))try{a.classList.add("btn-disabled"),a.disabled=!0,s.classList.add("btn-disabled"),s.disabled=!0,await D.switchCamera(),this.enableShutterIfReady()}catch(g){console.warn("Camera switch error:",g)}finally{this.isDestroyed||(a.classList.remove("btn-disabled"),a.disabled=!1)}}),d.addEventListener("click",h=>{h.preventDefault(),!(this.isNavigating||this.isDestroyed)&&(this.isNavigating=!0,d.classList.add("btn-disabled"),d.disabled=!0,this.destroy(),this.onCancel&&this.onCancel())}),this.removeDisconnectListener=D.onDisconnect(()=>{this.isDestroyed||(console.warn("Camera hardware disconnected while active!"),this.onCameraError&&this.onCameraError("CAMERA_UNAVAILABLE"))});try{await D.startCamera(this.videoEl,this.eventConfig.selectedCameraId||null,this.eventConfig.mirrorCamera!==!1);const h=await D.getPhysicalDevices();a&&!this.isDestroyed&&(a.style.display=h.length>1?"flex":"none"),setTimeout(()=>this.enableShutterIfReady(),200)}catch(h){throw console.error("Camera start error:",h),h}return e}startAutoSequence(){if(this.isAutoShooting||this.isCountingDown||this.isCapturing||this.isDestroyed)return;this.isAutoShooting=!0;const e=this.container?.querySelector("#btn-shutter"),i=this.container?.querySelector("#btn-camera-switch"),t=this.container?.querySelector("#btn-camera-mirror");e&&(e.classList.add("btn-disabled"),e.disabled=!0),i&&(i.classList.add("btn-disabled"),i.disabled=!0),t&&(t.classList.add("btn-disabled"),t.disabled=!0),this.runCountdownForCurrentSlot()}runCountdownForCurrentSlot(){if(this.isDestroyed)return;this.isCountingDown=!0;const e=this.container.querySelector("#countdown-overlay"),i=this.container.querySelector("#countdown-digits"),t=this.container.querySelector("#countdown-subtext");e.style.display="flex",t&&(t.style.display="none",t.textContent="");let n=this.countdownSeconds;const o=()=>{if(!this.isDestroyed)if(i.textContent=n<10?`0${n}`:`${n}`,i.classList.remove("countdown-number"),i.offsetWidth,i.classList.add("countdown-number"),K.playBeep(n===1),this.countdownTimer&&(C.unregisterTimer(this.countdownTimer),this.countdownTimer=null),n<=1){const r=setTimeout(async()=>{this.countdownTimer=null,!this.isDestroyed&&(e.style.display="none",await this.executeCapture())},1e3);this.countdownTimer=r,C.registerTimer(r)}else{n--;const r=setTimeout(o,1e3);this.countdownTimer=r,C.registerTimer(r)}};o()}async executeCapture(){if(this.isDestroyed)return;this.isCapturing=!0;const e=this.container.querySelector("#flash-overlay");e.classList.add("active"),K.playShutter();let i=null;try{i=await D.capturePhoto()}catch(t){if(console.error("Failed to capture photo frame:",t),this.isDestroyed)return;this.isCapturing=!1,this.isCountingDown=!1,this.isAutoShooting=!1,e.classList.remove("active"),this.enableShutterIfReady();return}if(!this.isDestroyed){if(setTimeout(()=>{e&&e.classList.remove("active")},120),this.onPhotoCaptured&&this.onPhotoCaptured(this.currentSlot,i.blob,i.dataUrl),this.targetSlotIndex!==null){this.completionTimer=setTimeout(()=>{this.completionTimer=null,!this.isDestroyed&&(this.destroy(),this.onAllPhotosCompleted&&this.onAllPhotosCompleted())},500),C.registerTimer(this.completionTimer);return}if(this.isCapturing=!1,this.isCountingDown=!1,this.currentSlot+1<this.totalSlots){this.currentSlot++;const t=String(this.currentSlot+1).padStart(2,"0"),n=String(this.totalSlots).padStart(2,"0"),o=this.container.querySelector("#counter-text");o&&(o.textContent=`PHOTO ${t} / ${n}`);const r=this.container.querySelector("#countdown-overlay"),s=this.container.querySelector("#countdown-digits"),a=this.container.querySelector("#countdown-subtext");r&&s&&a&&(r.style.display="flex",s.textContent="📸",a.style.display="block",a.textContent=`SIAP POSE ${t} / ${n}!`),this.transitionTimer=setTimeout(()=>{this.transitionTimer=null,!this.isDestroyed&&this.runCountdownForCurrentSlot()},1200),C.registerTimer(this.transitionTimer)}else{const t=this.container.querySelector("#countdown-overlay"),n=this.container.querySelector("#countdown-digits"),o=this.container.querySelector("#countdown-subtext");t&&n&&o&&(t.style.display="flex",n.textContent="✨",o.style.display="block",o.textContent="SEMUA FOTO SELESAI!"),this.completionTimer=setTimeout(()=>{this.completionTimer=null,!this.isDestroyed&&(this.destroy(),this.onAllPhotosCompleted&&this.onAllPhotosCompleted())},700),C.registerTimer(this.completionTimer)}}}destroy(){this.isDestroyed=!0,this.keyHandler&&(window.removeEventListener("keydown",this.keyHandler),this.keyHandler=null),this.countdownTimer&&(clearTimeout(this.countdownTimer),C.unregisterTimer(this.countdownTimer),this.countdownTimer=null),this.transitionTimer&&(clearTimeout(this.transitionTimer),C.unregisterTimer(this.transitionTimer),this.transitionTimer=null),this.completionTimer&&(clearTimeout(this.completionTimer),C.unregisterTimer(this.completionTimer),this.completionTimer=null),this.removeDisconnectListener&&(this.removeDisconnectListener(),this.removeDisconnectListener=null),this.videoEl&&this.enableShutterIfReady&&(this.videoEl.removeEventListener("loadedmetadata",this.enableShutterIfReady),this.videoEl.removeEventListener("canplay",this.enableShutterIfReady)),this.isCountingDown=!1,this.isCapturing=!1,this.isAutoShooting=!1,this.isNavigating=!1,D.stopCamera(),this.container&&this.container.parentNode&&this.container.parentNode.removeChild(this.container)}}class Gt{constructor({photos:e,onRetakeSingle:i,onRetakeAll:t,onContinue:n,eventConfig:o}){this.photos=e||[],this.onRetakeSingle=i,this.onRetakeAll=t,this.onContinue=n,this.eventConfig=o,this.container=null,this.isNavigating=!1}render(){const e=document.createElement("div");e.className="view-container view-enter review-screen",this.container=e;let i="";this.photos.forEach((r,s)=>{const a=String(s+1).padStart(2,"0"),d=r.objectUrl||r.dataUrl;i+=`
        <div class="review-card">
          <div class="review-card-img-wrap">
            <img src="${d}" alt="Photo ${a}" class="review-card-img" />
            <div class="review-card-badge">SHOT ${a}</div>
          </div>
          <div class="review-card-footer">
            <span style="font-size: 13px; font-weight: 700; color: #111111;">Photo ${s+1}</span>
            <button class="review-retake-btn" data-slot="${r.index}" aria-label="Retake Photo ${s+1}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M23 4v6h-6"></path>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
              </svg>
              Retake
            </button>
          </div>
        </div>
      `}),e.innerHTML=`
      <!-- Header -->
      <div class="review-header">
        <h1 class="review-title">YOUR MOMENTS</h1>
        <p class="review-subtitle">Review your photos. Retake any individual shot or continue to select your template.</p>
      </div>

      <!-- Photo Cards Grid -->
      <div class="review-grid">
        ${i}
      </div>

      <!-- Actions Bar -->
      <div class="review-actions-bar">
        <button class="btn-secondary" id="btn-retake-all" aria-label="Retake All Photos">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M23 4v6h-6"></path>
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
          </svg>
          Retake All
        </button>

        <button class="btn-primary" id="btn-continue" aria-label="Continue to Templates">
          Continue
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>
    `,e.querySelectorAll(".review-retake-btn").forEach(r=>{r.addEventListener("click",s=>{if(s.preventDefault(),this.isNavigating)return;this.isNavigating=!0;const a=parseInt(r.getAttribute("data-slot"),10);this.onRetakeSingle&&this.onRetakeSingle(a)})}),e.querySelector("#btn-retake-all").addEventListener("click",r=>{r.preventDefault(),!this.isNavigating&&(this.isNavigating=!0,this.onRetakeAll&&this.onRetakeAll())});const o=e.querySelector("#btn-continue");return o.addEventListener("click",r=>{r.preventDefault(),!this.isNavigating&&(this.isNavigating=!0,o.classList.add("btn-disabled"),o.disabled=!0,this.onContinue&&this.onContinue())}),e}destroy(){this.isNavigating=!1,this.container&&this.container.parentNode&&this.container.parentNode.removeChild(this.container)}}class Qt{constructor({photos:e,selectedTemplateId:i="signature",customization:t={},eventConfig:n,onTemplateSelected:o,onCustomizationChanged:r,onContinue:s,onBack:a}){this.photos=e||[],this.selectedTemplateId=i,this.customization={name:t.name||"",eventName:t.eventName||n.eventName,message:t.message||""},this.eventConfig=n,this.onTemplateSelected=o,this.onCustomizationChanged=r,this.onContinue=s,this.onBack=a,this.container=null,this.previewCanvas=null,this.isRendering=!1,this.renderDebounceTimer=null,this.isNavigating=!1,this.isDestroyed=!1}render(){const e=document.createElement("div");e.className="view-container view-enter template-screen",this.container=e;let i="";J.forEach(c=>{const h=c.id===this.selectedTemplateId;i+=`
        <div class="template-card ${h?"active":""}" data-id="${M(c.id)}" id="template-card-${M(c.id)}">
          <div class="template-card-badge">${M(c.badge||c.category)}</div>
          <div class="template-card-name">${M(c.name)}</div>
          <div class="template-card-desc">${M(c.description)}</div>
        </div>
      `}),e.innerHTML=`
      <!-- Left Column: Live Canvas Preview -->
      <div class="template-preview-col">
        <div class="canvas-preview-wrapper" id="preview-wrapper">
          <canvas class="canvas-preview-element" id="preview-canvas"></canvas>
        </div>
      </div>

      <!-- Right Column: Template Selector & Customization Controls -->
      <div class="template-controls-col">
        <!-- Template Selection Section -->
        <div class="template-section-title">
          <span>Select Template</span>
          <span>${J.length} Styles</span>
        </div>
        <div class="template-list-grid">
          ${i}
        </div>

        <!-- Realtime Customization Section -->
        <div class="customization-box">
          <div class="template-section-title">
            <span>Personalize</span>
            <span>Realtime</span>
          </div>

          <div class="form-group">
            <label class="form-label" for="input-name">Your Name</label>
            <input
              type="text"
              id="input-name"
              class="form-input"
              placeholder="e.g. Nadiv"
              value="${M(this.customization.name)}"
              maxlength="30"
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="input-event">Event Name</label>
            <input
              type="text"
              id="input-event"
              class="form-input"
              placeholder="e.g. Entrepreneur Summit 2026"
              value="${M(this.customization.eventName)}"
              maxlength="40"
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="input-message">Message / Quote (Optional)</label>
            <input
              type="text"
              id="input-message"
              class="form-input"
              placeholder="e.g. Make a moment. Build the future."
              value="${M(this.customization.message)}"
              maxlength="50"
            />
          </div>
        </div>

        <!-- Bottom Action Buttons -->
        <div class="template-bottom-actions">
          <button class="btn-primary" id="btn-submit-template">
            Generate Final Photo
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>

          <button class="btn-secondary" id="btn-back-to-review">
            Back to Review
          </button>
        </div>
      </div>
    `,this.previewCanvas=e.querySelector("#preview-canvas");const t=e.querySelectorAll(".template-card");t.forEach(c=>{c.addEventListener("click",h=>{h.preventDefault();const g=c.getAttribute("data-id");g!==this.selectedTemplateId&&(t.forEach(u=>u.classList.remove("active")),c.classList.add("active"),this.selectedTemplateId=g,this.onTemplateSelected&&this.onTemplateSelected(g),this.scheduleRender())})});const n=e.querySelector("#input-name"),o=e.querySelector("#input-event"),r=e.querySelector("#input-message"),s=()=>{this.customization={name:n.value,eventName:o.value||this.eventConfig.eventName,message:r.value},this.onCustomizationChanged&&this.onCustomizationChanged(this.customization),this.scheduleRender()};n.addEventListener("input",s),o.addEventListener("input",s),r.addEventListener("input",s);const a=e.querySelector("#btn-submit-template");a.addEventListener("click",async c=>{if(c.preventDefault(),!(this.isNavigating||this.isDestroyed)){this.isNavigating=!0,a.classList.add("btn-disabled"),a.innerHTML=`
        <svg class="pulse-indicator" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="12" cy="12" r="10"></circle>
        </svg>
        Preparing Photo...
      `;try{const h=await Y.renderComposition({photos:this.photos,templateId:this.selectedTemplateId,customization:this.customization,eventConfig:this.eventConfig});if(this.isDestroyed)return;const g=await Y.exportBlob(h,"image/png",.96),u=h.toDataURL("image/png",.96);this.onContinue&&!this.isDestroyed&&this.onContinue({blob:g,dataUrl:u,finalCanvas:h})}catch(h){console.error("Error generating final canvas:",h),this.isDestroyed||(a.classList.remove("btn-disabled"),a.textContent="Generate Final Photo",this.isNavigating=!1)}}});const d=e.querySelector("#btn-back-to-review");return d.addEventListener("click",c=>{c.preventDefault(),!(this.isNavigating||this.isDestroyed)&&(this.isNavigating=!0,d.classList.add("btn-disabled"),d.disabled=!0,this.destroy(),this.onBack&&this.onBack())}),this.scheduleRender(!0),e}scheduleRender(e=!1){if(this.renderDebounceTimer&&(clearTimeout(this.renderDebounceTimer),C.unregisterTimer(this.renderDebounceTimer),this.renderDebounceTimer=null),e)this.renderPreview();else{const i=setTimeout(()=>{this.renderDebounceTimer=null,C.unregisterTimer(i),this.renderPreview()},100);this.renderDebounceTimer=i,C.registerTimer(i)}}async renderPreview(){if(!this.previewCanvas||this.isDestroyed)return;this.renderSequenceId||(this.renderSequenceId=0);const e=++this.renderSequenceId;this.isRendering=!0;try{await Y.renderComposition({photos:this.photos,templateId:this.selectedTemplateId,customization:this.customization,eventConfig:this.eventConfig,targetCanvas:this.previewCanvas})}catch(i){console.warn("Preview render error:",i)}finally{e===this.renderSequenceId&&(this.isRendering=!1)}}destroy(){this.isDestroyed=!0,this.renderDebounceTimer&&(clearTimeout(this.renderDebounceTimer),C.unregisterTimer(this.renderDebounceTimer),this.renderDebounceTimer=null),this.isNavigating=!1,this.container&&this.container.parentNode&&this.container.parentNode.removeChild(this.container)}}const Jt="hipmi_photobooth_db",Xt=1,P="photo_history";class Zt{constructor(){this.db=null,this.initPromise=null,this.memoryFallback=new Map}async init(){return this.db?this.db:this.initPromise?this.initPromise:(this.initPromise=new Promise(e=>{if(typeof indexedDB>"u"){console.warn("IndexedDB not supported in this environment, falling back to memory storage."),e(null);return}try{const i=indexedDB.open(Jt,Xt);i.onupgradeneeded=t=>{const n=t.target.result;n.objectStoreNames.contains(P)||n.createObjectStore(P,{keyPath:"id"}).createIndex("createdAt","createdAt",{unique:!1})},i.onsuccess=t=>{this.db=t.target.result,e(this.db)},i.onerror=t=>{console.warn("IndexedDB failed to open:",t.target.error),e(null)}}catch(i){console.warn("IndexedDB initialization exception:",i),e(null)}}),this.initPromise)}async createThumbnail(e,i=420,t=.72){return typeof document>"u"?e:new Promise(n=>{const o=new Image;o.onload=()=>{try{const r=document.createElement("canvas");let s=o.naturalWidth||o.width,a=o.naturalHeight||o.height;s>a?s>i&&(a=Math.round(a*i/s),s=i):a>i&&(s=Math.round(s*i/a),a=i),r.width=Math.max(1,s),r.height=Math.max(1,a);const d=r.getContext("2d");d.imageSmoothingEnabled=!0,d.imageSmoothingQuality="medium",d.drawImage(o,0,0,s,a),n(r.toDataURL("image/jpeg",t))}catch{n(e)}},o.onerror=()=>n(e),o.src=e})}_formatDate(e){const i=new Date(e),t=["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"],n=String(i.getDate()).padStart(2,"0"),o=t[i.getMonth()]||"",r=i.getFullYear(),s=String(i.getHours()).padStart(2,"0"),a=String(i.getMinutes()).padStart(2,"0");return`${n} ${o} ${r}, ${s}:${a}`}async saveSession({sessionId:e,finalDataUrl:i,finalBlob:t=null,rawPhotos:n=[],customization:o={},templateId:r="signature",uploadedUrl:s=""}){if(!e||!i)return console.warn("saveSession called with missing sessionId or finalDataUrl"),null;await this.init();const a=await this.createThumbnail(i),d=Date.now(),c={id:e,createdAt:d,dateFormatted:this._formatDate(d),participantName:(o.name||"").trim()||"Tamu HIPMI",eventName:(o.eventName||"").trim()||"HIPMI Telkom Event",templateId:r,finalDataUrl:i,thumbnailDataUrl:a,uploadedUrl:s||"",photoCount:Array.isArray(n)?n.length:0,approxBytes:Math.round(i.length*.75)};return this.db?new Promise(h=>{try{const m=this.db.transaction([P],"readwrite").objectStore(P).put(c);m.onsuccess=()=>h(c),m.onerror=f=>{console.warn("Error writing to IndexedDB:",f.target.error),this.memoryFallback.set(e,c),h(c)}}catch(g){console.warn("Transaction error in IndexedDB:",g),this.memoryFallback.set(e,c),h(c)}}):(this.memoryFallback.set(e,c),c)}async updateUploadedUrl(e,i){if(!(!e||!i)){if(await this.init(),!this.db){const t=this.memoryFallback.get(e);t&&(t.uploadedUrl=i);return}return new Promise(t=>{try{const o=this.db.transaction([P],"readwrite").objectStore(P),r=o.get(e);r.onsuccess=()=>{const s=r.result;s&&(s.uploadedUrl=i,o.put(s)),t()},r.onerror=()=>t()}catch{t()}})}}async getAll(){return await this.init(),this.db?new Promise(e=>{try{const n=this.db.transaction([P],"readonly").objectStore(P).getAll();n.onsuccess=()=>{const o=n.result||[];o.sort((r,s)=>s.createdAt-r.createdAt),e(o)},n.onerror=()=>{const o=Array.from(this.memoryFallback.values());e(o.sort((r,s)=>s.createdAt-r.createdAt))}}catch{const t=Array.from(this.memoryFallback.values());e(t.sort((n,o)=>o.createdAt-n.createdAt))}}):Array.from(this.memoryFallback.values()).sort((i,t)=>t.createdAt-i.createdAt)}async getById(e){return e?(await this.init(),this.db?new Promise(i=>{try{const o=this.db.transaction([P],"readonly").objectStore(P).get(e);o.onsuccess=()=>i(o.result||null),o.onerror=()=>i(this.memoryFallback.get(e)||null)}catch{i(this.memoryFallback.get(e)||null)}}):this.memoryFallback.get(e)||null):null}async deleteById(e){return e?(await this.init(),this.memoryFallback.delete(e),this.db?new Promise(i=>{try{const o=this.db.transaction([P],"readwrite").objectStore(P).delete(e);o.onsuccess=()=>i(!0),o.onerror=()=>i(!1)}catch{i(!1)}}):!0):!1}async clearAll(){return await this.init(),this.memoryFallback.clear(),this.db?new Promise(e=>{try{const n=this.db.transaction([P],"readwrite").objectStore(P).clear();n.onsuccess=()=>e(!0),n.onerror=()=>e(!1)}catch{e(!1)}}):!0}async getStats(){const e=await this.getAll(),i=e.length;let t=0;e.forEach(o=>{o.approxBytes?t+=o.approxBytes:o.finalDataUrl&&(t+=Math.round(o.finalDataUrl.length*.75))});let n="0 KB";return t>1024*1024?n=`${(t/(1024*1024)).toFixed(1)} MB`:t>0&&(n=`${Math.round(t/1024)} KB`),{count:i,totalBytes:t,formattedSize:n}}}const _=new Zt;class gt{static async uploadPhoto({blob:e,dataUrl:i,sessionId:t,customization:n={},eventConfig:o={}}){const r=o.cloudProvider||"none";return r==="none"?{success:!1,reason:"offline_mode"}:r==="imgbb"?this.uploadToImgBB({dataUrl:i,sessionId:t,apiKey:o.imgbbApiKey}):r==="custom"?this.uploadToCustomEndpoint({blob:e,dataUrl:i,sessionId:t,customization:n,endpointUrl:o.customUploadEndpoint}):{success:!1,reason:"unknown_provider"}}static async uploadToImgBB({dataUrl:e,sessionId:i,apiKey:t}){const n=(t||"").trim();if(!n)return{success:!1,error:"API Key ImgBB belum diatur di Operator Settings."};try{const o=e.includes(",")?e.split(",")[1]:e,r=new FormData;r.append("key",n),r.append("image",o),r.append("name",`HIPMI_${i}`);const s=new AbortController,a=setTimeout(()=>s.abort(),2e4),d=await fetch("https://api.imgbb.com/1/upload",{method:"POST",body:r,signal:s.signal});if(clearTimeout(a),!d.ok){const h=await d.text();let g=`HTTP ${d.status}`;try{const u=JSON.parse(h);u.error&&u.error.message&&(g=u.error.message)}catch{}return{success:!1,error:g}}const c=await d.json();return c.success&&c.data?{success:!0,url:c.data.display_url||c.data.url,deleteUrl:c.data.delete_url||""}:{success:!1,error:c.error?c.error.message:"Respon upload tidak valid."}}catch(o){return o.name==="AbortError"?{success:!1,error:"Waktu upload habis (timeout 20 detik)."}:{success:!1,error:o.message||"Gagal menghubungi server upload."}}}static async uploadToCustomEndpoint({blob:e,dataUrl:i,sessionId:t,customization:n,endpointUrl:o}){const r=(o||"").trim();if(!r)return{success:!1,error:"URL Endpoint Hosting belum diatur di Operator Settings."};try{const s=new FormData;s.append("sessionId",t),s.append("name",n.name||""),s.append("event",n.eventName||""),s.append("timestamp",String(Date.now())),e?s.append("photo",e,`hipmi_${t}.png`):s.append("photoDataUrl",i);const a=new AbortController,d=setTimeout(()=>a.abort(),25e3),c=await fetch(r,{method:"POST",body:s,signal:a.signal});if(clearTimeout(d),!c.ok)return{success:!1,error:`Server merespon dengan status ${c.status}`};const h=await c.json(),g=h.url||h.data&&h.data.url||h.imageUrl;return g?{success:!0,url:g}:{success:!1,error:'Respon server berhasil namun tidak mengembalikan URL foto (field "url").'}}catch(s){return s.name==="AbortError"?{success:!1,error:"Upload timeout (25 detik)."}:{success:!1,error:s.message||"Gagal mengupload ke hosting."}}}static async testConnection(e){const i=e.cloudProvider;if(i==="none")return{success:!0,message:"Mode offline/lokal aktif (tanpa upload)."};const t="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";if(i==="imgbb"){const n=await this.uploadToImgBB({dataUrl:t,sessionId:`TEST_${Date.now()}`,apiKey:e.imgbbApiKey});return n.success?{success:!0,url:n.url,message:"Koneksi ImgBB Berhasil! Foto berhasil diunggah."}:{success:!1,error:n.error}}if(i==="custom"){const n=await this.uploadToCustomEndpoint({dataUrl:t,sessionId:`TEST_${Date.now()}`,customization:{name:"Test Operator"},endpointUrl:e.customUploadEndpoint});return n.success?{success:!0,url:n.url,message:"Koneksi Endpoint Hosting Berhasil!"}:{success:!1,error:n.error}}return{success:!1,error:"Provider cloud tidak dikenali."}}}class ei{constructor({finalBlob:e,finalDataUrl:i,sessionId:t,customization:n,eventConfig:o,onNewSession:r}){this.finalBlob=e,this.finalDataUrl=i,this.sessionId=t,this.customization=n||{},this.eventConfig=o,this.onNewSession=r,this.uploadedUrl="",this.container=null,this.autoResetDuration=Number.isInteger(o.autoResetSeconds)?o.autoResetSeconds:15,this.remainingSeconds=this.autoResetDuration,this.resetTimer=null,this.isResetting=!1,this.isDownloading=!1,this.isDestroyed=!1,this.interactionHandler=null}async render(){const e=document.createElement("div");e.className="view-container view-enter result-screen",this.container=e,K.playSuccess();const i=this.autoResetDuration>0;_.saveSession({sessionId:this.sessionId,finalDataUrl:this.finalDataUrl,finalBlob:this.finalBlob,rawPhotos:C.getSession()?.photos||[],customization:this.customization,templateId:C.getSession()?.selectedTemplateId||"signature"}).catch(o=>console.warn("History storage save failed:",o)),e.innerHTML=`
      <!-- Left Column: Large Hero Composite Photo -->
      <div class="result-photo-col">
        <div class="result-photo-frame">
          <img src="${this.finalDataUrl}" alt="HIPMI Photobooth Result" class="result-photo-img" id="result-final-img" />
        </div>
      </div>

      <!-- Right Column: QR Code & Session Actions -->
      <div class="result-action-col">
        <div class="result-header-text">
          <div class="result-badge">
            <span class="pulse-indicator" style="width: 6px; height: 6px; border-radius: 50%; background: var(--color-accent); display: inline-block;"></span>
            COMPOSITION READY
          </div>
          <h1 class="result-title">Your Photo is Ready</h1>
          <p class="result-desc">Scan the QR code below on your phone to save your memory, or tap download directly.</p>
        </div>

        <!-- High-Contrast Scannable QR Box -->
        <div class="qr-box-card">
          <div class="qr-cloud-badge" id="qr-cloud-badge" style="display: none;">
            <span class="pulse-indicator" id="qr-cloud-pulse" style="width: 6px; height: 6px; border-radius: 50%; background: var(--color-accent); display: inline-block;"></span>
            <span id="qr-cloud-label">Menghubungkan ke Cloud...</span>
          </div>
          <canvas class="qr-canvas-element" id="qr-canvas"></canvas>
          <span class="qr-label-instruction">Scan to save your photo</span>
          <span class="qr-sublabel" id="qr-sublabel">Open this photo on your mobile device</span>
        </div>

        <!-- Action Buttons -->
        <div class="result-buttons">
          <button class="btn-primary btn-accent" id="btn-download-photo" aria-label="Download Photo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download Photo
          </button>

          <button class="btn-secondary" id="btn-new-session" style="background: transparent; color: #FFFFFF; border-color: rgba(255,255,255,0.25);" aria-label="Start New Session">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="1 4 1 10 7 10"></polyline>
              <polyline points="23 20 23 14 17 14"></polyline>
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
            </svg>
            New Session
          </button>
        </div>

        <!-- Auto Reset Progress Bar -->
        ${i?`
        <div class="auto-reset-container">
          <div class="auto-reset-text">
            <span>Starting a new session in</span>
            <span id="reset-counter-text">${this.remainingSeconds}s</span>
          </div>
          <div class="auto-reset-bar-bg">
            <div class="auto-reset-bar-fill" id="reset-bar-fill"></div>
          </div>
        </div>
        `:`
        <div class="auto-reset-container" style="opacity: 0.6;">
          <div class="auto-reset-text">
            <span>Session Reset</span>
            <span>Manual Only</span>
          </div>
        </div>
        `}
      </div>
    `,this._initQrAndCloudUpload(e),e.querySelector("#btn-download-photo").addEventListener("click",o=>{o.preventDefault(),this.downloadPhoto()});const n=e.querySelector("#btn-new-session");return n.addEventListener("click",o=>{o.preventDefault(),!(this.isResetting||this.isDestroyed)&&(n.classList.add("btn-disabled"),n.disabled=!0,this.triggerNewSession())}),i&&(this.startAutoReset(),this.interactionHandler=()=>{this.resetAutoResetTimer()},window.addEventListener("pointerdown",this.interactionHandler,{passive:!0}),window.addEventListener("touchstart",this.interactionHandler,{passive:!0}),window.addEventListener("keydown",this.interactionHandler,{passive:!0})),e}async _initQrAndCloudUpload(e){const i=e.querySelector("#qr-canvas"),t=e.querySelector("#qr-cloud-badge"),n=e.querySelector("#qr-cloud-label"),o=e.querySelector("#qr-sublabel"),r=$.getSessionPhotoUrl(this.sessionId,"",this.eventConfig);try{await $.renderToCanvas(i,r,{width:220})}catch(a){console.warn("Initial QR generation error:",a)}if((this.eventConfig.cloudProvider||"none")!=="none"){t.style.display="inline-flex",n.textContent="Mengunggah ke cloud...";try{const a=await gt.uploadPhoto({blob:this.finalBlob,dataUrl:this.finalDataUrl,sessionId:this.sessionId,customization:this.customization,eventConfig:this.eventConfig});if(this.isDestroyed)return;if(a.success&&a.url){this.uploadedUrl=a.url,t.classList.add("status-success"),n.textContent="✅ Siap di-scan di HP",o&&(o.textContent="Buka & unduh langsung dari HP kamu"),await _.updateUploadedUrl(this.sessionId,a.url);const d=$.getSessionPhotoUrl(this.sessionId,a.url,this.eventConfig);await $.renderToCanvas(i,d,{width:220})}else t.classList.add("status-warning"),n.textContent="Offline (Simpan di booth)"}catch(a){console.warn("Background upload exception:",a),!this.isDestroyed&&n&&(t.classList.add("status-warning"),n.textContent="Offline (Simpan di booth)")}}}downloadPhoto(){if(!(this.isDownloading||this.isDestroyed)){this.isDownloading=!0;try{const e=new Date,i=d=>String(d).padStart(2,"0"),t=`${e.getFullYear()}${i(e.getMonth()+1)}${i(e.getDate())}`,n=`${i(e.getHours())}${i(e.getMinutes())}${i(e.getSeconds())}`,o=ht(this.customization.name,25),s=`hipmi-telkom-university-photobooth${o?`-${o}`:""}-${t}-${n}.png`,a=document.createElement("a");a.download=s,a.href=this.finalDataUrl,document.body.appendChild(a),a.click(),document.body.removeChild(a)}catch(e){console.error("Download failed:",e)}finally{setTimeout(()=>{this.isDownloading=!1},800)}}}startAutoReset(){this.clearAutoReset();const e=this.container.querySelector("#reset-counter-text"),i=this.container.querySelector("#reset-bar-fill");this.resetTimer=setInterval(()=>{if(!this.isDestroyed){if(this.remainingSeconds--,e&&(e.textContent=`${this.remainingSeconds}s`),i){const t=this.remainingSeconds/this.autoResetDuration*100;i.style.width=`${Math.max(0,t)}%`}this.remainingSeconds<=0&&(this.clearAutoReset(),this.triggerNewSession())}},1e3),C.registerTimer(this.resetTimer,!0)}resetAutoResetTimer(){if(this.isDestroyed||this.autoResetDuration<=0)return;this.remainingSeconds=this.autoResetDuration;const e=this.container?this.container.querySelector("#reset-counter-text"):null,i=this.container?this.container.querySelector("#reset-bar-fill"):null;e&&(e.textContent=`${this.remainingSeconds}s`),i&&(i.style.width="100%")}clearAutoReset(){this.resetTimer&&(clearInterval(this.resetTimer),C.unregisterTimer(this.resetTimer),this.resetTimer=null)}triggerNewSession(){this.isResetting||this.isDestroyed||(this.isResetting=!0,this.clearAutoReset(),this.onNewSession&&this.onNewSession())}destroy(){this.isDestroyed=!0,this.clearAutoReset(),this.interactionHandler&&(window.removeEventListener("pointerdown",this.interactionHandler),window.removeEventListener("touchstart",this.interactionHandler),window.removeEventListener("keydown",this.interactionHandler),this.interactionHandler=null),this.isResetting=!1,this.isDownloading=!1,this.container&&this.container.parentNode&&this.container.parentNode.removeChild(this.container)}}class ti{constructor({eventConfig:e,onConfigUpdated:i,onOpenHistory:t,onClose:n}){this.eventConfig=e,this.onConfigUpdated=i,this.onOpenHistory=t,this.onClose=n,this.container=null,this.isTesting=!1}async render(){const e=document.createElement("div");e.className="modal-backdrop view-enter",this.container=e;const i=await D.getDevices();let t='<option value="">Auto / Default Camera</option>';i.forEach((f,p)=>{const v=f.deviceId===this.eventConfig.selectedCameraId;t+=`<option value="${M(f.deviceId)}" ${v?"selected":""}>${M(f.label||`Camera ${p+1}`)}</option>`});const n=await _.getStats(),o=this.eventConfig.cloudProvider||"none";e.innerHTML=`
      <div class="modal-content" style="max-width: 580px; max-height: 90vh; overflow-y: auto;">
        <div class="modal-header">
          <div>
            <h2 class="modal-title">Booth Operator Settings</h2>
            <p style="font-size: 13px; color: #8E8E93; margin-top: 2px;">HIPMI PT Telkom University Event Controls</p>
          </div>
          <button class="icon-btn" id="modal-close-btn" aria-label="Close modal">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Section: Riwayat Foto Lokal -->
        <div style="background: #F8F9FA; border: 1.5px solid var(--color-border); border-radius: 12px; padding: 16px; margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between;">
          <div>
            <div style="font-size: 14px; font-weight: 800; color: var(--color-primary); display: flex; align-items: center; gap: 6px;">
              <span>📁 Riwayat Foto Lokal</span>
              <span style="font-size: 11px; padding: 2px 8px; border-radius: 9999px; background: rgba(200,168,75,0.2); color: var(--color-accent-dark); font-weight: 700;">
                ${n.count} Tersimpan
              </span>
            </div>
            <p style="font-size: 12px; color: var(--color-secondary); margin: 2px 0 0;">
              Total penyimpanan: ${n.formattedSize} (IndexedDB perangkat)
            </p>
          </div>
          <button type="button" class="btn-primary btn-accent" id="btn-open-history-from-operator" style="min-height: 38px; padding: 0 16px; font-size: 13px;">
            Buka Galeri
          </button>
        </div>

        <form id="operator-form">
          <!-- General Booth Info -->
          <div class="form-group">
            <label class="form-label" for="cfg-event-name">Event Name</label>
            <input type="text" id="cfg-event-name" class="form-input" value="${M(this.eventConfig.eventName)}" required />
          </div>

          <div class="form-group">
            <label class="form-label" for="cfg-event-year">Year</label>
            <input type="text" id="cfg-event-year" class="form-input" value="${M(this.eventConfig.year)}" required />
          </div>

          <!-- Camera & Timing -->
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
            <div class="form-group">
              <label class="form-label" for="cfg-photo-count">Photos Per Session</label>
              <select id="cfg-photo-count" class="form-select">
                <option value="1" ${this.eventConfig.photoCount===1?"selected":""}>1 Photo</option>
                <option value="2" ${this.eventConfig.photoCount===2?"selected":""}>2 Photos</option>
                <option value="3" ${this.eventConfig.photoCount===3?"selected":""}>3 Photos</option>
                <option value="4" ${this.eventConfig.photoCount===4?"selected":""}>4 Photos (Default)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="cfg-countdown">Countdown Timer</label>
              <select id="cfg-countdown" class="form-select">
                <option value="3" ${this.eventConfig.countdownSeconds===3?"selected":""}>3 Seconds (Default)</option>
                <option value="5" ${this.eventConfig.countdownSeconds===5?"selected":""}>5 Seconds</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="cfg-auto-reset">Result Auto-Reset Duration</label>
            <select id="cfg-auto-reset" class="form-select">
              <option value="10" ${this.eventConfig.autoResetSeconds===10?"selected":""}>10 Seconds</option>
              <option value="15" ${this.eventConfig.autoResetSeconds===15?"selected":""}>15 Seconds (Default)</option>
              <option value="30" ${this.eventConfig.autoResetSeconds===30?"selected":""}>30 Seconds</option>
              <option value="0" ${this.eventConfig.autoResetSeconds===0?"selected":""}>Disabled (Manual Only)</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="cfg-camera-device">Camera Device</label>
            <select id="cfg-camera-device" class="form-select">
              ${t}
            </select>
          </div>

          <div class="form-group" style="flex-direction: row; align-items: center; justify-content: space-between; padding: 8px 0;">
            <label class="form-label" style="margin: 0;" for="cfg-mirror">Mirror Camera Feed (Selfie Mode)</label>
            <input type="checkbox" id="cfg-mirror" ${this.eventConfig.mirrorCamera!==!1?"checked":""} style="width: 20px; height: 20px; accent-color: var(--color-accent);" />
          </div>

          <!-- Section: Hosting & QR Scan Experience -->
          <div style="border-top: 1.5px solid var(--color-border); margin: 20px 0 16px; padding-top: 16px;">
            <div style="font-size: 13px; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; color: var(--color-accent-dark); margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
              <span>🌐 Integrasi Hosting & Scan QR Code</span>
            </div>

            <div class="form-group">
              <label class="form-label" for="cfg-hosting-url">
                Public Hosting Domain (URL Website)
              </label>
              <input
                type="url"
                id="cfg-hosting-url"
                class="form-input"
                placeholder="https://photobooth.hipmitelku.com"
                value="${M(this.eventConfig.hostingUrl||"")}"
              />
              <span style="font-size: 11px; color: var(--color-secondary); margin-top: 4px;">
                Jika diisi, QR Code di booth akan otomatis mengarah ke domain ini (bukan localhost) saat di-scan smartphone.
              </span>
            </div>

            <div class="form-group">
              <label class="form-label" for="cfg-cloud-provider">Layanan Cloud Upload Foto</label>
              <select id="cfg-cloud-provider" class="form-select">
                <option value="none" ${o==="none"?"selected":""}>Offline / Tanpa Upload (Hanya Simpan di Booth)</option>
                <option value="imgbb" ${o==="imgbb"?"selected":""}>ImgBB API (Gratis, Tanpa Backend Server)</option>
                <option value="custom" ${o==="custom"?"selected":""}>Custom Hosting Endpoint (API / PHP Sendiri)</option>
              </select>
            </div>

            <!-- ImgBB API Key Field -->
            <div class="form-group" id="group-imgbb" style="display: ${o==="imgbb"?"block":"none"};">
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
                <label class="form-label" for="cfg-imgbb-key" style="margin: 0;">API Key ImgBB</label>
                <a href="https://api.imgbb.com/" target="_blank" rel="noopener noreferrer" style="color: var(--color-accent); font-size: 11px; font-weight: 700; text-decoration: underline;">
                  Dapatkan API Key Gratis di imgbb.com &rarr;
                </a>
              </div>
              <input
                type="text"
                id="cfg-imgbb-key"
                class="form-input"
                placeholder="e.g. 7c2f8a9e1b3d..."
                value="${M(this.eventConfig.imgbbApiKey||"")}"
              />
              <span style="font-size: 11px; color: var(--color-secondary); margin-top: 4px;">
                Foto akan diupload ke ImgBB secara otomatis dan URL foto disematkan ke QR code.
              </span>
            </div>

            <!-- Custom Endpoint Field -->
            <div class="form-group" id="group-custom" style="display: ${o==="custom"?"block":"none"};">
              <label class="form-label" for="cfg-custom-endpoint">Custom Upload Endpoint URL</label>
              <input
                type="url"
                id="cfg-custom-endpoint"
                class="form-input"
                placeholder="https://your-hosting.com/api/upload"
                value="${M(this.eventConfig.customUploadEndpoint||"")}"
              />
              <span style="font-size: 11px; color: var(--color-secondary); margin-top: 4px;">
                Menerima POST multipart/form-data dengan field: 'photo', 'sessionId', 'name'.
              </span>
            </div>

            <div class="form-group">
              <label class="form-label" for="cfg-qr-target">Aksi Saat QR Di-Scan di HP</label>
              <select id="cfg-qr-target" class="form-select">
                <option value="viewer" ${this.eventConfig.qrTarget!=="direct"?"selected":""}>
                  Halaman Web Mobile Eksklusif HIPMI (Preview, Download HD, Share)
                </option>
                <option value="direct" ${this.eventConfig.qrTarget==="direct"?"selected":""}>
                  Buka File Foto Langsung (Direct Image File)
                </option>
              </select>
            </div>

            <!-- Test Connection Button & Result -->
            <div style="margin-top: 10px;">
              <button type="button" class="btn-secondary" id="btn-test-upload" style="font-size: 13px; padding: 0 16px; min-height: 40px; display: inline-flex; align-items: center; gap: 8px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                Uji Koneksi Upload
              </button>
              <div id="test-upload-status" style="margin-top: 8px; font-size: 12px; font-weight: 600; display: none;"></div>
            </div>
          </div>

          <div style="display: flex; gap: var(--space-sm); margin-top: var(--space-lg);">
            <button type="submit" class="btn-primary btn-accent" style="flex: 1;" id="btn-save-operator-settings">
              Save Settings
            </button>
            <button type="button" class="btn-secondary" id="btn-cancel-operator">
              Cancel
            </button>
          </div>
        </form>
      </div>
    `;const r=e.querySelector("#cfg-cloud-provider"),s=e.querySelector("#group-imgbb"),a=e.querySelector("#group-custom");r.addEventListener("change",()=>{const f=r.value;s.style.display=f==="imgbb"?"block":"none",a.style.display=f==="custom"?"block":"none"});const d=e.querySelector("#btn-test-upload"),c=e.querySelector("#test-upload-status");d.addEventListener("click",async()=>{if(this.isTesting)return;this.isTesting=!0,d.classList.add("btn-disabled"),c.style.display="block",c.style.color="var(--color-secondary)",c.textContent="Menguji koneksi upload...";const f={cloudProvider:r.value,imgbbApiKey:e.querySelector("#cfg-imgbb-key").value.trim(),customUploadEndpoint:e.querySelector("#cfg-custom-endpoint").value.trim()},p=await gt.testConnection(f);this.isTesting=!1,d.classList.remove("btn-disabled"),p.success?(c.style.color="#10B981",c.textContent=`✅ ${p.message}`):(c.style.color="#EF4444",c.textContent=`❌ ${p.error}`)});const h=e.querySelector("#btn-open-history-from-operator");return h&&h.addEventListener("click",()=>{this.close(),this.onOpenHistory&&this.onOpenHistory()}),e.querySelector("#operator-form").addEventListener("submit",f=>{f.preventDefault();const p={...this.eventConfig,eventName:e.querySelector("#cfg-event-name").value.trim(),year:e.querySelector("#cfg-event-year").value.trim(),photoCount:parseInt(e.querySelector("#cfg-photo-count").value,10),countdownSeconds:parseInt(e.querySelector("#cfg-countdown").value,10),autoResetSeconds:parseInt(e.querySelector("#cfg-auto-reset").value,10),selectedCameraId:e.querySelector("#cfg-camera-device").value,mirrorCamera:e.querySelector("#cfg-mirror").checked,hostingUrl:e.querySelector("#cfg-hosting-url").value.trim(),cloudProvider:r.value,imgbbApiKey:e.querySelector("#cfg-imgbb-key").value.trim(),customUploadEndpoint:e.querySelector("#cfg-custom-endpoint").value.trim(),qrTarget:e.querySelector("#cfg-qr-target").value};vt(p),this.onConfigUpdated&&this.onConfigUpdated(p),this.close()}),e.querySelector("#modal-close-btn").addEventListener("click",()=>this.close()),e.querySelector("#btn-cancel-operator").addEventListener("click",()=>this.close()),e}close(){this.isClosed||(this.isClosed=!0,this.container&&this.container.parentNode&&this.container.parentNode.removeChild(this.container),this.onClose&&this.onClose())}}class ii{constructor({type:e="camera",message:i=null,onRetry:t,onUseVirtual:n,onHome:o}){this.type=e,this.message=i,this.onRetry=t,this.onUseVirtual=n,this.onHome=o,this.container=null}getErrorDetails(){switch(this.type){case"PERMISSION_DENIED":return{title:"Camera Access Required",desc:"Please allow camera access in your browser settings to capture your photobooth moment.",icon:"camera-off"};case"CAMERA_UNAVAILABLE":case"NOT_SUPPORTED":return{title:"Camera Unavailable",desc:"Please check that your camera or USB booth webcam is connected and try again.",icon:"alert-circle"};case"CAPTURE_FAILED":return{title:"Capture Incomplete",desc:"We couldn't capture this photo frame. Please try again.",icon:"refresh-cw"};case"PROCESSING_ERROR":return{title:"Processing Issue",desc:"Something went wrong while preparing your photo composition. Please try again.",icon:"sliders"};default:return{title:"Notice",desc:this.message||"An unexpected situation occurred. Please try again.",icon:"alert-circle"}}}render(){const e=document.createElement("div");e.className="modal-backdrop view-enter",this.container=e;const i=this.getErrorDetails();return e.innerHTML=`
      <div class="modal-content" style="max-width: 440px; text-align: center; padding: 36px 28px;">
        <div style="width: 64px; height: 64px; border-radius: 50%; background-color: var(--color-accent-light); border: 1.5px solid var(--color-accent); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; color: var(--color-accent-dark);">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>

        <h2 style="font-size: 22px; font-weight: 800; color: var(--color-primary); margin-bottom: 8px;">
          ${i.title}
        </h2>

        <p style="font-size: 14px; color: var(--color-secondary); line-height: 1.5; margin-bottom: 28px;">
          ${i.desc}
        </p>

        <div style="display: flex; flex-direction: column; gap: 10px;">
          <button class="btn-primary btn-accent" id="btn-error-retry" style="width: 100%;">
            Try Again
          </button>
          <button class="btn-secondary" id="btn-error-virtual" style="width: 100%; border-color: var(--color-accent); color: var(--color-accent-dark);">
            Use Virtual Test Camera (Studio Simulation)
          </button>
          <button class="btn-secondary" id="btn-error-home" style="width: 100%;">
            Return to Welcome
          </button>
        </div>
      </div>
    `,this.isHandled=!1,e.querySelector("#btn-error-retry").addEventListener("click",()=>{this.isHandled||(this.isHandled=!0,this.close(),this.onRetry&&this.onRetry())}),e.querySelector("#btn-error-virtual").addEventListener("click",()=>{this.isHandled||(this.isHandled=!0,this.close(),this.onUseVirtual&&this.onUseVirtual())}),e.querySelector("#btn-error-home").addEventListener("click",()=>{this.isHandled||(this.isHandled=!0,this.close(),this.onHome&&this.onHome())}),e}close(){this.isHandled=!0,this.container&&this.container.parentNode&&this.container.parentNode.removeChild(this.container)}}class ni{constructor({eventConfig:e,onClose:i}){this.eventConfig=e,this.onClose=i,this.container=null,this.items=[],this.stats={count:0,formattedSize:"0 KB"}}async render(){const e=document.createElement("div");return e.className="modal-backdrop view-enter history-modal-backdrop",this.container=e,e.innerHTML=`
      <div class="modal-content history-modal-content">
        <!-- Modal Header -->
        <div class="modal-header history-modal-header">
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <h2 class="modal-title" style="margin: 0;">Riwayat Foto Booth</h2>
              <span class="history-badge-count" id="history-total-badge">0 Foto</span>
            </div>
            <p style="font-size: 13px; color: #8E8E93; margin-top: 4px;" id="history-stats-subtitle">
              Penyimpanan lokal perangkat (IndexedDB)
            </p>
          </div>
          <button class="icon-btn" id="history-close-btn" aria-label="Close modal">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Action Toolbar -->
        <div class="history-toolbar">
          <div class="history-toolbar-left">
            <span style="font-size: 13px; font-weight: 600; color: var(--color-secondary);" id="history-storage-size">
              Memori: 0 MB
            </span>
          </div>
          <div class="history-toolbar-right">
            <button class="btn-secondary history-tool-btn" id="btn-history-download-all" title="Unduh Semua Foto">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Unduh Semua
            </button>
            <button class="btn-secondary history-tool-btn history-danger-btn" id="btn-history-clear-all" title="Bersihkan Seluruh Riwayat">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
              Hapus Semua
            </button>
          </div>
        </div>

        <!-- History Content Area -->
        <div class="history-content-scroll" id="history-items-container">
          <div class="history-loading-indicator">
            <svg class="pulse-indicator" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="12" cy="12" r="10"></circle>
            </svg>
            <span>Memuat riwayat foto...</span>
          </div>
        </div>
      </div>

      <!-- Fullscreen Lightbox & QR Preview Overlay -->
      <div class="history-lightbox-overlay" id="history-lightbox" style="display: none;">
        <div class="history-lightbox-card">
          <button class="icon-btn history-lightbox-close" id="history-lightbox-close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div id="history-lightbox-content"></div>
        </div>
      </div>
    `,e.querySelector("#history-close-btn").addEventListener("click",()=>this.close()),e.addEventListener("click",t=>{t.target===e&&this.close()}),this._keyHandler=t=>{t.key==="Escape"&&this.close()},window.addEventListener("keydown",this._keyHandler),this.refreshHistory(),e}async refreshHistory(){if(!this.container)return;const e=this.container.querySelector("#history-items-container"),i=this.container.querySelector("#history-total-badge"),t=this.container.querySelector("#history-stats-subtitle"),n=this.container.querySelector("#history-storage-size"),o=this.container.querySelector("#btn-history-download-all"),r=this.container.querySelector("#btn-history-clear-all");if(this.items=await _.getAll(),this.stats=await _.getStats(),i.textContent=`${this.stats.count} Foto`,n.textContent=`Memori: ${this.stats.formattedSize}`,t.textContent=`${this.stats.count} foto tersimpan secara lokal di perangkat ini`,this.items.length===0){o.disabled=!0,o.style.opacity="0.5",r.disabled=!0,r.style.opacity="0.5",e.innerHTML=`
        <div class="history-empty-state">
          <div class="history-empty-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          </div>
          <h3 style="font-size: 18px; font-weight: 800; color: var(--color-primary); margin-bottom: 6px;">
            Belum Ada Foto Tersimpan
          </h3>
          <p style="font-size: 14px; color: var(--color-secondary); max-width: 360px; line-height: 1.5;">
            Foto yang diambil di photobooth akan otomatis tersimpan di sini secara aman.
          </p>
        </div>
      `;return}o.disabled=!1,o.style.opacity="1",r.disabled=!1,r.style.opacity="1";let s='<div class="history-grid">';this.items.forEach(a=>{const d=M(a.id),c=M(a.participantName),h=M(a.dateFormatted),g=M(a.templateId||"signature"),u=a.thumbnailDataUrl||a.finalDataUrl,m=!!a.uploadedUrl;s+=`
        <div class="history-card" data-id="${d}">
          <div class="history-thumb-wrap" data-action="preview" data-id="${d}">
            <img src="${u}" alt="${c}" class="history-thumb-img" loading="lazy" />
            <div class="history-thumb-overlay">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
              <span>Lihat Detail</span>
            </div>
            ${m?'<span class="history-cloud-tag" title="Tersedia di Cloud">☁️ Cloud</span>':""}
          </div>

          <div class="history-card-body">
            <div class="history-card-header">
              <span class="history-card-name" title="${c}">${c}</span>
              <span class="history-card-template">${g}</span>
            </div>
            <div class="history-card-meta">
              <span>${h}</span>
              <span style="font-family: monospace; font-size: 11px;">#${d.slice(-6)}</span>
            </div>

            <div class="history-card-actions">
              <button class="history-mini-btn btn-primary" data-action="download" data-id="${d}" title="Unduh Foto">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Unduh
              </button>

              <button class="history-mini-btn btn-secondary" data-action="qr" data-id="${d}" title="Tampilkan QR Code HP">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                QR
              </button>

              <button class="history-mini-btn history-delete-btn" data-action="delete" data-id="${d}" title="Hapus Foto">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      `}),s+="</div>",e.innerHTML=s,this._attachItemListeners(e),r.onclick=async()=>{confirm(`Yakin ingin menghapus seluruh ${this.items.length} riwayat foto dari perangkat ini? Tindakan ini tidak dapat dibatalkan.`)&&(await _.clearAll(),await this.refreshHistory())},o.onclick=()=>this._downloadAllPhotos()}_attachItemListeners(e){e.addEventListener("click",async i=>{const t=i.target.closest("[data-action]");if(!t)return;i.preventDefault(),i.stopPropagation();const n=t.getAttribute("data-action"),o=t.getAttribute("data-id"),r=this.items.find(s=>s.id===o);r&&(n==="preview"?this._showPreviewLightbox(r):n==="download"?this._downloadSinglePhoto(r):n==="qr"?this._showQrLightbox(r):n==="delete"&&confirm(`Hapus foto sesi ${r.participantName} (${r.id})?`)&&(await _.deleteById(r.id),await this.refreshHistory()))})}_downloadSinglePhoto(e){const i=ht(e.participantName||"HIPMI",e.id),t=document.createElement("a");t.href=e.finalDataUrl,t.download=`${i}.png`,document.body.appendChild(t),t.click(),setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t)},200)}async _downloadAllPhotos(){if(this.items.length!==0)for(let e=0;e<this.items.length;e++){const i=this.items[e];this._downloadSinglePhoto(i),await new Promise(t=>setTimeout(t,300))}}_showPreviewLightbox(e){const i=this.container.querySelector("#history-lightbox"),t=this.container.querySelector("#history-lightbox-content"),n=this.container.querySelector("#history-lightbox-close"),o=M(e.participantName),r=M(e.dateFormatted),s=M(e.id);t.innerHTML=`
      <div style="display: flex; flex-direction: column; align-items: center; max-width: 90vw; max-height: 85vh;">
        <div style="max-height: 72vh; border-radius: 8px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.5); margin-bottom: 16px;">
          <img src="${e.finalDataUrl}" alt="${o}" style="max-height: 72vh; max-width: 100%; object-fit: contain; display: block;" />
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; max-width: 480px;">
          <div>
            <h4 style="font-size: 16px; font-weight: 800; color: #FFFFFF; margin: 0;">${o}</h4>
            <p style="font-size: 12px; color: #9E9EA7; margin: 2px 0 0;">${r} • #${s}</p>
          </div>
          <button class="btn-primary btn-accent" id="lightbox-download-btn" style="min-height: 42px; padding: 0 20px; font-size: 13px;">
            Unduh PNG
          </button>
        </div>
      </div>
    `,i.style.display="flex",t.querySelector("#lightbox-download-btn").onclick=()=>{this._downloadSinglePhoto(e)},n.onclick=()=>{i.style.display="none",t.innerHTML=""},i.onclick=a=>{a.target===i&&(i.style.display="none",t.innerHTML="")}}async _showQrLightbox(e){const i=this.container.querySelector("#history-lightbox"),t=this.container.querySelector("#history-lightbox-content"),n=this.container.querySelector("#history-lightbox-close"),o=M(e.participantName),r=M(e.id),s=$.getSessionPhotoUrl(e.id,e.uploadedUrl,this.eventConfig);t.innerHTML=`
      <div style="display: flex; flex-direction: column; align-items: center; padding: 16px; text-align: center; max-width: 400px;">
        <div style="background: rgba(200,168,75,0.15); border: 1px solid rgba(200,168,75,0.4); color: var(--color-accent); font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 9999px; margin-bottom: 12px;">
          SCAN DENGAN SMARTPHONE
        </div>
        <h3 style="font-size: 20px; font-weight: 900; color: #FFFFFF; margin-bottom: 4px;">${o}</h3>
        <p style="font-size: 12px; color: #8E8E93; margin-bottom: 20px;">Sesi #${r}</p>

        <div style="background: #FFFFFF; padding: 16px; border-radius: 16px; box-shadow: 0 16px 40px rgba(0,0,0,0.5); margin-bottom: 16px;">
          <canvas id="history-qr-canvas" style="width: 220px; height: 220px; display: block;"></canvas>
        </div>

        <p style="font-size: 12px; color: #C5C5CA; margin-bottom: 16px; line-height: 1.4;">
          Arahkan kamera smartphone ke QR Code di atas untuk mengunduh foto ini ke HP.
        </p>

        <div style="display: flex; gap: 8px; width: 100%;">
          <a href="${s}" target="_blank" rel="noopener noreferrer" class="btn-secondary" style="flex: 1; min-height: 42px; font-size: 13px; color: #FFFFFF; border-color: rgba(255,255,255,0.25);">
            Buka Tautan
          </a>
        </div>
      </div>
    `,i.style.display="flex";const a=t.querySelector("#history-qr-canvas");try{await $.renderToCanvas(a,s,{width:220})}catch(d){console.warn("QR render in history error:",d)}n.onclick=()=>{i.style.display="none",t.innerHTML=""},i.onclick=d=>{d.target===i&&(i.style.display="none",t.innerHTML="")}}close(){this._keyHandler&&window.removeEventListener("keydown",this._keyHandler),this.container&&this.container.parentNode&&this.container.parentNode.removeChild(this.container),this.onClose&&this.onClose()}}class oi{constructor(){this.appEl=document.getElementById("app"),this.eventConfig=yt(),this.currentView=null,this.currentScreen=null,this.isTransitioning=!1,this.isOperatorModalOpen=!1,this.isHistoryModalOpen=!1}init(){D.stopCamera(),C.cleanupCurrentSession();const e=new URLSearchParams(window.location.search),i=e.get("session"),t=e.get("action"),n=e.get("photo");if(i&&(t==="view"||t==="download")){this.renderMobileViewer(i,n);return}const o=e.get("stresstest")||e.get("autostress");if(o){const r=parseInt(o,10)||50;this.runStressTestDashboard(r);return}try{window.history.replaceState({screen:"WELCOME"},"",window.location.pathname)}catch{}window.addEventListener("beforeunload",()=>{D.stopCamera(),C.cleanupCurrentSession()}),window.addEventListener("popstate",r=>{if(this.isTransitioning)return;const s=r.state&&r.state.screen?r.state.screen:"WELCOME";this._handlePopState(s)}),window.addEventListener("keydown",r=>{(r.ctrlKey||r.metaKey)&&r.shiftKey&&r.key.toLowerCase()==="o"&&(r.preventDefault(),this.openOperatorSettings())}),this.goToWelcome(!1)}_handlePopState(e){switch(e){case"WELCOME":this.goToWelcome(!1);break;case"CAMERA":{C.getSession()?this.goToCamera(null,!1):this.goToWelcome(!1);break}case"REVIEW":{const i=C.getSession();i&&i.photos.length>0?this.goToReview(!1):this.goToWelcome(!1);break}case"TEMPLATE":{const i=C.getSession();i&&i.photos.length>0?this.goToTemplate(!1):this.goToWelcome(!1);break}case"RESULT":{const i=C.getSession();i&&i.finalDataUrl?this.goToResult(!1):this.goToWelcome(!1);break}default:this.goToWelcome(!1)}}_switchView(e,i,t=!0){if(this.currentView&&typeof this.currentView.destroy=="function")try{this.currentView.destroy()}catch(n){console.warn("View destroy error:",n)}if(this.appEl.innerHTML="",this.currentView=e,this.currentScreen=i,this.isTransitioning=!1,t)try{window.history.pushState({screen:i},"",window.location.pathname)}catch{}}goToWelcome(e=!0){if(this.isTransitioning)return;this.isTransitioning=!0,D.stopCamera(),C.resetSession();const i=new Kt({eventConfig:this.eventConfig,onStart:()=>{C.startNewSession(this.eventConfig),this.goToCamera(null)},onOpenHistory:()=>this.openHistoryModal(),onOpenSettings:()=>this.openOperatorSettings(),onToggleFullscreen:()=>this.toggleFullscreen()}),t=i.render();this._switchView(i,"WELCOME",e),this.appEl.appendChild(t)}async goToCamera(e=null,i=!0){if(this.isTransitioning)return;if(this.isTransitioning=!0,this.currentView&&typeof this.currentView.destroy=="function"){try{this.currentView.destroy()}catch(o){console.warn("View destroy error:",o)}this.currentView=null}C.getSession()||C.startNewSession(this.eventConfig);const n=new Yt({targetSlotIndex:e,totalSlots:this.eventConfig.photoCount||3,countdownSeconds:this.eventConfig.countdownSeconds||3,eventConfig:this.eventConfig,onPhotoCaptured:(o,r,s)=>{C.addPhoto(o,r,s)},onAllPhotosCompleted:()=>{this.goToReview()},onCancel:()=>{const o=C.getSession();o&&o.photos.length>0?this.goToReview():this.goToWelcome()},onCameraError:o=>{this.showErrorModal(o,()=>this.goToCamera(e),()=>{this.eventConfig.selectedCameraId="simulated",this.goToCamera(e)})}});try{const o=await n.render();this._switchView(n,"CAMERA",i),this.appEl.appendChild(o)}catch(o){this.isTransitioning=!1;const r=o.message==="PERMISSION_DENIED"?"PERMISSION_DENIED":"CAMERA_UNAVAILABLE";this.showErrorModal(r,()=>this.goToCamera(e),()=>{this.eventConfig.selectedCameraId="simulated",this.goToCamera(e)})}}goToReview(e=!0){if(this.isTransitioning)return;this.isTransitioning=!0,D.stopCamera();const i=C.getSession();if(!i||!i.photos||i.photos.length===0){this.isTransitioning=!1,this.goToWelcome(e);return}const t=new Gt({photos:i.photos,eventConfig:this.eventConfig,onRetakeSingle:o=>{this.goToCamera(o)},onRetakeAll:()=>{C.startNewSession(this.eventConfig),this.goToCamera(null)},onContinue:()=>{this.goToTemplate()}}),n=t.render();this._switchView(t,"REVIEW",e),this.appEl.appendChild(n)}goToTemplate(e=!0){if(this.isTransitioning)return;this.isTransitioning=!0;const i=C.getSession();if(!i||!i.photos||i.photos.length===0){this.isTransitioning=!1,this.goToWelcome(e);return}const t=new Qt({photos:i.photos,selectedTemplateId:i.selectedTemplateId||"signature",customization:i.customization,eventConfig:this.eventConfig,onTemplateSelected:o=>{C.setTemplate(o)},onCustomizationChanged:o=>{C.setCustomization(o)},onContinue:({blob:o,dataUrl:r})=>{C.setFinalResult(o,r),this.goToResult()},onBack:()=>{this.goToReview()}}),n=t.render();this._switchView(t,"TEMPLATE",e),this.appEl.appendChild(n)}async goToResult(e=!0){if(this.isTransitioning)return;this.isTransitioning=!0;const i=C.getSession();if(!i||!i.finalDataUrl){this.isTransitioning=!1,this.goToWelcome(e);return}const t=new ei({finalBlob:i.finalBlob,finalDataUrl:i.finalDataUrl,sessionId:i.sessionId,customization:i.customization,eventConfig:this.eventConfig,onNewSession:()=>{this.goToWelcome()}}),n=await t.render();this._switchView(t,"RESULT",e),this.appEl.appendChild(n)}async renderMobileViewer(e,i=""){const t=M(e),n=M(this.eventConfig.organization),o=M(this.eventConfig.eventName);let r=(i||"").trim();if(!r){const s=C.getSession();s&&s.finalDataUrl&&s.sessionId===e&&(r=s.finalDataUrl)}if(!r)try{const s=await _.getById(e);s&&(r=s.uploadedUrl||s.finalDataUrl)}catch{}if(r){this.appEl.innerHTML=`
        <div class="view-container view-enter" style="background: #0E0F12; color: #FFFFFF; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; padding: 28px 16px; text-align: center; min-height: 100vh; overflow-y: auto;">
          <div style="margin-bottom: 20px; width: 100%; max-width: 440px;">
            <img src="${this.eventConfig.logoHipmi}" alt="HIPMI" style="height: 52px; margin: 0 auto 10px; object-fit: contain;" />
            <h2 style="font-size: 20px; font-weight: 800; color: var(--color-accent); margin-bottom: 4px;">${n}</h2>
            <p style="font-size: 13px; color: #9E9EA7; margin-bottom: 8px;">${o}</p>
            <div style="display: inline-block; padding: 4px 14px; border-radius: 9999px; background: rgba(200,168,75,0.15); border: 1px solid rgba(200,168,75,0.3); font-size: 11px; color: #EAD79B; font-weight: 700; letter-spacing: 0.5px;">
              SESSION #${t}
            </div>
          </div>

          <!-- Hero Image Card -->
          <div style="max-width: 440px; width: 100%; border-radius: 12px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.6); margin-bottom: 20px; border: 1px solid rgba(255,255,255,0.15); background: #14161B;">
            <img src="${r}" alt="Photobooth Memory" style="width: 100%; height: auto; display: block;" id="mobile-photo-img" />
          </div>

          <!-- Mobile Action Buttons -->
          <div style="width: 100%; max-width: 440px; display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;">
            <a href="${r}" download="hipmi-photobooth-${t}.png" target="_blank" class="btn-primary btn-accent" id="btn-mobile-download" style="width: 100%; min-height: 52px; font-size: 15px; font-weight: 800; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; gap: 8px;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download Foto HD
            </a>

            <button type="button" class="btn-secondary" id="btn-mobile-share" style="width: 100%; min-height: 48px; font-size: 14px; font-weight: 700; color: #FFFFFF; border-color: rgba(255,255,255,0.25); display: inline-flex; align-items: center; justify-content: center; gap: 8px;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
              Bagikan / Simpan ke Galeri
            </button>
          </div>

          <!-- Tips Card -->
          <div style="max-width: 440px; width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 14px; margin-bottom: 24px; text-align: left;">
            <p style="font-size: 12px; color: #A0A0AA; line-height: 1.5; margin: 0;">
              💡 <strong>Tips iPhone / Android:</strong> Tekan dan tahan foto di atas, lalu pilih <em>"Simpan Gambar"</em> atau <em>"Save to Photos"</em> untuk langsung tersimpan di galeri kamera HP kamu.
            </p>
          </div>

          <a href="/" class="btn-secondary" style="background: transparent; color: #6E6E73; border-color: transparent; font-size: 13px; text-decoration: underline;">
            Masuk ke Booth Experience
          </a>
        </div>
      `;const s=this.appEl.querySelector("#btn-mobile-share");s&&s.addEventListener("click",async()=>{if(navigator.share)try{await navigator.share({title:`${this.eventConfig.organization} Photobooth`,text:`Kenangan foto saya di ${this.eventConfig.eventName}`,url:r})}catch{}else try{await navigator.clipboard.writeText(r),alert("Tautan foto berhasil disalin ke clipboard!")}catch{window.open(r,"_blank")}})}else this.appEl.innerHTML=`
        <div class="view-container view-enter" style="background: #0E0F12; color: #FFFFFF; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 32px 24px; text-align: center; min-height: 100vh;">
          <div style="margin-bottom: 24px;">
            <img src="${this.eventConfig.logoHipmi}" alt="HIPMI" style="height: 64px; margin: 0 auto 16px;" />
            <h2 style="font-size: 22px; font-weight: 800; color: var(--color-accent); margin-bottom: 6px;">${n}</h2>
            <div style="display: inline-block; padding: 4px 12px; border-radius: 9999px; background: rgba(200,168,75,0.15); border: 1px solid rgba(200,168,75,0.3); font-size: 12px; color: #EAD79B; font-weight: 700;">
              SESSION ${t}
            </div>
          </div>

          <div style="max-width: 420px; background: #14161B; border: 1px solid #242730; border-radius: 16px; padding: 28px 24px; margin-bottom: 28px; box-shadow: 0 16px 40px rgba(0,0,0,0.4);">
            <div style="width: 52px; height: 52px; border-radius: 50%; background: rgba(200,168,75,0.15); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; color: var(--color-accent);">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            </div>
            <h3 style="font-size: 17px; font-weight: 700; color: #FFFFFF; margin-bottom: 8px;">Event Station Photobooth</h3>
            <p style="font-size: 14px; color: #9E9EA7; line-height: 1.5;">
              Foto beresolusi tinggi kamu diproses di layar monitor booth. Silakan unduh langsung dari layar booth atau hubungi operator.
            </p>
          </div>

          <a href="/" class="btn-primary btn-accent" style="padding: 0 32px; font-size: 15px;">
            Masuk ke Booth Experience
          </a>
        </div>
      `}async runStressTestDashboard(e=50){this.appEl.innerHTML=`
      <div class="view-container view-enter" style="background: #090A0C; color: #FFFFFF; padding: 40px; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow-y: auto;">
        <div style="max-width: 680px; width: 100%; text-align: center;">
          <img src="${this.eventConfig.logoHipmi}" alt="HIPMI" style="height: 64px; margin: 0 auto 16px;" />
          <div style="display: inline-block; padding: 4px 12px; border-radius: 9999px; background: rgba(200,168,75,0.15); border: 1px solid rgba(200,168,75,0.4); color: var(--color-accent); font-size: 12px; font-weight: 800; margin-bottom: 12px; letter-spacing: 1px;">
            AUTOMATED QA STRESS TEST
          </div>
          <h1 style="font-size: 28px; font-weight: 900; margin-bottom: 8px;">Simulating ${e} Consecutive Sessions</h1>
          <p style="font-size: 14px; color: #8E8E93; margin-bottom: 28px;">Monitoring camera stream cleanup, object URL revocation, memory stability, and canvas rendering.</p>

          <div style="background: #14161B; border: 1px solid #242730; border-radius: 12px; padding: 24px; text-align: left; margin-bottom: 24px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 13px; font-weight: 700;">
              <span id="st-progress-text">Executing session 1 of ${e}...</span>
              <span id="st-pct-text">0%</span>
            </div>
            <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.1); border-radius: 9999px; overflow: hidden; margin-bottom: 20px;">
              <div id="st-progress-bar" style="width: 0%; height: 100%; background: var(--color-accent); transition: width 100ms ease;"></div>
            </div>

            <div id="st-terminal" style="height: 180px; overflow-y: auto; background: #000000; border-radius: 8px; padding: 12px; font-family: monospace; font-size: 12px; color: #34D399; line-height: 1.6;">
              <div>Starting session runner...</div>
            </div>
          </div>

          <div id="st-actions" style="display: none;">
            <button id="btn-st-enter" class="btn-primary btn-accent" style="width: 100%;">
              Enter Photobooth Experience
            </button>
          </div>
        </div>
      </div>
    `;const i=document.getElementById("st-progress-text"),t=document.getElementById("st-pct-text"),n=document.getElementById("st-progress-bar"),o=document.getElementById("st-terminal"),r=document.getElementById("st-actions"),s=document.getElementById("btn-st-enter"),a=c=>{const h=document.createElement("div");h.textContent=c,o.appendChild(h),o.scrollTop=o.scrollHeight},d=await ut(e,c=>{if(a(c),c.includes("passed")){const h=c.match(/Session (\d+)\/(\d+)/);if(h){const g=parseInt(h[1],10),u=parseInt(h[2],10),m=Math.round(g/u*100);i.textContent=`Completed ${g} of ${u} sessions`,t.textContent=`${m}%`,n.style.width=`${m}%`}}});d.failedSessions===0?(i.textContent=`✅ All ${e} sessions completed flawlessly!`,t.textContent="100%",n.style.width="100%",n.style.background="#10B981",r.style.display="block"):(i.textContent=`❌ Completed with ${d.failedSessions} failures`,n.style.background="#EF4444",r.style.display="block"),s.addEventListener("click",()=>{window.history.pushState({screen:"WELCOME"},"","/"),this.goToWelcome(!1)})}openOperatorSettings(){if(this.isOperatorModalOpen)return;this.isOperatorModalOpen=!0,new ti({eventConfig:this.eventConfig,onConfigUpdated:i=>{this.eventConfig=i,this.currentScreen==="WELCOME"&&this.goToWelcome(!1)},onOpenHistory:()=>this.openHistoryModal(),onClose:()=>{this.isOperatorModalOpen=!1}}).render().then(i=>{document.body.appendChild(i)}).catch(()=>{this.isOperatorModalOpen=!1})}openHistoryModal(){if(this.isHistoryModalOpen)return;this.isHistoryModalOpen=!0,new ni({eventConfig:this.eventConfig,onClose:()=>{this.isHistoryModalOpen=!1}}).render().then(i=>{document.body.appendChild(i)}).catch(i=>{console.warn("History modal error:",i),this.isHistoryModalOpen=!1})}showErrorModal(e,i,t){const o=new ii({type:e,onRetry:()=>{i&&i()},onUseVirtual:()=>{t&&t()},onHome:()=>{this.goToWelcome()}}).render();document.body.appendChild(o)}toggleFullscreen(){document.fullscreenElement?document.exitFullscreen&&document.exitFullscreen().catch(()=>{}):document.documentElement.requestFullscreen().catch(()=>{})}}window.addEventListener("DOMContentLoaded",()=>{const l=new oi;l.init(),window.__HIPMI_APP__=l,window.__runStressTest=ut});
