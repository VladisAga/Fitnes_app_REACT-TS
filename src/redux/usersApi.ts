import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://marathon-api.clevertec.ru/auth/',
        credentials: 'include'
    }),
    endpoints: (build) => ({
        postNewUser: build.mutation({
            query: (body) => ({
                url: 'registration',
                method: 'POST',
                body
            })
        }),
        postEnterUser: build.mutation({
            query: (body) => ({
                url: 'login',
                method: 'POST',
                body
            })
        }),
        postCheckEmail: build.mutation({
            query: (body) => ({
                url: 'check-email',
                method: 'POST',
                body
            })
        }),
        postConfirmEmail: build.mutation({
            query: (body) => ({
                url: 'confirm-email',
                method: 'POST',
                body
            })
        }),
        postChangePassword: build.mutation({
            query: (body) => ({
                url: 'change-password',
                credentials: 'include',
                method: 'POST',
                body
            })
        }),
    })
});

export const { usePostNewUserMutation, usePostEnterUserMutation, usePostCheckEmailMutation, usePostConfirmEmailMutation, usePostChangePasswordMutation } = usersApi;