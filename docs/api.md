react-cjk API Documentation
=======================
This document is API documentation for the components and functions of react-cjk.


CharacterSVG Component
======================
The CharacterSVG component is the main thing in react-cjk. It is found in react-cjk.js. The component wraps an SVG element, so any other props not defined in this document will be passed directly to the SVG element it wraps.

CharacterSVG Component Props
============================
There are four props:

- character
- source
- strokesDisplayed
- onStrokeComplete


character
---------
String, should be the character to be displayed


source
------
URL to a Make Me a Hanzi like graphics.txt, or you can choose a preset graphics.txt file:

### zh-hans
Characters from primarily Simplified Chinese and PRC stroke order. Data is from [Make Me A Hanzi](https://github.com/skishore/makemeahanzi).

### zh-hant
Characters from primarily Traditional Chinese and ROC stroke order. Data is from [AnimCJK](https://github.com/parsimonhi/animCJK/).

### jp
Characters of Japanese Kanji and Kana in Japanese stroke order. Data is from [AnimCJK](https://github.com/parsimonhi/animCJK/).

### ko
Characters of Korean Hanja and Hangul in Korean stroke order. Data is from [AnimCJK](https://github.com/parsimonhi/animCJK/).


strokesDisplayed
----------------
strokesDisplayed specifies which strokes to display, given settings for each stroke. It renders all strokes simultaneously; for info on how to render strokes sequentially, see [Rendering Strokes Sequentially](sequential.md).

strokesDisplayed is a dictionary with keys as the strokeId and the value as another dict with settings.

The strokeId corresponds to the order of the strokes and is zero-indexed; the first stroke has an id of 0, second stroke has id of 1, etc.

Note that stroke orders change depending on the source, so the strokeId in one source is not visually the same as another source.

### Settings dictionary
Each strokeId key has a corresponding Settings Dictionary as its value. Here are the settings you can specify for each stroke:

- isAnimated
    - bool; if false, the stroke is displayed instantly
- strokeColor
    - string; hex color value of what color to set the stroke to