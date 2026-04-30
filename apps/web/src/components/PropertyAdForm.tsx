import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { uploadPropertyAdMedia } from "../api/ads";
import {
  apartmentTypes,
  conditionOptions,
  energyClasses,
  floorOptions,
  propertyCategories,
  propertyTypes
} from "../constants/propertyFormOptions";
import { useAreaAutocomplete } from "../hooks/useAreaAutocomplete";
import type { AreaSuggestion } from "../types/area";
import {
  propertyAdSchema,
  type PropertyAdFormValues
} from "../validation/propertyAdSchema";
import { AreaAutocompleteField } from "./AreaAutocompleteField";
import { MediaUploadField } from "./MediaUploadField";
import {
  Field,
  FieldErrorHint,
  FieldLabel,
  FieldMessageArea,
  Form,
  FormActions,
  FormGrid,
  SectionTitle,
  SelectInput,
  SubmitButton,
  SubmitMessage,
  TextArea,
  TextInput,
  RequiredMark
} from "../styles";
import { usePropertyAdFormHandlers } from "../hooks/usePropertyAdFormHandlers";


type CreateAdResponse = {
  data?: {
    id: string;
  };
  error?: string;
  details?: string[];
};

export function PropertyAdForm() {
  const navigate = useNavigate();

  const [selectedArea, setSelectedArea] = useState<AreaSuggestion | null>(null);
  const [submitError, setSubmitError] = useState("");
  const [selectedMediaFiles, setSelectedMediaFiles] = useState<File[]>([]);

  const {
    areaInput,
    setAreaInput,
    debouncedAreaInput,
    suggestions,
    setSuggestions,
    isLoadingAreas,
    areaError,
    activeSuggestionIndex,
    setActiveSuggestionIndex,
    areaValidationError,
    setAreaValidationError
  } = useAreaAutocomplete(selectedArea);

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

  const {
    clearAreaSuggestions,
    handleAreaChange,
    handleAreaSelect,
    handleMediaChange
  } = usePropertyAdFormHandlers({
    setSuggestions,
    setActiveSuggestionIndex,
    setAreaInput,
    setSelectedArea,
    setAreaValidationError,
    setSelectedMediaFiles
  });

  async function onSubmit(values: PropertyAdFormValues) {
    setSubmitError("");

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

      if (selectedMediaFiles.length > 0) {
        await uploadPropertyAdMedia(result.data.id, selectedMediaFiles);
      }

      navigate(`/ads/${result.data.id}`);
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
          <FieldLabel>
            Title
            <RequiredMark>*</RequiredMark>
          </FieldLabel>
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
          <FieldLabel>
            Type
            <RequiredMark>*</RequiredMark>
          </FieldLabel>
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

        <AreaAutocompleteField
          areaInput={areaInput}
          selectedArea={selectedArea}
          suggestions={suggestions}
          isLoadingAreas={isLoadingAreas}
          areaError={areaError}
          areaValidationError={areaValidationError}
          debouncedAreaInput={debouncedAreaInput}
          activeSuggestionIndex={activeSuggestionIndex}
          onAreaInputChange={handleAreaChange}
          onAreaSelect={handleAreaSelect}
          onClearSuggestions={clearAreaSuggestions}
          onActiveSuggestionIndexChange={setActiveSuggestionIndex}
        />

        <Field>
          <FieldLabel>
            Price in Euros
            <RequiredMark>*</RequiredMark>
          </FieldLabel>
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
          <FieldLabel>
            Contact phone
            <RequiredMark>*</RequiredMark>
          </FieldLabel>
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
          <FieldLabel>
            Square meters
            <RequiredMark>*</RequiredMark>
          </FieldLabel>
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
          <FieldLabel>
            Energy class
            <RequiredMark>*</RequiredMark>
          </FieldLabel>
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

        <MediaUploadField
          selectedMediaFiles={selectedMediaFiles}
          onMediaChange={handleMediaChange}
        />
      </FormGrid>


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