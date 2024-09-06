fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => {
        let table = document.getElementById("table");
        let tr;
        for (const user of users) {
            if (user.id%2 !== 0) {
                tr = document.createElement("tr");
                table.appendChild(tr);
            }
            let td = document.createElement("td");
            tr.appendChild(td);
            let div = document.createElement("div");
            div.classList.add("user");
            td.appendChild(div);
            div.innerText = `Id: ${user.id}
                                Name: ${user.name}`;
            let link = document.createElement("a");
            link.href = 'user-details.html';
            link.onclick = () => localStorage.setItem("user", JSON.stringify(user));
            link.innerText = 'Learn more';
            td.appendChild(link);
        }
    });
