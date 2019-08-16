# MaDaM
macro engine for mocup game.

# one order
basic ```^[$0-9A-Z][$0-9A-Z][$0-9A-Z]```
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
