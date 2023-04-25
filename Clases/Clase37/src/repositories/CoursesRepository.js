export default class CoursesRepository {
    constructor() {
        this.dao = dao;
    }

    getCourses() {
        return this.dao.getAll();
    }

    getOne(id) {
        return this.dao.getOne(id);
    }
}