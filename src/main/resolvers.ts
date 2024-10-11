import { isEmpty, get, forEach } from "lodash";
import { Stream } from "@elysiajs/stream";

interface DummyData {
  id: number;
  name: string;
  age: number;
}

const dummyData: DummyData[] = [
  { id: 1, name: "John", age: 28 },
  { id: 2, name: "Jane", age: 25 },
  { id: 3, name: "Sam", age: 30 },
];

interface SuccessResponse {
  success: true;
  data: DummyData[]; // Use DummyData type here
}

interface ErrorResponse {
  success: false;
  message: string;
}

type Response = SuccessResponse | ErrorResponse | string;

export default {
  Query: {
    hello: async (): Promise<Response> => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if the array is empty using lodash `isEmpty`
      if (isEmpty(dummyData)) {
        return "No data available";
      }

      // Create a new array to store the processed data
      const processedData: DummyData[] = [];

      // Use lodash `forEach` to loop through each item in dummyData
      forEach(dummyData, (item: DummyData) => {
        // Specify the type here
        // Use lodash `get` to safely retrieve the name and age of each item
        const name = get(item, "name", "Unknown Name") as string;
        const age = get(item, "age", "Unknown Age") as number;

        // Add the processed data to the new array
        processedData.push({
          id: get(item, "id") as number,
          name,
          age,
        });
      });

      // Return the processed data
      return {
        success: true,
        data: processedData,
      };
    },
    streamPeople: async (): Promise<Stream<Response>> => {
      return new Stream(async (stream) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (isEmpty(dummyData)) {
          stream.send({ success: false, message: "No data available" });
          stream.close();
          return;
        }

        forEach(dummyData, (item: DummyData) => {
          const name = get(item, "name", "Unknown Name") as string;
          const age = get(item, "age", "Unknown Age") as number;

          console.log(name, "name");
          console.log(age, "age");

          stream.send({
            success: true,
            data: [{ id: item.id, name, age }],
          });

          // Simulate delay
          stream.wait(500);
        });

        console.log("worked");
        stream.close();

        return {
          success: true,
          message: "Stream closed",
        };
      });
    },
  },
};
