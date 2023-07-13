import { countNumNights, getToday } from "../utils/helpers";
import { getCabin } from "./apiCabins";
import { getSettings } from "./apiSettings";
import supabase from "./supabaseClient";

export const getBookings = async () => {
  const { data, error } = await supabase
    .from("bookings")
    .select(`*, cabins(name), guests(fullName,email)`);
  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }
  return data;
};

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}

export const updateBooking = async (booking) => {
  const bookingData = await prepareBooking(booking);

  delete bookingData.guests;
  delete bookingData.cabins;

  const { data, error } = await supabase
    .from("bookings")
    .update(bookingData)
    .eq("id", bookingData.id)
    .select();

  if (error) {
    console.log(error);
    throw new Error(`Booking could not be updated`);
  }

  return data;
};

export async function createBooking(bookingData) {
  const booking = await prepareBooking(bookingData);

  const { data, error } = await supabase
    .from("bookings")
    .insert([{ ...booking }])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be added");
  }
  return data;
}

const prepareBooking = async (bookingData) => {
  bookingData.numNights = countNumNights(
    bookingData.startDate,
    bookingData.endDate
  );
  const { regularPrice: cabinPrice } = await getCabin(bookingData.cabinId);
  bookingData.cabinPrice = cabinPrice * bookingData.numNights;
  let extrasPrice = 0;

  if (bookingData.hasBreakfast) {
    const { breakfastPrice } = await getSettings();
    extrasPrice = breakfastPrice * bookingData.numNights;
  }

  bookingData.extrasPrice = extrasPrice;
  bookingData.totalPrice = extrasPrice + bookingData.cabinPrice;

  return bookingData;
};
