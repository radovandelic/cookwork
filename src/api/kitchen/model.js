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
  size: {
    type: Number,
    required: true
  },
  AFSCA: {
    type: Number
  },
  VAT: {
    type: Number,
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
  }]
}, {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => { delete ret._id }
    }
  })

kitchenSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      name: this.name,
      phone: this.phone,
      description: this.description,
      type: this.type,
      address: this.address,
      size: this.size,
      AFSCA: this.AFSCA,
      VAT: this.VAT,
      hours: this.hours,
      capacity: this.capacity,
      price: this.price,
      rent: this.rent,
      equipment: this.equipment,
      staff: this.staff,
      cancellation: this.cancellation,
      events: this.events,
      standingCapacity: this.standingCapacity,
      sittingCapacity: this.sittingCapacity,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      images: this.images
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Kitchen', kitchenSchema)

export const schema = model.schema
export default model
