//mdm core. red mac run
;(function(mdm){
 //read the macro on the lineloop
 
 //
 //
 mdm.red=(_str)=>{
  if(!_str)return;
  //mdm.md.readblock=1;
  let str=_str
  ,cmd=str.slice(0,3)//str.split(' ').slice(0,1).pop()
  ,ary=str.slice(4).match(mdm.re.cmdlinesplit)||[] //str.split(' ').slice(1)
  ;
  //wrap case quick return
  if(mdm.is.wrapjs(str)&&(mdm.md.cmds['{{{'])){
   mdm.cmd('{{{',[mdm.fn.trimwrap(str)])
   return;
  }
  if(mdm.is.wrapstring(str)&&(mdm.md.cmds['[[['])){
   //console.log('before',str)
   //console.log('after',mdm.fn.trimwrap(str))
   mdm.cmd('[[[',[mdm.fn.trimwrap(str)])
   return;
  }
  //do the oneline
  ary=ary.map(d=>{ 
   if(mdm.is.wrapstring(d)&&(mdm.md.cmds['[[['])){
    let a= mdm.cmd('[[[',[mdm.fn.trimwrap2(d)])
    return mdm.sd['$00']
   }
   if(mdm.is.wrapjs(d)&&(mdm.md.cmds['{{{'])){
    mdm.cmd('{{{',[mdm.fn.trimwrap2(d)])
    return mdm.sd['$00']
   }
   return d;
  })

  //layer case X00...X09
  if(mdm.is.layer(cmd)&&(mdm.md.cmds['LAY'])){
   ary.unshift(cmd)
   mdm.cmd('LAY',ary)
   return;   
  }
  //madamvalue case $00...$XX
  if(mdm.is.madamvalueline(str)){
   let ch=mdm.fn.get4(str)
   if(!(ch===' '))ary.unshift(ch)
   ary.unshift(cmd)
   //set case
   if(ch===' '||mdm.is.madamvalue(str)){ //mdm.is.madamvalue(str) is reset case.
    cmd='SET'
    //ary=str.split(' ')
   }
   if(mdm.is.mathhand(ch)){
    //ary.unshift(cmd)//let mathcmdline=str.replace(ch,' '+ch+' ')
    cmd='MTH'
    //ary=mathcmdline.split(' ')
   }
   if(mdm.md.cmds[cmd]) mdm.cmd(cmd,ary)
   return;
  }

  //other command case
  //console.log(mdm.md.cmds,mdm.md.cmds[cmd],cmd,ary)
  if(mdm.md.cmds[cmd]) mdm.cmd(cmd,ary)
  return;
  //mdm.md.readblock=0;
 }

 //macro read
 mdm.mac=(str,moveflg)=>{
 
  let flg=(moveflg)?1:0
  ,ret=mdm.lex(str) //macro lex
  ,a=mdm.fn.addr(ret.addr)
  ,at=a.get('@')  
  mdm.md.macros[at]=ret.data  
  mdm.md.jumps=Object.assign({},mdm.md.jumps,ret.jumps)
  //
  //console.log(str); 
  //console.log(ret.data.join('\n'))
  //
  if(flg){
   //strong jump
   mdm.md.n=mdm.md.jumps[a.get('@#')]
   mdm.md.nowmacro=at
   mdm.sd['$$$']=a.set(mdm.md.n).get() //ret.addr+':'+mdm.md.n//#xxxxx
   //console.log(mdm.sd['$$$'],mdm.md.n)
   //console.log(mdm.md.macros[at],mdm.md.n,mdm.md.nowmacro)
  }
  return mdm;
 }

 //sequence the inner
 mdm.run=(str,fps,lps)=>{
  mdm.css().elm().key().mid().mac(str,1)
  ;
  mdm.md.fps=fps||mdm.md.fps
  mdm.md.lps=lps||mdm.md.lps
  ;
  mdm.md.cf=setInterval(()=>{ 
   mdm.md.f=mdm.fn.safetick(mdm.md.f)
   mdm.fop(mdm.md.f) //frameloop on fps
  },1000/mdm.md.fps)
  ;
  mdm.md.lf=setInterval(()=>{
   mdm.md.l=mdm.fn.safetick(mdm.md.l)
   mdm.lop(mdm.md.l) //lineloop on lps 
  },1000/mdm.md.lps)
  //console.log(ret,mdm.md)
 }

})(mdm);

