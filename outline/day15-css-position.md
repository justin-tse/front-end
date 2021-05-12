## Day15 CSS position
定位布局：
  static，不定位，元素处于常规流中，能够被其它元素感知到
  relative，相对定位，并不脱离常规流，位置保留，相对于自身原来的位置定位
  fixed，固定定位，完全脱离常规流，相对于窗口定位
  absolute，绝对定位，完全脱离常规流，相对于最近的定位祖先定位
  sticky，粘连定位，跟滚动位置有关
  什么叫脱离常规流？
    父元素，包含块，后续的元素都感知不到它的存在。
  定位时如果不写方位，元素还在原来的位置
  z-index可以调整重叠时元素的重叠顺序

qq好友列表分组标题效果
  https://jsbin.com/poyinanemu/1/edit?html,css,output