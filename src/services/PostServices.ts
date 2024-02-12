import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IFood } from "../models/IFood";


export const postAPI = createApi({
  reducerPath: 'postAPI',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000'}),
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
