import request from '@/utils/request'
export default {
    //登录
    submitLogin(userInfo) {
        return request({
            url: `/ucenter/member/login`,
            method: 'post',
            data: userInfo
        })
    },
    //根据token获取用户信息
    getLoginInfo() {
        return request({
            url: `/ucenter/member/getMemberInfo`,
            method: 'get',
            // headers: {'token': cookie.get('guli_token')}
        })
        //headers: {'token': cookie.get('guli_token')}
    },
    //保存用户信息
    updateMemberInfo(member){
        return request({
            url: `/ucenter/member/updateMemberInfo`,
            method: 'post',
            data: member
        })
    }
}