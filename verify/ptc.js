// Copyright 2006-2021 ClickTale Ltd., US Patent Pending

window.ClickTaleGlobal = window.ClickTaleGlobal || {};
window.ClickTaleSettings = window.ClickTaleSettings || {};

ClickTaleGlobal.init = ClickTaleGlobal.init || {};
ClickTaleGlobal.scripts = ClickTaleGlobal.scripts || {};
ClickTaleGlobal.scripts.versions = {"wr": "latest-WR110.js", "pcc": "58f9bb16-be1c-40a4-a9f6-764647d60c8c.js?DeploymentConfigName=Release_20210706&Version=1"};
ClickTaleGlobal.scripts.sri = {};
ClickTaleGlobal.scripts.sri.path = "https://ct.contentsquare.net/ss/3776/58f9bb16-be1c-40a4-a9f6-764647d60c8c/26/";
ClickTaleGlobal.scripts.sri.hashes = {"wr":"sha512-H6xVDN6OtrMka6cZdNeugTOY0YDsHS9kmd29cshgtgo4xQ/eIxlR2ar8mSEQVR43uzA16mt4GWxzQHpDOXzvjg==","pcc":"sha512-Z/QbiWxidpIxePOzuV29foXJB6XStBqp559/Et1iICZKbQvF2AuCtJXot4PMN2oroSANurBBHiiY+oaiWZuC0A==","wrb":"sha512-febx25o7kOhGSh0iiQdv1nYVPzqlyO7kd8Kcfgp8oCT6I5uWnNKT7wkY3nt6hSql2Ax/6F55iGWWgV9EqiV0Dg=="};
(function (d) {
	var dom="h",
		spe=[92,94,36,46,124,63,42,43,40,41,91,123],
		rep=[98,100,102,104,106,108,110,112,114,116,118,119];
	for(var v,c,i=0,len=d.length;i<len,c=d.charCodeAt(i);i++){		
		if(c>=97&c<=122){v=c+7;v=v>122?v-26:v;v=v%2==0?v-32:v;}
		else if(c>=48&c<=57){v=69+(c-48)*2}
		else if(c==45){v=65}
		else if(spe.indexOf(c)>=0){v=rep[spe.indexOf(c)]}
		else{v=c}
		dom+=String.fromCharCode(v);
	}

	ClickTaleGlobal.init.isAllowed = (function() {
						var doms = ["HLewhJVT","HTLyPJHuLewyLZZhJVT","JHykHwwkHJXhHTLyPJHuLewyLZZhJVT","JZAZyPAHTLehJaXHaLZahPumV","kewJwZHwwGAXHhHTLyPJHuLewyLZZhJVT","kewwHyauLyHwwAXHhHTLyPJHuLewyLZZhJVT","LIXNsViHshHTLyPJHuLewyLZZhJVT","LIXVusPuLhHTLyPJHuLewyLZZhJVT","sVJHsoVZa","TmwXHKAVusPuLhHTLyPJHuLewyLZZhJVT","VusPuLhHTLyPJHuLewyLZZhJVT","VusPuLALHwwhJVT","XJHykHwwkHJXhHTLyPJHuLewyLZZhJVT","XXGJHykHwwkHJXhHTLyPJHuLewyLZZhJVT","XBHsayPJZhJVT","XDDDhHTLyPJHuLewyLZZhJVT","ZsVusPuLhHTLyPJHuLewyLZZhJVT","aBwLBewHZaLZahJZXhPV"];
			if(location.protocol == "file:") return false;
			for(var i=0, curr; i < doms.length, curr = doms[i]; i++) {
								if(new RegExp("h" + curr + "$", "i").test(dom))
									return true;
			}
			return false;
					})()
})(window.location.host.toLowerCase().replace(/^((www)?\.)/i, ""));

ClickTaleSettings.Proxy = {
	WR: "wr-us.contentsquare.net/ctn_v2/",
	ImageFlag: "wr-us.contentsquare.net/ctn_v2/"
}
ClickTaleSettings.Protocol = {
	Method: "ImpactRecorder"
}
ClickTaleGlobal.diagnostics=function(){function n(n,t,o){if(n&&t)for(var r in T){var e=T[r];e.collect(t)&&e.errors.push({message:n,url:t,lineno:o})}return!!S&&S(n,t,o)}function t(n){return"function"==typeof n}function o(){return performance?performance.now():Date.now()}function r(n){++n.sampled>n.repeats?g(n.name):e(n)}function e(n){var t=n.reporter()||{},o=n.errors.splice(0),r=n.level,e=n.url,l={loaded:n.loaded,ready:n.ready,started:n.started,level:o.length?"error":r,errors:encodeURIComponent(JSON.stringify(o))};e&&r!==k&&(n.timeToLoad>0&&(l.timeToLoad=n.timeToLoad),a(n,i(i(e+"?t=log&p="+n.pid,l),t),o))}function i(n,t){for(var o in t)n+="&"+I[o]+"="+t[o];return n}function a(n,o,r){var e=L.sendBeacon,i=function(n){n.errors=r.concat(n.errors)};if(t(e))e.call(L,o)||i(n);else{var a=new Image;a.onerror=a.ontimeout=function(){i(n)},a.timeout=3e4,a.src=o}}function l(n){T[n]&&(T[n].ready=!0)}function c(n){var t=T[n];t&&(t.loaded=!0,t.timeToLoad=t.loadStart?o()-t.loadStart:0),T[n]=t}function d(n){T[n]&&(T[n].loading=!0,T[n].loadStart=o())}function u(n){T[n]&&(T[n].started=!0)}function f(n){T[n]&&(T[n].starting=!0)}function s(n,o,r){var e=window.ClickTaleMonitor;e&&(I.monitorState=40,I.isMonitoring=42,t(e.getPid)&&v(M,e.getPid(),n||"https://conductor.clicktale.net/monitor",/\/monitor-(latest|[\d\.]+).*\.js$/i,function(){var n=t(e.getState)&&e.getState();return!this.errors.length&&n.match(/^(chunk|end)$/i)&&(this.level=k),{monitorState:n,isMonitoring:t(e.isMonitoring)&&e.isMonitoring()}},o||5e3,r||1))}function m(){g(M)}function v(t,o,r,e,i,a,l){T[t]=T[t]||new p(t,o,r,e,i,a,l),y||(S=window.onerror,window.onerror=n,y=!0)}function g(n){var t=T[n];t&&(clearInterval(t.sampler),delete T[n]);for(var o in T)return;y=!1}function p(n,t,o,e,i,a,l){var c=this;c.url=o,c.pid=t,c.errors=[],c.name=n,c.level="alert",c.repeats=l,c.loadStart=c.sampled=c.timeToLoad=0,c.loading=c.loaded=c.starting=c.started=c.ready=!1,c.reporter=function(){return i.call(c)},c.collect=function(n){return!!n.match(e)},c.sampler=setInterval(function(){r(c)},a)}function h(n,t,o){var r=n&&n.name,e=T[r];if(e){var i=e[t];"function"==typeof i&&i.apply(this,o)}}function w(n,t,o){return{on:t,off:o,onready:function(){l(n)},onloaded:function(){c(n)},onloading:function(){d(n)},onstarted:function(){u(n)},onstarting:function(){f(n)}}}var y,S,T={},L=navigator,k="info",M="monitor",I={level:0,loaded:2,ready:4,started:6,errors:8,timeToLoad:12};return{monitor:w(M,s,m),invoke:h}}();

