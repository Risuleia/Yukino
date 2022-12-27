const construct = (color = 0xffffff, title, description, image, thumbnail, timestamp) => {

	if (!title || !description) return
	
	const emb = {
		color: color,
		title: title,
		description: description || "Description here",
		image: image || null,
		thumbnail: thumbnail || null,
		timestamp: timestamp
	}
	
	return emb
	
}

module.exports = construct