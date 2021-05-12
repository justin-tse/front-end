## Day13 CSS bfc
ul {
  overflow: hidden;/*此行触发了ul的bfc*/
}
/*触发了bfc的元素不会与其子元素合并margin，即它会包住子元素的margin box*/

li {
  padding-bottom: 1px;
  border-bottom: 1px dotted;
  margin-bottom: -1px;
}