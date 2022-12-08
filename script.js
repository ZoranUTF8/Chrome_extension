//* Global variables
let myLeads = [];

//* Get elements
const save_input_button = document.getElementById("save-btn");
const save_current_tab_button = document.getElementById("save-tab-btn");
const clear_input_button = document.getElementById("clear-btn");
const input_el = document.getElementById("input-el");
const unordered_list = document.getElementById("ul-el");

//*  Event handlers
save_input_button.addEventListener("click", () => get_input_value());
clear_input_button.addEventListener("click", () => clear_input_values());
save_current_tab_button.addEventListener("click", () => save_current_tab());

//* Functions

//  Add input value to the  myLeads array if
//  they are not already present
const add_value_to_my_lead = (item) => {
  if (!myLeads.includes(item)) {
    myLeads.push(item);
  } else {
    alert("Item already added.");
  }
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
const render_leads = (leadsArr) => {
  let listItem = "";

  leadsArr.forEach((lead, indx) => {
    listItem += `
    <li>
        <span>${indx}:</span>
        <a target='_blank' href='${lead}'>
            ${lead}
        </a>
        <button class="delete-single-item" id="delete-single-item" onClick=(delete_single_item(${indx}))>X</button>
    </li>
`;
  });

  unordered_list.innerHTML = listItem;
};

// Add myLeads to localStorage
const save_myLeads_to_localStorage = (myLeadsArray) => {
  localStorage.setItem("myLeads", JSON.stringify(myLeadsArray));
};
// Load data from localStorage
const load_myLeads_from_localStorage = () => {
  const localStorage_data = JSON.parse(localStorage.getItem("myLeads"));

  if (localStorage_data) {
    myLeads = [...localStorage_data];
    render_leads(myLeads);
  }
};
//  check if any data isndie local storage
load_myLeads_from_localStorage();

// Clear all data from local storage
const clear_input_values = () => {
  localStorage.clear();
  myLeads = [];
  render_leads();
  alert("All data cleared.");
};

// Delete single item from local storage and local array
const delete_single_item = (indx) => {
  myLeads = [
    ...JSON.parse(localStorage.getItem("myLeads")).filter(
      (_, index) => index !== indx
    ),
  ];
  console.log(myLeads);
  save_myLeads_to_localStorage(myLeads);

  render_leads(myLeads);
};

// Add the current tab to the myLeads array
const save_current_tab = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // since only one tab should be active and in the current window at once
    // the return variable should only have one entry
    let activeTab = tabs[0];
    console.log(activeTab);

    myLeads.push(tabs[0].url);
    save_myLeads_to_localStorage(myLeads);
    render_leads(myLeads);
  });
};
