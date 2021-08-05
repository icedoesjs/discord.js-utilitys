// awaitEmojis()
var embed = {
    title: "Pick from the list",
    color: "RED",
    description: "pick pls"
}
var emojis = ["😂", "😀", "😍"]

utils.awaitEmojis(message, embed, emojis, 50000, true).then(res => {
    console.log(res.name)
})

// awaitResponse()
utils.awaitResponse(message, `I like cookies do you? (yes/no)`).then(res => {
    console.log(res)
})

// checkPermission()
var embed = {
    title: "No permission!",
    color: "ORANGE",
    description: "You do not have permission to use this!"
}
utils.checkPermission(message, "ADMINISTRATOR", embed, true)

// delThis
utils.delThis(message, `deleting in 5 seconds`, 5000)

// checkRole 
utils.checkRole(member, `ROLE_ID`)

// playFile
utils.playFile(member.voice.channel, `C:\\path\\to\\file.mp3`) // Double back slashes are used as single back slashes are escape characters

// captitalize
utils.capitalize(`this is really cool`) // Returns: This is really cool