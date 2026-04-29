import { useEffect, useMemo, useRef, useState } from "react";
import type React from "react";
import styled from "styled-components";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

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

type CreatedAd = {
  id: string;
  title: string;
  type: string;
  price: number;
  description: string | null;
  area: {
    placeId: string;
    mainText: string;
    secondaryText: string;
  };
  createdAt: string;
};

type CreateAdResponse = {
  data?: CreatedAd;
  error?: string;
  details?: string[];
};

const propertyTypes = [
  { value: "", label: "Select type" },
  { value: "rent", label: "Rent" },
  { value: "buy", label: "Buy" },
  { value: "auction", label: "Auction" },
  { value: "exchange", label: "Exchange" },
];

const propertyCategories = [
  { value: "", label: "Select property category" },
  { value: "apartment", label: "Apartment" },
  { value: "detached_house", label: "Detached house" },
  { value: "maisonette", label: "Maisonette" },
  { value: "commercial_building", label: "Commercial building" },
  { value: "plot", label: "Plot" },
  { value: "land", label: "Land" },
  { value: "shop", label: "Shop" },
  { value: "apartment_building", label: "Apartment building" },
  { value: "office", label: "Office" },
  { value: "hall", label: "Hall" },
  { value: "warehouse", label: "Warehouse" },
  { value: "industrial_space", label: "Industrial space" },
  { value: "craft_space", label: "Craft space" },
  { value: "parking", label: "Parking" },
  { value: "villa", label: "Villa" },
  { value: "island", label: "Island" },
  { value: "air_residence", label: "Air residence" },
  { value: "residential_complex", label: "Residential complex" },
  { value: "bungalow", label: "Bungalow" },
  { value: "farm_ranch", label: "Farm / ranch" }
];

const apartmentTypes = [
  { value: "", label: "Select apartment type" },
  { value: "standard", label: "Standard apartment" },
  { value: "studio", label: "Studio" },
  { value: "loft", label: "Loft" },
  { value: "penthouse", label: "Penthouse" }
];

const energyClasses = [
  { value: "", label: "Select energy class" },
  { value: "A+", label: "A+" },
  { value: "A", label: "A" },
  { value: "B+", label: "B+" },
  { value: "B", label: "B" },
  { value: "C", label: "C" },
  { value: "D", label: "D" },
  { value: "E", label: "E" },
  { value: "F", label: "F" },
  { value: "G", label: "G" },
  { value: "excluded", label: "Excluded" }
];

const floorOptions = [
  { value: "", label: "Select floor" },
  { value: "basement", label: "Basement" },
  { value: "ground", label: "Ground floor" },
  { value: "1", label: "1st floor" },
  { value: "2", label: "2nd floor" },
  { value: "3", label: "3rd floor" },
  { value: "4", label: "4th floor" },
  { value: "5+", label: "5th floor or higher" }
];

