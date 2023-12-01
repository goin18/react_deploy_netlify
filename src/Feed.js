import React from 'react'
import Post from './Post'

const Feed = ({posts}) => {
  return (
    <>
        <p style={{ marginBottom: "1ram"}}>
            Number of posts: {posts.length}
        </p>
      
        { posts.map(post => (
            <Post 
                key={post.id}  
                post={post}
            />
        ))}
    </>
  )
}

export default Feed
