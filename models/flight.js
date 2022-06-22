import mongoose from "mongoose"

const Schema = mongoose.Schema

const ticketSchema = new Schema({
  seat: {
    type: String,
    match: /[A-F][1-9]\d?/
  },
  price: {
    type: Number,
    min: 0
  }
}, {
  timestamps: true
})

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
      // return new Date(new Date(),setFullYear(new Date().getFullYear() + 1))
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
  },
  tickets: [ticketSchema],
  meal: [{type: Schema.Types.ObjectId, ref: 'Meal'}]
}, {
  timestamps: true
})

const Flight = mongoose.model("Flight", flightSchema)

export {
  Flight
}