const btnCriar = document.querySelector('#criar')
function buscarTarefas() {
    fetch(`http://localhost:3000/buscar`, {
        method: 'GET'
    }).then((response) => response.json())
        .then((data) => {
            const tarefas = document.querySelector(".tarefas")

            data.map((tarefa) => {
                const li = document.createElement('li');
                const h2 = document.createElement('h2')
                const p = document.createElement('p')
                const span = document.createElement('span')
                const btnAtualizar = document.createElement('button')
                const btnExcluir = document.createElement('button')

                li.setAttribute('id', tarefa.id);
                btnExcluir.setAttribute('id', tarefa.id);

                h2.innerText = tarefa.titulo
                p.innerText = tarefa.descricao
                span.innerText = tarefa.status
                btnAtualizar.innerText = 'atualizar'
                btnExcluir.innerText = 'excluir'

                li.appendChild(h2)
                li.appendChild(p)
                li.appendChild(span)
                li.appendChild(btnAtualizar)
                li.appendChild(btnExcluir)
                li.innerHTML
                tarefas.appendChild(li);
            })
        })
}

function criarTarefa(e) {
    e.preventDefault();
    const titulo = document.querySelector('#titulo').value
    const descricao = document.querySelector('#descricao').value
    const status = document.querySelector('#status').value
    
    const tarefa = {
        titulo,
        descricao,
        status
    }

    try {
        fetch(`http://localhost:3000/salvar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tarefa)
        }).then((response) => response.json())
            .then((data) => {
                console.log(data)
            })
    } catch {
        console.log("Erro ao criar")
    }
}

function excluirTarefa(){



}



buscarTarefas();
btnCriar.addEventListener('click', criarTarefa);