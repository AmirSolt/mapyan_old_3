export const FinalTokenCountLimit = 2000;
export const MaxCompareProducts = 2;
export const MinCompareProducts = 2;








export const ChatGPTTemprature = 0.15 // lower more coherence, higher more creativity


export const ChatGPTInstructions=`
Follow these instructions:
- Create a comparison table with given products.
- Only extract information that describes the product  objectively.
- Examples of comparable features are: texture, components, washability so on.
- Come up with 15 features to compare
- don't use title, asin or brand as a feature.
- Use "t" or "f" for boolean.
- Use | to split each cell
- Every product must have same number of rows.
- Come up with fifteen features to compare.
- Only answer in csv.
- Format must be csv, example response:
         asin|[feature_name]|[feature_name]|...
         [asin_value]|[feature_value]|[feature_value]|...
`



// export const ChatGPTInstructions=`
// Follow these instructions:
// - Create a comparison table with given products.
// - The purpose of this table is to determine which product is the better one.
// - Come up with 10 features that you find most relevant to these products.
// - don't use title, asin or brand as a feature.
// - If answer is boolean use t or f.
// - If answer is string keep it less than 20 characters.
// - NEVER leave a cell empty.
// - Come up with ten features that you find most relevant to these products.
// - Format must be csv, example response:
//     asin,[feature_name],[feature_name],...
//     [asin_value],[feature_value],[feature_value],...
// `
