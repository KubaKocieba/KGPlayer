import { AxiosRequestConfig } from "axios";

export const ENDPOINTS = {
    AUTH: {
        URL: { SIGNIN: "Authorization/SignIn", SIGNOUT: "Authorization/SignOut"},
        CONFIG: {
            method: 'POST',
        } as AxiosRequestConfig
    },
    MEDIALIST: {
        URL: 'Media/GetMediaList',
        DATA: {
            MediaListId: 2,
            IncludeCategories: true,
            IncludeImages: true,
            IncludeMedia: false,
            PageNumber: 1,
            PageSize: 20
        },
        CONFIG: {
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON'
            }
        } as AxiosRequestConfig,
    },
    VIDEO :{
        URL: 'Media/GetMediaPlayInfo',
        DATA: {
            MediaId: 0,
            IncludeCategories: false,
            IncludePeople: false,
            IncludeImages: true,
            IncludeSimilarMedia: false
        },
        CONFIG: {
            headers: {
                'Content-Type': 'application/JSON'
            }
        }
    }
};