//* Get elements
const save_input_button = document.getElementById("input-btn");
const input_el = document.getElementById("input-el");
const unordered_list = document.getElementById("ul-el")

//*  Event handlers
save_input_button.addEventListener("click", () => get_input_value());

//* Global variables
const myLeads = [];

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
        add_value_to_my_lead(input_value)
    } else {
        alert("Check your input.")
    }

    if (myLeads.length > 0) render_leads(myLeads)

    input_el.value = ""
}

// Render the myLeads array if items are present
const render_leads = (leadsArray) => {
    const li_element = document.createElement("li")
    const a_element = document.createElement("a")

    leadsArray.forEach((lead) => {
        a_element.innerText = lead
        a_element.setAttribute("href", "http://"+lead)
        a_element.setAttribute("target", "_blank")
        li_element.appendChild(a_element)
        unordered_list.appendChild(li_element)
    })
    return
}