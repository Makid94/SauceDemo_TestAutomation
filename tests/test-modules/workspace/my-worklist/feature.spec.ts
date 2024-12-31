import {test, expect} from 'common/customFixtures';


test('Verify Z-A sorting order on the All Items page', async ({homepageActions}) => {
    await homepageActions.sortItemsByZA();
    const itemNames = await homepageActions.getItemNames();
    const sortedNames = await homepageActions.getSortedItemNames();
    test.expect(itemNames).toEqual(sortedNames);
});


test('Verify high-low price order on the All Items page', async ({homepageActions}) => {
    await homepageActions.sortItemsByPriceHighToLow();
    const displayedPrices = await homepageActions.getDisplayedPrices();
    const sortedPrices = await homepageActions.getSortedPricesHighToLow();
    test.expect(displayedPrices).toEqual(sortedPrices);
});
test('Add multiple items to the cart and validate the checkout journey', async ({
                                                                                    checkoutActions,
                                                                                    cartActions,
                                                                                    page
                                                                                }) => {


    const itemIds = [
        'sauce-labs-backpack',
        'sauce-labs-bolt-t-shirt',
        'sauce-labs-bike-light',
        'sauce-labs-fleece-jacket',
        'sauce-labs-onesie'
    ];

    for (const itemId of itemIds) {
        await cartActions.addItemsToCart(itemId);
    }
    const itemCount = await cartActions.getCartItemCount();
    console.log('Cart Item Count:', itemCount); // Debugging log
    expect(itemCount).toBe(5);
    await cartActions.clickCartLink();
    const cartItemNames = await cartActions.getCartItemNames();
    console.log('Cart Item Names:', cartItemNames);
    await cartActions.proceedToCheckout();
    await expect(page).toHaveURL(/.*checkout-step-one/);
    await checkoutActions.performCheckoutStep('FirstName1', 'LastName1', '1216')
    const expectedItems = [
        'Sauce Labs Backpack',
        'Sauce Labs Bolt T-Shirt',
        'Sauce Labs Bike Light',
        'Sauce Labs Fleece Jacket',
        'Sauce Labs Onesie'
    ];
    expectedItems.forEach(item => expect(cartItemNames).toContain(item));

});
