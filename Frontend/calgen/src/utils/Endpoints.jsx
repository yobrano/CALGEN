export const BASE_URL = import.meta.env.VITE_BASE_URL

export const endpoints = {
    baseURL:                ()=> BASE_URL,
    fileManagerURL:         ()=>`${BASE_URL}/calgen/file/`,
    detailedFileManagerURL: (fileCode)=>`${BASE_URL}/calgen/file/${fileCode}/`,
    fileCategoryURL:        ()=> `${BASE_URL}/calgen/file-category/`,
    detailedfileCategoryURL:(categoryID)=> `${BASE_URL}/calgen/file-category/${categoryID}/`,

    accountLoginURL:        ()=>`${BASE_URL}/accounts/login/`,
    accountRefreshURL:      ()=>`${BASE_URL}/accounts/refresh/`,
    accountLogoutURL:       ()=>`${BASE_URL}/accounts/logout/`,
} 
