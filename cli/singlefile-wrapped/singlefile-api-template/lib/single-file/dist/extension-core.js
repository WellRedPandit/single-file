!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).extension={})}(this,(function(e){"use strict";let t,r;const a=["lib/single-file/dist/chrome-browser-polyfill.js","dist/single-file.js"],n=["dist/chrome-browser-polyfill.js","dist/single-file-frames.js"];async function s(e,s){let o;if(await async function(e){const s=e.extensionScriptFiles||[];t||r||([t,r]=await Promise.all([i(a.concat(s)),i(n)]))}(s),!s.removeFrames)try{await browser.tabs.executeScript(e,{code:r,allFrames:!0,matchAboutBlank:!0,runAt:"document_start"})}catch(e){}try{await browser.tabs.executeScript(e,{code:t,allFrames:!1,runAt:"document_idle"}),o=!0}catch(e){}return o&&s.frameId&&await browser.tabs.executeScript(e,{code:"document.documentElement.dataset.requestedFrameId = true",frameId:s.frameId,matchAboutBlank:!0,runAt:"document_start"}),o}async function i(e){const t=e.map((async e=>{if("function"==typeof e)return"("+e.toString()+")();";{const t=await fetch(browser.runtime.getURL("../../../"+e));return(new TextDecoder).decode(await t.arrayBuffer())}}));let r="";for(const e of t)r+=await e;return r}const o="single-file-response-fetch",c="text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",f=window.fetch;async function u(e,t={}){try{let t=await f(e,{cache:"force-cache",headers:new Headers({accept:c})});return 401!=t.status&&403!=t.status&&404!=t.status||(t=await w(e)),t}catch(r){const a=await l({method:"singlefile.fetch",url:e,referrer:t.referrer});return{status:a.status,headers:{get:e=>a.headers&&a.headers[e]},arrayBuffer:async()=>new Uint8Array(a.array).buffer}}}async function d(e,t){const r=await l({method:"singlefile.fetchFrame",url:e,frameId:t.frameId,referrer:t.referrer});return{status:r.status,headers:new Map(r.headers),arrayBuffer:async()=>new Uint8Array(r.array).buffer}}async function l(e){const t=await browser.runtime.sendMessage(e);if(!t||t.error)throw new Error(t&&t.error&&t.error.toString());return t}function w(e){return new Promise(((t,r)=>{var a,n,s,i;a=new CustomEvent("single-file-request-fetch",{detail:e}),window.dispatchEvent(a),n=o,s=function a(n){var s,i,c;n.detail?n.detail.url==e&&(s=o,i=a,c=!1,window.removeEventListener(s,i,c),n.detail.response?t({status:n.detail.status,headers:new Map(n.detail.headers),arrayBuffer:async()=>n.detail.response}):r(n.detail.error)):r()},i=!1,window.addEventListener(n,s,i)}))}browser.runtime.onMessage.addListener((e=>{if("singlefile.fetchFrame"==e.method&&window.frameId&&window.frameId==e.frameId)return async function(e){try{let t=await f(e.url,{cache:"force-cache",headers:{accept:c}});return 401!=t.status&&403!=t.status&&404!=t.status||(t=await Promise.race([w(e.url),new Promise(((e,t)=>setTimeout((()=>t()),5e3)))])),{status:t.status,headers:[...t.headers],array:Array.from(new Uint8Array(await t.arrayBuffer()))}}catch(e){return{error:e&&e.toString()}}}(e)})),e.getPageData=function(e,t,r,a={fetch:u,frameFetch:d}){return window.singlefile.getPageData(e,a,t,r)},e.injectScript=function(e,t){return s(e,t)},Object.defineProperty(e,"__esModule",{value:!0})}));
