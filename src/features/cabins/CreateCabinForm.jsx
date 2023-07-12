import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import useCreateEditCabin from "./useCreateEditCabin";
import Heading from "../../ui/Heading";

const FormRow = styled.div`
  display: grid;
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
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ coords = "", editData, onClose }) {
  const { register, handleSubmit, getValues, formState } = useForm({
    defaultValues: editData ? editData : {},
  });
  const { errors } = formState;
  const { isLoading, mutate } = useCreateEditCabin(editData);
  const onSubmit = (data) => {
    mutate(
      {
        ...data,
        image: typeof data.image === "string" ? data.image : data.image[0],
      },
      {
        onSuccess: () => onClose?.(),
      }
    );
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onClose ? "modal" : "regular"}
    >
      <Heading as="h3">Add Cabin</Heading>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          defaultValue={name}
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
        />
        {errors?.name && <Error>{errors?.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be at least 1" },
          })}
        />
        {errors?.maxCapacity && <Error>{errors?.maxCapacity.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", { required: "This field is required" })}
        />
        {errors?.regularPrice && <Error>{errors?.regularPrice.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) => {
              value < getValues().regularPrice ||
                "The discount should be less than the price";
            },
          })}
        />
        {errors?.discount && <Error>{errors?.discount.message}</Error>}
      </FormRow>
      <FormRow>
        <Label htmlFor="position">Position</Label>

        <Input
          defaultValue={coords}
          type="text"
          id="position"
          {...register("position", {
            required: "This field is required",
          })}
        />
        {errors?.position ? (
          <Error>{errors?.position.message}</Error>
        ) : (
          <p>{`Eg. "50.2575,-3.5555"`}</p>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
        {errors?.description && <Error>{errors?.description.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: editData ? false : "This field is required",
          })}
        />
        {errors?.image && <Error>{errors?.image.message}</Error>}
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

export default CreateCabinForm;
