const searchParams = new URLSearchParams(window.location.search);
const url = "https://keaprojects21-50cf.restdb.io/rest/guest-posts/";
const articleId = searchParams.get("article");
const form = document.querySelector(".commentsform");

form.addEventListener("submit", userSubmittedCom);

fetch(url + articleId + "?fetchchildren=true", {
  method: "GET",
  headers: {
    "x-apikey": "602e38155ad3610fb5bb62bd",
  },
})
  .then((res) => res.json())
  .then((data) => {
    showPost(data);
  })
  .catch((err) => {
    console.error(err);
  });

function showPost(data) {
  document.querySelector("#article h2").textContent = data.title;
  document.querySelector("#article p span").textContent = " " + data.username;
  document.querySelector("#article .content").innerText = data.content;

  const template = document.querySelector("#commentstemplate").content;

  data.comments.forEach((comment) => {
    const clone = template.cloneNode(true);
    clone.querySelector("h3").textContent = comment.title;
    clone.querySelector("p span").textContent = " " + comment.username;
    clone.querySelector(".opinion").textContent = comment.content;
    document.querySelector(".comments").appendChild(clone);
  });
}

function userSubmittedCom(e) {
  e.preventDefault();

  const payload = {
    email: form.elements.email.value,
    username: form.elements.username.value,
    content: form.elements.content.value,
  };

  document.querySelector("input[type=submit]").disabled = true;

  fetch(
    url + articleId + "/comments",
    {
      method: "POST",
      headers: {
        "x-apikey": "602e38155ad3610fb5bb62bd",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      document.querySelector("input[type=submit]").disabled = false;
      form.elements.username.value = "";
      form.elements.email.value = "";
      form.elements.content.value = "";
      const template = document.querySelector("#commentstemplate").content;
      const clone = template.cloneNode(true);
      clone.querySelector("h3").textContent = data.title;
      clone.querySelector("p span").textContent = " " + data.username;
      clone.querySelector(".opinion").textContent = data.content;
      document.querySelector(".comments").appendChild(clone);
    })
    .catch((err) => {
      console.error(err);
    });
}
