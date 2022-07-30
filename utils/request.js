import axios from 'axios'
import cookie from "js-cookie";
import { MessageBox, Message } from 'element-ui'
// 创建axios实例
const service = axios.create({
    baseURL: 'http://localhost:8222', // api的base_url
    timeout: 20000 // 请求超时时间
})

// http request 拦截器
service.interceptors.request.use(
    config => {
        //debugger
        if (cookie.get('guli_token')) {
            config.headers['token'] = cookie.get('guli_token');
        }
        return config
    },
    err => {
        return Promise.reject(err);
    })
// http response 拦截器
service.interceptors.response.use(
    response => {
        if (response.data.code == 28004) {
            // 返回 错误代码-1 清除ticket信息并跳转到登录页面
            //debugger
            Message.error("请先登陆再进行操作！")
            setTimeout(() => {
                if (process.client){
                    //this.$router.push({path:"/login?callback="+response.data.data.courseWebVo.id})
                    window.location.href = "/login?backcourse="+response.data.data.courseId
                }
            }, 1000);
            return
        }else if(response.data.code == 28005){
            Message.error("请先登陆再进行操作！")
            setTimeout(() => {
                if (process.client){
                    //this.$router.push({path:"/login?callback="+response.data.data.courseWebVo.id})
                    window.location.href = "/login?backuserinfo=/user/userinfo"
                }
            }, 1000);
        } else {
            if (response.data.code !== 20000) {
                //25000：订单支付中，不做任何提示
                if (response.data.code != 25000) {
                    Message({
                        message: response.data.message || 'error',
                        type: 'error',
                        duration: 5 * 1000
                    })
                }
            } else {
                return response;
            }
        }
    },
    error => {
        return Promise.reject(error.response) // 返回接口返回的错误信息
    });

export default service