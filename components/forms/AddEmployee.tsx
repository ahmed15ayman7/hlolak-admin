// import React from 'react'
// import { Form } from '../ui/form'

// export const AddEmployee = () => {
//   return (
//     <Form {...form}>
//           <form
//             className="simple_form p-6 pt-0 bg-white rounded overflow-scroll sm:shadow-2xl"
//             onSubmit={form.handleSubmit(onsubmit)}>
//             <h2 className="text-2xl font-bold text-white mb-4">Add Employee</h2>

//             <FormField
//               control={form.control}
//               name="_id"
//               render={({ field }) => (
//                 <FormItem>
//                   <Select
//                     name={field.name}
//                     disabled={field.disabled}
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}>
//                     <SelectTrigger className="w-full">
//                       <SelectValue placeholder="  Select Employee " />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectGroup>
//                         <SelectLabel> Select Employee </SelectLabel>
//                         {employees?.map((employee, i) => (
//                           <SelectItem key={i} value={employee._id}>
//                             {employee.name}
//                           </SelectItem>
//                         ))}
//                       </SelectGroup>
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <Button
//               type="submit"
//               className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 transition duration-300 w-full md:w-auto">
//               Add
//             </Button>
//           </form>
//         </Form>
//   )
// }
