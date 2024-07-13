// Exemplo de dados
let doacaos = [];
let empresaId = "SOJUNTOS";
let necessidades = [];
function carregarDoacaos() {
    fetch("doacoes.json")
        .then(response => response.json())
        .then(data => {
            coisas = data;
            coisas.forEach((coisa, ic)=>{
                    necessidades.push(coisa);
                }

            )
            popularNecessidades(necessidades);
        })
        .catch(error => console.error('Erro ao carregar doacaos:', error));
}

function calcularServicos(d){
    var serviceActual = [];
    /*
    for (const p of d.particularidades) {
        if (p.tipo.includes("Gravidas")) {
            serviceActual.push({
                nome: "Ginecologista",
                quantidade: "1"
            });
        }
        if (p.tipo.includes("Hipertensos")) {
            serviceActual.push({
                nome: "Cardiologista",
                quantidade: "1"
            });
        }
    }*/
    return serviceActual;

}

function calcularAlimentos(doacao){
    var alimentos = [];
    /*alimentos.push({ "nome": "arroz", "quantidade": 2*doacao.quantidade },   // kg por semana
        { "nome": "feijao", "quantidade": 1*doacao.quantidade },  // kg por semana
        { "nome": "macarrao", "quantidade": 1*doacao.quantidade },  // kg por semana
        { "nome": "oleo", "quantidade": 1*doacao.quantidade },  // litro por semana
        { "nome": "sal", "quantidade": 0.5*doacao.quantidade },  // kg por semana
        { "nome": "acucar", "quantidade": 1*doacao.quantidade },  // kg por semana
        { "nome": "cafe", "quantidade": 0.5*doacao.quantidade},  // kg por semana
        { "nome": "farinha_de_trigo", "quantidade": 1*doacao.quantidade },  // kg por semana
        { "nome": "batata", "quantidade": 3*doacao.quantidade },  // kg por semana
        { "nome": "cenoura", "quantidade": 1*doacao.quantidade },  // kg por semana
        { "nome": "tomate", "quantidade": 1*doacao.quantidade },  // kg por semana
        { "nome": "cebola", "quantidade": 0.5*doacao.quantidade },  // kg por semana
        { "nome": "banana", "quantidade": 2*doacao.quantidade },  // dúzias por semana
        { "nome": "laranja", "quantidade": 1*doacao.quantidade },  // dúzias por semana
        { "nome": "leite", "quantidade": 3*doacao.quantidade },  // litros por semana
        { "nome": "carne_bovina", "quantidade": 2*doacao.quantidade },  // kg por semana
        { "nome": "frango", "quantidade": 1*doacao.quantidade },  // kg por semana
        { "nome": "peixe", "quantidade": 0.5*doacao.quantidade },  // kg por semana
        { "nome": "ovos", "quantidade": 1*doacao.quantidade });  // dúzias por semana

     */
    return alimentos;
}

function calcularMedicamentos(d){
    var medicamentoAtual = [];
    /*
    for (const p of d.particularidades) {

        if (p.tipo.includes("Gravidas")) {
            medicamentoAtual.push({
                nome: "Piridoxina",
                quantidade: p.quantidade
            },{
                nome: "Ácido fólico",
                quantidade: p.quantidade
            })
        }
        if (p.tipo.includes("Hipertensos")) {
            medicamentoAtual.push({
                nome: "Hidroclorotiazida Medley 25mg",
                quantidade: p.quantidade
            });
        }
    }*/
    return medicamentoAtual;
}


function calcularHigiene(d){
    var produtos = [];

    var produtosNecessarios =

    produtos.push({ "nome": "sabonete", "quantidade": 2*d.quantidade },   // unidades por mês
        { "nome": "shampoo", "quantidade": 1*d.quantidade},  // unidades por mês
        { "nome": "condicionador", "quantidade": 1*d.quantidade },  // unidades por mês
        { "nome": "creme_dental", "quantidade": 2*d.quantidade },  // unidades por mês
        { "nome": "escova_de_dentes", "quantidade": 1*d.quantidade },  // unidades por trimestre
        { "nome": "pasta_de_dentes", "quantidade": 1*d.quantidade },  // unidades por mês
        { "nome": "desodorante", "quantidade": 2*d.quantidade },  // unidades por mês
        { "nome": "papel_higienico", "quantidade": 12*d.quantidade },  // rolos por mês
    )   // unidades por ciclo menstrual
    if(d.genero.includes("Feminino"))
        produtos.push({"nome": "absorvente", "quantidade": 2*d.quantidade})
    return produtos;
}

