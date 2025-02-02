import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Signup } from "./pages/signup"
import { Signin } from "./pages/signin"
import { Blog } from "./pages/blogs"
import { BlogId } from "./pages/blogId"
import { CreateBlog } from "./pages/CreateBlog"


function App() {
          
  return (
        <BrowserRouter>
          <Routes>
               
               <Route path="/signup" element={<Signup/>}/>
               <Route path="/signin" element={<Signin/>}/>
               <Route path="/blogs" element={<Blog/>}/>
               <Route path='/blog/:id' element={<BlogId/>}/>
               <Route path='/blog/post' element={<CreateBlog/>}/>
          </Routes>
        </BrowserRouter>
       

  )
}

export default App