//LAY TXT IMG COO CLR
;(function(mdm){
 //define LAY, X00-X09
 mdm.def('LAY',(l,x,y,z,w,h,c)=>{
  let el=mdm.sd[l];
  let f=(d)=>d+mdm.md.unit
  let f2=(d)=>mdm.is.number(d)
  //0 fail..
  if(x)el.style.left=f(x)
  if(y)el.style.top=f(y)
  if(z)el.style.zIndex=z //without unit
  if(w)el.style.width=f(w)
  if(h)el.style.height=f(h)
  if(c)el.style.backgroundImage=`url(${mdm.fn.p1x1(c)})`
  //
  el.flg=1;
  if(mdm.is.X00(l)){//special fit
   let x='XXX'
   mdm.sd[x].style.left='initial'
   mdm.sd[x].style.top='initial'
   mdm.sd[x].style.zIndex=el.zIndex
   mdm.sd[x].style.width= el.style.width
   mdm.sd[x].style.width= el.style.height
   mdm.sd[x].style.width= el.style.backgroundImage

   mdm.sd[x].style.color='initial'
   mdm.sd[x].flg=1
  }
  return l;
 },'X00 x y z w h c//: set layer. X00...X09 "xywh" is unit the rem. position and default color set. z is z-index. c is hexcolor.')
 ;
 mdm.def('TXT',(s,l)=>{
  if(mdm.is.XXX(l))return s;
  let el=mdm.sd[mdm.fn.nulltoX00(l)]
  let text=mdm.is.madamvalue(s)?mdm.sd[s]:s
  el.textContent=(text==null)?'':text //output the 0
  //console.log(el.textContent,s)
  el.flg=1
  return s;
 },'TXT D X //:draw the text. D is text. X is layer. if without X, default X00')
 ;
 mdm.def('IMG',(c,l)=>{
  //console.log(c)
  if(mdm.is.XXX(l))return l;
  let el=mdm.sd[mdm.fn.nulltoX00(l)]
  let u=mdm.is.color(c)?mdm.fn.p1x1(c):c
  el.style.backgroundImage=`url(${u})`
  el.flg=1;
  return c;
 },'IMG D X //:draw the image. D is hexcolor or image. X is layer.')
 ;
 mdm.def('COO',(c,l)=>{
  if(mdm.is.XXX(l))return l;
  let el=mdm.sd[mdm.fn.nulltoX00(l)]
  el.style.color=c||'#fff'
  el.flg=1;
  return c;
 },'COO H X ://set the font color, H is hexcolor, X is layer.')
 ;
 mdm.def('CLR',(l,o)=>{
  if(mdm.is.XXX(l))return l;
  let cc=(mdm.is.X00(l)||(!l))?'#000':'transparent'
  ,lay=mdm.fn.nulltoX00(l)
  ,el=mdm.sd[lay]
  ,defcolor='#fff'
  ,f=()=>mdm.md.layernames.filter(k=>k!=lay).map(k=>{

   mdm.sd[k].textContent=''
   //mdm.sd[k].innerHTML=''
   let cc=(!(mdm.is.X00(k)||mdm.is.XXX(k)))?'transparent':'#000'
   //if(!(k==='X00'||k==='XXX')) cc='transparent'
   mdm.sd[k].style.backgroundImage=`url(${mdm.fn.p1x1(cc)})`;
   mdm.sd[k].style.color=defcolor
   mdm.sd[k].flg=1;
  })
  ;
  if(o==='TXT'||(!o)){
   el.textContent=''
   el.style.color=defcolor
   //el.innerHTML=''
  }
  if(o==='IMG'||(!o))el.style.backgroundImage=`url(${mdm.fn.p1x1(cc)})`
  el.flg=1;
  mdm.sd[lay]=el;
  if((o==='TXT'||(!o))&&mdm.is.X00(lay))f()
  ;
  return lay;
 },'CLR X //:text and image clear and set font color white. X is layer. "CLR" is all layer clear.')

})(mdm);

