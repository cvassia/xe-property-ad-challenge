# XE Property Ad Challenge

The application allows a visitor to create a property ad with area autocomplete, validation, persistence, media upload, and a public details page.

## Table of Contents

- [Overview](#overview)
- [Implemented Requirements](#implemented-requirements)
- [Implemented Bonus Points](#implemented-bonus-points)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Setup](#setup)
- [Database](#database)
- [Running the Application](#running-the-application)
- [Running Tests](#tests)
- [API Endpoints](#api-endpoints)
- [Important Implementation Details](#important-implementation-details)
- [Open Source Packages Used](#open-source-packages-used)


## Overview

This project contains:

- A React + TypeScript frontend.
- A Node + Express backend.
- SQLite persistence using Prisma.
- Backend proxying to the provided XE autocomplete API.
- Area autocomplete with accessible keyboard interaction.
- Form validation on both frontend and backend.
- Persisted property ads.
- A details page for viewing a created property ad.
- Contact phone modal.
- Image/video upload with gallery and lightbox.
- Backend and frontend tests.

The main focus of the challenge is the area selection field. The area field searches after the user types at least 3 characters, displays autocomplete suggestions, requires selecting one of the suggestions, and submits the selected `placeId` with the ad payload.

## Implemented Requirements

### React app with Node backend

The project is split into two workspaces:

- `apps/web` — React frontend.
- `apps/api` — Express backend.

### Backend communication with the autocomplete API

The backend exposes:

GET /api/areas?input=...

The frontend never calls the external autocomplete API directly. 
Instead, the backend acts as a proxy to the provided autocomplete endpoint.

Area autocomplete after 3 characters

The area input starts searching only when the typed value has at least 3 characters.

Examples:

"at"  -> no API call
"ath" -> API call
Suggestions update while typing

The area input is debounced before making requests. 
As the user continues typing, new suggestions are loaded and previous requests are aborted when needed.

___

Required area selection

The user must select an area from the autocomplete suggestions. 
Typing text manually is not enough, because the selected suggestion provides the required placeId.

Selected placeId is submitted

When submitting the form, the payload includes:

{
  "area": {
    "placeId": "...",
    "mainText": "...",
    "secondaryText": "..."
  }
}

API errors are handled

Autocomplete and ad creation failures are handled with user-facing error messages. The backend also returns controlled error responses for invalid requests.

Documentation and tests

The project includes setup documentation and test commands in this README. Backend and frontend tests cover the main user flows.

## Implemented Bonus Points

Mobile-friendly / fluid styling

Database persistence
Property ads are stored in SQLite using Prisma.

Autocomplete API caching
The backend uses TTL caching for autocomplete suggestions. 
Repeated normalized queries reuse cached results instead of calling the external autocomplete API again.

More property attributes
The form includes additional property fields inspired by the XE property creation flow:

Property category
Apartment type
Square meters
Energy class
Floor
Bedrooms
Bathrooms
Construction year
Renovation year
Property condition
Contact phone
Description
Image/video upload

The form supports uploading images and videos.
Supported formats:

JPG, PNG, WEBP, MP4, WEBM
Uploaded media is stored locally by the backend and persisted in the database as media metadata.

Page to show persisted form data
After successful submit, the user is redirected to:

/ads/:adId

The details page displays the persisted property ad, including:

Title
Price
Area
Property characteristics
Description
Media gallery
Contact phone modal
Location panel

## Tech Stack

Frontend
React
TypeScript
Vite
React Router
React Hook Form
Yup
Styled Components
Testing Library
Vitest
jsdom
Backend
Node.js
Express
TypeScript
Prisma
SQLite
Multer
Vitest
Supertest

## Project Structure

.
├── apps
│   ├── api
│   │   ├── prisma
│   │   │   ├── migrations
│   │   │   └── schema.prisma
│   │   ├── src
│   │   │   ├── config
│   │   │   ├── db
│   │   │   ├── routes
│   │   │   ├── services
│   │   │   ├── test
│   │   │   ├── types
│   │   │   └── validation
│   │   └── uploads
│   │
│   └── web
│       ├── src
│       │   ├── api
│       │   ├── components
│       │   ├── constants
│       │   ├── helpers
│       │   ├── hooks
│       │   ├── test
│       │   ├── types
│       │   └── validation
│       └── vite.config.ts
│
├── .env.example
├── package.json
└── package-lock.json

## Environment Variables

Create a local .env file in the project root.

Use .env.example as a reference:

API_PORT=4000
WEB_PORT=5173
DATABASE_URL="file:./dev.db"
AUTOCOMPLETE_API_URL="https://oapaiqtgkr6wfbum252tswprwa0ausnb.lambda-url.eu-central-1.on.aws/"
AUTOCOMPLETE_CACHE_TTL_SECONDS=3600


### Variable explanation

API_PORT	Backend port
WEB_PORT	Frontend dev server port
DATABASE_URL	SQLite database URL used by Prisma config
AUTOCOMPLETE_API_URL	Provided XE autocomplete API endpoint
AUTOCOMPLETE_CACHE_TTL_SECONDS	TTL duration for backend autocomplete cache

## Setup

Install dependencies from the project root:

`npm install`


## Database

Generate Prisma Client:
`npm run db:generate --workspace apps/api`

Run migrations:
`npm run db:migrate --workspace apps/api`

If starting from a clean local setup, this creates the local SQLite database.

## Running the Application

Start both frontend and backend:
`npm run dev`


The backend runs on:

http://localhost:4000

The frontend runs on:

http://localhost:5173

Open:

http://localhost:5173


##  Tests

Backend and Frontend tests cover the main user flow.

Run backend tests:
`npm run test --workspace apps/api`

Run frontend tests:
`npm run test --workspace apps/web`

Run all checks:
`npm run test --workspace apps/api`
`npm run test --workspace apps/web`
`npm run build`


## API Endpoints

GET /api/areas?input=...

Returns autocomplete suggestions for property areas.

Rules:

Requires at least 3 characters.
Calls the external autocomplete API through the backend.
Uses backend TTL caching.
Returns normalized suggestions.

Example response:

{
  "data": [
    {
      "placeId": "place-athens",
      "mainText": "Athens",
      "secondaryText": "Ελλάδα",
      "label": "Athens, Ελλάδα"
    }
  ]
}


POST /api/ads

Creates a property ad.

Example request:

{
  "title": "Sunny apartment in Athens",
  "type": "buy",
  "price": 120000,
  "description": "Bright apartment near public transport.",
  "propertyCategory": "apartment",
  "apartmentType": "standard",
  "squareMeters": 85,
  "energyClass": "B",
  "floor": "2",
  "bedrooms": 2,
  "bathrooms": 1,
  "constructionYear": 2000,
  "renovationYear": 2020,
  "condition": "renovated",
  "contactPhone": "+30 691 234 5678",
  "area": {
    "placeId": "ChIJ8UNwBh-9oRQR3Y1mdkU1Nic",
    "mainText": "Athens",
    "secondaryText": "Ελλάδα"
  }
}


GET /api/ads/:id

Returns a persisted property ad by ID.

Includes:

Property fields
Area data
Contact phone
Media metadata
POST /api/uploads/ads/:adId/media

Uploads image/video files for an existing ad.

Field name:

media

Supported file types:

image/jpeg
image/png
image/webp
video/mp4
video/webm


## Important Implementation Details

Area autocomplete
The autocomplete field is custom because the selected area must include a placeId.

It supports:

Debounced search
Backend API proxy
Required selected suggestion
Keyboard navigation
ArrowDown
ArrowUp
Enter
Escape
aria-activedescendant
role="combobox"
role="listbox"
role="option"
Outside-click dropdown closing
Backend caching



### Validation

Validation exists in both frontend and backend.

### Frontend:

React Hook Form
Yup resolver

### Backend:

Yup schema validation before persistence

Backend validation is still required because frontend validation alone cannot be trusted.

### Persistence

The app uses SQLite with Prisma.

Persisted data includes:

Ad details
Area placeId
Area display text
Contact phone
Media metadata
Media upload

Media upload is handled after the ad is created.

Flow:

1. Submit form
2. Create ad
3. Upload selected media files using created ad ID
4. Redirect to details page

Uploaded files are stored locally under:

apps/api/uploads

Uploaded files are ignored by Git, except for .gitkeep.

### Details page

The details page loads persisted ad data from the backend and displays:

Media gallery
Main ad information
Property characteristics
Description
Contact phone modal
Location card

The media gallery includes:

Main image/video
Thumbnails
Lightbox
Previous/next navigation
Keyboard support


## Open Source Packages Used

### Frontend packages
react
react-dom
react-router-dom
react-hook-form
@hookform/resolvers
yup
styled-components
vite
typescript
vitest
jsdom
@testing-library/react
@testing-library/user-event
@testing-library/jest-dom

### Backend packages
express
cors
dotenv
prisma
@prisma/client
multer
tsx
typescript
vitest
supertest
@types/supertest
@types/multer



