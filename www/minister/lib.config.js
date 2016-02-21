'use strict';
//============================================================================//
// CONFIGURATION
//============================================================================//

function configuration(){}
configuration.prototype.config=function(){
    var site,api;
    var dt      = new Date().getTime();
    var caecus  = {};//hiden configfile
		var debug   = window.location.hostname==='localhost'? true: false;
    var site    = {
        api:        'http://localhost:9999/api/v1/',
        dbName:     'lexar',
        dbDesc:     'Select your camera card',
        dbVersion:  1,
        debug:      debug,
        enc:        "dev",
        formatDate: 'fullDate',
        formatTime: 'mediumTime',
        mailAdmin:  'tshimanga@gmail.com',
        mailInfo:   'tshimanga@gmail.com',
        port:       window.location.port,
        run:        dt,
        slogan:     "Digital master piece",
        start:      dt,
        title:      "Lexar mobile application",
        url:        window.location.origin+'/#/'
    };
    site.json = site.api + 'json/schema.json';
    dynamis.set('site',site);
    if(!dynamis.get('vitae')) dynamis.set('vitae',{});

    api = {
        "chromeApp":      (typeof chrome !== "undefined" && chrome.app && typeof chrome.app.window!=="undefined"),
        "deleteWorker":   false,
        "formValidation": hasFormValidation(),
        "indexedDB":      "indexedDB" in window||"webkitIndexedDB" in window||"mozIndexedDB" in window||"msIndexedDB" in window,
        "history":        typeof window.history!=="undefined",
        "isOnline":       navigator.onLine,
        "jsValidation":   true,
        "openDatabase":   typeof openDatabase!=="undefined"||"openDatabase" in window,
        "projectID":      "17238315752",
        "WebSocket":      typeof window.WebSocket!=="undefined",
        "Worker":         typeof window.Worker!=="undefined"
    };
    api.Worker = (1)? api.Worker: false;//disable worker
		api.Worker = (myPlatform.isMobile)? false: api.Worker;
    dynamis.set('api',api);

    dynamis.set("pattern",{
        "username":["^[A-Za-z0-9_]{6,15}$","requires at least six alpha-numerique character"],
        "pass1":["((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,20})","requires upperCase, lowerCase, number and a minimum of 6 chars"],
        "pass2":["^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$","requires upperCase, lowerCase, number and a minimum of 6 chars"],
        "password":["(?=^.{6,}$)((?=.*[0-9])|(?=.*[^A-Za-z0-9]+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$","requires upperCase, lowerCase, number and a minimum of 6 chars"],
        "pass3":["^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$","requires upperCase, lowerCase, number and a minimum of 6 chars"],
        "fullDate":["(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))","follow the following date format (YYYY-MM-DD)"],
        "phone":["[\(]?[0-9]{3}[\)]?[\-|\ ]?[0-9]{3}[\-|\ ]?[0-9]{4}","follow the format of 011-222-3333"],
        "minMax":["[a-zA-Z0-9]{4,8}","requires at least four to eight character"],
        "number":["[-+]?[0-9]*[.,]?[0-9]+","requires a numberic value"],
        "url":["^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$","requires a valid URL"],
        "colour":["^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$","requires a valid colour in the form of (#ccc or #cccccc)"],
        "bool":["^1|0","requires a boolean value of 0 or 1"],
        "email":["^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$","the email address is not the right formated"],
        "single":["^[a-zA-Z0-9]","requires a single value"]});
    return this;
};
//=============================================================================//
/*
 * @cons:the representation of the console.log
 * @stack:the stack used to display the line number
 * @obj: an array of object are passed and consoled for each
 * @info:permanent,preferably a single line of formated colour text
 * @msg: displays a message on the interphase
 * @deb: the debbuger for all viriables
 * @sync:ajax obj call with the parms {method,format,url,var}
 */