//most core cmd, <<< MRK >>> IFJ
;(function(mdm){
 ;
 mdm.def('<<<',(tar)=>{
  let a=mdm.fn.addr(tar).set(mdm.md.n)
  if(tar) mdm.sd['$$$']=a.get()//tar+':'+mdm.md.n
  //console.log('<<< '+tar)
  return mdm.sd['$$$'];
 },'<<< #xx //:same mean the "MRK #xx"')
 ;
 mdm.def('MRK',(tar)=>{
  return mdm.cmd('<<<',[tar]) //same mean <<<
 },'MRK #xx //:same mean the "<<< #xx"')
 ;
 mdm.def('>>>',(tar)=>{
  //tar
  let a =(tar)?tar:mdm.md.jumpstack.pop()
  //if jump back notfound is silent
  if(!tar){//jump back route
   if(!a){ console.log("jump back notfound",mdm.sd['$$$']); return mdm.sd['$$$']}
   //let info=mdm.fn.addressinfo(a)
   let ad=mdm.fn.addr(a)
   mdm.md.n=ad.get('n')//info[2] ///
   mdm.md.nowmacro=mdm.md.macros[ad.get('@')]//mdm.md.macros[info[0]]
   mdm.sd['$$$']=ad.get()//a;
   //console.log(a)
   return mdm.sd['$$$']
  }else{
   //let info=mdm.fn.addressinfo(a+':'+mdm.md.n)
   let ad=mdm.fn.addr(a).set(mdm.md.n)
   mdm.md.n=mdm.md.jumps[ad.get('@#')]//mdm.md.jumps[info[0]+info[1]] //0//now line
   mdm.md.nowmacro=mdm.md.macros[ad.get('@')]//mdm.md.macros[info[0]]
   mdm.sd['$$$']=ad.set(mdm.md.n).get() //info[0]+info[1]+':'+mdm.md.n//#xxxxx
   //console.log(a,mdm.sd['$$$'])
   return mdm.sd['$$$']
  }
 },'>>> #xx //:jump to #xx. if ">>>" only the jump for back. after calculated for the full address.')
 ;
 mdm.def('IFJ',(c,j)=>{
  if(!c)return c;
  if(!j)return c;
  //console.log(mdm.sd['$$$'])
  //set back check
  //console.log('IFJ',c,j)
  if(/^>>>/.test(j)){
   let cmdline=j.trim().slice(3,-3).trim()
   mdm.red(cmdline)
   //console.log(cmdline)
   return mdm.sd['$00']
  }
  //
  mdm.md.jumpstack.push(mdm.sd['$$$'])
  return mdm.cmd('>>>',[j]);
 },'IFJ X #1 //:if(X) jump to #1. "IFJ 1 #1" same mean the ">>> #1"')
 ;
})(mdm);

