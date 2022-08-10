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
			id: '8f537f7e-d6fc-4970-b8a7-6d94da9f8f46',
			front: 'Zukunft',
			back: 'Future'
		},
		{
			id: '56633f27-dada-4070-84b7-6ba0e5e2fa8e',
			front: 'Time',
			back: 'Zeit'
		},
		{
			id: '88c40e26-a10a-467a-8473-52f4689c80f3',
			front: 'Hour',
			back: 'Stunde'
		},
		{
			id: '93c6c43f-e76c-483c-b02a-5aeebbc7c949',
			front: 'Minute',
			back: 'Minute'
		}
	]
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

function remove(entity, id) {
	if (id) {
		data[entity] = data[entity].filter(e => e.id !== id)
		return
	}

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