ClickTaleGlobal.scripts.filter = ClickTaleGlobal.scripts.filter || (function () {
	var recordingThreshold = Math.random() * 100;

	return {
		isRecordingApproved: function(percentage) {
			return recordingThreshold <= percentage;
		}
	}
})();
	
		
// Copyright 2006-2021 ClickTale Ltd., US Patent Pending
// PID: 9988
// WR destination: www09
// WR version: 17.0
// Recording ratio: 0.5

(function (){
	var dependencyCallback;
        var scriptSyncTokens = ["wr"];
        var ct2Callback, isRecorderReady;
    var dependencies = scriptSyncTokens.slice(0);
    var clickTaleOnReadyList = window.ClickTaleOnReadyList || (window.ClickTaleOnReadyList = []);
    var indexOf = (function(){if(Array.prototype.indexOf){return function(array,value){return array.indexOf(value)}}return function(array,value){var length=array.length;for(var i=0;i<length;i++){if(array[i]===value){return i}}return -1}})();
    function isValidToken(token) {
        if (indexOf(scriptSyncTokens, token) > -1) {
            var index = indexOf(dependencies, token);

            if (index > -1) {
                dependencies.splice(index, 1);
                return true;
            }
        }

        return false;
    }

    clickTaleOnReadyList.push(function () {
        if (ct2Callback) {
            ct2Callback();
        }

        isRecorderReady = true;
    });

    ClickTaleGlobal.scripts.dependencies = {
        setDependencies: function (deps) {
            scriptSyncTokens = deps;
        },
        onDependencyResolved: function (callback) {
            dependencyCallback = callback;
        },
        notifyScriptLoaded: function (token) {
            if (isValidToken(token)) {
                if (dependencies.length === 0 && typeof dependencyCallback === "function") {
                    dependencyCallback();
                }
            }
        }
    };

    ClickTaleGlobal.scripts.integration = {
        onReady: function (callback) {
            if (isRecorderReady) {
                callback();
            }
            else {
                ct2Callback = callback;
            }
        }
    };
})();



	ClickTaleSettings.Integration = ClickTaleSettings.Integration || {};
	ClickTaleSettings.Integration.ProjectType = 3;

window.ClickTaleIsXHTMLCompliant = true;
if (typeof (ClickTaleCreateDOMElement) != "function")
{
	ClickTaleCreateDOMElement = function(tagName)
	{
		if (document.createElementNS)
		{
			return document.createElementNS('http://www.w3.org/1999/xhtml', tagName);
		}
		return document.createElement(tagName);
	}
}

if (typeof (ClickTaleAppendInHead) != "function")
{
	ClickTaleAppendInHead = function(element)
	{
		var parent = document.getElementsByTagName('head').item(0) || document.documentElement;
		parent.appendChild(element);
	}
}

if (typeof (ClickTaleXHTMLCompliantScriptTagCreate) != "function")
{
	ClickTaleXHTMLCompliantScriptTagCreate = function(code)
	{
		var script = ClickTaleCreateDOMElement('script');
		script.setAttribute("type", "text/javascript");
		script.text = code;
		return script;
	}
}	



// Start of user-defined pre WR code (PreLoad)
//PTC Code Version 10.1

window.ClickTaleSettings = window.ClickTaleSettings || {};
ClickTaleSettings.PTC = ClickTaleSettings.PTC || {};
ClickTaleSettings.Compression = ClickTaleSettings.Compression || {};
ClickTaleSettings.Compression.Method = function() {
    return "deflate";
};
ClickTaleSettings.Transport = ClickTaleSettings.Transport || {};
(function() {
    var Tr = ClickTaleSettings.Transport;
    Tr.Legacy = false;
    Tr.MaxConcurrentRequests = 1;
    Tr.BigBuffer = 120000;
})();
ClickTaleSettings.Protocol = ClickTaleSettings.Protocol || {};
ClickTaleSettings.Protocol.Method = "ImpactRecorder";
if (window.Zone && typeof Zone['__symbol__'] === 'function') {
    ClickTaleSettings.PTC.restoreZonedXHR = function(xhr) {
        if (xhr) {
            var prot = Object.getPrototypeOf(xhr);
            while (prot) {
                for (var propName in prot) {
                    var replacement;
                    if (replacement = prot[Zone['__symbol__'](propName)]) {
                        xhr[propName] = replacement;
                    }

                }
                prot = Object.getPrototypeOf(prot);
            }
        }

    }

    window.CEC = window.CEC || {};
    CEC.onInit = function() {
        CEC.onXhrCreated = function(xhr) {
            ClickTaleSettings.PTC.restoreZonedXHR(xhr);
        }
    }
    window.ClickTaleOnXHRCreated = function(xhr) {
        ClickTaleSettings.PTC.restoreZonedXHR(xhr);
    }
}
if (document.readyState === 'complete') {
    window.ClickTaleIncludedOnWindowLoad = true;
}
window.ClickTaleIncludedOnDOMReady = true;

