const API_URL = "http://127.0.0.1:5000/api";

// Dados dos personagens
const personagens = [
  {
    nome: "Notas do Subterrâneo",
    psicologico: "Introspectivo, melancólico e alienado.",
    filosofico: "Discute o absurdo da existência.",
    religioso: "Busca por redenção espiritual."
  },
  {
    nome: "Os Irmãos Karamazov",
    psicologico: "Representa três forças do espírito humano: razão, emoção e fé.",
    filosofico: "Investiga o livre arbítrio e a moralidade.",
    religioso: "Centraliza a importância da fé cristã."
  },
  {
    nome: "Crime e Castigo",
    psicologico: "Raskólnikov enfrenta culpa devastadora após cometer um assassinato.",
    filosofico: "Questiona o direito do homem de decidir a vida de outro.",
    religioso: "A redenção vem pela aceitação da fé."
  },
  {
    nome: "O Idiota",
    psicologico: "O Príncipe Míchkin luta para manter sua bondade em um mundo corrompido.",
    filosofico: "Analisa a pureza moral e seus desafios.",
    religioso: "Figura como uma representação cristológica."
  }
];

// Função para renderizar personagens
function renderPersonagens() {
  const container = document.getElementById("personagens-container");
  personagens.forEach((personagem) => {
    const card = document.createElement("div");
    card.className = "col-md-4";
    card.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${personagem.nome}</h5>
          <p><strong>Psicológico:</strong> ${personagem.psicologico}</p>
          <p><strong>Filosófico:</strong> ${personagem.filosofico}</p>
          <p><strong>Religioso:</strong> ${personagem.religioso}</p>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// Função para buscar usuários
async function fetchUsuarios() {
  try {
    const response = await fetch(`${API_URL}/buscar_usuarios`);
    const data = await response.json();
    renderUsuarios(data);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
  }
}

// Função para cadastrar um novo usuário
async function cadastrarUsuario(usuario) {
  try {
    const response = await fetch(`${API_URL}/cadastrar_usuario`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });

    if (response.ok) {
      alert("Usuário cadastrado com sucesso!");
      fetchUsuarios(); // Atualiza a lista de usuários
    } else {
      alert("Erro ao cadastrar usuário.");
    }
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
  }
}

// Função para excluir usuário
async function excluirUsuario(userId) {
  try {
    const response = await fetch(`${API_URL}/deletar_usuario/${userId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Usuário excluído com sucesso!");
      fetchUsuarios(); // Atualiza a lista de usuários
    } else {
      alert("Erro ao excluir usuário.");
    }
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
  }
}

// Função para renderizar usuários na tela
function renderUsuarios(usuarios) {
  const usuariosContainer = document.getElementById("usuarios-container");
  usuariosContainer.innerHTML = "";

  usuarios.forEach((usuario) => {
    const usuarioDiv = document.createElement("div");
    usuarioDiv.className = "card mb-2 p-3 shadow-sm";
    usuarioDiv.innerHTML = `
      <strong>Nome:</strong> ${usuario.name} <br>
      <strong>Email:</strong> ${usuario.email} <br>
      <button class="btn btn-danger mt-2 btn-sm" onclick="excluirUsuario(${usuario.id})">
        Excluir
      </button>
    `;
    usuariosContainer.appendChild(usuarioDiv);
  });
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  renderPersonagens();
  fetchUsuarios();

  const form = document.getElementById("cadastrar-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    cadastrarUsuario({ name: nome, email });
  });
});
