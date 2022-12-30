import { defineStore } from 'pinia'
import CompanyService from '../service/CompanyService'

export const useCompany = defineStore('company', {
    state: () => ({
        company: null
    }),
    getters: {},
    actions: {
        addEmployees(employees) {
            this.company.employees.push(...employees)
            CompanyService.addEmployees(employees)
        },
        deleteEmpl(empl_company) {
            for (let i = 0; i < this.company.employees.length; i++) {
                if (this.company.employees[i].email == empl_company.email) {
                    this.company.employees.splice(i, 1)
                }
            }
            CompanyService.deleteEmpl(empl_company)
        },
        async getCompany(identifier) {
            let { data } = await CompanyService.getCompany(identifier)

            this.company = data
        }
    }
})
