const construct = (color = 0xffffff, title, description, image, thumbnail, timestamp) => {

	if (!title || !description) return
	
	const emb = {
		color: color,
		title: title || "Title here",
		description: description || "Description here",
		image: image || null,
		thumbnail: thumbnail || null,
		timestamp: timestamp
	}
	
	return emb
	
}

module.exports = construct