import request from '@/utils/request'
export default {
    //查出最新添加的两个banner
    getAllBanner() {
        return request({
            url: `/educms/bannerfront/getAllBanner`,
            method: 'get'
        })
    }
}