//cmd SLP KEY KLR
;(function(mdm){
 //mdm.md.readblock
 ;
 mdm.def('SLP',(rate,opt)=>{
  //console.log(mdm.md.readblock)
  //opt is ms or fps
  let type=(opt)?opt:"ms"
  let r=rate||1
  let ms=(type==='fps')?r*1000/mdm.md.fps:r
  setTimeout(()=>{ mdm.md.readblock=mdm.md.keyblock=0; },ms)
  mdm.md.readblock=mdm.md.keyblock=1;  
  //console.log('slp',ms)
 },'SLP T O //: read blocking, key blocking, while the T ms, unit the O is "ms" or "fps".')
 ;
 mdm.def('KEY',()=>{
  mdm.md.readblock=1;
  mdm.fn.dde('keydown',(e)=>{
   mdm.md.readblock=0;
   mdm.sd["$00"]=e.which//set return value
  },{once:true})

 },'KEY * //: pressed anykey. read blocking. catch keycode into $$0 or $00. keycode the keydown e.which.')
 ;
 mdm.def('KLR',()=>{
  mdm.sd['$$0']=void 0
  mdm.sd['$$1']=void 0
  return void 0
 },'KLR //: key clear $$0 $$1')
 ;
})(mdm);

//cmd SET MTH, Need early define the IFJ.
;(function(mdm){
 mdm.def('SET',(a,b)=>{
  if(!a)return void 0
  if(!b)return mdm.sd[a]=void 0 //reset the value
  let v=mdm.is.madamvalue(b)?mdm.sd[b]:b
  return mdm.sd[a]=v
 },'SET X Y //: X=Y. same mean "X Y". the X range $00...$ZZ')
 ;
 mdm.def('MTH',(tar,ch,a,b)=>{
  //console.log('MTH',tar,ch,a,b)
  let is={}
  is.number = function(obj){return toString.call(obj) === '[object Number]'}
  is.NaN = function(obj){return is.number(obj) && obj !== +obj}  
  let aa=mdm.is.madamvalue(a)?mdm.sd[a]:a //bug fix

  if(mdm.is.mathexist(ch)){
   //$00?#1 
   let flg=(mdm.sd[tar])?true:false
   flg=(ch==='?')?flg:(!flg)
   mdm.cmd('IFJ',[flg,a])//a
   return flg
  }
  if(mdm.is.mathcompare(ch)){
   //console.log(mdm.sd[tar],a)
   aa=/^\d+$/.test(aa)?parseInt(aa):aa
   let flg=(mdm.sd[tar]===aa)?true:false //ch==='='
   flg=(ch==='>')?(mdm.sd[tar]>aa):flg
   flg=(ch==='<')?(mdm.sd[tar]<aa):flg
   mdm.cmd('IFJ',[flg,b])//b
   return flg
  }
  if(mdm.is.math(ch)){
   //$00+1 //b option not
   let num=parseInt(aa)
   let tarnum=parseInt(mdm.sd[tar])
   tarnum=is.NaN(tarnum)?0:tarnum
   let rtn=tarnum+num //same + 
   rtn=(ch==='-')?(tarnum-num):rtn
   rtn=(ch==='%')?Math.abs(tarnum%num):rtn
   rtn=is.NaN(rtn)?0:rtn //modulo output NaN recover. if 100%0 is NaN
   mdm.sd[tar]=rtn;
   //if(ch==='%')console.log(mdm.sd[tar])
   return rtn;
  }
  console.error('MTH exception:',ch,tar,a,b,mdm.sd['$$$'])
 },'MTH c X J //: math hand short the "$11+1". c is ?!=<>+-%. the X range $00...$ZZ. if "?!=><" compare and jump to J.')
 ;

})(mdm);

//cmd {{{ and [[[
;(function(mdm){
 mdm.def('{{{',(s)=>{
  //console.log('{{{',s)
  return eval(s)
 },'{{{ //: javascript wrap and eval. multiline {{{\\n ... }}} or oneline {{{ 1+3 }}} on other command.')
 ;
 mdm.def('[[[',(s)=>{
  //console.log('[[[',s)  
  let valiable=/\%\$[\$0-9A-Z][\$0-9A-Z]/g
  let t=s.replace(valiable,(a)=>mdm.sd[a.slice(1)]||'') //if md.sd[xxx] is void 0, output the ''
  //console.log('[[[',t)
  return t;
 },'[[[ //: multi string wrap. if use madamvalue($00...$ZZ) with "%", "[[[ %$00 ]]]". oneline canable.')
 ;
})(mdm);

