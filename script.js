/* variáveis globais */



/* funções */

function entrarNaSala(){
    const requisicao = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', {name: nome});
    //requisicao.then((sucesso)=>{console.log(sucesso)});
    requisicao.catch(tratarErrorCadastro);
}

function tratarErrorCadastro(erro){
    //console.log(erro);
    nome = prompt ('Este nome já está em uso. Por favor, digite outro.');
    entrarNaSala();
};

function manterConexao (){
    const requisicao = axios.post('https://mock-api.driven.com.br/api/v4/uol/status', {name: nome});
    //requisicao.then((sucesso)=>{console.log(sucesso)});
    //requisicao.catch((erro)=>{console.log(erro)});
}

function buscarMensagens(){
        const requisicao = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');
        requisicao.then(exibirMensagensNaTela);
        //requisicao.catch((erro)=>{console.log(erro)});
}

function exibirMensagensNaTela (sucesso){
    //console.log(sucesso);
    let todasMensagens=``;

    for(let i=0; i<sucesso.data.length;i++){
        if(sucesso.data[i].type==="status"){
            todasMensagens += `<div class="status" data-identifier="message">${sucesso.data[i].time} <b>${sucesso.data[i].from}</b> ${sucesso.data[i].text}</div>`;
        }
        else if (sucesso.data[i].type==="message"){
            todasMensagens +=`<div class="message" data-identifier="message">${sucesso.data[i].time} <b>${sucesso.data[i].from}</b> para <b>${sucesso.data[i].to}</b>: ${sucesso.data[i].text}</div>`;
        }
        else {
            if(sucesso.data[i].to===nome){
                todasMensagens += `<div class="private-message" data-identifier="message">${sucesso.data[i].time} <b>${sucesso.data[i].from}</b> reservadamente para <b>${sucesso.data[i].to}</b>: ${sucesso.data[i].text}</div>`;
            }
        }
    }
    const mensagens = document.querySelector(".main")
    mensagens.innerHTML = todasMensagens;
}

function enviarMensagem(){
    const mensagem = document.querySelector("input").value;
    const objetoMensagem = {
        from: nome,
        to: "todos",
        text: mensagem,
        type: "message" // ou "private_message" para o bônus
    }
    //alert (mensagem);
    const requisicao = axios.post('https://mock-api.driven.com.br/api/v4/uol/messages', objetoMensagem);

    requisicao.then(()=>{buscarMensagens()});
    requisicao.catch(()=>{window.location.reload()});
}

/* comandos */

let nome = prompt('Qual é seu nome?')

entrarNaSala();

setInterval(manterConexao, 5000);

setInterval(buscarMensagens, 3000);
