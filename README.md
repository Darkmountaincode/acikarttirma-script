# Açık Arttırma İhale Scripti (acikarttirma-script)

This is an auction bidding script.

To run the script:
1. First, upload the script files to the root folder of your FTP server.
2. Then, access the uploaded folder in your command prompt (cmd).

3. Run the following commands:
   ```bash
   npm update
   npm install -g npm
   npm install -g forever
   forever start --minUptime 5000 --spinSleepTime 2000 app.js

By executing these commands, the script will run continuously.

The script includes the following features:

Bidding on products
Participating in auctions
Adding balance
Removing balance
Adding members
Editing the homepage from the admin panel
Evaluating bids for auctions
Adding comments
Managing the account section
Transfer and EFT sections
Popular auctions section on the homepage
The script is open source, so you can customize it according to your needs.
