import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import MainSchema from "../main/schema";
import MainResolvers from "../main/resolvers";

export const typeDefs = mergeTypeDefs([MainSchema]);

export const resolvers = mergeResolvers([MainResolvers]);
