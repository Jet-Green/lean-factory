import $api from "../plugins/axios";

export default {
    addEmployees(employees) {
        $api.post('/company/add-empls', employees)
    }
}