import mongoose, { Schema } from 'mongoose'

const infoSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  activity: {
    type: String,
    required: true
  },
  purpose: {
    type: String
  },
  region: {
    type: String
  },
  phone: {
    type: String
  },
  type: {
    type: String
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
  comments: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

infoSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      activity: this.activity,
      purpose: this.purpose,
      region: this.region,
      phone: this.phone,
      type: this.type,
      dateFrom: this.dateFrom,
      dateTo: this.dateTo,
      daysFrom: this.daysFrom,
      daysTo: this.daysTo,
      hoursFrom: this.hoursFrom,
      hoursTo: this.hoursTo,
      comments: this.comments,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Info', infoSchema)

export const schema = model.schema
export default model
