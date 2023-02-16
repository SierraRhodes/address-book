// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] !== undefined) {
    return this.contacts[id];
  }
  return false;
};

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};

//Business logic for Address
function Address(inputtedAddress, inputtedWorkAddress, inputtedPersonalAddress){
  this.inputtedAddress = inputtedAddress;
  this.inputtedWorkAddress = inputtedWorkAddress;
  this.inputtedPersonalAddress = inputtedPersonalAddress;
}

Contact.prototype.addAddress = function(address) {
  address.addressId = this.assignId();
  this.addresses[address.addressId] = address;
};

Contact.prototype.assignId = function() {
  this.addressId += 1;
  return this.addressId;
};

Contact.prototype.findAddress = function(id) {
  if (this.addresses[id] != undefined) {
    return this.addresses[id];
  }
  return false;
};
// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber,email) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.email = email; 
  this.addresses = {};
  this.addressId = 0;

}


Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

// UI Logic

let addressBook = new AddressBook();
let addresses = new Address();

function listContacts(addressBookToDisplay) {
let contactsDiv = document.querySelector("div#contacts");
contactsDiv.innerText = null;
const ul = document.createElement("ul");
Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
  const contact = addressBookToDisplay.findContact(key);
  const li = document.createElement("li");
  li.append(contact.fullName());
  li.setAttribute("id", contact.id);
  ul.append(li);
});
contactsDiv.append(ul);
}

function displayContactDetails(event) {
  const contact = addressBook.findContact(event.target.id);
  const address = contact.findAddress(event.target.id);
  document.querySelector("#first-name").innerText = contact.firstName;
  document.querySelector("#last-name").innerText = contact.lastName;
  document.querySelector("#phone-number").innerText = contact.phoneNumber;
  document.querySelector("#email").innerText = contact.email;
  document.querySelector("#address").innerText = contact.address;

  document.querySelector("#address").innerText = address.inputtedAddress;
  document.querySelector("#work").innerHTML = address.inputtedWorkAddress ? "Yes" : "No";
  document.querySelector("#personal").innerHTML = address.inputtedPersonalAddress ? "Yes" : "No";


 // create a new list of addresses
 let addressesHtml = "";
 for (const addressId in contact.addresses) {
   const address = contact.addresses[addressId];
   addressesHtml += address.inputtedAddress + "<br>";
 }
 document.querySelector("#address").innerHTML = addressesHtml;
 document.querySelector("div#contact-details").removeAttribute("class");
}

function handleFormSubmission(event) {
  event.preventDefault();
  const inputtedFirstName = document.querySelector("input#new-first-name").value;
  const inputtedLastName = document.querySelector("input#new-last-name").value;
  const inputtedPhoneNumber = document.querySelector("input#new-phone-number").value;
  const inputtedEmail = document.querySelector("input#new-email").value;
  const inputtedAddress = document.querySelector("input#new-address").value;
  const inputtedWorkAddress = document.querySelector("input#is-work-address").checked;
  const inputtedPersonalAddress = document.querySelector("input#is-personal-address").checked;
  let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmail, inputtedAddress, inputtedWorkAddress, inputtedPersonalAddress);
  let newAddress = new Address(inputtedAddress, inputtedWorkAddress, inputtedPersonalAddress);
  newContact.addAddress(newAddress);
  addressBook.addContact(newContact);
  listContacts(addressBook);

  const workRadioButton = document.querySelector("input#is-work-address");
  const personalRadioButton = document.querySelector("input#is-personal-address");
  workRadioButton.addEventListener("click", displayAddressDetails);
  personalRadioButton.addEventListener("click", displayAddressDetails);
}

window.addEventListener("load", function (){
  document.querySelector("form#new-contact").addEventListener("submit", handleFormSubmission);
  document.querySelector("div#contacts").addEventListener("click", displayContactDetails);
  
});