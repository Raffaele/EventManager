/**
 * Javascript Event Manager
 * version 1.0
 * 
 * Copyright 2014 Ing. Raffaele Morì
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at 
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and limitations
 * under the License.
 * 
 * Date: Thu Aug 14 21:45:00 2014 +0000
 * @Author Ing. Raffaele Morì
 */

function EventManager(){function n(e){var t={on:function(n,r,i){if(!e.eventList[n]){e.eventList[n]=[]}e.eventList[n].push({callback:r,context:i||e});return e},off:function(n,r){var i=e.eventList[n],s,o;if(i){if(!r){e.eventList[n]=[]}else{s=i.length;for(o=0;o<s;o++){if(i[o].callback==r){i.splice(o,1);break}}}}return e},trigger:function(n){var r=e.eventList[n],i,s,o,u;if(r){u=[].slice.call(arguments,1);i=r.length;for(s=0;s<i;s++){o=r[s];o.callback.apply(o.context,u)}}return e},eventList:{}};r(e,t)}function r(e,t){for(var n in t){t.hasOwnProperty(n)&&(e[n]=t[n])}}var e,t;if(this.constructor==arguments.callee){n(this)}else{t=arguments[0]||{};n(t);return t}}