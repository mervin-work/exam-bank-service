const chai = require('chai');
const expect = chai.expect;

const bankArr = []; //global arraylist for bank
let id = 0; // auto increment id

describe('Customer', () => {
  //auto increment
  it('should join in the bank by providing name and initial deposit', () => {

    id++; //Increment the ID
    //The object that handle customer details
    const object = {
        id: id,
        name: 'Customer 1',
        balance : 1000,
        transaction_logs: [{
          'event_type': 'join_customer_with_initial_deposit',
          amount: 1000,
        }]
    };

    //The initial length of the array
    const initialLength = 0;

    //Push the customer object to bankArr (bank array)
    bankArr.push(object);

    // Check if the pushed object is equal to the customer object
    expect(bankArr[initialLength]).to.deep.equal(object);
  });

  it('should add multiple customers with a name and initial deposit', () => {

    //The Array of customer objects
    const customers = [
      { name: 'Customer 2',
        balance: 1000,
        transaction_logs: [{
          'event_type': 'join_customer_with_initial_deposit',
          amount: 1000,
        }]
      },
      {
        name: 'Customer 3',
        balance: 500,
        transaction_logs: [{
          'event_type': 'join_customer_with_initial_deposit',
          amount: 500,
        }]
      },
      { name: 'Customer 4',
        balance: 2000,
        transaction_logs: [{
          'event_type': 'join_customer_with_initial_deposit',
          amount: 2000,
        }]
      },
    ];

    //The initial length of the array -
    const initialLength = bankArr.length;

    //Iterate the customers array object and Pushed to bankArr
    customers.forEach((customer) => {
      id++; //Increment the ID
      customer.id = id;
      //Check if the initial  deposit is non-negative
      if(customer.balance < 0) {
        throw new Error('Initial deposit must be non-negative.');
      }

      bankArr.push(customer);
    })
    // console.log(bankArr);

    // Get the final length of the array after the push
    const finalLength = bankArr.length;

    // Expect that the initial length is equal 1 since we already add one customer
    expect(initialLength).to.equal(1);

    // Expect that the final length is equal to the initial length plus the number of customers added
    expect(finalLength).to.equal(initialLength + customers.length);
  });

  it('should deposit money and store the transaction in logs', () => {
    //Get the customer 1 details using customer ID = 1
    const targetCustomerId = 1;
    let customer = getCustomerDetails(targetCustomerId);

    describe('Find Customer by ID', () => {
      it('should find a customer by ID', () => {
        expect(customer).to.exist;
      });
    })

    // Deposit money for the customer
    const depositAmount = 500;
    const totalAmount = customer.balance + depositAmount;

    // Add the deposit amount to the customer current balance;
    customer.balance = totalAmount;

    // Add a transaction log for the deposit
    customer.transaction_logs.push({
      event_type: 'deposit',
      amount: depositAmount,
    });

    // Check if the customer's balance has been updated correctly
    expect(customer.balance).to.equal(totalAmount);
    // console.log(customer.transaction_logs);
  });

  it('should not allow customer to withdraw if the balance is insufficient ', ()=> {
    const targetCustomerId = 1;
    let customer = getCustomerDetails(targetCustomerId);

    // Attempt a withdrawal from customer for an amount greater than their balance
    const withdrawAmount = 5000;
    const result = attemptWithdrawal(customer, withdrawAmount);

    // Check if the result indicates that the withdrawal is not allowed due to insufficient balance
    expect(result).to.equal('Insufficient balance.');
  });

  it('should withdraw money and store the transaction in logs', () => {
     //Get the customer 1 details using customer ID = 1
    const targetCustomerId = 1;
    let customer = getCustomerDetails(targetCustomerId);

    //Withdraw money
    let withdrawAmount = 450;
    const result = attemptWithdrawal(customer, withdrawAmount);

    // Check if the result indicates that the withdrawal is allowed
    expect(result).to.equal('Allowed to withdraw.');

    // Deduct the withdraw amount to the customer current balance;
    const totalAmount = customer.balance - withdrawAmount;
    customer.balance = totalAmount;

     customer.transaction_logs.push({
      event_type: 'withdraw',
      amount: withdrawAmount,
    });

    // Check if the customer's balance has been updated correctly
    expect(customer.balance).to.equal(totalAmount);
    // console.log(customer.transaction_logs);
  });

  it('should a customer to view  their current balance', () => {

    //Get the customer 1 details using customer ID = 1
    const targetCustomerId = 1;
    let customer = getCustomerDetails(targetCustomerId);

    //Verify if their balance matches the expected balance
    expect(customer.balance).to.equal(1050);
  });

  it('should a customer to transfer money to another customer', () => {
    //Customer details - Sender and Receiver
    const sender = getCustomerDetails(1);
    const receiver = getCustomerDetails(2);

    //Transfer a money to receiver
    const transferAmount = 500;

    //Get the sender balance for verification later.
    let senderBalance = sender.balance;

    //Get the receiver balance for verification later.
    let receiverBalance = receiver.balance;

    //Check if the sender has enough balance for the transfer
    if (transferAmount <= 0 || transferAmount > sender.balance) {
      expect.fail('Transfer should not be allowed due to insufficient balance.');
    } else {
      //Transfer - Sender to Receiver
      // console.log(`Sender Current Balance: ${senderBalance}`);
      sender.balance -= transferAmount;
      // console.log(`Sender Current Balance after transfer money: ${sender.balance}`);

      //Add transaction logs for sender
      sender.transaction_logs.push({
        event_type: 'transfer',
        amount: transferAmount,
        receiver: receiver.id
      });

      //Receiver
      receiver.balance += transferAmount;

      //Add transaction logs for receiver
      receiver.transaction_logs.push({
        event_type: 'transfer',
        amount: transferAmount,
        sender: sender.id
      });

      // Check if the sender's balance has been updated correctly
      expect(sender.balance).to.equal(senderBalance - transferAmount);

      // Check if the receiver's balance has been updated correctly
      expect(receiver.balance).to.equal(receiverBalance + transferAmount);
    }
  });
});

describe('Bank Manager', () => {

  it('should allow a bank manager to view the total balance of the bank', () => {

      //Get the total balance of the bank
      const totalBalance  = bankArr.reduce((total, customer) => total + customer.balance, 0);

      // Calculate the expected total balance based on customer balances
      let expectedTotalBalance = 0;

      for(let i = 0; i < bankArr.length; i++) {
        expectedTotalBalance += bankArr[i].balance;
      }

      //Verify that the total balance matches the expected total balance
      expect(totalBalance).to.equal(expectedTotalBalance);
  });

});


function attemptWithdrawal(customer, amount) {
  if (amount <= 0 || amount > customer.balance) {
    return 'Insufficient balance.';
  }

  return 'Allowed to withdraw.';
}

function getCustomerDetails(customerId) {
  return bankArr.find((customer) => customer.id === customerId);
}
