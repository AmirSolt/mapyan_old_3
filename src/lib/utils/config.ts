export const FinalTokenCountLimit = 2000;
export const MaxCompareProducts = 3;
export const MinCompareProducts = 2;








export const ChatGPTTemprature = 0.25 // lower more coherence, higher more creativity


export const ChatGPTInstructions=`
Follow these instructions:
- Act as a product reviewer
- Try to objectively compare multiple products.
- Rank these products.
- Explain your reasoning for ranking each one.
- Also mention some positive and negative traits for each product.
- Better product comes first.
- For every product use this format: %[asin]% [why]
- ONLY answer in this format: %[asin]% [why]
`



// export const ChatGPTInstructions=`
// Follow these instructions:
// - Create a comparison table with given products.
// - Only extract information that describes the product objectively.
// - Every column has to be related to both products.
// - Examples of comparable features are: texture, components, washability, performance ratings
// - don't use title, asin or brand as a feature.
// - Use "t" or "f" for boolean.
// - Use | to split each cell
// - Every product must have same number of rows.
// - Every column must be related to both products.
// - Only answer in csv.
// - Format must be csv, example response:
//          asin|[feature_name]|[feature_name]|...
//          [asin_value]|[feature_value]|[feature_value]|...
// `
