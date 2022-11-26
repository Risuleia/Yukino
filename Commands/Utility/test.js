module.exports = {
	name: "test",
	aliases:[],
	description: "Test",
	execute: async (client, message, args, db) => {

		const server = client.servers.get('1043832935691866122')
		const humans = server.roles
		console.log(humans)
		
	}
}