const {ImageKit} = require("@imagekit/nodejs")

const ImageKitClient = new ImageKit({
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY
})

async function uploadFile (file, fileName) {
    const result = await ImageKitClient.files.upload({
        file, 
        fileName,
        folder: "Spotify/music"
    })

    return result;

}

module.exports = {uploadFile}