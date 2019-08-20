//need hammer.js
//this module drafting

//let mdm={}
//mdm.md={}
//mdm.sd={}
mdm.md.tap={}
//mdm.md.tap['t']=13
//mdm.md.keywaiting=0;
mdm.tap=()=>{
 if(!Hammer)return mdm
 ;
 /*
mdm.fn.dde('keydown',(e)=>{
   if(mdm.md.keyblock)return;
   if(!(mdm.sd["$$0"]===e.which)) mdm.sd["$$1"]=mdm.sd["$$0"];
   mdm.sd["$$0"]=e.which
  }) 
 */
 var x = document.documentElement;
 var mc = new Hammer(x);
 //mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });
// // listen to events...
 mc.on("panleft panright panup pandown /*tap*/ doubletap press", function(ev) {
  
  if(mdm.md.keyblock)return;  
  let which,type
  if(ev.type==='tap'||ev.type==='press')type='t'
  //if(ev.type==='tap'&&(ev.tapCount<2))type='t'
  //if(ev.type==='press')type='t'
  //if(ev.type==='tap'&&(ev.tapCount>1))type='tt'
  if(ev.type==='doubletap')type='tt'  
  if(ev.type==='panup')type='u'
  if(ev.type==='pandown')type='d'
  if(ev.type==='panleft')type='l'
  if(ev.type==='panright')type='r'
  ;
  //console.log(which,type)
  which=mdm.md.tap[type] //which is keycode
  if(!type)return
  if(!which)return
  ;
  which=parseInt(which); //bug fix which is number
  if(!(mdm.sd["$$0"]===which)) mdm.sd["$$1"]=mdm.sd["$$0"];
  mdm.sd["$$0"]=which
  //console.log(mdm.sd["$$0"])
  if(mdm.md.readblock)mdm.md.readblock=0;
 });
} 

mdm.def('TAP',(t,k)=>{
 if(!t)return;
 //d u l r t tt
 let f=(d)=>mdm.is.madamvalue(d)?mdm.sd[d]:d
 let kk=f(k)
 mdm.md.tap[t]=kk;
 return kk;
},'TAP T K //:T is same mean option d u r l t tt. t is tap, tt is taptap. K is bind the keycode.')

mdm.tap()
