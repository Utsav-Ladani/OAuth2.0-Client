import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { handleHomePageRequest } from './static.js';
import { handleOAuthRedirectionRequest, mustBeAuthenticated } from './access.js';
import { handleResourcesRequest } from './resources.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', handleHomePageRequest)
app.get('/callback', handleOAuthRedirectionRequest)
app.get('/resources', mustBeAuthenticated, handleResourcesRequest)

app.all('*', (req, res) => {
    res.status(404).json({ error: 'Not Found' });
})

app.listen(3211, () => {
    console.log('Client Server is running on port 3211');
})