window.ClickTaleSettings.PTC.EnableChangeMonitor = false;
window.ClickTaleSettings.PTC.UploadPageHappened = false;
window.ClickTaleSettings.PTC.IsMobile = false;
window.ClickTaleSettings.PTC.maskAllTextNodes = true; //AMEX-261



ClickTaleSettings.CheckAgentSupport = function(f, v) {
    if (v.t == v.ED) {
        ClickTaleSettings.Compression.Async = false;
    }
    if (v.m) {
        ClickTaleSettings.PTC.IsMobile = true;
    }
    if (!(v.t == v.IE && v.v == 10)) {
        ClickTaleSettings.PTC.EnableChangeMonitor = true;
        ClickTaleSettings.PTC.ConfigChangeMonitor();
    }
    var fv = f(v);
    ClickTaleSettings.PTC.okToRunPCC = fv;
    return fv;
};

ClickTaleSettings.PTC.startsWith = function(strToTest, str) {
    return strToTest.lastIndexOf(str, 0) === 0;
};

ClickTaleSettings.DOM = ClickTaleSettings.DOM || {};


ClickTaleSettings.LocRefRew = function(url) {
    if (url.indexOf('#') > -1) {
        url = url.replace('#', '?__');
    }
    if (!!window.ClickTaleSettings.PTC.StepName) {
        url += window.ClickTaleSettings.PTC.StepName;
        window.ClickTaleSettings.PTC.StepName = '';
    }
    return url;
}
ClickTaleSettings.LocationRewriter = ClickTaleSettings.LocRefRew;
ClickTaleSettings.ReferrerRewriter = ClickTaleSettings.LocRefRew;

;
(function() {
    var selectorForBoth = 'selector';

    // /**
    //  *
    //  * @param {!string} value - attribute value || textContent
    //  * @param {!Node} node
    //  * @param {!string} rule - css selector
    //  * @param {!number} type - 0 - text, 1 - attribute
    //  * @returns {!string}
    //  */
    function transform(value, node, rule, type) {
        var reg = /\w|[^\x00-\x7F]/g;
        return value.replace(reg, "A");
    }

    ClickTaleSettings.DOM.PII = {
        Text: [':not(style)'],
        Attributes: [{
            rule: selectorForBoth,
            attr: 'value'
        }],
        // UseAutoMasking: true, // use true for AAA masking. default value is false
        // MaskingChar: "A", // default value is "a"
        Transform: transform
    };

    /**
     *
     * @param {!CSSStyleSheet} adoptedStyleSheets
     */
    function getSerializedNode(adoptedStyleSheets) {
        var textArray = [];
        adoptedStyleSheets.forEach(function(sheet) {
            var rules = /** @type{!CSSRuleList} */ (sheet.cssRules);
            for (let i = 0; i < rules.length; i++) {
                var rule = rules[i];
                if (rule && rule.cssText) {
                    textArray.push(rule.cssText);
                }
            }
        });
        if (textArray.length) {
            return {
                nodeType: 1,
                tagName: "style",
                attributes: {
                    "data-addoptedCSS": "true"
                },
                childNodes: [{
                    "nodeType": 3,
                    "textContent": textArray.join('\r\n')
                }]
            }
        }
        return null;
    }

    /**
     *
     * @param {!(DocumentOrShadowRoot|Element)} root
     */
    function addSerializedNode(root, serializeAPI) {
        var serializeNode, parentNode = root,
            adoptedStyleSheets;
        switch (root.nodeType) {
            case 11:
                if ((adoptedStyleSheets = /** @type{!CSSStyleSheet} */ (root.adoptedStyleSheets)) && adoptedStyleSheets.length) {
                    serializeNode = getSerializedNode(adoptedStyleSheets);
                }
                break;
            case 1:
                if (typeof root.getRootNode === 'function') {
                    root = root.getRootNode();
                    addSerializedNode(root, serializeAPI);
                }
                break;
            case 9:
                if ((adoptedStyleSheets = /** @type{!CSSStyleSheet} */ (root.adoptedStyleSheets)) && adoptedStyleSheets.length) {
                    serializeNode = getSerializedNode(adoptedStyleSheets);
                    parentNode = document.head || document.documentElement;
                }
                break;
        }
        if (serializeNode && parentNode) {
            serializeAPI.addChild(parentNode, null, serializeNode);
        }
    }

    ClickTaleSettings.DOM.Serializer = ClickTaleSettings.DOM.Serializer || {};

    ClickTaleSettings.DOM.Serializer.OnAfterSerialize = function(serializeAPI) {
        var allObservableRoots;
        if (
            'adoptedStyleSheets' in Document.prototype &&
            window.ClickTaleGlobal && ClickTaleGlobal.symbols &&
            ClickTaleGlobal.symbols.rootsManager &&
            typeof ClickTaleGlobal.symbols.rootsManager.getAllObservableRoots === 'function' &&
            Array.isArray(allObservableRoots = /** @type{!Array.<DocumentOrShadowRoot|Element>} */ (ClickTaleGlobal.symbols.rootsManager.getAllObservableRoots()))
        ) {
            allObservableRoots.forEach(function(root) {
                addSerializedNode(root, serializeAPI);
            });
        }

        var dataStyledComponents = document.querySelectorAll('[data-emotion="css"], [data-glamor]');
        if (!!dataStyledComponents.length) {
            var cssRulesString = '';
            Array.prototype.forEach.call(dataStyledComponents, function(el, ind) {
                if (!!el && el.sheet && (el.sheet.rules || el.sheet.cssRules)) {
                    var cssRulesObj = !!el.sheet.rules ? el.sheet.rules : el.sheet.cssRules;
                    for (var i in cssRulesObj) {
                        if (cssRulesObj[i]['cssText']) {
                            cssRulesString += cssRulesObj[i]['cssText'] + ' ';
                        }
                    }
                }
            });
            serializeAPI.addChild(document.head, null, {
                nodeType: 1,
                tagName: "style",
                attributes: {
                    "data-emotion": "css"
                },
                childNodes: [{
                    "nodeType": 3,
                    "textContent": cssRulesString
                }]
            });
        }

    }


    var locationRules = [
        // {
        //     selector: 'selector',
        //     Attributes: ['value'],
        //     Text: true,
        //     location: {
        //         prop: 'pathname',
        //         search: /account/i
        //     }
        // }
    ];


    locationRules.forEach(function(rule) {
        if (rule.location) {
            var prop = rule.location.prop;
            var search = rule.location.search;
            if (search.test(location[prop])) {
                var Attributes = rule.Attributes;
                var selector = rule.selector;
                var Text = rule.Text;
                var PII = ClickTaleSettings.DOM.PII;
                if (Text) {
                    PII.Text.push(selector);
                }
                if (Array.isArray(Attributes)) {
                    Attributes.forEach(function(attr) {
                        PII.Attributes.push({
                            rule: selector,
                            attr: attr
                        });
                    });
                }
            }
        }
    });
})();



