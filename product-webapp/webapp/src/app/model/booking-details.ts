import { Time } from "@angular/common";

export class BookingDetails {
    bookingId!: string;
    vendorId!: string;
    customerId!:string;
    customerName!:string;
    vendorName!:string;
    slotId!:string;
    serviceName!: string;
    slotDate!: Date;
    customerAddress!: string;
    bookingStatus!: string;
    startTime!: Time;
    endTime!: Time;
    visitingCharges!: number;
}





