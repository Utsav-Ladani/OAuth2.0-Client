import fetch from "node-fetch"
import { getResponseMarkupFromTemplate } from "./template.js"

const handleResourcesRequest = async (req, res) => {
    try {
        const responseData = await fetch('http://localhost:3210/api/resources', {
            headers: {
                authorization: `Bearer ${req.token}`
            }
        })
        const resources = await responseData.json()

        let resource_list = ``
        for (const [key, value] of Object.entries(resources)) {
            resource_list += `
                <tr>
                    <td>${key.toString()}</td>
                    <td>${value.toString()}</td>
                </tr>
            `
        }

        res.send(getResponseMarkupFromTemplate('resources', { resource_list }))
    } catch (e) {
        console.log(e)
        res.end('Access denied')
    }
}

export { handleResourcesRequest }