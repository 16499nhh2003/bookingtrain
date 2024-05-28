import axiosConfig from '../axiosConfig'

export const ApicreateTypeCar = (payload) => new Promise(async (resolve, reject) => {
    try {
        console.log(payload)
        const response = await axiosConfig({
            method: 'post',
            url: '/api/typecar',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})