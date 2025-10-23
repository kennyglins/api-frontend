# NLW Agents

Projeto desenvolvido durante o evento NLW (Next Level Week) da Rocketseat, focado em agentes inteligentes.

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 19** - Biblioteca para construção de interfaces
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Vite** - Build tool e bundler moderno
- **React Router DOM** - Roteamento para aplicações React
- **TanStack Query** - Gerenciamento de estado servidor e cache
- **Tailwind CSS** - Framework CSS utilitário
- **Radix UI** - Componentes acessíveis e customizáveis
- **Lucide React** - Biblioteca de ícones

### Ferramentas de Desenvolvimento
- **Biome** - Linter e formatter (configurado com Ultracite)
- **Ultracite** - Configuração de linting otimizada

## 📁 Estrutura do Projeto

```
src/
├── components/
│   └── ui/           # Componentes de interface
├── lib/
│   └── utils.ts      # Utilitários
├── pages/
│   ├── create-room.tsx
│   └── room.tsx
├── app.tsx           # Configuração de rotas
└── main.tsx          # Ponto de entrada
```

## 🛠️ Setup e Configuração

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd web
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

4. Para build de produção:
```bash
npm run build
```

5. Para preview do build:
```bash
npm run preview
```

## 🎯 Funcionalidades

- **Criação de Salas**: Interface para criar e gerenciar salas
- **Navegação entre Salas**: Sistema de roteamento para acessar salas específicas
- **Integração com API**: Consumo de dados via TanStack Query
- **Interface Responsiva**: Design moderno com Tailwind CSS

## 🔧 Configurações

- **TypeScript**: Configurado com strict mode
- **Path Mapping**: Alias `@` para pasta `src`
- **Tailwind CSS**: Configurado com tema customizado e suporte a dark mode
- **Biome**: Linting e formatação automática

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Preview do build gerado

---

Desenvolvido com ❤️ durante o NLW da Rocketseat
