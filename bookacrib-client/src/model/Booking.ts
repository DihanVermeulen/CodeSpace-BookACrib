export class Booking {
    private hotelId: any;
    private userId: any;
    private arrivalDate: any;
    private departureDate: any;

    constructor(hotelId: any, userId: any, arrivalDate: any, departureDate: any) {
        this.hotelId = hotelId;
        this.userId = userId;
        this.arrivalDate = arrivalDate;
        this.departureDate = departureDate;
    }

    getBooking() {
        return {
            hotelId: this.hotelId,
            userId: this.userId,
            dateCreated: new Date(),
            arrivalDate: this.arrivalDate,
            departureDate: this.departureDate
        }
    }
}