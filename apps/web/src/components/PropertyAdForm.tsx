import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

type AreaSuggestion = {
  placeId: string;
  mainText: string;
  secondaryText: string;
  label: string;
};

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

const FieldGroup = styled.div`
  position: relative;
  display: grid;
  gap: 8px;
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


const SuggestionsList = styled.ul`
  position: absolute;
  z-index: 10;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  max-height: 260px;
  margin: 0;
  padding: 8px;
  overflow-y: auto;
  border: 1px solid #dce4ef;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 20px 40px rgb(18 38 63 / 14%);
  list-style: none;
`;

const SuggestionButton = styled.button`
  width: 100%;
  border: 0;
  border-radius: 12px;
  padding: 12px;
  background: transparent;
  color: #172033;
  text-align: left;

  &:hover,
  &:focus {
    background: #f1f5ff;
    outline: none;
  }

  strong {
    display: block;
    color: #111827;
    font-size: 0.95rem;
  }

  span {
    display: block;
    margin-top: 4px;
    color: #667085;
    font-size: 0.85rem;
  }
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


function useDebouncedValue(value: string, delayMs: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [value, delayMs]);

  return debouncedValue;
}

export function PropertyAdForm() {
  const [areaInput, setAreaInput] = useState("");
  const [selectedArea, setSelectedArea] = useState<AreaSuggestion | null>(null);
  const [suggestions, setSuggestions] = useState<AreaSuggestion[]>([]);
  const [isLoadingAreas, setIsLoadingAreas] = useState(false);
  const [areaError, setAreaError] = useState("");

  const debouncedAreaInput = useDebouncedValue(areaInput, 300);

  const shouldSearchAreas = useMemo(() => {
    return debouncedAreaInput.trim().length >= 3 && !selectedArea;
  }, [debouncedAreaInput, selectedArea]);

  useEffect(() => {
    if (!shouldSearchAreas) {
      setSuggestions([]);
      setIsLoadingAreas(false);
      setAreaError("");
      return;
    }

    const controller = new AbortController();

    async function loadAreas() {
      setIsLoadingAreas(true);
      setAreaError("");

      try {
        const params = new URLSearchParams({
          input: debouncedAreaInput.trim()
        });

        const response = await fetch(`/api/areas?${params.toString()}`, {
          signal: controller.signal
        });

        const result = (await response.json()) as {
          data?: AreaSuggestion[];
          error?: string;
        };

        if (!response.ok) {
          throw new Error(result.error ?? "Could not load area suggestions.");
        }

        setSuggestions(result.data ?? []);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setSuggestions([]);
        setAreaError("Could not load area suggestions. Please try again.");
      } finally {
        setIsLoadingAreas(false);
      }
    }

    void loadAreas();

    return () => {
      controller.abort();
    };
  }, [debouncedAreaInput, shouldSearchAreas]);

  function handleAreaChange(value: string) {
    setAreaInput(value);
    setSelectedArea(null);
  }

  function handleAreaSelect(area: AreaSuggestion) {
    setSelectedArea(area);
    setAreaInput(area.label);
    setSuggestions([]);
    setAreaError("");
  }

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

        <FieldGroup>
          <FieldLabel id="area-field-label">Area</FieldLabel>

          <TextInput
            name="area"
            type="text"
            role="combobox"
            aria-labelledby="area-field-label"
            aria-autocomplete="list"
            aria-expanded={suggestions.length > 0}
            aria-controls="area-suggestions"
            aria-haspopup="listbox"
            value={areaInput}
            placeholder="Type at least 3 characters"
            autoComplete="off"
            onChange={(event) => handleAreaChange(event.target.value)}
          />

          {isLoadingAreas && <FieldHint>Loading area suggestions...</FieldHint>}

          {areaError && <FieldHint>{areaError}</FieldHint>}

          {selectedArea && (
            <SelectedAreaHint>Selected area: {selectedArea.label}</SelectedAreaHint>
          )}

          {!isLoadingAreas &&
            !areaError &&
            !selectedArea &&
            debouncedAreaInput.trim().length >= 3 &&
            suggestions.length === 0 && (
              <FieldHint>No area suggestions found.</FieldHint>
            )}

          {suggestions.length > 0 && (
            <SuggestionsList
              id="area-suggestions"
              role="listbox"
              aria-label="Area suggestions"
            >
              {suggestions.map((area) => (
                <li key={area.placeId} role="option" aria-selected={false}>
                  <SuggestionButton
                    type="button"
                    onClick={() => handleAreaSelect(area)}
                  >
                    <strong>{area.mainText}</strong>
                    <span>{area.secondaryText}</span>
                  </SuggestionButton>
                </li>
              ))}
            </SuggestionsList>
          )}
        </FieldGroup>

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
          <li>Area suggestions load from the backend after 3 characters.</li>
          <li>The selected area keeps the required placeId.</li>
          <li>All fields are required except extra description.</li>
          <li>Title supports up to 155 characters.</li>
          <li>Validation and persistence come next.</li>
        </ul>
      </RequirementsCard>
      <FormActions>
        <SubmitButton type="submit">Submit classified</SubmitButton>
      </FormActions>
    </Form>
  );
}