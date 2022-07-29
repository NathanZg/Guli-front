import request from '@/utils/request'
export default {
    //分页条件查询课程
    getCourseList(current,limit,queryObj){
        return request({
            url: `/eduservice/coursefront/getCourseFrontList/${current}/${limit}`,
            method: 'post',
            data: queryObj
        })
    },
    //查询所有分类
    getAllSubject(){
        return request({
            url: `/eduservice/subject/getAllSubject`,
            method: 'get'
        })
    },
    //课程详情
    getFrontCourseInfo(courseId){
        return request({
            url: `/eduservice/coursefront/getFrontCourseInfo/${courseId}`,
            method: 'get'
        })
    },
    //增加一次课程访问量
    addCourseViewCount(courseId){
        return request({
            url: `/eduservice/course/addCourseViewCount/${courseId}`,
            method: 'get'
        })
    },
}