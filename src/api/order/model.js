import mongoose, { Schema } from 'mongoose'

const orderSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: true
  },
  dateFrom: {
    type: Date
  },
  dateTo: {
    type: Date
  },
  daysFrom: {
    type: Number
  },
  daysTo: {
    type: Number
  },
  hoursFrom: {
    type: Number
  },
  hoursTo: {
    type: Number
  },
  totalDays: {
    type: Number
  },
  totalHours: {
    type: Number
  },
  totalPrice: {
    type: Number
  },
  kitchen: {
    type: Object,
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

orderSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      type: this.type,
      dateFrom: this.dateFrom,
      dateTo: this.dateTo,
      daysFrom: this.daysFrom,
      daysTo: this.daysTo,
      hoursFrom: this.hoursFrom,
      hoursTo: this.hoursTo,
      totalDays: this.totalDays,
      totalHours: this.totalHours,
      totalPrice: this.totalPrice,
      kitchen: this.kitchen,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Order', orderSchema)

export const schema = model.schema
export default model
