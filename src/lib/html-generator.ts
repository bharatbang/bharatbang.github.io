import type { DroppedFieldItem } from '@/components/html-creator/html-creator-client';

function generateHtmlForField(field: DroppedFieldItem): string {
  const fieldId = `${field.typeId}-${field.instanceId.substring(0, 8)}`;
  const fieldName = field.name.replace(/\s+/g, '_').toLowerCase(); // For name attribute
  const labelElement = `<label for="${fieldId}">${field.name}:</label>\n`;

  switch (field.typeId) {
    case 'label': // New "Label" field type
      return `<p id="${fieldId}" class="static-label">${field.name}</p>`; // Renders as a paragraph, styled as a label
    case 'single-line':
      return `
        <div class="form-grid-label">${labelElement}</div>
        <div class="form-grid-field"><input type="text" id="${fieldId}" name="${fieldName}" /></div>
      `;
    case 'multi-line':
      return `
        <div class="form-grid-label">${labelElement}</div>
        <div class="form-grid-field"><textarea id="${fieldId}" name="${fieldName}"></textarea></div>
      `;
    case 'email':
      return `
        <div class="form-grid-label">${labelElement}</div>
        <div class="form-grid-field"><input type="email" id="${fieldId}" name="${fieldName}" /></div>
      `;
    case 'rich-text':
      return `
        <div class="form-grid-label">${labelElement}</div>
        <div class="form-grid-field"><textarea id="${fieldId}" name="${fieldName}" class="rich-text-editor" placeholder="Rich text editor (requires JS library)"></textarea></div>
      `;
    case 'date':
      return `
        <div class="form-grid-label">${labelElement}</div>
        <div class="form-grid-field"><input type="date" id="${fieldId}" name="${fieldName}" /></div>
      `;
    case 'date-time':
      return `
        <div class="form-grid-label">${labelElement}</div>
        <div class="form-grid-field"><input type="datetime-local" id="${fieldId}" name="${fieldName}" /></div>
      `;
    case 'drop-down':
      return `
        <div class="form-grid-label">${labelElement}</div>
        <div class="form-grid-field">
          <select id="${fieldId}" name="${fieldName}">
            <option value="">--Please choose an option--</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </select>
        </div>
      `;
    case 'radio':
      return `
        <div class="form-grid-label"><p>${field.name}:</p></div>
        <div class="form-grid-field">
          <input type="radio" id="${fieldId}-1" name="${fieldName}" value="option1" /> <label for="${fieldId}-1">Option 1</label>
          <input type="radio" id="${fieldId}-2" name="${fieldName}" value="option2" /> <label for="${fieldId}-2">Option 2</label>
        </div>
      `;
    case 'multi-select':
      return `
        <div class="form-grid-label">${labelElement}</div>
        <div class="form-grid-field">
          <select id="${fieldId}" name="${fieldName}" multiple>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </select>
        </div>
      `;
    case 'checkbox':
      return `
        <div class="form-grid-label"></div>
        <div class="form-grid-field">
          <input type="checkbox" id="${fieldId}" name="${fieldName}" /> <label for="${fieldId}">${field.name}</label>
        </div>
      `;
    case 'number':
      return `
        <div class="form-grid-label">${labelElement}</div>
        <div class="form-grid-field"><input type="number" id="${fieldId}" name="${fieldName}" /></div>
      `;
    case 'decimal':
      return `
        <div class="form-grid-label">${labelElement}</div>
        <div class="form-grid-field"><input type="number" id="${fieldId}" name="${fieldName}" step="0.01" /></div>
      `;
    case 'percent':
      return `
        <div class="form-grid-label">${labelElement}</div>
        <div class="form-grid-field"><input type="number" id="${fieldId}" name="${fieldName}" min="0" max="100" /> %</div>
      `;
    case 'currency':
      return `
        <div class="form-grid-label">${labelElement}</div>
        <div class="form-grid-field">$ <input type="number" id="${fieldId}" name="${fieldName}" step="0.01" /></div>
      `;
    case 'url':
      return `
        <div class="form-grid-label">${labelElement}</div>
        <div class="form-grid-field"><input type="url" id="${fieldId}" name="${fieldName}" /></div>
      `;
    case 'image':
      return `
        <div class="form-grid-label"><p>${field.name}:</p></div>
        <div class="form-grid-field">
          <img src="https://picsum.photos/200/100?random=${field.instanceId}" alt="${field.name} placeholder" style="max-width:200px; height:auto; border:1px solid #ccc;" />
          <!-- Actual image upload would require server-side handling -->
        </div>
      `;
    case 'decision-box':
      return `
        <div class="form-grid-label"></div>
        <div class="form-grid-field">
          <input type="checkbox" id="${fieldId}" name="${fieldName}" /> <label for="${fieldId}">${field.name}</label>
        </div>
      `;
    case 'file-upload':
      return `
        <div class="form-grid-label">${labelElement}</div>
        <div class="form-grid-field"><input type="file" id="${fieldId}" name="${fieldName}" /></div>
      `;
    case 'lookup':
      return `
        <div class="form-grid-label">${labelElement}</div>
        <div class="form-grid-field"><input type="text" id="${fieldId}" name="${fieldName}" placeholder="Search..." /> <!-- Lookup field --></div>
      `;
    case 'add-notes':
      return `
        <div class="form-grid-label"><p>${field.name}:</p></div>
        <div class="form-grid-field"><p id="${fieldId}">This is a notes section. Content can be dynamic.</p></div>
      `;
    case 'subform':
      return `
        <div class="form-grid-label"></div>
        <div class="form-grid-field">
          <fieldset id="${fieldId}">
            <legend>${field.name}</legend>
            <!-- Subform fields would go here -->
            <p>Subform content placeholder</p>
          </fieldset>
        </div>
      `;
    case 'zoho-crm':
      return `<div class="form-grid-label"></div><div class="form-grid-field"><!-- Zoho CRM Field: ${field.name} - Placeholder --></div>`;
    case 'auto-number':
      return `
        <div class="form-grid-label">${labelElement}</div>
        <div class="form-grid-field"><input type="text" id="${fieldId}" name="${fieldName}" value="Auto-Generated (e.g., 123)" readonly /></div>
      `;
    case 'formula':
      return `
        <div class="form-grid-label">${labelElement}</div>
        <div class="form-grid-field"><input type="text" id="${fieldId}" name="${fieldName}" value="Calculated Value" readonly /></div>
      `;
    case 'signature':
      return `
        <div class="form-grid-label"><p>${field.name}:</p></div>
        <div class="form-grid-field">
          <canvas id="${fieldId}" width="300" height="100" style="border:1px solid #ccc;" title="Signature Pad Placeholder"></canvas>
          <!-- Actual signature pad requires JS library -->
        </div>
      `;
    case 'users':
      return `
        <div class="form-grid-label">${labelElement}</div>
        <div class="form-grid-field">
          <select id="${fieldId}" name="${fieldName}">
            <option value="">--Select User--</option>
            <option value="user1">User 1</option>
            <option value="user2">User 2</option>
          </select>
        </div>
      `;
    default:
      return `<div class="form-grid-label"></div><div class="form-grid-field"><!-- Unknown field type: ${field.typeId} - ${field.name} --></div>`;
  }
}

