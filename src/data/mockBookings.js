export const mockBookings = [
    { id: "BK001", visitor: "Rahul Sharma", email: "rahul@email.com", date: "2026-03-10", timeSlot: "10:00 AM - 11:30 AM", category: "Adult", quantity: 2, total: 600, status: "Confirmed", paymentId: "PAY001", bookedOn: "2026-03-05" },
    { id: "BK002", visitor: "Sarah Johnson", email: "sarah@email.com", date: "2026-03-10", timeSlot: "11:30 AM - 1:00 PM", category: "Foreign National", quantity: 3, total: 1950, status: "Confirmed", paymentId: "PAY002", bookedOn: "2026-03-04" },
    { id: "BK003", visitor: "Amit Patel", email: "amit@email.com", date: "2026-03-11", timeSlot: "2:30 PM - 4:00 PM", category: "Student", quantity: 5, total: 750, status: "Confirmed", paymentId: "PAY003", bookedOn: "2026-03-04" },
    { id: "BK004", visitor: "Priya Singh", email: "priya@email.com", date: "2026-03-11", timeSlot: "10:00 AM - 11:30 AM", category: "Adult", quantity: 1, total: 300, status: "Pending", paymentId: null, bookedOn: "2026-03-05" },
    { id: "BK005", visitor: "Chen Wei", email: "chen@email.com", date: "2026-03-12", timeSlot: "4:00 PM - 5:30 PM", category: "Foreign National", quantity: 2, total: 1300, status: "Confirmed", paymentId: "PAY005", bookedOn: "2026-03-03" },
    { id: "BK006", visitor: "Fatima Khan", email: "fatima@email.com", date: "2026-03-12", timeSlot: "1:00 PM - 2:30 PM", category: "Senior Citizen", quantity: 2, total: 300, status: "Cancelled", paymentId: "PAY006", bookedOn: "2026-03-02" },
    { id: "BK007", visitor: "Ravi Kumar", email: "ravi@email.com", date: "2026-03-13", timeSlot: "11:30 AM - 1:00 PM", category: "Child", quantity: 4, total: 400, status: "Confirmed", paymentId: "PAY007", bookedOn: "2026-03-05" },
    { id: "BK008", visitor: "Elena Rodriguez", email: "elena@email.com", date: "2026-03-13", timeSlot: "2:30 PM - 4:00 PM", category: "Adult", quantity: 2, total: 600, status: "Confirmed", paymentId: "PAY008", bookedOn: "2026-03-04" },
    { id: "BK009", visitor: "Sunita Devi", email: "sunita@email.com", date: "2026-03-14", timeSlot: "10:00 AM - 11:30 AM", category: "Senior Citizen", quantity: 1, total: 150, status: "Pending", paymentId: null, bookedOn: "2026-03-05" },
    { id: "BK010", visitor: "John Smith", email: "john@email.com", date: "2026-03-14", timeSlot: "5:30 PM - 7:00 PM", category: "Foreign National", quantity: 4, total: 2600, status: "Confirmed", paymentId: "PAY010", bookedOn: "2026-03-03" },
    { id: "BK011", visitor: "Meera Nair", email: "meera@email.com", date: "2026-03-15", timeSlot: "10:00 AM - 11:30 AM", category: "Adult", quantity: 3, total: 900, status: "Confirmed", paymentId: "PAY011", bookedOn: "2026-03-05" },
    { id: "BK012", visitor: "David Brown", email: "david@email.com", date: "2026-03-15", timeSlot: "4:00 PM - 5:30 PM", category: "Foreign National", quantity: 1, total: 650, status: "Confirmed", paymentId: "PAY012", bookedOn: "2026-03-04" },
];

export const mockPayments = [
    { id: "PAY001", bookingId: "BK001", amount: 600, method: "UPI", status: "Success", date: "2026-03-05", time: "10:23 AM" },
    { id: "PAY002", bookingId: "BK002", amount: 1950, method: "Card", status: "Success", date: "2026-03-04", time: "2:15 PM" },
    { id: "PAY003", bookingId: "BK003", amount: 750, method: "UPI", status: "Success", date: "2026-03-04", time: "5:42 PM" },
    { id: "PAY005", bookingId: "BK005", amount: 1300, method: "Net Banking", status: "Success", date: "2026-03-03", time: "11:08 AM" },
    { id: "PAY006", bookingId: "BK006", amount: 300, method: "UPI", status: "Refunded", date: "2026-03-02", time: "3:30 PM" },
    { id: "PAY007", bookingId: "BK007", amount: 400, method: "Card", status: "Success", date: "2026-03-05", time: "9:55 AM" },
    { id: "PAY008", bookingId: "BK008", amount: 600, method: "UPI", status: "Success", date: "2026-03-04", time: "12:10 PM" },
    { id: "PAY010", bookingId: "BK010", amount: 2600, method: "Card", status: "Success", date: "2026-03-03", time: "4:45 PM" },
    { id: "PAY011", bookingId: "BK011", amount: 900, method: "Net Banking", status: "Success", date: "2026-03-05", time: "8:30 AM" },
    { id: "PAY012", bookingId: "BK012", amount: 650, method: "UPI", status: "Success", date: "2026-03-04", time: "6:00 PM" },
];

export const slotAvailability = {
    "2026-03-10": { slot1: 142, slot2: 89, slot3: 120, slot4: 180, slot5: 165, slot6: 130 },
    "2026-03-11": { slot1: 55, slot2: 178, slot3: 95, slot4: 112, slot5: 198, slot6: 145 },
    "2026-03-12": { slot1: 200, slot2: 156, slot3: 30, slot4: 88, slot5: 167, slot6: 50 },
    "2026-03-13": { slot1: 190, slot2: 100, slot3: 140, slot4: 75, slot5: 185, slot6: 120 },
    "2026-03-14": { slot1: 60, slot2: 145, slot3: 110, slot4: 195, slot5: 170, slot6: 15 },
    "2026-03-15": { slot1: 10, slot2: 88, slot3: 130, slot4: 160, slot5: 45, slot6: 90 },
};
