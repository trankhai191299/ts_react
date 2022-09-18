import axios from "axios";
// import { history } from "../index";
export const config = {
    setCookie:(name:string,value:string,days:number)=>{
        var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    },
    getCookie:(name:string)=>{
        var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)===' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
    },
    getStore:(name:string)=>{
        if(localStorage.getItem(name)){
            return localStorage.getItem(name)
        }
        return null
    },
    setStore:(name:string,value:any)=>{
        localStorage.setItem(name,value)
    },
    setStoreJson:(name:string,value:any)=>{
        let json = JSON.stringify(value);
        localStorage.setItem(name,json)
    },
    getStoreJson:(name:any)=>{
        if(localStorage.getItem(name)){
            let result:any = localStorage.getItem(name)
            return JSON.parse(result)
        }
        return null
    },
    ACCESS_TOKEN: 'accessToken',
    USER_LOGIN:'userLogin',
}

export const {setCookie,getCookie,getStore,getStoreJson,setStore,setStoreJson,ACCESS_TOKEN,USER_LOGIN} = config

/*Cau hinh request cho tat ca api- response cho tat ca kq tra ve tu api*/
/* Cau hinh domain gui di */
const DOMAIN = 'https://shop.cyberlearn.vn/api'
const TOKEN_CYBERSOFT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMCIsIkhldEhhblN0cmluZyI6IjE3LzAyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY3NjU5MjAwMDAwMCIsIm5iZiI6MTY0ODIyNzYwMCwiZXhwIjoxNjc2NzM5NjAwfQ.aK-3RvHXQyu6H2-FFiafeSKR4UMCcRmnuDbTT-XIcUU'
export const http = axios.create({
    baseURL:DOMAIN,
    timeout:30000
})
/*Cau hinh request header*/
http.interceptors.request.use(
    config => {
      const token = getStore(ACCESS_TOKEN)
      config.headers = {
        ...config.headers,['Authorization']: `Bearer ${token}`,
        ['TokenCybersoft']:TOKEN_CYBERSOFT,
      }
      // config.headers['Content-Type'] = 'application/json';
      return config
    },
    error => {
      Promise.reject(error)
    }
  )
/*Cau hinh response*/
http.interceptors.response.use((response)=>{
    return response
},err=>{
    if(err.response.status === '400' || err.response.status === '404'){
        // history.push('/')
        return Promise.reject(err)
    }
    if(err.response.status === '401' || err.response.status === '403'){
        alert('Token khong hop le! Vui long dang nhap lai')
        // history.push('/login')
        return Promise.reject(err)
    }
})
/*
    status code:
    400: tham so gui len ko hop le => kq ko tim dc (bad request)
    404: tham so gui len hop le nhung ko thay => co the bi xoa (not found)
    401: khong co quyen truy cap vao api (unauthorized - token ko hop le hoac admin bi chan)
    403: chua du quyen truy cap vao api (forbidden - token hop le nhung khong du quyen truy cap)
    200: thanh cong, ok
    201: da dc tao thanh cong => (da tao ra roi, gui request se tra tiep)(created) 
    500: loi xay ra tai server (nguyen nhan: fe: gui dl khong hop le => be: trong qua trinh xu ly code xay ra loi hoac be: code loi)(error in server)
*/