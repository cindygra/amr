/*  Personalization ClickStream Service
 *  Approach : JSON ,JQUERY
 *  Date: 05/15/2013
 *  Ver 1 : ClickStream POC
 *  Ver 2 : 01/04/2014 - Updated for ClickStream POA
 *  Changes :
 *  1) Create urls for Http ClickStream service if page is http
 *  2) Check for Page's protocol
 *  3) Added Timeout
 *  4) Added Killswitch for ClickStreamService call
 *  5) Added the code for reading ITAG values
 *--------------------------------------------------------------------------*/

var ClickStreamService = (function () {

        // IE 8 String trim method fix
        if (typeof String.prototype.trim !== 'function') {
                String.prototype.trim = function() {
                        return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
                }
        }

        return {
                killCSCall: false,
                jsonStringData: "",
                pubGuidId: "NO_GUID",
                // pub guid matcher
                pubGuidPattern: /^[0-9a-f]{32}$/,
                clickStreamURL: "",
                clickStreamServiceURLS: ["https://e1qonline.americanexpress.com/offerservice/updatecustvisit/updateCustomerVisit/","e2qonline.americanexpress.com/offerservice/updatecustvisit/updateCustomerVisit/", "online.americanexpress.com/offerservice/updatecustvisit/updateCustomerVisit/"],
                jqueryURL: "",
                jqueryURLS: ["https://dstatic.dev.ipc.us.aexp.com/api/axpi/pzn/js/jquery/v1.8.2.1/jquery.src.js", "https://qwww.aexp-static.com/api/axpi/pzn/js/jquery/v1.8.2.1/jquery.min.js", "https://www.aexp-static.com/api/axpi/pzn/js/jquery/v1.8.2.1/jquery.min.js"],
                hierarchy: "",
                pageName: "",
                pmc: "",
                // only for testing
                env: "E1",
                products: "",
				conversionType: "",
                callTimeout: 1000,
                pageScheme: "",
                defScheme: "https",
                csTimeInterval: undefined,
                blockedValues: [["US|AMEX|Ser|SOA","CardAccountSummary"],["US|AMEX|Ser|Payments","PayBill:TY"],["US|AMEX|Home","USHomepage-Cardmember"],["US|AMEX|Ser","EnterpriseLogin"],["US|AMEX|Ser","EnterpriseLogout"],["US|AMEX|Ser|SOA","AccountHub"]],
				omnActionTypes:["US:Ser:eStatement:MainPage:Expand>ETDPosted","US:AMEX:Ser:SOA:AccountHub:Click>AddToCard","US:AMEX:Ser:SOA:AccountHub:Click>OffersViewDetails","US:Ser:Interstitial:Impression>UpdateIncome","US:Ser:Interstitial:Impression>UpdateIncomeConfirmation"],
                //jQuery changes

                jQuery: undefined,

                init: function () {
                        // init jQuery
                        this.jQuery = window.jQuery;

                        if (this.killCSCall) {
                                return;
                        }
                        this.pubGuidId = this.getCookie("blueboxpublic");

                        //Read omniture values
                        if (typeof window.omn_hierarchy !== 'undefined' || typeof window.omn_pagename !== 'undefined') {
                                this.pageName = window.omn_pagename;
                                this.hierarchy = window.omn_hierarchy;
                                this.products = (typeof window.omn_products !== 'undefined') ? window.omn_products : "";
                                this.pmc = (typeof window.omn_pmc !== 'undefined') ? window.omn_pmc : "";
								this.conversionType = "";
                        } else if (typeof window.omn !== 'undefined' && window.omn.hierarchy !== 'undefined') {
                                //Read Itag Values
                                this.pageName = (typeof window.omn.pagename !== 'undefined') ? window.omn.pagename : "";
                                this.hierarchy = (typeof window.omn.hierarchy !== 'undefined') ? window.omn.hierarchy : "";
                                this.products = (typeof window.omn.products !== 'undefined') ? window.omn.products : "";
                                this.pmc = (typeof window.omn.pmc !== 'undefined') ? window.omn.pmc : "";
								this.conversionType = "";
                        } else if (typeof window.digitalData  !== 'undefined' && typeof window.digitalData.page !== 'undefined') {
                                //Read data from digitalData

                                if(typeof window.digitalData.page.pageInfo !== 'undefined') {
                                        this.pageName = (typeof window.digitalData.page.pageInfo.pageName !== 'undefined') ? window.digitalData.page.pageInfo.pageName : "";

                                        country = (typeof window.digitalData.page.pageInfo.country !== 'undefined') ? window.digitalData.page.pageInfo.country : "";
                                        language = (typeof window.digitalData.page.pageInfo.language !== 'undefined') ? window.digitalData.page.pageInfo.language : "";
                                }

                                if(typeof window.digitalData.page.category !== 'undefined') {
                                        businessUnit = (typeof window.digitalData.page.category.businessUnit !== 'undefined') ? window.digitalData.page.category.businessUnit : "";
                                        primaryCategory = (typeof window.digitalData.page.category.primaryCategory !== 'undefined') ? window.digitalData.page.category.primaryCategory : "";
                                        subCategory1 = (typeof window.digitalData.page.category.subCategory1 !== 'undefined') ? window.digitalData.page.category.subCategory1 : "";
                                        subCategory2 = (typeof window.digitalData.page.category.subCategory2 !== 'undefined') ? window.digitalData.page.category.subCategory2 : "";
                                        subCategory3 = (typeof window.digitalData.page.category.subCategory3 !== 'undefined') ? window.digitalData.page.category.subCategory3 : "";
                                }



								//US|Online|Cardmember|SBS|Basic|Lending|BusinessForm

								if (country !== "" && businessUnit !== "" && primaryCategory !== ""){
									this.hierarchy = country + "|"
											+ businessUnit + "|"
											+ primaryCategory + "|"
											+ subCategory1 + "|"
											+ subCategory2 + "|"
											+ subCategory3 + "|"
											+ this.pageName;
								}

								if(typeof window.digitalData.event !== 'undefined' && window.digitalData.event.length > 0) {
								        if(typeof window.digitalData.event[0] !== 'undefined' && typeof window.digitalData.event[0].productInfo !== 'undefined' && window.digitalData.event[0].productInfo.length > 0) {
                                                this.products = (typeof window.digitalData.event[0].productInfo[0].productName !== 'undefined') ? window.digitalData.event[0].productInfo[0].productName : "";
                                                this.pmc = (typeof window.digitalData.event[0].productInfo[0].pmc !== 'undefined') ? window.digitalData.event[0].productInfo[0].pmc : "";
                                        }
                                }

                        } else {
                                return;
                        }
                        // return if hierarchy value is empty
                        if (!this.hierarchy) {
                                return;
                        }
                        this.checkPageScheme();
                        this.setEnvVariables();
                        jsonData = {
                                "publicGuid": this.pubGuidId,
                                "hierarchy": this.hierarchy,
                                "pagename": this.pageName,
                                "pmc": this.pmc,
                                "products": this.products
                        };
                        this.jsonStringData = this.stringify(jsonData);
                        //Check if this page is blocked List pages
						if(!this.isBlocked()){
                                this.submitRequest();
                        }
						//commented above if loop to block click stream call -April 2017
                        //if(false){
                        //        this.submitRequest();
                        //}
						
                        this.setCSInterval();
                },

                submitRequest: function () {

                        // Do not submit request if pugGuidId is empty or pubGuidId doesnt match pubGuidPattern
                        if (!this.pubGuidPattern.test(this.pubGuidId) || this.pageScheme == "http" ||
                !(this.jsonStringData && this.jsonStringData.trim().length > 0)) {
                                return;
                        }

                        // new changes
                        var that = this;
                        if (typeof this.jQuery !== 'undefined') {
                                this.callBackFn(this.clickStreamURL, this.jsonStringData);
                        } else {
                                var url = this.clickStreamURL;
                                var jsonData = this.jsonStringData;
                                // var callBackFunction = this.callBackFn;
                                element = document.createElement("script");
                                element.src = this.jqueryURL;
                                element.setAttribute("type", "text/javascript");
                                if (typeof element.onreadystatechange == 'undefined') {
                                        element.onload = function () {
                                                var $ = window.jQuery;
                                                $(function() {
                                                        that.callBackFn(url, jsonData);
                                                });
                                                //that.callBackFn(url, jsonData);
                                        };
                                } else {
                                        element.onreadystatechange = function () {
                                                var callBackExec = false;
                                                if ((this.readyState == 'complete' || this.readyState == 'loaded') && !callBackExec) {
                                                        callBackExec = true;
                                                        that.callBackFn(url, jsonData);
                                                }
                                        };
                                }
                                document.getElementsByTagName("head")[0].appendChild(element);
                        }
                },

                callBackFn: function (url, jsonData) {
                        var that = this;
                        if (window.XDomainRequest) {
                                if (this.env == "E1") {
                                        // set the clickstream url to E2
                                        this.clickStreamURL = this.getEnvServiceUrl(this.clickStreamServiceURLS[1]);
                                        url = this.clickStreamURL;
                                }
                                var xdr = new XDomainRequest();

                                /*xdr.open("POST", url);
                                // xdr.timeout = this.callTimeout;
                                xdr.onload = function () {};
                                xdr.onerror = function () {};
                                xdr.onprogress = function () {};
                                // xdr.ontimeout = function () {};
                                xdr.send("requestData=" + jsonData);*/

                                xdr.open("POST", url);
                                xdr.onload = function() {};
                                xdr.onprogress = function(){ };
                                xdr.ontimeout = function(){ };
                                xdr.onerror = function () { };
                                // IE abort fix (setting timeout)
                                setTimeout(function(){
                                        xdr.send("requestData=" + jsonData);
                                }, 100);

                        } else {
                                if (window.jQuery.support) {
                                        window.jQuery.support.cors = true;
                                }
                                var jqXHR = window.jQuery.ajax({
                                        type: 'POST',
                                        url: url,
                                        // timeout: that.callTimeout,
                                        crossDomain: true,
                                        data: {
                                                requestData: jsonData
                                        }
                                });
                        }
                },

                getCookie: function (name) {
                        var allCookies = document.cookie.split(';');
                        var tempCookie = '';
                        var cookieName = '';
                        var cookieValue = 'NO_GUID';
                        for (var i = 0; i < allCookies.length; i++) {
                                tempCookie = allCookies[i].split('=');
                                cookieName = tempCookie[0].replace(/^\s+|\s+$/g, '');
                                if (cookieName == name) {

                                        if (tempCookie.length > 1) {
                                                cookieValue = unescape(tempCookie[1].replace(/^\s+|\s+$/g, ''));
                                        }
                                        return cookieValue;
                                }
                                tempCookie = null;
                                cookieName = '';
                        }
                        return cookieValue;
                },

                setEnvVariables: function () {
                        var currURL = window.location.href;
                        if (currURL.indexOf(".com:") > -1) {
                                currURL = currURL.substring(currURL.indexOf("://") + 3, currURL.indexOf(".com:") + 9);
                        } else {
                                currURL = currURL.substring(currURL.indexOf("://") + 3, currURL.indexOf(".com/") + 4);
                        }
                        if (!((currURL.substr(0, 1) == "q") || (currURL.substr(0, 2) == "e2") || (currURL.substr(0, 4) == "ssoq") || (currURL.substr(0, 2) == "e1")) && (currURL.indexOf(".americanexpress") > -1)) {
                                this.env = "E3";
                                this.clickStreamURL = this.getEnvServiceUrl(this.clickStreamServiceURLS[2]);
                                this.jqueryURL = this.jqueryURLS[2];

                        } else if ((currURL.indexOf(".aexp") > -1)) {
                                //E1 -no https
                                this.env = "E1";
                                this.callTimeout = 2000;
                                this.clickStreamURL = this.clickStreamServiceURLS[0];
                                this.jqueryURL = this.jqueryURLS[0];
                        } else {
                                this.env = "E2";
                                this.callTimeout = 2000;
                                this.clickStreamURL = this.getEnvServiceUrl(this.clickStreamServiceURLS[1]);
                                this.jqueryURL = this.jqueryURLS[1];
                        }

                },

                getEnvServiceUrl: function (serviceUrl) {
                        var absoluteUrl = "";
                        if (this.pageScheme !== "") {
                                absoluteUrl = this.pageScheme + "://" + serviceUrl;
                        } else {
                                absoluteUrl = this.defScheme + "://" + serviceUrl;
                        }
                        return absoluteUrl;
                },
                checkPageScheme: function () {
                        // Current Page Protocol
                        var currURL = window.location.href;
                        var scheme = currURL.substring(0, currURL.indexOf("://"));
                        if (scheme == "http" || scheme == "https") {
                                this.pageScheme = scheme;
                        }
                },

                setCSInterval: function() {
                        // new changes
                        var omn = {},
                                temp_omn = {};
                        omn.pagename = (window.omn ? window.omn.pagename : undefined);
                        omn.hierarchy = (window.omn ? window.omn.hierarchy : undefined);
						omn.omnActionValue = (window.s_rmact ? window.s_rmact : undefined);

                        temp_omn.pagename = undefined;
                        temp_omn.hierarchy = undefined;

                        var pagename = window.omn_pagename,
                                hierarchy = window.omn_hierarchy,
                                temp_pagename = undefined,
                                temp_hierarchy = undefined,
                                that = this,
                                isChanged = false;

						var	isOmnActionType = false;
						var isOmnAction = false;

                        this.csTimeInterval = setInterval(function() {
                                temp_omn.pagename = (window.omn ? window.omn.pagename : undefined);
                                temp_omn.hierarchy = (window.omn ? window.omn.hierarchy : undefined);
								temp_omn.conversionType = (window.omn ? window.omn.conversionType : undefined);
								temp_omn.omnActionValue = (window.s_rmact ? window.s_rmact : undefined);

                                temp_pagename = window.omn_pagename;
                                temp_hierarchy = window.omn_hierarchy;

                                // Reset pubGuidId
                                if (that.pubGuidId == 'NO_GUID') {
                                        that.pubGuidId = that.getCookie("blueboxpublic");
                                }

                                if (pagename != temp_pagename || hierarchy != temp_hierarchy) {
                                        isChanged = true;
                                        pagename = temp_pagename;
                                        hierarchy = temp_hierarchy;

                                        that.pageName = pagename;
                                        that.hierarchy = hierarchy;
                                } else if (omn.pagename != temp_omn.pagename || omn.hierarchy != temp_omn.hierarchy){
                                        isChanged = true;
                                        omn.pagename = temp_omn.pagename;
                                        omn.hierarchy = temp_omn.hierarchy;
										omn.conversionType = temp_omn.conversionType
                                        if (omn.pagename == pagename && omn.hierarchy == hierarchy) {
                                                isChanged = false;
                                                return;
                                        }
                                        that.pageName = omn.pagename;
                                        that.hierarchy = omn.hierarchy;
										that.conversionType = omn.conversionType;
                                }

								isOmnActionType = that.isOmnActionTypes(temp_omn.omnActionValue);								
								if(isOmnActionType){
									if(omn.omnActionValue != temp_omn.omnActionValue){
										isOmnAction = true;
										omn.omnActionValue = temp_omn.omnActionValue
										that.actionValue = omn.omnActionValue;
									}
								}

                                if (isChanged || isOmnAction) {
                                        isChanged = false;
										isOmnAction = false;
                                        if (!that.hierarchy) {
                                                return;
                                        }
                                        if(that.isBlocked()){
                                                return;
                                        }
                                        jsonData = {
                                                "publicGuid": that.pubGuidId,
                                                "hierarchy": that.hierarchy,
                                                "pagename": that.pageName,
                                                "pmc": that.pmc,
                                                "products": that.products,
												"omnActionValue": that.actionValue
                                        };
                                        that.jsonStringData = that.stringify(jsonData);
                                        //commenting below line  to block click stream call
										//that.submitRequest();
                                }
                        }, 1000);
                },

                isBlocked: function(){
                        for(var kount = 0; kount != this.blockedValues.length; kount++){
                                //If hierarchy && pagename matches then this CS call needs to be blocked
                                if(this.hierarchy == this.blockedValues[kount][0] && this.pageName == this.blockedValues[kount][1]){
                                        return true;
                                }
                        }
                        return false;
                },

                /*
                 * Returns true if pub guid id matches the required pattern, else false
                 *
                 */
                isPubGuidMatched: function() {
                        if (this.pubGuidPattern.test(this.pubGuidId)) {
                                return true;
                        }
                        return false;
                },
				isOmnActionTypes: function(OmnActionName){
                        for(var count = 0; count != this.omnActionTypes.length; count++){                               
                                if(OmnActionName == this.omnActionTypes[count]){
                                        return true;
                                }
                        }
                        return false;
                },
                stringify: (function () {

                        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                                escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                                gap, indent, meta = {
                                        '\b': '\\b',
                                        '\t': '\\t',
                                        '\n': '\\n',
                                        '\f': '\\f',
                                        '\r': '\\r',
                                        '"': '\\"',
                                        '\\': '\\\\'
                                }, rep;

                        function quote(string) {
                                escapable.lastIndex = 0;
                                return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
                                        var c = meta[a];
                                        return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16))
                                                .slice(-4);
                                }) + '"' : '"' + string + '"';
                        }

                        function str(key, holder) {
                                var i, // The loop counter.
                                        k, // The member key.
                                        v, // The member value.
                                        length, mind = gap,
                                        partial, value = holder[key];
                                if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
                                        value = value.toJSON(key);
                                }
                                if (typeof rep === 'function') {
                                        value = rep.call(holder, key, value);
                                }
                                switch (typeof value) {
                                case 'string':
                                        return quote(value);

                                case 'number':
                                        return isFinite(value) ? String(value) : 'null';
                                case 'boolean':
                                case 'null':
                                        return String(value);
                                case 'object':
                                        if (!value) {
                                                return 'null';
                                        }
                                        gap += indent;
                                        partial = [];
                                        if (Object.prototype.toString.apply(value) === '[object Array]') {
                                                length = value.length;
                                                for (i = 0; i < length; i += 1) {
                                                        partial[i] = str(i, value) || 'null';
                                                }
                                                v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
                                                gap = mind;
                                                return v;
                                        }
                                        if (rep && typeof rep === 'object') {
                                                length = rep.length;
                                                for (i = 0; i < length; i += 1) {
                                                        if (typeof rep[i] === 'string') {
                                                                k = rep[i];
                                                                v = str(k, value);
                                                                if (v) {
                                                                        partial.push(quote(k) + (gap ? ': ' : ':') + v);
                                                                }
                                                        }
                                                }
                                        } else {
                                                for (k in value) {
                                                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                                                                v = str(k, value);
                                                                if (v) {
                                                                        partial.push(quote(k) + (gap ? ': ' : ':') + v);
                                                                }
                                                        }
                                                }
                                        }
                                        v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
                                        gap = mind;
                                        return v;
                                }
                        }

                        return function (value, replacer, space) {

                                if (typeof JSON !== 'undefined' && typeof JSON.stringify !== 'undefined') {

                                        return JSON.stringify(value, replacer, space);
                                }

                                var i;
                                gap = '';
                                indent = '';
                                if (typeof space === 'number') {
                                        for (i = 0; i < space; i += 1) {
                                                indent += ' ';
                                        }
                                } else if (typeof space === 'string') {
                                        indent = space;
                                }
                                rep = replacer;
                                if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
                                        throw new Error('JSON.stringify');
                                }
                                return str('', {
                                        '': value
                                });
                        };
                })()
        };
})();
window.ClickStreamService = ClickStreamService;
ClickStreamService.init();
