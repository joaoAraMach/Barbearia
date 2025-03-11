document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const createUserForm = document.getElementById('createUserForm');
    const servicoForm = document.getElementById('servicoForm');
    const profissionalForm = document.getElementById('profissionalForm');
    const agendamentoForm = document.getElementById('agendamentoForm');

    let usuarios = [];
    let profissionais = [];
    let servicos = [];
    let agendamentos = [];

    // Função para mostrar o formulário de criação de usuário
    window.showCreateUserForm = function () {
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('createUserScreen').classList.remove('hidden');
    };

    // Função para esconder o formulário de criação de usuário
    window.hideCreateUserForm = function () {
        document.getElementById('createUserScreen').classList.add('hidden');
        document.getElementById('loginScreen').classList.remove('hidden');
    };

    // Função para criar um novo usuário
    createUserForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const newUsername = document.getElementById('newUsername').value;
        const newPassword = document.getElementById('newPassword').value;
        const userType = document.getElementById('userType').value;

        usuarios.push({ username: newUsername, password: newPassword, type: userType });
        alert('Usuário criado com sucesso!');
        hideCreateUserForm();
    });

    // Função de login
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const usuario = usuarios.find(u => u.username === username && u.password === password);
        if (usuario) {
            if (usuario.type === 'admin') {
                document.getElementById('loginScreen').classList.add('hidden');
                document.getElementById('adminScreen').classList.remove('hidden');
            } else {
                document.getElementById('loginScreen').classList.add('hidden');
                document.getElementById('userScreen').classList.remove('hidden');
            }
        } else {
            alert('Usuário ou senha incorretos!');
        }
    });

    // Função de logout
    window.logout = function () {
        document.getElementById('loginScreen').classList.remove('hidden');
        document.getElementById('userScreen').classList.add('hidden');
        document.getElementById('adminScreen').classList.add('hidden');
        document.getElementById('createUserScreen').classList.add('hidden');
    };

    // Função para adicionar um novo serviço
    servicoForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const servicoNome = document.getElementById('servicoNome').value;
        const servicoDescricao = document.getElementById('servicoDescricao').value;
        const servicoValor = document.getElementById('servicoValor').value;

        servicos.push({ nome: servicoNome, descricao: servicoDescricao, valor: servicoValor });
        atualizarServicos();
        alert('Serviço adicionado com sucesso!');
        servicoForm.reset();
    });

    // Função para atualizar a lista de serviços
    function atualizarServicos() {
        const servicosTable = document.getElementById('servicosTable').getElementsByTagName('tbody')[0];
        servicosTable.innerHTML = '';
        servicos.forEach((servico, index) => {
            const newRow = servicosTable.insertRow();
            newRow.innerHTML = `
                <td>${servico.nome}</td>
                <td>${servico.descricao}</td>
                <td>R$ ${servico.valor}</td>
                <td><button onclick="deleteServico(${index})">Excluir</button></td>
            `;
        });
    }

    // Função para deletar um serviço
    window.deleteServico = function (index) {
        servicos.splice(index, 1);
        atualizarServicos();
    };
});
