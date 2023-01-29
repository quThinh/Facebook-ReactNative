import {postsActions} from '../constants'
import axios from 'axios'
const taskURI  = '/users/login'
export const FetchPostsRequest = ()=>{
    console.log("call api")
    return (dispatch)=>{
        dispatch(FetchDefaultState())
        axios.post(taskURI,{
            email:"quangthinh021112@gmail.com",
            password:"Kakaka1."
        }).then(v => {
            console.log("success:",v)
            const posts = v.data
            dispatch(FetchPostsSuccess(posts))
        }).catch(error =>{
            console.log("api err: ", error)
            dispatch(FetchPostsFailure(error))
        })
    }
}
const FetchDefaultState = ()=>{
    return {
        type:postsActions.FETCH_POSTS_REQUEST,
    }
}
export const FetchPostsFailure = (error)=>{
    return {
        type:postsActions.FETCH_POSTS_FAILURE,
        error
    }
}
export const FetchPostsSuccess = (posts)=>{
    return {
        type:postsActions.FETCH_POSTS_SUCCESS,
        payload:posts
    }
}
