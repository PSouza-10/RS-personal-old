const { Schema, model } = require('mongoose')

const Element = new Schema(
  {
    elementType: {
      enum: [
        'Title',
        'Subtitle',
        'Text',
        'SubText',
        'List',
        'Table',
        'Image',
        'Video',
        'Download'
      ],
      type: String,
      default: 'Title'
    },
    styles: {
      type: Schema.Types.Mixed,
      required: false
    },
    data: {
      type: Schema.Types.Mixed,
      required: true
    }
  },
  { minimize: false, _id: false }
)

const ContentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    tags: {
      type: [String],
      default: [],
      required: false
    },
    content: {
      type: [Element],
      required: true
    },
    public: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true, minimize: false }
)

module.exports = model('Content', ContentSchema, 'content')
