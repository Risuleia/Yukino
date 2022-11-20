const construct = (color = 0xffffff, title, description, image, thumbnail, timestamp) => {

	if (!title | !description) return
	
	const emb = {
		color: color,
		title: title,
		description: description,
		image: image,
		thumbnail: thumbnail,
		timestamp: timestamp
	}
	
}