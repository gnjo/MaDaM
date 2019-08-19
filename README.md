### MaDaM
```
//history
v0.010 draft
v0.020 coded the mdm.core.js
v0.030 coded the drawing. X00-X09 CLR TXT IMG COO
v0.040 coded the parent board XXX
v0.050 coded the sleep. SLP
v0.060 coded the key-ing. KEY KLR $$0 $$1
v0.070 coded >>> XXX
v0.071 coded >>> call for back
v0.072 coded <<< MRK
v0.080 coded address jump <--- mile stone. 20190818 
v0.081 coded refactor lex to mdm.core.js
v0.082 coded MTH for math hand.
v0.083 coded SET for math hand.
v0.090 coded math hand <--- mile stone. 20190819
v0.091 coded multi wrap [[[ ]]]] {{{ }}}}
>>>v0.092 coding one wrap
v0.099 coding man command check.
v0.100 wrap call <--- mile stone.
v0.110 touch gesture with hummer.js <--- mile stone. 
v0.120 preload call <--- mile stone.
v0.130 YON SEL make <--- mile stone.
v0.200 write the demo the opning window on MaDaM. <--- mile stone.
v0.300 write the demo thetetris on MaDaM. <--- mile stone.
v1.000 build up. first pack mdm.js <--- mile stone.
```
```
//build hint.
//mdm.xxx.js group the pack into mdm.js
mdm.js
 mdm.core.js
 mdm.fn.js //fn is re 
 mdm.run.js
 mdm.lex.js
```
### outer quick
```
//pug
script(src="https://gnjo.github.io/MaDaM/mdm.js")
```

```js
let macro=`
@xyz
X00 0 0 0 600 480 #000
MIM FOO TXT //:mime FOO same command the TXT
<<< #0
[[[
hello,MaDaM
count %$11
]]]
$22 $00
FOO $22 X00
$11+1
$11=100 #1 //count limit jump
>>> #0

<<< #1
TXT countmax X00
>>> #2

MRK #2 //end
`
let fps=20,lps=200
mdm.run(macro,fps,lps)
```

### outer cmd
```
//command utility order
MAN C //:C is command.
MAN //:all command help
MIM N C//:mime command copy, N command same the C.  hopefull...
TBO C //:taboo command the C change to comment. hopefull...

//valiable
$00 //:special. always return value.
$$0 //:special. always pressed key.
$$1 //:special. always old pressed key. 
$$$ //:special. always address. ex)@xyz#aaa:14
$00...$ZZ //:MaDaM values. MaDaM value use the math hand. ex) $00?1 #1 //exist jump
SET X Y//: X=Y
SET X //: X=void 0
//input
$11 1//:$11=1 same mean "SET $11 1"
$11 aiuewo//:$11="aiuewo"
$11 $00//:$11=$00
$11 //:reset $11=void 0 . same mean "SET $11"

//valiable math hand
$00?... //:? ! = < >
$11+... //:+ - %

//wrap order. wrap order canable the multi line.
{{{ //:javascript wrap start
... //:body
}}} //:end

[[[ //:multi string wrap start
... //:body
]]] //:end

/* //:multi comment start
... commentout multi line
*/ //:end

//one line wrap order
$XX {{{1+3}}}//same mean $11=eval(1+3)
$XX [[[this is string.value %$11]]] //$XX="this is string. value 4"
//<--- single comment out 

//address and jump
@xx //:set the main address. head the @. one macro, one @.
<<< #xx //:set the sub address. head the #. full address is @xx#xx:line
MRK #xx //:same mean the "<<< #xx"
>>> #xx //:jump to #xx.
>>> //:jump for back. after calculated for the full address.
IFJ X #1 //:if(X) jump to #1
IFJ 1 #1 //:same mean the ">>> #1"

//quick jump back
IFJ 1 >>> TXT quick X00 >>>
$$0=A >>> TXT A_pressed X00 >>>

//drawing
X00 //:special main layer, default back color #000 //background black, font color white
X01...X09 //:sub layers, default back color #0000 //transparent
X00 x y z w h c//:position and default color set. z is z-index. c is color.
IMG D X//:draw the image. D is color or image. X is layer. 
IMG D //:same mean "IMG D X00"
TXT D X//:draw the text. D is text. X is layer.
TXT D //:same mean "TXT D X00"
COO D X//:font color change
COO D //:same mean "COO D X00"
CLR X //:text and image clear and set font color white. X is layer.
X00 //:same mean "CLR X00"
CLR //:all layer clear

//key input $$0 $$1 value is e.which number on keydown.
KLR X //:key clear $$0 or $$1. hopefull...
KLR //:key clear $$0 $$1
KEY A //:key wait. if pressed A key, control back macro. blocking. hopefull...
KEY A #xx//:if pressed A key, jump to #xx. hopefull...
KEY *//:pressed anykey
$$0=A #xx //:if last key pressed A, jump to #xx. non blocking.

//sleep
SLP T ms//:read blocking, key blocking, while the T ms. 
SLP T //:same mean the "SLP T ms"
SLP F fps //:order the F flame 

```

