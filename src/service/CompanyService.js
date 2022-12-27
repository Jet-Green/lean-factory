import $api from "../plugins/axios";

export default {
    addEmployees(employees) {
        $api.post('/company/add-empls?company_id=0', employees)
    }
}