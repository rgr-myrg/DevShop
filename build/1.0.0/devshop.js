/**
 * Copyright (c) 2011-2014 Activity, LLC.
 * Version: 1.0.0
 * Built: Thu Aug 07 2014 10:22:43 GMT-0400 (EDT)
 * Released under the MIT license:
 * https://github.com/rgr-myrg/DevShop-JS/raw/master/MIT-LICENSE
 */
(function(w){w.DevShop=w.DevShop||{};})(window);(function(b){b.Queue=function(a){var d=null,f=null,c=!1,e=function(){},b=300,g=[];if(typeof a!=="object"||!a.id)throw"Queue options Object is Null";d=a.id;if(!isNaN(a.timeToWait))b=a.timeToWait;if(typeof a.callback==="function")e=a.callback;return{add:function(){g.push(arguments)},start:function(){if(!c)try{f=setInterval(d+".run()",b)}catch(e){}},run:function(){if(g.length>0){c=!0;try{e.apply(this,g.shift())}catch(d){this.stop()}}else this.stop()},stop:function(){c=!1;clearInterval(f)},isRunning:function(){return c}}}})(DevShop);
(function(b){b.ObjectFactory=function(a){if(typeof a!=="object")throw"Object not provided";var d=function(c){if(typeof c==="function")try{return new c}catch(e){}else if(typeof c==="object")return c},f=d(a._implements_),c=d(a._extends_),a=d(a._public_),e;for(e in c)c.hasOwnProperty(e)&&!a[e]&&(a[e]=c[e]);for(e in f)if(f.hasOwnProperty(e)&&!a[e])throw object.instance+" must implement '"+e+"' "+typeof f[e];if(typeof a.init==="function")try{a.init()}catch(b){}return a}})(DevShop);
(function(b){b.Observable=function(a){return b.ObjectFactory({_extends_:function(){var d=[];return{addObserver:function(a){if((typeof a==="function"||typeof a==="object")&&typeof a.update==="function")if(d.push(a),typeof a.onRegister==="function")try{a.onRegister()}catch(c){}},notifyObservers:function(){for(var a=d.length,c=0;c<a;c++){var e=d[c];e.update.apply(e,arguments)}},getObservers:function(){return d}}},_public_:a})}})(DevShop);
(function(b){b.Observer=function(a){return b.ObjectFactory({_extends_:function(){return{update:function(a){if(typeof this[a.name]==="function")try{this[a.name](a.data)}catch(b){}}}},_public_:a})}})(DevShop);
(function(b){b.EventSignal=function(){var a=[];return{addListener:function(d){typeof d==="function"&&a.push(d)},removeListener:function(d){for(var b=a.length,c=0;c<b;c++)a[c]===d&&(a[c]=null)},dispatch:function(){for(var d=[],b=a.length,c=0;c<b;c++){var e=a[c];typeof e==="function"?e.apply(this,arguments):d.push(c)}b=d.length;for(c=0;c<b;c++)a.splice(c,1)}}}})(DevShop);
(function(b){b.Publisher=function(){var a={};return{registerEvents:function(d){typeof d==="object"&&(a=d)},registerSubscriber:function(d){if(typeof d.onRegister==="function"){var b=d.onRegister(),c;for(c in b)b.hasOwnProperty(c)&&typeof b[c]==="function"&&typeof a[c]==="object"&&typeof a[c].addListener==="function"&&a[c].addListener(b[c]);d.onRegister=function(){}}},notify:function(a,b){typeof a.dispatch==="function"&&a.dispatch(b)}}}})(DevShop);
(function(b){b.MVCObservable=function(a){return b.ObjectFactory({_extends_:function(){return{observers:[],addObserver:function(a){if((typeof a==="function"||typeof a==="object")&&typeof a.notify==="function")if(this.observers.push(a),typeof a.onRegister==="function")a.onRegister()},notifyObservers:function(a){for(var b=this.observers.length,c=0;c<b;c++)this.observers[c].notify(a,this)}}},_public_:a})};b.MVCObserver=function(a){return b.ObjectFactory({_extends_:function(){return{onRegister:function(){},
notify:function(a,b){this.observable=b;if(typeof this[a]==="function")try{this[a]()}catch(c){}}}},_public_:a})};b.IProxy={NAME:""};b.IMediator={NAME:"",listNotificationInterests:function(){},handleNotification:function(){}};b.ICommand={execute:function(){}};b.Proxy=function(){var a={};return{facade:null,setData:function(b){a=b},getData:function(){return a},onRegister:function(){},onRemove:function(){}}};b.Mediator=b.MVCObserver(function(){return{facade:null,onRegister:function(){},onRemove:function(){}}});
b.Facade=function(){var a=function(){var c={};return{facade:{},registerProxy:function(a){a.facade=this.facade;c[a.NAME]||(c[a.NAME]=a);if(typeof a.onRegister==="function")a.onRegister()},retrieveProxy:function(a){return c[a]?c[a]:null},removeProxy:function(a){if(typeof c[a].onRemove==="function")c[a].onRemove();c[a]=null}}}(),d=b.MVCObservable(function(){var a={};return{facade:{},notification:{},registerMediator:function(b){b.facade=this.facade;a[b.NAME]||(a[b.NAME]=b,this.addObserver(b))},retrieveMediator:function(b){return a[b]?
a[b]:null},removeMediator:function(b){if(typeof a[b].onRemove==="function")a[b].onRemove();a[b]=null},notifyObservers:function(a){for(var c=this.observers.length,b=0;b<c;b++){for(var d=this.observers[b].listNotificationInterests(),f=!1,h=0,i=d.length;h<i;h++)if(d[h]==this.notification.name){f=!0;break}if(f)this.observers[b].notification=this.notification,this.observers[b].notify(a,this)}},sendNotification:function(a){this.notification=a;this.notifyObservers("handleNotification")}}}),f=new b.MVCObserver(function(){var a=
{},b=[];return{facade:{},NAME:"BTG.Controller",registerCommand:function(d,f){f.facade=this.facade;a[d]||(a[d]=f,b.push(d))},listNotificationInterests:function(){return b},handleNotification:function(){var b=this.notification;typeof a[b.name]==="object"&&typeof a[b.name].execute==="function"&&a[b.name].execute(b)}}});return{CMD_STARTUP:"CMD_STARTUP",registerProxy:function(b){a.registerProxy(b)},registerMediator:function(a){d.registerMediator(a)},registerCommand:function(a,b){f.registerCommand(a,b)},
retrieveProxy:function(b){return a.retrieveProxy(b)},retrieveMediator:function(a){return d.retrieveMediator(a)},removeProxy:function(b){a.removeProxy(b)},removeMediator:function(a){d.removeMediator(a)},sendNotification:function(a,b,f){d.sendNotification({name:a,body:b,type:f})},initializeFacade:function(){a.facade=this;d.facade=this;f.facade=this;this.registerMediator(f)}}}})(DevShop);
