import{r as w}from"./react-c64dbe91.js";var S={},g={get exports(){return S},set exports(e){S=e}},$={};/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var f=w;function j(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var O=typeof Object.is=="function"?Object.is:j,_=f.useState,k=f.useEffect,q=f.useLayoutEffect,D=f.useDebugValue;function L(e,t){var r=t(),i=_({inst:{value:r,getSnapshot:t}}),n=i[0].inst,u=i[1];return q(function(){n.value=r,n.getSnapshot=t,d(n)&&u({inst:n})},[e,r,t]),k(function(){return d(n)&&u({inst:n}),e(function(){d(n)&&u({inst:n})})},[e]),D(r),r}function d(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!O(e,r)}catch{return!0}}function M(e,t){return t()}var R=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?M:L;$.useSyncExternalStore=f.useSyncExternalStore!==void 0?f.useSyncExternalStore:R;(function(e){e.exports=$})(g);var E={},W={get exports(){return E},set exports(e){E=e}},V={};/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var v=w,z=S;function A(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var B=typeof Object.is=="function"?Object.is:A,C=z.useSyncExternalStore,F=v.useRef,G=v.useEffect,H=v.useMemo,I=v.useDebugValue;V.useSyncExternalStoreWithSelector=function(e,t,r,i,n){var u=F(null);if(u.current===null){var c={hasValue:!1,value:null};u.current=c}else c=u.current;u=H(function(){function h(o){if(!x){if(x=!0,p=o,o=i(o),n!==void 0&&c.hasValue){var s=c.value;if(n(s,o))return l=s}return l=o}if(s=l,B(p,o))return s;var y=i(o);return n!==void 0&&n(s,y)?s:(p=o,l=y)}var x=!1,p,l,m=r===void 0?null:r;return[function(){return h(t())},m===null?void 0:function(){return h(m())}]},[t,r,i,n]);var a=C(e,u[0],u[1]);return G(function(){c.hasValue=!0,c.value=a},[a]),I(a),a};(function(e){e.exports=V})(W);export{S as s};
