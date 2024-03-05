import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { TFeedBackBody,TPostFeedbackArgs } from '../types/commonTypes';

export const usersApi = createApi({
    reducerPath: 'usersApi',
    tagTypes: ['Comments'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://marathon-api.clevertec.ru/',
        credentials: 'include'
    }),
    endpoints: (build) => ({
        postNewUser: build.mutation({
            query: (body) => ({
                url: 'auth/registration',
                method: 'POST',
                body
            })
        }),
        postEnterUser: build.mutation({
            query: (body) => ({
                url: 'auth/login',
                method: 'POST',
                body
            })
        }),
        postCheckEmail: build.mutation({
            query: (body) => ({
                url: 'auth/check-email',
                method: 'POST',
                body
            })
        }),
        postConfirmEmail: build.mutation({
            query: (body) => ({
                url: 'auth/confirm-email',
                method: 'POST',
                body
            })
        }),
        postChangePassword: build.mutation({
            query: (body) => ({
                url: 'auth/change-password',
                credentials: 'include',
                method: 'POST',
                body
            })
        }),
        getFeedbacks: build.query({
            query: (token) => ({
                url: 'feedback',
                method: 'GET',
                redirect: 'follow',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map((id: number) => ({ type: 'Comments' as const, id })),
                        { type: 'Comments', id: 'LIST' },
                    ]
                    : [{ type: 'Comments', id: 'LIST' }],
        }),
        postFeedback: build.mutation<{ body: TFeedBackBody; token: string }, any>({
            query: ({ body, token }: TPostFeedbackArgs) => ({
                url: 'feedback',
                method: 'POST',
                credentials: 'include',
                body,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            invalidatesTags: [{ type: 'Comments', id: 'LIST' }]
        }),
        authUsingGoogle: build.query({
            query: () => ({
                url: 'auth/google',
                method: 'GET'
            })
        })
    })
})

export const { usePostNewUserMutation, usePostEnterUserMutation, usePostCheckEmailMutation, usePostConfirmEmailMutation, usePostChangePasswordMutation, useGetFeedbacksQuery, usePostFeedbackMutation, useLazyAuthUsingGoogleQuery } = usersApi;