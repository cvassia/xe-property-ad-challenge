import type { PropertyAd } from "../types/ad";
import { DetailItem, DetailsGrid } from "../styles";
import {
    formatCondition,
    formatDate,
    formatPropertyCategory,
    formatPropertyType,
    hasValue
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

            {hasValue(ad.propertyCategory) && <DetailItem>
                <dt>Category</dt>
                <dd>{formatPropertyCategory(ad.propertyCategory)}</dd>
            </DetailItem>}

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

            {hasValue(ad.floor) && <DetailItem>
                <dt>Floor</dt>
                <dd>{ad.floor}</dd>
            </DetailItem>
            }


            {hasValue(ad.bedrooms) && <DetailItem>
                <dt>Bedrooms</dt>
                <dd>{ad.bedrooms}</dd>
            </DetailItem>
            }

            {hasValue(ad.bathrooms) && <DetailItem>
                <dt>Bathrooms</dt>
                <dd>{ad.bathrooms}</dd>
            </DetailItem>
            }

            {hasValue(ad.condition) && <DetailItem>
                <dt>Condition</dt>
                <dd>{formatCondition(ad.condition)}</dd>
            </DetailItem>
            }

            {hasValue(ad.constructionYear) && <DetailItem>
                <dt>Construction year</dt>
                <dd>{(ad.constructionYear)}</dd>
            </DetailItem>
            }

            {hasValue(ad.renovationYear) && <DetailItem>
                <dt>Renovation year</dt>
                <dd>{(ad.renovationYear)}</dd>
            </DetailItem>
            }

            {hasValue(ad.createdAt) && <DetailItem>
                <dt>Created</dt>
                <dd>{formatDate(ad.createdAt)}</dd>
            </DetailItem>
            }

            {hasValue(ad.description) && <DetailItem $full>
                <dt>Description</dt>
                <dd>{ad.description}</dd>
            </DetailItem>
            }
        </DetailsGrid>
    );
}