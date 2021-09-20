const createEmployeeRecord = (recordArray) => {
    return {
        firstName: recordArray[0],
        familyName: recordArray[1],
        title: recordArray[2],
        payPerHour: recordArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}
// console.log(createEmployeeRecord(['Ann', 'Mantis', 'Champ', 10]))
// console.log(createEmployeeRecord(["Gray", "Worm", "Security", 1]))


const createEmployeeRecords = (recordsArray) => {
    return recordsArray.map(rec => createEmployeeRecord(rec))
}
// console.log(createEmployeeRecords([
//     ["moe", "sizlak", "barkeep", 2],
//     ["bartholomew", "simpson", "scamp", 3]
// ]))

const createTimeInEvent = function(dateStamp) {
    const [date, hour] = dateStamp.split(" ")
   // console.log('hour: ', hour)
   // console.log('date: ', date)
    const inEvent = {
        type: 'TimeIn',
        hour: parseInt(hour),
        date: date,
    }
    this.timeInEvents.push(inEvent)
    //console.log('this: ', this)
    return this
}
// let bpRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3])
// let updatedBpRecord = createTimeInEvent.call(bpRecord, "2014-02-28 1400")
// let newEvent = updatedBpRecord.timeInEvents[0]
// console.log(bpRecord)
// console.log(updatedBpRecord)
// console.log(newEvent)

const createTimeOutEvent = function(dateStamp) {
    const [date, hour] = dateStamp.split(" ")
 
    const outEvent = {
        type: 'TimeOut',
        hour: parseInt(hour),
        date: date,
    }
    this.timeOutEvents.push(outEvent)
    return this
}
// updatedBpRecord = createTimeOutEvent.call(bpRecord, "2015-02-28 1700")
// newEvent = updatedBpRecord.timeOutEvents[0]
// console.log(newEvent)

const hoursWorkedOnDate = function(targetDate){
    const inEvent = this.timeInEvents.find(inEvent => inEvent.date === targetDate)
    const outEvent = this.timeOutEvents.find(outEvent => outEvent. date === targetDate)
    return (outEvent.hour - inEvent.hour) / 100
}   
// cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 1000])
// createTimeInEvent.call(cRecord, "2044-03-15 0900")
// createTimeOutEvent.call(cRecord, "2044-03-15 1100")
// console.log(hoursWorkedOnDate.call(cRecord, "2044-03-15"))

const wagesEarnedOnDate = function(targetDate){
    return hoursWorkedOnDate.call(this, targetDate) * this.payPerHour
}
// cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27])
// createTimeInEvent.call(cRecord, "2044-03-15 0900")
// createTimeOutEvent.call(cRecord, "2044-03-15 1100")
// console.log(wagesEarnedOnDate.call(cRecord, "2044-03-15"))

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
*/

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!
    return payable
}
// cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27])
// // Earns 324
// createTimeInEvent.call(cRecord, "2044-03-14 0900")
// createTimeOutEvent.call(cRecord, "2044-03-14 2100")
// // Earns 54
// createTimeInEvent.call(cRecord, "2044-03-15 0900")
// createTimeOutEvent.call(cRecord, "2044-03-15 1100")
// // 324 + 54
// console.log(allWagesFor.call(cRecord))

const findEmployeeByFirstName = function(srcArray, firstName){
    return srcArray.find(rec => rec.firstName === firstName)
}

const calculatePayroll = function(recsArray) {
    return recsArray.reduce((total, rec) => {
        return total + allWagesFor.call(rec)
    },0)
}

const csvDataEmployees = [
    ["Thor", "Odinsson", "Electrical Engineer", 45],
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150],
    ["Darcey", "Lewis", "Intern", 15],
    ["Jarvis", "Stark", "CIO", 125],
    ["Anthony", "Stark", "Angel Investor", 300]
]

const csvTimesIn = [
    ["Thor", ["2018-01-01 0800", "2018-01-02 0800", "2018-01-03 0800"]],
    ["Loki", ["2018-01-01 0700", "2018-01-02 0700", "2018-01-03 0600"]],
    ["Natalia", ["2018-01-01 1700", "2018-01-05 1800", "2018-01-03 1300"]],
    ["Darcey", ["2018-01-01 0700", "2018-01-02 0800", "2018-01-03 0800"]],
    ["Jarvis", ["2018-01-01 0500", "2018-01-02 0500", "2018-01-03 0500"]],
    ["Anthony", ["2018-01-01 1400", "2018-01-02 1400", "2018-01-03 1400"]]
]

const csvTimesOut = [
    ["Thor", ["2018-01-01 1600", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Loki", ["2018-01-01 1700", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Natalia", ["2018-01-01 2300", "2018-01-05 2300", "2018-01-03 2300"]],
    ["Darcey", ["2018-01-01 1300", "2018-01-02 1300", "2018-01-03 1300"]],
    ["Jarvis", ["2018-01-01 1800", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Anthony", ["2018-01-01 1600", "2018-01-02 1600", "2018-01-03 1600"]]
]

let employeeRecords = createEmployeeRecords(csvDataEmployees)
employeeRecords.forEach(function (rec) {
  let timesInRecordRow = csvTimesIn.find(function (row) {
    return rec.firstName === row[0]
  })

  let timesOutRecordRow = csvTimesOut.find(function (row) {
    return rec.firstName === row[0]
  })

  timesInRecordRow[1].forEach(function(timeInStamp){
    createTimeInEvent.call(rec, timeInStamp)
  })

  timesOutRecordRow[1].forEach(function(timeOutStamp){
    createTimeOutEvent.call(rec, timeOutStamp)
  })
})
console.log(calculatePayroll(employeeRecords))