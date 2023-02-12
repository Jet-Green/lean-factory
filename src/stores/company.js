import { defineStore } from 'pinia'
import CompanyService from '../service/CompanyService'
import { useAuth } from './auth'

import xlsx from "json-as-xlsx"


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
        async downloadStats() {
            let emplIdsWithMyReports = [this.employee._id, ...this.employee.hierarchy.down]

            let { data } = await CompanyService.getReportsToExcel(emplIdsWithMyReports)
            console.log(data);

            let statsData = []
            for (let d of data) {
                for (let act of d.actions) {
                    let toPush = {
                        comment: d.commentToPhoto,
                        placeName: d.placeName,
                        respEmplName: d.respEmplName,
                        date: new Date(act.date).toLocaleDateString('ru-RU') + ' ' + new Date(act.date).toLocaleTimeString('ru-RU'),
                        status: ''
                    }
                    if (act.status == 'created') {
                        toPush.status = 'создана'
                    } else if (act.status == 'sent_to_fix') {
                        toPush.status = 'отправлено исполнителю'
                    } else {
                        toPush.status = 'завершена'
                    }

                    statsData.push(toPush)
                }
                statsData.push({})
            }

            // console.log(statsData);
            xlsx([
                {
                    sheet: "Проблемы",
                    columns: [
                        { label: "Комментарий", value: "comment" }, // Top level data
                        { label: "Место", value: 'placeName' },
                        { label: "Ответственный", value: 'respEmplName' },
                        { label: "Дата", value: 'date' },
                        { label: "Статус", value: 'status' }
                    ],
                    content: statsData,
                }
            ], {
                fileName: "Глазов-Молоко",
            })
        },
        async deleteReport(_id) {
            let res = await CompanyService.deleteReport(_id, this.employee._id)
            console.log(res);

            this.fetchedReports.splice(this.fetchedReports.indexOf(res.data[0]), 1)
            this.employee = res.data[1]

            return res.data[0] != undefined
        },
        async fixProblem(problemId, comment) {
            return await CompanyService.fixProblem(problemId, comment)
        },
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
        },
        clearState() {
            this.company = null
            this.employee = null
            this.fetchedEmployees = null
            this.fetchedPlaces = null
            this.fetchedReports = null
            this.fetchedProblemTypes = null
        }
    }
})
