import{r as e}from"./react-c64dbe91.js";import{c as l}from"./history-6218fa6a.js";import{R as u}from"./react-router-e4f3dcd9.js";/**
 * React Router DOM v6.0.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function y(a){let{basename:n,children:i,window:c}=a,r=e.useRef();r.current==null&&(r.current=l({window:c}));let t=r.current,[o,s]=e.useState({action:t.action,location:t.location});return e.useLayoutEffect(()=>t.listen(s),[t]),e.createElement(u,{basename:n,children:i,location:o.location,navigationType:o.action,navigator:t})}export{y as B};
