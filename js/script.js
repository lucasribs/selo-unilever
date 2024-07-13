// Exemplo de dados
let demandas = [];
let empresaId = 15;

async function carregarDemandas() {
    try {
        const response = await fetch("demandas.json");
        const data = await response.json();
        demandas = data;
        popularTabela(demandas);
        return demandas; // Retornar demandas carregadas
    } catch (error) {
        console.error('Erro ao carregar demandas:', error);
        return []; // Retorna um array vazio em caso de erro
    }
}

function atualizarDemandas() {
    carregarDemandas().then(demandas => {
        popularTabela(demandas);
    });
}




// Função para popular a tabela
function popularTabela(demandas) {
    const tabela = document.getElementById("demandaTable").getElementsByTagName('tbody')[0];
    tabela.innerHTML = ""; // Limpa a tabela antes de preenchê-la

    demandas.forEach((demanda, index) => {
        const row = tabela.insertRow();

        const generoCell = row.insertCell(0);
        generoCell.textContent = demanda.genero;

        const faixaEtariaCell = row.insertCell(1);
        faixaEtariaCell.textContent = demanda.faixaetaria;

        const quantidadeCell = row.insertCell(2);
        quantidadeCell.textContent = demanda.quantidade;

        const particularidadesCell = row.insertCell(3);
        const listaParticularidades = demanda.particularidades.filter(part => part.nome !== "Nenhuma particularidade").map(part => `${part.tipo}: ${part.quantidade}`).join(", ");
        particularidadesCell.textContent = listaParticularidades || "-";

        const acoesCell = row.insertCell(4);
        acoesCell.innerHTML = `
            <div class="btn-group" role="group" aria-label="Ações">
                <button type="button" class="btn btn-warning btn-sm" onclick="abrirModal(${index})"><i class="bi bi-pencil-square"></i></button>
                <button type="button" class="btn btn-danger btn-sm" onclick="excluirLinha(${index})"><i class="bi bi-trash"></i></button>
            </div>
        `;
    });
}

// Função para excluir uma linha
function excluirLinha(index) {
    demandas.splice(index, 1);
    popularTabela(demandas);
}

// Função para abrir o modal para adicionar uma nova demanda
function abrirModalAdicionar() {
    document.getElementById('index').value = "";
    document.getElementById('alterarModalLabel').innerText = "Adicionar Nova Demanda";
    document.getElementById('genero').value = "";
    document.getElementById('faixaetaria').value = "";
    document.getElementById('quantidade').value = "";
    document.getElementById('particularidades').value = "";
    const modal = new bootstrap.Modal(document.getElementById('alterarModal'));
    modal.show();
}

// Função para abrir o modal com os dados preenchidos
function abrirModal(index) {
    const demanda = demandas[index];
    document.getElementById('index').value = index;
    document.getElementById('alterarModalLabel').innerText = "Alterar Demanda";
    document.getElementById('genero').value = demanda.genero;
    document.getElementById('faixaetaria').value = demanda.faixaetaria;
    document.getElementById('quantidade').value = demanda.quantidade;
    const listaParticularidades = demanda.particularidades.filter(part => part.tipo !== "Nenhuma particularidade").map(part => `${part.tipo}: ${part.quantidade}`).join(", ");
    document.getElementById('particularidades').value = listaParticularidades || "-";
    const modal = new bootstrap.Modal(document.getElementById('alterarModal'));
    modal.show();
}

// Função para salvar as alterações ou adicionar nova demanda
function salvarDemanda(event) {
    event.preventDefault();
    const index = document.getElementById('index').value;
    const genero = document.getElementById('genero').value;
    const faixaetaria = document.getElementById('faixaetaria').value;
    const quantidade = document.getElementById('quantidade').value;
    const particularidadesInput = document.getElementById('particularidades').value;
    const particularidades = particularidadesInput.split(',').map(part => {
        const [tipo, quantidade] = part.split(':').map(item => item.trim());
        return { tipo, quantidade: parseInt(quantidade) };
    });

    const novaDemanda = {
        genero,
        faixaetaria,
        quantidade: parseInt(quantidade),
        particularidades
    };

    if (index !== "") {
        demandas[parseInt(index)] = novaDemanda;
    } else {
        demandas.push(novaDemanda);
    }

    popularTabela(demandas);
    const modal = bootstrap.Modal.getInstance(document.getElementById('alterarModal'));
    modal.hide();
}

// Inicializar a tabela com dados de demandas
carregarDemandas();

function salvarNoServidor() {
    // Aqui você pode implementar a lógica para salvar as demandas no servidor
    // utilizando uma requisição HTTP POST, por exemplo.
    console.log("Salvar no servidor não está implementado.");
}



// Função para popular a tabela
function popularTabela(necessidades) {
    const tabela = document.getElementById("necessidadeTable").getElementsByTagName('tbody')[0];
    tabela.innerHTML = ""; // Limpa a tabela antes de preenchê-la

    necessidades.forEach((necessidade, index) => {
        const row = tabela.insertRow();

        const nomeCell = row.insertCell(0);
        nomeCell.textContent = necessidade.nome;

        const faixaEtariaCell = row.insertCell(1);
        faixaEtariaCell.textContent = demanda.faixaetaria;

        const quantidadeCell = row.insertCell(2);
        quantidadeCell.textContent = demanda.quantidade;

        const particularidadesCell = row.insertCell(3);
        const listaParticularidades = demanda.particularidades.filter(part => part.tipo !== "Nenhuma particularidade").map(part => `${part.tipo}: ${part.quantidade}`).join(", ");
        particularidadesCell.textContent = listaParticularidades || "-";

        const acoesCell = row.insertCell(4);
        acoesCell.innerHTML = `
            <div class="btn-group" role="group" aria-label="Ações">
                <button type="button" class="btn btn-warning btn-sm" onclick="abrirModal(${index})"><i class="bi bi-pencil-square"></i></button>
                <button type="button" class="btn btn-danger btn-sm" onclick="excluirLinha(${index})"><i class="bi bi-trash"></i></button>
            </div>
        `;
    });
}


