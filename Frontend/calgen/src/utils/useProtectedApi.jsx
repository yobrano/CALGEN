import axios from 'axios'
import {useTokenContext} from "@src-context/TokenProvider"
import {endpoints} from "@src-utils/endpoints"

// Creating instance for latter customizations
export const instance = axios.create({
    baseURL: endpoints.baseURL,
})


// Create the interceptor on the instance
function useProtectedApi() {
    const {baseURL} = endpoints
    const {accessToken, accessTokenSetter} = useTokenContext()

    // inserting authenticaiton in header
    instance.interceptors.request.use((request)=>{
        request.header.Authentication = `Bearer ${accessToken}`
        return request
    })
    return instance
}

export default useProtectedApi