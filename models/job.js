const mongoose = require('mongoose');
const config = require('./../config.js');

mongoose.set('strictQuery', false);
mongoose.connect(config.uri,
  { useNewUrlParser: true },
  () => {
    console.log("Connect with DB successfully.");
  });

const schema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  name: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  actionStepsTaken: [{
    type: String,
  }],
  nextSteps: [{
    type: String,
  }],
  addedToSalesforce: {
    type: Boolean,
    default: false,
  },
  addedToSlack: {
    type: Boolean,
    default: false,
  },
  hours: {
    monday: {
      type: String,
    },
    tuesday: {
      type: String,
    },
    wednesday: {
      type: String,
    },
    thursday: {
      type: String,
    },
    friday: {
      type: String,
    },
    saturday: {
      type: String,
    },
    sunday: {
      type: String,
    },
  },
  addedToTimecard: {
    type: Boolean,
    default: false,
  },
  tasks: [{
    task: {
      type: String,
    },
    completed: {
      type: Boolean,
    },
  }],
  notes: {
    type: String,
  },
  days: {
    monday: {
      type: String,
    },
    tuesday: {
      type: String,
    },
    wednesday: {
      type: String,
    },
    thursday: {
      type: String,
    },
    friday: {
      type: String,
    },
    saturday: {
      type: String,
    },
    sunday: {
      type: String,
    },
  },
  inSalesforce: {
    type: Boolean,
    default: false,
  },
  inSlack: {
    type: Boolean,
    default: false,
  },
  inTimecard: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Job', schema);

// const Model = mongoose.model('Model', schema);
//
// module.exports = Model;
