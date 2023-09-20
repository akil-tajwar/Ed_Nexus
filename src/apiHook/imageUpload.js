'use client'
export const imageUpload = async (formData) => {
    console.log(formData, 'form hook api')
    console.log(process.env.IMAGE_UPLOAD)
    console.log(process.env.GOOGLE_CLIENT_SECRET)
    const imageUploadKey = "3553ac76de47a575a54c28abe9ce8e93";
    const res = await fetch(`https://api.imgbb.com/1/upload?expiration=600&key=${imageUploadKey}`, {
        method: 'POST',
        body: formData
    })
    const data = await res.json()
    return data
}