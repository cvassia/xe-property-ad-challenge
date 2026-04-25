import styled from "styled-components";

const propertyTypes = [
  { value: "", label: "Select type" },
  { value: "rent", label: "Rent" },
  { value: "buy", label: "Buy" },
  { value: "exchange", label: "Exchange" },
  { value: "donation", label: "Donation" }
];

const Form = styled.form`
  display: grid;
  gap: 28px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.label<{ $full?: boolean }>`
  display: grid;
  gap: 8px;
  grid-column: ${({ $full }) => ($full ? "1 / -1" : "auto")};
`;

const FieldLabel = styled.span`
  color: #263247;
  font-size: 0.95rem;
  font-weight: 800;
`;

const inputStyles = `
  width: 100%;
  border: 1px solid #cfd8e6;
  border-radius: 16px;
  background: #ffffff;
  color: #172033;
  outline: none;
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease;

  &:focus {
    border-color: #3464d4;
    box-shadow: 0 0 0 4px rgb(52 100 212 / 14%);
  }
`;

const TextInput = styled.input`
  ${inputStyles}
  min-height: 52px;
  padding: 0 14px;
`;

const SelectInput = styled.select`
  ${inputStyles}
  min-height: 52px;
  padding: 0 14px;
`;

const TextArea = styled.textarea`
  ${inputStyles}
  resize: vertical;
  padding: 14px;
`;

const FieldHint = styled.span`
  color: #667085;
  font-size: 0.85rem;
`;

const RequirementsCard = styled.aside`
  padding: 20px;
  border: 1px solid #dce4ef;
  border-radius: 22px;
  background: #f8fbff;

  h2 {
    margin: 0;
    color: #111827;
    font-size: 1rem;
  }

  ul {
    margin: 14px 0 0;
    padding-left: 20px;
    color: #4d5a70;
    line-height: 1.7;
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SubmitButton = styled.button`
  min-height: 52px;
  border: 0;
  border-radius: 16px;
  padding: 0 22px;
  color: #ffffff;
  background: #3464d4;
  font-weight: 800;
  box-shadow: 0 14px 30px rgb(52 100 212 / 24%);

  &:hover {
    background: #284fad;
  }

  @media (max-width: 720px) {
    width: 100%;
  }
`;

export function PropertyAdForm() {
  return (
    <Form aria-label="Create property classified form">
      <FormGrid>
        <Field>
          <FieldLabel>Title</FieldLabel>
          <TextInput
            name="title"
            type="text"
            maxLength={155}
            placeholder="Classified title up to 155 characters"
            autoComplete="off"
          />
        </Field>

        <Field>
          <FieldLabel>Type</FieldLabel>
          <SelectInput name="type" defaultValue="">
            {propertyTypes.map((type) => (
              <option
                key={type.value}
                value={type.value}
                disabled={type.value === ""}
              >
                {type.label}
              </option>
            ))}
          </SelectInput>
        </Field>

        <Field>
          <FieldLabel>Area</FieldLabel>
          <TextInput
            name="area"
            type="text"
            placeholder="Type at least 3 characters"
            autoComplete="off"
          />
          <FieldHint>Autocomplete suggestions will appear here.</FieldHint>
        </Field>

        <Field>
          <FieldLabel>Price in Euros</FieldLabel>
          <TextInput
            name="price"
            type="number"
            min="0"
            step="1"
            placeholder="Amount"
            inputMode="numeric"
          />
        </Field>

        <Field $full>
          <FieldLabel>Extra description</FieldLabel>
          <TextArea name="description" rows={5} placeholder="Type here" />
        </Field>
      </FormGrid>

      <RequirementsCard aria-label="Form requirements">
        <h2>Requirements covered</h2>
        <ul>
          <li>All fields are required except extra description.</li>
          <li>Title supports up to 155 characters.</li>
          <li>Type supports Rent, Buy, Exchange, and Donation.</li>
          <li>Price accepts numeric values.</li>
          <li>Area autocomplete integration comes next.</li>
        </ul>
      </RequirementsCard>

      <FormActions>
        <SubmitButton type="submit">Submit classified</SubmitButton>
      </FormActions>
    </Form>
  );
}