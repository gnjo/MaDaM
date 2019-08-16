# MaDaM quick
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
MDM.run(macro,fps,lps)
```

# MaDaM cmd
```
//valiable
$00 //:always return value.
$$0 //:always pressed key.
$$1 //:always old pressed key. 
$00...$ZZ //:MaDaM values. MaDaM value use the math hand. ex) $00?1 #1 //exist jump
$$$ //:always address. ex)@xyz#aaa:14
//input
$11 1//:$11=1
$11 aiuewo//:$11="aiuewo"
$11 $00//:$11=$00
$11 //:reset $11=void 0

//valiable math hand
//compare
$00?#1 //:exist check. if($00) jump to #1
$00!#1 //:void check. if(!$00) jump to #1
$00=V #1//:equal check. if($00===V) jump to #1
$00<V #1 //:if smaller than V, jump to #1
$00>V #1 //:if bigger than V, jump to #1
//mathmatics
$11+V //:$11+=V
$11-V //:$11-=V
$11%V //:modulo always positive valiable. $11=Math.abs($11%V)

//wrap order. wrap order canable the multi line.
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

//address and jump
@xx //:set the main address. head the @. one macro, one @.
<<< #xx //:set the sub address. head the #. full address is @xx#xx:line
MRK #xx //:same mean the "<<< #xx"
>>> #xx //:jump to #xx.
>>> //:jump for back. after calculated for the full address.

//drawing
X00 //:main layer, default back color #000 //black
X01...X09 //:sub layers, default back color #0000 //transparent
X00 x y z w h c//:position and default color set. z is z-index. c is color.
IMG D X//:draw the image. D is color or image. X is layer. 
IMG D //:same mean "IMG D X00"
TXT D X//:draw the text. D is text. X is layer.
TXT D //:same mean "TXT D X00"
CLR X //:text and image clear. X is layer.
X00 //:same mean "CLR X"
CLR //:all layer clear

//drawing and apply
YON T F X //:ask Yes Or No. T is 3line strings. F is 0 or 1. X is layer. blocking. return 0 or 1. yes is 1.
//T is three lines string, qestion\nyes\nno.
SEL T N X //:like a YON, but any select. N is select number. blocking. return selected number. cancel is void 0.
$00?#1 //:if cancel, jump to #1
```

```
//examples valiable

```
```
//examples drawing

```
