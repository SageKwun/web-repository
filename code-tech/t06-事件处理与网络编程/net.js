const submitBtn = document.getElementById("submit");

submitBtn.addEventListener("click", (a) => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  console.log("username: ", username);
  console.log("password: ", password);

  login(username, password);
  a();

  console.log("欢迎登录，攀攀");
});

// const pwd = document.getElementById("pd").value

function login(username, password) {
  fetch("http://localhost:8080", {
    method: "POST",
    headers: {},
    mode: "no-cors",
    body: JSON.stringify({ username, password }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
}
