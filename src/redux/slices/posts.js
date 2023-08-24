import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPost = createAsyncThunk('/posts/fetchPost', async () => {
    const {data} = await axios.get('/posts');
    return data;
})

export const fetchTags = createAsyncThunk('/posts/fetchTags', async () => {
    const {data} = await axios.get('/tags');
    return data;
})

export const fetchRemovePost = createAsyncThunk('/posts/fetchRemovePost', async (id) => {
    await axios.delete(`/posts/${id}`);
})

const initialState = {
    posts: {
        items: [],
        status: 'loading'
    },
    tags: {
        items: [],
        status: 'loading'
    }
};

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: {
        // Получение статей
        [fetchPost.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },
        [fetchPost.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchPost.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },

        // Получение тегов
        [fetchTags.pending]: (state) => {
            state.tags.items = [];
            state.tags.status = 'loading';
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload;
            state.tags.status = 'loaded';
        },
        [fetchTags.rejected]: (state) => {
            state.tags.items = [];
            state.tags.status = 'error';
        },

        // Удаление статей
        [fetchRemovePost.pending]: (state, action) => {
            state.posts.items = state.posts.items.filter((obj) => obj._id !== action.meta.arg);
        }
    }
})

export const postsReducer = postSlice.reducer;