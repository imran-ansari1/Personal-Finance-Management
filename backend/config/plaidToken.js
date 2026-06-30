const response = await plaidClient.linkTokenCreate({
    user: {
        client_user_id: user._id.toString(),
    },
    client_name: "Finance App",
    products: ["transactions"],
    country_codes: ["US"],
    language: "en",
});

res.json(response.data);