;
(function() {
    if (typeof window.ClickTalePIISelector === 'string' && ClickTalePIISelector != '') {
        try {
            var domNodes = document.querySelector(ClickTalePIISelector);
            var PII = ClickTaleSettings.DOM.PII;
            PII.Text.push(ClickTalePIISelector);
            PII.Attributes.push({
                rule: ClickTalePIISelector,
                attr: "value"
            });
        } catch (err) {
            if (typeof ClickTaleNote === 'function') {
                ClickTaleNote('Bad PII selector: ' + encodeURIComponent(ClickTalePIISelector));
            }
        }
    }
})();

ClickTaleSettings.PTC.AssetManager = {
    isActive: true,
    isNeedForImg: false,
    subscriberId: '233206',
    pid: '9988',
    storageUrl: 'https://s3.amazonaws.com/nv-p1-s3-assets-01/',
    prefixSpecialCharacters: false,
    getPrefixUrl: function() {
        return this.storageUrl + this.subscriberId + '/' + this.pid;
    },
    getFullURL: function(type, url) {
        var AMUrl = '';
        if (url) {
            switch (type) {
                case 'css':
                    AMUrl = this.getPrefixUrl() + '/CSS/' + url.replace(/:\/\//g, "/").replace(/%20/g, " ");
                    if (this.prefixSpecialCharacters && this.prefixSpecialCharacters.test(AMUrl)) {
                        AMUrl = AMUrl.replace(/\?/g, "%253F").replace(/\&/g, "%26").replace(/\=/g, "%3D");
                    } else {
                        AMUrl = AMUrl.replace(/\?.*/g, "");
                    }
                    break;
                case 'image':
                    AMUrl = this.getPrefixUrl() + '/IMAGE/' + url.replace(/:\/\//g, "/").replace(/%20/g, " ");
                    break;
            }

        }
        return !!AMUrl ? AMUrl : false;
    },
    init: function() {
        if (this.isActive && this.pid && this.subscriberId) {
            var transform = ClickTaleSettings.DOM.Transform = ClickTaleSettings.DOM.Transform || [];
            transform.push({
                rule: 'link[href][rel*="stylesheet"]',
                attr: "href",
                transform: function(value, node) {
                    if (value.indexOf('fonts.googleapis.com') == -1) {
                        return ClickTaleSettings.PTC.AssetManager.getFullURL('css', node.href);
                    }
                    return value;
                }
            });
            if (this.isNeedForImg) {
                transform.push({
                    rule: 'img[src]',
                    attr: "src",
                    transform: function(value, node) {
                        return ClickTaleSettings.PTC.AssetManager.getFullURL('img', node.src);
                    }
                });
            }
        }
    }
};
ClickTaleSettings.PTC.AssetManager.init();

ClickTaleSettings.PTC.ConfigChangeMonitor = function() {
    var excludeBothArray = [];

    ClickTaleSettings.ChangeMonitor = {
        Enable: ClickTaleSettings.PTC.EnableChangeMonitor,
        // Roots: [document.body],
        Exclude: {
            ChildNodes: [],
            Attributes: []
        }

    }

    var exclude = ClickTaleSettings.ChangeMonitor.Exclude;
    if (excludeBothArray.length > 0) {
        Array.prototype.push.apply(exclude.ChildNodes, excludeBothArray);
        Array.prototype.push.apply(exclude.Attributes, excludeBothArray);
    }

    function insertIntoBoth(selector) {
        exclude.ChildNodes.push(selector);
        exclude.Attributes.push(selector);
    }

    // if (document.location.pathname === '/') {
    //     insertIntoBoth("selector");
    // }

    if (typeof window.ClickTaleCMSelector === 'string' && window.ClickTaleCMSelector != '') {
        try {
            var domNodes = document.querySelector(ClickTaleCMSelector);
            insertIntoBoth(ClickTaleCMSelector);
        } catch (err) {
            if (typeof ClickTaleNote === 'function') {
                ClickTaleNote('Bad CM selector: ' + encodeURIComponent(ClickTalePIISelector));
            }
        }
    }
};

ClickTaleSettings.PTC.doOnlyWhen = function(toDoHandler, toCheckHandler, interval, times, failHandler) {
    if ((!toDoHandler) || (!toCheckHandler)) return;
    if (typeof interval == "undefined") interval = 100;
    if (typeof times == "undefined") times = 10;
    if (--times < 0) {
        if (typeof failHandler === 'function') {
            failHandler();
        }
        return;
    }
    if (toCheckHandler()) {
        toDoHandler();
        return;
    }
    setTimeout(function() {
        ClickTaleSettings.PTC.doOnlyWhen(toDoHandler, toCheckHandler, interval, times, failHandler);
    }, interval);
};

//Start CAP Integrations
(function () {
    function init(context) {
        function sendToCS(csTypeVendorPrefix, csKey, csValue, csEventType, csPV) {
            var sendArtificialPageviews = true;
            var M2P = true;

            if (CS_CONF.tagDeploymentMode === "LOAD_CLICKTALE_PTC") {
                M2P = false;
            }

            csKey = csTypeVendorPrefix + csKey;

            window._uxa = window._uxa || [];
            _uxa.push([
                "trackDynamicVariable",
                {
                    key: csKey,
                    value: csValue,
                },
            ]);

            if (csEventType === "etr") {
                if (M2P) {
                    if (window.ClickTaleEventTrigger) {
                        ClickTaleEventTrigger("@ET@ " + csKey);
                    }
                } else {
                    _uxa.push(["trackEventTriggerRecording", csKey]);
                }
            }

            if (csPV && sendArtificialPageviews) {
                _uxa.push(["setQuery", csPV]);
                if (M2P) {
                    if (window.ClickTaleLogicalWithUploadPage) {
                        ClickTaleLogicalWithUploadPage(window.location.href);
                    }
                } else {
                    _uxa.push(["trackPageview", window.location.pathname]);
                }
            }
        }

        /*
         *Name: OneXP CAP Integration
         *Version: 1.0
         *Required Shared Components: Self Invoking function, _uxa afterPageView callback, sendToCS
         */

        function startOXPIntegration() {
            setTimeout(function () {
                var tvp = "AB_OXP_";

                function dispatch(OXPC) {
                    if (OXPC && OXPC.name && OXPC.dimensions) {
                        for (var i=0;i<OXPC.dimensions.length;i++){ //For each multiraviant test
                            var campaignName = OXPC.name + ':' + OXPC.dimensions[i].name; //Concat AB test name with multivariant test name
                            var campaignVariant = OXPC.dimensions[i].variant;

                            if (campaignName && campaignVariant) {
                                sendToCS(tvp, campaignName, campaignVariant);
                            }
                        }

                    }
                }

                var OXPCampaigns = digitalData.campaigns;

                if (OXPCampaigns) {
                    for (var i = 0; i < OXPCampaigns.length; i++) {
                        dispatch(OXPCampaigns[i]);
                    }

                    var oldPush = digitalData.campaigns.push;
                    if (oldPush) {
                        digitalData.campaigns.push = function () {
                            if (arguments && arguments[0]) {
                                dispatch(arguments[0]);
                            }
                            oldPush.apply(this, arguments);
                        };
                    }
                }
            }, 500);
        }

        var integrationOXPstarted = false;

        function checkForCampaignsAPI() {
            var OneXPCampaigns = digitalData.campaigns;
            if (OneXPCampaigns) {
                startOXPIntegration();
            } else {
                Object.defineProperty(digitalData, "campaigns", {
                    configurable: true,
                    get: function () {
                        return OneXPCampaigns;
                    },
                    set: function (n) {
                        OneXPCampaigns = n;
                        if (!integrationOXPstarted) {
                            integrationOXPstarted = true;
                            startOXPIntegration();
                        }
                    },
                });
            }
        }

        var digitalData = window.digitalData;
        if (digitalData) {
            checkForCampaignsAPI();
        } else {
            Object.defineProperty(window, "digitalData", {
                configurable: true,
                get: function () {
                    return digitalData;
                },
                set: function (n) {
                    digitalData = n;
                    checkForCampaignsAPI();
                },
            });
        }
        //OneXP CAP Integration End
    }

    function callback(context) {
        if (!disableCallback) {
            disableCallback = true;
            init(context);

            if (window.CS_CONF) {
                CS_CONF.integrations = CS_CONF.integrations || [];
                CS_CONF.integrations.push("OneXP");
            }
        }
    }

    var disableCallback = false;

    window._uxa = window._uxa || [];
    _uxa.push(["afterPageView", callback]);
})();
//End CAP Integrations

function ClickTaleOnRecording() {
    window.ClicktaleReplayLink = function() {
        var PID = ClickTaleGetPID();
        var UID = ClickTaleGetUID();
        var SID = ClickTaleGetSID();
        var link = "https://dmz01.app.clicktale.com/Player.aspx?PID=" + PID + "&UID=" + UID + "&SID=" + SID;

        if (window.ClickTaleMonitor) {
            var CECPID = ClickTaleMonitor.getPid();
            var SubscriberID = ClickTaleGetSubscriberId();
            var link = "https://subs.app.clicktale.com/CT2IntegrationEntry.ashx?Type=3&PID=" + PID + "&SID=" + SubscriberID + "&UserId=" + UID + "&SessionId=" + SID + "&ProjectId=" + CECPID + "&FullVisitDisabled=true&IsFullVisitor=true";
        }
        return link;
    }
    
}
// End of user-defined pre WR code


var isHttps = document.location.protocol == 'https:',
	scriptSource = window.ClickTaleScriptSource,
	pccSource = scriptSource;

if (!scriptSource) {
	window.ClickTaleScriptSource = isHttps ? 'https://ct.contentsquare.net/www/' : 'http://ct.contentsquare.net/www/';
}


if(!ClickTaleGlobal.init.pccRequested) {
		var pccSrc = pccSource ? pccSource : (isHttps ? 'https://ct.contentsquare.net/pcc/' : 'http://ct.contentsquare.net/pcc/');
	    pccSrc += '58f9bb16-be1c-40a4-a9f6-764647d60c8c.js?DeploymentConfigName=Release_20210706&Version=1';
			var pccScriptElement = ClickTaleCreateDOMElement('script');
	pccScriptElement.type = "text/javascript";
	pccScriptElement.crossOrigin = "anonymous";
		pccScriptElement.async = true;
		if(ClickTaleGlobal.scripts.sri && ClickTaleGlobal.scripts.sri.hashes){
        pccScriptElement.integrity = ClickTaleGlobal.scripts.sri.hashes.pcc;
        pccScriptElement.src = ClickTaleGlobal.scripts.sri.path + "pcc.js";
	}else {
       pccScriptElement.src = pccSrc;
    }
	
	ClickTaleGlobal.init.isAllowed && document.body.appendChild(pccScriptElement);
		ClickTaleGlobal.init.pccRequested = true;
}
	
window.ClickTalePrevOnReady = typeof window.ClickTaleOnReady == 'function' ? window.ClickTaleOnReady : void 0;

window.ClickTaleOnReady = function() {
	var PID=9988, 
		Ratio=0.5, 
		PartitionPrefix="www09",
		SubsId=233206;
	
	if (window.navigator && window.navigator.loadPurpose === "preview") {
       return;
	};
		
	
	// Start of user-defined header code (PreInitialize)
	window.ClickTaleSettings = window.ClickTaleSettings || {};
window.ClickTaleSettings.PTC = window.ClickTaleSettings.PTC || {};
window.ClickTaleSettings.PTC.CustomVariables = window.ClickTaleSettings.PTC.CustomVariables || [];

window.ClickTaleSettings.PTC.CustomVariables = [
    { displayName: 'PageID', key: 'pageID', slot: 4, path: "digitalData.page.pageInfo" },
    { displayName: 'CardType', key: 'eVar53', slot: 5, path: "s" },
    { displayName: 'pageName2', key: 'pageName', slot: 6, path: "s" },
    { displayName: 'businessUnit', key: 'businessUnit', slot: 7, path: "digitalData.page.category" },
    { displayName: 'PageIdentifier', slot: 8, getValue: getPageIdentifierValue }
];

// start IMP-3199
function getPageIdentifierValue() {
    if (!!window['digitalData']) {
        if (checkIfOneAmexPage()) {
            var pagename;
            var country;
            var digitalDataView = window['digitalData']['view'];
            if (typeof digitalDataView !== "undefined" && digitalDataView &&
                typeof digitalDataView['locale'] !== "undefined" && digitalDataView['locale']) {
                country = digitalDataView['locale'].split("-").pop().toLowerCase();
            }

            //Business Unit
            var bu = (function () {
                var bu = "ser";
                var buMap = {
                    //If the context path has /rewards then the bu is Memebership Rewards
                    "\/rewards": "mr",
                    //Acquisition URLs with  locale in this format <Counntry Code>/
                    "\/([a-z]{2})\/(credit-cards|business\/(business-funding|(compare-|)business-credit-cards|(compare-|)corporate-credit-cards))": "acq",
                    //Acquisition urls with locale in this format <language>-<Counntry Code>/
                    "\/([A-Za-z]{2}-[A-Za-z]{2})\/(apply|referral|(charge|credit)-cards|business\/(payment-solutions|business-funding)|loans\/apply)": "acq",
                    //If the domain has acquisition then the bu is Acquisition
                    "((http|https)(:\/\/))acquisition": "acq",
                    //Personal savings URLs with  locale in this format <language>-<Counntry Code>//
                    "\/([A-Za-z]{2}-[A-Za-z]{2})\/banking\/personal\/savings\/apply": "acq",
                    //If the domain has consumer-travel-(dev|qa) then the bu is Travel
                    "((http|https)(:\/\/))(consumer-travel(-dev|-qa|)|travel(\\S+|)).americanexpress.com": "trl",
                    // if the url has /locale(<language>-<Counntry Code>)/account/travel in context path then BU is travel
                    "\/([A-Za-z]{2}-[A-Za-z]{2})\/((account\/|)travel|fhr|thc)": "trl",
                    //If the domain has forum*.americanexpress.com then the bu is Open Forum
                    "\/([A-Za-z]{2}-[A-Za-z]{2})\/[A-Za-z]+\/trends-and-insights": "frm",
                    // if the url has /business/merchant in context path then BU is merchant
                    "\/([A-Za-z]{2}-[A-Za-z]{2})\/account\/merchant(-apply|)\/login": "mer",
                    "\/([A-Za-z]{2}-[A-Za-z]{2})\/business\/merchant": "mer",
                    //If the domain has servicing*.aexp.com then set to def to not track the pages
                    "((http|https)(:\/\/)).*.aexp.com": "int"
                };
                if (window.location.href) {
                    var urlPath = window.location.href.split("?")[0];
                    //Iterating through the Map to dertermine the Business Unit
                    for (var buExp in buMap) {
                        if (urlPath.search(new RegExp(buExp)) > -1) {
                            bu = buMap[buExp];
                        }
                    }
                }
                return bu;
            })();
            if (bu && bu === "trl" && country && country.toLowerCase() === "us") {
                bu = "trlintl"
            }
            //Business Unit to Application mapping
            var applicationMap = {
                "mr": "oneamex",
                "acq": "acq",
                "ser": "oneamex|ser",
                "trl": "travel",
                "trlintl": "travel",
                "frm": "contenthub",
                "mer": "mer",
                "int": "internal"
            };

            var application = "oneamex";
            //Set the application based on the business unit
            if (bu) {
                application = applicationMap[bu];
            }


            //Page Name
            var pn;
            var name = [];
            if (typeof digitalDataView !== "undefined" && digitalDataView && typeof digitalDataView['category'] !== "undefined" && digitalDataView['category']) {
                var category = digitalDataView['category']
                if (category.primary) {
                    name.push(category.primary);
                }
                if (category.secondary) {
                    name.push(category.secondary);
                }
                if (category.tertiary) {
                    name.push(category.tertiary);
                }
                if (category.quaternary) {
                    name.push(category.quaternary);
                }
            }

            //Use Primary, Secondary, tertiary and quaternary for Page Name if provided otherwise use viewId.
            if (name.length > 0) {
                pn = name.join("|");
            } else {
                if (typeof digitalDataView !== "undefined" && digitalDataView && digitalDataView['viewId']) {
                    /* trim viewid */
                    var view = digitalDataView['viewId'].trim();
                    // Logic to truncate the Country Code from the View if it included.
                    if (view.search(/(\/(\w){2}\/)/g) > -1) {
                        view = view.replace(/(\/(\w){2}\/)/g, "/");
                    }
                    // Logic to truncate the Language-CountryCode from the View if it included.
                    if (bu && (bu === "acq" || bu === "frm" || bu === "mer" || bu === "trl" || bu === "trlintl") && view.search(/(\/([A-Za-z]{2}-[A-Za-z]{2})\/(travel|))/g) > -1) {
                        view = view.replace(/(\/[A-Za-z]{2}-[A-Za-z]{2}\/)(travel|)/g, "/");
                    }
                    // Logic to capture the Page name as Pending or Posted based on txn
                    if (view.search(/(\/transaction\/)/g) > -1) {
                        var status = s.getQueryParam("status");
                        if (status === "pending") {
                            view = "/transaction/pending";
                        } else if (status === "posted") {
                            view = "/transaction/posted";
                        } else if (view.search(/(\/transaction\/(?=[P]+\d+))/g) > -1) {
                            view = "/transaction/pending";
                        } else if (view.search(/(\/transaction\/(?=\d+))/g) > -1) {
                            view = "/transaction/posted";
                        }
                    }

                    // Logic to truncate the Transaction ID in the View while Editing / Deleting / Cancelling a payment
                    if (view.search(/^(\/payments\/(edit|delete|cancel)\/[^\/]+)$/g) > -1) {
                        view = view.replace(/\/(\w+)\/(\w+)\/(\S+)/g, "$1\/$2");
                    }
                    // Logic to truncate the Transaction ID in the Error View while Editing / Deleting / Cancelling a payment
                    if (view.search(/^(\/payments\/(edit|delete|cancel)\/[^\/]+\/error)$/g) > -1) {
                        view = view.replace(/\/(\w+)\/(\w+)\/(\S+)\/(\w+)/g, "$1\/$2\/$4");
                    }
                    // Logic to truncate the Transaction ID in the View while Reviewing / Confirming the Edit / Cancel / Delete Payment
                    if (view.search(/^(\/payments\/(edit|delete|cancel)\/[^\/]+\/(review|confirmation))$/g) > -1) {
                        view = view.replace(/\/(\w+)\/(\w+)\/(\S+)\/(\w+)/g, "$1\/$2\/$4");
                    }
                    // Logic to truncate the Transaction ID in the Error View while Reviewing / Confirming the Edit / Cancel / Delete Payment
                    if (view.search(/^(\/payments\/(edit|delete|cancel)\/[^\/]+\/(review|confirmation)\/error)$/g) > -1) {
                        view = view.replace(/\/(\w+)\/(\w+)\/(\S+)\/(\w+)\/(\w+)/g, "$1\/$2\/$4\/$5");
                    }
                    // Remove EEP from the card detail page name
                    if (view.search(/^(\/(credit-cards)\/(card)\/[^\/]+\/[\d{5}]+)$/g) > -1) {
                        view = view.replace(/\/(credit-cards)\/(card)\/(\S+)\/(\d+)/g, "$1\/$2\/$3");
                    }
                    // Remove EEP from cardshop VAC page
                    if (view.search(/^(\/(credit-cards)\/(view-all-personal-cards)\/[\d{5}]+)$/g) > -1) {
                        view = view.replace(/\/(credit-cards)\/(view-all-personal-cards)\/(\d+)/g, "$1\/$2");
                    }

                    /* remove leading and trailing "/" */
                    view = view.replace(/^[/]+|[/]+$/g, "");
                    /* convert "/" to "|" for pagename */
                    pn = view.replace(/[/]/g, '|');
                }
            }


            var digitalDataDiff = window['digitalData']['diff'], digitalDataEvents = window['digitalData']['events']
            if (typeof digitalDataDiff !== "undefined" && digitalDataDiff && digitalDataDiff.includes('events') &&
                typeof digitalDataEvents !== "undefined" && typeof digitalDataEvents[0] !== "undefined" &&
                digitalDataEvents[0].type === 'journey') {
                pn = pn + "|" + digitalDataEvents[0].element
            }

            if (pn)
                pagename = ((typeof country !== "undefined" && country !== "") ? country : "Unknown") + "|" + application + "|" + pn;
            else if (typeof digitalDataView != 'undefined' && digitalDataView && digitalDataView['location']) {
                pagename = digitalDataView['location'];
            }
            return pagename;
        }
        else if (checkIfOneCMSPage()) {
            var country = getCvPath('digitalData.page.pageInfo.country'.split('.')),
                businessUnit = getCvPath('digitalData.page.category.businessUnit'.split('.')),
                primaryCategory = getCvPath('digitalData.page.category.primaryCategory'.split('.')),
                subCategory1 = getCvPath('digitalData.page.category.subCategory1'.split('.')),
                subCategory2 = getCvPath('digitalData.page.category.subCategory2'.split('.')),
                subCategory3 = getCvPath('digitalData.page.category.subCategory3'.split('.')),
                pageName = getCvPath('digitalData.page.pageInfo.pageName'.split('.'));
            if (typeof country == 'string') {
                return country.toUpperCase() +
                    (typeof businessUnit == 'string' ? '|' + businessUnit : '') +
                    (typeof primaryCategory == 'string' ? '|' + primaryCategory : '') +
                    (typeof subCategory1 == 'string' ? '|' + subCategory1 : '') +
                    (typeof subCategory2 == 'string' ? '|' + subCategory2 : '') +
                    (typeof subCategory3 == 'string' ? '|' + subCategory3 : '') +
                    (typeof pageName == 'string' ? '|' + pageName : '');
            }
        }
    }
    return false;
}
//end IMP-3199

function getCvPath(path) {
    var obj = window;
    for (var Cvar in path) {
        if (!obj[path[Cvar]]) {
            return false
        }
        obj = obj[path[Cvar]];
    }
    return obj
}

function sendDataLayerVar() {

    for (var i = 0; i < window.ClickTaleSettings.PTC.CustomVariables.length; i++) {
        var cv = window.ClickTaleSettings.PTC.CustomVariables[i];
        var value;
        if (!!cv.path && !!cv.key) {
            var dataSource = getCvPath(cv.path.split('.'));
            value = !!dataSource && dataSource[cv.key];
        } else if (!!cv.getValue) {
            value = cv.getValue();
        }
        if (!!value) {
            window._uxa.push(['setCustomVariable', cv.slot, cv.displayName, value]);
        }

    }

}

window.ClickTaleOnStop = window.ClickTaleOnStop || [];
ClickTaleOnStop.push(sendDataLayerVar);
//sendDataLayerVar();

if (window.location.href.indexOf('#') > -1) {
    window._uxa.push(['setPath', window.location.pathname + window.location.hash.replace('#', '?__')])
}

if (window.location.href.toLowerCase().indexOf("/card-application/apply/") > -1 &&
    window.location.href.toLowerCase().indexOf("save-and-apply-confirmation") == -1 &&
    window.location.href.toLowerCase().indexOf("personalTimeout") == -1) {
    var step = '?__personal-information';
    window._uxa.push(['setPath', window.location.pathname + window.location.hash.replace('#', '?__') + step]);
    window.ClickTaleSettings.PTC.StepName = step;
}

if (window.location.href.toLowerCase().indexOf("/myca/oce/action/home") > -1) {
    window._uxa.push(['setPath', window.location.pathname + '?__/']);
}

if (window.location.href.toLowerCase().indexOf("acq/intl/dyna/japa/pers/begin.do") > -1) {
    var step = '?__START-APPLICATION';
    if (window.location.search.indexOf(':AU:') > -1) {
        step = '?__ABOUT-YOU';
    }
    window._uxa.push(['setQuery', step + window.location.search.replace('?', '&')]);
    window.ClickTaleSettings.PTC.StepName = step;
}

if (window.location.href.toLowerCase().indexOf("en-us/business/payment-solutions/supplier-payments/recover") > -1) {
    window._uxa.push(['setPath', window.location.pathname + '?__Step-1']);
    window.ClickTaleSettings.PTC.StepName = '?__Step-1';
}

if (window.location.href.toLowerCase().indexOf("/business-quiz") > -1 && !!document.querySelector('#questionContainer')) {
    var step = getCvPath('digitalData.page.pageInfo.pageName'.split('.'));
    step = !!step ? '?__' + step : '?__BusinessRevenue';
    window._uxa.push(['setPath', window.location.pathname + step]);
    window.ClickTaleSettings.PTC.StepName = step;
}

function addQueryForSupplierPaymentsDashboard() {
    if (window.location.href.toLowerCase().indexOf("en-us/business/payment-solutions/supplier-payments/dashboard") > -1 && window.location.href.indexOf('#') == -1) {
        var step = !!document.querySelector('[role="tablist"] button[aria-selected="true"]') && document.querySelector('[role="tablist"] button[aria-selected="true"]').id
        if (!!step) {
            window._uxa.push(['setPath', window.location.pathname + '?__' + step]);
            window.ClickTaleSettings.PTC.StepName = '?__' + step;
        }
    }
}

if (typeof ClickTaleSetAllSensitive === "function") {
    ClickTaleSetAllSensitive();
};

window.ClickTaleSettings.PTC.InitFuncs = window.ClickTaleSettings.PTC.InitFuncs || [];
window.ClickTaleSettings.PTC.InitFuncs.push(function () {
    var pcc = document.querySelector('script[src*="clicktale"][src*="pcc"],script[src*="contentsquare"][src*="pcc"]');
    if (pcc) {
        var versionmatch = pcc.src.match(/DeploymentConfigName=(.+)/i);
        if (versionmatch && typeof ClickTaleExec === 'function') {
            ClickTaleExec("console.info('" + versionmatch[0] + "');");
            ClickTaleEvent("Config: " + versionmatch[1].replace(/\&.+/, ''));
        }
    }
});

ClickTaleUploadPage();
window.ClickTaleSettings.PTC.UploadPageHappened = true;

var initFuncs = window.ClickTaleSettings.PTC.InitFuncs;
for (var i = 0, initLen = initFuncs.length; i < initLen; i++) {
    if (typeof initFuncs[i] === 'function') {
        initFuncs[i]();
    }
}

function checkIfOneCMSPage() {
    return !!document.querySelector('meta[name="AEM"]') || !!document.querySelector('meta[name="aem"]')
}
function checkIfOneAmexPage() {
    var contentEl1 = !!document.querySelector('meta[name="application-name"]') && document.querySelector('meta[name="application-name"]').getAttribute('content'),
        contentEl2 = !!document.querySelector('meta[name="keywords"]') && document.querySelector('meta[name="keywords"]').getAttribute('content');
    if ((typeof contentEl1 == 'string' && contentEl1.toLowerCase() == 'one-amex') ||
        (typeof contentEl2 == 'string' && contentEl2.toLowerCase() == 'one-amex')) {
        return true;
    }
    return false
}

if (checkIfOneAmexPage() || checkIfOneCMSPage()) {
    startCT();
}
else {
    setTimeout(function () {
        window.ClickTaleSettings.PTC.doOnlyWhen(startCT, function () {
            if (window.location.href.indexOf('acq/intl/dyna/japa/pers/begin.do') > -1) {
                if (!!document.querySelector('[class*="spinner"]')) {
                    return false;
                }
                else if (!!window['s'] && !!window['s']['pageName']) {
                    return true;
                }
                return false;
            }
            return true;
        }, 100, 250, startCT);
    }, 4000);
}

function startCT() {
    window.ClickTaleIncludedOnDOMReady = true;
    //functions that should run after the delay
    addQueryForSupplierPaymentsDashboard();
    sendDataLayerVar();
    ClickTaleGlobal.init.isAllowed && ClickTale(PID, Ratio, PartitionPrefix, SubsId);
    if ((typeof ClickTalePrevOnReady == 'function') && (ClickTaleOnReady.toString() != ClickTalePrevOnReady.toString())) {
        ClickTalePrevOnReady();
    }
}
return;
	// End of user-defined header code (PreInitialize)
    
	
	window.ClickTaleIncludedOnDOMReady=true;
	
	ClickTaleGlobal.init.isAllowed && ClickTale(PID, Ratio, PartitionPrefix, SubsId);
	
	if((typeof ClickTalePrevOnReady == 'function') && (ClickTaleOnReady.toString() != ClickTalePrevOnReady.toString()))
	{
    	ClickTalePrevOnReady();
	}
	
	
	// Start of user-defined footer code
	
	// End of user-defined footer code
	
}; 
(function() {
	var div = ClickTaleCreateDOMElement("div");
	div.id = "ClickTaleDiv";
	div.style.display = "none";
	document.body.appendChild(div);

	
		var wrScript = ClickTaleCreateDOMElement("script");
	wrScript.crossOrigin = "anonymous";
	wrScript.type = 'text/javascript';
		wrScript.async = true;
		if(ClickTaleGlobal.scripts.sri && ClickTaleGlobal.scripts.sri.hashes){
        wrScript.integrity = ClickTaleGlobal.scripts.sri.hashes.wr;
        wrScript.src = ClickTaleGlobal.scripts.sri.path + "wr.js";
	}else {
        wrScript.src = window.ClickTaleScriptSource + 'latest-WR110.js';
    }

	ClickTaleGlobal.init.isAllowed && document.body.appendChild(wrScript);
})();









//Signature:lvgvqX17xAYky753HxljrwO8XfhHUiC8ffBnEXprivQFXsU7dD0WF63VCv4bg72qlsqgxZxI/jqgWLsZp8OSh4RI33qe2RYY81afocNV2uLlwTxJ8C1SycWKJS5D9T1Zh5KapS6TkHcmZxYTX8ILkHSG1x+mUsM38ZSP9RBAvq8=
