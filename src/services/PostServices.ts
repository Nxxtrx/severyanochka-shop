import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IFood } from "../models/IFood";


export const postAPI = createApi({
  reducerPath: 'postAPI',
  baseQuery: fetchBaseQuery({baseUrl: 'https://json-server-eight-nu.vercel.app'}),
  tagTypes: ['Post'],
  endpoints: (build) => ({
    fetchAllPosts: build.query<IFood[], {start: number, end: number, type: string}>({
      query: ({start = 0, end = 5, type = ''}) => ({
          url: `/product`,
          params: {
              _start: start,
              _end: end,
              type: type

          }
      }),
      providesTags: result => ['Post']
  }),  
  })
})
