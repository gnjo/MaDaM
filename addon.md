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
mdm.add(1,n,f) //initialize on run, before the loop.
mdm.add(2,n,f) //initialize after the run. same mean after the loop.
;

mdm.run=(str,fps,lps)=>{
//0 before the run
...any method
//1 before the loop
mdm.loop(fps,lps); //macro start
//2 after the run
}

```
