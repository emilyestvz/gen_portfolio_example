const about = document.querySelector('#about');
const formulario = document.querySelector('#formulario');
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

async function getApiGithub() {

    try {
        const response = await fetch(`https://api.github.com/users/emilyestvz`);

        // Converte os dados em json
        const perfil = await response.json();
        
        about.innerHTML = `
            <article id="about-img" class="about-content">
          
                <img src="${perfil.avatar_url}" alt="${perfil.login}">
                </article>

                <article id="about-txt" class="flex home-content">

                <h1>SOBRE MIM</h1>
                <p>Atualmente em transição de carreira, venho de uma experiência enriquecedora na Espanha de 2022 a 2023, onde estudei e alcancei fluência em espanhol, além de aprimorar meu inglês e adquirir uma bagagem cultural valiosa.
                <br>Anteriormente, trabalhei com atendimento ao cliente e vendas em vários âmbitos, onde tive a oportunidade de aprimorar minha adaptabilidade, comunicação, trabalho em equipe e metodologias ágeis.</p>

                <div id="about-github">
                    <a class="botao" href="https://github.com/emilyestvz" target="_blank">
                    GitHub
                    </a>
                </div>

                <div>
                    <p>
                    <img src="./assets/icons/user.svg" alt="Ícone user">${perfil.followers} Seguidores
                    <br>
                    <img src="./assets/icons/folder.svg" alt="Ícone folder">${perfil.public_repos} Repositórios
                </p>
                </div>
        </article>
            `
            about.innerHTML += conteudo;

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

formulario.addEventListener('submit', (event) => {

    // Após passar pelas validações, envia o email
    event.preventDefault();

    let formValido = true;

    // Validação nome
    const campoNome = document.querySelector('#nome');
    const txtNome = document.querySelector('#txtNome');

    if(campoNome.value.trim().length < 3) {
        txtNome.innerHTML = `O nome deve ter no mínimo 3 caracteres.`
        txtNome.style.color = 'red'
        campoNome.focus()
        formValido = false;
    }else{ 
        txtNome.innerHTML = '';
    }

    // Validação email
    const campoEmail = document.querySelector('#email');
    const txtEmail = document.querySelector('#txtEmail');

    if(!campoEmail.value.trim().match(emailRegex)) {
        txtEmail.innerHTML = `O email digitado é inválido.`
        txtEmail.style.color ='red'
        campoEmail.focus()
        formValido = false;
    } else{
        txtEmail.innerHTML = '';
    }

    // Validação assunto
    const campoAssunto = document.querySelector('#assunto');
    const txtAssunto = document.querySelector('#txtAssunto');

    if(campoAssunto.value.trim().length < 5) {
        txtAssunto.innerHTML = `O assunto deve conter no mínimo 5 caracteres.`
        txtAssunto.style.color ='red'
        campoAssunto.focus()
        formValido = false;
    }else{ 
        txtAssunto.innerHTML = '';
    }

    // Se tudo estiver válido, envia o formulário
    if (formValido) {
        alert('Formulário enviado com sucesso! ✨');
        formulario.submit(); 
        formulario.reset();
    }
})

getApiGithub();