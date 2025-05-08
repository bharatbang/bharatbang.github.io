import type { DroppedFieldItem } from '@/components/html-creator/html-creator-client';

function generateHtmlForField(field: DroppedFieldItem): string {
  const fieldId = `${field.typeId}-${field.instanceId.substring(0, 8)}`;
  const fieldName = field.name.replace(/\s+/g, '_').toLowerCase(); // For name attribute
  const labelElement = `<label for="${fieldId}">${field.name}:</label>\n`;

  switch (field.typeId) {
    case 'label': // New "Label" field type
      return `<label id="${fieldId}">${field.name}</label>`; // Renders the field name as the label content
    case 'single-line':
      return `${labelElement}<input type="text" id="${fieldId}" name="${fieldName}" />`;
    case 'multi-line':
      return `${labelElement}<textarea id="${fieldId}" name="${fieldName}"></textarea>`;
    case 'email':
      return `${labelElement}<input type="email" id="${fieldId}" name="${fieldName}" />`;
    case 'rich-text':
      return `${labelElement}<textarea id="${fieldId}" name="${fieldName}" class="rich-text-editor" placeholder="Rich text editor (requires JS library)"></textarea>`;
    case 'date':
      return `${labelElement}<input type="date" id="${fieldId}" name="${fieldName}" />`;
    case 'date-time':
      return `${labelElement}<input type="datetime-local" id="${fieldId}" name="${fieldName}" />`;
    case 'drop-down':
      return `${labelElement}<select id="${fieldId}" name="${fieldName}">\n  <option value="option1">Option 1</option>\n  <option value="option2">Option 2</option>\n</select>`;
    case 'radio':
      return `<div>\n  <p>${field.name}:</p>\n  <input type="radio" id="${fieldId}-1" name="${fieldName}" value="option1" /> <label for="${fieldId}-1">Option 1</label>\n  <input type="radio" id="${fieldId}-2" name="${fieldName}" value="option2" /> <label for="${fieldId}-2">Option 2</label>\n</div>`;
    case 'multi-select':
      return `${labelElement}<select id="${fieldId}" name="${fieldName}" multiple>\n  <option value="option1">Option 1</option>\n  <option value="option2">Option 2</option>\n</select>`;
    case 'checkbox':
      return `<div>\n  <input type="checkbox" id="${fieldId}" name="${fieldName}" /> <label for="${fieldId}">${field.name}</label>\n</div>`;
    case 'number':
      return `${labelElement}<input type="number" id="${fieldId}" name="${fieldName}" />`;
    case 'decimal':
      return `${labelElement}<input type="number" id="${fieldId}" name="${fieldName}" step="0.01" />`;
    case 'percent':
      return `${labelElement}<input type="number" id="${fieldId}" name="${fieldName}" min="0" max="100" /> %`;
    case 'currency':
      return `${labelElement}$ <input type="number" id="${fieldId}" name="${fieldName}" step="0.01" />`;
    case 'url':
      return `${labelElement}<input type="url" id="${fieldId}" name="${fieldName}" />`;
    case 'image':
      return `<div>\n  <p>${field.name}:</p>\n  <img src="https://picsum.photos/200/100?random=${field.instanceId}" alt="${field.name} placeholder" style="max-width:200px; height:auto; border:1px solid #ccc;" />\n  <!-- Actual image upload would require server-side handling -->\n</div>`;
    case 'decision-box':
      return `<div>\n  <input type="checkbox" id="${fieldId}" name="${fieldName}" /> <label for="${fieldId}">${field.name}</label>\n</div>`;
    case 'file-upload':
      return `${labelElement}<input type="file" id="${fieldId}" name="${fieldName}" />`;
    case 'lookup':
      return `${labelElement}<input type="text" id="${fieldId}" name="${fieldName}" placeholder="Search..." /> <!-- Lookup field -->`;
    case 'add-notes':
      return `<div>\n  <p>${field.name}:</p>\n  <p id="${fieldId}">This is a notes section. Content can be dynamic.</p>\n</div>`;
    case 'subform':
      return `<fieldset id="${fieldId}">\n  <legend>${field.name}</legend>\n  <!-- Subform fields would go here -->\n  <p>Subform content placeholder</p>\n</fieldset>`;
    case 'zoho-crm':
      return `<div><!-- Zoho CRM Field: ${field.name} - Placeholder --></div>`;
    case 'auto-number':
      return `${labelElement}<input type="text" id="${fieldId}" name="${fieldName}" value="Auto-Generated (e.g., 123)" readonly />`;
    case 'formula':
      return `${labelElement}<input type="text" id="${fieldId}" name="${fieldName}" value="Calculated Value" readonly />`;
    case 'signature':
      return `<div>\n  <p>${field.name}:</p>\n  <canvas id="${fieldId}" width="300" height="100" style="border:1px solid #ccc;" title="Signature Pad Placeholder"></canvas>\n  <!-- Actual signature pad requires JS library -->\n</div>`;
    case 'users':
      return `${labelElement}<select id="${fieldId}" name="${fieldName}">\n  <option value="user1">User 1</option>\n  <option value="user2">User 2</option>\n</select>`;
    default:
      return `<div><!-- Unknown field type: ${field.typeId} - ${field.name} --></div>`;
  }
}

export function generateHtml(formTitle: string, fields: DroppedFieldItem[]): string {
  const fieldHtml = fields.map(field => 
    `<div class="form-field" style="margin-bottom: 15px;">\n  ${generateHtmlForField(field)}\n</div>`
  ).join('\n\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${formTitle || 'Generated Form'}</title>
  <style>
    body { font-family: sans-serif; margin: 20px; background-color: #f4f4f4; }
    .form-container { background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
    h1 { color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px; }
    label { display: block; margin-bottom: 5px; font-weight: bold; color: #555; }
    input[type="text"],
    input[type="email"],
    input[type="date"],
    input[type="datetime-local"],
    input[type="number"],
    input[type="url"],
    input[type="file"],
    textarea,
    select {
      width: calc(100% - 22px); /* Account for padding and border */
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-sizing: border-box;
    }
    input[type="radio"], input[type="checkbox"] { margin-right: 5px; }
    input[type="radio"] + label, input[type="checkbox"] + label { font-weight: normal; }
    div > input[type="checkbox"] + label { /* For single checkbox field styling */ display: inline-block; margin-bottom:0; }
    fieldset { border: 1px solid #ddd; padding: 15px; margin-bottom: 15px; border-radius: 4px; }
    legend { font-weight: bold; color: #333; }
    button[type="submit"], button[type="reset"] {
      background-color: #007bff;
      color: white;
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      margin-right: 10px;
    }
    button[type="reset"] { background-color: #6c757d; }
    button:hover { opacity: 0.9; }
    .rich-text-editor { min-height: 150px; }
    /* Basic responsive adjustments */
    @media (max-width: 600px) {
      input[type="text"],
      input[type="email"],
      input[type="date"],
      input[type="datetime-local"],
      input[type="number"],
      input[type="url"],
      textarea,
      select {
        width: 100%;
      }
    }
  </style>
</head>
<body>
  <div class="form-container">
    <h1>${formTitle || 'Generated Form'}</h1>
    <form action="#" method="POST">
      ${fieldHtml}
      
      <div style="margin-top: 20px;">
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </div>
    </form>
  </div>
</body>
</html>
`;
}
