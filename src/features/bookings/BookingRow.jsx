import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import { HiOutlineExternalLink, HiPencil, HiTrash } from "react-icons/hi";
import ConfirmDelete from "../../ui/ConfirmDelete";
import AddBookingForm from "./AddBookingForm";
import useDeleteBooking from "./useDeleteBooking";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";

  @media (max-width: 920px) {
    font-size: 0.8rem;
  }
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;

    @media (max-width: 920px) {
      font-size: 0.7rem;
    }
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({ booking }) {
  const {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  } = booking;
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const navigate = useNavigate();
  const { isLoading, mutate } = useDeleteBooking();

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={bookingId} />

            <Menus.List id={bookingId}>
              <Modal.Open opens="create-cabin">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete-cabin">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
              <Modal.Open
                opens="see-detail"
                onClick={() => navigate(`/bookings/${bookingId}`)}
              >
                <Menus.Button icon={<HiOutlineExternalLink />}>
                  See Detail
                </Menus.Button>
              </Modal.Open>
            </Menus.List>
            <Modal.Window name="create-cabin">
              <AddBookingForm editData={booking} />
            </Modal.Window>
            <Modal.Window name="delete-cabin">
              <ConfirmDelete
                onConfirm={() => mutate(bookingId)}
                disabled={isLoading}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default BookingRow;
