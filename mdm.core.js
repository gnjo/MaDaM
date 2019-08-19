//history
//v1 make. first call
//v2 coded the mdm.def mdm.cmd mdm.man
//v3 coded mdm.lex
//v4 coded functions
;(function(root){
 let mdm=root.mdm||{}

 mdm.sd=mdm.sd||{} //.xxx //macro valiable set here. like a savedata.
 mdm.db=mdm.db||{} //.xxx //macro const data set here. like a database.
 mdm.md=mdm.md||{} //.xxx //madam system valiable set here. fps, lps, looptick, like a madam-data.
 mdm.fn=mdm.fn||{} //.xxx //useful functions
 mdm.is=mdm.is||{} //.xxx //is check
 mdm.re=mdm.re||{} //.xxx //regex

 //core function stab
 mdm.def=void 0 //command definition
 mdm.cmd=void 0 //command call return value the $00
 mdm.man=void 0 //command help
 mdm.lex=void 0 //macro parser on mac()
 mdm.mac=void 0 //macro read 
 mdm.css=void 0 //css setting on run()
 mdm.elm=void 0 //element setting on run()
 mdm.key=void 0 //key setting on run()
 mdm.mid=void 0 //mid setting on run(). futured ...

 mdm.fop=void 0 //frameloop. if call, draw layers.
 mdm.lop=void 0 //lineloop. if call, next cmdline.

 mdm.red=void 0 //commandline reader, do the mdm.cmd() 
 mdm.run=void 0 //only outer function. mdm.run(macrostring,fps,lps)

 root.mdm=mdm;
})(this);


//mdm.css values
;(function(mdm){
mdm.md.css=`
div.layer {
line-height: 1;
position: absolute;
color: white;
transition: background-image 0.7s ease;
background-image: url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7);
/*transparent*/
white-space: pre-wrap;
word-break: break-all;
font-family: monospace;
}
div.XXX {
background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2NgYGD4DwABBAEAcCBlCwAAAABJRU5ErkJggg==);/*black*/
}
div.X00 {
/*position: initial !important;*/
background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2NgYGD4DwABBAEAcCBlCwAAAABJRU5ErkJggg==);/*black*/
background-size: cover;
}
`;
 mdm.md.styleclass='madamstyle'
 
})(mdm); 

//document element utility
;(function(fn){
 ;
 function i3(d,doc=document){
  if(typeof d !=='string') return d
  var el=doc.createElement('table'); el.innerHTML=d.trim();
  var me=el.childNodes[0]
  el=void 0;
  return me
 }
 function fr(html='',doc=document){
  let flg = (typeof 'html' === 'string')
  ,e= (flg)?doc.createElement('table'): html||doc.createElement('table')
  ,fr=doc.createDocumentFragment()
  ;
  if(flg) e.innerHTML= html||'';
  ;[].slice.call(e.childNodes).forEach(d=>fr.appendChild(d))
  return fr;
 }
 ;
 fn.i3=i3
 fn.fr=fr
 fn.cfr=(s,doc=document)=>{return doc.createDocumentFragment()}
 fn.empty=(el)=>{while( el.firstChild ){el.removeChild( el.firstChild )} return el} 
 fn.g=(s,doc=document)=>{return doc.getElementById(s)};
 fn.gc=(s,doc=document)=>{return doc.getElementsByClassName(s)}
 fn.q=(s,doc=document)=>{return doc.querySelector(s)};
 fn.qa=(s,doc=document)=>{return [].slice.call(doc.querySelectorAll(s))}
 fn.r=(d)=>{return d.parentNode.removeChild(d)}
 fn.ce=(d,doc=document)=>{return doc.createElement(d)}
 fn.a2=function(me,p){p.appendChild(me);return me}
 fn.p2=function(me,p){p.insertBefore(me,p.firstElementChild/*p.firstChild*/); return me}
 fn.as2=function(me,p){p.parentNode.insertBefore(me,p.nextElementSibling/*nextSibling*/);return me}
 fn.ps2=function(me,p){p.parentNode.insertBefore(me,p);return me}
})(mdm.fn);

;(function(root){
 //coded the mdm.def, mdm.cmd, mdm.man 
 //
 let mdm=root.mdm||{}
 mdm.md.man={}
 mdm.md.cmds={}
 //cmd definition
 //definition. man set the text for command help. 
 mdm.def=(cmd,fn,man)=>{
  if(!cmd)return;
  if(!fn)return;
  mdm.md.man[cmd]=man||cmd+"//: man command Nothing" //command help
  mdm.md.cmds[cmd]=fn//all command definitions
  //console.log('defined ',mdm.md.cmds,cmd)
  return mdm;
 }
 //cmd done
 mdm.cmd=(cmd,ary)=>{
  if(!cmd)return;
  try{
   mdm.sd['$00']=mdm.md.cmds[cmd].apply(null,ary||[])
  }catch(e){
   //cmd call error
   mdm.sd['$00']=void 0;
   let mes='command call error! cmd param address line'
   console.error(e)
   console.error(mes,cmd,ary,mdm.sd['$$$'],mdm.md.n)
  }
  return mdm;
 }

 //command help to return value.
 mdm.man=(cmd)=>{
  if(!cmd)return Object.keys(mdm.md.man||{}).map(k=>mdm.md.man[k]).join('\n')
  if(!mdm.md.man[cmd])return cmd+'//: command not defined!'
  return mdm.md.man[cmd]
 }  
 root.mdm=mdm;
})(this);

