function toGameDto(game) {
	return {
		front: game.current?.front,
		cardCount: game.solved.length + game.next.length + (game.current ? 1 : 0),
		solved: game.solved
	}
}

module.exports = {
	toGameDto
}
