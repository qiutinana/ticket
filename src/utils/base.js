const base = {
    get() {
        return {
            url : "http://localhost:7000/",
            name: process.env.NODE_ENV == 'development' ?  "/api": '/',
            // 退出到首页链接
            indexUrl: 'http://localhost:7000/app/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "明泰配件加工厂工单管理系统"
        } 
    }
}
export default base
