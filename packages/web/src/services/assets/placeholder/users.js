import Reinaldo from "../../assets/Reinaldo.jpg"
import Rogerio from "../../assets/Rogerio.jpg"

const users = [
	{
		_id: 1,
		avatarSrc: Reinaldo,
		userName: "Reinaldo Santos",
		email: "thailogrei@gmail.com",
	},
	{
		_id: 2,
		avatarSrc: "https://i.imgur.com/czCMHzw.jpg?1",
		userName: "Paulo Souza",
		email: "paulosouza300272@gmail.com",
	},
	{
		_id: 3,
		avatarSrc: Rogerio,
		userName: "Paulo Rogerio",
		email: "pr.souza68@gmail.com",
	},
]

export const getUser = id => {
	let user = users.filter(({ _id }) => parseInt(id, 10) === _id)

	return user[0]
}
