// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

/*
* jQuery Highlight Regex Plugin v0.1.2
* https://github.com/jbr/jQuery.highlightRegex
*
* Based on highlight v3 by Johann Burkard
* http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html
*
* (c) 2009-13 Jacob Rothstein
* MIT license
*/(function(a){var b=function(c){if(!!c&&!!c.childNodes){var d=a.makeArray(c.childNodes),e=null;a.each(d,function(a,d){d.nodeType===3?d.nodeValue===""?c.removeChild(d):e!==null?(e.nodeValue+=d.nodeValue,c.removeChild(d)):e=d:(e=null,d.childNodes&&b(d))})}};a.fn.highlightRegex=function(c,d){typeof c=="object"&&c.constructor.name!=="RegExp"&&(d=c,c=undefined),typeof d=="undefined"&&(d={}),d.className=d.className||"highlight",d.tagType=d.tagType||"span",d.attrs=d.attrs||{},typeof c=="undefined"||c.source===""?a(this).find(d.tagType+"."+d.className).each(function(){a(this).replaceWith(a(this).text()),b(a(this).parent().get(0))}):a(this).each(function(){var e=a(this).get(0);b(e),a.each(a.makeArray(e.childNodes),function(e,f){var g,h,i,j,k,l;b(f);if(f.nodeType==3)while(f.data&&(j=f.data.search(c))>=0){k=f.data.slice(j).match(c)[0];if(k.length>0)g=document.createElement(d.tagType),g.className=d.className,a(g).attr(d.attrs),l=f.parentNode,h=f.splitText(j),f=h.splitText(k.length),i=h.cloneNode(!0),g.appendChild(i),l.replaceChild(g,h);else break}else a(f).highlightRegex(c,d)})});return a(this)}})(jQuery);

/*
* VerbalExpressions JavaScript Library v0.1.2
* https://github.com/jehna/VerbalExpressions
*
*
* Released under the MIT license
* http://jquery.org/license
*
* Date: 2013-07-19
* 
*/(function(){function t(){var e=new RegExp;t.injectClassMethods(e);return e}function n(){return new t}var e=this;t.injectClassMethods=function(e){for(var n in t.prototype){if(t.prototype.hasOwnProperty(n)){e[n]=t.prototype[n]}}return e};t.prototype={_prefixes:"",_source:"",_suffixes:"",_modifiers:"gm",sanitize:function(e){if(e.source)return e.source;if(typeof e==="number")return e;return e.replace(/[^\w]/g,function(e){return"\\"+e})},add:function(e){this._source+=e||"";this.compile(this._prefixes+this._source+this._suffixes,this._modifiers);return this},startOfLine:function(e){e=e!==false;this._prefixes=e?"^":"";this.add("");return this},endOfLine:function(e){e=e!==false;this._suffixes=e?"$":"";this.add("");return this},then:function(e){e=this.sanitize(e);this.add("(?:"+e+")");return this},find:function(e){return this.then(e)},maybe:function(e){e=this.sanitize(e);this.add("(?:"+e+")?");return this},anything:function(){this.add("(?:.*)");return this},anythingBut:function(e){e=this.sanitize(e);this.add("(?:[^"+e+"]*)");return this},something:function(){this.add("(?:.+)");return this},somethingBut:function(e){e=this.sanitize(e);this.add("(?:[^"+e+"]+)");return this},replace:function(e,t){e=e.toString();return e.replace(this,t)},lineBreak:function(){this.add("(?:\\r\\n|\\r|\\n)");return this},br:function(){return this.lineBreak()},tab:function(){this.add("\\t");return this},word:function(){this.add("\\w+");return this},anyOf:function(e){e=this.sanitize(e);this.add("["+e+"]");return this},any:function(e){return this.anyOf(e)},range:function(){var e="[";for(var t=1;t<arguments.length;t+=2){var n=this.sanitize(arguments[t-1]);var r=this.sanitize(arguments[t]);e+=n+"-"+r}e+="]";this.add(e);return this},addModifier:function(e){if(this._modifiers.indexOf(e)==-1){this._modifiers+=e}this.add("");return this},removeModifier:function(e){this._modifiers=this._modifiers.replace(e,"");this.add("");return this},withAnyCase:function(e){if(e!==false)this.addModifier("i");else this.removeModifier("i");this.add("");return this},stopAtFirst:function(e){if(e!==false)this.removeModifier("g");else this.addModifier("g");this.add("");return this},searchOneLine:function(e){if(e!==false)this.removeModifier("m");else this.addModifier("m");this.add("");return this},repeatPrevious:function(){var e;if(arguments.length<=1){if(/\d+/.exec(arguments[0])!==null){e="{"+arguments[0]+"}"}}else{var t=[];for(var n=0;n<arguments.length;n++){if(/\d+/.exec(arguments[n])!==null){t.push(arguments[n])}}e="{"+t.join(",")+"}"}this.add(e||"");return this},multiple:function(e){e=e.source?e.source:this.sanitize(e);if(arguments.length===1){this.add("(?:"+e+")*")}if(arguments.length>1){this.add("(?:"+e+")");this.add("{"+arguments[1]+"}")}return this},or:function(e){this._prefixes+="(?:";this._suffixes=")"+this._suffixes;this.add(")|(?:");if(e)this.then(e);return this},beginCapture:function(){this._suffixes+=")";this.add("(",false);return this},endCapture:function(){this._suffixes=this._suffixes.substring(0,this._suffixes.length-1);this.add(")",true);return this},toRegExp:function(){var e=this.toString().match(/\/(.*)\/([a-z]+)?/);return new RegExp(e[1],e[2])}};if(typeof module!=="undefined"&&module.exports){module.exports=n}else if(typeof define==="function"&&define.amd){define(function(){return t})}else{e.VerEx=n}}).call();

