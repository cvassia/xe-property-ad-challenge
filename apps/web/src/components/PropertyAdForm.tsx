const propertyTypes = [
  { value: '', label: 'Select type' },
  { value: 'rent', label: 'Rent' },
  { value: 'buy', label: 'Buy' },
  { value: 'exchange', label: 'Exchange' },
  { value: 'donation', label: 'Donation' }
];

export function PropertyAdForm() {
  return (
    <form className="property-form" aria-label="Create property classified form">
      <div className="form-grid">
        <label className="field">
          <span className="field-label">Title</span>
          <input
            name="title"
            type="text"
            maxLength={155}
            placeholder="Classified title up to 155 characters"
            autoComplete="off"
          />
        </label>

        <label className="field">
          <span className="field-label">Type</span>
          <select name="type" defaultValue="">
            {propertyTypes.map((type) => (
              <option key={type.value} value={type.value} disabled={type.value === ''}>
                {type.label}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span className="field-label">Area</span>
          <input
            name="area"
            type="text"
            placeholder="Type at least 3 characters"
            autoComplete="off"
          />
          <span className="field-hint">Autocomplete suggestions will appear here.</span>
        </label>

        <label className="field">
          <span className="field-label">Price in Euros</span>
          <input name="price" type="number" min="0" step="1" placeholder="Amount" inputMode="numeric" />
        </label>

        <label className="field field-full">
          <span className="field-label">Extra description</span>
          <textarea name="description" rows={5} placeholder="Type here" />
        </label>
      </div>

      <aside className="requirements-card" aria-label="Form requirements">
        <h2>Requirements covered</h2>
        <ul>
          <li>All fields are required except extra description.</li>
          <li>Title supports up to 155 characters.</li>
          <li>Type supports Rent, Buy, Exchange, and Donation.</li>
          <li>Price accepts numeric values.</li>
          <li>Area autocomplete integration comes next.</li>
        </ul>
      </aside>

      <div className="form-actions">
        <button type="submit">Submit classified</button>
      </div>
    </form>
  );
}
