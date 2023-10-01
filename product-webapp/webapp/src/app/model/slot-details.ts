import { Time } from "@angular/common";

export class SlotDetails {
    slotId!: String;
    vendorId!: String;
    vendorName!: String;
    slotDate!: any;
    slotStatus!: String;
    serviceName!: String;
    startTime!: Time;
    endTime!: Time;
    vendorLocation!: String;
    visitingCharges!: number;
}
