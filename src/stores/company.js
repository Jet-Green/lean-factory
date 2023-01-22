import { defineStore } from 'pinia'
import CompanyService from '../service/CompanyService'
import { useAuth } from './auth'

export const useCompany = defineStore('company', {
    state: () => ({
        company: null,
        employee: null,
        fetchedEmployees: null,
        fetchedPlaces: null,
        fetchedReports: null,
        fetchedProblemTypes: null
    }),
    getters: {
    },
    actions: {
        async sendProblemToFix(data) {
            return await CompanyService.sendProblemToFix(data)
        },
        async getFullProblem(_id) {
            return await CompanyService.getFullProblem(_id)
        },
        async getFullEmpl(_id) {
            return await CompanyService.getFullEmpl(_id)
        },
        async reportProblem(report) {
            let res = await CompanyService.reportProblem(report, this.company.identifier)

            console.log(res);
        },
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
            await this.fecthEmpls()
            await this.fetchPlaces()
            await this.fetchReports()
            await this.fetchProblemTypes()
        },
        async fecthEmpls() {
            if (!this.company) return

            let { data } = await CompanyService.getEmployees(this.company.identifier, this.company.employees)

            this.fetchedEmployees = data

            const userStore = useAuth()
            for (let empl of data) {
                if (empl.email == userStore.user.email) {
                    this.employee = empl
                    break
                }
            }
        },
        async fetchPlaces() {
            const { data } = await CompanyService.getPlaces(this.company.identifier, this.company.places)
            this.fetchedPlaces = data
            return data
        },
        async fetchReports() {
            const { data } = await CompanyService.getReports(this.employee.reportsToFix)
            this.fetchedReports = data
            return data
        },
        async fetchProblemTypes() {
            const { data } = await CompanyService.getProblemTypes(this.company.identifier)
            this.fetchedProblemTypes = data

        }
    }
})
