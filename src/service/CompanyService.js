import $api from "../plugins/axios";

export default {
    addEmployees(employees) {
        return $api.post('/company/add-empls?company_id=0', employees)
    },
    deleteEmpl(empl_company) {
        return $api.post('/company/delete-empl', empl_company)
    },
    getCompany(id) {
        return $api.get(`/company/get-company?company_id=${id}`)
    }
}