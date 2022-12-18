import { defineStore } from 'pinia'
import CompanyService from '../service/CompanyService'

export const useCompany = defineStore('company', {
    state: () => ({
        companyName: 'Глазов Молоко',
        employees: [],
    }),
    getters: {},
    actions: {
        addEmployees(employees) {
            this.employees.push(...employees)
            CompanyService.addEmployees(employees)
        }
    }
})
