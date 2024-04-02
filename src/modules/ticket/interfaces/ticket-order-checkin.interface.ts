
export interface TicketOrderCheckinServiceInterface {
    /** 
     * add checkin record when scan qr code
     */
    addCheckinRecord(idOrder: string, idItem: string): Promise<any>;
    /** 
     * get checkin records
     */
    getCheckinRecords(idOrder: string): Promise<any>;

}