import request from '@/utils/request'
export default {
    //分页查询
    getTeacherList(current,limit){
        return request({
            url: `/eduservice/teacherfront/getFrontPageTeacherList/${current}/${limit}`,
            method: 'get'
        })
    },
    //获取讲师信息
    getTeacherInfo(teacherId){
        return request({
            url: `/eduservice/teacherfront/getFrontTeacherInfo/${teacherId}`,
            method: 'get'
        })
    },
    //获取讲师主讲课程
    getTeacherCourseList(teacherId,current,limit){
        return request({
            url: `/eduservice/teacherfront/getFrontTeacherCourseList/${teacherId}/${current}/${limit}`,
            method: 'get'
        })
    }
}