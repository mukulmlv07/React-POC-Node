
const {ApolloServer,gql}=require('apollo-server')

exports.typeDefs = gql`
  type Query {
    employees: [emp!]!
    departments: [depart!]!
    averageTime(email:String): [Int] 
  }

  type emp {
    empId: String
    name: String
    designation: String
    email: String
    password: String
    address: String
    department: String
    phoneNumber: String
    status: Boolean
  }
  
  type Mutation {
    createEmployee(empId: String
      name: String
      designation: String
      email: String
      password: String
      department: String
      address: String
      status: Boolean
      phoneNumber: String): emp!,

    deleteEmployee(empId: String): [emp],

    updateEmployee(empId: String
      name: String
      designation: String
      email: String
      password: String
      department: String
      address: String
      phoneNumber: String
      status: Boolean
      ): [emp],

      login(userCredentials:loginInput):user

      loginData(email:String):[String]

      logoutData(email:String):[String]

      calculateAvgTime(email:String,avgTime:Int):[String]
      
    }
    scalar Date
    type loginDateType{
      date: String
    }
    type depart {
      name: String
      designations: [String]
    }  

    type user{
      name:String,
      email:String,
      password:String
      designation: String
      phoneNumber: String
      department: String
      status: Boolean
    }
    input loginInput{
      email:String!
      password:String!
    }

`;
