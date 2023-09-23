export const imageUpload = async (formData) => {
    console.log(process.env.IMAGE_UPLOAD)
    const res = await fetch(`https://api.imgbb.com/1/upload?expiration=600&key=${process.env.IMAGE_UPLOAD}`, {
        method: 'POST',
        body: formData
    })
    const data = await res.json()
    return data
}