var sky = {
    view: true,
    /**
     * used for system that do not support console to have multiple arguments
     */
    cmd:  function(){
        var l=arguments.length;
        for(var x=0;x<l;x++){
            if(typeof arguments[x]==="function") console.log(encodeURI(arguments[x].toString()));
            else if(typeof arguments[x]==="undefined"||arguments[x]===null){ console.log("<null>");}
            else if (typeof arguments[x]==="object") {for (var index in arguments[x]) console.log(index+'='+arguments[x][index]);}
            else console.log(arguments[x]);
        }
    },
    cons: console.log,
    dir : console.dir,
    /**
     * two arg can be passed a string @msg and an @object
     */
    err: function(){
        arguments[arguments.length++]=this.stack();

        console.warn('%c'+arguments[0]+' '+arguments[arguments.length-1],'background:#ff0000;color:#ececec;width:100%;display:block;font-weight:bold;');
        if(arguments.length>2)console.dir(arguments[1]);
    },
    error: function(){
        this.err.apply(this, arguments);
    },

    /**
     * one to three argument can be passed. string @msg, @color, @object
     */
    info: function(){//display information with a color set on argument [1]
        var a=arguments,len = a.length++;
        a[len]=this.stack();
        var col= (typeof a[1]==='string' && isset(a[1]) && a.length>2 )? a[1]:'black';
        var color;//must be a string, not an obj and more than 2 args
        color = 'background:'+col+';color:#efefef;width:100%;display:block;font-weight:bold;';

        console.info('%c'+a[0]+" "+a[len],color);
        if(typeof a[1]!=='string' && a.length>2)console.dir(a[1]);
        else if(typeof a[2]!=='string' && a.length>2)console.dir(a[2]);
    },
    jsonp: function(url, callback){
        var callbackName= 'jsonp_callback_' + Math.round(100000 * Math.random());
        var script      = document.createElement('script');

        window[callbackName] = function(data) {
            delete window[callbackName];
            document.body.removeChild(script);
            callback(data);
        };

        script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
        document.body.appendChild(script);
    },
    /**
     * display on the notification board
     * @param msg, the string to display
     * @param permanent, if the message is to display permanently
     * @param clss, the class to add, usually a sucess or error class
     * @returns {boolean}
     */
    msg:  function(msg,permanent,clss){
        if(!msg) return;
        this.info(msg);
        clss = (!isset(clss)||clss===true)? "balanced": (clss===false||clss===0)? "assertive": clss;
        clss = (permanent!==true)? clss+" blink_me": clss;
        var notification = _$("#notification");
        var $scopeLayout = notification.scope();

        if(permanent!==true){
            setTimeout(
                function(){
                    if($scopeLayout) $scopeLayout.$apply(function(){$scopeLayout.msg = false;});
                    else notification.html("").removeClass('blink_me');
                },3000);
        }

        if(!$scopeLayout)_$("#notification").html(msg).removeClass().addClass(clss);
        else $scopeLayout.msg = {"text":msg,"clss":clss};
    },
    /**
     * the default messaging, display differently on mobile to desktop
     */
    on:  function(){
        if(this.view===false) return;
        if(!myPlatform.isMobile || true){
            if(arguments.length>1){
                arguments[arguments.length++]=this.stack();
                arguments[arguments.length++]=new Date().getTime();
                this.cons.apply(console,arguments);
            } else this.dir.apply(console,arguments);
        } else {
            var arg;
            arguments[arguments.length++]=this.stack();
            this.cmd.apply(null,arguments);
        }
    },
    off:  function(){ var x=1;},
    REST: function(url, options){
      var settings;
      var myHeaders = {};
      var myRequest;
      var myResponse;
      var defaults  = {"format":"json", "url":"", withCredentials:'include', headers: {"Accept":"application/json","Content-Type":"application/json;charset=UTF-8"}, mode:'cors', params:{}};//mode: no-cors||same-orign
      var fetch      = {
          ajax:     ajax,
          headers:  myHeaders,// append, delete, get, getAll, has, set
          request:  myRequest, // {properties:method, url, headers, context, referrer, mode, credentials, cache, bodyUsed} {methods: clone, arrayBuffer, blob, formData, json, text}
          response: myResponse // {properties: type, url, useFinalURL, status, ok, statusText, headers, bodyUsed} {methods: clone, error, redirect, arrayBuffer, blob, formData, json, text}
      };
      begin();

      function begin(){
        settings  = merge(defaults, options);
        setup(null, "GET");
      }

      function ajax(url, query, data){
        sky.off("REQUEST",myRequest);
        //@todo: add body type
        return window.fetch(myRequest).then(checkStatus);

        function checkStatus(response){ console.log("INSIDE", response);
          if (response.status >= 200 && response.status < 300) {
            return response
          } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
          }
        }
      }//end ajax

      function setup(options, method, query, body, params) {
        var uri;
        body = body? JSON.stringify(body): null;

        //Setup PARAMS
        settings.params = params||settings.params;
        uri             = url.replace(/:([a-z0-9]+)/ig, function(a, b){return settings.params[b]? settings.params[b]: "";} );
        if(settings.query) query = settings.query;

        options = options||{};
        options = merge(options, {"method":method, "url":uri, "body": body});

        settings.method = method;
        settings        = (options)? merge(settings, options): settings;

        if(settings.headers){
          myHeaders       = new Headers();
          for(var head in settings.headers){
            myHeaders.set(head, settings.headers[head]);
          }
        }
        //setup Query
        if (query) uri += objToQString(query);

        var opt   = (myRequest && settings.prev)? options: {"headers": myHeaders, "method": settings.method, "url": uri, "credentials": settings.withCredentials, "mode": settings.mode, "body": body};//cache, bodyUsed, referrer, context
        var req   = (myRequest && settings.prev)? myRequest: uri;
        myRequest = new Request(req, opt);
      }

      return {
        "get":    function(query, options)        { setup(options,"GET",query);      return fetch.ajax();},
        "post":   function(params, data, options) { setup(options,"POST",null,data,params);return fetch.ajax();},
        "put":    function(params, data, options) { setup(options,"PUT",null,data,params); return fetch.ajax();},
        "delete": function(params, options)       { setup(options,"DELETE",null,null,params);   return fetch.ajax();}
      };
    },
    /**
     * {method,format,url,params,callback}
     */
    xhr: function(url){//settings: {url, withCredentials, format, method, params, callback} arguments:(url,data, callback, options)
      var settings  = {};
      var csrf      = document.querySelector('meta[name="csrf-token"]');
      var headers   = {"Content-Type":"application/json;charset=UTF-8","Accept":"application/json"};//text/html,application/xhtml+xml,application/xml;application/json;q=0.9,*/*;q=0.8
      var defaults  = {"method":"GET", "format":"json", "url":"", withCredentials:true,"headers":headers};//'application/x-www-form-urlencoded'
      var xhr       = new XMLHttpRequest();
      var params;

      if(arguments.length ===1 && typeof arguments[0] ==="object") settings = arguments[1];
      if(arguments.length>1 && typeof arguments[1]==="object" && arguments[1] !==null && (arguments[1].hasOwnProperty('headers') || arguments[1].hasOwnProperty('format') || arguments[1].hasOwnProperty('params') || arguments[1].hasOwnProperty('Accept') || arguments[1].hasOwnProperty('method')) ) settings = arguments[1];
      if(arguments.length>2 && typeof arguments[2]==="object") settings = arguments[2];
      if(arguments.length>3 && typeof arguments[3]==="object") settings = arguments[3];

      if(arguments.length>1 && typeof arguments[1]==="object" && arguments[1]!==null && (!arguments[1].hasOwnProperty('headers') && !arguments[1].hasOwnProperty('format') && !arguments[1].hasOwnProperty('params') && !arguments[1].hasOwnProperty('Accept') && !arguments[1].hasOwnProperty('method') )) settings.params = arguments[1];
      if(arguments.length>1 && typeof arguments[1]==="function") settings.callback = arguments[1];
      if(arguments.length>2 && typeof arguments[2]==="function") settings.callback = arguments[2];
      if(arguments.length>3 && typeof arguments[3]==="function") settings.callback = arguments[3];


      if (typeof url === "string") settings.url = url;
      if(csrf) defaults.headers['X-CSRF-TOKEN'] = csrf.content;
      settings = mergeDeep(settings, defaults);

      sky.off("SETTINGS",settings);
      if(settings.params && typeof settings.params==="object"){
          params=JSON.stringify(settings.params);
      }else{
          params=settings.params;
      }

      xhr.open(settings.method,settings.url,true);
      xhr.withCredentials       = settings.withCredentials;
      xhr.responseType          = settings.format;
      xhr.onreadystatechange    = readyStateChange;
      xhr.onerror               = error;
      for(var head in settings.headers){
          xhr.setRequestHeader(head, settings.headers[head]);
      }
      xhr.send(params);

      function error(e){
          console.info("Check internet connection");
          console.error('ERROR:: ',e);
      }

      function readyStateChange(e){
          if(this.readyState===4 && this.status >= 200 && this.status <= 300){
              var response=this.response||"{}";//@fix:empty object so as to not cause an error
              if(typeof response==="string"&&settings.format==="json" )response=JSON.parse(response);//wen setting responseType to json does not work
              //else response=JSON.parse(response); //@change: if object is not a string, changes are that it is an object already
              if(typeof settings.callback==="function")settings.callback(response);
          }
      }
    },
    /**
     * stack for chrome, to display the last position of the script where it was executed last
     */
    stack:function(){
        var isChrome = myPlatform.isChrome;
        if(isChrome||false){
            var stack = new Error().stack,n=isChrome?3:2;
            var file = stack.split("\n")[n].split("/");
            return '('+file[file.length-1]+')';}
        else{return '';}
    }
};
//============================================================================//STORAGE
/*
 * used to store to storage to json objects
 */