function calcularNecessidades(doacao){
    const servicos = calcularServicos(doacao);
    const medicamentos = calcularMedicamentos(doacao);
    const alimentos = calcularAlimentos(doacao);
    const higiene = calcularHigiene(doacao);

    necessidades.push({
        servicos: servicos,
        medicamentos: medicamentos,
        alimentos: alimentos,
        higiene: higiene
    })
    return necessidades;
}

// Função para popular a tabela
function popularTabela(doacaos) {
    const tabela = document.getElementById("doacaoTable").getElementsByTagName('tbody')[0];
    tabela.innerHTML = ""; // Limpa a tabela antes de preenchê-la
    doacaos.forEach((doacao, index) => {
        const row = tabela.insertRow();

        const idCell = row.insertCell(0);
        idCell.textContent = index + 1;

        const generoCell = row.insertCell(1);
        generoCell.textContent = doacao.genero;

        const faixaEtariaCell = row.insertCell(2);
        faixaEtariaCell.textContent = doacao.faixaetaria;

        const quantidadeCell = row.insertCell(3);
        quantidadeCell.textContent = doacao.quantidade;

        const particularidadesCell = row.insertCell(4);
        particularidadesCell.textContent = doacao.particularidades;

        const acoesCell = row.insertCell(5);
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
    doacaos.splice(index, 1);
    popularTabela(doacaos);
}

// Função para abrir o modal para adicionar uma nova doacao
function abrirModalAdicionar() {
    document.getElementById('index').value = "";
    document.getElementById('alterarModalLabel').innerText = "Adicionar Nova Doacao";
    document.getElementById('genero').value = "";
    document.getElementById('faixaetaria').value = "";
    document.getElementById('quantidade').value = "";
    document.getElementById('particularidades').value = "";
    const modal = new bootstrap.Modal(document.getElementById('alterarModal'));
    modal.show();
}

// Função para abrir o modal com os dados preenchidos
function abrirModal(index) {
    const doacao = doacaos[index];
    document.getElementById('index').value = index;
    document.getElementById('alterarModalLabel').innerText = "Alterar Doacao";
    document.getElementById('genero').value = doacao.genero;
    document.getElementById('faixaetaria').value = doacao.faixaetaria;
    document.getElementById('quantidade').value = doacao.quantidade;
    //const listaParticularidades = doacao.particularidades.filter(part => part.tipo !== "Nenhuma particularidade").map(part => `${part.tipo}: ${part.quantidade}`).join(", ");
    document.getElementById('particularidades').value = doacao.particularidades;
    modal.show();
}

// Função para salvar as alterações ou adicionar nova doacao
function salvarDoacao(event) {
    event.preventDefault();
    const index = document.getElementById('index').value;
    const genero = document.getElementById('genero').value;
    const faixaetaria = document.getElementById('faixaetaria').value;
    const quantidade = document.getElementById('quantidade').value;
    const particularidades = document.getElementById('particularidades').value;

    const novaDoacao = {
        genero,
        faixaetaria,
        quantidade: parseInt(quantidade),
        particularidades: parseInt(particularidades)
    };

    if (index !== "") {
        doacaos[parseInt(index)] = novaDoacao;
    } else {
        doacaos.push(novaDoacao);
    }
    popularTabela(doacaos);
    const modal = bootstrap.Modal.getInstance(document.getElementById('alterarModal'));
    //popularNecessidade(index+1, calcularNecessidades(novaDoacao));
    modal.hide();
}


function salvarNecessidades() {

    var armazenamentoDoacaos = [];
    doacaos.forEach((doacao, index) =>{
        armazenamentoDoacaos.push({
            id: index,
            "doacaoAtual": doacao,
            necessidades: calcularNecessidades(doacao)
        })
    })


    let doacaoDaEmpresa = {empresaId: empresaId,
        "doacaos": armazenamentoDoacaos}

    const jsonContent = JSON.stringify(doacaoDaEmpresa, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'doacaos.json';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

document.addEventListener('DOMContentLoaded', function() {
    carregarDoacaos();
});
// Inicializa a tabela com os dados de exemplo
//popularTabela(doacaos);

// Função para popular a tabela

function popularNecessidadesDoacao(needTotal, datuais){
    const div = document.getElementById("divNecessidades").setAttribute("class", "");
    const tableNecessidade = document.getElementById("necessidadesTable").getElementsByTagName('tbody')[0];
    tableNecessidade.innerHTML = ""; // Limpa a tabela antes de preenchê-la
    datuais.forEach((datual, index)=>{
    let estoque = datual.quantidade;
    needTotal.forEach((need, ineed)=>{
        var necessidadesLidas = need.demandas[0].necessidades;
        var ong = need.empresaId;
        necessidadesLidas.forEach((necessidade, index) => {

            if(datual.genero.includes("serviços")) {
                const sservicos = necessidade.servicos;
                sservicos.forEach((servico, i) => {
                    if(datual.faixaetaria.includes(higiene.nome) && datual.quantidade>0){
                        const row = tableNecessidade.insertRow();
                        const sidDoacaoCell = row.insertCell(0);
                        sidDoacaoCell.textContent = ong + ": " + index;
                        const sTipoCell = row.insertCell(1);
                        sTipoCell.textContent = "Serviços";
                        const sNomeCell = row.insertCell(2);
                        sNomeCell.textContent = servico.nome;
                        const sQuantidadeCell = row.insertCell(3);
                        sQuantidadeCell.textContent = servico.quantidade;
                        const sdoeiCell = row.insertCell(4);

                        if(datual.quantidade>=servico.quantidade){
                            sdoeiCell.textContent = "Total";
                        }
                        else sdoeiCell.textContent = "Parcialmente";
                        datual.quantidade = datual.quantidade - servico.quantidade;
                    }
                }
                )
            }
            if(datual.genero.includes("medicamentos")) {
                const smedicamentos = necessidade.medicamentos;
                smedicamentos.forEach((medicamento, i) => {
                        if (datual.faixaetaria.includes(medicamento.nome) && datual.quantidade > 0) {
                            const row = tableNecessidade.insertRow();
                            const sidDoacaoCell = row.insertCell(0);
                            sidDoacaoCell.textContent = ong + ": " + index;
                            const sTipoCell = row.insertCell(1);
                            sTipoCell.textContent = "Medicamentos";
                            const sNomeCell = row.insertCell(2);
                            sNomeCell.textContent = medicamento.nome;
                            const sQuantidadeCell = row.insertCell(3);
                            sQuantidadeCell.textContent = medicamento.quantidade;
                            const sdoeiCell = row.insertCell(4);

                            if (datual.quantidade >= medicamento.quantidade) {
                                sdoeiCell.textContent = "Total";
                            } else sdoeiCell.textContent = "Parcialmente";
                            datual.quantidade = datual.quantidade - medicamento.quantidade;
                        }
                    }
                )
            }
            if(datual.genero.includes("alimentos")) {
                const salimentos = necessidade.alimentos;
                salimentos.forEach((alimento, i) => {
                    if(datual.faixaetaria.includes(alimento.nome) && datual.quantidade>0) {
                        const row = tableNecessidade.insertRow();
                        const sidDoacaoCell = row.insertCell(0);
                        sidDoacaoCell.textContent = ong + ": " + index;
                        const sTipoCell = row.insertCell(1);
                        sTipoCell.textContent = "Alimentos";
                        const sNomeCell = row.insertCell(2);
                        sNomeCell.textContent = alimento.nome;
                        const sQuantidadeCell = row.insertCell(3);
                        sQuantidadeCell.textContent = alimento.quantidade;
                        const sdoeiCell = row.insertCell(4);

                        if (datual.quantidade >= alimento.quantidade) {
                            sdoeiCell.textContent = "Total";
                        } else sdoeiCell.textContent = "Parcialmente";
                        datual.quantidade = datual.quantidade - alimento.quantidade;
                    }
                    }
                )
            }
            if(datual.genero.includes("higiene")) {
            const shigiene = necessidade.higiene;
            shigiene.forEach((higiene, i) =>{
                    if(datual.faixaetaria.includes(higiene.nome) && datual.quantidade>0){
                        const row = tableNecessidade.insertRow();
                        const sidDoacaoCell = row.insertCell(0);
                        sidDoacaoCell.textContent = ong + ": "+index;
                        const sTipoCell = row.insertCell(1);
                        sTipoCell.textContent = "Higiene";
                        const sNomeCell = row.insertCell(2);
                        sNomeCell.textContent = higiene.nome;
                        const sQuantidadeCell = row.insertCell(3);
                        sQuantidadeCell.textContent = higiene.quantidade;
                        const sdoeiCell = row.insertCell(4);

                        if(datual.quantidade>=higiene.quantidade){
                            sdoeiCell.textContent = "Total";
                        }
                        else sdoeiCell.textContent = "Parcialmente";
                        datual.quantidade = datual.quantidade - higiene.quantidade;
                    }
                }
            )
            }

        });})
        datual.quantidade = estoque;
    })
    return [];
}


function popularNecessidades(needTotal) {
    if(doacaos.length>0)
        return popularNecessidadesDoacao(needTotal, doacaos);

    const div = document.getElementById("divNecessidades").setAttribute("class", "");
    const tableNecessidade = document.getElementById("necessidadesTable").getElementsByTagName('tbody')[0];
    tableNecessidade.innerHTML = ""; // Limpa a tabela antes de preenchê-la
    needTotal.forEach((need, ineed)=>{
    var necessidadesLidas = need.demandas[0].necessidades;
    var ong = need.empresaId;
    necessidadesLidas.forEach((necessidade, index) => {
        const sservicos = necessidade.servicos;
        sservicos.forEach((servico, i) =>{
                const row = tableNecessidade.insertRow();
                const sidDoacaoCell = row.insertCell(0);
                sidDoacaoCell.textContent = ong + ": "+index;
                const sTipoCell = row.insertCell(1);
                sTipoCell.textContent = "Serviços";
                const sNomeCell = row.insertCell(2);
                sNomeCell.textContent = servico.nome;
                const sQuantidadeCell = row.insertCell(3);
                sQuantidadeCell.textContent = servico.quantidade;
                const sdoeiCell = row.insertCell(4);
                sdoeiCell.textContent = false;
            }
        )

        const smedicamentos = necessidade.medicamentos;
        smedicamentos.forEach((medicamento, i) =>{
                const row = tableNecessidade.insertRow();
                const sidDoacaoCell = row.insertCell(0);
                sidDoacaoCell.textContent = ong + ": "+index;
                const sTipoCell = row.insertCell(1);
                sTipoCell.textContent = "Medicamentos";
                const sNomeCell = row.insertCell(2);
                sNomeCell.textContent = medicamento.nome;
                const sQuantidadeCell = row.insertCell(3);
                sQuantidadeCell.textContent = medicamento.quantidade;
                const sdoeiCell = row.insertCell(4);
                sdoeiCell.textContent = false;
            }
        )

        const salimentos = necessidade.alimentos;
        salimentos.forEach((alimento, i) =>{
                const row = tableNecessidade.insertRow();
                const sidDoacaoCell = row.insertCell(0);
                sidDoacaoCell.textContent = ong + ": "+index;
                const sTipoCell = row.insertCell(1);
                sTipoCell.textContent = "Alimentos";
                const sNomeCell = row.insertCell(2);
                sNomeCell.textContent = alimento.nome;
                const sQuantidadeCell = row.insertCell(3);
                sQuantidadeCell.textContent = alimento.quantidade;
                const sdoeiCell = row.insertCell(4);
                sdoeiCell.textContent = false;
            }
        )
        const shigiene = necessidade.higiene;
        shigiene.forEach((higiene, i) =>{
                const row = tableNecessidade.insertRow();
                const sidDoacaoCell = row.insertCell(0);
                sidDoacaoCell.textContent = ong + ": "+index;
                const sTipoCell = row.insertCell(1);
                sTipoCell.textContent = "Higiene";
                const sNomeCell = row.insertCell(2);
                sNomeCell.textContent = higiene.nome;
                const sQuantidadeCell = row.insertCell(3);
                sQuantidadeCell.textContent = higiene.quantidade;
                const sdoeiCell = row.insertCell(4);
                sdoeiCell.textContent = false;
            }
        )

    });})
    return [];
}