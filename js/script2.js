// Exemplo de dados
let demandas = [];
let empresaId = 15;

function carregarDemandas() {
    popularTabela([])
    fetch("demandas.json")
        .then(response => response.json())
        .then(data => {
            demandas = data;
            popularTabela(demandas);
        })
        .catch(error => console.error('Erro ao carregar demandas:', error));
}


// Função para gerar dados de demandas
/*
function gerarDemandas(num) {
    const generos = ["Masculino", "Masculino Trans", "Feminino", "Feminino Trans"];
    const faixasEtarias = ["18-25", "26-35", "36-45", "46-55", "56+"];
    const tiposParticularidades = ["Cadeirantes", "Hipertensos", "Nenhuma particularidade"];

    let demandas = [];
    let generosUtilizados = [];

    for (let i = 0; i < num; i++) {
        let genero;
        // Garante que pelo menos uma demanda de cada gênero seja gerada
        if (i < generos.length) {
            genero = generos[i];
        } else {
            genero = generos[Math.floor(Math.random() * generos.length)];
        }

        let faixaetaria = faixasEtarias[Math.floor(Math.random() * faixasEtarias.length)];
        let quantidade = Math.floor(Math.random() * 100) + 1;
        let particularidades = [];

        // Adiciona pelo menos duas particularidades aleatórias, se aplicável
        let particularidadesSelecionadas = 0;
        tiposParticularidades.forEach(tipo => {
            if (Math.random() < 0.2 && tipo !== "Nenhuma particularidade" && particularidadesSelecionadas < 2) {
                particularidades.push({ tipo: tipo, quantidade: Math.floor(Math.random() * quantidade) + 1 });
                particularidadesSelecionadas++;
            }
        });

        // Se nenhuma particularidade foi adicionada, inclui a particularidade padrão
        if (particularidades.length === 0) {
            particularidades.push({ tipo: "Nenhuma particularidade", quantidade });
        }

        demandas.push({
            genero,
            faixaetaria,
            quantidade,
            particularidades
        });

        // Registra quais gêneros já foram utilizados
        if (!generosUtilizados.includes(genero)) {
            generosUtilizados.push(genero);
        }
    }

    // Se ainda faltar algum gênero ser utilizado, adiciona mais demandas para completar
    generos.forEach(genero => {
        if (!generosUtilizados.includes(genero)) {
            let faixaetaria = faixasEtarias[Math.floor(Math.random() * faixasEtarias.length)];
            let quantidade = Math.floor(Math.random() * 100) + 1;
            let particularidades = [{ tipo: "Nenhuma particularidade", quantidade }];

            demandas.push({
                genero,
                faixaetaria,
                quantidade,
                particularidades
            });
        }
    });

    return demandas;
}
*/
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


// Função para enviar as demandas atualizadas para o servidor
function salvarNoServidor() {
    let demandaDaEmpresa = {empresaId: empresaId,
    demandas: demandas};
    const jsonContent = JSON.stringify(demandaDaEmpresa, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'demandas.json';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

document.addEventListener('DOMContentLoaded', function() {
    carregarDemandas();
});
// Inicializa a tabela com os dados de exemplo
//popularTabela(demandas);