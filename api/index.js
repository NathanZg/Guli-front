import request from '@/utils/request'
export default {
    //查出最热门的八个课程
    //最老的四个名师
    index() {
        return request({
            url: `/eduservice/indexfront/index`,
            method: 'get'
        })
    }
}