### addon
```
//history
v1 draft
```
```
//decide the addon loadtiming and call method.
mdm.add(loadtiming,name,fn)
;
mdm.add(void 0,n,f) //not load call.
mdm.add(0,n,f) //initialize before the run.
mdm.add(1,n,f) //initialize on run, before the loop. if dom control, choice the here.
mdm.add(2,n,f) //initialize after the run. same mean after the loop.
;

mdm.run=(str,fps,lps)=>{
//0 before the run. not exist layer
...any method. create the layer
//1 before the loop. exist the layer
mdm.loop(fps,lps); //macro start
//2 after the run
}

```