//cmd END
;(function(mdm){
 mdm.def('END',(comment)=>{
  ;
  setTimeout(()=>{
   clearInterval(mdm.md.lf)  
   clearInterval(mdm.md.cf)
   if(comment) console.log(comment,mdm.sd['$$$'])
  },2*1000/mdm.md.fps)
  ;
 },'END C //: abort the macro. stop frameloop and lineloop. C is console.log(C).')
})(mdm);

//cmd CNT
;(function(mdm){
 ;
 mdm.def('CNT',()=>{
  let f=mdm.md.f
  ,count=Math.abs(f%mdm.md.fps)
  return count;
 },'CNT //:fps count for modulo. if fps 20, 0...19...0...19 the looped.')
 ;
})(mdm);

//cmd SEL
;(function(mdm){
 mdm.fn.modulo=(a,b)=>{return Math.abs(a%b) }
 mdm.def('SEL',(t,s,c,l)=>{
  //console.log('SEL',t,s,c,l)
  let f=(d)=>mdm.is.madamvalue(d)?mdm.sd[d]:d
  let tt=f(t)
  let ary=tt.split('\n')
  let ss=mdm.fn.modulo(parseInt(f(s)),ary.length)
  let cc=f(c)
  let sp='　'
  let ll=f(l)
  //console.log('SEL',tt,ss,cc,ll)
  let txt=ary.map((d,i)=>{return (i===ss)?(cc+d):(sp+d) }).join('\n')
  //console.log(txt)
  return mdm.cmd('TXT',[txt,ll])
 })
})(mdm);



//LAY TXT IMG COO CLR
;(function(mdm){
 //define LAY, X00-X09
 mdm.def('LAY',(l,x,y,z,w,h,c)=>{
  let el=mdm.sd[l];
  let f=(d)=>d+mdm.md.unit
  let f2=(d)=>mdm.is.number(d)
  //0 fail..
  if(x)el.style.left=f(x)
  if(y)el.style.top=f(y)
  if(z)el.style.zIndex=z //without unit
  if(w)el.style.width=f(w)
  if(h)el.style.height=f(h)
  if(c)el.style.backgroundImage=`url(${mdm.fn.p1x1(c)})`
  //
  el.flg=1;
  if(mdm.is.X00(l)){//special fit
   let x='XXX'
   mdm.sd[x].style.left='initial'
   mdm.sd[x].style.top='initial'
   mdm.sd[x].style.zIndex=el.zIndex
   mdm.sd[x].style.width= el.style.width
   mdm.sd[x].style.width= el.style.height
   mdm.sd[x].style.width= el.style.backgroundImage

   mdm.sd[x].style.color='initial'
   mdm.sd[x].flg=1
  }
  return l;
 },'X00 x y z w h c//: set layer. X00...X09 "xywh" is unit the rem. position and default color set. z is z-index. c is hexcolor.')
 ;
 mdm.def('TXT',(s,l)=>{
  if(mdm.is.XXX(l))return s;
  let el=mdm.sd[mdm.fn.nulltoX00(l)]
  let text=mdm.is.madamvalue(s)?mdm.sd[s]:s
  el.textContent=(text==null)?'':text //output the 0
  //console.log(el.textContent,s)
  el.flg=1
  return s;
 },'TXT D X //:draw the text. D is text. X is layer. if without X, default X00')
 ;
 mdm.def('IMG',(c,l)=>{
  //console.log(c)
  if(mdm.is.XXX(l))return l;
  let el=mdm.sd[mdm.fn.nulltoX00(l)]
  let u=mdm.is.color(c)?mdm.fn.p1x1(c):c
  el.style.backgroundImage=`url(${u})`
  el.flg=1;
  return c;
 },'IMG D X //:draw the image. D is hexcolor or image. X is layer.')
 ;
 mdm.def('COO',(c,l)=>{
  if(mdm.is.XXX(l))return l;
  let el=mdm.sd[mdm.fn.nulltoX00(l)]
  el.style.color=c||'#fff'
  el.flg=1;
  return c;
 },'COO H X ://set the font color, H is hexcolor, X is layer.')
 ;
 mdm.def('CLR',(l,o)=>{
  if(mdm.is.XXX(l))return l;
  let cc=(mdm.is.X00(l)||(!l))?'#000':'transparent'
  ,lay=mdm.fn.nulltoX00(l)
  ,el=mdm.sd[lay]
  ,defcolor='#fff'
  ,f=()=>mdm.md.layernames.filter(k=>k!=lay).map(k=>{

   mdm.sd[k].textContent=''
   //mdm.sd[k].innerHTML=''
   let cc=(!(mdm.is.X00(k)||mdm.is.XXX(k)))?'transparent':'#000'
   //if(!(k==='X00'||k==='XXX')) cc='transparent'
   mdm.sd[k].style.backgroundImage=`url(${mdm.fn.p1x1(cc)})`;
   mdm.sd[k].style.color=defcolor
   mdm.sd[k].flg=1;
  })
  ;
  if(o==='TXT'||(!o)){
   el.textContent=''
   el.style.color=defcolor
   //el.innerHTML=''
  }
  if(o==='IMG'||(!o))el.style.backgroundImage=`url(${mdm.fn.p1x1(cc)})`
  el.flg=1;
  mdm.sd[lay]=el;
  if((o==='TXT'||(!o))&&mdm.is.X00(lay))f()
  ;
  return lay;
 },'CLR X //:text and image clear and set font color white. X is layer. "CLR" is all layer clear.')

})(mdm);

