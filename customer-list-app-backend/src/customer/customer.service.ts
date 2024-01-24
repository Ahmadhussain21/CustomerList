import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose';
import { Customer } from './interfaces/customer.interface';
import { CreateCustomerDTO } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {
    constructor(@InjectModel('Customer') private readonly customerModel: Model<Customer>){}

    // fetch all customers
    async getAllCustomer(): Promise<Customer[]>{
        const customers = await this.customerModel.find().exec();
        return customers;
    }

    // get a single customer
    async getCustomer(customerID): Promise<Customer>{
        const customer = await this.customerModel.findById(customerID).exec();
        return customer;
    }

    // Add customer
    async addCustomer(createCustomerDTO: CreateCustomerDTO): Promise<Customer>{
        const newCustomer = await new this.customerModel(createCustomerDTO);
        return newCustomer.save();
    }

    // Update Customer
    async updateCustomer(customerID, createCustomerDTO:CreateCustomerDTO): Promise<Customer>{
        const updatedCustomer= await this.customerModel.findByIdAndUpdate(customerID, createCustomerDTO,{new:true});
        return updatedCustomer;
    }

    // Delete customer
    async deleteCustomer (customerID): Promise<any>{
        const deletedCustomer = await this.customerModel.findByIdAndDelete(customerID);
        return deletedCustomer;
    }
}
