// <![CDATA[
if(NAV==null||typeof(NAV)=="undefined"){
    var NAV=new Object()
}
NAV.RWD={
    body:document.getElementsByTagName('body')[0],
    head:document.getElementsByTagName('head')[0],
    rwdView:false,
    deviceBucket:"large",
    deviceWidth:null,
    roundedWidth:null,
    isIE10:false,
    init:function(){
        var b=/*@cc_on!@*/false;
        var c=0;/*@cc_on if(/^10/.test(@_jscript_version)){c=10}@*/;
        if(b==true){
            if(c==10) {
                NAV.RWD.body.className+=' ie10';NAV.RWD.isIE10=true
            }
        }
        if(NAV.RWD.body.className.match(/AXP_Responsive/i)){
            NAV.RWD.checkMetroMode();
            NAV.RWD.rwdView=true;
            NAV.RWD.deviceWidth=document.documentElement.clientWidth;
            NAV.RWD.roundedWidth=NAV.RWD.roundWidth(NAV.RWD.deviceWidth);
            NAV.RWD.setupClient(NAV.RWD.deviceWidth);
            window.onresize=function(a){
                NAV.RWD.deviceWidth=document.documentElement.clientWidth;
                NAV.RWD.roundedWidth=NAV.RWD.roundWidth(NAV.RWD.deviceWidth);
                NAV.RWD.setupClient(NAV.RWD.deviceWidth)
            }
        }
    },
    deviceBucketer:function(a){
        var b="large";
        if(a<831){
            if(a<661){
                b="small"
            }else{
                b="medium"
            }
        }else{
            b="large"
        }
        return b
    },
    roundWidth:function(a){
        var b=0;
        a%100>50?b=50:0;
        return Math.min(Math.floor(a/100)*100)+b
    },
    capitalize:function(a){
        return a.charAt(0).toUpperCase()+a.slice(1).toLowerCase()
    },
    setupClient:function(a){
        NAV.RWD.deviceBucket=NAV.RWD.deviceBucketer(a);
        var b=NAV.RWD.head.getElementsByTagName('link');
        if(b.length!=0){
            for(j=0;j<b.length;j++){
                var c=b[j].getAttribute('data-device-bucket');
                if(c){
                    if(c==NAV.RWD.deviceBucket){
                        b[j].href=b[j].getAttribute('data-css-uri');
                        b[j].setAttribute('data-device-bucket',c+'-loaded')
                    }
                }
            }
        }
        NAV.RWD.deviceBucket=NAV.RWD.capitalize(NAV.RWD.deviceBucket);
        NAV.RWD.body.className=NAV.RWD.body.className.replace(/\bres_.*?\b/g,'');
        NAV.RWD.body.className+=" res_"+NAV.RWD.deviceBucket;
        NAV.RWD.body.className+=" res_"+NAV.RWD.roundedWidth
    },
    isPluginSupport:function(){
        var a=null;try{
            a=!!new ActiveXObject("htmlfile")
        }catch(e){
            a=false
        }
        return a
    },
    checkMetroMode:function(){
        if(NAV.RWD.isIE10){
            if(!isPluginSupport()){
                if(document.documentElement.clientWidth>660){
                    var b=document.createElement("style");
                    b.setAttribute('type','text/css');
                    b.appendChild(document.createTextNode("@-ms-viewport {width: device-width; }"));
                    try{
                        NAV.RWD.head.insertBefore(b,NAV.RWD.head.childNodes[1])
                    }catch(e){
                        NAV.RWD.head.appendChild(b)
                    }
                }
            }
        }
        function isPluginSupport(){
            var a=null;
            try{
                a=!!new ActiveXObject("htmlfile")
            }catch(e){
                a=false
            }
            return a
        }
    }
};
NAV.RWD.init();
// ]]>
