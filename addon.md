### addon
```
//history
v1 draft
```
```
//decide the addon loadtiming and call method.
mdm.add(timingweight,name,fn)
;
mdm.add(void 0,n,f) //not load call.
;

mdm.run=(str,fps,lps)=>{
//0 before the run. not exist layer
...any method. create the layer
//1 before the loop. exist the layer
mdm.loop(fps,lps); //macro start
//2 after the run
}

if mdm.run(), option nothing, call the mdm.try();
mdm.try();//show the run sequence.

```
~~### define timing weight
```
000 mdm.add
000 mdm.def
001 mdm.cmd
...
100 mdm.lex
...
199 mdm.try
200 mdm.run
//on run()
...
300 mdm.loop
...
//tail run()
```
