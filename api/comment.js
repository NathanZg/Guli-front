import request from '@/utils/request'
export default {
    //分页查评论
    getPageList(page, limit, courseId) {
        return request({
            url: `/eduservice/frontcomment/${courseId}/${page}/${limit}`,
            method: 'get',
        })
    },
    //添加评论
    addComment(comment) {
        return request({
            url: `/eduservice/frontcomment/addComment`,
            method: 'post',
            data: comment
        })
    },
    //查询课程评论数
    getCommentCounts(courseIds){
        return request({
            url: `/eduservice/frontcomment/getCommentCounts`,
            method: 'post',
            data: courseIds,
            headers:{
                'Content-Type':'application/json;charset=utf-8'
            }
        })
    }
}