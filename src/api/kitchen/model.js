import mongoose, { Schema } from 'mongoose'

const kitchenSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  type: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  postalCode: {
    type: Number,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  AFSCA: {
    type: String,
    trim: true
  },
  VAT: {
    type: String,
    required: true,
    trim: true
  },
  days: {
    type: Object
  },
  hours: {
    type: Object
  },
  capacity: {
    type: Number
  },
  price: {
    type: Number,
    required: true
  },
  rent: {
    type: Number
  },
  equipment: {
    type: Object
  },
  staff: {
    type: Object
  },
  cancellation: {
    type: String
  },
  events: {
    type: Boolean
  },
  standingCapacity: {
    type: Number
  },
  sittingCapacity: {
    type: Number
  },
  images: [{
    large: String,
    thumbnail: String
  }],
  verified: {
    type: Boolean
  }
},
{
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  },
  usePushEach: true
})

kitchenSchema.methods = {
  view (extended, role) {
    const full = role !== 'guest'
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(),
      name: this.name,
      type: this.type,
      address: this.address,
      postalCode: this.postalCode,
      region: this.region,
      size: this.size,
      price: this.price,
      rent: this.rent,
      images: this.images,
      verified: this.verified
    }

    const extendedView = {
      ...view,
      description: this.description,
      days: this.days,
      hours: this.hours,
      capacity: this.capacity,
      equipment: this.equipment,
      staff: this.staff,
      cancellation: this.cancellation,
      events: this.events,
      standingCapacity: this.standingCapacity,
      sittingCapacity: this.sittingCapacity,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return extended
      ? full ? {
        ...extendedView,
        phone: this.phone,
        AFSCA: this.AFSCA,
        VAT: this.VAT
      } : extendedView : view
  }
}

const model = mongoose.model('Kitchen', kitchenSchema)

export const schema = model.schema
export default model
