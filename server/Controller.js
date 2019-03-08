module.exports = {
    updateWizard: async ( req, res ) => {
        const db = req.app.get('db')
        const { wizard, id } = req.body
        let toggleWizard = await db.update_wizard({wizard, id})
        toggleWizard = toggleWizard[0]
        res.status(200).send(toggleWizard)
    }, 
    updateIndicators: async (req, res) => {
        try {
            const db = req.app.get('db')
            const { body } = req
            const { userid } = req.params
            console.log(req.params)
            body.map(async (indicator) => {
                try {
                    const { user_id, indicator_id, reading, date } = indicator
                    return await db.indicators.update_indicators({user_id, indicator_id, reading, date}) 

                } catch (error) {
                    console.log(error)
                }
            })
            let getIndicators = await db.indicators.get_indicators({userid})
            res.status(200).send(getIndicators)
        } catch (error) {
            console.log(`Error updating indicators ${error}`)
        }
    },
    getIndicators: async (req, res) => {
        const db = req.app.get('db')
        const { id } = req.body
        const getIndicators = await db.indicators.get_indicators({id})
        res.status(200).send(getIndicators)
    }
}