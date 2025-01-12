import { getResponseMarkupFromTemplate } from "./template.js"

const handleHomePageRequest = async (req, res) => {
    res.send(getResponseMarkupFromTemplate('home'))
}

export { handleHomePageRequest }