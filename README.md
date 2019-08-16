# MaDaM quick
```
//pug
script(src="https://gnjo.github.io/MaDaM/mdm.js")
```

```js
let macro=`
@xyz
X00 0 0 0 600 480 #000
<<< #0
[[[
hello,MaDaM
count %$11
]]]
$22 $00
TXT $22 X00
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

# MaDaM cmd
```
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
X00 //:main layer, default back color #000 //background black, font color white
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

//key input $$0 $$1
KLR X //:key clear $$0 or $$1
KLR //:key clear $$0 $$1
KEY A //:key wait. if pressed A key, control back macro. blocking.
KEY A #xx//:if pressed A key, jump to #xx
KEY *//:pressed anykey
$$0=A #xx //:if last key pressed A, jump to #xx. non blocking.

//sleep
SLP F //:read blocking, key blocking, while the F flame.
//SLP V ms //:order V millisecond. this ms order the about by flame base calc. hopeable.
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
```

# MaDaM cmd definition 
```js
mdm.cmd(cmd,fn) //definition

mdm.cmd(cmd,ary) //done
```

# MaDaM sequence the inner
```
mdm.css //css setting
mdm.key //key setting
mdm.elm //element setting
mdm.lex //macro lex
mdm.fop //frameloop on fps
mdm.lop //lineloop on lps
 //and finally
 mdm.red //read the macro on the lineloop
```

# MaDaM areas
```
mdm.v.xxx //macro valiable set here. like a savedata.
mdm.c.xxx //macro const data set here. like a database.
mdm.s.xxx //madam system valiable set here. like a fps, lps, looptick.
mdm.fn.xxx //useful functions
mdm.is.xxx //is check
mdm.re.xxx //regex
```
