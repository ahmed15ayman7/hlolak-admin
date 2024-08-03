import { setLoad } from '@/lib/redux/LoadSlice';
import { installmentValidation } from '@/lib/validations/servicesSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Form, FormField, FormItem, FormMessage } from '../ui/form';
import { Button } from '../ui/button';
import { z } from 'zod';
import { UpdateService } from '@/lib/actions/service.actions';

const AddLoanAmount = ({setLoading,id}:{setLoading:any,id:string}) => {
    const dispatch = useDispatch();

    const form = useForm<z.infer<typeof installmentValidation>>({
        resolver: zodResolver(installmentValidation),
        defaultValues: {
          loan_amount: "",
          installment: "",
          duration: "",
        },
      });
      const onSubmit = async (data: z.infer<typeof installmentValidation>) => {
        setLoading(true)
        try {
            let UpdateServic= await UpdateService({serviceId:id,...data})
            setLoading(false)
            dispatch(setLoad(Math.random()));
        } catch (error) {
          console.error(error);
        }
      };
    
  return (
    <Form {...form}>
    <form
      className="simple_form p-6 pt-0 w-full rounded overflow-scroll sm:shadow-2xl"
      onSubmit={form.handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-bold text-white mb-4">اضافة موظف</h2>
      <div className="flex gap-3">
        <FormField
          control={form.control}
          name="loan_amount"
          render={({ field }) => (
            <FormItem className="grow">
              <label className="block text-gray-300">مبلغ التمويل</label>
              <input
                {...field}
                type="text"
                className="form-input w-full bg-gray-700 text-white"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="installment"
          render={({ field }) => (
            <FormItem className="grow">
              <label className="block text-gray-300">القسط</label>
              <input
                {...field}
                type="text"
                className="form-input w-full bg-gray-700 text-white"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem className="grow">
              <label className="block text-gray-300">المدة</label>
              <input
                {...field}
                type="text"
                className="form-input w-full bg-gray-700 text-white"
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <Button type="submit" className="mt-4">
        حفظ
      </Button>
    </form>
  </Form>
  )
}

export default AddLoanAmount