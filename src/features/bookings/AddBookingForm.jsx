import styled from "styled-components";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Switch from "react-switch";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import { StyledSelect } from "../../ui/Select";

const statusOptions = [
  { value: "unconfirmed", title: "Unconfirmed" },
  { value: "checked-out", title: "Checked-out" },
  { value: "checked-in", title: "Checked-in" },
];
// import useCreateEditCabin from "./useCreateEditCabin";

const FormRow = styled.div`
  display: grid !important;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;
  @media (max-width: 920px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.8rem 0;
  }

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }

  & .react-datepicker-wrapper {
    width: 100%;
  }

  & .react-datepicker__input-container {
    & input {
      border: 1px solid var(--color-grey-300);
      background-color: var(--color-grey-0);
      border-radius: var(--border-radius-sm);
      padding: 0.8rem 1.2rem;
      box-shadow: var(--shadow-sm);
      width: 100%;
    }
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function AddBookingForm({ editData, onClose }) {
  const { register, handleSubmit, getValues, formState, control } = useForm({
    defaultValues: editData ? editData : {},
  });
  const { errors } = formState;
  // const { isLoading, mutate } = useCreateEditCabin(editData);
  const isLoading = false;
  const onSubmit = (data) => {
    debugger;
    // mutate(
    //   {
    //     ...data,
    //     image: typeof data.image === "string" ? data.image : data.image[0],
    //   },
    //   {
    //     onSuccess: () => onClose?.(),
    //   }
    // );
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onClose ? "modal" : "regular"}
    >
      <FormRow>
        <Label htmlFor="startDate">Start Date</Label>
        <Controller
          control={control}
          name="startDate"
          rules={{ required: "This field is required" }}
          render={({ field }) => (
            <div>
              <DatePicker
                id="startDate"
                {...field}
                selected={new Date(field.value)}
                onChange={(date) => field.onChange(date)}
              />
            </div>
          )}
        />
        {errors?.startDate && <Error>{errors?.startDate.message}</Error>}
      </FormRow>
      <FormRow>
        <Label htmlFor="endDate">End Date</Label>
        <Controller
          control={control}
          name="endDate"
          rules={{ required: "This field is required" }}
          render={({ field }) => (
            <DatePicker
              id="endDate"
              {...field}
              selected={new Date(field.value)}
              onChange={(date) => field.onChange(date)}
            />
          )}
        />
        {errors?.endDate && <Error>{errors?.endDate.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="numGuests">Number of guests</Label>
        <Input
          type="number"
          id="numGuests"
          {...register("numGuests", {
            required: "This field is required",
          })}
        />
        {errors?.numGuests && <Error>{errors?.numGuests.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="status">Status</Label>

        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <StyledSelect
              id="status"
              {...field}
              selected={field.value}
              onChange={field.onChange}
            >
              {statusOptions.map((el) => (
                <option value={el.value} key={el.value}>
                  {el.title}
                </option>
              ))}
            </StyledSelect>
          )}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="isPaid">Is paid</Label>
        <Controller
          control={control}
          name="isPaid"
          render={({ field }) => (
            <Switch
              offColor="#6b7280"
              onColor="#15803d"
              onChange={field.onChange}
              checked={field.value}
              id="isPaid"
              {...field}
            />
          )}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="cabinId">Cabin Id</Label>

        <Input
          type="number"
          id="cabinId"
          {...register("cabinId", {
            required: "This field is required",
          })}
        />
        {errors?.cabinId && <Error>{errors?.cabinId.message}</Error>}
      </FormRow>
      <FormRow>
        <Label htmlFor="guestId">Guest Id</Label>

        <Input
          type="number"
          id="guestId"
          {...register("guestId", {
            required: "This field is required",
          })}
        />
        {errors?.guestId && <Error>{errors?.guestId.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="hasBreakfast">Breakfast included</Label>
        <Controller
          control={control}
          name="hasBreakfast"
          render={({ field }) => (
            <Switch
              offColor="#6b7280"
              onColor="#15803d"
              onChange={field.onChange}
              checked={field.value}
              id="hasBreakfast"
              {...field}
            />
          )}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="observations">Additional info</Label>
        <Textarea
          id="observations"
          defaultValue=""
          {...register("observations")}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" onClick={() => onClose?.()}>
          Cancel
        </Button>
        {!editData && (
          <Button disabled={isLoading}>
            {isLoading ? "Creating... " : `Add cabin`}
          </Button>
        )}
        {editData && (
          <Button disabled={isLoading}>
            {isLoading ? "Creating... " : `Edit cabin`}
          </Button>
        )}
      </FormRow>
    </Form>
  );
}

export default AddBookingForm;
