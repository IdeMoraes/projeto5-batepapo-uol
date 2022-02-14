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
            todasMensagens += `<div class="status">Mensagem entrou/saiu chumbada ${sucesso.data[i].text}</div>`;
        }
        else if (sucesso.data[i].type==="message"){
            todasMensagens +=`<div class="message">Mensage visível a todos chumbada ${sucesso.data[i].text}</div>`;
        }
        else {
            todasMensagens += `<div class="private-message">Mensagem privada chumbada ${sucesso.data[i].text}</div>`;
        }
    }
    const mensagens = document.querySelector(".main")
    mensagens.innerHTML = todasMensagens;
}

/* comandos */

let nome = prompt('Qual é seu nome?')

entrarNaSala();

setInterval(manterConexao, 5000);

setInterval(buscarMensagens, 3000);
