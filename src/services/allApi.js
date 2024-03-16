import { commonApi } from "./commonApi";
import { BASE_URL } from "./baseUrl";

export const registerApi = async(user)=>{
    return await commonApi("post",`${BASE_URL}/user/register`,user,"")
}

export const loginApi = async(reqBody)=>{
    return await commonApi('post',`${BASE_URL}/user/login`,reqBody,"")
}

export const adminloginApi = async(reBody)=>{
    return await commonApi('post',`${BASE_URL}/user/adminlogin`,reBody,"")
}

export const addmovieApi = async(reBody,reqHeader)=>{
    return await commonApi('post',`${BASE_URL}/user/movieadd`,reBody,reqHeader)
}

export const allmovieApi = async()=>{
    return await commonApi("get",`${BASE_URL}/user/allmovie`,'','')
}