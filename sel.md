### cmmand SEL
```
let yon=`
@yon
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
//
[[[
問．貴方の性別は？
男
女
]]]
$11 $00
$F0 1
X00 0 0 0 30 10 #2cc
X01 29 1 0 29 3
<<< #1
//SEL t s c L //:t is multiline strings, s is select number, if without c, default ■
SEL $11 $F0 [[[■]]] X00
TXT $F0 X01
KEY *
$$0=$KU >>> $F0 1 >>>
$$0=$KD >>> $F0 2 >>>
$$0=$KA #2
>>> #1

MRK #2
//SEL t s c L //:t is multiline strings, s is select number, if without c, default ■
[[[
アイテム１
アイテム２
アイテム３
アイテム４
アイテム５
アイテム６
]]]
$11 $00
$F0 100

<<< #3
SEL $11 $F0 [[[■]]] X00
TXT $F0 X01
KEY *
$$0=$KU >>> $F0-1 >>>
$$0=$KD >>> $F0+1 >>>
$$0=$KA #end
>>> #3

MRK #end
CLR
END [[[yon demo end]]]
`
;mdm.run(yon)

```
