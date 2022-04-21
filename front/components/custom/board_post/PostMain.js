
import React from 'react';
import PostList from './PostList';

const PostMain = props => {
  console.log(props)
  return (
    <div>
      <PostList id={`${props.id}`}/>
    </div>
  )
}

export default PostMain;