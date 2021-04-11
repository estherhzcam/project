const form = document.querySelector("form");
form.addEventListener("submit", userSubmitted);

function userSubmitted(e) {
  e.preventDefault();
  console.log(form.elements.title.value);
  console.log(form.elements.username.value);
  console.log(form.elements.email.value);
  console.log(form.elements.content.value);

  const payload = {
    email: form.elements.email.value,
    username: form.elements.username.value,
    title: form.elements.title.value,
    content: form.elements.content.value,
    date: Date.now(),
  };
  document.querySelector("input[type=submit]").disabled = true;

  fetch("https://keaprojects21-50cf.restdb.io/rest/guest-posts", {
    method: "POST",
    headers: {
      "x-apikey": "602e38155ad3610fb5bb62bd",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      console.log(response);

      // add congrats message
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      showCongratsMessage();

      document.querySelector("input[type=submit]").disabled = false;
      form.elements.title.value = "";
      form.elements.username.value = "";
      form.elements.email.value = "";
      form.elements.content.value = "";
    })

    .catch((err) => {
      console.error(err);
    });
}
function showCongratsMessage() {
  console.log("working")
  document.querySelector("#congrats").classList.remove("hidden");
  document.querySelector("#close").addEventListener("click", close);
}

function close(){
  document.querySelector("#congrats").classList.add("hidden");
} 
