// models/Cause.js
import mongoose from 'mongoose';

const communitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  goalAmount: { type: Number, required: true },
  collectedAmount: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  category:{type:String,
    enum:[
      "Education",
        "Child Welfare",
        "Orphan Support",
        "Women Empowerment",
        "Elderly Care",
        "Healthcare & Medical Aid",
        "Animal Welfare",
        "Environment & Sustainability",
        "Disaster Relief",
        "Poverty & Hunger",
        "Mental Health Support",
        "Rural Development",
        "Tribal Community Support",
        "Sanitation & Hygiene",
        "Disability Support",
        "Homeless Shelter",
        "Blood & Organ Donation",
        "Youth Skill Development",
        "Community Development",
        "Human Rights & Legal Aid"
    ]
  },
  donors:[{ type: mongoose.Schema.Types.ObjectId, ref: 'user'}]
});

export default mongoose.model('community', communitySchema);
