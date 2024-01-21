const { error } = require("console")
const express = require("express")
const fs = require("fs")
const cors = require("cors")

const app = express()
const router = express.Router()
app.use(cors())
app.use(express.json({ extended: true }))

const conteudo = () => {
    const tarefas = fs.readFileSync('./data/tarefas.json', 'utf-8')
    return JSON.parse(tarefas)
}

router.get('/buscar', (req, res) => {
    const tarefas = conteudo()
    res.send(tarefas)
})

router.put('/atualizar/:id', (req, res) => {
    const { id } = req.params
    const { titulo, descricao, status } = req.body
    const tarefas = conteudo()
    try {
        const tarefaEscolhida = tarefas.findIndex((tarefas) => tarefas.id === id)
        const { id: nId, titulo: nTitulo, descricao: nDescricao, status: nStatus } = tarefas[tarefaEscolhida]
        const tarefaAtualizada = {
            id: nId,
            titulo: titulo ? titulo : nTitulo,
            descricao: descricao ? descricao : nDescricao,
            status: status ? status : nStatus
        }
        tarefas[tarefaEscolhida] = tarefaAtualizada
        fs.writeFileSync('./data/tarefas.json', JSON.stringify(tarefas), 'utf-8')
    } catch {
        console.log("Tarefa não encontrada")
    }
    res.send(tarefas)
})

router.delete('/apagar/:id', (req, res) => {
    const { id } = req.params
    const tarefas = conteudo()
    try {
        const tarefaEscolhida = tarefas.findIndex((tarefas) => tarefas.id === id)
        tarefas.splice(tarefaEscolhida, 1)
        fs.writeFileSync('./data/tarefas.json', JSON.stringify(tarefas), 'utf-8')
    } catch {
        console.log("Tarefa não encontrada")
    }
    res.send(tarefas)
})

router.post('/salvar', (req, res) => {
    const { titulo, descricao, status } = req.body
    const tarefas = conteudo()
    const id = Math.random().toString(10).substring(2, 5)
    try {
        tarefas.push({ id, titulo, descricao, status })
        fs.writeFileSync('./data/tarefas.json', JSON.stringify(tarefas), 'utf-8')
    } catch {
        console.log('Erro ao salvar')
    }
    res.send(tarefas)

})

app.use(router)
app.listen(3000, () => {
    console.log('Servidor On')
})