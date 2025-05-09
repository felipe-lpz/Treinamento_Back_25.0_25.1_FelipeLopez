Esse texto foi transcrito em Markdown pelo querido Chat GPT, o futuro amigo de todos vocês. Para uma
leitura melhor no VS Code pressione as teclas Ctrl + Shift + V

Caso seu PC for Mac... Cmd + Shift + V

Se você é um doido que tem archlinux e usa Vim pra tudo, eu não preciso nem explicar nada do que você deve fazer aqui

# Instruções para Iniciar o Projeto Backend - NTec 25.0 / 25.1

Salve, Rapaziada da 25.0 e 25.1!!! Como estão????

Primeiramente, gostaria de parabenizar vocês por sobreviverem ao treinamento de Front. Com certeza foi um desafio — ainda mais por terem que suportar o Aquino, Xerife, Mateus e principalmente o Moizas.

Segundamente, o Backend é uma das áreas mais desafiadoras do mercado de aplicativos e exige muita atenção para aprender a codar da forma correta. Então: assistam os vídeos no YouTube do NTec, leiam os arquivos de exemplo que preparei para vocês (o projeto dos Heróis), e **qualquer dúvida**:

- 📌 Primeiro: pesquisem na internet  
- 📌 Depois: joguem no ChatGPT ou DeepSeek  
- 📌 Por fim: **perguntem aos monitores**. Usem a monitoria a favor de vocês!

Se vocês acharam Front difícil... se preparem para o Back 😈

---

## 🚀 Instruções iniciais

Assim que terminar de ler esse texto, abra seu terminal (Git Bash, WSL ou similar), execute os seguintes comandos antes de testar as rotas:

```bash
yarn
yarn dev:server
```

---

## ✅ O que cada comando faz:

### `yarn`
Instala todas as dependências do projeto listadas no `package.json`. (só é preciso fazer apenas uma vez)

### `yarn dev:server`
Roda o servidor local de desenvolvimento. Sempre use esse comando enquanto estiver programando! O servidor reinicia automaticamente quando você salva mudanças no código.

---

## 💡 Comandos úteis durante o desenvolvimento:

### `yarn lint`
Verifica se seu código segue as boas práticas de formatação e organização. Ideal rodar antes de subir para o GitHub.

### `yarn format`
Aplica o Prettier para formatar seu código automaticamente. Deixe seu código bonito e padronizado!

### `yarn build`
Compila os arquivos `.ts` (TypeScript) e gera os arquivos JavaScript dentro da pasta `dist/`. Serve para preparar o projeto para produção. **Você não vai usar agora.**

### `yarn start`
Executa o código **já compilado** da pasta `dist/`. Este comando é usado apenas em ambiente de produção. **Você não vai usar agora.**

---

## 🗂️ Estrutura de Pastas do Projeto

```bash
src/
├── models/         # Define os "tipos" ou estruturas de dados (ex: Hero)
├── repositories/   # Lida com o armazenamento e recuperação de dados
├── services/       # Contém as regras de negócio (ex: criar, editar, deletar herói)
├── routes/         # Define os endpoints HTTP da API (GET, POST, PUT, DELETE)
├── server.ts       # Arquivo principal que inicializa o servidor Express
```

Cada camada tem sua função:
- As **rotas** recebem as requisições HTTP.
- Os **services** decidem o que fazer com os dados.
- Os **repositories** cuidam da "fonte de dados" (aqui é um array, futuramente pode ser um banco).
- Os **models** descrevem como é um herói ou qualquer entidade do sistema.

Essa organização segue o padrão de **responsabilidade única** e é uma introdução à arquitetura de software para quem está começando.

---

## 🧑‍🏫 Monitorias

Lembrem-se: **os monitores estão aqui para ajudar vocês**!

Se você travar em algo, ou tiver alguma dúvida... **chame a gente no Discord!**

### Monitores disponíveis:
- João Leal
- Augusto Melo
- João Pedro
- Bigode
- Aquino (apaixonado por backend ❤️)

Usem o Discord, mandem mensagem, marquem sessão! Ninguém fica pra trás no NTec 🚀

---

## ⚠️ Observação:

No arquivo `package.json`, personalize com:

- Seu nome
- Seu e-mail
- O link do seu repositório no GitHub

---

## 📚 Documentação complementar

Quer criar suas próprias rotas do zero?
👉 Leia o guia completo aqui: [Como Criar Suas Próprias Rotas](./Como_Criar_Rotas.md)

**Bons códigos e... que o backend esteja com vocês!** 🚀


