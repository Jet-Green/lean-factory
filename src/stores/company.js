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
        async getCompany(identifier) {
            let { data } = await CompanyService.getCompany(identifier)

            this.company = data
        }
    }
})
