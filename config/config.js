module.exports = {
    secrets: {
        jwt: "learningNode",
        jwtExp: '100d'
    },
    url: `mongodb+srv://database-user:${process.env.dbUserPass}@cluster0.dryva.mongodb.net/?retryWrites=true&w=majority`
}