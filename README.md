Roblox Unfriend Except Whitelist

This is a browser console script that unfriends everyone on your Roblox account except the users you choose to keep.

The script runs entirely in your browser and uses Roblox’s normal web endpoints.
Nothing is installed and nothing runs in the background.

Important information

This script only affects your own account.
It does not bypass Roblox security or permissions.
It performs the same actions as clicking the Unfriend button manually.

Roblox may temporarily slow down or block requests if too many actions happen too quickly.
This is expected behavior and usually results in a short cooldown.

What the script does

It fetches your friends list.
It compares each friend against a whitelist you define.
It unfriends anyone who is not on that whitelist.
It waits between actions to reduce request throttling.

Requirements

You must be logged into Roblox in your browser.
You need access to your browser’s developer console.
A modern browser such as Chrome Edge or Firefox is recommended.

How to use

Go to https://www.roblox.com
 and make sure you are logged in.

Open the browser developer tools.
On Windows press Ctrl Shift J.
On macOS press Command Option J.

Paste the script into the Console tab and press Enter.

The console will show which users are being kept and which are being unfriended.

Whitelist configuration

You must edit the whitelist section in the script before running it.
const WHITELIST_USER_IDS = [
    123456789,
    987654321
];

To get a user ID, open a Roblox profile.
The number in the URL is the user ID.

Example
https://www.roblox.com/users/123456789/profile

User IDs are recommended because usernames can change.

Rate limits and cooldowns

Roblox enforces limits on how many friend actions can be performed in a short time.

If you see errors such as
429 Too Many Requests

This means Roblox is applying a temporary cooldown.

When this happens
Wait five to fifteen minutes.
Refresh the page.
Run the script again.

Already unfriended users will stay unfriended.

Safe to rerun

You can stop the script at any time by refreshing the page.
Running the script again will continue unfriending remaining users.
Users in the whitelist will never be removed.

Disclaimer

This script is intended for personal account management and educational use.
Use responsibly and avoid excessive automation.