//most core cmd, <<< MRK >>> IFJ
;(function(mdm){
 ;
 mdm.def('<<<',(tar)=>{
  let a=mdm.fn.addr(tar).set(mdm.md.n)
  if(tar) mdm.sd['$$$']=a.get()//tar+':'+mdm.md.n
  //console.log('<<< '+tar)
  return mdm.sd['$$$'];
 },'<<< #xx //:same mean the "MRK #xx"')
 ;
 mdm.def('MRK',(tar)=>{
  return mdm.cmd('<<<',[tar]) //same mean <<<
 },'MRK #xx //:same mean the "<<< #xx"')
 ;
 mdm.def('>>>',(tar)=>{
  //tar
  let a =(tar)?tar:mdm.md.jumpstack.pop()
  //if jump back notfound is silent
  if(!tar){//jump back route
   if(!a){ console.log("jump back notfound",mdm.sd['$$$']); return mdm.sd['$$$']}
   //let info=mdm.fn.addressinfo(a)
   let ad=mdm.fn.addr(a)
   mdm.md.n=ad.get('n')//info[2] ///
   mdm.md.nowmacro=mdm.md.macros[ad.get('@')]//mdm.md.macros[info[0]]
   mdm.sd['$$$']=ad.get()//a;
   //console.log(a)
   return mdm.sd['$$$']
  }else{
   //let info=mdm.fn.addressinfo(a+':'+mdm.md.n)
   let ad=mdm.fn.addr(a).set(mdm.md.n)
   mdm.md.n=mdm.md.jumps[ad.get('@#')]//mdm.md.jumps[info[0]+info[1]] //0//now line
   mdm.md.nowmacro=mdm.md.macros[ad.get('@')]//mdm.md.macros[info[0]]
   mdm.sd['$$$']=ad.set(mdm.md.n).get() //info[0]+info[1]+':'+mdm.md.n//#xxxxx
   //console.log(a,mdm.sd['$$$'])
   return mdm.sd['$$$']
  }
 },'>>> #xx //:jump to #xx. if ">>>" only the jump for back. after calculated for the full address.')
 ;
 mdm.def('IFJ',(c,j)=>{
  if(!c)return c;
  if(!j)return c;
  //console.log(mdm.sd['$$$'])
  //set back check
  //console.log('IFJ',c,j)
  if(/^>>>/.test(j)){
   let cmdline=j.trim().slice(3,-3).trim()
   mdm.red(cmdline)
   //console.log(cmdline)
   return mdm.sd['$00']
  }
  //
  mdm.md.jumpstack.push(mdm.sd['$$$'])
  return mdm.cmd('>>>',[j]);
 },'IFJ X #1 //:if(X) jump to #1. "IFJ 1 #1" same mean the ">>> #1"')
 ;
})(mdm);

