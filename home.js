

const url = "https://keaprojects21-50cf.restdb.io/rest/guest-posts";

const options = {
    headers: {
        "x-apikey": "602e38155ad3610fb5bb62bd"
      }
}

fetch(url, options)
.then((res) => res.json())
.then((data)=>{showInfo(data)})
.catch(err => {console.error(err)})

const template = document.querySelector("#latestpoststemplate").content;

 function showInfo(info) {
    console.log(info);
    info.forEach((post)=> { 
      console.log(post);
    const clone = template.cloneNode(true);
    clone.querySelector("h3").textContent = post.title;
    clone.querySelector("p span").textContent = " " + post.username;
    clone.querySelector("a").href = 'article.html?article=' + post._id;
    document.querySelector("#preview-posts").appendChild(clone);})

} 
