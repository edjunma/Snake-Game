const length = guestList.length;

const uppercasedGuestList = guestList.toUpperCase();

const isEthanOnTheList = uppercasedGuestList.includes('ETHAN');

const substringGuests = uppercasedGuestList.slice(16);

const guests = substringGuests.split(', ');

