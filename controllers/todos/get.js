import {FILE_PATH} from '../../config.js';

// @ts-ignore
export default async ({ response }) => {

    const decoder = new TextDecoder();
  
    try {
      const data = await Deno.readFile(FILE_PATH);
      let todos = [];
      try {

          todos = JSON.parse(decoder.decode(data));
         
      } catch(e) {
          // invalid JSON, most likely empty file
          console.log(e);
          
      }
  
   ///   console.log(data);
  
      response.status = 200;
      response.body = { status: "success", todos };
      console.log(todos);
      
    } catch (error) {
      response.status = 500;
      response.body = { status: "failed", todos: [] };
    }
  };