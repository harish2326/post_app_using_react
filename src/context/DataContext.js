import {createContext,useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { format } from "date-fns"
import api from "../api/posts"
import useWindowSize from "../hooks/useWindowSize";
import useAxiosFetch from "../hooks/useAxioxFetch";






const DataContext = createContext({})
export const DataProvider = ({children}) =>{
    const [posts,setPosts] =useState([])
    const [search,setSearch]=useState("")
    const [searchresult,setSearchResult] =useState([])
    const [postTitle,setPostTitle]=useState('')
    const [postBody,setPostBody] =useState('')
    const [editTitle,setEditTitle]=useState('')
    const [editBody,setEditBody]=useState('')
    const navigate = useNavigate()
    const {width}=useWindowSize()
    const {data,fetchError,isLoading} = useAxiosFetch('http://localhost:3500/posts')
     
  
    useEffect(()=>{
      setPosts(data)
    },[data])
    
  
  
  
  
  
    useEffect(()=>{
      const filteredResult = posts.filter((post)=>((post.body).toLowerCase()).includes(search.toLowerCase()) || ((post.title).toLowerCase()).includes(search.toLowerCase()))
      setSearchResult(filteredResult.reverse())
    },[posts,search])
    const handleSubmit = async(e) =>{
      e.preventDefault();
      const id =posts.length ? posts[posts.length - 1].id + 1 : 1 ;
      const datetime = format(new Date(),'MMMM dd,yyy pp')
      const newPost = { 
                        id,
                        title:postTitle,
                        datetime,
                        body:postBody
                        
                      }
      try{
      const response = await api.post('/posts',newPost)
      const allPost = [...posts,response.data]
      setPosts(allPost)
      setPostBody('')
      setPostTitle('')
      navigate('/')
      }
      catch(err){
        if(err.response){
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
        }else{
          console.log(`Error:${err.message}`)
        }
      }
    }
    const handleEdit = async (id) =>{
      const datetime = format(new Date(),'MMMM dd,yyy pp')
      const updatedPost = { 
        id,
        title:editTitle,
        datetime,
        body:editBody
        
      }
      try{
        const response = await api.put(`/posts/${id}`,updatedPost)
        setPosts(posts.map(post => post.id === id ? {...response.data}: post))
        setEditBody('')
        setEditTitle('')
        navigate('/') 
      }catch(err){
        console.log(`Error:${err.message}`)
      }
    }
    const handleDelete = async (id) =>{
          try{
            await api.delete(`posts/${id}`)
          }catch(err){
              console.log(`Error:${err.message}`)
            }
          
          const postList = posts.filter(post=>post.id !== id)
          setPosts(postList)
          navigate('/')
    }
    
    
    return(
        
        <DataContext.Provider value={{
            width,search,setSearch,searchresult,fetchError,isLoading,handleSubmit,postTitle,setPostTitle,postBody,setPostBody
            ,posts,handleDelete,handleEdit,editBody,setEditBody,editTitle,setEditTitle

        }}>
            {children}
        </DataContext.Provider>
    )
}
export default DataContext