import mongoSingleton from "./mongoSingleton.js";

const mongoFirstInstance = mongoSingleton.getInstance();

const mongoSecondInstance = mongoSingleton.getInstance();