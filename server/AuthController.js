const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        try {
            const db = req.app.get('db')
            const { username, name, password } = req.body

            let authUser = await db.Auth.check_user({username})
            authUser = authUser[0]
            if (authUser) {
                return res.status(409).send('user already exist')
            }
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)

            const user = await db.Auth.register({name, username, password:hash})
            req.session.user = user
            res.status(200).send(req.session.user)
        } catch (err) {
            console.log('error registering user', err)
            res.sendStatus(500)
        }
    }
}