export function generateHtml(formTitle: string, fields: DroppedFieldItem[]): string {
  const fieldHtml = fields.map(field =>
    `<div class="form-field-wrapper">\n` +
    `  <div class="form-field-content">\n` +
    `    <div class="form-grid">` +  // Add form-grid here
    `      ${generateHtmlForField(field)}\n` +
    `    </div>` +
    `  </div>\n` +
    `</div>`
  ).join('\n\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${formTitle || 'Generated Form'}</title>
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; 
      margin: 20px; 
      background-color: #f0f2f5; 
      color: #333;
    }
    .form-container { 
      background-color: #ffffff; 
      padding: 25px; 
      border-radius: 10px; 
      box-shadow: 0 4px 12px rgba(0,0,0,0.1); 
      max-width: 900px; /* Max width for the form */
      margin: 20px auto; /* Center the form */
    }
    h1 { 
      color: #1a202c; 
      border-bottom: 1px solid #e2e8f0; 
      padding-bottom: 12px; 
      margin-bottom: 25px; 
      font-size: 1.75rem;
    }

    /* New grid container for label and field */
    .form-grid {
      display: grid;
      grid-template-columns: 1fr 2fr; /* 1/3 for label, 2/3 for field */
      gap: 10px; /* Space between label and field */
      align-items: center; /* Align items vertically in the grid */
    }

    /* Styles for label column */
    .form-grid-label {
      text-align: right; /* Right align label text */
      padding-right: 10px; /* Add some padding to the right */
      font-weight: 600;
      color: #4a5568;
      font-size: 0.875rem;
    }

    /* Styles for field column */
    .form-grid-field {
      /* Add any specific styling for the field container here */
    }

    /* Remove the overall form grid */
    .form-container form {
      display: block;  /* Make the form a block element */
    }

    .form-field-wrapper {
      padding: 2px; /* This creates the "border" thickness */
      background: linear-gradient(to right, hsl(315, 72%, 55%), hsl(35, 92%, 60%)); /* Vibrant Pink to Orange */
      border-radius: 8px; /* Rounded corners for the border */
      margin-bottom: 15px; /* Space between field wrappers */
    }

    .form-field-content {
      background-color: #ffffff; /* White background for the content area */
      padding: 18px;
      border-radius: 6px; /* Inner radius, slightly smaller than wrapper */
    }
    
    .form-field-content .static-label {
      font-weight: bold;
      color: #4a5568;
      margin-bottom: 0; /* Labels typically don't need much bottom margin if they are just text */
    }

    .form-field-content label { 
      display: block; 
      margin-bottom: 6px; 
      font-weight: 600; 
      color: #4a5568; 
      font-size: 0.875rem;
    }
    .form-field-content input[type="text"],
    .form-field-content input[type="email"],
    .form-field-content input[type="date"],
    .form-field-content input[type="datetime-local"],
    .form-field-content input[type="number"],
    .form-field-content input[type="url"],
    .form-field-content input[type="file"],
    .form-field-content textarea,
    .form-field-content select {
      width: 100%; 
      padding: 10px 12px;
      margin-bottom: 0; 
      border: 1px solid #cbd5e0;
      border-radius: 6px;
      box-sizing: border-box;
      font-size: 0.9rem;
      color: #2d3748;
      background-color: #f7fafc;
    }
    .form-field-content input:focus, 
    .form-field-content textarea:focus, 
    .form-field-content select:focus {
        border-color: hsl(212, 19%, 16%); /* Corresponds to --foreground or --primary */
        box-shadow: 0 0 0 2px hsla(212, 19%, 16%, 0.2);
        outline: none;
    }

    .form-field-content input[type="radio"], 
    .form-field-content input[type="checkbox"] { 
        margin-right: 8px; 
        transform: scale(1.1);
    }
    .form-field-content input[type="radio"] + label, 
    .form-field-content input[type="checkbox"] + label { 
        font-weight: normal; 
        font-size: 0.9rem;
        color: #4a5568;
    }
    .form-field-content div > input[type="checkbox"] + label { 
        display: inline-flex; 
        align-items: center;
        margin-bottom:0; 
    }
    
    .form-field-content p { /* For radio group titles or notes */
        margin-bottom: 8px; 
        color: #4a5568; 
        font-weight: 600;
        font-size: 0.875rem;
    }
    .form-field-content p#${''} { /* For 'Add Notes' content specifically */
        font-weight: normal;
        font-size: 0.9rem;
    }


    .form-field-content fieldset { 
      border: 1px solid #e2e8f0; 
      padding: 18px; 
      margin-bottom: 0; 
      border-radius: 6px; 
    }
    .form-field-content legend { 
      font-weight: 600; 
      color: #2d3748; 
      padding: 0 8px;
      font-size: 0.95rem;
    }

    /* Button container styling */
    .form-buttons-container {
      margin-top: 20px; /* Keep some top margin */
      display: flex;
      justify-content: flex-start; /* Align buttons to the start */
      gap: 10px;
    }
    button[type="submit"], button[type="reset"] {
      background-color: hsl(183, 100%, 36%); /* Teal - Accent color */
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 500;
      transition: background-color 0.2s ease-in-out;
    }
    button[type="reset"] { 
      background-color: #6c757d; /* Muted gray */
    }
    button[type="submit"]:hover { 
      background-color: hsl(183, 100%, 30%); 
    }
    button[type="reset"]:hover { 
      background-color: #5a6268; 
    }
    
    .form-field-content .rich-text-editor { min-height: 120px; }
    .form-field-content img { display: block; margin-top: 5px; }
    .form-field-content canvas { display: block; margin-top: 5px; }

    /* Responsive adjustments for the form grid */
    @media (max-width: 768px) {
    
    }
  </style>
</head>
<body>
  <div class="form-container">
    <h1>${formTitle || 'Generated Form'}</h1>
      ${fieldHtml}
      
      <div class="form-buttons-container">
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </div>
  </div>
</body>
</html>
`;
}
