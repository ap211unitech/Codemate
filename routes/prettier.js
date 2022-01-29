const route = require("express").Router();
const prettier = require("prettier");

route.post('/', (req, res) => {
    const { code, language } = req.body;
    const data = prettier.format(code, { semi: true, parser: language, tabWidth: 4 });
    res.send(data);
})

module.exports = route;