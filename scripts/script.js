//* Global variables
let myLeads = [];

//* Get elements
const save_input_button = document.getElementById("input-btn");
const input_el = document.getElementById("input-el");
const unordered_list = document.getElementById("ul-el");

//*  Event handlers
save_input_button.addEventListener("click", () => get_input_value());

//* Functions

//  Add input value to the  myLeads array if
//  they are not already present
const add_value_to_my_lead = (item) => {
  if (!myLeads.includes(item)) {
    myLeads.push(item);
  } else {
    alert("Item already added.");
  }
  return;
};

// Get the input value from the text input field
// If no value return -1
const get_input_value = () => {
  const input_value = input_el.value;

  if (input_value.length > 0) {
    add_value_to_my_lead(input_value);
    save_myLeads_to_localStorage(myLeads);
  } else {
    alert("Check your input.");
  }

  if (myLeads.length > 0) render_leads(myLeads);

  input_el.value = "";
};

// Render the myLeads array if items are present
const render_leads = () => {
  let listItem = "";

  myLeads.forEach((lead) => {
    listItem += `
    <li>
        <a target='_blank' href='${lead}'>
            ${lead}
        </a>
    </li>
`;
  });

  unordered_list.innerHTML = listItem;
};

// Add myLeads to localStorage
const save_myLeads_to_localStorage = (myLeadsArray) => {
  localStorage.setItem("myLeads", JSON.stringify(myLeadsArray));
};

const load_myLeads_from_localStorage = () => {
  const localStorage_data = JSON.parse(localStorage.getItem("myLeads"));

  if (localStorage_data) {
    myLeads = [...localStorage_data];
    render_leads(myLeads);
  }
};

load_myLeads_from_localStorage();
