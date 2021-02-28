document.body.onload 
{
    const panel = document.querySelector("#panel");
    if(panel)
    {
        let labele = ["Username: ", "Password: "];
        let inputClassNames = ["user", "pw"];
        let inputTypes = ["text", "password"];

        const naslov = document.createElement("h1");
        naslov.innerHTML = "Admin Panel";
        naslov.className = "naslov";
        panel.appendChild(naslov);

        const forma = document.createElement("div");
        forma.className = "forma";
        panel.appendChild(forma);

        labele.forEach((lab, i) => {
            const formaUnos = document.createElement("div");
            formaUnos.className = "formaUnos";
            forma.appendChild(formaUnos);

            const newLabel = document.createElement("label");
            newLabel.innerHTML = lab;
            formaUnos.appendChild(newLabel);

            const input = document.createElement("input");
            input.type = inputTypes[i];
            input.classList.add("poljeUnos", inputClassNames[i]);
            formaUnos.appendChild(input);
        });
        

        const divDugmici = document.createElement("div");
        divDugmici.className = "divDugmici";
        panel.appendChild(divDugmici);

        const login = document.createElement("button");
        login.innerHTML = "Login";
        login.className = "loginButton";
        login.addEventListener('click', loginClicked);
        divDugmici.appendChild(login);

        function loginClicked()
        {
            let username = document.querySelector(".user");
            let pw = document.querySelector(".pw");
            alert(`username: ${username.value}\npassword: ${pw.value}`);
        }
    }
}