//utility mdm.fn.addr
;(function(root){

 let re={}
 re.main=/@\w+/
 re.sub=/#\w+/
 re.line=/:\w+/
 re.num=/:(\d+)/
 re.disit=/^\d+$/
 let is={}
 is.number = function(obj){return toString.call(obj) === '[object Number]'}
 ;
 function entry(str){
  let o={}
  let _main="@notfound"
  ,_sub="#entrypoint"
  ,_line=":0"
  ,_num=0
  o.main=_main
  o.sub=_sub
  o.line=_line
  o.num=_num
  ;
  o.set=(_str)=>{
   let str=_str
   if(re.disit.test(str)) str=':'+_str //special
   //
   o.main=re.main.test(str)?str.match(re.main).pop():o.main
   o.sub=re.sub.test(str)?str.match(re.sub).pop():o.sub
   o.line=re.line.test(str)?str.match(re.line).pop():o.line
   o.num=re.num.test(str)?parseInt(str.match(re.num).pop()):o.num
   return o;
  }
  o.get=(opt)=>{
   if(!opt)return o.main+o.sub+o.line
   //@#: or n
   if(opt==='n')return o.num;
   let s=''
   if(/@/.test(opt)) s+=o.main
   if(/#/.test(opt)) s+=o.sub
   if(/:/.test(opt)) s+=o.line
   return s;
  }
  //  
  return o.set(str)
 }
 root.addr=entry;
 /*usage
 addr('@xyz').get()//fulladdress //@xyz#entrypoint:0
 addr('@xyz').set('#aaa').get('@#') //@xyz#aaa
 */
})(mdm.fn);

//mdm.lex
;(function(mdm){
 //let mdm=root.mdm||{}
 mdm.re.madam=/^[><$A-Z0-9]{3}/
 mdm.re.memory=/^$[0-9][0-9]/
 mdm.re.comment=/^\/\//
 mdm.re.scr0=/^\[\[\[|^\{\{\{/
 mdm.re.scr1=/^\]\]\]|^\}\}\}/
 //mdm.re.tailcomment=/\/\/(?:.*)$/
 //mdm.re.tailcomment=/(.{2}(?:[^\/\/]*)$|(?: \/\/.*$))/
 mdm.re.tailcomment=/(^\s*\/\/.*|\s*[^:]\/\/.*)/
 mdm.re.address=/^@/
 mdm.re.addressfill=/(#.+)/
 mdm.re.escapeaddress=/^X|^TXT|^COO|^IMG|^\[\[\[|^\{\{\{/
 mdm.re.ad=/^(@.*)|\n(@.*)/
 ;
 mdm.lex=function lex(text){
  //
  let re=mdm.re
  ,line=(re.ad.test(text))?text.match(re.ad).filter(d=>d).pop():''
  ,addr=mdm.fn.addr(line)
  ,ary=(line)?text.split('\n'):(addr.get('@#')+'\n'+text).split('\n')
  ,jumps={}
  ,wk=void 0
  ,f=(d)=>d.replace(re.tailcomment,'').trim()
  ,f2=(d,i)=>{
   //address replace
   if(re.escapeaddress.test(d))return d;
   let supply=addr.get('@#')
   let to=mdm.fn.addr(supply).set(d).get('@#')
   re.addressfill=/(@\w+#\w+)|(@\w+)|(#\w+)/
   let frm=re.addressfill.test(d)?d.match(re.addressfill).filter(d=>d).pop():to
   //console.log(frm,to)
   let d2=d.replace(frm,to)
   ,flg=/^<<<|^@|^MRK/.test(d2)&&/(@.+)/.test(d2)
   if(flg) jumps[to]=i;
   return d2;
  }
  //
  ary=ary.map((dd,i)=>{
   let d=f(dd)
   if(wk&&re.scr1.test(d)){let a=wk+'\n'+d; wk=void 0; return a}
   if(wk&&(!re.scr1.test(d))){ wk+='\n'+d; return ''}
   if(re.scr0.test(d)){ wk=d; return ''}
   if(re.address.test(d)){return f2(d,i)}
   if(re.madam.test(d)){return f2(d,i)}
   if(re.comment.test(d)){return d}
   return ''
  })
  ;
  return {data:ary,addr:addr.get('@#'),jumps:jumps}
 }

 //root.mdm=mdm;
})(mdm);
