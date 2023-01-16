import $api from "../plugins/axios";

export default {
    sendProblemToFix(data) {
        return $api.post("/company/send-to-fix", data);
    },
    getEmployees(company_id) {
        return $api.get(`/company/get-employees?company_id=${company_id}`);
    },
    getFullEmpl(_id) {
        return $api.get(`/company/get-full-empl?_id=${_id}`);
    },
    reportProblem(report, company_id) {
        return $api.post(`/company/report-problem?company_id=${company_id}`, report)
    },
    addEmployees(employees) {
        return $api.post('/company/add-empls?company_id=0', employees)
    },
    deleteEmpl(empl_company) {
        return $api.post('/company/delete-empl', empl_company)
    },
    updateEmpl(empl_company) {
        return $api.post('/company/update-empl', empl_company)
    },
    getCompany(id) {
        return $api.get(`/company/get-company?company_id=${id}`)
    }
}