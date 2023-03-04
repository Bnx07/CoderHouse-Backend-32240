const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const data = Object.fromEntries(new FormData(loginForm));

  fetch("/login", { // /api/session
    method: "POST",
    body: JSON.stringify(data),
    headers: {"Content-type": "application/json"},
  })
    .then((res) => res.json())
    .then((res) => localStorage.setItem('authToken', json.token));
});