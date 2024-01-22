const btnCriar = document.querySelector('#criar')
const btnAtualizarModal = document.querySelector('.atualizarModal')
const modal = document.querySelector('.modal-container')

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
                const btnConcluir = document.createElement('button')

                li.setAttribute('id', tarefa.id);
                btnExcluir.setAttribute('id', tarefa.id);
                btnAtualizar.setAttribute('id', tarefa.id);
                btnConcluir.setAttribute('id', tarefa.id);
                li.setAttribute('class', 'titulo');
                btnExcluir.classList.add('excluir')
                btnAtualizar.classList.add('atualizar')
                btnConcluir.classList.add('concluir')

                h2.innerText = tarefa.titulo
                p.innerText = tarefa.descricao
                span.innerText = tarefa.status
                btnAtualizar.innerText = 'Atualizar'
                btnExcluir.innerText = 'Excluir'
                btnConcluir.innerText = '✔'

                li.appendChild(h2)
                li.appendChild(p)
                li.appendChild(span)
                li.appendChild(btnAtualizar)
                li.appendChild(btnExcluir)
                span.appendChild(btnConcluir)
                li.innerHTML
                tarefas.appendChild(li);
            })
        })
}

function criarTarefa(e) {
    e.preventDefault();
    const titulo = document.querySelector('#titulo').value
    const descricao = document.querySelector('#descricao').value

    const _data = {
        titulo,
        descricao,
        status: "A concluir"
    }

    try {
        fetch(`http://localhost:3000/salvar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(_data)
        }).then((response) => response.json())
            .then((data) => {
                console.log('Sucesso ao criar')
            })
    } catch {
        console.log("Erro ao criar")
    }
}


function excluirTarefa(e) {
    e.preventDefault();
    const id = e.target.id;
    try {
        fetch(`http://localhost:3000/apagar/${id}`, {
            method: 'DELETE',
        }).then((response) => response.json())
            .then((data) => {
                console.log("Sucesso ao excluir")
            })
    } catch {
        console.log("Erro ao excluir")
    }


}

function concluirTarefa(e) {
    e.preventDefault();
    const id = e.target.id;
    const _data = {
        status: 'Concluído'
    }
    try {
        fetch(`http://localhost:3000/atualizar/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(_data)
        }).then((response) => response.json())
            .then((data) => {
                console.log("Sucesso ao concluir tarefa")
            })
    } catch {
        console.log("Erro ao concluir tarefa")
    }
}

function atualizaTarefa(e) {
    e.preventDefault();
    const titulo = document.querySelector('#tituloModal').value
    const descricao = document.querySelector('#descricaoModal').value
    const status = document.querySelector('#statusModal').value
    const id = e.target.id;
    const _data = {
        titulo,
        descricao,
        status
    }
    try {
        fetch(`http://localhost:3000/atualizar/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(_data)
        }).then((response) => response.json())
            .then((data) => {
                console.log("Sucesso ao atualizar tarefa")
            })
    } catch {
        console.log("Erro ao atualizar tarefa")
    }
}

function openModal(e) {
    btnAtualizarModal.setAttribute('id', e.target.id)
    modal.classList.add('openModal')
}

function closeModal() {
    modal.classList.remove('openModal')
}


function pesquisarTarefa() {
    const inputBusca = document.querySelector('.pesquisar');
    const listaTarefas = document.querySelector('.tarefas');

    inputBusca.addEventListener('keyup', () => {
        const valor = inputBusca.value.toLowerCase();

        const tarefa = listaTarefas.querySelectorAll('.titulo');

        for (let p in tarefa) {
            if (true === isNaN(p)) {
                continue;
            }

            const titulo = tarefa[p].innerHTML.toLowerCase();
            if (true === titulo.includes(valor)) {
                tarefa[p].style.display = '';
            } else {
                tarefa[p].style.display = 'none';

            }
        }
    })
}

function ordenarTarefa() {
    const select = document.querySelector('.filtros');
    const opValor = select.options[select.selectedIndex];
    const listaTarefas = document.querySelector('.tarefas');
    const valorOp = opValor.value;

    select.addEventListener('click', () => {
        const valorOp = select.value.toLowerCase();
        const tarefa = listaTarefas.querySelectorAll('.titulo');
        for (let p in tarefa) {
            if (true === isNaN(p)) {
                continue;
            }
            const titulo = tarefa[p].innerHTML.toLowerCase();
            if (true === titulo.includes(valorOp)) {
                tarefa[p].style.display = '';
            } else {
                tarefa[p].style.display = 'none';
            }
        }
    })
}

ordenarTarefa();
pesquisarTarefa();
buscarTarefas();

btnCriar.addEventListener('click', criarTarefa);

document.addEventListener('click', (e) => {
    const elementoClicado = e.target;
    if (elementoClicado.classList.contains('excluir')) {
        excluirTarefa(e);
    }

})


document.addEventListener('click', (e) => {
    const elementoClicado = e.target;
    if (elementoClicado.classList.contains('atualizarModal')) {
        atualizaTarefa(e);
    }

})


document.addEventListener('click', (e) => {
    const elementoClicado = e.target;
    if (elementoClicado.classList.contains('concluir')) {
        concluirTarefa(e);
    }
})


document.addEventListener('click', (e) => {
    const elementoClicado = e.target;
    if (elementoClicado.classList.contains('atualizar')) {
        openModal(e)
    }
})
