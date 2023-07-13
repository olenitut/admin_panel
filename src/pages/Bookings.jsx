import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingsTable from "../features/bookings/BookingTable";
import BookingsOperations from "../features/bookings/BookingsOperations";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import AddBookingForm from "../features/bookings/AddBookingForm";

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingsOperations />
      </Row>
      <Row>
        <Modal>
          <Modal.Open opens="booking-form">
            <Button>Add new booking</Button>
          </Modal.Open>
          <Modal.Window name="booking-form">
            <AddBookingForm />
          </Modal.Window>
        </Modal>
        <BookingsTable />
      </Row>
    </>
  );
}

export default Bookings;
