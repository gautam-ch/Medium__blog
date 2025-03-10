import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Signup } from "./pages/signup"
import { Signin } from "./pages/signin"
import { Blog } from "./pages/blogs"
import { BlogId } from "./pages/blogId"
import { CreateBlog } from "./pages/CreateBlog"
import { Toaster } from "react-hot-toast"
import './App.css'

function App() {
          
  return (
           <>
         <Toaster position="top-center"
               toastOptions={{
                style:{
                   fontSize:"1.5rem",
                   padding:"16px",
                   minWidth:"400px"
                }
              }
               }
              />
        <BrowserRouter>
          <Routes>
               <Route path="/signup" element={<Signup/>}/>
               <Route path="/signin" element={<Signin/>}/>
               <Route path="/blogs" element={<Blog/>}/>
               <Route path='/blog/:id' element={<BlogId/>}/>
               <Route path='/blog/post' element={<CreateBlog/>}/>
          </Routes>
        </BrowserRouter>
        </>

  )
}

export default App
