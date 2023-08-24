const { get, insert, update, set, remove } = require('./data-access')
const { toGameDto } = require('./models')
const { v4 } = require('uuid')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3003

app.use(bodyParser.json())

// master data
app.get('/api/cards', (req, res) => {
	res.send(get('cards'))
})

app.post('/api/cards', (req, res) => {
	res.send(insert('cards', req.body))
})

app.put('/api/cards/:id', (req, res) => {
	const card = get('cards').find(card => card.id === req.params.id)
	if(!card) {
		res.sendStatus(404)
		return
	}
	res.send(update('cards', req.body, req.params.id))
})

app.delete('/api/cards/:id', (req, res) => {
	const card = get('cards').find(card => card.id === req.params.id)
	if(!card) {
		res.sendStatus(404)
		return
	}

	remove('cards', req.params.id)
	res.sendStatus(204)
})

// game loop
app.get('/api/game', (req, res) => {
	const game = get('game')

	if (!game) {
		res.sendStatus(404)
		return
	}

	res.send(toGameDto(game))
})

app.post('/api/game', (req, res) => {
	let game = get('game')

	if (game) {
		res.sendStatus(409)
		return
	}

	let cards = get('cards')

	let current
	const next = []
	for (let n = 0; n < 3; n++) {
		const index = Math.floor(Math.random() * cards.length)
		const card = { ...cards[index], id: v4() }
		if (n === 0) current = card
		else next.push(card)
	}

	game = set('game', {
		solved: [],
		current,
		next
	})

	res.send(toGameDto(game))
})

app.delete('/api/game', (req, res) => {
	const game = get('game')

	if (!game) {
		res.sendStatus(404)
		return
	}

	remove('game')
	res.sendStatus(204)
})

app.patch('/api/game', (req, res) => {
	const answer = req.body.answer

	if (typeof answer !== 'string') {
		res.sendStatus(400)
		return
	}

	const game = get('game')

	if (!game) {
		res.sendStatus(404)
		return
	}

	if (!game.current) {
		res.sendStatus(400)
		return
	}

	game.solved.push({
		...game.current,
		answer,
		accepted: answer.toLowerCase() === game.current.back.toLowerCase()
	})
	game.current = game.next.pop()
	set('game', game)

	res.send(toGameDto(game))
})

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`)
})
