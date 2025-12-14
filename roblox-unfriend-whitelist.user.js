// ==UserScript==
// @name         Roblox Unfriend All Except Whitelist
// @namespace    roblox-unfriend-whitelist
// @version      1.1
// @match        https://www.roblox.com/*
// @grant        none
// ==/UserScript==

(async function () {
    'use strict';

// ======== CONFIG ========
// Add the USER IDs of people you want to KEEP as friends.
// Everyone NOT in this list will be unfriended.
//
// How to get a User ID:
// 1. Go to the user's Roblox profile
// 2. Copy the numbers from the URL
//    Example: https://www.roblox.com/users/123456789/profile
//                                          ↑ this number is the User ID
//
// Notes:
// - Use numbers only (no quotes)
// - Separate each ID with a comma
// - User IDs are safer than usernames (usernames can change)
const WHITELIST_USER_IDS = [
    123456789,   // example user
    8384190446   // another user
];
    // Delay between unfriends (ms)
    const DELAY = 1500;
    // ========================

    const sleep = ms => new Promise(r => setTimeout(r, ms));

    // ===== CSRF (modern method) =====
    async function getCsrfToken() {
        const res = await fetch(
            "https://friends.roblox.com/v1/users/1/unfriend",
            {
                method: "POST",
                credentials: "include"
            }
        );

        const token = res.headers.get("x-csrf-token");
        if (!token) {
            throw new Error("Failed to obtain CSRF token");
        }
        return token;
    }

    // ===== Get current user ID =====
    async function getMyUserId() {
        const res = await fetch(
            "https://users.roblox.com/v1/users/authenticated",
            { credentials: "include" }
        );

        const data = await res.json();
        return data.id;
    }

    // ===== Get friends list =====
    async function getFriends(userId) {
        let friends = [];
        let cursor = null;

        do {
            const url = new URL(
                `https://friends.roblox.com/v1/users/${userId}/friends`
            );
            if (cursor) url.searchParams.set("cursor", cursor);

            const res = await fetch(url, {
                credentials: "include"
            });
            const data = await res.json();

            friends.push(...data.data);
            cursor = data.nextPageCursor;
        } while (cursor);

        return friends;
    }

    // ===== Unfriend =====
    async function unfriend(csrf, userId) {
        await fetch(
            `https://friends.roblox.com/v1/users/${userId}/unfriend`,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "x-csrf-token": csrf
                }
            }
        );
    }

    // ===== RUN =====
    const csrf = await getCsrfToken();
    const myId = await getMyUserId();
    const friends = await getFriends(myId);

    console.log(`Found ${friends.length} friends`);

    for (const friend of friends) {
        if (WHITELIST_USER_IDS.includes(friend.id)) {
            console.log(`Keeping: ${friend.name}`);
            continue;
        }

        console.log(`Unfriending: ${friend.name}`);
        await unfriend(csrf, friend.id);
        await sleep(DELAY);
    }

    alert("Done unfriending (except whitelist)");
})();
