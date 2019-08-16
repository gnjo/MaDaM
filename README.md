# MaDaM
macro engine for mocup game.
```
let fps=20,lps=200
;
let str=`
X00 0 0 0 640 480 #000
TXT start X00
`
;
MDM.run(str,fps,lps)

```

# one order
basic ```^[$0-9A-Z][><$0-9A-Z][$0-9A-Z]```
```
KEY
```
with param ```^[$0-9A-Z][$0-9A-Z][$0-9A-Z][ ]```
```
KEY X Y //
```
special math hand ```^$[$0-9A-Z][$0-9A-Z][\=|\%|\+|\-|\>|\<|\?|\!]```
```
$00?X J//
```
jump order```^[><][><][><]```
```
<<< #1
//... loop
>>> #1
```
# address order
```
@main //one macro, one only. 
<<< #xyz //# is sub address
MRK #xyz //same mean <<<
```
# wrap order
```
[[[
...string...on MaDaM
]]]
```
```
{{{
...javascript...on MaDaM
}}}
```
# quick wrap order
```
TXT [[[thi is quick wrap order.]]] X00
```
```
TXT {{{1+2+3}}} X00 //disp the 6
```
# quick jump order
```
IFJ 1 >>> TXT true X00 >>>
```
# always address the $$$
```
@xyz
<<< #1

IFJ 1 #2
TXT $$$ X00 //@xyz#1:4

>>> #1

<<< #2
TXT $$$ X00 //@xyz#2:8
>>>
```
# always return value the $00
```
$11 xyz//$11 xyz
//$00 xyz
TXT $00 X00//xyz
```
```
[[[
xyz
]]]
TXT $00 X00//xyz
```

# always last key the $$0, prev the $$1
```
$$0 //last keypress value
$$1 //pre keypress value
$$0?A #1

<<< #1
$$1?B >>> TXT [[[A press and B press]]] X00 >>>
>>>
```
# always living, layer the X00
other layer X01...XZZ
```
X00 0 0 0 640 480 #000
X01 100 100 100 200 200 yellow
DEL X01 //canable the detele X01 layer.
DEL X00 //dont delete.
DEL //all layer delete, exception the X00.
CLR //all layer IMG TXT clear.
```

