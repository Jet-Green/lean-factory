import $api from "../plugins/axios";

export default {
    getReportsToExcel(empls_ids) {
        return $api.post('/company/get-reports-to-excel', empls_ids)
    },
    deleteReport(_id, emplid) {
        return $api.get(`/company/delete-problem?problem_id=${_id}&empl_id=${emplid}`)
    },
    fixProblem(problemId, comment) {
        return $api.get(`/company/fix-problem?problem_id=${problemId}&comment=${comment}`)
    },
    sendProblemToFix(data) {
        return $api.post("/company/send-to-fix", data);
    },
    getProblemTypes(company_id) {
        return $api.get(`/company/get-problem-types?company_id=${company_id}`)
    },
    getFullProblem(_id) {
        return $api.get(`/company/get-full-problem?_id=${_id}`)
    },
    getReports(reportsIds) {
        return $api.post('/company/get-reports?', reportsIds);
    },
    getEmployees(company_id, emplsIds) {
        return $api.post(`/company/get-employees?company_id=${company_id}`, emplsIds);
    },
    getPlaces(company_id, palcesIds) {
        return $api.post(`/company/get-places?company_id=${company_id}`, palcesIds);
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