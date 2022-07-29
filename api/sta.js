import request from '@/utils/request'
const api_name = '/admin/statistics/daily'
export default {
    //访问量加一
    addLoginNum() {
        return request({
            url: `/statistics/addLoginNum`,
            method: 'get'
        })
    },
    //视频播放量加一
    addVideoView() {
        return request({
            url: `/statistics/addVideoView`,
            method: 'get',
        })
    }
}
