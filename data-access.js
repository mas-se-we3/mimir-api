const { v4 } = require('uuid')

let data = {
	cards: [
		{
			id: '7ca6dd7b-0543-43c2-8502-db9e2e89bbc1',
			front: 'Vergangenheit',
			back: 'Past'
		},
		{
			id: 'd955bcc7-912a-4fd6-ac10-aab58b517659',
			front: 'Gegenwart',
			back: 'Present'
		},
		{
			id: 'd955bcc7-912a-4fd6-ac10-aab58b517659',
			front: 'Zukunft',
			back: 'Future'
		}
	]
	// game: {
	// 	solved: [
	// 		{
	// 			id: 'd955bcc7-912a-4fd6-ac10-aab58b517659',
	// 			front: 'Gegenwart',
	// 			back: 'Present',
	// 			answer: 'Now',
	// 			accepted: false
	// 		}
	// 	],
	// 	current: {
	// 		id: 'd955bcc7-912a-4fd6-ac10-aab58b517659',
	// 		front: 'Gegenwart',
	// 		back: 'Present'
	// 	},
	// 	next: [
	// 		{
	// 			id: 'd955bcc7-912a-4fd6-ac10-aab58b517659',
	// 			front: 'Gegenwart',
	// 			back: 'Present'
	// 		}
	// 	]
	// }
}

function get(entity) {
	return data[entity]
}

function find(entity, id) {
	return data[entity].find(e => e.id === id)
}

function insert(entity, row) {
	row = { ...row, id: v4() }
	data[entity].push(row)

	return row
}

function set(entity, row) {
	data[entity] = { ...row }

	return data[entity]
}

function remove(entity) {
	delete data[entity]
}

function update(entity, row, id) {
	row = { ...row, id }
	data[entity].forEach(e => {
		if (e.id !== id) return
		Object.assign(e, { ...row, id })
	})

	return row
}

module.exports = {
	get,
	find,
	insert,
	update,
	set,
	remove
}
