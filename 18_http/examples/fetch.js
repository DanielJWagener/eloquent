fetch("example/data.txt").then(response => {
  console.log(response);
  console.log(response.headers.get("Content-Type"));
});

fetch("example.data.txt")
  .then(response => response.text)
  .then(text => console.log(text));

fetch("example.data.txt", { method: "DELETE" }).then(resp => {
  console.log(resp.status);
});

fetch("example.data.txt", { Range: "bytes=8-19" })
  .then(resp => resp.text())
  .then(console.log);
