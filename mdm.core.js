//history
//v1 make. first call
//v2 coded the mdm.def mdm.cmd mdm.man
//v3 coded mdm.lex
;(function(root){
 let mdm=root.mdm||{}
 
 mdm.sd=mdm.sd||{} //.xxx //macro valiable set here. like a savedata.
 mdm.db=mdm.db||{} //.xxx //macro const data set here. like a database.
 mdm.md=mdm.md||{} //.xxx //madam system valiable set here. fps, lps, looptick, like a madam-data.
 mdm.fn=mdm.fn||{} //.xxx //useful functions
 mdm.is=mdm.is||{} //.xxx //is check
 mdm.re=mdm.re||{} //.xxx //regex

 root.mdm=mdm;
})(this);

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

