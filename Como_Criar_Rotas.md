# Primeiramente, leia o [README](./README.md) antes de ler esse documento

Como Criar Novas Rotas no Backend — Guia passo a passo para Trainees NTec

Se você já entendeu o projeto do Herói, agora é hora de aprender como **criar suas próprias rotas do zero**, seguindo o mesmo padrão.  
Este guia mostra o **passo a passo completo** para adicionar uma nova funcionalidade ao seu backend (como `User`, `Produto`, `Evento`, etc.), e te ajuda a se basear no exemplo de `Hero` que já está pronto no código.

---

## 📌 Exemplo: Criar um CRUD de `Produto`

Você vai criar os seguintes arquivos:

1. `src/models/Product.ts` → define os dados do produto  
2. `src/repositories/ProductRepository.ts` → armazena e gerencia os produtos  
3. `src/services/ProductService.ts` → lógica de criação, listagem, edição, exclusão  
4. `src/routes/products.routes.ts` → endpoints da API (GET, POST, PUT, DELETE)  
5. `src/routes/index.ts` → conectar o router à aplicação  

---

## 🛠️ Etapas para construir sua funcionalidade

### 1️⃣ Criar o **Model**
Defina os campos que sua entidade terá (ex: id, nome, preço).  
Use como base o exemplo do arquivo `Hero.ts`.

### 2️⃣ Criar o **Repository**
Implemente os métodos:
- `create()`
- `getAll()`
- `getById()`
- `update()`
- `delete()`

Baseie-se em `HeroRepository.ts`.

### 3️⃣ Criar o **Service**
Essa é a camada que chama o repositório e implementa a regra de negócio.  
Siga o padrão do `HeroService.ts`.

### 4️⃣ Criar as **Rotas**
Crie as rotas REST para sua entidade: `GET`, `POST`, `PUT`, `DELETE`.  
Consulte `heroes.routes.ts` como referência.

### 5️⃣ Conectar no `index.ts`
Não se esqueça de adicionar seu novo router em `src/routes/index.ts`.

---

## 💡 Dicas importantes

- Você pode se basear totalmente no exemplo dos heróis!
- Faça um CRUD simples primeiro. Teste tudo no Postman ou Insomnia.
- Se tiver dúvidas, revise os blocos de comentário explicando o Hero.

---

**Lembre-se: qualquer dúvida chame os monitores!!!**
