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
    /**
     * Creates booking object
     * @returns booking object
     */
    getBooking() {
        return {
            hotelId: parseInt(this.hotelId),
            userId: this.userId,
            dateCreated: new Date(),
            arrivalDate: this.arrivalDate,
            departureDate: this.departureDate
        }
    }
}