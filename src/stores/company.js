import { defineStore } from 'pinia'
import CompanyService from '../service/CompanyService'
import { useAuth } from './auth'

export const useCompany = defineStore('company', {
    state: () => ({
        company: null,
        employee: null
    }),
    getters: {
    },
    actions: {
        async addEmployees(employees) {
            this.company.employees.unshift(...employees)
            let { data } = await CompanyService.addEmployees(employees)
            this.company = data
        },
        async deleteEmpl(emplId) {
            for (let i = 0; i < this.company.employees.length; i++) {
                if (this.company.employees[i]._id == emplId) {
                    this.company.employees.splice(i, 1)
                }
            }
            let { data } = await CompanyService.deleteEmpl({ _id: emplId, company: this.company.identifier })
            this.company = data
        },
        async editEmpl(newEmployee) {
            for (let i = 0; i < this.company.employees.length; i++) {
                if (this.company.employees[i]._id == newEmployee._id) {
                    this.company.employees[i] = newEmployee
                }
            }
            let res = await CompanyService.updateEmpl({ employee: newEmployee, company: this.company.identifier })
            return res
        },
        async getCompany(identifier) {
            let { data } = await CompanyService.getCompany(identifier)

            this.company = data

            let { user } = useAuth()
            for (let e of this.company.employees) {
                if (e.email == user.email) {
                    this.employee = e
                }
            }
        }
    }
})