```
//examples command order
TBO {{{ //:taboo the javascript wrap
MIM COR COO /:new command the COR same mean the COO
```

```
//examples valiable
$00?#1 //:exist check. if($00) jump to #1
$00!#1 //:void check. if(!$00) jump to #1
$00=V #1//:equal check. if($00===V) jump to #1
$00<V #1 //:if smaller than V, jump to #1
$00>V #1 //:if bigger than V, jump to #1
//mathmatics
$11+V //:$11+=V
$11-V //:$11-=V
$11%V //:modulo always positive valiable. $11=Math.abs($11%V)

```
```
//examples wrap order
{{{
 console.log('x')
 //wrap order for javascript
 //javascript direct on MaDaM 
}}}
[[[
line1 wrap order for multi string 
line2 this value input to $00
line3
]]]
$00//line1 ...line2... line3
$11 xyz
[[[
valiable injection %$xx
abc...%$11
abc...xyz
]]]

//one line wrap order
$11 {{{1+3}}}//same mean $11=eval(1+3)
$22 [[[this is string.value %$11]]] //$22="this is string. value 4"

```
```
//examples address jump
//looping
$11 0
<<< #1
$11+1
$11=100 #2
>>> #1
MRK #2
//$11=100
```
```
//examples drawing
//drawing and apply
SAY T X//:simple three line message. non blocking.
KEY *//:key wait for blocking

YON T F X //:ask Yes Or No. T is 3line strings. F is 0 or 1. X is layer. blocking.
//return 0 or 1. yes is 1.
//T is three lines string, qestion\nyes\nno.

SEL T N X //:like a YON, but any select. N is select number. blocking.
//return selected number. cancel is void 0.
$00?#1 //:if cancel, jump to #1
```

```
//examples keypressed
$$0=A >>> $$1=B #1 >>> //A pressed B
$$0=B >>> $$1=A #1 >>> //A pressed B
//key meaning
$KS 13 //enter key
$$0=$KS #1//if enter jump to #1
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
```

### inner method
```
//cmd definition
mdm.def(cmd,fn,man) //definition. man set the text for command help.
mdm.cmd(cmd,ary) //done

mdm.man(cmd) //command help to return value.

//sequence the inner
mdm.run(str,fps,lps)
mdm.css() //css setting
mdm.key() //key setting
mdm.elm() //element setting
mdm.mid() //sound setting. to be futured...
mdm.lex(str) //macro lex
mdm.fop() //frameloop on fps
mdm.lop() //lineloop on lps
//and finally
mdm.red() //read the macro on the lineloop

//areas
mdm.sd.xxx //macro valiable set here. like a savedata.
mdm.db.xxx //macro const data set here. like a database.
mdm.md.xxx //madam system valiable set here. fps, lps, looptick, like a madam-data.
mdm.md.man //command help
mdm.fn.xxx //useful functions
mdm.is.xxx //is check
mdm.re.xxx //regex
```
### inner block order
```
mdm.md.readblock=0
mdm.md.keyblock=0

mdm.lop=()=>{
 if(mdm.md.readblock)return mdm;
}
...onkeydown=()=>{
 if(mdm.md.keyblock)return;
}
mdm.def('SLP',(frame)=>{
 mdm.md.readblock=mdm.md.keyblock=1;
 let ms=(frame||1)*1000/mdm.md.fps
 setTimeout(()=>{ mdm.md.readblock=mdm.md.keyblock=0 },ms)
},'')
```
### inner jump and macro set
```
mdm.jmp(mdm.sd['$$$'])//read change and macro start. @main#sub:line or @main#sub or @main or @main:line 
mdm.is.jump(mdm.sd['$$$'])
```

### idea A00...AZZ map order. B00..BZZ blink cursor order.
```
//area is x y d map
A00 is depth 00
A01 is depth 01
A02 is depth 02

//define is string and \n
[[[
■■■
■■■
■■■
]]]
//input $00
A00 $00
MAP x y A00 X00//drawing 3x3 map. center x y. draw size by X00... order

//map order
A00...AZZ
A00 X //:X is multi string. like a x y.

//blink order
B00...BZZ
B00 S C//:if S is あいうえあいうえ, blink the あ>い>う>え>... blink rate 8 fps.
//C is color.

```

### outer DAT call
```
//DAT is data preload call;
%name U F //: call name the %name. name is lowercase only.
//dataplace the U, blocking flg is the F. F is 0 or 1.
%name U //:same mean the "%name U 1". default blocking
//example
%xyz https://aaaa/xyz.png //:blocking
%aaa https://aaaa/aaa.png 0 //:non-blocking

X00 0 0 0 20 20 #f26
IMG %xyz X00

```
# outer END abort command
```
//stop the mdm.lop mdm.fop
END C //:if macro end or strong escape, call the END. if exist C, call the console.log(C).
```
