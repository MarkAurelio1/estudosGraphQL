const {ApolloServer } = require("apollo-server");
const graphql = require('./src/graphql');

const server = new ApolloServer({
 ...graphql,
 // Não duplicar usuário
 formatError: (formattedError) => {
    if (formattedError.message.startsWith("Usuário Existente:")) {
    }
     return new Error(formattedError.message)
 }
});

server.listen().then(({url}) => console.log(url));