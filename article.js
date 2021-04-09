const searchParams = new URLSearchParams(window.location.search);
const articleId = searchParams.get("article");

fetch("https://keaprojects21-50cf.restdb.io/rest/guest-posts/" + articleId + "?fetchchildren=true", 
{
  method: "GET",
  headers: {
    "x-apikey": "602e38155ad3610fb5bb62bd"
  }
})
.then((res) =>res.json())
.then((data) =>{showPost(data)})
.catch(err => {
  console.error(err);
});

function showPost(data) {
    console.log(data);
    document.querySelector("#article h3").textContent = data.title;
    document.querySelector("#article p span").textContent = " " + data.username;
    document.querySelector("#article .content").innerText = data.content;
    
    const template = document.querySelector("#commentstemplate").content;

    data.comments.forEach((comment)=>{
        console.log(comment)
        const clone = template.cloneNode(true);
        clone.querySelector("h3").textContent = comment.title;
        clone.querySelector("p span").textContent = comment.username;
        clone.querySelector(".opinion").textContent = comment.content;
        document.querySelector(".comments").appendChild(clone);      
    });
}