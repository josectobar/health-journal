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
    },
    postEntry: async (req, res) => {
        try {
            const db = req.app.get('db')
            const { id } = req.session.user
            const { title, content, date } = req.body
            let updatedEntries = await db.entries.post_entry({user_id: id, title, content, date})
            res.status(200).send(updatedEntries)
        } catch (error) {
            console.log(`error posting entry: ${error}`)
        }
    },
    getEntries: async (req, res) => {
        try{
            const db = req.app.get('db')
            const { id } = req.session.user
            const entries = await db.entries.get_entries({user_id:id})
            res.status(200).send(entries)
        } catch (error) {
            console.log(`There was an error sending the entries: ${error}`)
        }
    }
}