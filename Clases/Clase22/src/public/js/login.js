const loginForm = document.getElementById("form");


loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const data = Object.fromEntries(new FormData(loginForm));

  fetch("api/session/login", { // /api/session
    method: "POST",
    body: JSON.stringify(data),
    headers: {"Content-type": "application/json"},
  })
    .then(res => console.log(res))
    // .then(console.log(document.cookie("coderCookieToken")))
    // .then((res) => res.json())
    // .then((res) => {
    //     localStorage.setItem('authToken', res.token);
    // });
});