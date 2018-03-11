import mongoose, { Schema } from 'mongoose'

const kitchenSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
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
    required: true
  },
  postalCode: {
    type: Number
  },
  region: {
    type: String
  },
  size: {
    type: Number,
    required: true
  },
  AFSCA: {
    type: String
  },
  VAT: {
    type: String,
    required: true
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
}, {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => { delete ret._id }
    }
  })

kitchenSchema.methods = {
  view(full, admin) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      name: this.name,
      type: this.type,
      address: this.address,
      postalCode: this.postalCode,
      region: this.region,
      size: this.size,
      price: this.price,
      rent: this.rent,
      images: this.images
    }

    const fullView = {
      ...view,
      description: this.description,
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

    return full ?
      admin ? {
        ...fullView,
        phone: this.phone,
        AFSCA: this.AFSCA,
        VAT: this.VAT,
        verified: this.verified
      } : fullView : view
  }
}

const model = mongoose.model('Kitchen', kitchenSchema)

export const schema = model.schema
export default model