//cmd SLP KEY KLR
;(function(mdm){
 //mdm.md.readblock
 ;
 mdm.def('SLP',(rate,opt)=>{
  //console.log(mdm.md.readblock)
  //opt is ms or fps
  let type=(opt)?opt:"ms"
  let r=rate||1
  let ms=(type==='fps')?r*1000/mdm.md.fps:r
  setTimeout(()=>{ mdm.md.readblock=mdm.md.keyblock=0; },ms)
  mdm.md.readblock=mdm.md.keyblock=1;  
  //console.log('slp',ms)
 },'SLP T O //: read blocking, key blocking, while the T ms, unit the O is "ms" or "fps".')
 ;
 mdm.def('KEY',()=>{
  mdm.md.readblock=1;
  mdm.fn.dde('keydown',(e)=>{
   mdm.md.readblock=0;
   mdm.sd["$00"]=e.which//set return value
  },{once:true})

 },'KEY * //: pressed anykey. read blocking. catch keycode into $$0 or $00. keycode the keydown e.which.')
 ;
 mdm.def('KLR',()=>{
  mdm.sd['$$0']=void 0
  mdm.sd['$$1']=void 0
  return void 0
 },'KLR //: key clear $$0 $$1')
 ;
})(mdm);

//cmd SET MTH, Need early define the IFJ.
;(function(mdm){
 mdm.def('SET',(a,b)=>{
  if(!a)return void 0
  if(!b)return mdm.sd[a]=void 0 //reset the value
  let v=mdm.is.madamvalue(b)?mdm.sd[b]:b
  return mdm.sd[a]=v
 },'SET X Y //: X=Y. same mean "X Y". the X range $00...$ZZ')
 ;
 mdm.def('MTH',(tar,ch,a,b)=>{
  //console.log('MTH',tar,ch,a,b)
  let is={}
  is.number = function(obj){return toString.call(obj) === '[object Number]'}
  is.NaN = function(obj){return is.number(obj) && obj !== +obj}  
  let aa=mdm.is.madamvalue(a)?mdm.sd[a]:a //bug fix

  if(mdm.is.mathexist(ch)){
   //$00?#1 
   let flg=(mdm.sd[tar])?true:false
   flg=(ch==='?')?flg:(!flg)
   mdm.cmd('IFJ',[flg,a])//a
   return flg
  }
  if(mdm.is.mathcompare(ch)){
   //console.log(mdm.sd[tar],a)
   aa=/^\d+$/.test(aa)?parseInt(aa):aa
   let flg=(mdm.sd[tar]===aa)?true:false //ch==='='
   flg=(ch==='>')?(mdm.sd[tar]>aa):flg
   flg=(ch==='<')?(mdm.sd[tar]<aa):flg
   mdm.cmd('IFJ',[flg,b])//b
   return flg
  }
  if(mdm.is.math(ch)){
   //$00+1 //b option not
   let num=parseInt(aa)
   let tarnum=parseInt(mdm.sd[tar])
   tarnum=is.NaN(tarnum)?0:tarnum
   let rtn=tarnum+num //same + 
   rtn=(ch==='-')?(tarnum-num):rtn
   rtn=(ch==='%')?Math.abs(tarnum%num):rtn
   rtn=is.NaN(rtn)?0:rtn //modulo output NaN recover. if 100%0 is NaN
   mdm.sd[tar]=rtn;
   //if(ch==='%')console.log(mdm.sd[tar])
   return rtn;
  }
  console.error('MTH exception:',ch,tar,a,b,mdm.sd['$$$'])
 },'MTH c X J //: math hand short the "$11+1". c is ?!=<>+-%. the X range $00...$ZZ. if "?!=><" compare and jump to J.')
 ;

})(mdm);

