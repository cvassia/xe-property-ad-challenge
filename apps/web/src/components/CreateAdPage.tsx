import { PropertyAdForm } from "./PropertyAdForm";
import {
    FormCard,
    HeroCard,
    HeroContent,
    Heading,
    HeroDescription,
    StatusPill
} from "../styles";

export function CreateAdPage() {
    return (
        <>
            <HeroCard>
                <HeroContent>
                    <div>
                        <StatusPill>XE Web Developer Challenge</StatusPill>

                        <Heading>Create a property ad</Heading>

                        <HeroDescription>
                            Create a clear property listing with location, price,
                            characteristics, and everything visitors need to understand your ad.
                        </HeroDescription>
                    </div>
                </HeroContent>
            </HeroCard>

            <FormCard>
                <PropertyAdForm />
            </FormCard>
        </>
    );
}