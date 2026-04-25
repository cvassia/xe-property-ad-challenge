import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "styled-components";
const propertyTypes = [
    { value: "", label: "Select type" },
    { value: "rent", label: "Rent" },
    { value: "buy", label: "Buy" },
    { value: "exchange", label: "Exchange" },
    { value: "donation", label: "Donation" }
];
const Form = styled.form `
  display: grid;
  gap: 28px;
`;
const FormGrid = styled.div `
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;
const Field = styled.label `
  display: grid;
  gap: 8px;
  grid-column: ${({ $full }) => ($full ? "1 / -1" : "auto")};
`;
const FieldLabel = styled.span `
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
const TextInput = styled.input `
  ${inputStyles}
  min-height: 52px;
  padding: 0 14px;
`;
const SelectInput = styled.select `
  ${inputStyles}
  min-height: 52px;
  padding: 0 14px;
`;
const TextArea = styled.textarea `
  ${inputStyles}
  resize: vertical;
  padding: 14px;
`;
const FieldHint = styled.span `
  color: #667085;
  font-size: 0.85rem;
`;
const RequirementsCard = styled.aside `
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
const FormActions = styled.div `
  display: flex;
  justify-content: flex-end;
`;
const SubmitButton = styled.button `
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
    return (_jsxs(Form, { "aria-label": "Create property classified form", children: [_jsxs(FormGrid, { children: [_jsxs(Field, { children: [_jsx(FieldLabel, { children: "Title" }), _jsx(TextInput, { name: "title", type: "text", maxLength: 155, placeholder: "Classified title up to 155 characters", autoComplete: "off" })] }), _jsxs(Field, { children: [_jsx(FieldLabel, { children: "Type" }), _jsx(SelectInput, { name: "type", defaultValue: "", children: propertyTypes.map((type) => (_jsx("option", { value: type.value, disabled: type.value === "", children: type.label }, type.value))) })] }), _jsxs(Field, { children: [_jsx(FieldLabel, { children: "Area" }), _jsx(TextInput, { name: "area", type: "text", placeholder: "Type at least 3 characters", autoComplete: "off" }), _jsx(FieldHint, { children: "Autocomplete suggestions will appear here." })] }), _jsxs(Field, { children: [_jsx(FieldLabel, { children: "Price in Euros" }), _jsx(TextInput, { name: "price", type: "number", min: "0", step: "1", placeholder: "Amount", inputMode: "numeric" })] }), _jsxs(Field, { "$full": true, children: [_jsx(FieldLabel, { children: "Extra description" }), _jsx(TextArea, { name: "description", rows: 5, placeholder: "Type here" })] })] }), _jsxs(RequirementsCard, { "aria-label": "Form requirements", children: [_jsx("h2", { children: "Requirements covered" }), _jsxs("ul", { children: [_jsx("li", { children: "All fields are required except extra description." }), _jsx("li", { children: "Title supports up to 155 characters." }), _jsx("li", { children: "Type supports Rent, Buy, Exchange, and Donation." }), _jsx("li", { children: "Price accepts numeric values." }), _jsx("li", { children: "Area autocomplete integration comes next." })] })] }), _jsx(FormActions, { children: _jsx(SubmitButton, { type: "submit", children: "Submit classified" }) })] }));
}
