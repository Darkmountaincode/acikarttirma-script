# acikarttirma-script
Açık Arttırma İhale Scripti
This is an auction bidding script. To run the script:
First, upload the script files to the root folder of your FTP server. Then, access the uploaded folder in your command prompt (cmd) and execute it using the command "npm start". If you want it to run continuously, follow these steps:

Run the following commands:
sql
Copy code
npm update
npm install -g npm
npm install -g forever
Start the script with the following command:
css
Copy code
forever start --minUptime 5000 --spinSleepTime 2000 app.js
By executing these commands, the script will run continuously.

The script includes features such as bidding on products, participating in auctions, adding balance,
removing balance, adding members, editing the homepage from the admin panel, evaluating bids for auctions, 
adding comments, managing the account section, and the transfer and EFT sections. It also includes sections like popular auctions on the homepage.
The script is open source, so you can customize it according to your needs.
