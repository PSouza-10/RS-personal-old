const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')

const ObjID = Schema.Types.ObjectId
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 40
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String,
      required: false,
      maxlength: 11,
      minlength: 10
    },
    password: {
      type: String,
      required: true
    },
    consultry: {
      required: false,
      birth: {
        date: String,
        place: String,
        required: false
      },
      weigth: Number,
      height: Number,
      meals: [Boolean],
      nutritionalObservations: [String],
      healthObservations: [String],
      medications: [String],
      steroidHistory: [{ name: String, useTime: String, result: String }],
      anamenese: {
        type: Schema.Types.Mixed
      }
    },
    permissions: {
      READ: [ObjID],
      WRITE: [ObjID],
      DELETE: [ObjID],
      CREATE: {
        type: Boolean,
        default: false
      },
      GENERAL: {
        type: [String],
        default: ['COMMENT', 'VIEW', 'MESSAGE']
      },
      ADMIN: [String]
    },

    isAdmin: {
      type: Boolean,
      default: false
    }
  },

  {
    timestamps: true,
    minimize: true
  }
)

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  const hashedPassword = await bcrypt.hash(this.password, 10)

  this.password = hashedPassword
})

module.exports = model('User', UserSchema)
