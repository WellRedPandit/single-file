!function(){"use strict";const e=globalThis.singlefileBootstrap,t=33554432;let o,n,s,a,r,i,d;async function c(t){return s&&"content.autosave"==t.method?(async function(e){n=e.options,"complete"!=document.readyState&&await new Promise((e=>globalThis.addEventListener("load",e)));await u(),n.autoSaveRepeat&&setTimeout((()=>{s&&!r&&(i=!1,n.autoSaveDelay=0,c(e))}),1e3*n.autoSaveRepeatDelay)}(t),{}):"content.maybeInit"==t.method?(l(),{}):"content.init"==t.method?(n=t.options,s=t.autoSaveEnabled,m(),{}):"content.openEditor"==t.method?(g(document)?f(document):m(),{}):"devtools.resourceCommitted"==t.method?(e.pageInfo.updatedResources[t.url]={content:t.content,type:t.type,encoding:t.encoding},{}):"common.promptValueRequest"==t.method?(browser.runtime.sendMessage({method:"tabs.promptValueResponse",value:prompt("SingleFile: "+t.promptMessage)}),{}):void 0}function l(){d==location.href||e.pageInfo.processing||(i=!1,d=location.href,browser.runtime.sendMessage({method:"tabs.init",savedPageDetected:g(document)}),browser.runtime.sendMessage({method:"ui.processInit"}))}async function u(){const t=e.helper;if((!r||a)&&!i)if(r=!0,n.autoSaveDelay&&!a)await new Promise((e=>a=setTimeout(e,1e3*n.autoSaveDelay))),await u();else{const o=window._singleFile_waitForUserScript;let s,d=[];a=null,!n.removeFrames&&globalThis.frames&&globalThis.frames.length&&(d=await e.processors.frameTree.getAsync(n)),s=d&&d.sessionId,n.userScriptEnabled&&o&&await o(t.ON_BEFORE_CAPTURE_EVENT_NAME);const c=t.preProcessDoc(document,globalThis,n);h(c,d),s&&e.processors.frameTree.cleanup(s),t.postProcessDoc(document,c.markedElements),n.userScriptEnabled&&o&&await o(t.ON_AFTER_CAPTURE_EVENT_NAME),i=!0,r=!1}}function m(){s&&n&&(n.autoSaveUnload||n.autoSaveLoadOrUnload)?o||(globalThis.addEventListener("unload",p),o=!0):(globalThis.removeEventListener("unload",p),o=!1)}function p(){const t=e.helper;if(!i||n.autoSaveUnload){const o=window._singleFile_waitForUserScript;let s=[];!n.removeFrames&&globalThis.frames&&globalThis.frames.length&&(s=e.processors.frameTree.getSync(n)),n.userScriptEnabled&&o&&o(t.ON_BEFORE_CAPTURE_EVENT_NAME);h(t.preProcessDoc(document,globalThis,n),s)}}function h(t,o){const s=e.helper,a=e.pageInfo.updatedResources,r=e.pageInfo.visitDate.getTime();Object.keys(a).forEach((e=>a[e].retrieved=!1)),browser.runtime.sendMessage({method:"autosave.save",taskId:n.taskId,content:s.serialize(document),canvases:t.canvases,fonts:t.fonts,stylesheets:t.stylesheets,images:t.images,posters:t.posters,usedFonts:t.usedFonts,shadowRoots:t.shadowRoots,imports:t.imports,referrer:t.referrer,frames:o,url:location.href,updatedResources:a,visitDate:r})}async function f(o){const n=o.querySelector("singlefile-infobar");n&&n.remove(),E(o);const s=e.helper.serialize(o);for(let e=0;e*t<s.length;e++){const o={method:"editor.open",filename:decodeURIComponent(location.href.match(/^.*\/(.*)$/)[1])};o.truncated=s.length>t,o.truncated?(o.finished=(e+1)*t>s.length,o.content=s.substring(e*t,(e+1)*t)):o.content=s,await browser.runtime.sendMessage(o)}}function g(t){const o=e.helper,n=t.documentElement.firstChild;return n.nodeType==Node.COMMENT_NODE&&(n.textContent.includes(o.COMMENT_HEADER)||n.textContent.includes(o.COMMENT_HEADER_LEGACY))}function E(t){t.querySelectorAll("*").forEach((t=>{const o=e.helper.getShadowRoot(t);if(o){E(o);const e=document.createElement("template");e.setAttribute("shadowmode","open"),e.appendChild(o),t.appendChild(e)}}))}e.pageInfo={updatedResources:{},visitDate:new Date},browser.runtime.sendMessage({method:"autosave.init"}).then((e=>{n=e.options,s=e.autoSaveEnabled,n&&n.autoOpenEditor&&g(document)?"loading"==document.readyState?document.addEventListener("DOMContentLoaded",(()=>f(document))):f(document):m()})),browser.runtime.onMessage.addListener((e=>{if(s&&"content.autosave"==e.method||"content.maybeInit"==e.method||"content.init"==e.method||"content.openEditor"==e.method||"devtools.resourceCommitted"==e.method||"common.promptValueRequest"==e.method)return c(e)})),document.addEventListener("DOMContentLoaded",l,!1)}();
