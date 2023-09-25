"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const MOUNTAINS = [
    { name: "Kilimanjaro", height: 5895, place: "Tanzania" },
    { name: "Everest", height: 8848, place: "Nepal" },
    { name: "Mount Fuji", height: 3776, place: "Japan" },
    { name: "Vaalserberg", height: 323, place: "Netherlands" },
    { name: "Denali", height: 6168, place: "United States" },
    { name: "Popocatepetl", height: 5465, place: "Mexico" },
    { name: "Mont Blanc", height: 4808, place: "Italy/France" },
  ];

  const tableDiv = document.getElementById("mountains");

  const table = document.createElement("table");
  const tableHeaderRow = document.createElement("tr");
  const tableHeaderName = document.createElement("th");
  const tableHeaderHeight = document.createElement("th");
  const tableHeaderPlace = document.createElement("th");

  tableHeaderRow
    .appendChild(tableHeaderName)
    .appendChild(document.createTextNode("Name"));
  tableHeaderRow
    .appendChild(tableHeaderHeight)
    .appendChild(document.createTextNode("Height"));
  tableHeaderRow
    .appendChild(tableHeaderPlace)
    .appendChild(document.createTextNode("Place"));

  table.appendChild(tableHeaderRow);

  tableDiv.appendChild(table);

  for (let mountain of MOUNTAINS) {
    let { name, height, place } = mountain;
    const newTableRow = document.createElement("tr");
    newTableRow
      .appendChild(document.createElement("td"))
      .appendChild(document.createTextNode(name));
    newTableRow
      .appendChild(document.createElement("td"))
      .appendChild(document.createTextNode(height));
    newTableRow
      .appendChild(document.createElement("td"))
      .appendChild(document.createTextNode(place));

    newTableRow.childNodes[1].style.textAlign = "right";

    table.appendChild(newTableRow);
  }
});
