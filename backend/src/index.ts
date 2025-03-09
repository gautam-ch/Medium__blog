import { Hono } from 'hono'
import User from './routes/user'
import Posts from './routes/post'
import {cors} from 'hono/cors'

const app = new Hono()

app.use('*',cors());

app.route('/api/v1/user',User);

app.route('/api/v1/post',Posts);






export default app
