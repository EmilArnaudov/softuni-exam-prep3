const { PORT } = require('./constants')
const { DB_STRING } = require('./constants');
const mongoose = require('mongoose');

const app = require('express')();
const routes = require('./routes');

require('./config/express-parsers')(app);
require('./config/express-static')(app);
require('./config/express-viewEngine')(app);
require('./config/express-customMiddlewares')(app);

app.use(routes);


mongoose.connect(DB_STRING)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server up and running at port ${PORT}...`)
        });
    });