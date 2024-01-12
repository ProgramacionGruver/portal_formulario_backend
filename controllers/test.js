
export const mensaje = async (req, res) => {
    try {
        return res.json({messaje: 'ok'})
    } catch (error) {
        console.log(error)
    }
}
