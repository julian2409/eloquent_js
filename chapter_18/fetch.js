"use strict";

const url = "https://eloquentjavascript.net/author";

fetch(url).then((res) => {
  console.log(res.status);
  console.log(res.headers.get("Content-Type"));
});

fetch(url, { headers: { Accept: "text/plain" } })
  .then((res) => res.text())
  .then((text) => console.log(text));

fetch(url, { headers: { Accept: "text/html" } })
  .then((res) => res.text())
  .then((text) => console.log(text));

fetch(url, { headers: { Accept: "application/json" } })
  .then((res) => res.text())
  .then((text) => console.log(text));

fetch(url, { headers: { Accept: "application/rainbows+unicorns" } })
  .then((res) => {
    console.log(res.status);
    return res.text();
  })
  .then((text) => console.log(text));
