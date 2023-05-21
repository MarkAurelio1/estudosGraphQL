const db = require ('../../../db')
// função para gerar  um novo ID
function geradorDeId(lista) {
  let novoId;
  let ultimo = lista[lista.length -1]
  if (!ultimo){
    novoId= 0
  } else {
    novoId = ultimo.id
  }
  return ++novoId
}

module.exports = {
    Usuario: {
    perfil(usuario) {
      return db.perfis.find((p) => p.id === usuario.perfil_id);
    },
  },
    Query: {
     usuario(obj, args) {
      return db.usuarios.find((db) => db.id === args.id);
    },
     usuarios: () => db.usuarios,
    },
    
    // Cria um novo usuário
    Mutation: {
      criarUsuario(_, { data }) {
        const { email } = data

        const usuarioExistente = db.usuarios.some(u => u.email === email)
        
        if(usuarioExistente) {
          throw new Error(`Usuário Existente: ${data.nome}`)
        }

        const novoUsuario = {
          ...data,
          id:geradorDeId(db.usuarios),
          perfil_id: 2
        }
        db.usuarios.push(novoUsuario)
        return novoUsuario
      },
      atualizarUsuario(_, { id, data}) {
        const usuario = db.usuarios.find(u => u.id === id)
        const indice = db.usuarios.findIndex(u => u.id === id)

        const novoUsuario = {
          ...usuario,
          ...data
        }
        db.usuarios.splice(indice, 1, novoUsuario)
        return novoUsuario
      },
      deletarUsuario(_, { id }){
        const usuarioEncontrado = db.usuarios.find((u) => u.id === id)
        db.usuarios = db.usuarios.filter((u) => u.id !== id)

        return !!usuarioEncontrado
      }
    }

}