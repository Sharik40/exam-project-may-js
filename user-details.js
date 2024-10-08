let user = JSON.parse(localStorage.getItem("user"));
let h1 = document.getElementById("h1");
h1.innerText = `${user.name}`;
let table = document.getElementById("user-table");
for (const key in user) {
    let tr = document.createElement("tr");
    table.appendChild(tr);
    let td = document.createElement("td");
    tr.appendChild(td);
    if (typeof user[key] === "object") {
        td.innerHTML = `<b>${key.charAt(0).toUpperCase() + key.slice(1)}:</b>`;
        let ul = document.createElement("ul");
        td.appendChild(ul);
        for (const obj_key in user[key]) {
            let temp = user[key];
            let li = document.createElement("li");
            ul.appendChild(li);
            if (typeof temp[obj_key] === "object") {
                li.innerHTML = `<b>${obj_key.charAt(0).toUpperCase() + obj_key.slice(1)}:</b> "`;
                for (const ulInUlKey in temp[obj_key]) {
                    let ulTemp = temp[obj_key];
                    li.innerHTML += ` <b>${ulInUlKey.charAt(0).toUpperCase() + ulInUlKey.slice(1)}</b>: ${ulTemp[ulInUlKey]}, `;
                }
                li.innerHTML += '"';
            }
            else
                li.innerHTML = `<b>${obj_key.charAt(0).toUpperCase() + obj_key.slice(1)}</b>: ${temp[obj_key]}`;
        }
    }
    else
        td.innerHTML = `<b>${key.charAt(0).toUpperCase() + key.slice(1)}</b>: ${user[key]}`;
}

let btn_show_posts = document.getElementById("short-posts");
let posts_container = document.getElementById("posts-container");
fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`)
    .then((response) => response.json())
    .then((posts) => {
        let id = 1;
        for (const post of posts) {
            let post_div = document.createElement("div");
            post_div.classList.add("post");
            posts_container.appendChild(post_div);
            let title = document.createElement("p");
            title.classList.add("title");
            title.innerHTML = `<b>POST ${id++}</b>`;
            let title_content = document.createElement("p");
            title_content.classList.add("title-content");
            title_content.innerHTML = post.title;
            post_div.append(title, title_content);

            let btn_more_posts = document.createElement("button");
            post_div.appendChild(btn_more_posts);
            btn_more_posts.classList.add("btn_more_posts");
            btn_more_posts.innerText = "LEARN MORE";
            btn_more_posts.onclick = () => {
                localStorage.setItem("postID", post.id);
                location.href = "post-details.html";
            };
        }
    });

btn_show_posts.addEventListener('click', () => {
     if (btn_show_posts.textContent.toUpperCase().charAt(0) === 'S') {
         btn_show_posts.innerText = "Hide posts info";
         posts_container.style.display = "flex";
     }
     else {
         btn_show_posts.innerText = "Show posts info";
         posts_container.style.display = "none";
     }


});