var myPlatform = (typeof myPlatform!== "undefined")? myPlatform: new onPlatform();
var dynamis={
  clear:function(_local){
      var isChromeApp=myPlatform.isChromeApp;

      if(isChromeApp && _local===true){chrome.storage.local.clear();}
      else if(isChromeApp && !_local) {chrome.storage.sync.clear();}
      else if(_local)                 {localStorage.clear();}
      else                            {sessionStorage.clear();}//endif
  },
  del:function(_key,_local){
      var isChromeApp=myPlatform.isChromeApp;

      if(isChromeApp && _local===true){chrome.storage.local.remove(_key);sessionStorage.removeItem(_key);}
      else if(isChromeApp && !_local) {chrome.storage.sync.remove(_key);sessionStorage.removeItem(_key);}
      else if(_local)                 {localStorage.removeItem(_key);}
      else                            {sessionStorage.removeItem(_key);}//endif
  },
  get:function(_key,_local){
      var value;
      var isChromeApp=myPlatform.isChromeApp;

      if(isChromeApp && _local===true){chrome.storage.local.get(_key,function(obj){return obj[_key];});value=sessionStorage.getItem(_key);}
      else if(isChromeApp && !_local) {chrome.storage.sync.get(_key,function(obj){return obj[_key];});value=sessionStorage.getItem(_key);}
      else if(_local)                 {value=localStorage.getItem(_key);}
      else                            {value=sessionStorage.getItem(_key);}//endif
      return str2Json(value)||value;
  },
  set:function(_key,_value,_local){//chrome.app.window
      var set={}, string;
      set[_key]       = _value;
      var isChromeApp = myPlatform.isChromeApp;
      string          = (typeof _value==="object")? JSON.stringify(_value): str2Json(_value);

      //if(string===false) { iyona.err("The string given is not a valid JSON", value); return false;}//include non JSON?
      if(isChromeApp && _local===true){chrome.storage.local.set(set);sessionStorage.setItem(_key,string);}
      else if(isChromeApp && !_local) {chrome.storage.sync.set(set);sessionStorage.setItem(_key,string);}
      else if(_local)                 {localStorage.setItem(_key,string);}
      else                            {sessionStorage.setItem(_key,string);}//endif
  },
  key:function(key, _local){
    var val = this.get(key, _local);
    return {"set":set};

    function set(k, value){
      val[k] = value;
      this.set(key, val, _local);
    }
  }

};
var myLog = dynamis;


//============================================================================//
// RUN CONFIG
//============================================================================//
(function(){(  new configuration()).config();  })();//run the configurations
var _$=function(element){
    if(typeof element==="string" && typeof angular!=="undefined")return angular.element(document.querySelectorAll(element));
    else if (typeof angular!=="undefined") return angular.element(element);
    else if (typeof jquery!=="undefined") return $(element);
    else return document.querySelectorAll(element);
};
//============================================================================//
//https://spreadsheets.google.com/feeds/cells/1JfaPSPOd7eBgZNI4-d42ZjCeljzjk3s1GH7eze72fbc/od6/public/values?alt=json