//cmd {{{ and [[[
;(function(mdm){
 mdm.def('{{{',(s)=>{
  //console.log('{{{',s)
  return eval(s)
 },'{{{ //: javascript wrap and eval. multiline {{{\\n ... }}} or oneline {{{ 1+3 }}} on other command.')
 ;
 mdm.def('[[[',(s)=>{
  //console.log('[[[',s)  
  let valiable=/\%\$[\$0-9A-Z][\$0-9A-Z]/g
  let t=s.replace(valiable,(a)=>mdm.sd[a.slice(1)]||'') //if md.sd[xxx] is void 0, output the ''
  //console.log('[[[',t)
  return t;
 },'[[[ //: multi string wrap. if use madamvalue($00...$ZZ) with "%", "[[[ %$00 ]]]". oneline canable.')
 ;
})(mdm);

//cmd END
;(function(mdm){
 mdm.def('END',(comment)=>{
  ;
  setTimeout(()=>{
   clearInterval(mdm.md.lf)  
   clearInterval(mdm.md.cf)
   if(comment) console.log(comment,mdm.sd['$$$'])
  },2*1000/mdm.md.fps)
  ;
 },'END C //: abort the macro. stop frameloop and lineloop. C is console.log(C).')
})(mdm);

//cmd CNT
;(function(mdm){
 ;
 mdm.def('CNT',()=>{
  let f=mdm.md.f
  ,count=Math.abs(f%mdm.md.fps)
  return count;
 },'CNT //:fps count for modulo. if fps 20, 0...19...0...19 the looped.')
 ;
})(mdm);

//cmd SEL
;(function(mdm){
 mdm.fn.modulo=(a,b)=>{return Math.abs(a%b) }
 mdm.def('SEL',(t,s,c,l)=>{
  //console.log('SEL',t,s,c,l)
  let f=(d)=>mdm.is.madamvalue(d)?mdm.sd[d]:d
  let tt=f(t)
  let ary=tt.split('\n')
  let ss=mdm.fn.modulo(parseInt(f(s)),ary.length)
  let cc=f(c)
  let sp='　'
  let ll=f(l)
  //console.log('SEL',tt,ss,cc,ll)
  let txt=ary.map((d,i)=>{return (i===ss)?(cc+d):(sp+d) }).join('\n')
  //console.log(txt)
  return mdm.cmd('TXT',[txt,ll])
 })
})(mdm);


/*
let m=`
@example
MRK #keybind
$KS 13 //enter key
//$$0=$KS #1//if enter jump to #1
$KA 65 //A 
$KB 66 //B
$KY 89 //Y
$KX 88 //X
$KS 13 //enter key mean system
$KP 32 //space key mean pause
$K7 103 //numpad7 mean LL
$K9 105 //numpad9 mean RR
$KU 38 //arrow up
$KD 40 //arrow down
$KL 37 //arrow left
$KR 39 //arrow right

//tap binding to key
TAP d $KU //:if down the swip, then same the key $KU.
TAP u $KD //:up the swip
TAP r $KR //:right the swip
TAP l $KL //:tap the left
TAP t $KA //:tap the tap
TAP tt $KX //:tap the tap-tap 

MRK #display
X00 0 0 0 20 10 #456

<<< #1
KEY *
TXT $$0
$$0=$KU >>> IMG #f26 >>>
$$0=$KD >>> IMG #2cc >>>
>>> #1
`
;mdm.run(m)

*/
