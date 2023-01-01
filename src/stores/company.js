import { defineStore } from 'pinia'
import CompanyService from '../service/CompanyService'
import { useAuth } from './auth'

export const useCompany = defineStore('company', {
    state: () => ({
        company: null,
        employee: null
    }),
    getters: {},
    actions: {
        addEmployees(employees) {
            this.company.employees.push(...employees)
            CompanyService.addEmployees(employees)
        },
        deleteEmpl(emplEmail) {
            for (let i = 0; i < this.company.employees.length; i++) {
                if (this.company.employees[i].email == emplEmail) {
                    this.company.employees.splice(i, 1)
                }
            }
            CompanyService.deleteEmpl({ email: emplEmail, compane: this.company.identifier })
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
