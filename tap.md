### tapbinding
```
//history
v1 draft
```
```
//key and tap binding
TAP T K //:T is same mean option d u r l t tt. t is tap, tt is taptap. K is bind the keycode.
TAP tt $KA //:taptap same mean $KA
```
### example
```js
//need hammer.js
//pug
script(src="https://gnjo.github.io/MaDaM/hammer.js")
script(src="https://gnjo.github.io/MaDaM/mdm.js")
```
```js
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
>>> #1
`
;mdm.run(m)
```
