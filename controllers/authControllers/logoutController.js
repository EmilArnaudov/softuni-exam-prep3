const router = require('express').Router();
const {TOKEN_COOKIE_NAME} = require('../../constants')

router.get('/', (req, res) => {
    if (req.user) {
        res.clearCookie(TOKEN_COOKIE_NAME);
    } else {
       return res.redirect('/login');
    }
    
    return res.redirect('/');
})

module.exports = router;