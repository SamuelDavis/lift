function t(){}function n(t){return t()}function e(){return Object.create(null)}function o(t){t.forEach(n)}function r(t){return"function"==typeof t}function s(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function c(n,e,o){n.$$.on_destroy.push(function(n,...e){if(null==n)return t;const o=n.subscribe(...e);return o.unsubscribe?()=>o.unsubscribe():o}(e,o))}function u(t,n,e){return t.set(e),n}function a(t,n){t.appendChild(n)}function i(t,n,e){t.insertBefore(n,e||null)}function f(t){t.parentNode.removeChild(t)}function l(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function d(t){return document.createElement(t)}function h(t){return document.createTextNode(t)}function p(){return h(" ")}function $(t,n,e,o){return t.addEventListener(n,e,o),()=>t.removeEventListener(n,e,o)}function g(t){return function(n){return n.preventDefault(),t.call(this,n)}}function m(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function b(t){return""===t?null:+t}function y(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}function _(t,n){t.value=null==n?"":n}let k;function x(t){k=t}function v(){if(!k)throw new Error("Function called outside component initialization");return k}function E(t){v().$$.on_mount.push(t)}function w(t){v().$$.on_destroy.push(t)}function S(){const t=v();return(n,e)=>{const o=t.$$.callbacks[n];if(o){const r=function(t,n,e=!1){const o=document.createEvent("CustomEvent");return o.initCustomEvent(t,e,!1,n),o}(n,e);o.slice().forEach((n=>{n.call(t,r)}))}}}const A=[],C=[],j=[],z=[],M=Promise.resolve();let N=!1;function O(t){j.push(t)}let q=!1;const B=new Set;function D(){if(!q){q=!0;do{for(let t=0;t<A.length;t+=1){const n=A[t];x(n),F(n.$$)}for(x(null),A.length=0;C.length;)C.pop()();for(let t=0;t<j.length;t+=1){const n=j[t];B.has(n)||(B.add(n),n())}j.length=0}while(A.length);for(;z.length;)z.pop()();N=!1,q=!1,B.clear()}}function F(t){if(null!==t.fragment){t.update(),o(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(O)}}const L=new Set;let T;function G(){T={r:0,c:[],p:T}}function P(){T.r||o(T.c),T=T.p}function H(t,n){t&&t.i&&(L.delete(t),t.i(n))}function I(t,n,e,o){if(t&&t.o){if(L.has(t))return;L.add(t),T.c.push((()=>{L.delete(t),o&&(e&&t.d(1),o())})),t.o(n)}}function J(t,n){t.d(1),n.delete(t.key)}function K(t,n,e,o,r,s,c,u,a,i,f,l){let d=t.length,h=s.length,p=d;const $={};for(;p--;)$[t[p].key]=p;const g=[],m=new Map,b=new Map;for(p=h;p--;){const t=l(r,s,p),u=e(t);let a=c.get(u);a?o&&a.p(t,n):(a=i(u,t),a.c()),m.set(u,g[p]=a),u in $&&b.set(u,Math.abs(p-$[u]))}const y=new Set,_=new Set;function k(t){H(t,1),t.m(u,f),c.set(t.key,t),f=t.first,h--}for(;d&&h;){const n=g[h-1],e=t[d-1],o=n.key,r=e.key;n===e?(f=n.first,d--,h--):m.has(r)?!c.has(o)||y.has(o)?k(n):_.has(r)?d--:b.get(o)>b.get(r)?(_.add(o),k(n)):(y.add(r),d--):(a(e,c),d--)}for(;d--;){const n=t[d];m.has(n.key)||a(n,c)}for(;h;)k(g[h-1]);return g}function Q(t){t&&t.c()}function R(t,e,s,c){const{fragment:u,on_mount:a,on_destroy:i,after_update:f}=t.$$;u&&u.m(e,s),c||O((()=>{const e=a.map(n).filter(r);i?i.push(...e):o(e),t.$$.on_mount=[]})),f.forEach(O)}function U(t,n){const e=t.$$;null!==e.fragment&&(o(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function V(t,n){-1===t.$$.dirty[0]&&(A.push(t),N||(N=!0,M.then(D)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function W(n,r,s,c,u,a,i,l=[-1]){const d=k;x(n);const h=n.$$={fragment:null,ctx:null,props:a,update:t,not_equal:u,bound:e(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(d?d.$$.context:r.context||[]),callbacks:e(),dirty:l,skip_bound:!1,root:r.target||d.$$.root};i&&i(h.root);let p=!1;if(h.ctx=s?s(n,r.props||{},((t,e,...o)=>{const r=o.length?o[0]:e;return h.ctx&&u(h.ctx[t],h.ctx[t]=r)&&(!h.skip_bound&&h.bound[t]&&h.bound[t](r),p&&V(n,t)),e})):[],h.update(),p=!0,o(h.before_update),h.fragment=!!c&&c(h.ctx),r.target){if(r.hydrate){const t=($=r.target,Array.from($.childNodes));h.fragment&&h.fragment.l(t),t.forEach(f)}else h.fragment&&h.fragment.c();r.intro&&H(n.$$.fragment),R(n,r.target,r.anchor,r.customElement),D()}var $;x(d)}class X{$destroy(){U(this,1),this.$destroy=t}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(t){var n;this.$$set&&(n=t,0!==Object.keys(n).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const Y=[];function Z(n,e=t){let o;const r=new Set;function c(t){if(s(n,t)&&(n=t,o)){const t=!Y.length;for(const e of r)e[1](),Y.push(e,n);if(t){for(let t=0;t<Y.length;t+=2)Y[t][0](Y[t+1]);Y.length=0}}}return{set:c,update:function(t){c(t(n))},subscribe:function(s,u=t){const a=[s,u];return r.add(a),1===r.size&&(o=e(c)||t),s(n),()=>{r.delete(a),0===r.size&&(o(),o=null)}}}}export{I as A,P as B,H as C,G as D,Q as E,R as F,U as G,X as S,p as a,m as b,i as c,a as d,d as e,_ as f,f as g,b as h,W as i,y as j,l as k,$ as l,c as m,t as n,E as o,g as p,w as q,o as r,s,h as t,S as u,u as v,Z as w,r as x,K as y,J as z};