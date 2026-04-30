import type { PropertyAd } from "../types/ad";
import { DetailItem, DetailsGrid } from "../styles";
import {
    formatCondition,
    formatDate,
    formatOptionalValue,
    formatPropertyCategory,
    formatPropertyType
} from "../helpers/helpers";

type PropertyDetailsGridProps = {
    ad: PropertyAd;
};

export function PropertyDetailsGrid({ ad }: PropertyDetailsGridProps) {
    return (
        <DetailsGrid>
            <DetailItem>
                <dt>Type</dt>
                <dd>{formatPropertyType(ad.type)}</dd>
            </DetailItem>

            <DetailItem>
                <dt>Category</dt>
                <dd>{formatPropertyCategory(ad.propertyCategory)}</dd>
            </DetailItem>

            <DetailItem>
                <dt>Size</dt>
                <dd>{ad.squareMeters} m²</dd>
            </DetailItem>

            <DetailItem>
                <dt>Area</dt>
                <dd>
                    {ad.area.mainText}, {ad.area.secondaryText}
                </dd>
            </DetailItem>

            <DetailItem>
                <dt>Energy class</dt>
                <dd>{ad.energyClass}</dd>
            </DetailItem>

            <DetailItem>
                <dt>Floor</dt>
                <dd>{formatOptionalValue(ad.floor)}</dd>
            </DetailItem>

            <DetailItem>
                <dt>Bedrooms</dt>
                <dd>{formatOptionalValue(ad.bedrooms)}</dd>
            </DetailItem>

            <DetailItem>
                <dt>Bathrooms</dt>
                <dd>{formatOptionalValue(ad.bathrooms)}</dd>
            </DetailItem>

            <DetailItem>
                <dt>Condition</dt>
                <dd>{formatCondition(ad.condition)}</dd>
            </DetailItem>

            <DetailItem>
                <dt>Construction year</dt>
                <dd>{formatOptionalValue(ad.constructionYear)}</dd>
            </DetailItem>

            <DetailItem>
                <dt>Renovation year</dt>
                <dd>{formatOptionalValue(ad.renovationYear)}</dd>
            </DetailItem>

            <DetailItem>
                <dt>Created</dt>
                <dd>{formatDate(ad.createdAt)}</dd>
            </DetailItem>

            <DetailItem $full>
                <dt>Description</dt>
                <dd>{ad.description || "No extra description was provided."}</dd>
            </DetailItem>
        </DetailsGrid>
    );
}