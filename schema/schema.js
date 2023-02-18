const graphql = require('graphql');
const Book = require('../models/books');
const Author = require('../models/author');
const Job = require('../models/job');

const {
   GraphQLObjectType, GraphQLString, GraphQLBoolean,
   GraphQLID, GraphQLInt,GraphQLSchema,
   GraphQLList,GraphQLNonNull
} = graphql;


const BookType = new GraphQLObjectType({
   name: 'Book',
   fields: () => ({
       id: { type: GraphQLID  },
       name: { type: GraphQLString },
       pages: { type: GraphQLInt },
       author: {
       type: AuthorType,
       resolve(parent, args) {
           return Author.findById(parent.authorID);
       }
   }
   })
});


const AuthorType = new GraphQLObjectType({
   name: 'Author',
   fields: () => ({
       id: { type: GraphQLID },
       name: { type: GraphQLString },
       age: { type: GraphQLInt },
       book:{
           type: new GraphQLList(BookType),
           resolve(parent,args){
               return Book.find({ authorID: parent.id });
           }
       }
   })
})


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
    monday: { type: GraphQLString },
    tuesday: { type: GraphQLString },
    wednesday: { type: GraphQLString },
    thursday: { type: GraphQLString },
    friday: { type: GraphQLString },
    saturday: { type: GraphQLString },
    sunday: { type: GraphQLString },
  }),
});

const DaysType = new GraphQLObjectType({
  name: 'Days',
  fields: () => ({
    monday: { type: GraphQLString },
    tuesday: { type: GraphQLString },
    wednesday: { type: GraphQLString },
    thursday: { type: GraphQLString },
    friday: { type: GraphQLString },
    saturday: { type: GraphQLString },
    sunday: { type: GraphQLString },
  }),
});

const CaseType = new GraphQLObjectType({
  name: 'Case',
  fields: () => ({
    id: { type: GraphQLID },
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


const RootQuery = new GraphQLObjectType({
   name: 'RootQueryType',
   fields: {
       book: {
           type: BookType,
           args: { id: { type: GraphQLID } },
           resolve(parent, args) {
               return Book.findById(args.id);
           }
       },
       books:{
           type: new GraphQLList(BookType),
           resolve(parent, args) {
               return Book.find({});
           }
       },
       author:{
           type: AuthorType,
           args: { id: { type: GraphQLID } },
           resolve(parent, args) {
               return Author.findById(args.id);
           }
       },
       job:{
           type: CaseType,
           // args: { name: { type: GraphQLString } },
           args: { id: { type: GraphQLID } },
           resolve(parent, args) {
               return Job.findById(args.id);
             }
       },
       jobs:{
           type: new GraphQLList(CaseType),
           resolve(parent, args) {
               return Job.find({});
             }
       },
       authors:{
           type: new GraphQLList(AuthorType),
           resolve(parent, args) {
               return Author.find({});
           }
       }
   }
});


module.exports = new GraphQLSchema({
   query: RootQuery
});
