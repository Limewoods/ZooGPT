// Get all tab buttons
const tabButtons = document.querySelectorAll('.tab-button');

// Get all tabs
const tabs = document.querySelectorAll('.tab');

// Function to handle tab button clicks
function handleTabButtonClick(event) {
  // Get the id of the clicked button
  const buttonId = event.target.id;

  // Get the corresponding tab id
  const tabId = buttonId.replace('-tab-button', '-tab');

  // Hide all tabs
  tabs.forEach(tab => {
    tab.style.display = 'none';
  });

  // Show the corresponding tab
  const tab = document.getElementById(tabId);
  tab.style.display = 'block';
}

// Add click event listeners to all tab buttons
tabButtons.forEach(button => {
  button.addEventListener('click', handleTabButtonClick);
});

// Show the first tab by default
tabs[0].style.display = 'block';

// Get the "sell tickets" button
const sellTicketsButton = document.getElementById('sell-tickets-button');

// Get the money counter
const moneyCounter = document.getElementById('money-counter');

// Set the ticket price
const ticketPrice = 10;

// Function to handle "sell tickets" button clicks
function handleSellTicketsButtonClick() {
  // Get the current money
  let currentMoney = parseInt(moneyCounter.innerHTML.replace('$', ''));

  // Add the ticket price to the current money
  currentMoney += ticketPrice;

  // Update the money counter
  moneyCounter.innerHTML = `$${currentMoney}`;
}

// Add a click event listener to the "sell tickets" button
sellTicketsButton.addEventListener('click', handleSellTicketsButtonClick);

const emailList = document.getElementById('email-list');

// Function to add an email to the email list
function addEmail(from, subject, message) {
  // Create a new table row
  const newRow = document.createElement('tr');

  // Create the "from" and "subject" cells
  const fromCell = document.createElement('td');
  fromCell.innerHTML = from;
  const subjectCell = document.createElement('td');
  subjectCell.innerHTML = subject;

  // Append the cells to the new row
  newRow.appendChild(fromCell);
  newRow.appendChild(subjectCell);

  // Append the new row to the email list
  emailList.appendChild(newRow);
}
let emailSent = false;
let upgradeBought = false; 

function checkMoney() {
  // Get the current money
  let currentMoney = parseInt(moneyCounter.innerHTML.replace('$', ''));

  if (currentMoney >= 100 && !emailSent) {
    addEmail("Zoo Manager", "Hi, welcome to the zoo manager, you reached the required amount of money to get this email!")
    emailSent = true;
  }

  if (currentMoney >= 150 && !upgradeBought) {
    addUpgrade("Advanced Ticketing System", 50, function() {
      let currentMoney = parseInt(moneyCounter.innerHTML.replace('$', ''));
      if (currentMoney >= 50){
        moneyCounter.innerHTML = `$${currentMoney - 50}`
        ticketPrice = 20;
        upgradeBought = true;
      }
    });
  }
};

const upgradeList = document.getElementById('upgrade-list');

// Function to add an upgrade to the upgrade list
function addUpgrade(name, cost, onClick) {
  // Create a new list item
  const newItem = document.createElement('li');

  // Create the upgrade name and cost elements
  const nameElement = document.createElement('span');
  nameElement.innerHTML = name;
  const costElement = document.createElement('span');
  costElement.innerHTML = `Cost: $${cost}`;
  
  // Create a button to buy the upgrade
  const buyButton = document.createElement('button');
  buyButton.innerHTML = "Buy";
  buyButton.onclick = onClick;

  // Append the elements to the new list item
  newItem.appendChild(nameElement);
  newItem.appendChild(costElement);
  newItem.appendChild(buyButton);

  // Append the new item to the upgrade list
  upgradeList.appendChild(newItem);
}

// Call the checkMoney function everytime the player sells a ticket
sellTicketsButton.addEventListener('click', function(){
  handleSellTicketsButtonClick()
  checkMoney()
});