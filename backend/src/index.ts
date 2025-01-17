import { Hono } from 'hono'
import User from './routes/user'
import Posts from './routes/post'


const app = new Hono()


app.route('/api/v1/user',User);

app.route('/api/v1/post',Posts);





export default app
