export const detectCategory = (text) => {
  if (!text) return null;
  const lowerText = text.toLowerCase();

  if (lowerText.includes("phone")) return "SMARTPHONES";
  if (lowerText.includes("laptop")) return "LAPTOPS";
  if (lowerText.includes("camera")) return "CAMERAS";
  if (lowerText.includes("headphone") || lowerText.includes("earphone"))
    return "HEADPHONES";
  if (lowerText.includes("tv")) return "TVS";
  if (lowerText.includes("watch")) return "SMARTWATCHS";
  if (lowerText.includes("accessor")) return "ACCESSORIES";

  return null;
};

export const getChatbotResponse = (message, products = []) => {
  if (!message || !products.length) return "❌ No products available.";

  const text = message.toLowerCase();
  let result = [...products];

  // 1️⃣ Filter by category
  const category = detectCategory(text);
  if (category) {
    result = result.filter((p) => p.category === category);
  }

  // 2️⃣ Filter by price
  const priceMatch = text.match(/\d+/);
  if (priceMatch) {
    const price = Number(priceMatch[0]);
    if (text.includes("under") || text.includes("below")) {
      result = result.filter((p) => p.price <= price);
    } else if (
      text.includes("over") ||
      text.includes("above") ||
      text.includes("more than")
    ) {
      result = result.filter((p) => p.price >= price);
    }
  }

  // 3️⃣ Sort results for best or cheap
  if (text.includes("best")) {
    result.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
  } else if (text.includes("cheap")) {
    result.sort((a, b) => (a.price || 0) - (b.price || 0));
  }

  // 4️⃣ Limit results if best or cheap
  if (text.includes("best") || text.includes("cheap")) {
    result = result.slice(0, 3);
  }

  if (result.length === 0) {
    return "❌ No products found. Try another category or price.";
  }

  // 5️⃣ Format nicely
  return result.map((p) => `${p.name} - $${p.price}`).join("\n");
};
