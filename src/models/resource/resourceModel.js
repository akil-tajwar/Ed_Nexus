const { Schema, models, model } = require("mongoose");

const resourceSchema = new Schema(
  {
    course_id: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    attachments: [
      {
        url: {
          type: String,
        }
      },
    ],
    createdAt: {
      type: String,
    },
    updatedAt: {
      type: String,
    }
  },
  { timestamps: true }
);

const Resources = models.Resources || model("Resources", resourceSchema);
export default Resources;