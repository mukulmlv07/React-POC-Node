// import { Employee } from "./Models/Employee.js";

const { Employee } = require("./Models/Employee");

let dummyData = [
  {
    empId: "1234",
    name: "Yochana",
    password: "123456",
    designation: "Software Engineer",
    department: "Delivery",
    email: "yochana@gmail.com",
    address: "",
    phoneNumber: "9123456789",
    status: true,
  },
  {
    empId: "1235",
    name: "Sumalatha",
    password: "123456",
    designation: "Business Analyst",
    department: "Delivery",
    email: "sumalatha@gmail.com",
    address: "",
    phoneNumber: "9123456789",
    status: true,
  },
  {
    empId: "1236",
    name: "Renuka",
    password: "123456",
    designation: "Software Engineer",
    department: "Delivery",
    email: "renuka@gmail.com",
    address: "",
    phoneNumber: "9191919191",
    status: true,
  },
  {
    empId: "1237",
    name: "Eekshita",
    password: "123456",
    designation: "Devops",
    department: "Delivery",
    email: "eekshita@gmail.com",
    address: "",
    phoneNumber: "9181716151",
    status: true,
  },
  {
    empId: "1238",
    name: "Deepika",
    password: "123456",
    designation: "Admin",
    department: "Administration",
    email: "deepika@gmail.com",
    address: "",
    phoneNumber: "9121314151",
    status: true,
  },
  {
    empId: "1239",
    name: "Priya",
    password: "123456",
    designation: "Accountant",
    department: "Administration",
    email: "priya@gmail.com",
    address: "",
    phoneNumber: "9876543210",
    status: true,
  },
  {
    empId: "1240",
    name: "Suvarna",
    password: "123456",
    designation: "Manager",
    department: "Delivery",
    email: "suvarna@gmail.com",
    address: "",
    phoneNumber: "9012345678",
    status: true,
  },
  {
    email: "test",
    password: "mukul",
    name: "mukul",
    empId: "1236",
    password: "123",
    designation: "Devloper",
    address: "",
    phoneNumber: "9123456789",
    status: true,
  },
];

const departments = [
  {
    name: "Delivery",
    designations: [
      "Software Engineer",
      "Business Analyst",
      "Devops",
      "Manager",
    ],
  },
  { name: "Administration", designations: ["Admin", "Accountant"] },
];

const generateId = () => {
  let updatedData = [...dummyData];
  const randomId = Math.floor(1000 + Math.random() * 9000);
  let alreadyExist = updatedData.some((data) => {
    if (data.empId == randomId.toString()) return true;
    return false;
  });
  if (alreadyExist) {
    generateId();
  } else {
    return randomId.toString() || "";
  }
  return "";
};

exports.resolvers = {
  Query: {
    employees: async () => {
      return await Employee.find({});
    },
    departments: () => {
      console.log(departments);
      return departments;
    },
    averageTime:async(_,{email})=>{
      // console.log('----------------------------------------------------',email)
      const data=await Employee.findOne({email})
      console.log(data)
      return data.averageTime
    }
  },
  Mutation: {
    createEmployee: async (parent, args) => {
      let createdObj = args;
      // console.log(args);
      const newEmployee = new Employee({
        ...createdObj,
        empId: generateId(),
        status: true,
      });
      await newEmployee.save();
      return createdObj;
    },
    updateEmployee: (parent, args) => {
      // console.log("update", dummyData);
      let updatedData = dummyData.map((user) =>
        user.empId === args.empId ? args : user
      );
      dummyData = [...updatedData];
      return updatedData;
    },
    deleteEmployee: (parent, args) => {
      // console.log("args", args);
      let deletedData = dummyData.filter((user) => user.empId !== args.empId);
      dummyData = [...deletedData];
      return deletedData;
    },
    login: async (parent, { userCredentials }) => {
      // console.log(userCredentials);
      const fetcheduser = await Employee.findOne({
        $and: [
          { email: userCredentials.email },
          { password: userCredentials.password },
        ],
      });
      // const fetcheduser = dummyData.find(
      //   (user) =>
      //     user.email == userCredentials.email &&
      //     user.password == userCredentials.password
      // );
      // console.log("fetchedUser", fetcheduser);
      if (!fetcheduser) {
        throw new Error("Email or Pasword is incorrect");
      }
      return fetcheduser;
    },

    loginData: async (parent, { email }) => {
      const date = new Date();
      try {
        const data = await Employee.findOneAndUpdate(
          { email: email },
          { $push: { logIn: date } }
        );
        // console.log(data.logIn);
        return data.logIn;
      } catch (err) {
        console.log(err);
      }
    },

    logoutData: async (parent, { email }) => {
      const date = new Date();
      try {
        const data = await Employee.findOneAndUpdate(
          { email: email },
          { $push: { logOut: date } }
        );
        // console.log(data.logOut);
        return data.logOut;
      } catch (err) {
        console.log(err);
      }
    },

    calculateAvgTime: async(parent,{email,avgTime})=>{
      // console.log('----------------------------------------')
      // console.log(email,avgTime)
      try {
        const data = await Employee.findOneAndUpdate(
          { email },
          { $push: { averageTime: avgTime } }
        );
        // console.log(data.averageTime);
        return data.averageTime;
      } catch (err) {
        console.log(err);
      }
    }
  },
};
