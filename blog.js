fetch("https://keaprojects21-50cf.restdb.io/rest/guest-posts", {
  method: "GET",
  headers: {
    "x-apikey": "602e38155ad3610fb5bb62bd"
  }
})
.then((res) => res.json())
.then(response) => {
  showPost(data)
})
.catch(err => {
  console.error(err);
});

function showPost(data) {
    console.log(data);
}