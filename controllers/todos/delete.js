import {FILE_PATH} from '../../config.js';

// @ts-ignore
export default async({response,params})=>{

    const decoder=new TextDecoder();
    const encoder=new TextEncoder();

    try {

        const data=await Deno.readFile(FILE_PATH);
        const todos=JSON.parse(decoder.decode(data));

        const updatedTodos=todos.filter((todo)=>todo.id!=Number(params.id));

        await Deno.writeFile(FILE_PATH,encoder.encode(JSON.stringify(updatedTodos)));

        response.status=200;
        response.body={status:'Success',data: updatedTodos};

        console.log(params);

    } catch (error) {
        response.status=502;
        response.body={status:'Failed to delete',data: error};
    }

}