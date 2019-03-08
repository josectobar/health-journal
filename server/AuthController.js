const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        try {
            const db = req.app.get('db')
            const { username, name, password, email } = req.body

            let authUser = await db.Auth.check_user({username})
            authUser = authUser[0]
            if (authUser) {
                return res.status(409).send('user already exist')
            }
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)

            const user = await db.Auth.register({name, username, email, password:hash})
            req.session.user = user
            res.status(200).send(req.session.user)
        } catch (err) {
            console.log('error registering user', err)
            res.sendStatus(500)
        }
    },
    login: async (req, res) => {
        try {
            const db = req.app.get('db')
            const { username, password }  = req.body
            let authUser = await db.Auth.check_user({username})
            authUser = authUser[0]
            
            if (!authUser) {
                return res.status(401).send('user not found')
            }
            
            const authPassword = bcrypt.compareSync(password, authUser.password)
            
            if (authPassword) {
                delete authUser.password
                req.session.user= authUser
                res.status(200).send(req.session.user)
            } else {
                res.status(401).send('incorrect password')
            }

            
        } catch (err) {
            console.log('error logining in', err)
            res.sendStatus(500)
        }
    }, 
    current: (req, res) => {
        const { user } = req.session
        if (user) {
            res.status(200).send(user)
        } else {
            res.sendStatus(401)
        }
    },
    logout: (req, res) => {
        req.session.destroy(function(){
            res.sendStatus(200)
        })
    }
}