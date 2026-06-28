import type { Operation } from "../store/types";

export const mockOperations: Operation[] = [
	{ date: "01.04.2026", description: "Salary for March", category: "Income", subcategory: "Salary", sum: 190000 },
	{ date: "04.04.2026", description: "Freelance landing page", category: "Income", subcategory: "Freelance", sum: 28000 },
	{ date: "25.04.2026", description: "Sold old monitor", category: "Income", subcategory: "Sales", sum: 6500 },

	{ date: "02.04.2026", description: "Chicken breast", category: "Food", subcategory: "Meat", sum: -1860 },
	{ date: "03.04.2026", description: "Apples and bananas", category: "Food", subcategory: "Fruits", sum: -720 },
	{ date: "05.04.2026", description: "Tomatoes and cucumbers", category: "Food", subcategory: "Vegetables", sum: -910 },
	{ date: "07.04.2026", description: "Chocolate and cookies", category: "Food", subcategory: "Sweets", sum: -560 },
	{ date: "09.04.2026", description: "Milk and cheese", category: "Food", subcategory: "Dairy", sum: -1340 },
	{ date: "12.04.2026", description: "Pizza night", category: "Food", subcategory: "Restaurant", sum: -2480 },
	{ date: "16.04.2026", description: "Coffee", category: "Food", subcategory: "Cafe", sum: -390 },

	{ date: "02.04.2026", description: "Filled up the car", category: "Transport", subcategory: "Fuel", sum: -4850 },
	{ date: "06.04.2026", description: "Bus ticket", category: "Transport", subcategory: "Public Transport", sum: -320 },
	{ date: "11.04.2026", description: "Taxi home", category: "Transport", subcategory: "Taxi", sum: -780 },
	{ date: "18.04.2026", description: "Car wash", category: "Transport", subcategory: "Maintenance", sum: -540 },
	{ date: "23.04.2026", description: "Parking", category: "Transport", subcategory: "Parking", sum: -250 },

	{ date: "08.04.2026", description: "Electricity bill", category: "Home", subcategory: "Electricity", sum: -2760 },
	{ date: "08.04.2026", description: "Water bill", category: "Home", subcategory: "Water", sum: -910 },
	{ date: "10.04.2026", description: "Internet", category: "Home", subcategory: "Internet", sum: -800 },
	{ date: "14.04.2026", description: "Laundry detergent", category: "Home", subcategory: "Cleaning", sum: -690 },
	{ date: "20.04.2026", description: "Desk shelf", category: "Home", subcategory: "Furniture", sum: -3200 },

	{ date: "13.04.2026", description: "T-shirt", category: "Shopping", subcategory: "Clothing", sum: -980 },
	{ date: "17.04.2026", description: "Sneakers", category: "Shopping", subcategory: "Shoes", sum: -4850 },
	{ date: "21.04.2026", description: "USB-C cable", category: "Shopping", subcategory: "Electronics", sum: -390 },
	{ date: "22.04.2026", description: "Birthday present", category: "Shopping", subcategory: "Gifts", sum: -1800 },
	{ date: "24.04.2026", description: "Shampoo", category: "Shopping", subcategory: "Personal Care", sum: -470 },

	{ date: "05.04.2026", description: "Steam game", category: "Entertainment", subcategory: "Games", sum: -1200 },
	{ date: "15.04.2026", description: "Cinema", category: "Entertainment", subcategory: "Movies", sum: -650 },
	{ date: "19.04.2026", description: "Spotify", category: "Entertainment", subcategory: "Music", sum: -170 },
	{ date: "26.04.2026", description: "Museum ticket", category: "Entertainment", subcategory: "Culture", sum: -300 },
	{ date: "28.04.2026", description: "Book", category: "Entertainment", subcategory: "Books", sum: -510 },

	{ date: "09.04.2026", description: "Painkillers", category: "Health", subcategory: "Medicine", sum: -380 },
	{ date: "18.04.2026", description: "Dentist visit", category: "Health", subcategory: "Dental", sum: -5200 },
	{ date: "27.04.2026", description: "Gym membership", category: "Health", subcategory: "Fitness", sum: -1400 },
	{ date: "28.04.2026", description: "Vision check", category: "Health", subcategory: "Checkup", sum: -900 },
	{ date: "29.04.2026", description: "Vitamins", category: "Health", subcategory: "Supplements", sum: -620 },

	{ date: "01.05.2026", description: "Salary for April", category: "Income", subcategory: "Salary", sum: 190000 },
	{ date: "08.05.2026", description: "Backend contract", category: "Income", subcategory: "Freelance", sum: 34000 },
	{ date: "30.05.2026", description: "Cashback", category: "Income", subcategory: "Cashback", sum: 950 },

	{ date: "03.05.2026", description: "Beef", category: "Food", subcategory: "Meat", sum: -2240 },
	{ date: "05.05.2026", description: "Strawberries", category: "Food", subcategory: "Fruits", sum: -1180 },
	{ date: "06.05.2026", description: "Broccoli", category: "Food", subcategory: "Vegetables", sum: -540 },
	{ date: "07.05.2026", description: "Ice cream", category: "Food", subcategory: "Sweets", sum: -420 },
	{ date: "10.05.2026", description: "Butter and yogurt", category: "Food", subcategory: "Dairy", sum: -920 },
	{ date: "18.05.2026", description: "Burger", category: "Food", subcategory: "Restaurant", sum: -1980 },
	{ date: "24.05.2026", description: "Latte", category: "Food", subcategory: "Cafe", sum: -310 },

	{ date: "04.05.2026", description: "Fuel refill", category: "Transport", subcategory: "Fuel", sum: -5100 },
	{ date: "09.05.2026", description: "Metro", category: "Transport", subcategory: "Public Transport", sum: -240 },
	{ date: "12.05.2026", description: "Taxi", category: "Transport", subcategory: "Taxi", sum: -640 },
	{ date: "16.05.2026", description: "Engine oil", category: "Transport", subcategory: "Maintenance", sum: -1100 },
	{ date: "22.05.2026", description: "Parking garage", category: "Transport", subcategory: "Parking", sum: -300 },

	{ date: "05.05.2026", description: "Electricity", category: "Home", subcategory: "Electricity", sum: -2810 },
	{ date: "05.05.2026", description: "Water", category: "Home", subcategory: "Water", sum: -940 },
	{ date: "11.05.2026", description: "Internet", category: "Home", subcategory: "Internet", sum: -800 },
	{ date: "14.05.2026", description: "Cleaning supplies", category: "Home", subcategory: "Cleaning", sum: -840 },
	{ date: "20.05.2026", description: "Desk chair", category: "Home", subcategory: "Furniture", sum: -7800 },

	{ date: "06.05.2026", description: "Jeans", category: "Shopping", subcategory: "Clothing", sum: -2500 },
	{ date: "13.05.2026", description: "Running shoes", category: "Shopping", subcategory: "Shoes", sum: -6200 },
	{ date: "17.05.2026", description: "Wireless mouse", category: "Shopping", subcategory: "Electronics", sum: -1450 },
	{ date: "23.05.2026", description: "Mother's Day gift", category: "Shopping", subcategory: "Gifts", sum: -2700 },
	{ date: "27.05.2026", description: "Toothbrush", category: "Shopping", subcategory: "Personal Care", sum: -310 },

	{ date: "02.05.2026", description: "Indie game", category: "Entertainment", subcategory: "Games", sum: -680 },
	{ date: "15.05.2026", description: "Movie night", category: "Entertainment", subcategory: "Movies", sum: -740 },
	{ date: "19.05.2026", description: "Music subscription", category: "Entertainment", subcategory: "Music", sum: -170 },
	{ date: "26.05.2026", description: "Art exhibition", category: "Entertainment", subcategory: "Culture", sum: -450 },
	{ date: "29.05.2026", description: "Programming book", category: "Entertainment", subcategory: "Books", sum: -890 },

	{ date: "07.05.2026", description: "Allergy medicine", category: "Health", subcategory: "Medicine", sum: -460 },
	{ date: "14.05.2026", description: "Dental cleaning", category: "Health", subcategory: "Dental", sum: -3100 },
	{ date: "18.05.2026", description: "Gym membership", category: "Health", subcategory: "Fitness", sum: -1400 },
	{ date: "25.05.2026", description: "General checkup", category: "Health", subcategory: "Checkup", sum: -1200 },
	{ date: "28.05.2026", description: "Magnesium tablets", category: "Health", subcategory: "Supplements", sum: -530 }
];
