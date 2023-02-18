const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLFloat } = require('graphql');

const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    task: { type: GraphQLString },
    completed: { type: GraphQLBoolean },
  }),
});

const HoursType = new GraphQLObjectType({
  name: 'Hours',
  fields: () => ({
    monday: { type: GraphQLFloat },
    tuesday: { type: GraphQLFloat },
    wednesday: { type: GraphQLFloat },
    thursday: { type: GraphQLFloat },
    friday: { type: GraphQLFloat },
    saturday: { type: GraphQLFloat },
    sunday: { type: GraphQLFloat },
  }),
});

const DaysType = new GraphQLObjectType({
  name: 'Days',
  fields: () => ({
    monday: { type: GraphQLFloat },
    tuesday: { type: GraphQLFloat },
    wednesday: { type: GraphQLFloat },
    thursday: { type: GraphQLFloat },
    friday: { type: GraphQLFloat },
    saturday: { type: GraphQLFloat },
    sunday: { type: GraphQLFloat },
  }),
});

const CaseType = new GraphQLObjectType({
  name: 'Case',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    startDate: { type: GraphQLString },
    actionStepsTaken: { type: new GraphQLList(GraphQLString) },
    nextSteps: { type: new GraphQLList(GraphQLString) },
    addedToSalesforce: { type: GraphQLBoolean },
    addedToSlack: { type: GraphQLBoolean },
    hours: { type: HoursType },
    addedToTimecard: { type: GraphQLBoolean },
    tasks: { type: new GraphQLList(TaskType) },
    notes: { type: GraphQLString },
    days: { type: DaysType },
    inSalesforce: { type: GraphQLBoolean },
    inSlack: { type: GraphQLBoolean },
    inTimecard: { type: GraphQLBoolean },
  }),
});

module.exports = CaseType;
