const bookings = [
  {
    bookingId: 1,
    roomId: 101,
    email: "example1@email.com",
    status: "pending",
    reason: "Vacation",
    start: new Date("2024-10-01"),
    end: new Date("2024-10-05"),
    notes: "Need early check-in",
    timestamp: new Date(),
  },
  {
    bookingId: 2,
    roomId: 202,
    email: "example2@email.com",
    status: "confirmed",
    reason: "Conference",
    start: new Date("2024-10-10"),
    end: new Date("2024-10-12"),
    notes: "Late checkout requested",
    timestamp: new Date(),
  },
  {
    bookingId: 3,
    roomId: 303,
    email: "example3@email.com",
    status: "cancelled",
    reason: "Personal",
    start: new Date("2024-11-01"),
    end: new Date("2024-11-03"),
    notes: "Cancelled due to illness",
    timestamp: new Date(),
  },
];

export default function AdminBooking() {
  return (
    <div className="w-full">
      <table className="table-auto border-collapse w-full text-left">
        <thead>
          <tr className="bg-blue-400 text-white">
            <th className="px-4 py-2">Booking ID</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Start Date</th>
            <th className="px-4 py-2">End Date</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Reason</th>
          </tr>
        </thead>
        <tbody>
          {
            bookings.map(


            (booking , index)=>{
              
              console.log(index)
              return(
                <tr key={index}>
                  <td>
                    {booking.bookingId}
                  </td>
                  <td>
                    {booking.email}
                  </td>
                  <td>
                    {booking.start.toDateString
                    ()}
                  </td>
                  <td>
                    {booking.end.toDateString()}
                  </td>
                  <td>
                    {booking.status}
                  </td>
                  <td>
                    {booking.reason}
                  </td>                
                </tr>
              )              
            }
          )
          }
        </tbody>
      </table>
    </div>
  );
}
