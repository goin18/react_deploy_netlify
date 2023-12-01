import { createContext, useState, useEffect } from "react";

import api from '../api/posts'

import useAxiosFetch from '../hooks/userAxiosFetch';

const DataContext = createContext({})

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([])


  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts')

    useEffect(() => {
        setPosts(data)
      }, [data])
      // useEffect(() => {
      //   fetchPost()
      // }, [])
    
      const fetchPost = async () => {
        try {
          const response = await api.get('/posts')
          setPosts(response.data)
        } catch (err) {
          if (err.response) {
            // Not in the 200 response range
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.heades);
          } else {
            console.log(`Error: ${err.message}`);
          }
        }
      }
    
      useEffect(() => {
        const filteredResults = posts.filter(post => 
          ((post.body).toLocaleLowerCase()).includes(search.toLocaleLowerCase())
          ||  ((post.title).toLocaleLowerCase()).includes(search.toLocaleLowerCase()))
    
          setSearchResults(filteredResults.reverse())
      },[posts, search])
    

    return(
        <DataContext.Provider value={{    
            fetchError,
            isLoading,

            search,
            setSearch,

            searchResults,

            posts,
            setPosts
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext