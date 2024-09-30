import db from "../ecomerce/src/db/db";

async function testFetch() {
  try {
    const products = await db.product.findMany({
      where: { isAvailableForPurchase: true },
      take: 6,
    });
    console.log("Test Fetch Products:", products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

testFetch();
