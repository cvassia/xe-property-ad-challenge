import { useEffect, useMemo, useRef, useState } from "react";
import type React from "react";
import styled from "styled-components";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import {
  propertyAdSchema,
  type PropertyAdFormValues
} from "../validation/propertyAdSchema";

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
  display: grid;
  gap: 8px;
`;

const AutocompleteWrapper = styled.div`
  position: relative;
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

const FieldErrorHint = styled.span`
  color: #b42318;
  font-size: 0.85rem;
`;

const FieldMessageArea = styled.div`
  min-height: 20px;
  display: flex;
  align-items: center;
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

const SuggestionButton = styled.button<{ $active?: boolean }>`
  width: 100%;
  border: 0;
  border-radius: 12px;
  padding: 12px;
  background: ${({ $active }) => ($active ? "#f1f5ff" : "transparent")};
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
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [areaValidationError, setAreaValidationError] = useState("");


  const autocompleteRef = useRef<HTMLDivElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PropertyAdFormValues>({
    resolver: yupResolver(propertyAdSchema),
    mode: "onSubmit",
    defaultValues: {
      title: "",
      type: "",
      price: undefined,
      description: ""
    }
  });

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
        setActiveSuggestionIndex(-1);

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
    setActiveSuggestionIndex(-1);
  }

  function handleAreaSelect(area: AreaSuggestion) {
    setSelectedArea(area);
    setAreaInput(area.label);
    setSuggestions([]);
    setAreaError("");
    setActiveSuggestionIndex(-1);
  }

  function handleAreaKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (suggestions.length === 0) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();

      setActiveSuggestionIndex((currentIndex) => {
        if (currentIndex >= suggestions.length - 1) {
          return 0;
        }

        return currentIndex + 1;
      });
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      setActiveSuggestionIndex((currentIndex) => {
        if (currentIndex <= 0) {
          return suggestions.length - 1;
        }

        return currentIndex - 1;
      });
    }

    if (event.key === "Enter" && activeSuggestionIndex >= 0) {
      event.preventDefault();
      handleAreaSelect(suggestions[activeSuggestionIndex]);
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setSuggestions([]);
      setActiveSuggestionIndex(-1);
    }
  }

  useEffect(() => {
    function handleDocumentMouseDown(event: MouseEvent) {
      if (!autocompleteRef.current) {
        return;
      }

      if (!autocompleteRef.current.contains(event.target as Node)) {
        setSuggestions([]);
        setActiveSuggestionIndex(-1);
      }
    }

    document.addEventListener("mousedown", handleDocumentMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleDocumentMouseDown);
    };
  }, []);

  function onSubmit(values: PropertyAdFormValues) {
    if (!selectedArea) {
      if (areaInput.trim().length >= 3 && suggestions.length === 0) {
        setAreaValidationError("");
        return;
      }

      setAreaValidationError("Please select an area from the suggestions.");
      return;
    }

    const payload = {
      ...values,
      area: {
        placeId: selectedArea.placeId,
        mainText: selectedArea.mainText,
        secondaryText: selectedArea.secondaryText
      }
    };

    console.info("Validated property ad payload:", payload);
  }

  return (
    <Form
      aria-label="Create property classified form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <FormGrid>
        <Field>
          <FieldLabel>Title</FieldLabel>
          <TextInput
            type="text"
            maxLength={155}
            placeholder="Classified title up to 155 characters"
            autoComplete="off"
            aria-invalid={Boolean(errors.title)}
            {...register("title")}
          />
          <FieldMessageArea>
            {errors.title && (
              <FieldErrorHint>{errors.title.message}</FieldErrorHint>
            )}
          </FieldMessageArea>
        </Field>

        <Field>
          <FieldLabel>Type</FieldLabel>
          <SelectInput
            defaultValue=""
            aria-invalid={Boolean(errors.type)}
            {...register("type")}
          >
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
          <FieldMessageArea>
            {errors.type && (
              <FieldErrorHint>{errors.type.message}</FieldErrorHint>
            )}
          </FieldMessageArea>
        </Field>

        <FieldGroup>
          <FieldLabel id="area-field-label">Area</FieldLabel>

          <AutocompleteWrapper ref={autocompleteRef}>
            <TextInput
              name="area"
              type="text"
              role="combobox"
              aria-labelledby="area-field-label"
              aria-autocomplete="list"
              aria-expanded={suggestions.length > 0}
              aria-controls="area-suggestions"
              aria-activedescendant={
                activeSuggestionIndex >= 0
                  ? `area-suggestion-${suggestions[activeSuggestionIndex].placeId}`
                  : undefined
              }
              aria-haspopup="listbox"
              value={areaInput}
              placeholder="Type at least 3 characters"
              autoComplete="off"
              onChange={(event) => handleAreaChange(event.target.value)}
              onKeyDown={handleAreaKeyDown}
              aria-invalid={Boolean(areaValidationError)}
            />

            {suggestions.length > 0 && (
              <SuggestionsList
                id="area-suggestions"
                role="listbox"
                aria-label="Area suggestions"
              >
                {suggestions.map((area, index) => {
                  const isActive = index === activeSuggestionIndex;

                  return (
                    <li
                      id={`area-suggestion-${area.placeId}`}
                      key={area.placeId}
                      role="option"
                      aria-selected={isActive}
                    >
                      <SuggestionButton
                        type="button"
                        $active={isActive}
                        onMouseEnter={() => setActiveSuggestionIndex(index)}
                        onClick={() => handleAreaSelect(area)}
                      >
                        <strong>{area.mainText}</strong>
                        <span>{area.secondaryText}</span>
                      </SuggestionButton>
                    </li>
                  );
                })}
              </SuggestionsList>
            )}
          </AutocompleteWrapper>

          <FieldMessageArea>
            {isLoadingAreas ? (
              <FieldHint>Loading area suggestions...</FieldHint>
            ) : areaError ? (
              <FieldErrorHint>{areaError}</FieldErrorHint>
            ) : !selectedArea &&
              debouncedAreaInput.trim().length >= 3 &&
              suggestions.length === 0 ? (
              <FieldErrorHint>No area suggestions found.</FieldErrorHint>
            ) : areaValidationError ? (
              <FieldErrorHint>{areaValidationError}</FieldErrorHint>
            ) : null}
          </FieldMessageArea>
        </FieldGroup>

        <Field>
          <FieldLabel>Price in Euros</FieldLabel>
          <TextInput
            type="number"
            min="0"
            step="1"
            placeholder="Amount"
            inputMode="numeric"
            aria-invalid={Boolean(errors.price)}
            {...register("price", { valueAsNumber: true })}
          />
          <FieldMessageArea>
            {errors.description && (
              <FieldErrorHint>{errors.description.message}</FieldErrorHint>
            )}
          </FieldMessageArea>
        </Field>

        <Field $full>
          <FieldLabel>Extra description</FieldLabel>
          <TextArea
            rows={5}
            placeholder="Type here"
            aria-invalid={Boolean(errors.description)}
            {...register("description")}
          />
          <FieldMessageArea>
            {errors.description && (
              <FieldErrorHint>{errors.description.message}</FieldErrorHint>
            )}
          </FieldMessageArea>
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