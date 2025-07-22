let chave = "953973b12bc8cc046ad538b31fd96759";

function colocarNaTela(dados) {
    if (dados.cod === "404") {
        alert("Cidade não encontrada.");
        return;
    }

    document.querySelector(".cidade").innerHTML = "Tempo em " + dados.name;
    document.querySelector(".temp").innerHTML = Math.floor(dados.main.temp) + "°C";
    document.querySelector(".descricao").innerHTML = dados.weather[0].description;
    document.querySelector(".icone").src =
        "https://openweathermap.org/img/wn/" + dados.weather[0].icon + ".png";
    document.querySelector(".umidade").innerHTML = "Umidade: " + dados.main.humidity + "%";
}

async function buscarCidade(cidade) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cidade)}&appid=${chave}&lang=pt_br&units=metric`;
    const resposta = await fetch(url);
    const dados = await resposta.json();
    colocarNaTela(dados);
}

async function buscarPorCoordenadas(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${chave}&lang=pt_br&units=metric`;
    const resposta = await fetch(url);
    const dados = await resposta.json();
    colocarNaTela(dados);
}

function cliqueiNoBotao() {
    let cidade = document.querySelector(".input-cidade").value.trim();
    if (!cidade) {
        alert("Digite o nome de uma cidade.");
        return;
    }
    buscarCidade(cidade);
}

function pegarLocalizacao() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (posicao) => {
                const lat = posicao.coords.latitude;
                const lon = posicao.coords.longitude;
                buscarPorCoordenadas(lat, lon);
            },
            (erro) => {
                alert("Não foi possível obter a localização.");
                console.error(erro);
            }
        );
    } else {
        alert("Geolocalização não é suportada pelo seu navegador.");
    }
}