const conditionOptions = [
  { value: "", label: "Select condition" },
  { value: "renovated", label: "Renovated" },
  { value: "needs_renovation", label: "Needs renovation" },
  { value: "under_construction", label: "Under construction" },
  { value: "unfinished", label: "Unfinished" }
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

const SectionTitle = styled.div`
  grid-column: 1 / -1;
  padding-top: 8px;

  h2 {
    margin: 0;
    color: #111827;
    font-size: 1.15rem;
  }

  p {
    margin: 6px 0 0;
    color: #667085;
    font-size: 0.9rem;
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

  &[aria-invalid="true"] {
    border-color: #b42318;
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
  padding: 0 44px 0 14px;
  appearance: none;
  background-image:
    linear-gradient(45deg, transparent 50%, #4d5a70 50%),
    linear-gradient(135deg, #4d5a70 50%, transparent 50%);
  background-position:
    calc(100% - 26px) 50%,
    calc(100% - 21px) 50%;
  background-size:
    5px 5px,
    5px 5px;
  background-repeat: no-repeat;
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

const FieldSuccessHint = styled.span`
  color: #24563b;
  font-size: 0.85rem;
  font-weight: 700;
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

const SubmitMessage = styled.div<{ $variant: "success" | "error" }>`
  padding: 16px;
  border-radius: 16px;
  border: 1px solid
    ${({ $variant }) => ($variant === "success" ? "#b7e4c7" : "#f3b4ae")};
  background: ${({ $variant }) =>
    $variant === "success" ? "#ecfdf3" : "#fff4f2"};
  color: ${({ $variant }) => ($variant === "success" ? "#24563b" : "#b42318")};
  font-size: 0.95rem;
  line-height: 1.6;

  strong {
    display: block;
    margin-bottom: 4px;
  }

  a {
    color: inherit;
    font-weight: 800;
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

  &:hover:not(:disabled) {
    background: #284fad;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
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
  const [submitError, setSubmitError] = useState("");
  const [createdAd, setCreatedAd] = useState<CreatedAd | null>(null);

  const autocompleteRef = useRef<HTMLDivElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<PropertyAdFormValues>({
    resolver: yupResolver(propertyAdSchema),
    mode: "onSubmit",
    defaultValues: {
      title: "",
      type: "",
      price: undefined,
      description: "",

      propertyCategory: "",
      apartmentType: "",
      squareMeters: undefined,
      energyClass: "",
      floor: "",
      bedrooms: undefined,
      bathrooms: undefined,
      constructionYear: undefined,
      renovationYear: undefined,
      condition: "",
      contactPhone: ""
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
      setActiveSuggestionIndex(-1);
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
        setActiveSuggestionIndex(-1);
      } finally {
        setIsLoadingAreas(false);
      }
    }

    void loadAreas();

    return () => {
      controller.abort();
    };
  }, [debouncedAreaInput, shouldSearchAreas]);

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

  function handleAreaChange(value: string) {
    setAreaInput(value);
    setSelectedArea(null);
    setAreaValidationError("");
    setActiveSuggestionIndex(-1);
  }

  function handleAreaSelect(area: AreaSuggestion) {
    setSelectedArea(area);
    setAreaInput(area.label);
    setSuggestions([]);
    setAreaError("");
    setAreaValidationError("");
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

  async function onSubmit(values: PropertyAdFormValues) {
    setSubmitError("");
    setCreatedAd(null);

    if (!selectedArea) {
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

    try {
      const response = await fetch("/api/ads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = (await response.json()) as CreateAdResponse;

      if (!response.ok || !result.data) {
        throw new Error(result.error ?? "Could not create property ad.");
      }

      setCreatedAd(result.data);
    } catch {
      setSubmitError("Could not create property ad. Please try again.");
    }
  }

  return (
    <Form
      aria-label="Create property form"
      onSubmit={handleSubmit(onSubmit, () => {
        if (!selectedArea) {
          setAreaValidationError("Please select an area from the suggestions.");
        }
      })}
      noValidate
    >
      <FormGrid>
        <Field>
          <FieldLabel>Title</FieldLabel>
          <TextInput
            type="text"
            maxLength={155}
            placeholder="Title up to 155 characters"
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
            ) : areaValidationError ? (
              <FieldErrorHint>{areaValidationError}</FieldErrorHint>
            ) : !selectedArea &&
              debouncedAreaInput.trim().length >= 3 &&
              suggestions.length === 0 ? (
              <FieldErrorHint>No area suggestions found.</FieldErrorHint>
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
            {errors.price && (
              <FieldErrorHint>{errors.price.message}</FieldErrorHint>
            )}
          </FieldMessageArea>
        </Field>

        <Field>
          <FieldLabel>Contact phone</FieldLabel>
          <TextInput
            type="tel"
            placeholder="e.g. +30 691 234 5678"
            autoComplete="tel"
            aria-invalid={Boolean(errors.contactPhone)}
            {...register("contactPhone")}
          />
          <FieldMessageArea>
            {errors.contactPhone && (
              <FieldErrorHint>{errors.contactPhone.message}</FieldErrorHint>
            )}
          </FieldMessageArea>
        </Field>

        <SectionTitle>
          <h2>Property details</h2>
          <p>Add the main characteristics visitors expect in a property listing.</p>
        </SectionTitle>

        <Field>
          <FieldLabel>Property category</FieldLabel>
          <SelectInput
            defaultValue=""
            aria-invalid={Boolean(errors.propertyCategory)}
            {...register("propertyCategory")}
          >
            {propertyCategories.map((category) => (
              <option
                key={category.value}
                value={category.value}
                disabled={category.value === ""}
              >
                {category.label}
              </option>
            ))}
          </SelectInput>
          <FieldMessageArea>
            {errors.propertyCategory && (
              <FieldErrorHint>{errors.propertyCategory.message}</FieldErrorHint>
            )}
          </FieldMessageArea>
        </Field>

        <Field>
          <FieldLabel>Apartment type</FieldLabel>
          <SelectInput defaultValue="" {...register("apartmentType")}>
            {apartmentTypes.map((apartmentType) => (
              <option key={apartmentType.value} value={apartmentType.value}>
                {apartmentType.label}
              </option>
            ))}
          </SelectInput>
          <FieldMessageArea />
        </Field>

        <Field>
          <FieldLabel>Square meters</FieldLabel>
          <TextInput
            type="number"
            min="1"
            step="1"
            placeholder="e.g. 85"
            inputMode="numeric"
            aria-invalid={Boolean(errors.squareMeters)}
            {...register("squareMeters", { valueAsNumber: true })}
          />
          <FieldMessageArea>
            {errors.squareMeters && (
              <FieldErrorHint>{errors.squareMeters.message}</FieldErrorHint>
            )}
          </FieldMessageArea>
        </Field>

        <Field>
          <FieldLabel>Energy class</FieldLabel>
          <SelectInput
            defaultValue=""
            aria-invalid={Boolean(errors.energyClass)}
            {...register("energyClass")}
          >
            {energyClasses.map((energyClass) => (
              <option
                key={energyClass.value}
                value={energyClass.value}
                disabled={energyClass.value === ""}
              >
                {energyClass.label}
              </option>
            ))}
          </SelectInput>
          <FieldMessageArea>
            {errors.energyClass && (
              <FieldErrorHint>{errors.energyClass.message}</FieldErrorHint>
            )}
          </FieldMessageArea>
        </Field>

        <Field>
          <FieldLabel>Floor</FieldLabel>
          <SelectInput defaultValue="" {...register("floor")}>
            {floorOptions.map((floor) => (
              <option key={floor.value} value={floor.value}>
                {floor.label}
              </option>
            ))}
          </SelectInput>
          <FieldMessageArea />
        </Field>

        <Field>
          <FieldLabel>Bedrooms</FieldLabel>
          <TextInput
            type="number"
            min="0"
            step="1"
            placeholder="e.g. 2"
            inputMode="numeric"
            aria-invalid={Boolean(errors.bedrooms)}
            {...register("bedrooms", { valueAsNumber: true })}
          />
          <FieldMessageArea>
            {errors.bedrooms && (
              <FieldErrorHint>{errors.bedrooms.message}</FieldErrorHint>
            )}
          </FieldMessageArea>
        </Field>

        <Field>
          <FieldLabel>Bathrooms</FieldLabel>
          <TextInput
            type="number"
            min="0"
            step="1"
            placeholder="e.g. 1"
            inputMode="numeric"
            aria-invalid={Boolean(errors.bathrooms)}
            {...register("bathrooms", { valueAsNumber: true })}
          />
          <FieldMessageArea>
            {errors.bathrooms && (
              <FieldErrorHint>{errors.bathrooms.message}</FieldErrorHint>
            )}
          </FieldMessageArea>
        </Field>

        <Field>
          <FieldLabel>Construction year</FieldLabel>
          <TextInput
            type="number"
            min="1800"
            step="1"
            placeholder="e.g. 1995"
            inputMode="numeric"
            aria-invalid={Boolean(errors.constructionYear)}
            {...register("constructionYear", { valueAsNumber: true })}
          />
          <FieldMessageArea>
            {errors.constructionYear && (
              <FieldErrorHint>{errors.constructionYear.message}</FieldErrorHint>
            )}
          </FieldMessageArea>
        </Field>

        <Field>
          <FieldLabel>Renovation year</FieldLabel>
          <TextInput
            type="number"
            min="1800"
            step="1"
            placeholder="e.g. 2020"
            inputMode="numeric"
            aria-invalid={Boolean(errors.renovationYear)}
            {...register("renovationYear", { valueAsNumber: true })}
          />
          <FieldMessageArea>
            {errors.renovationYear && (
              <FieldErrorHint>{errors.renovationYear.message}</FieldErrorHint>
            )}
          </FieldMessageArea>
        </Field>

        <Field>
          <FieldLabel>Property condition</FieldLabel>
          <SelectInput defaultValue="" {...register("condition")}>
            {conditionOptions.map((condition) => (
              <option key={condition.value} value={condition.value}>
                {condition.label}
              </option>
            ))}
          </SelectInput>
          <FieldMessageArea />
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

      {createdAd && (
        <SubmitMessage $variant="success" role="status">
          <strong>Property ad created successfully.</strong>
          <Link to={`/ads/${createdAd.id}`}>View created ad</Link>
        </SubmitMessage>
      )}

      {submitError && (
        <SubmitMessage $variant="error" role="alert">
          <strong>Submission failed.</strong>
          {submitError}
        </SubmitMessage>
      )}

      <FormActions>
        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </SubmitButton>
      </FormActions>
    </Form>
  );
}