const axios = require("axios");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLFloat,
} = require("graphql");

// Hardcoded data
// const customers = [
//   { id: "1", name: "John Doe", email: "jdoe@gmail.com", age: 35 },
//   { id: "2", name: "Steve Smithh", email: "steve@gmail.com", age: 25 },
//   { id: "3", name: "Sara Williams", email: "sara@gmail.com", age: 32 },
// ];
const CustomerType = new GraphQLObjectType({
  name: "customer",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        return axios
          .get("http://localhost:3000/customers/" + args.id)
          .then((res) => res.data);
        // for (let i = 0; i < customers.length; i++) {
        //   if (customers[i].id == args.id) {
        //     return customers[i];
        //   }
        // }
      },
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parentValue, args) {
        return axios
          .get("http://localhost:3000/customers")
          .then((res) => res.data);
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addCustomer: {
      type: CustomerType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parentValue, args) {
        return axios
          .post("http://localhost:3000/customers",args
        //    {
        //     name: args.name,
        //     email: args.email,
        //     age: args.age,
        //   }
          )
          .then((res) => res.data);
      },
    },
    deleteCustomer: {
        type: CustomerType,
        args: {
         id:{type:GraphQLString}
        },
        resolve(parentValue, args) {
          return axios
            .delete("http://localhost:3000/customers/"+args.id)
            .then((res) => res.data);
        },
      },
      editcustomer: {
        type: CustomerType,
        args: {
         id:{type:GraphQLString},
         name: { type: GraphQLString },
         email: { type:  GraphQLString },
         age: { type: GraphQLInt },
        },
        resolve(parentValue, args) {
          return axios
            .patch("http://localhost:3000/customers/"+args.id,args
            //  {
            //     name: args.name,
            //     email: args.email,
            //     age: args.age,
            //   }
              )
            .then((res) => res.data);
        },
      },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
