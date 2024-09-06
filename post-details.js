let user = JSON.parse(localStorage.getItem("user"));
let table = document.getElementById("user-table");
let post_id = localStorage.getItem("postID");
fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts?id=${post_id}`)
    .then((response) => response.json())
    .then((post_arr) => {
        let post = post_arr[0];
        console.log(post);
        for (const postKey in post) {
            let tr = document.createElement("tr");
            table.appendChild(tr);
            let td = document.createElement("td");
            tr.appendChild(td);
            td.innerHTML = `<b>${postKey.charAt(0).toUpperCase() + postKey.slice(1)}</b>: ${post[postKey]}`;
        }
    });
fetch(`https://jsonplaceholder.typicode.com/posts/${post_id}/comments`)
    .then((response) => response.json())
    .then((comments) => {
        console.log(comments);
        let comments_div = document.getElementById("comments-container");
        for (const comment of comments) {
            let comment_div = document.createElement("div");
            comment_div.classList.add("comment");
            comments_div.appendChild(comment_div);
            for (const key in comment) {
                let p = document.createElement("p");
                p.classList.add("content-comment");
                comment_div.appendChild(p);
                p.innerHTML += `<b>${key}</b>: ${comment[key]}<br>`;
            }
        }
    });
