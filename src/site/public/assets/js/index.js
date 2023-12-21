const data1 = {
  name: "",
  fill: 'lightgreen',
  children: [
    {
      name: "A",
      fill: '#ffffff11',
      value: 7,
    },
    {
      name: "B",
      fill: '#bbf1ff31',
      value: 3,
    }
  ]
}
fetch(data1).then(data => {
  Sunburst()
    .data(data1)
    .label('name')
    .size('value')
    .color('fill')
    .width(250)
    .height(250)
    (document.getElementById('chart'));
});