"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const MOUNTAINS = [
    {name: "Kilimanjaro", height: 5895, place: "Tanzania"},
    {name: "Everest", height: 8848, place: "Nepal"},
    {name: "Mount Fuji", height: 3776, place: "Japan"},
    {name: "Vaalserberg", height: 323, place: "Netherlands"},
    {name: "Denali", height: 6168, place: "United States"},
    {name: "Popocatepetl", height: 5465, place: "Mexico"},
    {name: "Mont Blanc", height: 4808, place: "Italy/France"}
  ];

  const tableDiv = document.getElementById("mountains");

  const table = document.createElement("table");
  const tableHeaderRow = document.createElement("tr");
  const tableHeaderName = document.createElement("th");
  const tableHeaderHeight = document.createElement("th");
  const tableHeaderPlace = document.createElement("th");

  tableHeaderRow.appendChild(tableHeaderName);
  tableHeaderRow.appendChild(tableHeaderHeight);
  tableHeaderRow.appendChild(tableHeaderPlace);
  table.appendChild(tableHeaderRow);

  tableDiv.appendChild(table);
});
