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

(function () {
  function EventManager () {
    var eventManagerPrototype,
      genericContext,
      ngEventManager;

    function appendEventListener (mainObj, eventName, callbackFn, context, unique) {
      if (!mainObj.eventList[eventName]) {
          mainObj.eventList[eventName] = [];
        }
        mainObj.eventList[eventName].push({
          callback: callbackFn, 
          context: context || mainObj,
          unique: unique
        });

        return mainObj;
    }

    function getManagerPrototype (mainObj) {

      var prototype = {
        on: function on (eventName, callbackFn, context) {
          return appendEventListener (mainObj, eventName, callbackFn, context, false);
        },
        once: function once (eventName, callbackFn, context) {
          return appendEventListener (mainObj, eventName, callbackFn, context, true);
        },
        off: function off (eventName, callbackFn) {
          var listenerList = mainObj.eventList[eventName],
            listenerLength,
            listenerIndex;

          if (listenerList) {
            if (!callbackFn) {
              mainObj.eventList[eventName] = [];
            } else {
              listenerLength = listenerList.length;
              for (listenerIndex = 0; listenerIndex < listenerLength; listenerIndex++) {
                if (listenerList[listenerIndex].callback == callbackFn) {
                  listenerList.splice(listenerIndex, 1);
                  break;
                }
              }
            }
          }

          return mainObj;
        },
        trigger: function trigger (eventName) {
          var listenerList = mainObj.eventList[eventName],
            listenerLength,
            listenerIndex,
            eventObj,
            purgedArgumentList,
            deleteIndexList = [],
            deleterIndex;

          if (listenerList) {
            purgedArgumentList = [].slice.call(arguments, 1);
            listenerLength = listenerList.length;
            for (listenerIndex = 0; listenerIndex < listenerLength; listenerIndex++) {
              eventObj = listenerList[listenerIndex];
              eventObj.callback.apply(eventObj.context, purgedArgumentList);
              eventObj.unique && (deleteIndexList.push(listenerIndex));
            }

            for (deleterIndex = deleteIndexList.length - 1; deleterIndex >= 0; deleterIndex--) {
              listenerList.splice(deleteIndexList[deleterIndex], 1);
            }
          }

          return mainObj;
        },
        eventList: {}
      };

      cloneAttributes (mainObj, prototype);
    }

    function cloneAttributes (destination, source) {
      for (var key in source) {
         (source.hasOwnProperty(key)) &&
              (destination[key] = source[key]);
      }
    }


    if (this.constructor == arguments.callee) {
      getManagerPrototype(this);
    } else {
      genericContext = arguments[0] || {};
      getManagerPrototype(genericContext);
      return genericContext;
    }
  }


  if (typeof(angular)!='undefined' && angular.module) { // Angular module
    ngEventManager = angular.module('EventManager', []);
    ngEventManager.service('EventManager', function () {
      return EventManager;
    });
  } else { // Native js module
    window.EventManager = EventManager;
  }
} ());