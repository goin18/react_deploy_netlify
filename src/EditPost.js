import { useEffect, useContext, useState } from 'react'
import {useParams, Link} from 'react-router-dom'
import DataContext from './context/DataContext'
import { format } from 'date-fns'
import api from './api/posts'
import { useHistory } from 'react-router-dom'

const EditPost = () => {
    const [editTitle, setEditTitle] = useState('')
    const [editBody, setEditBody] = useState('')

    const {posts, setPosts} = useContext(DataContext)

    const {id} = useParams()
    const post = posts.find(post => post.id == id)
    console.log(`Edit Viwe: `);
    console.log(id);
    console.log(posts);
    console.log(post);

    const history = useHistory()

    useEffect( () => {
        if (post) {
            setEditBody(post.title)
            setEditTitle(post.body)
        }
    }, [post, setEditTitle, setEditBody])

    const handleEdit = async (id) => {
        const datetime = format(new Date(), 'MMMM dd, yyyy pp')
        const updatedPost = {
          id,
          title: editTitle,
          datetime,
          body: editBody
        }
    
        try {
            const response = await api.put(`/posts/${id}`, updatedPost)
            // fetchPost()
            setPosts(posts.map(post => post.id === id ? {...response.data} : post ))
            setEditTitle('')
            setEditBody('')
            history.push('/')
        } catch(err) {
            console.log(`Error: ${err.message}`);
        }
    }

  return (
    <main className="NewPost"> 
        {editTitle && 
        <>
            <h2>Edit Post</h2>
            <form 
                className='newPostForm'
                onSubmit={(e) => e.preventDefault()}
            >
            <label htmlFor="postTitle">Title: </label>
            <input
                id="postTitle"
                type="text"
                required
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor='postBody'>Post:</label>
            <textarea
                id="postBody"
                required
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
            />
            <button 
                className=''
                onClick={() => handleEdit(post.id)}>
                Submit
                </button>
            </form>
        </>
    }
    {!editTitle && 
        <>
            <main className='Missing'>
                <h2>Post Not Found</h2>
                <p>Well, that's disappoinging.</p>
                <p>
                    <Link to='/'>Visit Our Homepage</Link>
                </p>
            </main>
        </>
    }
    </main>
  )
}

export default EditPost
