import mongoose, { Schema } from 'mongoose'

const translationSchema = new Schema({
  translations: {
    type: Object
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

translationSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      translations: this.translations,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Translation', translationSchema)

export const schema = model.schema
export default model
