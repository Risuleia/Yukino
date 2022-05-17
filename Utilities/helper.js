// image checker
const checkImg = async (url) => {
	fetch(url, { method: "HEAD" })
		.then(res => {
				if (res.ok) return true
				else returnfalse
			}
		)
}

module.exports = {
		checkImg: checkImg
}