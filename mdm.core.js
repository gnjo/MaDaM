//history
//v1 make. first call
//v2 coded the mdm.def mdm.cmd mdm.man
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