/*
* HTML5 Sortable jQuery Plugin
* http://farhadi.ir/projects/html5sortable
* 
* Copyright 2012, Ali Farhadi
* Released under the MIT license.
*/!function(a){var b,c=a();a.fn.sortable=function(d){var e=String(d);return d=a.extend({connectWith:!1},d),this.each(function(){if(/^enable|disable|destroy$/.test(e)){var f=a(this).children(a(this).data("items")).attr("draggable","enable"==e);return"destroy"==e&&f.add(this).removeData("connectWith items").off("dragstart.h5s dragend.h5s selectstart.h5s dragover.h5s dragenter.h5s drop.h5s"),void 0}var g,h,f=a(this).children(d.items),i=a("<"+(/^ul|ol$/i.test(this.tagName)?"li":"div")+' class="sortable-placeholder">');f.find(d.handle).mousedown(function(){g=!0}).mouseup(function(){g=!1}),a(this).data("items",d.items),c=c.add(i),d.connectWith&&a(d.connectWith).add(this).data("connectWith",d.connectWith),f.attr("draggable","true").on("dragstart.h5s",function(c){if(d.handle&&!g)return!1;g=!1;var e=c.originalEvent.dataTransfer;e.effectAllowed="move",e.setData("Text","dummy"),h=(b=a(this)).addClass("sortable-dragging").index()}).on("dragend.h5s",function(){b&&(b.removeClass("sortable-dragging").show(),c.detach(),h!=b.index()&&b.parent().trigger("sortupdate",{item:b}),b=null)}).not("a[href], img").on("selectstart.h5s",function(){return this.dragDrop&&this.dragDrop(),!1}).end().add([this,i]).on("dragover.h5s dragenter.h5s drop.h5s",function(e){return f.is(b)||d.connectWith===a(b).parent().data("connectWith")?"drop"==e.type?(e.stopPropagation(),c.filter(":visible").after(b),b.trigger("dragend.h5s"),!1):(e.preventDefault(),e.originalEvent.dataTransfer.dropEffect="move",f.is(this)?(d.forcePlaceholderSize&&i.height(b.outerHeight()),b.hide(),a(this)[i.index()<a(this).index()?"after":"before"](i),c.not(i).detach()):c.is(this)||a(this).children(d.items).length||(c.detach(),a(this).append(i)),!1):!0})})}}(jQuery);