# D&D Campaign Manager

Uma aplicação desktop para gerenciar campanhas de D&D 5e, construída com Vue.js e Electron.

## Funcionalidades

### 🏠 Dashboard
- Visão geral da campanha
- Acesso rápido às funcionalidades principais
- Rolagem de dados integrada
- Estatísticas de personagens

### 👥 Gerenciamento de Personagens
- Criação completa de personagens D&D 5e
- Atributos: Força, Destreza, Constituição, Inteligência, Sabedoria, Carisma
- Níveis, pontos de vida, classe de armadura
- Fichas de personagem detalhadas
- Upload de imagens de personagens

### ⚔️ Rastreador de Iniciativa
- Gerenciamento de turnos em combate
- Integração com personagens salvos
- Adição rápida de NPCs/inimigos
- Controle de HP em tempo real
- Limpeza de batalha

### 🎲 Sistema de Dados
- Dados padrão: d4, d6, d8, d10, d12, d20, d100
- Notação personalizada: 2d6+3, 1d20+5, etc.
- Histórico de rolagens
- Integração com iniciativa

## Instalação

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm

### Passos para instalação

1. Clone o repositório:
```bash
git clone https://github.com/Lucky-xn/dnd.git
cd dnd
```

2. Instale as dependências:
```bash
npm install
```

3. Execute a aplicação:
```bash
npm run start
```

## Desenvolvimento

### Para desenvolvimento apenas do frontend:
```bash
npm run dev
```

### Para executar o Electron:
```bash
npm run electron
```

### Para executar frontend + Electron simultaneamente:
```bash
npm run start
```

## Estrutura do Projeto

```
src/
├── components/          # Componentes Vue reutilizáveis
│   ├── DiceRoller.vue   # Sistema de rolagem de dados
│   ├── NavBar.vue       # Barra de navegação
│   ├── IniciativeCard.vue # Cards de iniciativa
│   └── Personagens/     # Componentes de personagens
├── views/               # Páginas principais
│   ├── System/          # Sistema geral
│   │   ├── Home.vue     # Dashboard principal
│   │   ├── Characters.vue # Listagem de personagens
│   │   └── CharacterSheet.vue # Ficha detalhada
│   └── Dm/              # Ferramentas do Mestre
│       └── IniciativeTracker.vue # Rastreador de iniciativa
├── router/              # Configuração de rotas
└── app/                 # Backend Electron
    ├── db/              # Banco de dados SQLite
    ├── handlers/        # Handlers IPC
    └── services/        # Serviços de dados
```

## Tecnologias Utilizadas

- **Frontend**: Vue.js 3, Vue Router
- **Styling**: Tailwind CSS
- **Desktop**: Electron
- **Banco de Dados**: SQLite
- **Ícones**: Iconify
- **Build**: Vite

## Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para detalhes.

---

### To install:

* npm install

### To run project:

* npm run start