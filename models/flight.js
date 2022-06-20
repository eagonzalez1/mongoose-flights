import mongoose from "mongoose"

const Schema = mongoose.Schema

const flightSchema = new mongoose.Schema({
  airline: {
    type: String,
    enum: ['American', 'Southwest', 'United'],
  },
  airport: {
    type: String, 
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
    default: 'DEN',
  },
  flightNo: {
    type: Number,
    min: 10,
    max: 9999
  },
  departs: {
    type: Date, 
    default: function() {
      let mo = new Date().getMonth() + 1
      let day = new Date().getDate()
      let year = new Date().getFullYear() + 1
      let formattedMonth = mo.length === 2 ? mo : `0${mo}`
      let formattedDay = day.length === 2 ? day : `0${day}`
      // let hour = new Date().getUTCHours()
      // let min = new Date().getUTCMinutes()
      let stringDate = `${year}-${formattedMonth}-${formattedDay}`
      let finalDate = new Date(stringDate)
      return finalDate
    },
  }
}, {
  timestamps: true
})

const Flight = mongoose.model("Flight", flightSchema)

export {
  Flight
}