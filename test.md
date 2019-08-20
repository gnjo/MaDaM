# test code
```
let t=`
@test
X00 0 0 0 30 20 #f26
X01 0 1 0 30 2 #26f
X02 0 2 0 30 2 #26f

IMG #f26
TXT [[[key press plz]]]
SLP 20 fps
<<< #a
IFJ 1 >>>$22+10>>>
TXT $22 X02
CNT
TXT $00 X01
TXT $$0
KEY *
$$0=13 #end
$11 $00
TXT $00 X01
>>> #a

<<< #end
TXT $11 X01
TXT $$0
IMG #000
SLP 20 fps
CLR
END end
`
//mdm.run(t)

let macro=`
@xyz
X00 0 0 0 30 24 #000
MIM FOO TXT //:mime FOO same command the TXT
<<< #0
[[[
hello,MaDaM
count %$11
]]]
$22 $00
TXT $22 X00
$11+1
$11=100 #1 //count limit jump
SLP 2 fps
>>> #0

<<< #1
[[[
countmax
goodbye
]]]
TXT $00 X00
IMG #2cc
>>> #2

MRK #2 //end
SLP 40 fps
CLR
END end 
`
;
//mdm.run(macro,20,200)

let macro2=`
@macro2
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
■男
　女
]]]
$11 $00
//$ZZ {{{console.log(mdm.sd['$11'])}}}
[[[
問．貴方の性別は？
　男
■女
]]]
$22 $00
//
X00 0 0 0 30 20
X01 28 1 0 2 1
X02 1 1 0 29 19
$33 $11
<<< #1
TXT $33 X02
KEY *
TXT $$0 X01
$$0=$KU >>> $33 $11 >>>
$$0=$KD >>> $33 $22 >>>
$$0=$KA #pressA
>>> #1

MRK #pressA
IMG #2cc
END 

`
//;mdm.run(macro2,20,60)

```
