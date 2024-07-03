import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [
    {
      id: 1720010785713,
      content: [
        {
          id: "8aa2d50b-8f32-4b3b-a210-e332fa2a907d",
          type: "paragraph",
          props: {
            textColor: "default",
            backgroundColor: "default",
            textAlignment: "left",
          },
          content: [
            {
              type: "text",
              text: "Launched UserSoup here on PeerHub.",
              styles: {},
            },
          ],
          children: [],
        },
        {
          id: "ed62a9ee-5bdd-4dd8-ab1e-f140ebd42a5b",
          type: "paragraph",
          props: {
            textColor: "default",
            backgroundColor: "default",
            textAlignment: "left",
          },
          content: [
            {
              type: "text",
              text: "If you think this could be a useful product, please give an upvote. Also, any feedback would be highly appreciated!",
              styles: {},
            },
          ],
          children: [],
        },
        {
          id: "0f500dc1-b3ba-41eb-902a-e8165caacda1",
          type: "paragraph",
          props: {
            textColor: "default",
            backgroundColor: "default",
            textAlignment: "left",
          },
          content: [
            {
              type: "text",
              text: "\n",
              styles: {},
            },
          ],
          children: [],
        },
        {
          id: "cae2ffe4-11c5-43af-a28b-85829f65e7d7",
          type: "paragraph",
          props: {
            textColor: "default",
            backgroundColor: "default",
            textAlignment: "left",
          },
          content: [
            {
              type: "link",
              href: "https://PeerHub.io/ilprdev/project/usersoup",
              content: [
                {
                  type: "text",
                  text: "https://PeerHub.io/ilprdev/project/usersoup",
                  styles: {},
                },
              ],
            },
          ],
          children: [],
        },
      ],
    },
    {
      id: 1720010790683,
      content: [
        {
          id: "54cebdaf-3d10-462a-8d42-acfbba4f3885",
          type: "paragraph",
          props: {
            textColor: "default",
            backgroundColor: "default",
            textAlignment: "left",
          },
          content: [
            {
              type: "text",
              text: "Launched UserSoup here on PeerHub.",
              styles: {},
            },
          ],
          children: [],
        },
        {
          id: "8df2f124-278d-4b54-a13a-f831176eb2fb",
          type: "paragraph",
          props: {
            textColor: "default",
            backgroundColor: "default",
            textAlignment: "left",
          },
          content: [
            {
              type: "text",
              text: "If you think this could be a useful product, please give an upvote. Also, any feedback would be highly appreciated!",
              styles: {},
            },
          ],
          children: [],
        },
        {
          id: "b8e7bda6-0cf8-4124-9592-99dc2b256185",
          type: "paragraph",
          props: {
            textColor: "default",
            backgroundColor: "default",
            textAlignment: "left",
          },
          content: [
            {
              type: "text",
              text: "\n",
              styles: {},
            },
          ],
          children: [],
        },
        {
          id: "abab9dcc-bd2c-42f9-95b2-df1332c5fa7d",
          type: "paragraph",
          props: {
            textColor: "default",
            backgroundColor: "default",
            textAlignment: "left",
          },
          content: [
            {
              type: "link",
              href: "https://PeerHub.io/ilprdev/project/usersoup",
              content: [
                {
                  type: "text",
                  text: "https://PeerHub.io/ilprdev/project/usersoup",
                  styles: {},
                },
              ],
            },
          ],
          children: [],
        },
      ],
    },
  ], // Initial state for posts
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload.id);
    },
    updatePost: (state, action) => {
      const { id, updatedPost } = action.payload;
      const existingPost = state.posts.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = updatedPost.title;
        existingPost.content = updatedPost.content;
      }
    },
    // Additional reducers as needed for post management
  },
});

export const { addPost, deletePost, updatePost } = postSlice.actions;
export default postSlice.reducer;
