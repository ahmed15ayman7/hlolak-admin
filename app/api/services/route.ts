import { assignEmployeeToService } from '@/lib/actions/service.actions';
import Service from '@/lib/models/service.models';
import User from '@/lib/models/user.models';
import { connectDB } from '@/mongoose';
import { NextResponse } from 'next/server';



export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const service = await Service.create({
      name: body.name,
      mobile: body.mobile,
      employer: body.employer,
      employee: body.employee,
      salary: body.salary,
      provided_service_type: body.provided_service_type,
      has_debts: body.has_debts,
    });
    const service1 = await Service.findById(service?._id);
    if (!service1) {
      console.error("Service not found!");
    }
    if (service1.state === "done") {
      await Service.findByIdAndUpdate(service1?._id, { state: "pending" });
    }
    const employee = await User.findById(body.user._id);
    await employee.services.push(service1?._id);
    await service1.employee.push(body.user._id);
    await service1.save();
    await employee.save();
    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json({ message: 'Failed to create service' }, { status: 500 });
  }
}
